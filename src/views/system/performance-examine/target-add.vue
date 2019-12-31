<style>
 
</style>
<template>
  <div class="background-color-white" id="targetAdd">
      <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline
          label-position="right">
          <Form-item v-if="currentTabName=='department'"  label="部门:" :label-width="50">
                    <Select :disabled="operate=='edit'" v-model="formSearch.department_id" style="width:250px">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
          </Form-item>
          <Form-item v-if="currentTabName=='employee'" label="员工类型:" :label-width="80">
              <Select :disabled="operate=='edit'"  v-model="formSearch.employee_type" style="width:250px">
                  <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
              </Select>
          </Form-item>

         <Form-item v-if="currentTabName=='employee'" label="指标类型:" :label-width="80">
              <Select :disabled="operate=='edit'"  v-model="formSearch.target_type" style="width:250px">
                  <Option v-for="item in targetTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
              </Select>
          </Form-item>
      </Form>
      <Row>
          <Button type="primary" size="small" @click="addRow">
              <Icon type="md-add"></Icon>&nbsp;添加
          </Button>
      </Row>
      <Row style="margin-top:5px;">
          <Table :columns="columnsFilter" size="small" :border="true" :data="list"></Table>
      </Row>
  </div>
</template>

<script>
import Util from "libs/util";

export default {
    name: "target-add",
    props: {
           departmentList: Object,
           type:String
    },
    data() {
        return {
            formSearch: {},
            list: [],
            currentTabName:'department',
            columns: [{
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70
                },
                {
                    title: '指标',
                    type: 'title',
                    align: 'center',
                    minWidth: 120,
                    render: (h, params) => {
                        return h('Input', {
                            props: {
                                value: this.list[params.index].title,
                            },
                            on: {
                                input: (val) => {
                                    params.row.title = val
                                    this.list[params.index] = params.row
                                }
                            }
                        })
                   }
                },
                {
                title: '过程分值S',
                key: 'process_score',
                align: 'center',
                width: 100,
                render: (h, params) => {
                    return h('InputNumber', {
                        props: {
                             value: params.row.process_score,
                             min:0,
                             max:100
                        },
                        on: {
                            'on-change': (value) => {
                                params.row.process_score = value
                                this.list[params.index] = params.row
                            },
                            'on-blur':()=>{

                            }
                        }
                    })
                }},
                  {
                title: '结果分值S',
                key: 'result_score',
                align: 'center',
                width: 100,
                render: (h, params) => {
                    return h('InputNumber', {
                        props: {
                             value: params.row.result_score,
                             min:0,
                             max:100
                        },
                        on: {
                            'on-change': (value) => {
                                params.row.result_score = value
                                this.list[params.index] = params.row
                            },
                            'on-blur':()=>{

                            }
                        }
                    })
                }},
                {
                    title: '操作',
                    key: 'operate',
                    align: 'center',
                    width:100,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.removeRow(params);
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            employeeTypeList: [{
                    label: "基层",
                    value: "基层"
                },
                {
                    label: "中层",
                    value: "中层"
                },
                {
                    label: "班长",
                    value: "班长"
                }
            ],
            targetTypeList: [{
                        value: "能力考核",
                        label: "能力考核"
                    },
                    {
                        value: "价值观考核",
                        label: "价值观考核"
                    }
            ],
            operate:'add'
        }
    },
    methods: {
        addRow() {
            this.list.push({
                title:'',
                process_score:null,
                result_score:null
            })
        },
        removeRow(params) {
            let item = params.row
            let index = params.index
            if (item.id) { //数据库有记录　需要调用删除接口
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要删除当前记录？',
                    loading: true,
                    onOk: () => {
                        this.request('delete_performance_target_data', {
                            id: item.id
                        }, true).then((res) => {
                            if (res.errno == 0) {
                                this.$Modal.remove();
                                this.$Message.info('删除成功');
                                this.list.splice(index, 1);
                            }
                        })
                    }
                });
            } else {
                this.list.splice(index, 1);
            }
        },
        save() {
            let errMsg=''
            if(this.type=='department'){
                if(!this.formSearch.department_id){
                    this.$Message.warning('请选择考核部门');
                    return Promise.resolve('')
                }
                if(this.list.length<=0){
                    this.$Message.warning('请添加明细记录');
                    return Promise.resolve('')
                }
            }

            let totalScore =0

            for(let item of this.list){
                if(!item.title||!item.result_score){
                    errMsg ='明细数据不完整,请检查'
                    break;
                }
                if(this.formSearch.target_type=='价值观考核'){
                      item.process_score =0
                }
                totalScore = totalScore+(Util.toNumber(item.process_score)+Util.toNumber(item.result_score))
            }
            if(totalScore!=100){
              errMsg ='考核指标分值求和不等于100，请确认！'
            }

            if(errMsg){
                this.$Message.warning(errMsg);
                return Promise.resolve('')
            }
           
            let data = Util.deepClone(this.list)

            let reviewTypeArr=[]
            //数据校验
            for(let item of data){
                if(item.target_id){
                  item.id = item.target_id
                }
                item.type = this.type
                item.operate = this.operate
                if(this.type=='department'){
                    item.department_id = this.formSearch.department_id
                }else if(this.type=='employee'){
                    item.target_type = this.formSearch.target_type
                    item.employee_type = this.formSearch.employee_type
                }
            }
            return this.request('save_performance_target_data',data,'正在保存...')
        },
        getData(row){
            this.operate='edit'
            let data = {}
            data.type = row.type
            this.formSearch.type = data.type
    
            if (data.type == 'employee') {
                data.target_type = row.target_type
                data.employee_type = row.employee_type
                this.formSearch.employee_type = row.employee_type
                this.formSearch.target_type = row.target_type
            }else if(data.type=='department'){
                this.formSearch.department_id = row.department_id
                data.department_id = row.department_id
            }
            this.request('get_performance_target_list_data', data, true).then((res) => {
                if (res.errno == 0) {
                    for(let item of res.data){
                         if(this.formSearch.target_type=='价值观考核'){
                            item.process_score =0
                         }
                        item.id = item.target_id
                    }
                    this.list = res.data
                } else {

                }
            })
        },
        clear() {
            this.operate='add'
            this.formSearch={}
            this.list = []
        },
        changeTab(name){
            console.log(name)
            this.currentTabName = name
        }
    },
    computed: {
            columnsFilter: function () {
                if (this.formSearch.target_type == "价值观考核") {
                    return this.columns.filter(item => {
                        if (item.key == "process_score") {
                            return false;
                        } else {
                            return true;
                        }
                    });
                } 
                return this.columns;
            }
        },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    }
}
</script>


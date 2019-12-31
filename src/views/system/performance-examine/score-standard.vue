<style>
 
</style>
<template>
  <div class="background-color-white" id="scoreStandardAdd">
      <Form :model="formSearch"  ref="formSearch" :label-width="90" inline
          label-position="right">
          <Form-item label="考核类型:" :label-width="80">
              <Select :disabled="row.id" v-model="formSearch.type" style="width:250px">
                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </Form-item>
          <Form-item v-if="formSearch.type=='employee'" label="员工类型:" :label-width="80">
              <Select :disabled="row.id" v-model="formSearch.employee_type" style="width:250px">
                  <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">{{ item.label }}
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
          <Table :columns="columns" size="small" :border="true" :data="list"></Table>
      </Row>
  </div>
</template>

<script>
import Util from "libs/util";

export default {
    name: "score-standard-add",
    props: {
           row: Object //订单类型
    },
    data() {
        return {
            formSearch: {
                type:'department'
            },
            list: [],
            columns: [{
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70
                },
                {
                    title: '评委类型',
                    key: 'reviewType',
                    align: 'center',
                    render: (h, params) => {
                        return h('Select', {
                                props: {
                                    value: this.list[params.index].review_type,
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.list[params.index].review_type = value;
                                    }
                                },
                            },
                            this.reviewTypeList.map(function (item) {
                                return h('Option', {
                                    props: {
                                        value: item.value
                                    }
                                }, item.label);
                            })
                        );
                    },
                },
                {
                    title: '评分比重(%)',
                    key: 'weight',
                    align: 'center',
                    render: (h, params) => {
                        return h('InputNumber', {
                            props: {
                                value: params.row.weight,
                                min: 0,
                                max: 100
                            },
                            on: {
                                'on-change': (value) => {
                                    params.row.weight = value
                                    this.list[params.index] = params.row
                                },
                                'on-blur': () => {}
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    key: 'operate',
                    align: 'center',
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
            reviewTypeList: [{
                    label: 'CEO',
                    value: 'CEO'
                },
                {
                    label: '内部客户',
                    value: '内部客户'
                },
                {
                    label: '财务中心负责人',
                    value: '财务中心负责人'
                },
                {
                    label: '人力资本中心负责人',
                    value: '人力资本中心负责人'
                },
                {
                    label: 'HRBP',
                    value: 'HRBP'
                },
                {
                    label: '直接上级',
                    value: '直接上级'
                },
                 {
                    label: '部门负责人',
                    value: '部门负责人'
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
            typeList: [{
                    label: '部门考核',
                    value: 'department'
                },
                {
                    label: '员工考核',
                    value: 'employee'
                }
            ]
        }
    },
    methods: {
        addRow() {
            this.list.push({
                weight: 1,
                review_type:''
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
                        this.request('delete_performance_score_standard_data', {
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
            if(!this.formSearch.type){
                this.$Message.warning('请选择考核类型');
                return Promise.resolve('')
            }
            let data = Util.deepClone(this.list)
            let totalWeight=0
            let errMsg=''
            let reviewTypeArr=[]
            //数据校验
            for(let item of data){
                if(!item.review_type){
                  errMsg='明细数据不完整,请检查'
                  break;
                }
                reviewTypeArr.push(item.review_type)
                item.type = this.formSearch.type
                item.employee_type = this.formSearch.employee_type
                totalWeight+=Util.toNumber(item.weight)
            }

            if(Util.isRepeat(reviewTypeArr)){
               errMsg='评委类型存在重复记录,请检查'
            }
            if(errMsg){
                this.$Message.warning(errMsg);
                return Promise.resolve('')
            }
            if(totalWeight!=100){
                this.$Message.warning('评分比重求和不等于100，请确认！');
                return Promise.resolve('')
            }
        
            return this.request('save_performance_score_standard_data',data,'正在保存...')
        },
        getData(row){
            let data = {}
            data.type = row.type
            this.formSearch.type = data.type

            if (data.type == 'employee') {
                data.employee_type = row.employee_type
                this.formSearch.employee_type = row.employee_type
            }
            this.request('get_performance_score_standard_list_data', data, true).then((res) => {
                if (res.errno == 0) {
                    this.list = res.data
                } else {

                }
            })
        },
        clear() {
            this.list = []
        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
    }
}
</script>


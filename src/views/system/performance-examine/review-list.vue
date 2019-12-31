<template>
<div id="review-list">
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="24">
        <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline
            label-position="right">
            <Form-item label="员工:" :label-width="60">
                <Input v-model="formSearch.employee_name" placeholder="请输入员工姓名" style="width: 150px"
                 ></Input>
            </Form-item>
             <Form-item label="部门:"  :label-width="50">
                    <div class="tree">
                        <treeselect
                                style="width:250px;"
                                placeholder="请选择"
                                :multiple="false"
                                value-format="object"
                                :options="departmentListChose"
                                v-model="formSearch.departmentObj"
                        />
                    </div>
                </Form-item>
                <Form-item  label="评委姓名:" :label-width="80">
                    <Input v-model="formSearch.review_user_name" placeholder="请输入评委姓名" style="width: 150px"
                 ></Input>
                </Form-item>
                 <Form-item  label="考核类型:" :label-width="80">
                    <Select v-model="formSearch.type" style="width:150px" @on-change="changeOptions" >
                        <Option  v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                 <Form-item v-show = "true ? formSearch.type == 'employee' : formSearch.type == 'department' "  label="员工类型:" :label-width="80">
                    <Select v-model="formSearch.employee_type" style="width:150px" >
                        <Option v-for="item in typeNameList" :value="item.EMPLOYEE_TYPE" :key="item.EMPLOYEE_TYPE">{{ item.EMPLOYEE_TYPE }}</Option>
                    </Select>
                </Form-item>
            <Form-item :label-width="1">
                <Button type="primary" @click="search">查询</Button>
                <Button type="default" @click="handleReset">重置</Button>
                <Button type="primary" @click="exportData">导出</Button>
                <!-- <Button type="primary" @click='openAddDialog()'>新增</Button> -->
            </Form-item>
        </Form>
        </Col>
    </Row>
    <Row class="background-color-white exhibition">
        <Table :columns="columns" size="small" highlight-row :data="list"></Table>
        <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
            show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
    </Row>
</div>
</template>

<script>
    import Util from 'libs/util';
    export default {
        name: 'review-list',
        desc:'成绩明细',
        data() {
            return {
                formSearch: {},
                departmentListChose:[],
                columns: [{
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '考核类型',
                        key: 'type',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            if(params.row.type=='department'){
                                  return h('span','部门考核')
                            }else{
                                  return h('span','个人考核')
                            }
                        }
                    },
                    {
                        title: '员工',
                        key: 'employee_name',
                        align: 'center',
                        width: 100
                    }, {
                        title: '部门',
                        key: 'department_name',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            if(params.row.type=='department'){
                                return h('span',params.row.department_name)
                            }else{
                                return h('span',params.row.org_department_name)
                            }
                        }
                    }, {
                        title: '考核周期',
                        key: 'review_period',
                        align: 'center',
                        minWidth: 120
                    }, {
                        title: '评审时间',
                        key: 'created',
                        align: 'center',
                        minWidth: 150
                    }, {
                        title: '评委姓名',
                        key: 'review_user_name',
                        align: 'center',
                        minWidth: 100
                    }, {
                        title: '评委类型',
                        key: 'review_type',
                        align: 'center',
                        minWidth: 150
                    }, {
                        title: '评委比重(%)',
                        key: 'weight',
                        align: 'center',
                        minWidth: 100
                    }, {
                        title: '评委分数',
                        key: 'score',
                        align: 'center',
                        width: 150,
                        render:(h,params) => {
                            return h('span', params.row.score.toFixed(2))
                        }
                    },  {
                        title: '操作',
                        key: 'operate',
                        width: 150,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.viewDetail(params.row);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
                typeNameList:[],
                typeList: [{
                        label: '部门考核',
                        value: 'department'
                    },
                    {
                        label: '个人考核',
                        value: 'employee'
                    }
                ],
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.getDepartmentTreeData()
            this.getData()
        },
        methods: {
            changeOptions(v){
               if(v=='employee'){
                    this.request('get_employee_type_list', {}, true).then((res) => {
                        this.typeNameList = res.data
                })
               }
            },
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
            handleReset() {
                this.page = 1
                this.pageSzie = 10
                this.formSearch = {}
                this.getData()
            },
            cancel() {
                this.modal_visible = false;
            },
            search() {
                this.page =1
                this.getData()
            },
            getData() {
                let data = Util.deepClone(this.formSearch)
                delete data.departmentObj
                if (this.formSearch.departmentObj) {
                    data.department_path = this.formSearch.departmentObj.unit_path
                    data.department_id = this.formSearch.departmentObj.id
                }
                data.page = this.page
                data.pageSize = this.pageSize
                console.log(data,'-0-0-0-0')
                this.request('get_performance_review_list', data, true).then((res) => {
                    if (res.errno == 0) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        for (let item of res.data.data) {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                        }
                        this.list = res.data.data
                        this.total = res.data.count
                    }else{
                        this.$Message.warning(res.errmsg)
                    }
                })
            },
            //查看详情
            viewDetail(row) {
                if(row.type=='department'){
                this.$router.push({
                    name: 'department-review-detail',
                    params: {
                        reviewId: row.id,
                    }
                });
                }else{
                this.$router.push({
                    name: 'employee-review-detail',
                    params: {
                        reviewId: row.id,
                    }
                });

                }
            },
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
            delete(id) {
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要删除当前记录？',
                    loading: true,
                    onOk: () => {
                        this.request('delete_performance_review_data', {
                           id: id
                        }, true).then((res) => {
                            if (res.errno == 0) {
                                this.$Modal.remove();
                                this.$Message.info('删除成功');
                                this.search()
                            }else{
                                this.$Message.warning(res.errmsg)
                            }
                        })
                    }
                });
            },
            getDepartmentTreeData(){
                this.request('get_department_tree_list', {}, false).then((res) => {
                    if (res.errno == 0) {
                       this.departmentListChose = Util.arrayToDepartmentTree(Util.deepClone(res.data))
                    }
                })
            },
            //导出数据
            exportData(){
                let data = Util.deepClone(this.formSearch)
                delete data.departmentObj
                if (this.formSearch.departmentObj) {
                    data.department_path = this.formSearch.departmentObj.unit_path
                    data.department_id = this.formSearch.departmentObj.id
                }
                this.request('export_performance_review_data',data,true).then(res=>{
                    if(res.errno==0){
                        this.$Message.success('导出成功');
                        if(document.location.href.indexOf('localhost')>0||document.location.href.indexOf('127.0.0.1')>0){
                            window.open('http://127.0.0.1:8360'+res.data)
                        }else{
                            window.open(res.data)
                        }
                    }
                })
            },
        },
    }
</script>

<style>
.none{
    display:'none'
}
.block{
    display:'block'
}
</style>

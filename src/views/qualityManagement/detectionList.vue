<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition">
            <Tabs style="min-height:880px;padding-left:0px" type="card" @on-click='changeTab(changeTabs)' v-model='changeTabs'>
                <TabPane label="待完成" name='dwc'>
                      <el-form :inline="true" :model="formSearch" class="demo-form-inline" @submit.native.prevent>
                            <el-form-item size="mini" label="检测任务编号:" style="margin-bottom:0px!important">
                                <el-input size="mini" v-model="formSearch.taskNo"  clearable></el-input>
                            </el-form-item>
                            <el-form-item size="mini" label="发起人:" style="margin-bottom:0px!important" >
                                <el-select v-model="formSearch.initiateUserName" clearable placeholder="请选择" style="width:150px" filterable>
                                  <el-option v-for="v in developerList" :key="v"  :label="v"  :value="v"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item size="mini" label="检测标识:" style="margin-bottom:0px!important">
                                <el-select v-model="formSearch.status" clearable filterable  placeholder="请选择" style="width:100px">
                                    <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                              <el-form-item size="mini" style="margin-bottom:0px!important">
                                <el-button @click="initdata(1)" type="primary">查询</el-button>
                            </el-form-item>
                      </el-form>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
                        <div @click="handleSave(item.taskDetailId,item)" v-for="item in List" :value="item.id" :key="item.id" style="margin-bottom:10px;background-color:#f5f7f9">
                            <Row style="height:80px;line-height:80px;font-size:16px">
                                <Col span="2">
                                <Icon type="md-notifications" class="f16 pl20" />
                                </Col>
                                <Col span="15">
                                {{item.taskMsg}}
                                </Col>
                                <Col span="2">
                                {{item.taker}}
                                </Col>
                                <Col span="5" style="position:relative" class="f14">
                                {{item.created}}
                                <i class="iconfont icondian  red absolute"></i>
                                </Col>
                            </Row>
                        </div>

                    </Row>
                </TabPane>
                <TabPane label="进行中" name='jxz'>
                     <el-form :inline="true" :model="formSearch" class="demo-form-inline" @submit.native.prevent>
                            <el-form-item size="mini" label="检测任务编号:" style="margin-bottom:0px!important">
                                <el-input size="mini" v-model="formSearch.taskNo"  clearable></el-input>
                            </el-form-item>
                            <el-form-item size="mini" label="发起人:" style="margin-bottom:0px!important" >
                                <el-select v-model="formSearch.initiateUserName" clearable placeholder="请选择" style="width:150px" filterable>
                                  <el-option v-for="v in developerList" :key="v"  :label="v"  :value="v"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item size="mini" label="检测标识:" style="margin-bottom:0px!important">
                                <el-select v-model="formSearch.status"  clearable filterable  placeholder="请选择" style="width:100px">
                                    <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                              <el-form-item size="mini" style="margin-bottom:0px!important">
                                <el-button @click="getConduct(1)" type="primary">查询</el-button>
                            </el-form-item>
                      </el-form>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total1" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange1" @on-page-size-change="sizeChange1"></Page>
                        <Table :columns="columns" size="small" highlight-row :data="list1" @on-row-dblclick="edit"></Table>

                    </Row>
                    <Modal title="查看大图" v-model="visible">
                        <img :src="bigstyleImg" v-if="visible" style="width: 100%">
                    </Modal>
                </TabPane>
                <TabPane label="已完成" name='ywc'>
                     <el-form :inline="true" :model="formSearch" class="demo-form-inline" @submit.native.prevent>
                            <el-form-item size="mini" label="检测任务编号:" style="margin-bottom:0px!important">
                                <el-input size="mini" v-model="formSearch.taskNo"  clearable></el-input>
                            </el-form-item>
                            <el-form-item size="mini" label="发起人:" style="margin-bottom:0px!important" >
                                <el-select v-model="formSearch.initiateUserName" clearable placeholder="请选择" style="width:150px" filterable>
                                  <el-option v-for="v in developerList" :key="v"  :label="v"  :value="v"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item size="mini" label="检测标识:" style="margin-bottom:0px!important">
                                <el-select v-model="formSearch.status" clearable filterable  placeholder="请选择" style="width:100px">
                                    <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item size="mini" label="任务状态:" style="margin-bottom:0px!important">
                                <el-select v-model="formSearch.workstatus" clearable filterable  placeholder="请选择" style="width:100px">
                                    <el-option v-for="item in workstatusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                              <el-form-item size="mini" style="margin-bottom:0px!important">
                                <el-button @click="getComplete(1)" type="primary">查询</el-button>
                            </el-form-item>
                      </el-form>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total2" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange2" @on-page-size-change="sizeChange2"></Page>
                        <Table :columns="columns2" size="small" highlight-row :data="list2" @on-row-dblclick="edit"></Table>

                    </Row>
                </TabPane>
            </Tabs>
        </Row>
    </Content>
</Layout>
</template>

<script>
import Util from 'libs/util';
import {burypoint} from 'mixins/burypoint'

export default {
    mixins:[burypoint],
    name: 'detectionList',
    data() {
        return {
            bigstyleImg: '',
            formSearch:{
                       taskNo:'',
                       status:'',
                       initiateUserName:'',
                       workstatus:''
            },
            statusList:[{name:'内检',id:0},{name:'外检',id:1}],
            workstatusList:[{name:'已完成',id:2},{name:'已取消',id:3}],
            visible: false,
            userInfo: '', //缓存
            columns: [{
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 80,
                },
                 {
                    title: '是否加急',
                    key: 'urgentStr',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务编号',
                    key: 'taskNo',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务名称',
                    key: 'taskTypeName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '样品来源',
                    key: 'sampleSource',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '内检标识',
                    key: 'innerCheck',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '外检标识',
                    key: 'outCheck',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '发起人',
                    key: 'promoter',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '发起部门',
                    key: 'promoterDepartment',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '到达时间',
                    key: 'created',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '最后修改时间',
                    key: 'lastUpdated',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '已用时间(h)',
                    key: 'usedHours',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '操作',
                    key: 'operate',
                    minWidth: 150,
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
                                    marginRight: '5px',
                                    width: '100px'
                                },
                                on: {
                                    click: (e) => {
                                        this.setBuryPoint('进入进行中详情')
                                        this.handleEditSave(params.row.id, params.row)
                                    }
                                }
                            }, '进入'),
                        ])
                    }
                }
            ],
            columns2: [{
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 80,
                },
                 {
                    title: '是否加急',
                    key: 'urgentStr',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务编号',
                    key: 'taskNo',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务名称',
                    key: 'taskTypeName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务状态',
                    key: 'status',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        return h('span',params.row.status == 2 ? '已完成' : '已取消' )
                    }
                },
                {
                    title: '样品来源',
                    key: 'sampleSource',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '内检标识',
                    key: 'innerCheck',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '外检标识',
                    key: 'outCheck',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '发起人',
                    key: 'promoter',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '发起部门',
                    key: 'promoterDepartment',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '到达时间',
                    key: 'created',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '提交时间',
                    key: 'endTime',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '已用时间(h)',
                    key: 'usedHours',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '操作',
                    key: 'operate',
                    minWidth: 150,
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
                                    marginRight: '5px',
                                    width: '50px'
                                },
                                on: {
                                    click: (e) => {
                                        this.setBuryPoint('已完成查看详情')
                                        this.handleSaveT(params.row.id, params.row)
                                    }
                                }
                            }, '查看'),

                        ])
                    }
                }
            ],
            total1:0,
            total2:0,
            List: [],
            list1: [],
            list2: [],
            total: 0,
            page: 1,
            pageSize: 10,
            total1: 0,
            page1: 1,
            pageSize1: 10,
            total2: 0,
            page2: 1,
            pageSize2: 10,
            CountDown: '已超时', //倒计时
            changeTabs: 'dwc',
            taskStatus: '100',
            task: [],
            developerList:[],
        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        // this.getData()//根据状态查询任务列表
        this.clickSearch()
        this.getDeveloperList()
    },
    activated() {

    },
    methods: {
         getDeveloperList(){//
            let data = {}
            this.request('fabric_getdeveloperList', data, false).then(res => {
                if (res.code == 1) {
                    this.developerList = res.data;
                }
            })
        },
        clickSearch() {
                this.initdata()
        },
        initdata(num) {
            this.setBuryPoint('待完成查询')
            if(num == 1){
                this.page = 1
            }
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 2 //任务类型
            data.taskStatus = 0
            data.taskNo=this.formSearch.taskNo
            data.initiateUserName = this.formSearch.initiateUserName
            data.checkType = this.formSearch.status //检测标识
            this.request('showTaskNodeList', data, false).then((res) => {
                if (res.code == 1) {
                    this.List = res.data.records
                    this.total = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //进行中
        getConduct(num) {
            this.setBuryPoint('进行中查询')
            if(num == 1){
                this.page = 1
            }
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 2 //任务类型
            data.taskStatus = 1
            data.taskNo=this.formSearch.taskNo
            data.initiateUserName = this.formSearch.initiateUserName
            data.checkType = this.formSearch.status //检测标识
            this.request('showTaskNodeList', data, false).then((res) => {
                if (res.code == 1) {
                    this.list1 = res.data.records
                    this.total1 = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getComplete(num) {
            this.setBuryPoint('已完成查询')
            if(num == 1){
                this.page = 1
            }
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 2 //任务类型
            // data.taskStatus = 999
            data.taskNo=this.formSearch.taskNo
            data.initiateUserName = this.formSearch.initiateUserName
            data.checkType = this.formSearch.status //检测标识
            !!this.formSearch.workstatus ? data.taskStatus = this.formSearch.workstatus : data.taskStatus = 999 //任务状态
            this.request('showTaskNodeList', data, false).then((res) => {
                if (res.code == 1) {
                    this.list2 = res.data.records
                    this.total2 = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //改变tabs选项
        changeTab(name) {
            console.log(name)
            this.formSearch={
                taskNo:'',
                initiateUserName:'',
                status:'',
                workstatus:''
            }
            if (name == 'jxz') {
                this.page = 1
                this.pageSize = 10
                this.getConduct()
            } else if (name == 'ywc') {
                this.getComplete()
                this.page = 1
                this.pageSize = 10
            } else if (name == 'dwc') {
                this.initdata()
                this.page = 1
                this.pageSize = 10
            }
        },
        //跳转详情页
        handleSave(id, row) {
           let data = Util.deepClone(row);
            data.taskNodeStatus = 1
            data.fabricQcCheckListId = row.checkListMainId
            data.taskNodeId = row.id
            this.request('updateTaskNode', data, false).then(res => {
                if (res.code == 1) {
                    console.log(row, 'popopopop')
                    this.$router.push({
                        name: 'detectionConduct',
                        query: {
                            id:row.id,
                            checkListMainId: row.checkListMainId,
                            status:1,
                            taskType:row.taskType
                        }
                    });
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleEditSave(id, row) {
            this.$router.push({
                        name: 'detectionConduct',
                        query: {
                            id:row.id,
                            checkListMainId: row.checkListMainId,
                            status:1,
                            taskType:row.taskType
                        }
                    });
        },

        //跳转完成页
        handleSaveT(id, row) {
            this.$router.push({
                        name: 'detectionComplete',
                        query: {
                            id:row.id,
                            checkListMainId: row.checkListMainId,
                            status:2,
                            taskType:row.taskType
                        }
                    });
        },
        currentChange(val) {
            console.log(val, '[p[p[p[')
            this.page = val;
            this.initdata();
        },
        sizeChange(val) {
            console.log(val, '[p[p[p[')
            this.pageSize = val;
            this.initdata();
        },
        currentChange1(val) {
            this.page = val;
            this.getConduct()
        },
        sizeChange1(val) {
            this.pageSize = val;
            this.getConduct()
        },
        currentChange2(val) {
            this.page = val;
            this.getComplete()
        },
        sizeChange2(val) {
            this.pageSize = val;
            this.getComplete();
        },
    }
}
</script>

<style>
.f16 {
    font-size: 26px !important
}

.pl20 {
    padding-left: 20px
}

.red {
    color: red;
}

.icondian {
    width: 10px !important
}

.absolute {
    position: absolute;
    top: -10px;
    right: 30px;
}
</style>

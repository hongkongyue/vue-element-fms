<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition">
            <Tabs style="min-height:880px;padding-left:0px" type="card" @on-click='changeTab(changeTabs)' v-model='changeTabs'>
                <TabPane label="待完成" name='dwc'>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
                        <div @click="handleSave(item.taskDetailId,item)" v-model="changeRoute" v-for="item in List" :value="item.id" :key="item.id" style="margin-bottom:10px;background-color:#f5f7f9">
                            <Row style="height:80px;line-height:80px;font-size:16px">
                                <Col span="2">
                                <Icon type="md-notifications" class="f16 pl20" />
                                </Col>
                                <Col span="15">
                                {{item.message}}
                                </Col>
                                <Col span="2">
                                {{item.sendUserName}}
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
                    <Row class="background-color-white exhibition" style="max-height:530px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange1" @on-page-size-change="sizeChange1"></Page>
                        <Table :columns="columns" size="small" highlight-row :data="list1" @on-row-click="clickRow"></Table>
                        
                    </Row>
                    <div style="height:20px"></div>
                    <Row>
                        <div style="font-size:20px">操作日志</div>
                        
                        <el-table :data="logsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                        <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="logsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="logsList.length>0&&!dataFlag">没有更多了…</div>
                    </Row>
                    <Modal v-model="turnvisible" :styles="mystyle" title="转交" @on-cancel='turnCancel' :width="410" @on-ok="turnSave" class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form :inline="true" ref="ruleForm" :model="turnData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                    <Col span="24">
                    <el-form-item label="开发员" size="small" label-width="120px">
                        <el-select v-model="turnData.developer" @change="changedeveloper(turnData.developer)" style="width:150px" filterable>
                            <el-option v-for="v in personList" :key="v.id" :label="v.basicUserName" :value="v.basicUserId"></el-option>
                        </el-select>
                    </el-form-item>
                    </Col>
                    <Col span="24">
                    <el-form-item style="padding-left:115px">
                        <Button type="primary" @click="turnSave()">确认</Button>
                        <Button type="default" @click="turnCancel">取消</Button>
                    </el-form-item>
                    </Col>
                </el-form>
            </Row>
            <div slot="footer"></div>
        </Modal>
                </TabPane>
                <TabPane label="已完成" name='ywc'>
                    <Row class="background-color-white exhibition" style="max-height:530px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange2" @on-page-size-change="sizeChange2"></Page>
                        <Table :columns="columns2" size="small" highlight-row :data="list2" @on-row-click="clickRow"></Table>
                        <Row>
                        <div style="font-size:20px">操作日志</div>
                        <el-table :data="logsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                        <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="logsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="logsList.length>0&&!dataFlag">没有更多了…</div>
                    </Row>
                    </Row>
                </TabPane>
            </Tabs>
        </Row>
    </Content>
</Layout>
</template>

<script>
import Util from 'libs/util';
// import Util from 'libs/util';
// import axios from 'axios';

export default {
    name: 'developConfirmList',
    data() {
        return {
            turnvisible:false,
            logsList:[],
            userInfo: '', //缓存
            columns: [{
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 80,
                },
                {
                    title: '任务编号',
                    key: 'taskNo',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务名称',
                    key: 'taskConfigurationName',
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
                    key: 'initiatingDepartment',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '到达时间',
                    key: 'arriveTime',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '已用时间',
                    key: 'usedTime',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '操作',
                    key: 'operate',
                    minWidth: 250,
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
                                        this.handleEditSave(params.row.id, params.row)
                                    }
                                }
                            }, '进入'),
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
                                        this.turnAlround(params.row.id, params.row)
                                    }
                                }
                            }, '转交'),
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
                    title: '任务编号',
                    key: 'taskNo',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '任务名称',
                    key: 'taskConfigurationName',
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
                    key: 'initiatingDepartment',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '到达时间',
                    key: 'arriveTime',
                    align: 'center',
                    minWidth: 150,
                },
                {
                    title: '共计时长',
                    key: 'usedTime',
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
                                        this.handleSaveT(params.row.id, params.row)
                                    }
                                }
                            }, '查看'),
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
                                        // const {
                                        //     taskCode,
                                        //     taskName,
                                        //     projectCode
                                        // } = params.row
                                        this.backTask(params.row)
                                    }
                                }
                            }, '撤回'),
                        ])
                    }
                }
            ],
            List: [],
            changeRoute: '',
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
            logId:'',
            logcurrentPage:1,
            dataFlag:false,
            personList:[],
            turnData:{},
            getTurnId:{},

        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        // this.getData()//根据状态查询任务列表
        this.clickSearch()
    },
    activated() {

    },
    methods: {
        //转交
        turnAlround(id,row) {
            console.log(id,row)
            this.getTurnId = row
            this.turnvisible = true
            let data = {}
            this.request('queryNextId', data, true).then((res) => {
                if (res.code == 1) {
                    // this.queryNextId = 
                    this.getPersonList(res.data)
                    // this.personList = res.data
                }
            })
        },
        //获取人员下拉
        getPersonList(id) {
            let data = {}
            data.taskConfigurationId = id
            this.request('getListByTaskConfigurationId', data, true).then((res) => {
                if (res.code == 1) {
                    this.personList = res.data
                }
            })
        },
        //确认转交
        turnSave() {
            // console.log(this.turnData.developer)
            // let data = Util.deepClone(this.tableData[0]);
            let data = {}
            data.developer = this.basicUserName
            data.developerId = this.turnData.developer
            data.taskDetailId = this.getTurnId.id
            data.taskConfigurationId = this.getTurnId.taskConfigurationId
            data.taskConfigurationName = this.getTurnId.taskConfigurationName
            data.taskNo = this.getTurnId.taskNo
            this.request('deliverConfirmTask', data, true).then((res) => {
                if (res.code == 1) {
                    // this.getData()
                    this.turnvisible = false
                    this.turnData = {}
                    this.$message.success(res.msg)
                    this.getConduct()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        changedeveloper(id) {
            console.log(id)
            let developname = ''
            this.personList.map(item => {
                if (id == item.basicUserId) {
                    developname = item.basicUserName
                }
            });
            this.basicUserName = developname
        },
        //取消转交
        turnCancel() {
            this.turnvisible = false
            this.turnData = {}
        },
        clickSearch() {
            this.getTaskId();
            setTimeout(() => {
                this.initdata()
            }, 1000)
        },
        getTaskId() {
            let data = {}
            this.request('fabricDevelop_taskConfiguration_getTaskConfigurationList', data, false).then(res => {
                if (res.code == 1) {
                    this.task = res.data;
                }
            })
        },
        getID() {
            for (let i = 0, len = this.task.length; i < len; i++) {
                if (this.task[i].taskName.indexOf('开发确认任务') != -1) {
                    return this.task[i].id
                }
            }
        },
        initdata() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.status = 0
            data.taskConfigurationId = this.getID()
            this.request('fabric_fabricTaskDetail_dingding', data, false).then((res) => {
                if (res.code == 1) {
                    this.List = res.data.records
                    this.total = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //进行中
        getConduct() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.status = 1
            data.taskConfigurationId = this.getID()
            this.request('fabric_fabricTaskDetail_page', data, false).then((res) => {
                if (res.code == 1) {
                    this.list1 = res.data.records
                    this.total = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getComplete() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.status = 2
            data.taskConfigurationId = this.getID()
            this.request('fabric_fabricTaskDetail_page', data, false).then((res) => {
                if (res.code == 1) {
                    this.list2 = res.data.records
                    this.total = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 撤回任务号
        backTask(row) {
            let data = Util.deepClone(row);
             data.taskDetailId =  row.id
            this.request('retraceConfirmTask', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success(res.msg)
                    this.getComplete()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //改变tabs选项
        changeTab(name) {
            console.log(name)
            if (name == 'jxz') {
                this.logsList = []
                this.page = 1
            this.pageSize = 10
                this.getConduct()
            } else if (name == 'ywc') {
                this.logsList = []
                this.page = 1
            this.pageSize = 10
                this.getComplete()
            } else if (name == 'dwc') {
                this.page = 1
            this.pageSize = 10
                this.initdata()
            }
        },
        //跳转详情页   
        handleSave(id, row) {
            console.log(id, row, '00000000')
            let data = Util.deepClone(row);
            this.request('fabric_developMaterialEnter_inProgress', data, false).then(res => {
                if (res.code == 1) {
                    console.log(row, 'popopopop')
                    this.$router.push({
                        name: 'developConfirmConduct',
                        query: {
                            taskDetailId: id,
                        }
                    });
                }
            })
        },
        handleEditSave(id, row){
            this.$router.push({
                        name: 'developConfirmConduct',
                        query: {
                            taskDetailId: id,
                        }
                    });
        },
        
        //跳转完成页
        handleSaveT(id, row) {
            this.$router.push({
                name: 'developConfirmComplete',
                query: {
                     taskDetailId: id,
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
        //日志
        clickRow(row){
            console.log(row,'0000000000')
            this.getLoglist(row.id)
        },
        getLoglist(id) {
            this.logsList = []
            this.logId = id
            let data = {}
            data.billNo = this.logId
            data.pageSize = 3
            data.logcurrentPage = this.logcurrentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logsList = res.data
                    } else {
                        this.logsList = this.logsList.concat(res.data)
                    }
                }
            })
        },
        getMore() {
            this.logcurrentPage++
            let data = {}
            data.billNo = this.logId
            data.pageSize = 3
            data.currentPage = this.logcurrentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logsList = res.data
                    } else {
                        this.logsList = this.logsList.concat(res.data)
                    }
                }
            })
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
.getmore {
    padding-top: 6px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}
</style>

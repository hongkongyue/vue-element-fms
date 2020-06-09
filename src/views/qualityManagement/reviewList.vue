<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition">
            <Tabs style="min-height:880px;padding-left:0px" type="card" @on-click='changeTab(changeTabs)' v-model='changeTabs'>
                <TabPane label="待完成" name='dwc'>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
                        <div @click="handleSave(item.taskDetailId,item)" v-for="item in List" :value="item.id" :key="item.id" style="margin-bottom:10px;background-color:#f5f7f9">
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
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange1" @on-page-size-change="sizeChange1"></Page>
                        <Table :columns="columns" size="small" highlight-row :data="list1" @on-row-dblclick="edit"></Table>

                    </Row>
                    <Modal title="查看大图" v-model="visible">
                        <img :src="bigstyleImg" v-if="visible" style="width: 100%">
                    </Modal>
                </TabPane>
                <TabPane label="已完成" name='ywc'>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange2" @on-page-size-change="sizeChange2"></Page>
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
// import Util from 'libs/util';
// import axios from 'axios';

export default {
    name: 'reviewList',
    data() {
        return {
            bigstyleImg: '',
            visible: false,
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
                    title: '样品图1',
                    key: 'breviaryStyleImg',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        if (params.row.breviaryStyleImg) {
                            return h('div', {
                                    style: {
                                        height: '40px',
                                        textAlign: 'center',
                                        lineHeight: '40px'
                                    },
                                },
                                [h('img', {
                                        style: {
                                            width: 'auto',
                                            height: 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'cover'
                                        },
                                        domProps: {
                                            src: params.row.breviaryStyleImg,
                                        },
                                        on: {
                                            click: () => {
                                                this.bigstyleImg = params.row.breviaryStyleImg
                                                this.visible = true;
                                            }
                                        }
                                    }, '')

                                ])
                        } else {
                            return h('img', {
                                style: {
                                    display: 'inline-block',
                                    height: '40px',
                                },
                                domProps: {
                                    src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
                                },
                                on: {
                                    click: () => {

                                    }
                                }
                            }, '');
                        }
                    }
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
                                        this.backTask(params.row)
                                    }
                                }
                            }, '撤回'),
                        ])
                    }
                }
            ],
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
                if (this.task[i].taskName.indexOf('检测任务') != -1) {
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
            data.taskDetailId = row.id
            this.request('fabricDevelopCheck_revoke', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success(res.msg)
                    this.getComplete()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //改变tabs选项
        changeTab(name) {
            console.log(name)
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
            console.log(id, row, '00000000')
            let data = Util.deepClone(row);
            this.request('fabric_developMaterialEnter_inProgress', data, false).then(res => {
                if (res.code == 1) {
                    console.log(row, 'popopopop')
                    this.$router.push({
                        name: 'reviewConduct',
                        query: {
                            taskDetailId: id,
                        }
                    });
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleEditSave(id, row) {
            this.$router.push({
                name: 'reviewConduct',
                query: {
                    taskDetailId: id,
                }
            });
        },

        //跳转完成页
        handleSaveT(id, row) {
            this.$router.push({
                name: 'reviewComplete',
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

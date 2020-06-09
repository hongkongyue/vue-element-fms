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
                                {{item.urgent==1?'加急 ':''+' '}}{{item.taskNo + '-' + '你的'+item.taskTypeName+'任务已送达，马上去完成吧！'}}
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
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total1" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange1" @on-page-size-change="sizeChange1"></Page>
                        <Table :columns="columns" size="small" highlight-row :data="list1" @on-row-dblclick="edit"></Table>
                    </Row>
                    <Modal title="查看大图" v-model="visible">
                        <img :src="bigstyleImg" v-if="visible" style="width: 100%">
                    </Modal>
                </TabPane>
                <TabPane label="已完成" name='ywc'>
                    <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
                        <Page style="margin-top:5px;text-align:right" :total="total2" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="currentChange2" @on-page-size-change="sizeChange2"></Page>
                        <Table :columns="columns2" size="small" highlight-row :data="list2" @on-row-dblclick="edit"></Table>

                    </Row>
                </TabPane>
            </Tabs>
        </Row>
        <!-- 打印机 -->
    <Modal v-model="printerListVisible" :styles="mystyle" :rules="rules" title="选择打印机" @on-cancel='cancelRemark' :width="470" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="printformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="打印机" style="padding-left:90px">
                    <el-select v-model="printformdata.print" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in printerList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:140px">
                    <Button type="primary" @click="saveVisible">确认</Button>
                    <Button type="default" @click="cancelVisible">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    </Content>
</Layout>
</template>

<script>
let socket = null;
import Util from 'libs/util';
// import Util from 'libs/util';
// import axios from 'axios';

export default {
    name: 'toAcceptList',
    data() {
        return {
            printformdata:{},
            printerListVisible:false,
            bigstyleImg: '',
            visible: false,
            userInfo: '', //缓存
            taksNo: '', //用于打印，任务单号
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
                    title: '样品来源',
                    key: 'sampleSource',
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
                                        this.onPrint(params.row)
                                    }
                                }
                            }, '打印'),
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
        }
    },
    mounted() {
        this.doConnect()
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        //this.getData()//根据状态查询任务列表
        this.clickSearch()
    },
    activated() {

    },
    methods: {
        doConnect() {
            let self = this
            socket = new WebSocket('ws://localhost:13528');
            //如果是https的话，端口是13529
            //socket = new WebSocket('wss://localhost:13529');
            // 打开Socket
            socket.onopen = function (event) {
                // 监听消息
                socket.onmessage = function (event) {
                    console.log('Client received a message', event);
                    var response = JSON.parse(event.data);
                    if (response.cmd == 'getPrinters') {
                        self.getPrintersHandler(response); //处理打印机列表
                        console.log(JSON.stringify(response));
                    } else if (response.cmd == 'print') {
                        console.log(JSON.stringify(response), 'zhanzhanzhanzhanzha')
                        if (self.seePdfVisible == true) {
                            window.open(JSON.parse(JSON.stringify(response)).previewURL)
                        }
                    }
                };
                // 监听Socket的关闭
                socket.onclose = function (event) {
                    self.$message.warning('菜鸟打印控件链接断开，请启动菜鸟打印控件并刷新页面')
                    console.log('Client notified socket has closed', event);
                };
            };
        },
        /***
         *
         * 获取请求的UUID，指定长度和进制,如
         * getUUID(8, 2)   //"01001010" 8 character (base=2)
         * getUUID(8, 10) // "47473046" 8 character ID (base=10)
         * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
         *
         */
        getUUID(len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [],
                i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        },
        /***
         * 构造request对象
         */
        getRequestObject(cmd) {
            var request = new Object();
            request.requestID = this.getUUID(8, 16);
            request.version = "1.0";
            request.cmd = cmd;
            return request;
        },

        //打印
        onPrint(row) {
                this.taskNo = row.taskNo
                let request = this.getRequestObject("getPrinters");
                request.task = new Object();
                request.task.taskID = this.getUUID(8, 10);
                request.task.preview = false;
                let readtStatus = socket.readyState
                if (readtStatus == 3) {
                    this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                } else {
                    socket.send(JSON.stringify(request)) //获取打印机列表
                }
        },
        getPrintersHandler(res) {
            this.printformdata = {}
            if (res.printers.length == 0) {
                this.$message.error('未配置打印机')
            } else {
                this.printerList = res.printers
                this.printerListVisible = true
            }
        },
        cancelVisible() {
            this.printerListVisible = false
            this.printformdata = {}
        },
        //选择打印机之后 调接口打印
        saveVisible() {
            if (!this.printformdata.print) {
                this.$message.error('请选择打印机')
            } else {
                this.printerListVisible = false
                this.changePrinterConfig() //修改打印机配置
                this.sendPrinterDataTwo()
            }
        },
        //修改打印机配置
        changePrinterConfig() {
            let self = this
            self.changeGetPrinter = self.printformdata.print
            let request = this.getRequestObject("setPrinterConfig");
            request.printer = {
                "name": self.printformdata.print,
                "forceNoPageMargins": true //打印有无边框
            }
            let readtStatus = socket.readtStatus
            if (readtStatus == 3) {
                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
            } else {
                socket.send(JSON.stringify(request))
            }
        },

        sendPrinterDataTwo(id) { //打印数据
            this.seePdfVisible = false
            let request = this.getRequestObject("print");
            request.task = new Object();
            request.task.printer = this.changeGetPrinter;
            request.task.taskID = this.getUUID(8, 10);
            request.task.preview = false;
            //生成数据
            let data = {"taskNo": this.taskNo}

            this.request('fabricQcPrint', data, false).then(res => {
                if (res.code == '1') {
                    let url = window.location.origin + '/eop-boot/washlabel/manage/getPrintTemplate?templateCode=' + res.data.printTemplateCode
                    let documents = new Array();
                    let doc = new Object();
                    doc.documentID = 1;
                    let contents = new Array();
                    contents.push({"data": res.data,
                        "templateURL": url
                    });
                    doc.contents = contents;
                    documents.push(doc);
                    request.task.documents = documents;
                    let readtStatus = socket.readyState
                    if (readtStatus == 3) {
                        this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                    } else {
                        socket.send(JSON.stringify(request))
                    }
                }
            })
        },
        clickSearch() {
            // this.getTaskId();
            // setTimeout(() => {
                this.initdata()
            // }, 1000)
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
        //任务列表
        initdata() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 1 //任务类型
            data.taskStatus = 0
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
        getConduct() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 1 //任务类型
            data.taskStatus = 1
            this.request('showTaskNodeList', data, false).then((res) => {
                if (res.code == 1) {
                    this.list1 = res.data.records
                    this.total1 = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getComplete() {
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize
            data.taskType = 1 //任务类型
            data.taskStatus = 2
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
            data.taskNodeStatus = 1
            data.fabricQcCheckListId = row.checkListMainId
            data.taskNodeId = row.id
            this.request('updateTaskNode', data, false).then(res => {
                if (res.code == 1) {
                    console.log(row, 'popopopop')
                    this.$router.push({
                        name: 'toAcceptConduct',
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
            console.log(row,'-0-')
            this.$router.push({
                name: 'toAcceptConduct',
                query: {
                    id:row.id,
                    checkListMainId: row.checkListMainId,
                    status:row.status,
                    taskType:row.taskType
                }
            });
        },

        //跳转完成页
        handleSaveT(id, row) {
            this.$router.push({
                name: 'toAcceptComplete',
                query: {
                    id:row.id,
                    checkListMainId: row.checkListMainId,
                    status:row.status,
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

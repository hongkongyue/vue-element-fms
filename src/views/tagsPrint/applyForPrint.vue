<template>
<div>
    <header class="headerstyle">

        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('提交') !== -1" size="small" type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('批量导入') !== -1" size="small" type="primary" @click="onImport">批量导入</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('模板下载') !== -1" size="small" type="primary" @click="onDownload">模板下载</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('详情查看') !== -1" size="small" type="primary" @click="onSee">详情查看</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('合格证打印') !== -1" size="small" type="primary" @click="onPrintone(1)">合格证打印</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('洗水唛打印') !== -1" size="small" type="primary" @click="onPrinttwo(2)">洗水唛打印</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('任务完成') !== -1" size="small" type="primary" @click="onFinish">任务完成</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('变更') !== -1" size="small" type="primary" @click="changeStatus">变更</el-button>
                </el-form-item>
            </div>
            <el-form-item label="任务号：" size="small">
                <el-input v-model="formSearch.taskNo" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="任务状态：" size="small">
                <el-select v-model="formSearch.taskStatus" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in statusList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="洗水唛是否打印：" size="small">
                <el-select v-model="formSearch.printone" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in printList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="合格证是否打印：" size="small">
                <el-select v-model="formSearch.printtwo" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in printList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <!-- <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item> -->
        </el-form>

    </header>

    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>

    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="打印明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="colorName" label="颜色" align="center" min-width="120">
                    </el-table-column>
                    <el-table-column prop="scmSize" label="尺码" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="applyNum" label="申请数量" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualCertPrintNum" label="合格证实际打印数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualLabelPrintNum" label="洗唛实际打印数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualCertReprintNum" label="合格证实际补打数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualLabelReprintNum" label="洗唛实际补打数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="certNeeded" label="合格证打印" min-width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.certNeeded == 1 ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="washLabelNeeded" label="洗水唛打印" min-width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.washLabelNeeded == 1 ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="certDataStatus" label="合格证" min-width="120" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.certDataStatus == '1'" size="mini" type="primary" @click="seePdfOne(scope.row.id)">预览</el-button>
                            <p v-if="scope.row.certDataStatus == '0'">{{'无需获取'}}</p>
                            <p v-if="scope.row.certDataStatus == '2'">{{'获取失败'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="washLabelDataStatus" label="洗水唛" min-width="120" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.washLabelDataStatus == '1'" size="mini" type="primary" @click="seePdfTwo(scope.row.id)">预览</el-button>
                            <p v-if="scope.row.washLabelDataStatus == '0'">{{'无需获取'}}</p>
                            <p v-if="scope.row.washLabelDataStatus == '2'">{{'获取失败'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="applyStatus" label="明细状态" min-width="120" align="center">
                        <template slot-scope="scope">
                            {{getApplyStatus(scope.row.applyStatus)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="printLog" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="printLog.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-else>没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>
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

    <!--导入选择文件-->
    <Modal v-model="uploadvisible" title="导入文件" @on-cancel='cancelImport'>
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot//washlabel/manage/importTask" :data="{}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelImport">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
let socket = null;
export default {
    name: 'applyForPrint',
    data() {
        return {
            dataFlag: true,
            logPage: 1,
            uploadvisible: false,
            file: null,
            printformdata: {},
            printerListVisible: false,
            printerList: [],
            statusList: [{
                    name: '待提交',
                    value: 100
                },
                // {
                //     name: '已提交',
                //     value: 200
                // },
                {
                    name: '获取异常',
                    value: 400
                }, {
                    name: '待打印',
                    value: 500
                }, {
                    name: '部分打印',
                    value: 550
                }, {
                    name: '打印完成',
                    value: 600
                }, {
                    name: '任务完成',
                    value: 700
                }
            ],
            printList: [{
                name: '否',
                value: 0
            }, {
                name: '是',
                value: 1
            }],
            activeName: 'first',
            logList: [], //日志
            billNo: '',
            show: false,
            tableData: [],
            visible: false,
            formSearch: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            chosePrint: '', //判断合格证还是洗水唛
            seePdfVisible: false,
            changeGetPrinter: '',
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.printList
        },
        printLog() {
            return this.$store.state.app.printLogList
        }
    },
    mounted() {
        this.$store.commit('clearapplyForPrint')
        this.doConnect()
        this.getButtonJurisdiction() //按钮权限
        this.initTable()
    },
    beforeDestroy() {
        this.$store.commit('clearapplyForPrint')
    },
    methods: {
        getApplyStatus(name) {
            if (name == 100) {
                return '待提交'
            } else if (name == 200) {
                return '已提交'
            } else if (name == 300) {
                return '获取中'
            } else if (name == 400) {
                return '获取异常'
            } else if (name == 500) {
                return '待打印'
            } else if (name == 550) {
                return '部分打印'
            } else if (name == 600) {
                return '打印完成'
            } else if (name == 700) {
                return '任务完成'
            }
        },
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

        //打印合格证
        onPrintone(name) {
            this.chosePrint = name
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择数据')
            } else {
                let request = this.getRequestObject("getPrinters");
                request.task = new Object();
                request.task.taskID = this.getUUID(8, 10);
                request.task.preview = false;
                //组装数据 判断能不能打印
                let data = {}
                data.ids = arr
                data.printType = name
                this.request('washlabel_print', data, true).then(res => {
                    if (res.code == 1) {
                        if (res.data == true) {
                            let readtStatus = socket.readyState
                            if (readtStatus == 3) {
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            } else {
                                socket.send(JSON.stringify(request)) //获取打印机列表
                            }
                            console.log(socket, readtStatus, '------------------')
                        } else {
                            this.$message.error(res.msg)
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //洗水唛打印
        onPrinttwo(name) {
            this.chosePrint = name
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择数据')
            } else {
                let request = this.getRequestObject("getPrinters");
                request.task = new Object();
                request.task.taskID = this.getUUID(8, 10);
                request.task.preview = false;
                //组装数据 判断能不能打印
                let data = {}
                data.ids = arr
                data.printType = name
                this.request('washlabel_print', data, true).then(res => {
                    if (res.code == 1) {
                        if (res.data == true) {
                            let readtStatus = socket.readyState
                            if (readtStatus == 3) {
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            } else {
                                socket.send(JSON.stringify(request)) //获取打印机列表
                            }
                        } else {
                            this.$message.error(res.msg)
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                })
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
            let id = ''
            if (!this.printformdata.print) {
                this.$message.error('请选择打印机')
            } else {
                this.getData();
                this.printerListVisible = false
                this.changePrinterConfig() //修改打印机配置
                if (this.chosePrint == 1) {
                    this.sendPrinterDataOne(id) // 发送打印数据(合格证)
                } else if (this.chosePrint == 2) {
                    this.sendPrinterDataTwo(id)
                }
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
        sendPrinterDataOne(id) { //合格证数据
            this.seePdfVisible = false
            let request = this.getRequestObject("print");
            request.task = new Object();
            request.task.printer = this.changeGetPrinter;
            request.task.taskID = this.getUUID(8, 10);
            request.task.preview = false;
            //生成数据
            let arr = w2ui.applyForPrint.getSelection()
            let data = {}
            if (id != '') {
                data.ids = [id]
                request.task.preview = true;
                this.seePdfVisible = true
            }
            let url = ''
            let newList = []
            let twoList = []
            let oldList = []
            data.applyIds = arr
            data.neededPrintField = true
            data.certNeeded = 1
            // data.washLabelNeeded = this.formSearch.printone
            this.request('washlabel_getDetailByQo', data, false).then(res => {
                if (res.code == '1') {
                    let listone = res.data
                    let list = []
                    listone.map((item) => { //根据明细的申请数量生成多个对象
                        for (let i = 0; i < item.applyNum; i++) {
                            list.push(item)
                        }
                    })
                    //获取当前地址加code 穿给打印机（需要的数据）
                    url = window.location.origin + '/eop-boot/washlabel/manage/getPrintTemplate?templateCode=' + list[0].cainiaoCertTemplateCode
                    list.map((v, index) => { //判断上面生成的数组对象的奇偶数生成两个数组
                        if (index % 2 == 0) {
                            newList.push({
                                brand1: v.brandTagDisplayName,
                                checker1: v.checker,
                                color1: v.colorName,
                                code69a: v.gbCode,
                                goodsNo1: v.goodsNo,
                                price1: v.retailPrice,
                                securityKind1: v.safetyClass,
                                material1: v.scmGoodsMaterial,
                                size1: v.scmSizeName,
                                goodsName1: v.secondLevel,
                                standardNo1: v.standard,
                                level1: v.qualityLevel,
                                sku1: v.goodsNo + v.tagColorCode + v.scmSize,
                                washLabelNo1: v.washLabelNo,
                                standardName1: v.washTag
                            })
                        } else {
                            twoList.push({
                                brand1: v.brandTagDisplayName,
                                checker1: v.checker,
                                color1: v.colorName,
                                code69a: v.gbCode,
                                goodsNo1: v.goodsNo,
                                price1: v.retailPrice,
                                securityKind1: v.safetyClass,
                                material1: v.scmGoodsMaterial,
                                size1: v.scmSizeName,
                                goodsName1: v.secondLevel,
                                standardNo1: v.standard,
                                level1: v.qualityLevel,
                                sku1: v.goodsNo + v.tagColorCode + v.scmSize,
                                washLabelNo1: v.washLabelNo,
                                standardName1: v.washTag
                            })
                        }
                    })
                    if (newList.length > twoList.length) {
                        twoList.push({
                            brand1: '',
                            checker1: '',
                            color1: '',
                            code69a: '',
                            goodsNo1: '',
                            price1: '',
                            securityKind1: '',
                            material1: '',
                            size1: '',
                            goodsName1: '',
                            standardNo1: '',
                            level1: '',
                            sku1: '',
                            washLabelNo1: '',
                            standardName1: ''
                        })
                    }
                    for (let v = 0; v < newList.length; v++) { //两个数据合并成打印机需要的数据
                        oldList.push({
                            brand1: newList[v].brand1,
                            brand2: twoList[v].brand1,
                            checker1: newList[v].checker1,
                            checker2: twoList[v].checker1,
                            color1: newList[v].color1,
                            color2: twoList[v].color1,
                            code69a: newList[v].code69a,
                            code69b: twoList[v].code69a,
                            goodsNo1: newList[v].goodsNo1,
                            goodsNo2: twoList[v].goodsNo1,
                            price1: newList[v].price1,
                            price2: twoList[v].price1,
                            securityKind1: newList[v].securityKind1,
                            securityKind2: twoList[v].securityKind1,
                            material1: newList[v].material1,
                            material2: twoList[v].material1,
                            size1: newList[v].size1,
                            size2: twoList[v].size1,
                            goodsName1: newList[v].goodsName1,
                            goodsName2: twoList[v].goodsName1,
                            standardNo1: newList[v].standardNo1,
                            standardNo2: twoList[v].standardNo1,
                            level1: newList[v].level1,
                            level2: twoList[v].level1,
                            sku1: newList[v].sku1,
                            sku2: twoList[v].sku1,
                            washLabelNo1: newList[v].washLabelNo1,
                            washLabelNo2: twoList[v].washLabelNo1,
                            standardName1: newList[v].standardName1,
                            standardName2: twoList[v].standardName1,
                        })
                    }
                    let documents = new Array();
                    let doc = new Object();
                    doc.documentID = 1;
                    let contents = []
                    oldList.map((v) => {
                        contents.push({
                            "data": v,
                            "templateURL": url
                        });
                    })
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
        sendPrinterDataTwo(id) { //洗水唛数据
            this.seePdfVisible = false
            let request = this.getRequestObject("print");
            request.task = new Object();
            request.task.printer = this.changeGetPrinter;
            request.task.taskID = this.getUUID(8, 10);
            request.task.preview = false;
            //生成数据
            let arr = w2ui.applyForPrint.getSelection()
            let data = {}
            if (id != '') {
                data.ids = [id]
                request.task.preview = true;
                this.seePdfVisible = true
            }
            let url = ''
            let newList = []
            let twoList = []
            data.applyIds = arr
            data.neededPrintField = true
            // data.certNeeded = this.formSearch.printtwo
            data.washLabelNeeded = 1
            this.request('washlabel_getDetailByQo', data, false).then(res => {
                if (res.code == '1') {
                    let list = []
                    let listone = res.data
                    let newList = []
                    listone.map((item) => { //根据明细的申请数量生成多个对象
                        for (let i = 0; i < item.applyNum; i++) {
                            list.push(item)
                        }
                    })
                    list.map((i) => {
                        url = window.location.origin + '/eop-boot/washlabel/manage/getPrintTemplate?templateCode=' + i.cainiaoLabelTemplateCode + '&labelPicScmObjectId=' + i.washLabelPicObjId
                        newList.push({
                            "data": {
                                washLabelNo: i.washLabelNo,
                                color: i.colorName,
                                size: i.scmSizeName,
                                material: i.scmGoodsMaterial,
                                note: i.scmGoodsNote,
                            },
                            "templateURL": url
                        })
                    })
                    let documents = new Array();
                    let doc = new Object();
                    doc.documentID = 1;
                    doc.contents = newList;
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
        //合格证预览PDF
        seePdfOne(id) {
            this.sendPrinterDataOne(id)
        },
        //洗水唛预览
        seePdfTwo(id) {
            this.sendPrinterDataTwo(id)
        },
        //导入
        onImport() {
            this.uploadvisible = true
        },
        upLoadFile() {
            let data = new FormData
            data.append('file', this.file)
            this.request('washlabel_importTask', data, true).then(res => {
                if (res.code == 1) {
                    this.file = null
                    this.$message.success('上传成功')
                    this.uploadvisible = false
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        cancelImport() {
            this.file = null
            this.uploadvisible = false
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.$refs.upload.post(this.file);
                this.upLoadFile()
            }
        },
        //上传之前
        handleUpload(file) {
            if (!/\.csv$|.xls$|.xlsm$|.xlsx$|.xlt$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file //需要传给后台的file文件
                this.name = file.name
            }
            return false
        },

        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                this.loadingStatus = false;
                this.file = null;
                this.$message.success(res.msg);
                this.uploadvisible = false;
                this.imgUrlSave = res.data
            } else {
                this.loadingStatus = false;
                this.$message.error({
                    content: res.msg,
                    duration: 3
                });
            }
        },
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        //任务完成   
        onFinish() {
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择需要完成的数据')
            } else {
                let data = {}
                data.ids = arr
                this.request('washlabel_finish', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('任务完成成功')
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //提交
        onSubmit() {
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择提交的数据')
            } else {
                let data = {}
                data.ids = arr
                this.request('washlabel_submit', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('提交成功')
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //模板下载
        onDownload() {
            window.location.href = 'https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/WashLabelPrintApplyBizServiceImpl/importTask/合格证洗水唛打印导入模板20200421.xlsx'
        },
        //新增
        onAdd() {
            let name = this.$route.query.code
            this.$router.push({
                name: 'addPrint',
                query: {
                    code: name
                }
            });
        },
        //编辑
        onEdit() {
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择需要完成的数据')
            } else if (arr.length > 1) {
                this.$message.warning('一次只能编辑一条数据')
            } else {
                let taskCode = ''
                let applyStatus = ''
                this.tableData.map((i) => {
                    if (arr[0] == i.id) {
                        taskCode = i.taskNo
                        applyStatus = i.applyStatus
                    }
                })
                if (applyStatus == '待提交') {
                    let name = this.$route.query.code
                    this.$router.push({
                        name: 'editPrint',
                        query: {
                            code: name,
                            id: arr[0]
                        }
                    });
                } else {
                    this.$message.warning(applyStatus + '不能编辑')
                }
                console.log(applyStatus, '//////////////')
            }
        },
        //查看详情
        onSee() {
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择需要完成的数据')
            } else if (arr.length > 1) {
                this.$message.warning('一次只能编辑一条数据')
            } else {
                let name = this.$route.query.code
                this.$router.push({
                    name: 'printDetails',
                    query: {
                        code: name,
                        id: arr[0]
                    }
                });
            }
        },
        //变更任务
        changeStatus(){
            let arr = w2ui.applyForPrint.getSelection()
            if (arr.length == 0) {
                this.$message.warning('请先选择变更任务的数据')
            } else if (arr.length > 1) {
                this.$message.warning('一次只能变更一条数据')
            }else{
                let vars = {}
                vars.id = arr[0]
                this.requestWithUriVars('washlabel_rejectTask', vars, null, false).then(res => {
                    if (res.code == 1) {
                        this.$message.success('变更任务成功')
                        this.getData()
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }
        },
        getButtonJurisdiction() {
            let data = {}
            data.parentResourceCode = this.$route.query.code
            this.request('masterData_resource_buttonResource', data, false).then(res => {
                if (res.code == 1) {
                    this.buttonList = res.data
                    let newList = []
                    this.buttonList.map(function (item) {
                        newList.push(item.resourceName)
                    })
                    this.judgeMenu = newList
                }
            })
        },
        initTable(arr = []) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'applyForPrint',
                    header: 'List of Names',
                    show: {
                        toolbar: true,
                        // footer        : true,
                        selectColumn: true,
                        // expandColumn: true
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [{
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'taskNo',
                            caption: '任务号',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'applier',
                            caption: '申请人',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'basicDepartmentName',
                            caption: '申请部门',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'scmBrandName',
                            caption: '品牌',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'applyStatus',
                            caption: '任务状态',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'applyNum',
                            caption: '申请总数',
                            size: '100px'
                        },
                        {
                            field: 'actualCertPrintNum',
                            caption: '合格证实际打印数',
                            size: '100px'
                        },
                        {
                            field: 'actualLabelPrintNum',
                            caption: '洗唛实际打印数',
                            size: '100px'
                        },
                        {
                            field: 'actualCertReprintNum',
                            caption: '合格证实际补打数',
                            size: '100px'
                        },
                        {
                            field: 'actualLabelReprintNum',
                            caption: '洗唛实际补打数',
                            size: '100px'
                        },
                        // {
                        //     field: 'actualPrintNum',
                        //     caption: '实际打印数',
                        //     size: '100px'
                        // },
                        {
                            field: 'taker',
                            caption: '任务领取人',
                            size: '100px'
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px'
                        },
                        {
                            field: 'submitTime',
                            caption: '提交时间',
                            size: '100px'
                        },
                        {
                            field: 'scmSyncTime',
                            caption: '获取异常时间',
                            size: '100px'
                        },
                        {
                            field: 'printTime',
                            caption: '打印时间',
                            size: '100px'
                        }
                    ],
                    onClick: function (event, obj) {
                        let orderId = null
                        self.logPage = 1
                        self.$store.commit('clearapplyForPrint')
                        w2ui['applyForPrint'].records.map(function (item) {
                            if (obj.recid == item.recid) {
                                orderId = item.orderId
                            }
                        })
                        sessionStorage.setItem('wash_label_apply_', JSON.stringify(obj.recid))
                        self.getLoglist(obj.recid)
                        self.getDetail(obj.recid)
                    }
                })
            });
            if (arr.length > 0) {
                $('#main').w2render('applyForPrint');
                w2ui.applyForPrint.clear(); //清空
                w2ui.applyForPrint.records = arr
                w2ui.applyForPrint.refresh();
            } else {
                $('#main').w2render('applyForPrint')
                w2ui.applyForPrint.clear(); //清空
                w2ui['applyForPrint'].records = []
                w2ui.applyForPrint.refresh();
            }

        },
        getData() {
            this.$store.commit('clearapplyForPrint')
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.applyStatus = this.formSearch.taskStatus
            data.taskNo = this.formSearch.taskNo
            data.certNeeded = this.formSearch.printtwo
            data.washLabelNeeded = this.formSearch.printone
            this.request('washlabel_page', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index = i + 1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records)
                        // this.hasData=true
                    } else {
                        //  this.initTable([])
                        this.initTable()
                    }
                    this.total = res.data.count;
                    // this.initTable(res.data.data)
                    this.tableData = res.data.records;
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo ? 'wash_label_apply_' + billNo : 'wash_label_apply_' + JSON.parse(sessionStorage.getItem('wash_label_apply_'))
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                        this.$store.commit('applyForPrintLog', this.logList)
                    } else {
                        if (this.logPage == 2) {
                            this.logList = this.printLog;
                        }
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('applyForPrintLog', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
            // this.logPage++
            // let data = {}
            // data.billNo = this.billNo
            // data.pageSize = 3
            // data.currentPage = this.logPage
            // this.request('billLog_getPagingByBillNo', data, false).then((res) => {
            //     if (res.code == 1) {
            //         if (res.data.length < data.pageSize) {
            //             this.dataFlag = false
            //         } else {
            //             this.dataFlag = true
            //         }
            //         if (this.logPage == 1) {
            //             this.logList = res.data
            //             this.$store.commit('applyForPrintLog', this.logList)
            //         } else {
            //             this.logList = this.logList.concat(res.data)
            //             this.$store.commit('applyForPrintLog', this.logList)
            //         }
            //     }
            // })
        },
        //货品明细
        getDetail(id) {
            let data = {}
            data.applyIds = [id]
            this.request('washlabel_getDetailByQo', data, false).then(res => {
                if (res.code == '1') {
                    this.$store.commit('applyForPrint', res.data)
                }
            })
        },

        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        onReset() {
            this.formSearch = {}
        },

    }
}
</script> 

<style lang="less" scoped>
.headerstyle,
.main,
.middle,
.footer {
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
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

.pointer {
    cursor: pointer;
}

.pl20 {
    padding-left: 20px
}
</style>

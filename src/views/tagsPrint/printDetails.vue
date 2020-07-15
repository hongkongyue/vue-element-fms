<template>
<div>
    <section class="middle" :style="allHeight">
        <p style="font-weight:900;font-size:14px">查看详情</p>
        <el-divider></el-divider>
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item label="合格证：" size="small">
                <el-select v-model="formSearch.certDataStatus" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="洗水唛：" size="small">
                <el-select v-model="formSearch.washLabelDataStatus" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onSave">保存</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onResect">重新获取</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onPrintone(1)">合格证补打</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onPrinttwo(2)">洗水唛补打</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <p style="font-weight:900;font-size:14px;margin-bottom:20px">主单</p>
        <Row>
            <Col span="6">
            任务号：{{mainData.taskNo}}
            </Col>
            <Col span="6">
            申请人：{{userName}}
            </Col>
            <Col span="6">
            品牌：{{mainData.scmBrandName}}
            </Col>
            <Col span="6">
            申请总数：{{mainData.applyNum}}
            </Col>
        </Row>
        <el-divider></el-divider>
        <p style="font-weight:900;font-size:14px;margin-bottom:20px">明细</p>
        <el-table :data="tableList" @selection-change="handleSelectionChange" style="width: 100%" border tooltip-effect="dark" :max-height="maxTableHight" size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="colorName" label="颜色" align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="scmSize" label="尺码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="applyNum" label="申请数量" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="actualCertPrintNum" label="合格证实际打印数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualLabelPrintNum" label="洗唛实际打印数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualCertReprintNum" label="合格证实际补打数" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="actualLabelReprintNum" label="洗唛实际补打数" min-width="120" align="center">
                    </el-table-column>
            <el-table-column prop="reprintNum" label="补打数量" min-width="150" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="min-width:110px;" v-model="scope.row.reprintNum" precision="0" size="mini" controls-position="right" :min="1" :max="10000"></el-input-number>
                    <!-- <el-input   style="min-width:80px;" v-model="scope.row.reprintNum" @keyup.native="number($event)"></el-input> -->
                </template>
            </el-table-column>
            <el-table-column prop="certNeeded" label="合格证打印" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.certNeeded == 1 ? '是' : '否'}}
                </template>
            </el-table-column>
            <el-table-column prop="washLabelNeeded" label="洗水唛打印" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.washLabelNeeded == 1 ? '是' : '否'}}
                </template>
            </el-table-column>
            <el-table-column prop="certDataStatus" label="合格证" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.certDataStatus == '1'" size="mini" type="primary" @click="seePdfOne(scope.row.id)">预览</el-button>
                    <p v-if="scope.row.certDataStatus == '0'">{{'无需获取'}}</p>
                    <p v-if="scope.row.certDataStatus == '2'">{{'获取失败'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="washLabelDataStatus" label="洗水唛" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.washLabelDataStatus == '1'" size="mini" type="primary" @click="seePdfTwo(scope.row.id)">预览</el-button>
                    <p v-if="scope.row.washLabelDataStatus == '0'">{{'无需获取'}}</p>
                    <p v-if="scope.row.washLabelDataStatus == '2'">{{'获取失败'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="applyStatus" label="明细状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{getApplyStatus(scope.row.applyStatus)}}
                </template>
            </el-table-column>
        </el-table>
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
</div>
</template>

<script>
let socket = null;
import {burypoint} from 'mixins/burypoint'
export default {
    name: 'printDetails',
    mixins:[burypoint],
    data() {
        return {
            printerListVisible:false,
            printformdata:{},
            brandList: [{
                id: 0,
                name: '无需获取'
            }, {
                id: 1,
                name: '获取成功'
            }, {
                id: 2,
                name: '获取失败'
            }],
            maxTableHight: null,
            allHeight: null,
            formSearch: {},
            formSee: {},
            tableList: [],
            selectionList: [],
            mainData: {},
            userName: '',
            changeGetPrinter:'',
        }
    },
    mounted() {
        this.userName = JSON.parse(window.sessionStorage.getItem('userinfo')).userName
        this.onSearch()
        this.getMainData()
        this.doConnect()
        if (window.screen.height > 1000) {
            this.allHeight = "height:840px"
            this.maxTableHight = 480
        } else {
            this.allHeight = "height:620px"
            this.maxTableHight = 250
        }
    },
    destroyed() {

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
        //获取主表数据
        getMainData() {
            let data = {}
            data.id = this.$route.query.id
            this.request('washlabel_getMainOrderById', data, true).then(res => {
                if (res.code == 1) {
                    this.mainData = res.data
                }
            })
        },
        //查询
        onSearch() {
            this.setBuryPoint('查询')
            let data = {}
            data.applyIds = [this.$route.query.id]
            data.neededPrintField = true
            data.certDataStatus = this.formSearch.certDataStatus
            data.washLabelDataStatus = this.formSearch.washLabelDataStatus
            this.request('washlabel_getDetailByQo', data, true).then(res => {
                if (res.code == '1') {
                    this.tableList = res.data
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //保存 修改补打数量
        onSave(){
            this.setBuryPoint('保存')
            let _root_ = []
            this.tableList.map((item)=>{
                _root_.push({
                    id:item.id,
                    reprintNum:item.reprintNum
                })
            })
            this.request('washlabel_changeReprintNum', _root_, true).then(res => {
                if (res.code == '1') {
                    this.$message.success('保存成功')
                    this.onSearch()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //重新获取
        onResect(){
            this.setBuryPoint('重新获取')
            let data = {}
            data.ids = this.selectionList
            data.applyId = this.$route.query.id
            data.certDataStatus = this.formSearch.certDataStatus
            data.washLabelDataStatus = this.formSearch.washLabelDataStatus
            this.request('washlabel_refreshData', data, true).then(res => {
                if (res.code == '1') {
                    this.$message.success('重新获取成功')
                    this.onSearch()
                }else{
                    this.$message.error(res.msg)
                }
            })
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
            this.setBuryPoint('合格证补打')
            this.chosePrint = name
            let arr = this.selectionList
            if (arr.length == 0) {
                this.$message.warning('请先选择数据')
            } else {
                let request = this.getRequestObject("getPrinters");
                request.task = new Object();
                request.task.taskID = this.getUUID(8, 10);
                request.task.preview = false;
                //组装数据 判断能不能打印
                let data = {}
                data.applyId = this.$route.query.id
                data.detailIds = arr
                data.printType = name
                this.request('washlabel_reprint', data, true).then(res => {
                    if (res.code == 1) {
                        if (res.data == true) {
                            let readtStatus = socket.readyState
                            if(readtStatus == 3){
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            }else{
                                socket.send(JSON.stringify(request))
                            }
                            // socket.send(JSON.stringify(request)) //获取打印机列表
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
            this.setBuryPoint('洗水唛补打')
            this.chosePrint = name
            let arr = this.selectionList
            if (arr.length == 0) {
                this.$message.warning('请先选择数据')
            } else {
                let request = this.getRequestObject("getPrinters");
                request.task = new Object();
                request.task.taskID = this.getUUID(8, 10);
                request.task.preview = false;
                //组装数据 判断能不能打印
                let data = {}
                data.applyId = this.$route.query.id
                data.detailIds = arr
                data.printType = name
                this.request('washlabel_reprint', data, true).then(res => {
                    if (res.code == 1) {
                        if (res.data == true) {
                            let readtStatus = socket.readyState
                            if(readtStatus == 3){
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            }else{
                                socket.send(JSON.stringify(request))
                            }
                            // socket.send(JSON.stringify(request)) //获取打印机列表
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
            this.printformdata={}
            // this.printformdata = {}
            if (res.printers.length == 0) {
                this.$message.error('未配置打印机')
            } else {
                this.printerList = res.printers
                this.printerListVisible = true
            }
        },
        cancelVisible(){
            this.printerListVisible = false
            this.printformdata = {}
        },
        //选择打印机之后 调接口打印
        saveVisible() {
            let id = ''
            if (!this.printformdata.print) {
                this.$message.error('请选择打印机')
            } else {
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
            let readtStatus = socket.readyState
            if(readtStatus == 3){
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            }else{
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
            let arr = this.selectionList
            let data = {}
            let kkList = []
            let listone = this.originList
            if (id != '') {
                data.ids = arr
                request.task.preview = true;
                this.seePdfVisible = true
                this.tableList.map((i)=>{
                    if(id == i.id){
                        kkList.push(i)
                    }
                })
                listone = kkList
            }
            let url = ''
            let newList = []
            let twoList = []
            let oldList = []
                    let list = []
                    listone.map((item) => { //根据明细的申请数量生成多个对象
                        for (let i = 0; i < item.reprintNum; i++) {
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
                    if(readtStatus == 3){
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            }else{
                                socket.send(JSON.stringify(request))
                            }
                // }
            // })

        },
        sendPrinterDataTwo(id) { //洗水唛数据
            this.seePdfVisible = false
            let request = this.getRequestObject("print");
            request.task = new Object();
            request.task.printer = this.changeGetPrinter;
            request.task.taskID = this.getUUID(8, 10);
            request.task.preview = false;
            //生成数据
            let arr = this.selectionList
            let data = {}
            let listone = this.originList
            let kkList = []
            if (id != '') {
                data.ids = arr
                request.task.preview = true;
                this.seePdfVisible = true
                this.tableList.map((i)=>{
                    if(id == i.id){
                        kkList.push(i)
                    }
                })
                listone = kkList
            }
            let url = ''
            let newList = []
            let twoList = []
                
                    let list = []
                    
                    listone.map((item) => { //根据明细的申请数量生成多个对象
                        for (let i = 0; i < item.reprintNum; i++) {
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
                    if(readtStatus == 3){
                                this.$message.warning('连接失败，请重启菜鸟打印控件并刷新页面')
                            }else{
                                socket.send(JSON.stringify(request))
                            }
            // })
        },
        //合格证预览PDF
        seePdfOne(id) {
            this.setBuryPoint('合格证预览')
            this.sendPrinterDataOne(id)
        },
        //洗水唛预览
        seePdfTwo(id) {
            this.setBuryPoint('洗水唛预览')
            this.sendPrinterDataTwo(id)
        },
        //申请数量格式校验
        // number(e) {
        //     let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);
        //     if (!flag) {
        //         this.$message({
        //             showClose: true,
        //             message: "请输入正整数",
        //             type: "warning"
        //         });
        //         // e.target.value = 1
        //     }
        // },
        handleSelectionChange(selection) {
            let list = []
            selection.map((item) => {
                list.push(item.id)
            })
            this.selectionList = list
            this.originList = selection
        },
        //删除
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

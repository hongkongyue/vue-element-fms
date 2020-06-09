<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                 <Button type="primary" @click="onPrint()">打印</Button>
            </div>
            <h3>检测任务详情</h3>
            <el-form :inline="true" :model="formData" label-width="120px" class="demo-form-inline ">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="任务编号：" size="small">
                            {{this.formObj.taskNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="品牌发起人：" size="small">
                            {{this.formObj.initiatingPromoter}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="发起部门：" size="small">
                            {{this.formObj.initiatingDepartment}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="样品来源：" size="small">
                            {{this.formObj.sampleSource}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="开发员：" size="small">
                            {{this.formObj.developer}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="面料品类分类：" size="small">
                            {{this.formObj.kinds}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="特殊工艺类目：" size="small">
                            {{this.formObj.specialProcessCategory}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="面/辅料：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="是否有实物：" size="small">
                            {{this.formObj.realMaterial == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="是否撞色：" size="small">
                            {{this.formObj.contrastColor == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="图1：" size="small">
                             <el-image  style="width: 40px; height: 40px" :src="this.formObj.styleImg" :preview-src-list="[this.formObj.styleImg]">
                        </el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="图2：" size="small">
                            <el-image style="width: 40px; height: 40px" :src="this.formObj.styleImg2" :preview-src-list="[this.formObj.styleImg2]">
                        </el-image>
                        </el-form-item>
                    </el-col>

                    <!-- 大货 -->
                      <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="大货款号：" size="small">
                            {{this.formObj.goodsNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="大货批次：" size="small">
                            {{this.formObj.batchNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="设计款号：" size="small">
                            {{this.formObj.designNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="颜色：" size="small">
                            {{this.formObj.styleColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="下单总数：" size="small">
                            {{this.formObj.purchaseQty}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="使用部位：" size="small">
                            {{this.formObj.usingPart}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="供应商：" size="small">
                            {{this.formObj.supplier}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="物料编号+色号：" size="small">
                            {{this.formObj.materialNoPlusColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="样品类别：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="样品名称：" size="small">
                             {{this.formObj.kinds}}{{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="bigGoods">
                        <el-form-item label="织法：" size="small">
                            {{this.formObj.weaveMethod}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="检测说明：" size="small">
                            {{this.formObj.description}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="受理说明：" size="small">
                            <el-input type="textarea" disabled :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="formObj.acceptRemark">
                            </el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="!bigGoods">
                        <el-form-item label="织法：" size="small">
                            <div  style="width:180px;height:100px;border:1px solid #eee;padding:3px 3px;overflow-y:auto">
                                       <el-radio-group disabled v-model="formObj.weaveMethod" v-for="v in weaveMethodList" :key="v.label">
                                            <el-radio style="padding-left:10px" :label="v.name">{{v.name}}</el-radio>
                                        </el-radio-group>
                                 </div>
                            <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input> -->

                        </el-form-item>
                    </el-col>
                    <!--  -->
                </el-row>
            </el-form>
            <el-divider></el-divider>
             <div style="display: inline-flex;"><h3>检测项目</h3>  </div>
             <el-table ref="multipleTable"  :data="tableData" style="width: 100%" border tooltip-effect="dark" max-height="220" @selection-change="handleSelectionChange">
            <!-- <el-table-column
                type="selection"
                width="55">
            </el-table-column> -->
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="basicQcItemContent" label="检测项目" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="internal" label="内检" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <el-checkbox disabled v-model="scope.row.internal"></el-checkbox>
                    </template>
            </el-table-column>
            <el-table-column prop="outside" label="外检" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <el-checkbox disabled v-model="scope.row.outside"></el-checkbox>
                    </template>
            </el-table-column>
        </el-table>
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
import axios from 'axios';

import {
    debounce
} from 'mixins/debounce'
export default {
    mixins: [debounce],
    name: 'toAcceptComplete',
    data() {
        return {
            printformdata:{},
            printerListVisible:false,
            weaveMethodList:[],
            formObj:{
            },
            bigGoods:false, //判断任务类型
            formData: {},
            noneUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            testList: [{
                name: '合格',
                id: '1'
            }, {
                name: '不合格',
                id: '0'
            }],
            basicUserName: '',
            addformdata: {},
            turnData: {},
            personList: [], //开发员
            tableData: [{yearsCode:'23456',years:false}],
            srcList: [],
            formSearch: {},
            visible: false,
            turnvisible: false,
        }
    },
    mounted() {
        this.getWeaveMethod()
        this.getData()
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        this.doConnect()
    },
    methods: {
        getWeaveMethod(){
            this.request('getWeaveMethod', {}, false).then((res) => {
                if (res.code == 1) {
                    this.weaveMethodList = res.data
                }
            })
        },
        getData() {
            let data = {}
            data.taskFlowId = this.$route.query.checkListMainId
            data.taskStatus = this.$route.query.status
            data.taskType = this.$route.query.taskType
            this.request('showTaskNode', data, false).then((res) => {
                if (res.code == 1) {
                    let list = res.data.details
                    list.map((item)=>{
                        if(item.internal == 1){
                            this.$set(item,'internal',true)
                        }else{
                            this.$set(item,'internal',false)
                        }
                        if(item.outside == 1){
                            this.$set(item,'outside',true)
                        }else{
                            this.$set(item,'outside',false)
                        }
                    })
                    this.tableData = list
                    this.formObj = res.data
                    // this.formObj.weaveMethod = res.data.weaveMethod
                }
            })
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
        //打印
        onPrint() {
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
            let data = {"taskNo": this.formObj.taskNo}

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
    }
}
</script>
<style lang="less" scoped="scoped">
.el-form-item--small.el-form-item {
    margin-bottom: 0px!important;
}
.el-icon-circle-close:before {
 color:white
}
</style>
<style>
.el-icon-circle-close:before {
    color: white
}
</style><style>
.el-image-viewer__close {
    color: #fff !important;
}

.el-image-viewer__prev,
.el-image-viewer__next {
    display: none;
}
</style>

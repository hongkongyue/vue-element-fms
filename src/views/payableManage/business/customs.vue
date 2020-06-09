<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item v-if="judgeMenu.indexOf('查询') !== -1" size="small">
                <el-button size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('审核') !== -1" size="small">
                <el-button size="small" type="primary" @click="onExamine">审核</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('取消审核') !== -1" size="small">
                <el-button size="small" type="primary" @click="offExamine">取消审核</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('代销结算') !== -1" size="small">
                <el-button size="small" type="primary" @click="onConfirm">代销结算</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('代销转经销') !== -1" size="small">
                <el-button size="small" type="primary" @click="onTurnAround">代销转经销</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('经销转代销') !== -1" size="small">
                <el-button size="small" type="primary" @click="distributionAndresale">经销转代销</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('生成结算明细') !== -1" size="small">
                <el-button size="small" type="primary" @click="generateSettlementDetails">生成结算明细</el-button>
            </el-form-item>
            <el-form-item v-if="judgeMenu.indexOf('删除') !== -1" size="small">
                <el-button size="small" type="primary" @click="onDelete">删除</el-button>
            </el-form-item>
             <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('导出') != -1" size="small" type="primary" @click="checkExport">导出</el-button>
                    </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <!-- <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('强制核销') !== -1" size="small" type="primary" @click="forceWrite">强制核销</el-button>
            </el-form-item> -->
        </el-form>
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item label="年份：" size="small">
                <el-date-picker style="width:100px" value-format="yyyy" v-model="formSearch.year" type="year" placeholder="选择年份">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" style="width:150px" clearable></el-input>
            </el-form-item>
            <el-form-item label="制单号：" size="small">
                <el-input v-model="formSearch.ordersNo" style="width:150px" clearable></el-input>
            </el-form-item>
            <el-form-item label=" 公 司 ：" size="small" >
                        <el-select v-model="formSearch.companyId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable clearable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supplier" value-key="id" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in supplierList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算类型：" size="small">
                <el-select v-model="formSearch.settlement" value-key="id" filterable clearable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in settlementList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否结算：" size="small">
                <el-select v-model="formSearch.settle" value-key="id" filterable clearable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in settleList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="允许结算：" size="small">
                <el-select v-model="formSearch.agreeSettlement" value-key="id" filterable clearable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in agreeSettlementList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="单据日期：" size="small">
                <!-- <el-date-picker v-model="formSearch.documentDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker v-model="formSearch.documentDateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.documentDateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-if="show == true" label="关单时间：" size="small">
                <el-date-picker v-model="formSearch.orderDateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.orderDateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
                <!-- <el-date-picker v-model="formSearch.orderDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
            </el-form-item>
            <el-form-item v-if="show == true" label="单据状态：" size="small">
                <el-select v-model="formSearch.status" value-key="id" filterable clearable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in statusList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>

    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <el-table :data="customsList" style="width: 100%" border  show-summary
                          :summary-method="getSummaries" tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="closingTime" label="关单时间" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsStatus" label="大货状态" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="color" label="颜色" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="colorNo" label="色号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningType" label="规划类型" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="size" label="尺码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="quantity" label="数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="photoSampleNum" label="拍照样数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taxIncludedTotalPurchaseUnitPrice" label="含税总采购单价" min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedTotalPurchaseUnitPrice|singlePrice}}</div></template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPurchaseUnitPrice" label="含税采购单价" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedPurchaseUnitPrice|singlePrice}}</div></template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedTrialFee" label="含税试制费单价" min-width="120" align="center" show-overflow-tooltip>
                      <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedTrialFee|singlePrice}}</div></template>
                    </el-table-column>
                    <el-table-column prop="contractAmount" label="合约金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope"><div style="text-align:right">{{scope.row.contractAmount|moneyFilters}}</div></template>
                    </el-table-column>
                     <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="customsLogList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="customsLogList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="customsLogList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>
       <!-- 代销转经销 -->
       <Modal v-model="visible"  title="代销转经销" @on-cancel="cancelSales"  :width="610"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm"  :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
               
                <Col span="24">
                <Col span="24">
                <span style="color:red;position:relative;left:40px;top:10px">*</span>
                <el-form-item label="调整原因 :"  size="small" label-width="120px">
                    <el-select v-model="addformdata.reason" style="width:200px" filterable clearable>
                        <el-option v-for="v in adjustReason" :key="v.id" :label="v.name" :value="v.name"></el-option>
                    </el-select>
                </el-form-item>
                   </Col>
                </Col>
                <Col span='24'>
                <Col span="24">
                <el-form-item label="图片上传 ：" size="small" label-width="130px">
                    <div style="width: 100px; height: 100px" @click="clickImg('1')">
                        <el-image v-if="imgUrl1" style="width: 100px; height: 100px" :src="bowersPict">
                        </el-image>
                       <el-image v-if="!imgUrl1" style="width: 100px; height: 100px" :src="noneUrl"></el-image>
                    </div>
                </el-form-item>
                </Col>
                <!-- <Col span="8">
                <div style="width: 100px; height: 100px" @click="clickImg('2')"> 
                    <el-image v-if="imgUrl2.length>0" style="width: 100px; height: 100px" :src="imgUrl2"></el-image>
                    <el-image v-if="imgUrl2.length == 0" style="width: 100px; height: 100px" :src = noneUrl></el-image>
                </div>
                
                </Col> -->
                </Col>
                <Col span="24">
                <el-form-item style="padding-left:230px">
                    <Button type="primary" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="default" @click="cancelSales">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
      <!--导入账单选择文件-->
    <Modal v-model="picVisible" @on-cancel='cancelGood' title="上传图片">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/masterData/ossFileAddress/upload" :data="{className:'面料开发'}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将图片拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <!-- <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button> -->
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelGood">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>
     <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col v-show="!moreLarge">
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="1"></el-option>
                            <el-option label="导出主表+明细" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-show="moreLarge" style="text-align:center">
                       目前要导出的数据超过10万条，确定继续导出吗？
                </Col>
                <el-form-item style="padding-left:130px">
                    <Button type="primary" v-if="!moreLarge" @click="getExportTotal">确认</Button>
                    <!-- 二次确认 -->
                    <Button type="primary" v-if="moreLarge" @click="onImport">确认</Button> 
                    <Button type="default" @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
     import { mapState } from 'vuex'
     import filters from '../../../filter/'
     let delaiList = [];
     let logList = [];
     var record={}
export default {
// delaiList,
// logList,
    data() {
        return {
             noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            payableUserList:[],
            settleList:[{name:'是',id:1},{name:'否',id:0}],
            companyList:[],
             exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            logList:[],
            delaiList:[],
            supplierList:[],
            logPage     : 1,      //当前页面数量
            settlementList:[
                {value:1,name:'经销'},
                {value:-1,name:'代销'},
            ],
            agreeSettlementList:[
                {value:-1,name:'否'},
                {value:1,name:'是'}
            ],
            statusList:[
                {value:0,name:'待审核'},
                {value:1,name:'已审核'}
            ],
            platformOptions: [],
            activeName: 'first',
            verifyFailureTypeList: [{
                value: 1,
                name: '应收单不存在'
            }, {
                value: 2,
                name: '金额对不上'
            }],
            timeAA: null,
            timeBB: null,
            qtyCurrentPage: '- -', //当前页数量合计
            qtyForAll: '- -', //数量总合计
            amountCurrentPage: '- -', //当前页应收金额合计
            amountForAll: '- -', //应收金额总合计
            // tableList:[],//合计
            billNo: '',
            show: false,
            zhan: false,
            col: [],
            tableData: [],
            formThead: [],
            timeList: [], //期间
            file: null,
            visible: false,
            importData: [{
                    value: 1,
                    name: '通用格式'
                },
                {
                    value: 0,
                    name: '特定格式'
                }
            ],
            brandList: [],
            shopList: [],
            idList: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            statusQptions: [{
                    value: 1,
                    name: '已核销'
                },
                {
                    value: 0,
                    name: '未核销'
                }
            ],
            formSearch: {
                code: '',
                name: '',
                person: '',
                supplier:'',
            },
            formChange: {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
            },
            activeName:'first',
            titleArray: [],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            currentPageDelait: 1,
            footerData: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            ASDid: '',
            list:[],
            addformdata:{
                         reason:null
            },
            imgUrl1:'',
            bowersPict:'',
            adjustReason:[],
            rules: {
                 reason: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            },
            picVisible:false,
        }
    },
    // computed: {
    //     goodsList() {
    //         return this.$store.state.app.verificationList
    //     },
    //     goodsListOne() {
    //         return this.$store.state.app.oneverificationList
    //     }
    // },
     computed: mapState({
                customsList  : state => state.customs.customsList,
                customsLogList :  state => state.customs.customsLogList,
                customsId  :  state => state.customs.id,
                recordHttpList:state=>state.customs.recordHttpList,
      }),
    destroyed() {
       this.resetCommit()
    },
    mounted() {
        this.getPayableUser()
        this.getplatformOptions()
        this.getCompany()
        this.getSupply()
        // this.getShop()
        this.getBrandList()
        //this.getCompany()
        this.getButtonJurisdiction() //按钮权限
        this.getAdjustReason()
        this.initTable([], '')
    },
    methods: {
       submitForm(formName) {
         if(!this.addformdata.reason)return this.$message.error('调整原因不能为空')
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.onConfirmRound()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelSales(){
               this.visible=false;
               this.imgUrl1=''
               this.bowersPict=''
               this.addformdata.reason=''
      },
      resetForm() {
            this.visible=false
            this.$refs['ruleForm'].resetFields();
            this.addformdata.reason=''
      },
        getAdjustReason(){
             this.request('payable_payable_closed_order_reasonSelector',{},false).then(res=>{
                 if(res.code==1){
                            this.adjustReason=res.data
                 }else{

                 }
             })
        },
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.supplier = ''
            console.log(name)
            let vars = {}
            vars.payableUserId = name
             this.requestWithUriVars('selectorPayableSupplier', vars, null, true).then(res => {
          if (res.code==1) {
              this.supplierList = res.data
            }else{
                this.supplierList = []
            }
          })
        },
        getPayableUser(){
            this.request('supplier_selectorPayable', {}, true).then(res => {
                if (res.code == 1) {
                    this.payableUserList = res.data
                }
            })
        },
        handleClick(tab, event) {
            if(tab.name=='first'){
               
            }else if(tab.name=='second'){
              if(!this.customsId) return
                 this.getLoglist()  
            }
         },
        resetCommit(){
                this.$store.commit('clearcustomsList')
                this.$store.commit('clearcustomsId')
                this.$store.commit('clearcustomsLogList')
                this.$store.commit('clearinitRecordHttpList')
        },
        getSupply() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.supplierList = res.data
                }
            })
        },
         //审核
        onExamine() {
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 1
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '审核 备注:'+(value?value:'无')
                            this.request('closed_doBizService', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消审核'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选审核数据')
            }
        },
        //取消审核
        offExamine() {
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 2
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '取消审核 备注:' +(value?value:'无')
                            this.request('closed_doBizService', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消审核数据')
            }
        },
        //确认结算
        onConfirm(){
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 3
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要结算选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '结算 备注:'  +(value?value:'无')
                            this.request('closed_doBizService', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选确认结算数据')
            }
        },
        //生成结算明细
        generateSettlementDetails(){
           let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 7
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要把选中的数据生成结算明细吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            console.log(value,'88888')
                            data.remark = '生成结算明细 备注:' +''+(value? value :'无')
                            this.request('closed_doBizService', data, true).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('成功')
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选要生成结算明细的数据')
            } 
        },
        //经销转代销
        distributionAndresale(){
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 6
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        //    this.visible=true
                        this.$prompt('确定要经销转代销选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '经销转代销 备注:' +''+(value?value:'无')
                            this.request('closed_doBizService', data, true).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('成功')
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选经销转代销数据')
            }
        },
        //代销转经销
        onTurnAround(){
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 4
            data.idList = arr
            if (arr.length == 1) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.visible=true
                        // this.$prompt('确定要代销转经销选中的数据吗', '操作确认', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        // }).then(({
                        //     value
                        // }) => {
                        //     data.remark = '代销转经销 备注:' +''+(value?value:'无')
                        //     this.request('closed_doBizService', data, true).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success('成功')
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                        // }).catch(() => {
                        //     this.$message({
                        //         type: 'info',
                        //         message: '已取消'
                        //     });
                        // });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请选择一条代销转经销的数据')
            }
        },
        //代销转经销确认
        onConfirmRound(){
                        let arr = w2ui.customs.getSelection()
                        let data = {};
                            data.bizType = 4
                            data.idList = arr
                            data.agencyTransferDistributionReason=this.addformdata.reason
                            data.reasonImgUrl=this.imgUrl1;
                      this.request('closed_doBizService', data, true).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('代销转经销成功')
                                    this.visible=false;
                                    this.imgUrl1=''
                                    this.bowersPict=''
                                    this.addformdata.reason=''
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
        },
        //删除
        onDelete(){
            let arr = w2ui.customs.getSelection()
            let data = {};
            data.bizType = 5
            data.idList = arr
            if (this.checkSelection()) {
                this.request('closed_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要删除选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '删除 备注:'+(value?value:'无')
                            this.request('closed_doBizService', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选删除数据')
            }
        },
        checkSelection() {
            let arr = w2ui.customs.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        getDocumentEncoding(id){
            for(let i=0,len=this.recordHttpList.length;i<len;i++){
                if(this.recordHttpList[i].recid==id){
                    return this.recordHttpList[i].documentEncoding
                }
            }  
        },
        getButtonJurisdiction() {
            let data = {}
            data.parentResourceCode = this.$route.query.code
            this.request('masterData_resource_buttonResource', data, true).then(res => {
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
        initTable(arr = [], page,total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'customs',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                          {
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        {
                            field: 'documentStatusStr',
                            caption: '单据状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '单据日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'documentEncoding',
                            caption: '单据编码',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'completeTime',
                            caption: '完成时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billingTypeStr',
                            caption: '结算类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'allowSettlementStr',
                            caption: '允许结算',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'companyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'supplierName',
                            caption: '供应商',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'brand',
                            caption: '品牌',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'purchaseOrderNo',
                            caption: '制单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderBatch',
                            caption: '批次',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '大货款号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'designNumber',
                            caption: '设计款号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'developmentType',
                            caption: '开发类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'processingType',
                            caption: '加工类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'years',
                            caption: '年份',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'season',
                            caption: '季节',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'waveband',
                            caption: '波段',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderDate',
                            caption: '下单日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'contractDeliveryPeriod',
                            caption: '合约货期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'eightyPercentDate',
                            caption: '80%收货日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderQuantity',
                            caption: '下单数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'stockInNum',
                            caption: '入库数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'totalCostOfFabric',
                            caption: '面料总成本',
                            size: '100px',
                            sortable: true,
                            render:'money'
                        },
                        {
                            field: 'deferredDays',
                            caption: '延期天数',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderDepartment',
                            caption: '下单部门',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'suggestedRemovalTime',
                            caption: '建议下架时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'suggestedSettlementTime',
                            caption: '建议结算时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'allowSettlementTime',
                            caption: '允许结算时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'settlementOrderCode',
                            caption: '结算明细编号',
                            size: '100px',
                            sortable: true
                        },
                        
                        {
                            field: 'reasonImgUrl',
                            caption: '代销转经销调整附件',
                            size: '200px',
                            sortable: true,
                            render: function (record, index, col_index) {
                                var html = '<a target="_blank" href="'+this.getCellValue(index,col_index)+'">'+this.getCellValue(index,col_index)+'</a>';
                                return html;
                            }
                        },
                         {
                            field: 'agencyTransferDistributionReason',
                            caption: '代销转经销调整原因',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        self.activeName='first'
                        // self.getGoodsList(self.getDocumentEncoding(event.recid))
                        // self.$store.commit('getcustomsId',self.getDocumentEncoding(event.recid))
                        // self.$store.commit('clearcustomsLogList')
                        // self.logPage = 1;
                        let record = this.get(event.recid)
                        console.log(record,'888881212')
                        console.log(event.recid)
                       setTimeout(function(){
                            if(w2ui.customs.getSelection().length == 1){
                                   let arr = w2ui.customs.getSelection()
                                   console.log(arr,'999991212')
                                if(arr[0]!= record.id){
                                     console.log('走了')
                                }else{
                                    console.log('走了2')
                                    console.log(record.id)
                                    self.logPage = 1
                                    self.getGoodsList(self.getDocumentEncoding(event.recid))
                                    self.$store.commit('getcustomsId',self.getDocumentEncoding(event.recid))
                                 }
                            }else{
                                 self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.customs.clear(); //清空
                w2ui.customs.records = arr
                w2ui.customs.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    orderQuantity: page.orderQuantity,
                    stockInNum: page.stockInNum,
                   
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    orderQuantity: total.orderQuantity,
                    stockInNum: total.stockInNum,
                  
                })
                $('#main').w2render('customs');
                w2ui.customs.refresh();
                
            } else {
                 $(document).ready(function () {
                    w2ui.customs.clear(); //清空
                    w2ui['customs'].records = []
                    w2ui.customs.refresh();
                   $('#main').w2render('customs')
                })
            }

        },
        //异步导出
        // onImport() {
        //     let data = {}
        //     data.pageSize = this.pagesize
        //     data.currentPage = this.currentPage
        //     this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID列表
        //     data.accRecvdPeriodIds = this.formSearch.time //账期ID列表
        //     data.basicCompanyIds = this.formSearch.name //公司ID列表
        //     data.basicPlatformId = this.formSearch.code //平台ID
        //     data.basicStoreIds = this.formSearch.person //店铺ID列表
        //     data.status = this.formSearch.status //状态 0 未核销 1已核销
        //     this.request('accverification_asyncExport', data, false).then(res => {
        //         if (res.code == 1) {
        //             this.getKey(res.data)
        //         } else {
        //             this.$message({
        //                 message: res.msg,
        //                 type: 'warning'
        //             });
        //         }
        //     })
        // },
        //自动核销
        // onWrite() {
        //     let data = {}
        //     data.pageSize = this.pagesize
        //     data.currentPage = this.currentPage
        //     this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID列表//账单ID列表
        //     data.accRecvdPeriodIds = this.formSearch.time //账期ID列表
        //     data.basicCompanyIds = this.formSearch.name //公司ID列表
        //     data.basicPlatformId = this.formSearch.code //平台ID
        //     data.basicStoreIds = this.formSearch.person //店铺ID列表
        //     data.status = this.formSearch.status //状态 0 未核销 1已核销
        //     this.request('accverification_asyncAutoVerify', data, false).then(res => {
        //         if (res.code == 1) {
        //             this.getKeyD(res.data)
        //         } else {
        //             this.$message({
        //                 message: res.msg,
        //                 type: 'warning'
        //             });
        //         }
        //     })
        // },
       
        //循环key
        // getKey(key) {
        //     const h = this.$createElement;
        //     let data = {}
        //     data.taskKey = key
        //     this.timeAA = setTimeout(() => {
        //         this.request('getProcessResultByTaskKey', data, false).then(res => {
        //             if (res.code == 1) {
        //                 if (res.data.processStatus !== 0) {

        //                     this.$notify.success({
        //                         title: res.data.title,
        //                         message: h('p', null, [
        //                             h('a', {
        //                                 on: {
        //                                     click: this.clickA(res.data.subTitle)
        //                                 }
        //                             }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
        //                         ]),
        //                         duration: 0,
        //                     });
        //                     this.cleanKey(key)

        //                     function myStopFunction() {
        //                         clearTimeout(this.timeAA);
        //                     }

        //                 } else {
        //                     this.$notify.success({
        //                         title: res.data.title,
        //                         message: res.data.subTitle,
        //                         duration: 3000
        //                     });
        //                     this.getKey(key)
        //                 }
        //             } else {
        //                 this.$message.warning(res.msg)
        //             }
        //         })
        //     }, 5000)
        // },
        // clickA(url) {
        //     console.log(url)
        //     if (url.indexOf('[') == -1) {
        //         console.log('没有地址')
        //     } else {
        //         url.replace()
        //         let aPos = url.indexOf('[');
        //         let bPos = url.indexOf(']');
        //         let r = url.substr(aPos + 1, bPos - aPos - 1);
        //         window.location.href = r
        //     }
        // },
        // getKeyD(key) {
        //     const h = this.$createElement;
        //     let data = {}
        //     data.taskKey = key
        //     this.timeBB = setTimeout(() => {
        //         this.request('getProcessResultByTaskKey', data, false).then(res => {
        //             if (res.code == 1) {
        //                 if (res.data.processStatus !== 0) {
        //                     this.$notify.success({
        //                         title: res.data.title,
        //                         message: h('p', null, [
        //                             h('a', {
        //                                 on: {
        //                                     click: this.clickA(res.data.subTitle)
        //                                 }
        //                             }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
        //                         ]),
        //                         duration: 0,
        //                     });
        //                     this.cleanKey(key)

        //                     function myStopFunction() {
        //                         clearTimeout(this.timeBB);
        //                     }
        //                 } else {
        //                     this.$notify.success({
        //                         title: res.data.title,
        //                         message: res.data.subTitle,
        //                         duration: 3000
        //                     });
        //                     this.getKeyD(key)
        //                 }
        //             } else {
        //                 this.$message.warning(res.msg)
        //             }
        //         })
        //     }, 5000)
        // },
        // cleanKey(key) {
        //     let data = {}
        //     data.taskKey = key
        //     this.request('delByTaskKey', data, false).then(res => {
        //         if (res.code == 1) {
        //             console.log('oooo')
        //         }
        //     })
        // },
        changeCode(code) {
            console.log(code)
            let data = {}
            data.basicCompanyId = code
            data.type = 0
            this.request('accountPeriod_selector', data, true).then(res => {
                if (res.code == 1) {
                    this.timeList = res.data
                }
            })
        },
        onReset() {
            this.formSearch = {
                code: '',
                name: '',
                person: '',
                supplier:'',
            }
            this.getSupply()
            // this.initTable([], '')
            // this.resetCommit()
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code == 1) {
                       this.platformOptions = res.data;
                }
            })
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        changebasicPlatformId(id) {
            console.log(id, '3456789')
            this.formSearch.person = ''
            let data = {}
            data.platformId = id
            this.request('getBindingByPlatformId', data, true).then((res) => {
                if (res.code == 1) {
                    this.shopList = res.data
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        getData() {
            this.resetCommit()
            logList = []
            delaiList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.years = this.formSearch.year //年份
            data.goodsNo = this.formSearch.goodsNo //大货款号
            data.purchaseOrderNo = this.formSearch.ordersNo //采购单号
            data.payableUserId = this.formSearch.payableUser//所属人员
            data.supplierId = this.formSearch.supplier //供应商
            data.companyId = this.formSearch.companyId
            data.settle = this.formSearch.settle
            data.billingType = this.formSearch.settlement //结算类型
            data.allowSettlement = this.formSearch.agreeSettlement //允许结算
            data.documentStatus = this.formSearch.status //单据状态
            this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
            this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
            this.formSearch.orderDateStart ? data.completeStartTime = this.formSearch.orderDateStart : delete data.completeStartTime //关单起始时间
            this.formSearch.orderDateEnd? data.completeEndTime = this.formSearch.orderDateEnd : delete data.completeEndTime
            // data.createStart = //单据起始时间
            // data.createEnd = //单据结束时间
            // data.completeStartTime = //关单起始时间
            // data.completeEndTime = //关单结束时间
            this.request('closed_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    //   this.tableData = res.data.records;

                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        // this.list=res.data.records;
                        this.$store.commit('initRecordHttpList',res.data.records)
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                        // this.hasData=true
                    } else {
                        this.initTable([])
                    }

                    this.loading = false
                } else {
                    this.initTable([])
                    this.total=0
                    this.resetCommit()
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        //获取货品明细
         getGoodsList(id){
            if(!id)return 
            let data = {}
                data.documentEncoding =id
            this.request('payable_payable_closed_order_getDetailByClosedNo', data, false).then((res) => {
                if (res.code == 1) {
                      this.$store.commit('getcustomsList', res.data)
                 }else{
                      this.$store.commit('clearcustomsList')
                 }
            })        
        },
        //订单明细
        getOrderList(code) {
            this.ASDid = code
            let data = {}
            data.pageSize = 10
            data.currentPage = this.currentPageDelait
            data.id = code
            this.request('payable_payable_closed_order_getDetailByClosedNo', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records.length < data.pageSize) {
                        this.dataFlagD = false
                    } else {
                        this.dataFlagD = true
                    }
                    if (this.currentPageDelait == 1) {
                        console.log(delaiList,'5678')
                        delaiList = res.data.records
                        console.log(delaiList,'5678')
                        // this.$store.commit('Oneverification', this.delaiList)
                    } else {
                        delaiList = delaiList.concat(res.data.records)
                        // this.$store.commit('Oneverification', this.delaiList)
                    }
                }
            })
        },
        getDDMore() {
            this.currentPageDelait++
            let data = {}
            data.pageSize = 10
            data.currentPage = this.currentPageDelait
            data.id = this.ASDid
            this.request('accverification_detail', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records.length < data.pageSize) {
                        this.dataFlagD = false
                    } else {
                        this.dataFlagD = true
                    }
                    if (this.currentPageDelait == 1) {
                        delaiList = res.data.records
                        // this.$store.commit('Oneverification', this.delaiList)
                    } else {
                        delaiList = delaiList.concat(res.data.records)
                        // this.$store.commit('Oneverification', this.delaiList)
                    }
                }
            })
        },
                 //日志
        getLoglist() {
            let data = {}
                data.billNo ='payable_closed_order_'+this.customsId
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
                        this.$store.commit('initcustomsLogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initcustomsLogList', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        changeRadio(i) {},
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
         getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if(column.property!='quantity' )return
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += ' ';
            } else {
                sums[index] = '';
            }
            });
            return sums;
      },
     //导出相关
        checkExport(){
                 if(this.checkSelection()){
                    // this.onImport()
                    this.exportVisible=true
                 }else{
                     this.exportVisible=true
                 }
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        getExportTotal(){
           if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
                    let data={}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.years = this.formSearch.year //年份
                        data.goodsNo = this.formSearch.goodsNo //大货款号
                        data.purchaseOrderNo = this.formSearch.ordersNo //采购单号
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.supplierId = this.formSearch.supplier //供应商
                        data.companyId = this.formSearch.companyId
                        data.settle = this.formSearch.settle
                        data.billingType = this.formSearch.settlement //结算类型
                        data.allowSettlement = this.formSearch.agreeSettlement //允许结算
                        data.documentStatus = this.formSearch.status //单据状态
                        this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
                        this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
                        this.formSearch.orderDateStart ? data.completeStartTime = this.formSearch.orderDateStart : delete data.completeStartTime //关单起始时间
                        this.formSearch.orderDateEnd? data.completeEndTime = this.formSearch.orderDateEnd : delete data.completeEndTime
                        w2ui.customs.getSelection().length>0?data.ids= w2ui.customs.getSelection():delete data.ids
                        this.exportObj.selected==1? data.containDetail=false:data.containDetail=true;
           this.request('payable_payableclosedorder_exportCount',data,false).then(res=>{
               if(res.code==1){
                   if(res.data>100000){
                       this.moreLarge=true
                   }else{
                       this.moreLarge=false
                       this.onImport()
                   }
               }else{
                   this.$message.error(res.msg)
               }
           })
        },
        //导出
        onImport(){
                    let data={} 
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.years = this.formSearch.year //年份
                        data.goodsNo = this.formSearch.goodsNo //大货款号
                        data.purchaseOrderNo = this.formSearch.ordersNo //采购单号
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.supplierId = this.formSearch.supplier //供应商
                        data.companyId = this.formSearch.companyId 
                        data.settle = this.formSearch.settle //是否结算
                        data.billingType = this.formSearch.settlement //结算类型
                        data.allowSettlement = this.formSearch.agreeSettlement //允许结算
                        data.documentStatus = this.formSearch.status //单据状态
                        this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
                        this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
                        this.formSearch.orderDateStart ? data.completeStartTime = this.formSearch.orderDateStart : delete data.completeStartTime //关单起始时间
                        this.formSearch.orderDateEnd? data.completeEndTime = this.formSearch.orderDateEnd : delete data.completeEndTime
                        w2ui.customs.getSelection().length>0?data.ids= w2ui.customs.getSelection():delete data.ids
                        this.exportObj.selected==1? data.containDetail=false:data.containDetail=true;
                      this.request('payable_payableclosedorder_exportAsync', data, false).then(res => {
                        if (res.code == 1) {
                            this.cancelExport()
                            this.getKeyD(res.data)
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                }) 
        },
          getKeyD(key) {
            const h = this.$createElement;
            let data = {}
                data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
                                duration: 0,
                            });
                            this.cleanKey(key)
                            function myStopFunction() {
                                clearTimeout(this.timeBB);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKeyD(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            console.log(url)
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
            }
        },
        cleanKey(key) {
            let data = {}
                data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
        },
         clickImg(type) {
            this.imgType = type
            console.log(this.imgType)
            this.picVisible = true
            console.log('00000000000')
        },
        cancelGood(){
            this.file = null
            this.picVisible = false
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.visible = false
                // 
                let data = new FormData
                data.append('file', this.file)
                data.append('className', 'initiate')
                this.request('uploadImg', data, true).then(res => {
                    if (res.code == 1) {
                        console.log(res.data)
                        this.imgUrl1 = res.data.ossAddress
                        this.bowersPict=res.data.htmlBreviaryOssAddress
                        this.picVisible = false
                        this.file = null
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        },
        //上传之前img
        handleUpload(file) {
            if (!/\.jpg|.png|.jpeg|.JPG|.PNG|.JPEG/.test(file.name)) {
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
                console.log(this.imgType)

                this.loadingStatus = false;
                this.file = null;
                this.$message.success(res.msg);
                this.picterVisible = false;
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

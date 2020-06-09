<template>
<div>
    <header class="headerstyle">

        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>

                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="modify">编辑</el-button>
                </el-form-item>

                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>

                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('取消审核') !== -1" size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                </el-form-item>
                  <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('立账') !== -1" size="small" type="primary" @click="setAccount">立账</el-button>
                </el-form-item>

                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('取消立账') !== -1" size="small" type="primary" @click="setAccountCancel">取消立账</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
                  <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </div>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                   <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.basicSupplierId" filterable clearable placeholder="请选择" style="width:230px">
                     <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对账单号：" size="small">
                <el-input v-model.trim="formSearch.payableReconciliationOrderNo" placeholder="请输入" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="发票号码：" size="small">
                <el-input v-model.trim="formSearch.invoiceNo" placeholder="请输入" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="开票建议单号：" size="small">
                <el-input v-model.trim="formSearch.payableInvoiceNo" placeholder="请输入" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="创建日期：" size="small">
                <el-date-picker  v-model="formSearch.created" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="开票日期：" size="small">
                <el-date-picker v-model="formSearch.invoice" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="到票日期：" size="small">
                <el-date-picker v-model="formSearch.arriveInvoice" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="单据状态：" size="small">
                <el-select v-model="formSearch.status" filterable clearable placeholder="请选择" style="width:150px">
                     <el-option label="待审核" value="0"></el-option>
                     <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="立账状态：" size="small">
                <el-select v-model="formSearch.settleStatus" filterable clearable placeholder="请选择" style="width:150px">
                     <el-option label="未立账" value="0"></el-option>
                     <el-option label="已立账" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="立账日期：" size="small">
                <el-date-picker v-model="formSearch.settleDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="发票类型：" size="small">
                <el-select v-model="formSearch.invoiceType" filterable clearable placeholder="请选择" style="width:150px">
                      <el-option label="货款发票"   value="1"></el-option>
                      <el-option label="试制费发票" value="2"></el-option>
                      <el-option label="冲红发票"   value="3"></el-option>
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

        <div id="main1" style="width: 100%; height: 400px;"></div>
    </section>

    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <el-table :data="geNewData" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="payableReconciliationOrderNo" label="对账单编号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="制单号" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="batchNo" label="批次" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="invoiceQty" label="开票数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taxExcludedPrice" label="不含税单价" min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxExcludedPrice|singlePrice}}</div>
                         </template>
                    </el-table-column>
                    <el-table-column prop="taxExcludedAmount" label="不含税金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxExcludedAmount|moneyFilters}}</div>
                         </template>
                    </el-table-column>
                    <el-table-column prop="tax" label="税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                       <el-table-column prop="taxAmount" label="税额" min-width="120" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxAmount|moneyFilters}}</div>
                           </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPrice" label="含税单价" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedPrice|singlePrice}}</div>
                         </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedAmount" label="含税金额" min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedAmount|moneyFilters}}</div>
                         </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="third">
                <el-table :data="logsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="logsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="logsList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>
    <!--修改-->
    <Modal v-model="adjustVisible" :styles="mystyle"  title="新增" @on-cancel='cancelAdjust' :width="440" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="adjustForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <!-- <el-form-item label="供应商类型：" size="small" label-width="115px" prop="type">
                       <el-select v-model="adjustObj.type" filterable clearable placeholder="请选择" style="width:200px">
                            <el-option label="外部供应商" value="0"></el-option>
                            <el-option label="内部供应商" value="1"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="开票建议单：" size="small" label-width="115px" prop="suggest"> <!-- form表单之后一项的时候 enter 会触发提交表单事件 -->
                        <el-input v-model.trim="adjustObj.suggest" onkeypress="if(event.keyCode == 13) return false;" clearable  style="width:200px"></el-input>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item size="small" label-width="95px" style="padding-left:130px">
                    <Button type="primary" @click="submitForms('adjustForm')">确定</Button>
                    <Button type="default" @click="cancelAdjust">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col v-show="!moreLarge">
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="0"></el-option>
                            <el-option label="导出主表+明细" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-show="moreLarge" style="text-align:center">
                       结算明细主单超过100000行, 确认导出？
                </Col>
                <el-form-item style="padding-left:130px">
                    <!-- <Button type="primary" v-if="!moreLarge" @click="getExportTotal">确认</Button> -->
                    <!-- 二次确认 -->
                    <Button type="primary" @click="onImport">确认</Button> 
                    <Button type="default" @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
var record={}
import {
    commonMixins
} from 'mixins/common';
import filters from '../../../filter/'
import {
    mapState
} from 'vuex'
export default {
 mixins: [commonMixins],
    data() {
        return {
            exportObj:{},
            exportVisible:false,
            moreLarge:false,
            payableUserList:[],
            newTime: null,
            merchantCodeList: [],
            orderNoList: [],
            sectionNoList: [],
            delaiList: [], //明细
            activeName: 'first',
            logList: [], //日志
            billNo: '',
            show: false,
            zhan: false,
            tableData: [],
            formThead: [],
            // dataFlag:true,
            file: null,
            visible: false,
            brandList: [],
            shopList: [],
            adjustVisible:false,
            adjustObj:{
                      type:'',
                      suggest:'',
            },
            companyCodeOptions: [],
            dialogVisible: false, //新增
            formSearch: {
                        basicCompanyId:'',
                        basicSupplierId:'',
                        payableReconciliationOrderNo:'',
                        invoiceNo:'',
                        payableInvoiceNo:'',
                        created:'',
                        invoice:'',
                        arriveInvoice:'',
                        status:'',
                        settleStatus:'',
                        settleDate:'',
                        invoiceType:'',        
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
            titleArray: [],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            logPage:1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            companyList: [], // 公司列表
            supplyList: [], //供应商列表
            rules  : {
                type: [{
                                required: true,
                                message: '请选择',
                                trigger: 'change'
                }],
                suggest: [{
                            required: true,
                            message: '请输入',
                            trigger: 'blur'
                }],
                
            },
        }
    },
    computed: mapState({
        geNewData: state => state.invoiceregister.deductionList,
        logsList: state => state.invoiceregister.deductionLogList,
        deductionId: state => state.invoiceregister.id,
        dataFlag:state=>state.invoiceregister.dataFlag,
    }),
    mounted() {
            this.getButtonJurisdiction() //按钮权限
            this.initTable([])
            this.getCompany()
            this.getSupply()
            this.getPayableUser()

    },
    destroyed() {
           this.resetCommit()
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.basicSupplierId = ''
            console.log(name)
            let vars = {}
            vars.payableUserId = name
             this.requestWithUriVars('selectorPayableSupplier', vars, null, true).then(res => {
          if (res.code==1) {
              this.supplyList = res.data
            }else{
                this.supplyList = []
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
        goPageKeyUp(e){
            console.log(e,'--------')
        },
        modify(){
                  const{code}=this.$route.query
                  let arr = w2ui.invoiceRegister.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    this.$router.push({
                        name:'invoiceRegisterDetail',
                        query:{
                            id  :arr[0],
                            code:code
                        }
                    })
                }
         },
              //公司下拉列表
        getCompany() {
            //masterData_company_selector
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        //供应商列表
        getSupply() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.supplyList = res.data
                }
            })
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
        initTable(arr = [], currentPageSummary, totalPageSummary) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'invoiceRegister',
                    show: {
                        toolbar: true,
                        selectColumn: true,
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
                        {
                            field: 'status',
                            caption: '单据状态',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'accPayableNo',
                            caption: '应付单编号',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'settleStatus',
                            caption: '立账状态',
                            size: '100px'
                        },
                        {
                            field: 'settleDate',
                            caption: '立账时间',
                            size: '100px'
                        },
                        {
                            field: 'invoiceDate',
                            caption: '开票日期',
                            size: '100px'
                        },
                        {
                            field: 'arriveInvoiceDate',
                            caption: '到票日期',
                            size: '100px'
                        },
                        {
                            field: 'invoiceTypeName',
                            caption: '发票类型',
                            size: '100px'
                        },
                        {
                            field: 'taxExcludedAmount',
                            caption: '不含税金额',
                            size: '100px',
                            render:'money'
                        },
                        {
                            field: 'taxAmount',
                            caption: '税额',
                            size: '100px',
                            render:'money'
                        },
                        {
                            field: 'taxIncludedAmount',
                            caption: '含税金额',
                            size: '100px',
                            render:'money'
                        },
                        {
                            field: 'invoiceNo',
                            caption: '发票号码',
                            size: '100px'
                        },
                        {
                            field: 'payableInvoiceNo',
                            caption: '开票建议单号',
                            size: '100px'
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px'
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '100px'
                        },
                    ],
                    onClick: function (event) {
                        // let orderId = null
                        // self.currentPage = 1
                        // self.$store.commit('clearInvoiceAdvice')
                        // w2ui['invoiceRegister'].records.map(function (item) {
                        //     if (obj.recid == item.recid) {
                        //         orderId = item.orderId
                        //     }
                        // })
                        // self.getLoglist(orderId)
                        // self.getDetail(obj.recid)
                           record = this.get(event.recid);
                           console.log(this.get(event.recid))
                            self.activeName = 'first'
                        setTimeout(function(){
                            if(w2ui.invoiceRegister.getSelection().length == 1){
                                let arr = w2ui.invoiceRegister.getSelection()
                                self.activeName = 'first'
                            
                                if(arr[0]!= record.id){
                                    
                                }else{
                                     self.activeName = 'first'
                                     self.logPage = 1
                                     self.getDetail(event.recid)
                                     self.$store.commit('getinvoiceregisterId', event.recid)
                                     self.getLoglist(event.recid)
                                    
                                }
                            }else{
                                //    self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.invoiceRegister.clear(); //清空
                w2ui.invoiceRegister.records = arr
                w2ui.invoiceRegister.records.push({
                    w2ui: {
                        summary: true
                    },
                   index: '<span>当页小计</span>',
                   taxExcludedAmount: currentPageSummary.totalTaxExcludedAmount,
                   taxAmount:currentPageSummary.totalTaxAmount,
                   taxIncludedAmount:currentPageSummary.totalTaxIncludedAmount,
                    // qty: currentPageSummary.qty,
                    // goodsAmount: currentPageSummary.goodsAmount,
                    // post: currentPageSummary.post,
                    // otherAmount: currentPageSummary.otherAmount,
                    // discount: currentPageSummary.discount,
                 }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span>合计</span>',
                    taxExcludedAmount: totalPageSummary.totalTaxExcludedAmount,
                    taxAmount:totalPageSummary.totalTaxAmount,
                    taxIncludedAmount:totalPageSummary.totalTaxIncludedAmount,
                })
                $('#main1').w2render('invoiceRegister');
                w2ui.invoiceRegister.refresh();
            } else {
                 $(document).ready(function () {  
                        w2ui.invoiceRegister.clear(); //清空
                        w2ui['invoiceRegister'].records = []
                        w2ui.invoiceRegister.refresh();
                        $('#main1').w2render('invoiceRegister')
                  })
            }

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
        checkSelection() {
            let arr = w2ui.invoiceRegister.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        
         //导出
        onImport(){
            if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
                    let data={}
                    let arr = w2ui.invoiceRegister.getSelection()
                        data.basicCompanyId = this.formSearch.basicCompanyId 
                data.basicSupplierId = this.formSearch.basicSupplierId
                data.payableUserId = this.formSearch.payableUser//所属人员
                data.invoiceNo = this.formSearch.invoiceNo
                data.payableInvoiceNo = this.formSearch.payableInvoiceNo

                this.formSearch.created?data.createdStartTime=this.formSearch.created[0]:delete data.createdStartTime;
                this.formSearch.created?data.createdEndTime=this.formSearch.created[1]:delete data.createdEndTime;

                this.formSearch.invoice?data.invoiceStartDate=this.formSearch.invoice[0]:delete data.invoiceStartDate;
                this.formSearch.invoice?data.invoiceEndDate=this.formSearch.invoice[1]:delete data.invoiceEndDate;

                this.formSearch.arriveInvoice?data.arriveInvoiceStartDate=this.formSearch.arriveInvoice[0]:delete data.arriveInvoiceStartDate;
                this.formSearch.arriveInvoice?data.arriveInvoiceEndDate=this.formSearch.arriveInvoice[1]:delete data.arriveInvoiceEndDate;

                this.formSearch.settleDate?data.settleStartDate=this.formSearch.settleDate[0]:delete data.settleStartDate;
                this.formSearch.settleDate?data.settleEndDate=this.formSearch.settleDate[1]:delete data.settleEndDate;
                data.invoiceType=this.formSearch.invoiceType
                data.status=this.formSearch.status!=''?Number(this.formSearch.status):''
                data.settleStatus=this.formSearch.settleStatus!=''?Number(this.formSearch.settleStatus):''
                data.payableReconciliationOrderNo=this.formSearch.payableReconciliationOrderNo
                data.withDetail = Number(this.exportObj.selected)
                data.ids = arr
                      this.request('accPayable_invoiceRegister_export', data, false).then(res => {
                        if (res.code == 1) {
                            this.cancelExport()
                            this.getKey(res.data)
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                }) 
        },
        getData() {
            this.logList = []
            this.resetCommit()
            this.logPage=1;
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicCompanyId = this.formSearch.basicCompanyId 
                data.basicSupplierId = this.formSearch.basicSupplierId
                data.payableUserId = this.formSearch.payableUser//所属人员
                data.invoiceNo = this.formSearch.invoiceNo
                data.payableInvoiceNo = this.formSearch.payableInvoiceNo

                this.formSearch.created?data.createdStartTime=this.formSearch.created[0]:delete data.createdStartTime;
                this.formSearch.created?data.createdEndTime=this.formSearch.created[1]:delete data.createdEndTime;

                this.formSearch.invoice?data.invoiceStartDate=this.formSearch.invoice[0]:delete data.invoiceStartDate;
                this.formSearch.invoice?data.invoiceEndDate=this.formSearch.invoice[1]:delete data.invoiceEndDate;

                this.formSearch.arriveInvoice?data.arriveInvoiceStartDate=this.formSearch.arriveInvoice[0]:delete data.arriveInvoiceStartDate;
                this.formSearch.arriveInvoice?data.arriveInvoiceEndDate=this.formSearch.arriveInvoice[1]:delete data.arriveInvoiceEndDate;

                this.formSearch.settleDate?data.settleStartDate=this.formSearch.settleDate[0]:delete data.settleStartDate;
                this.formSearch.settleDate?data.settleEndDate=this.formSearch.settleDate[1]:delete data.settleEndDate;
                data.invoiceType=this.formSearch.invoiceType
                data.status=this.formSearch.status!=''?Number(this.formSearch.status):''
                data.settleStatus=this.formSearch.settleStatus!=''?Number(this.formSearch.settleStatus):''
                data.payableReconciliationOrderNo=this.formSearch.payableReconciliationOrderNo
            this.request('accPayable_invoiceRegister_page', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                         this.total = res.data.count;
                         this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                    } else {
                         this.initTable([])
                    }
               
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
      //日志
        getLoglist(id) {
            let data = {}
            data.billNo = id?'acc_payable_register_log_prefix_'+id:'acc_payable_register_log_prefix_'+this.deductionId
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                            this.$store.commit('setdataFlagfalse')
                    } else {
                            this.$store.commit('setdataFlagtrue')
                    }
                    if (this.logPage == 1) {
                            this.$store.commit('initinvoiceregisterLogList', res.data)
                    } else {
                            let arr=this.logsList.concat(res.data)
                            this.$store.commit('initinvoiceregisterLogList', arr)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
        },
        resetCommit() {
            this.$store.commit('clearinvoiceregister')
            this.$store.commit('clearinvoiceregisterId')
            this.$store.commit('clearinvoiceregisterLogList')
        },
          handleClick(tab, event) {
            if (tab.name == 'first') {
                 //货品明细接口
            } else if (tab.name == 'third') {
                if (!this.deductionId) return
                      this.getLoglist(this.deductionId)
            }
        },
        //货品明细
        getDetail(id) {
            let data = {}
                data.payableInvoiceRegisterId = id
            this.request('accPayable_invoiceRegisterDetail_queryDetail', data, false).then(res => {
                if (res.code == 1) {
                    this.$store.commit('getinvoiceregister', res.data.records)
                           //    this.$store.commit('increment', res.data)
                }else{
                         this.$message.error(res.msg)
                         this.$store.commit('clearinvoiceregister')
                }
            })
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        changeRadio(i) {},
        changeShow() {
            this.show = true
            // this.getReceivable()
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
                  for(let i in this.formSearch){
                      this.formSearch[i]=''
                  }
                  this.getSupply()
        },
             //审核
        onExamine() {
                 let arr = w2ui.invoiceRegister.getSelection()
                 if(arr.length==0){
                      return  this.$message.error('请勾选审核数据')
                }else if(arr.length>0){
                                     const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认审核选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                               let data = {};
                                                    data.ids= arr
                                                    this.request('accPayable_invoiceRegister_examine', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('审核成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })
                        //  let data = {};
                        //       data.ids= arr
                        //     this.request('accPayable_invoiceRegister_examine', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success('审核成功')
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                }
            
        },
        // 取消审核
        onExamineCancel() {
             let arr = w2ui.invoiceRegister.getSelection()
                 if(arr.length==0){
                      return  this.$message.error('请勾选取消审核数据')
                }else if(arr.length>0){
                                 const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认取消审核选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                               let data = {};
                                                    data.ids= arr
                                                    this.request('accPayable_invoiceRegister_cancelExamine', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('取消审核成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })
                        //  let data = {};
                        //       data.ids =arr
                        //     this.request('accPayable_invoiceRegister_cancelExamine', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success('取消审核成功')
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                }
           
        },
               //立账
        setAccount() {
                 let arr = w2ui.invoiceRegister.getSelection()
                 if(arr.length==0){
                      return  this.$message.error('请勾选立账数据')
                }else if(arr.length>0){
                         let data = {};
                              data.ids= arr
                            this.request('accPayable_invoiceRegister_settle', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('立账成功')
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                }
            
        },
        // 取消立账
        setAccountCancel() {
             let arr = w2ui.invoiceRegister.getSelection()
                 if(arr.length==0){
                        return  this.$message.error('请勾选取消立账数据')
                }else if(arr.length>0){
                         let data = {};
                              data.ids =arr
                            this.request('accPayable_invoiceRegister_cancelSettle', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('取消立账成功')
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                }
           
        },
        onAdd(){
                this.adjustVisible=true
        },
         resetForm(name) {
            this.$refs[name].resetFields();
        },
        saveAdd(){
                  let data={}
                      data.payableInvoiceNo=this.adjustObj.suggest
                      data.type=this.adjustObj.type
                this.request('accPayable_invoiceRegister_add',data,false).then(res=>{
                        if(res.code==1){
                            this.adjustVisible=false;
                            for(let i in this.adjustObj){
                                this.adjustObj[i]=''  
                             }  
                            this.resetForm('adjustForm')
                            this.getData()
                            this.$message.success('新增成功')
                        }else{
                             this.$message.error(res.msg)
                        }
                })        
        },
        submitForms(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveAdd()
                } else {
                        return false;
                }
            })
        },
        cancelAdjust() {
            this.adjustVisible = false;
            this.resetForm('adjustForm')
        }, 
        onDel(){
               let arr = w2ui.invoiceRegister.getSelection()
                 if(arr.length==0){
                       return  this.$message.error('请勾选删除数据')
                }else if(arr.length>0){
                         const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认删除选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                               let data = {};
                                                  data.ids= arr
                                                    this.request('accPayable_invoiceRegister_deleted', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('删除成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })
                        //  let data = {};
                        //       data.ids= arr
                        //     this.request('accPayable_invoiceRegister_deleted', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success('删除成功')
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                }
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

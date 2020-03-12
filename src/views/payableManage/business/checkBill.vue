<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
            <Col style="margin-bottom:20px">
                <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('查询') != -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('审核') != -1" size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('取消审核') != -1" size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                    </el-form-item>
                    <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('删除') != -1" size="small" type="primary" @click="onDel">删除</el-button>
                    </el-form-item>
                      <el-form-item size="small" class="marginT0">
                        <el-button v-if="judgeMenu.indexOf('导出') != -1" size="small" type="primary" @click="checkExport">导出</el-button>
                    </el-form-item>
                     <el-form-item size="small" class="marginT0">
                        <el-button size="small" type="default" @click="onReset">重置</el-button>
                    </el-form-item>
            </Col>
                <!-- <el-divider></el-divider> -->
                <!-- <el-col > -->
                     <el-form-item label="年份：" size="small" >
                        <el-date-picker style="width:120px" v-model="formSearch.year" type="year" placeholder="请选择"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label=" 公 司 ：" size="small" >
                        <el-select v-model="formSearch.companyId" @change="watchBill(formSearch.companyId)" filterable placeholder="请选择" style="width:120px">
                            <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="对账期间 ：" size="small">
                        <el-select v-model="formSearch.periodId"  filterable placeholder="请选择" style="width:120px">
                            <el-option v-for="item in SelectList" :key="item.name" :label="item.name" :value="item.period"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="供应商：" size="small" >
                        <el-select v-model="formSearch.supplierId" filterable placeholder="请选择" style="width:120px">
                            <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单据状态：" size="small" label-width="100px" v-if="show ==true">
                        <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:120px">
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="已审核" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账单编号:" size="small" v-if="show == true">
                        <el-input v-model="formSearch.bizCode" placeholder="请输入" style="width:150px"></el-input>
                    </el-form-item>
            <!-- </el-col> -->
            <el-form-item label="单据日期:" size="small" v-if="show == true">
                <el-date-picker  style="width:357px"
                        v-model="formSearch.date"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="审核时间:" size="small" v-if="show == true">
                <el-date-picker  style="width:357px"
                        v-model="formSearch.time"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="制单号:" size="small" v-if="show == true">
                        <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
             <el-form-item size="small" label-width="100px">
                        <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
                    </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000,5000,10000,20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 350px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
         <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
             <el-tab-pane label="货品明细" name="first" >
                    <section class="middle">
                        <el-table
                            :data="goodsList"
                            border
                            show-summary
                             :summary-method="getSummaries"
                            style="width: 100%">
                            <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width="50">
                            </el-table-column>
                            <!-- <el-table-column
                            prop="companyName"
                            align="center"
                            label="公司"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="supplierName"
                            align="center"
                            label="供应商"
                            min-width="120">
                            </el-table-column> -->
                            <el-table-column
                            prop="purchaseOrderNo"
                            align="center"
                            min-width="120"
                            label="制单号">
                            </el-table-column>
                            <el-table-column
                            prop="goodsNo"
                            align="center"
                            min-width="120"
                            label="大货款号">
                            </el-table-column>
                            <el-table-column
                            prop="batchNo"
                            align="center"
                            min-width="120"
                            label="批次">
                            </el-table-column>
                            <el-table-column
                            prop="stockInQty"
                            align="center"
                            min-width="120"
                            label="入库总数">
                            </el-table-column>
                            <el-table-column
                            prop="goodsAmount"
                            align="center"
                            min-width="120"
                            label="货款总额">
                             <template slot-scope="scope">{{scope.row.goodsAmount|moneyFilters}}</template>
                            </el-table-column>
                            <el-table-column
                            prop="taxTrialAmount"
                            align="center"
                            min-width="120"
                            label="试制费总额">
                             <template slot-scope="scope">{{scope.row.taxTrialAmount|moneyFilters}}</template>
                            </el-table-column>

                            <el-table-column
                            prop="deductionAmount"
                            align="center"
                            min-width="120"
                            label="扣款总额">
                             <template slot-scope="scope">{{scope.row.deductionAmount|moneyFilters}}</template>
                            </el-table-column>
                            <el-table-column
                            prop="settlementAmount"
                            align="center"
                            min-width="120"
                            label="结算总额">
                             <template slot-scope="scope">{{scope.row.settlementAmount|moneyFilters}}</template>
                            </el-table-column>
                            <el-table-column
                            prop="settlementType"
                            align="center"
                            min-width="120"
                            label="结算类型">
                            </el-table-column>
                            <el-table-column
                            prop="closeTime"
                            align="center"
                            min-width="120"
                            label="关单时间">
                            </el-table-column>
                            <el-table-column
                            prop="settlementOrderCode"
                            align="center"
                            min-width="120"
                            label="结算明细编号">
                            </el-table-column>
                        </el-table>  
                </section>
             </el-tab-pane>
             <el-tab-pane label="扣款明细" name="second">
                   <section class="middle">
                        <el-table
                            :data="deductionList"
                            border
                            style="width: 100%">
                            <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width="50">
                            </el-table-column>
                            <!-- <el-table-column
                            prop="supplierName"
                            align="center"
                            label="供应商"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="companyName"
                            align="center"
                            label="公司"
                            min-width="120">
                            </el-table-column> -->
                            <el-table-column
                            prop="brandName"
                            align="center"
                            min-width="120"
                            label="品牌">
                            </el-table-column>
                            <el-table-column
                            prop="goodsNo"
                            align="center"
                            min-width="120"
                            label="大货款号">
                            </el-table-column>
                            <!-- <el-table-column
                            prop="amount2"
                            align="center"
                            min-width="120"
                            label="款号">
                            </el-table-column> -->
                            <el-table-column
                            prop="deductionAmount"
                            align="center"
                            min-width="120"
                            label="扣款金额">
                            
                            </el-table-column>
                            <el-table-column
                            prop="deductionType"
                            align="center"
                            min-width="120"
                            label="扣款类型">
                            </el-table-column>
                            <el-table-column
                            prop="reconciliationOrderCode"
                            align="center"
                            min-width="120"
                            label="账单编号">
                            </el-table-column>
                        </el-table>  
                </section>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="third" >
                <section class="middle">
                    <el-table :data="logsList" style="width: 100%" border tooltip-effect="dark" max-height="150">
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
               </section>
        </el-tab-pane>
        </el-tabs>
    </section>
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
var record = {}
let getStatic={}
import filters from '../../../filter/'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            show:false,
            loading: false,
            activeName:'first',
            examineVisible:false,    // 审核框
            dialogVisible:false,     // 生成对账单框
            adjustVisible:false,     // 扣款调整
            companyList  : [],       // 公司列表
            supplyList   : [],      //供应商列表
            SelectList   : [],       //期间列表
            adjustObj    : {},           // 扣款调整数据对象
            adjustList   : [],          //  调整扣款的列表 
            logList      : [],            // 日
            formSearch   : {
                         periodId:'',
                         year:'',
            },
            addBillObj:{},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            logPage:  1,
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
     computed: mapState({
                goodsList    : state => state.checkBill.goodsList,
                logsList     :  state => state.checkBill.logList,
                checkBillId  :  state => state.checkBill.checkBillId,
                deductionList: state => state.checkBill.deductionList,
                checkObj: state => state.checkBill.checkObj,
                getCheckBillIdNoBizcode:state => state.checkBill.No,
      }),
    destroyed() {
        this.$store.commit('clearCheckBillGoodsList')
        this.$store.commit('clearcheckBilllogList')
        this.$store.commit('clearcheckBilldeductionList')
        this.$store.commit('clearCheckBillId')
        this.$store.commit('clearCheckBillIdNo')
    },
    created(){
           this.getCompany()
           this.getSupply()
    },
    mounted() {
        this.formSearch.year=new Date()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
    },
    methods: {
          resetCommit(){
                this.$store.commit('clearCheckBillGoodsList')
                this.$store.commit('clearcheckBilllogList')
                this.$store.commit('clearcheckBilldeductionList')
                this.$store.commit('clearCheckBillId')   
                 this.$store.commit('clearcheckObj')
                 this.$store.commit('clearCheckBillIdNo')
          },
          handleClick(tab, event) {
            if(tab.name=='second'){
                this.getReduceDetail()
            }else if(tab.name=='third'){
              if(!this.checkBillId) return
              this.getLoglist()  
            }
         },
         changeShow() {
            this.show = true
         },
         changeHidden() {
            this.show = false
         },
        getObj(orignArr, props, params1) {
            if (orignArr instanceof Array) {
                for (let i = 0, len = orignArr.length; i < len; i++) {
                    if (orignArr[i].hasOwnProperty(props)) {
                        if (orignArr[i][props] == params1) {
                            return orignArr[i]
                        }
                    }
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
        initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'checkBill',
                    show: {
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
                            field: 'companyName',
                            caption: '公司名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'supplierName',
                            caption: '供应商',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '单据日期',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'bizCode',
                            caption: '账单编号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '对账期间',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'totalCurrentPeriodAmount',
                            caption: '本期总额',
                            size: '130px',
                        },
                        {
                            field: 'totalTaxTrialAmount',
                            caption: '试制费总额',
                            size: '130px',
                            sortable: true,
                        },
                        {
                            field: 'totalSaleAmount',
                            caption: '成衣销售总额',
                            size: '130px',
                            sortable: true,
                        },
                        {
                            field: 'totalProcessingAmount',
                            caption: '成衣加工总额',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'totalReturnRepairAmount',
                            caption: '退次返修总额',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'totalDeductionAmount',
                            caption: '扣款总额',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'businessPeriodNo',
                            caption: '业务期间',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'statusStr',
                            caption: '单据状态',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '130px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        self.activeName='first'
                        record = this.get(event.recid)
                      
                        // self.getLoglist(event.recid)
                         setTimeout(function(){
                            if(w2ui.checkBill.getSelection().length == 1){
                                let arr = w2ui.checkBill.getSelection()
                                if(arr[0] != record.id){
                                       // console.log('--------------')
                                }else{
                                    self.getGoodsList(event.recid)
                                    self.logPage = 1
                                    self.$store.commit('getCheckBillId',event.recid)
                                    self.$store.commit('getCheckBillIdNo',record.bizCode)
                                    
                                 }
                            }else{
                                 self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.checkBill.clear(); //清空
                w2ui.checkBill.records = arr
                w2ui.checkBill.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    totalCurrentPeriodAmount: current.totalCurrentPeriodAmount,
                    totalTaxTrialAmount:current.totalTaxTrialAmount,
                    totalSaleAmount:current.totalSaleAmount,
                    totalProcessingAmount:current.totalProcessingAmount,
                    totalReturnRepairAmount:current.totalReturnRepairAmount,
                    totalDeductionAmount:current.totalDeductionAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span>合计</span>',
                    totalCurrentPeriodAmount: total.totalCurrentPeriodAmount,
                    totalTaxTrialAmount:total.totalTaxTrialAmount,
                    totalSaleAmount:total.totalSaleAmount,
                    totalProcessingAmount:total.totalProcessingAmount,
                    totalReturnRepairAmount:total.totalReturnRepairAmount,
                    totalDeductionAmount:total.totalDeductionAmount,
                })
                $('#main').w2render('checkBill');
                w2ui.checkBill.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.checkBill.clear(); //清空
                    w2ui['checkBill'].records = []
                    w2ui.checkBill.refresh();
                    $('#main').w2render('checkBill')
                })

            }

        },
        onReset() {
            for(let i in this.formSearch){
                 this.formSearch[i]=''
            }
            // this.resetCommit()
            this.formSearch.year=new Date()
            this.SelectList=[]
            // this.initTable([])
            record.bizCode=''
            this.activeName="first"
            
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, false).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        getData() {
                 record.bizCode=''
                this.loading = true;
                this.logList = []
                this.logPage=1;
                let data = {}
                    data.pageSize          = this.pagesize
                    data.currentPage       = this.currentPage
                    data.companyId         = this.formSearch.companyId                    
                    data.supplierId        = this.formSearch.supplierId                 
                    data.periodId          = this.formSearch.periodId                     
                    data.year              = filters.get_unix_only(this.formSearch.year) 
                    data.bizCode           = this.formSearch.bizCode                     
                    data.purchaseOrderNo   = this.formSearch.purchaseOrderNo
                    data.startDate         = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[0]):''
                    data.endDate           = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[1]):''
                    data.status            = this.formSearch.status!=''?Number(this.formSearch.status):''
                    data.auditStartDate    = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[0]):''
                    data.auditEndDate      = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[1]):''
                    data.status==0?'' : data.status==1?'' : delete  data.status
                    data.startDate?'': delete  data.startDate
                    data.endDate?  '': delete data.endDate
                    data.auditStartDate?'': delete  data.auditStartDate
                    data.auditEndDate?  '': delete data.auditEndDate
                this.request('payable_reconciliationOrder_page', data, true).then(res => {
                    if (res.code == 1) {
                        this.total = res.data.count;
                        if (res.data.records) {
                            for (let i = 0, len = res.data.records.length; i < len; i++) {
                                res.data.records[i].index =i+1
                                res.data.records[i].recid = res.data.records[i].id
                            }
                            this.list = res.data.records;
                            this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                        } else {
                            this.initTable([])
                        }
                        this.loading = false
                        this.$store.commit('clearCheckBillGoodsList')
                        this.$store.commit('clearcheckBilllogList')
                        this.$store.commit('clearcheckBilldeductionList')
                                
                    } else {
                        this.initTable([])
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
        },
        //获取货品明细
         getGoodsList(id){
            let data = {}
                data.id =id
            this.request('payable_reconciliationOrder_detail', data, false).then((res) => {
                if (res.code == 1) {
                    //   getStatic=res.data.currentPageSum
                      this.$store.commit('checkBillGoodsList', res.data.records)
                      this.$store.commit('getcheckObj',res.data.currentPageSum)
                 }else{
                     this.$store.commit('clearcheckObj')
                      this.$store.commit('clearCheckBillGoodsList')
                 }
            })        
        },
        //获取扣款明细
         getReduceDetail(id){//
         if(!this.getCheckBillIdNoBizcode)return
            let data = {}
                data.reconciliationOrderCode=this.getCheckBillIdNoBizcode
                data.pageSize=1000
            this.request('payable_deductionOrder_page', data, false).then((res) => {
                if (res.code == 1) {
                      this.$store.commit('checkBilldeductionList',res.data.records)
                }else{
                      this.$store.commit('clearcheckBilldeductionList')
                }
            })
        },
         //日志
        getLoglist() {
            let data = {}
                data.billNo ='payable_reconciliation_order_'+this.checkBillId
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
                        this.$store.commit('checkBilllogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('checkBilllogList', this.logList)
                    }
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
        },
        onSearch() {
            this.getData()
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        checkSelection(){
                  let arr= w2ui.checkBill.getSelection()
                      if(arr.length>0){ return  true} 
                      return false
                   
        },
        operate(){
                this.$prompt('确定要审核选中的数据吗', '操作确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value?value:''
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
        }, 
       resetForm(name){
           this.$refs[name].resetFields();
       },
       cancelAdjust(){
             this.adjustVisible=false;
             this.resetForm('adjustForm')
       },
       //新增
       adjustAdd(){
                 //   adjustList
       },
       adjustRemove(){
          
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
         getSupply(){
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                     this.supplyList = res.data
                }
            })
        },
        watchBill(id){
          if(!id)return 
          this.formSearch.periodId=''
          this.SelectList=[]
          this.getSelectList(id)  
        },
         // 账期下拉列表
        getSelectList(id){
           let data = {}
               data.basicCompanyId=id
               data.type=3;
            this.request('accountPeriod_selector', data, true).then((res) => {
                if (res.code == 1) {
                     this.SelectList = res.data
                }else{
                     this.$message.error(res.msg)
                }
            })
        },
         getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
            }
                 sums[4] = this.checkObj.stockInQty
                 sums[5] = filters.moneyFilters(this.checkObj.goodsAmount)
                 sums[7] = filters.moneyFilters(this.checkObj.deductionAmount)
            });
            return sums;
      },
       checkSelection() {
            let arr = w2ui.checkBill.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
       //继续审核
        continueExamine(){
             let arr = w2ui.checkBill.getSelection()
             let data={};
                 data.command='audit'
                 data.ids    = arr
                 data.continueAudit=1;
                 data.remark='审核'
             this.request('payable_reconciliationOrder_command',data, false).then((res) => {
                    if(res.code==1){
                                         this.$message.success('审核成功')
                                         this.getData()
                                            }else{
                                                    this.$message.error(res.msg)
                                    }    
             })
                
        },
       //审核
        onExamine() {
            let arr = w2ui.checkBill.getSelection()
            let data={};
                data.command='audit'
                data.ids    = arr
            if (this.checkSelection()) {
                  this.request('payable_reconciliationOrder_check',data, false).then((res) => {
                if (res.code == 1) {              
                                this.$prompt('确定要审核选中的数据吗', '操作确认', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                }).then(({
                                      value
                                }) => {
                                         data.remark='审核 备注:'+(value?value:'无')
                                         this.request('payable_reconciliationOrder_command',data, false).then((res) => {
                                            if(res.code==1){
                                                    this.$message.success('审核成功')
                                                    this.getData()
                                            }else{
                                                    this.$message.error(res.msg)
                                            }
                                    })
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消审核'
                                    });
                                });
                }else{
                      if(res.code=='FMS_704'){
                                    this.$confirm(res.msg, '操作确认', {
                                        confirmButtonText: '继续审核',
                                        cancelButtonText: '暂不审核',
                                        type: 'warning'
                                        }).then(() => {
                                              this.continueExamine()
                                        }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '已取消继续审核'
                                        });          
                                        });
                      }else{
                        this.$message.error(res.msg)
                      }
                      
                }
            })
            } else {
                     this.$message.error('请勾选审核数据')
                  
            }

        },
        // 取消审核
        onExamineCancel() {
            let arr = w2ui.checkBill.getSelection()
            let data={};
                data.command='unAudit'
                data.ids    = arr
            if (this.checkSelection()) {
                  this.request('payable_reconciliationOrder_check',data, false).then((res) => {
                if (res.code == 1) {              
                                this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                }).then(({
                                      value
                                }) => {
                                         data.remark='取消审核 备注:'+(value?value:'无')
                                         this.request('payable_reconciliationOrder_command',data, false).then((res) => {
                                            if(res.code==1){
                                                    this.$message.success('取消审核成功')
                                                    this.getData()
                                            }else{
                                                    this.$message.error(res.msg)
                                            }
                                    })
                                }).catch(() => {
                                     this.$message({
                                        type: 'info',
                                        message: '已取消'
                                    });
                                });
                }else{
                      this.$message.error(res.msg)
                }
            })
            } else {
                     this.$message.error('请勾选取消审核数据')
            }

        },
                 //删除
        onDel() {
            let arr = w2ui.checkBill.getSelection()
            let data={};
                data.command='delete'
                data.ids    = arr
            if (this.checkSelection()) {
                  this.request('payable_reconciliationOrder_check',data, false).then((res) => {
                if (res.code == 1) {              
                                this.$prompt('确定要删除选中的数据吗', '操作确认', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                }).then(({
                                      value
                                }) => {
                                         data.remark='删除 备注:'+(value?value:'无')
                                         this.request('payable_reconciliationOrder_command',data, false).then((res) => {
                                            if(res.code==1){
                                                    this.$message.success('删除成功')
                                                    this.getData()
                                            }else{
                                                    this.$message.error(res.msg)
                                            }
                                    })
                                }).catch(()=> {
                                     this.$message({
                                        type: 'info',
                                        message: '已取消'
                                    });
                                });
                }else{
                      this.$message.error(res.msg)
                }
            })
            } else {
                     this.$message.error('请勾选取消删除数据')
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
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        getExportTotal(){
           if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
                    let data={}
                        data.companyId         = this.formSearch.companyId                    
                        data.supplierId        = this.formSearch.supplierId                 
                        data.periodId          = this.formSearch.periodId                     
                        data.year              = filters.get_unix_only(this.formSearch.year) 
                        data.bizCode           = this.formSearch.bizCode                     
                        data.purchaseOrderNo   = this.formSearch.purchaseOrderNo
                        data.startDate         = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[0]):''
                        data.endDate           = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[1]):''
                        data.status            = this.formSearch.status!=''?Number(this.formSearch.status):''
                        data.auditStartDate    = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[0]):''
                        data.auditEndDate      = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[1]):''
                        data.status==0?'' : data.status==1?'' : delete  data.status
                        data.startDate?'': delete  data.startDate
                        data.endDate?  '': delete data.endDate
                        data.auditStartDate?'': delete  data.auditStartDate
                        data.auditEndDate?  '': delete data.auditEndDate
                        w2ui.checkBill.getSelection().length>0?data.ids= w2ui.checkBill.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
           this.request('payable_reconciliationOrder_exportCount',data,false).then(res=>{
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
                        data.companyId         = this.formSearch.companyId                    
                        data.supplierId        = this.formSearch.supplierId                 
                        data.periodId          = this.formSearch.periodId                     
                        data.year              = filters.get_unix_only(this.formSearch.year) 
                        data.bizCode           = this.formSearch.bizCode                     
                        data.purchaseOrderNo   = this.formSearch.purchaseOrderNo
                        data.startDate         = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[0]):''
                        data.endDate           = this.formSearch.date?filters.get_year_month_day(this.formSearch.date[1]):''
                        data.status            = this.formSearch.status!=''?Number(this.formSearch.status):''
                        data.auditStartDate    = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[0]):''
                        data.auditEndDate      = this.formSearch.time?filters.get_year_month_day(this.formSearch.time[1]):''
                        data.status==0?'' : data.status==1?'' : delete  data.status
                        data.startDate?'': delete  data.startDate
                        data.endDate?  '': delete data.endDate
                        data.auditStartDate?'': delete  data.auditStartDate
                        data.auditEndDate?  '': delete data.auditEndDate
                        w2ui.checkBill.getSelection().length>0?data.ids= w2ui.checkBill.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('payable_reconciliationOrder_export', data, false).then(res => {
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
    }
}
</script> 

<style lang="less" scoped>
// .headerstyle{
//    min-height:205px; 
// }
.headerstyle,
.main,
.middle,
.footer {
    transform: translateZ(0);
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
.marginT0{
    margin-bottom:0px!important;
}
</style>

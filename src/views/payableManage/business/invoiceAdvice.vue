<template>
<div>
    <header class="headerstyle">

        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onImport">导出</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </div>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.company" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supply" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据编号：" size="small">
                <el-input v-model="formSearch.ordersNo" style="width:150px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="单据状态：" size="small">
                <el-select v-model="formSearch.orderStatus" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in orderStatusList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="创建日期：" size="small">
                <el-date-picker v-model="formSearch.day" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
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
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>

    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
            <el-tab-pane label="货款发票" name="first">
                <el-table :data="oneList" :span-method="objectSpanMethod" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="invoiceNo" label="发票号码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" align="center" min-width="120" show-overflow-tooltip>
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
                    <el-table-column prop="taxIncludedAmount" label="含税金额" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedAmount|moneyFilters}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPaymentAmount" label="含税扣款金额" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedPaymentAmount|moneyFilters}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedDeductionExcludedAmount" label="不含扣款含税金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedDeductionExcludedAmount|moneyFilters}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="试制费发票" name="two">
                <el-table :data="twoList" :span-method="objectSpanMethod" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="invoiceNo" label="发票号码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" align="center" min-width="120" show-overflow-tooltip>
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
                    <el-table-column prop="taxIncludedAmount" label="含税金额" min-width="120" align="center" show-overflow-tooltip>
                           <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedAmount|moneyFilters}}</div>
                          </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPaymentAmount" label="含税扣款金额" min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedPaymentAmount|moneyFilters}}</div>
                          </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedDeductionExcludedAmount" label="不含扣款含税金额" min-width="120" align="center" show-overflow-tooltip>
                           <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedDeductionExcludedAmount|moneyFilters}}</div>
                          </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="冲红发票" name="three">
                <el-table :data="threeList" :span-method="objectSpanMethod" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="invoiceNo" label="发票号码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" align="center" min-width="120" show-overflow-tooltip>
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
                    <el-table-column prop="taxIncludedAmount" label="含税金额" min-width="120" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedAmount|moneyFilters}}</div>
                           </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPaymentAmount" label="含税扣款金额" min-width="120" align="center" show-overflow-tooltip>
                           <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedPaymentAmount|moneyFilters}}</div>
                           </template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedDeductionExcludedAmount" label="不含扣款含税金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.taxIncludedDeductionExcludedAmount|moneyFilters}}</div>
                           </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="four">
                <el-table :data="adviceLoglList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="adviceLoglList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="adviceLoglList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>

</div>
</template>

<script>
import Util from 'libs/util'
 import { commonMixins } from 'mixins/common';
 import {debounce} from 'mixins/debounce'
export default {
    mixins: [commonMixins,debounce],

    data() {
        return {
            orderStatusList:[{id:0,name:'待审核'},{id:1,name:'已审核'}],
            newTime: null,
            currentPageSum: {
            },
            totalPageSum: {
            },
            merchantCodeList: [],
            orderNoList: [],
            sectionNoList: [],
            delaiList: [], //明细
            activeName: 'first',
            invoiceType:1,
            logList: [], //日志
            billNo: '',
            show: false,
            companyList:[],
            supplyList:[],
            formSearch: {
                code: '',
                name: '',
                person: '',
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    computed: {
        oneList() {
            return this.$store.state.app.oneList
        },
        twoList() {
            return this.$store.state.app.twoList
        },
        threeList() {
            return this.$store.state.app.threeList
        },
        adviceLoglList() {
            return this.$store.state.app.adviceLoglList
        }
    },
    mounted() {
        this.getCompany()
        this.getSupply()
        this.getButtonJurisdiction() //按钮权限
        this.initTable()
    },
    beforeDestroy(){
        sessionStorage.removeItem("detailId");
    },
    destroyed() {
        this.invoiceType = 1
        this.$store.commit('clearadviceBill')
         sessionStorage.removeItem("detailId");
    },
    methods: {
        objectSpanMethod({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 1) {//第几行需要合并
                if (row.mergeNumber > 0) {//数量大于0的时候合并
                    return {
                        rowspan: row.mergeNumber, //行合并数
                        colspan: 1 //列合并数
                    };
                } else if (row.mergeNumber == 0) {//等于0的时候不合并并去掉该项，不然数据会往后跑
                    return {
                        rowspan: 1, //行合并数
                        colspan: 0 //列合并数
                    };
                } else {
                    return {
                        rowspan: 1,
                        colspan: 1
                    };
                }
            }
        },
        handleClick(name){
            console.log(name,'=====')
            if(name == 'first'){
                this.invoiceType = 1
                this.getDetail(JSON.parse(window.sessionStorage.getItem('detailId')))
            }else if(name == 'two'){
                this.invoiceType = 2
                this.getDetail(JSON.parse(window.sessionStorage.getItem('detailId')))
            }else if(name == 'three'){
                this.invoiceType = 3
                this.getDetail(JSON.parse(window.sessionStorage.getItem('detailId')))
            }else if(name == 'four'){
                this.getLoglist(JSON.parse(window.sessionStorage.getItem('detailId')))
            }
        },
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
        //导出
        onImport(){
            let arr = w2ui.invoiceAdvice.getSelection()
            let data = {}
            data.idList = arr
            data.basicCompanyId =  this.formSearch.company
            data.basicSupplierId = this.formSearch.supply
            data.bizNo = this.formSearch.ordersNo
            //data.status = this.formSearch.orderStatus //单据状态
            !this.formSearch.day ? delete data.createdStart : data.createdStart = Util.dateFormat(this.formSearch.day[0], 'yyyy-MM-dd')
            !this.formSearch.day ? delete data.createdEnd : data.createdEnd = Util.dateFormat(this.formSearch.day[1], 'yyyy-MM-dd')
            this.request('advice_export', data, true).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
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
        initTable(arr = [], currentPageSum, totalPageSum) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'invoiceAdvice',
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
                        {
                            field: 'bizNo',
                            caption: '单据编号',
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
                            field: 'taxIncludedTotalAmount',
                            caption: '含税总金额',
                            size: '100px',
                            render: 'money',
                            resizable: true,
                        },
                        {
                            field: 'invoiceQty',
                            caption: '总开票张数',
                            size: '100px'
                        },
                        {
                            field: 'goodsInvoiceAmount',
                            caption: '货款开票金额',
                             render: 'money',
                            size: '100px'
                        },
                        {
                            field: 'goodsInvoiceQty',
                            caption: '货款开票张数',
                            size: '100px'
                        },
                        {
                            field: 'tryFeeInvoiceAmount',
                            caption: '试制费开票金额',
                             render: 'money',
                            size: '100px'
                        },
                        {
                            field: 'tryFeeInvoiceQty',
                            caption: '试制费开票张数',
                            size: '100px'
                        },
                        {
                            field: 'invoiceRedAmount',
                            caption: '冲红开票金额',
                             render: 'money',
                            size: '100px'
                        },
                        {
                            field: 'invoiceRedQty',
                            caption: '冲红开票张数',
                            size: '100px'
                        },
                        {
                            field: 'status',
                            caption: '单据状态',
                            size: '100px'
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px'
                        },
                    ],
                    onClick: function (event, obj) {
                        let orderId = null
                        self.currentPage = 1
                        self.$store.commit('clearadviceBill')
                        w2ui['invoiceAdvice'].records.map(function (item) {
                            if (obj.recid == item.recid) {
                                orderId = item.orderId
                            }
                        })
                        self.getLoglist(obj.recid)
                        self.getDetail(obj.recid)
                        // self.getDetailId = obj.recid
                        sessionStorage.setItem('detailId',JSON.stringify(obj.recid))
                    }
                })
            });
            if (arr.length > 0) {
                $('#main').w2render('invoiceAdvice');
                w2ui.invoiceAdvice.clear(); //清空
                w2ui.invoiceAdvice.records = arr
                w2ui.invoiceAdvice.records.push({
                    w2ui: {
                        summary: true
                    },
                        tryFeeInvoiceAmount:currentPageSum.tryFeeInvoiceAmount,
                        taxIncludedTotalAmount:currentPageSum.taxIncludedTotalAmount,
                        invoiceRedAmount:currentPageSum.invoiceRedAmount,
                        goodsInvoiceAmount:currentPageSum.goodsInvoiceAmount,
                        index: '<span>当页小计</span>',
                }, {
                    w2ui: {
                        summary: true
                    },
                    tryFeeInvoiceAmount:currentPageSum.tryFeeInvoiceAmount,
                        taxIncludedTotalAmount:currentPageSum.taxIncludedTotalAmount,
                        invoiceRedAmount:currentPageSum.invoiceRedAmount,
                        goodsInvoiceAmount:currentPageSum.goodsInvoiceAmount,
                        index: '<span>合计</span>',
                })
                w2ui.invoiceAdvice.refresh();
            } else {
                $('#main').w2render('invoiceAdvice')
                w2ui.invoiceAdvice.clear(); //清空
                w2ui['invoiceAdvice'].records = []
                w2ui.invoiceAdvice.refresh();
            }

        },
        getData() {
            this.$store.commit('clearadviceBill')
             sessionStorage.removeItem("detailId");
            let data = {}
            data.basicCompanyId =  this.formSearch.company
            data.basicSupplierId = this.formSearch.supply
            data.bizNo = this.formSearch.ordersNo
            //data.status = this.formSearch.orderStatus //单据状态
            !this.formSearch.day ? delete data.createdStart : data.createdStart = Util.dateFormat(this.formSearch.day[0], 'yyyy-MM-dd')
            !this.formSearch.day ? delete data.createdEnd : data.createdEnd = Util.dateFormat(this.formSearch.day[1], 'yyyy-MM-dd')
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('advice_page', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            String(res.data.records[i].taxIncludedTotalAmount).indexOf(',')>-1?res.data.records[i].taxIncludedTotalAmount=Number(res.data.records[i].taxIncludedTotalAmount.replace(/,/g,'')):''
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                           String(res.data.currentPageSum.taxIncludedTotalAmount).indexOf(',')>-1?res.data.currentPageSum.taxIncludedTotalAmount=Number(res.data.currentPageSum.taxIncludedTotalAmount.replace(/,/g,'')):''
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                    } else {
                        this.initTable()
                    }
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                    res.data.currentPageSum ? this.currentPageSum = res.data.currentPageSum : this.currentPageSum = {
                    }
                    res.data.totalPageSum ? this.totalPageSum = res.data.totalPageSum : this.totalPageSum = {
                    }
                }else{
                    this.$message.error(res.msg)
                    this.initTable()
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = 'acc_payable_invoice_advice_' + billNo
            this.currentPage = 1
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('adviceBillList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('adviceBillList', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('adviceBillList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('adviceBillList', this.logList)
                    }
                }
            })
        },
        //货品明细
        getDetail(id) {
            let data = {}
            data.payableInvoiceAdviceId = Number(id)
            data.invoiceType = this.invoiceType
            this.request('advice_getDetail', data, false).then(res => {
                if (res.code == '1') {
                    if(this.invoiceType == 1){
                        this.$store.commit('initOnelist', res.data)
                    }else if(this.invoiceType == 2){
                        this.$store.commit('initTwolist', res.data)
                    }else if(this.invoiceType == 3){
                        this.$store.commit('initThreelist', res.data)
                    }
                }
            })
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
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

<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <!-- <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="modify">编辑</el-button>
                </el-form-item> -->
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('取消审核') !== -1" size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                </el-form-item>
                <!-- <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
                </el-form-item> -->
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </Col>
            <!-- <el-divider></el-divider> -->
              <el-form-item label=" 公 司 ：" size="small">
                <el-select v-model="formSearch.companyId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supplierId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建日期：" size="small">
                <el-date-picker v-model="formSearch.createTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="制单号：" size="small">
                <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item> -->
             <el-form-item label="单据状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.status" filterable clearable placeholder="请选择" style="width:155px">
                     <!-- <el-option label="待审核" value="0"></el-option> -->
                    <!-- <el-option label="编辑中" value="2"></el-option> -->
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发票类型：" size="small" v-if="show == true">
                <el-select v-model="formSearch.invoiceType" filterable clearable placeholder="请选择" style="width:150px">
                    <el-option label="货款发票" value="1"></el-option>
                    <el-option label="试制费发票" value="2"></el-option>
                    <el-option label="冲红发票" value="3"></el-option>
                </el-select>
            </el-form-item>
          
            <el-form-item v-if="show == true" label="到票日期：" size="small">
                 <el-date-picker v-model="formSearch.arriveTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="开票日期：" size="small">
                 <el-date-picker v-model="formSearch.invoiceTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
            <el-form-item label="发票号码：" size="small" v-if="show == true">
                <el-input v-model.trim="formSearch.invoiceNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="扣款状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.dtStatus" filterable placeholder="请选择" style="width:150px">
                    <el-option label="已扣款" value="1"></el-option>
                    <el-option label="未扣款" value="0"></el-option>
                </el-select>
            </el-form-item> -->
             <el-form-item size="small" label-width="100px">
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
        <div id="main12" style="width: 100%; height: 350px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <section class="middle">
                    <el-table :data="geNewData" border style="width: 100%"  max-height="250" >
                        <el-table-column type="index" label="序号" align="center" width="50">
                        </el-table-column>
                        <!-- <el-table-column prop="name" align="center" label="公司" min-width="120">
                        </el-table-column>
                        <el-table-column prop="amount1" align="center" label="供应商" min-width="120">
                        </el-table-column> -->
                        <el-table-column prop="payableReconciliationOrderNo" align="center" min-width="120" label="对账单编号"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="poInNo" align="center" min-width="120" label="制单号">
                        </el-table-column>
                        <el-table-column prop="goodsNo" align="center" min-width="120" label="大货款号">
                        </el-table-column>
                        <el-table-column prop="batchNo" align="center" min-width="120" label="批次">
                        </el-table-column>
                        <el-table-column prop="invoiceQty" align="center" min-width="120" label="数量">
                        </el-table-column>
                        <el-table-column prop="taxExcludedAmount" align="center" min-width="120" label="不含税金额">
                               <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxExcludedAmount| moneyFilters}}</div></template>
                        </el-table-column>
                        <el-table-column prop="taxExcludedPrice" align="center" min-width="120" label="不含税单价">
                                 <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxExcludedPrice| singlePrice}}</div></template>
                        </el-table-column>
                         <el-table-column prop="tax" align="center" min-width="120" label="税率">
                              <!-- <template slot-scope="scope">{{scope.row.deductionAmount|moneyFilters}}</template> -->
                        </el-table-column>
                        <el-table-column prop="taxAmount" label="税额" min-width="120" align="center" show-overflow-tooltip>
                                   <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxAmount| moneyFilters}}</div></template>
                        </el-table-column>
                        <el-table-column prop="taxIncludedPrice" align="center" min-width="120" label="含税单价">
                             <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedPrice| singlePrice}}</div></template>
                        </el-table-column>
                        <el-table-column prop="taxIncludedAmount" align="center" min-width="120" label="含税金额">
                               <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedAmount| moneyFilters}}</div></template>
                        </el-table-column>
                        <!-- <el-table-column prop="remark" align="center" min-width="120" label="备注">
                        </el-table-column> -->
                    </el-table>
                </section>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="third">
                <section class="middle">
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
                </section>
            </el-tab-pane>
        </el-tabs>
    </section>
    <!--修改-->
    <Modal v-model="adjustVisible" :styles="mystyle" :rules="rules" title="修改扣款单" @on-cancel='cancelAdjust' :width="440" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="adjustForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="供应商：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.gys" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="公司：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.company" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="大货款号：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.goodsNo" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="扣款类型：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.kklx" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="扣款金额：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.kkje" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="品牌：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.brand" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="结算制单号：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.codeNo" style="width:200px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item size="small" label-width="95px" style="padding-left:130px">
                    <Button type="primary" @click="saveAdjust">确定</Button>
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
var record={}
import filters from '../../../filter/'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
             exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            show: false,
            loading: false,
            examineVisible: false, // 审核框
            dialogVisible: false, // 生成对账单框
            adjustVisible: false, // 扣款调整
            activeName: 'first',
            adjustObj: {
                gys    :'',
                company:'',
                goodsNo :'',//大货款号
                kklx:'',//扣款类型
                kkje :'',//扣款金额
                brand :'', //品牌
                codeNo :'',//结算制单号

            }, // 扣款调整数据对象
            adjustList: [], //  调整扣款的列表 
            logList: [], // 日
            formSearch: {
                // year:new Date(),
                companyId:'',
                supplierId:'',
                createTime:'',
                status:'',
                invoiceType:'',//发票类型
                arriveTime:'',//到票时间
                invoiceTime:'',//开票时间
                invoiceNo:'',//发票编码
            },
            companyList: [], // 公司列表
            supplyList: [], //供应商列表
            addBillObj: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            logPage:1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            AList:[],
        }
    },
    computed: mapState({
                geNewData: state => state.deduction.deductionList,
                logsList: state => state.deduction.deductionLogList,
                deductionId: state => state.deduction.id,
                activeName:state =>state.deduction.activeName
    }),
    created() {
        this.getCompany()
        this.getSupply()
    },
    destroyed() {
        this.resetCommit()
    },
    mounted() {
        // this.formSearch.year = new Date()
        // this.activeName='first'
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])
    },
    methods: {
        modify(){
                  let arr = w2ui.billspayable.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    console.log(record,'56789')
                    this.adjustVisible=true
                    this.adjustObj.gys = record.supplierName //供应商
                    this.adjustObj.company = record.companyName //公司
                    this.adjustObj.goodsNo = record.goodsNo //大货款号
                    this.adjustObj.kklx = record.deductionType//扣款类型
                    this.adjustObj.kkje = record.deductionAmount//扣款金额
                    this.adjustObj.brand = record.brandName //品牌
                    this.adjustObj.codeNo = record.targetPurchaseOrderNo//结算制单号
                }
        },
        handleClick(tab, event) {
            if (tab.name == 'first') {
            } else if (tab.name == 'third') {
                if (!this.deductionId) return
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
                $('#main12').w2grid({
                    name: 'billspayable',
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
                            field: 'status',
                            caption: '单据状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'invoiceTypeName',
                            caption: '发票类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '单据日期',
                            size: '100px',
                            sortable: true
                        },

                        {
                            field: 'bizNo',
                            caption: '应付单编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'arriveInvoiceDate',
                            caption: '到票日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'invoiceDate',
                            caption: '开票日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '100px',
                            sortable: true
                        },
                        // {
                        //     field: 'deductionAmount',
                        //     caption: '加工类型',
                        //     size: '100px',
                        //     sortable: true
                        // },
                        {
                            field: 'payableAmount',
                            caption: '应付总金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'paidStatus',
                            caption: '付款状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'dischargeAmount',
                            caption: '已排款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'undischargeAmount',
                            caption: '待排款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'paidAmount',
                            caption: '已付款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'unpaidAmount',
                            caption: '未付款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                         {
                            field: 'frozenDischargeAmount',
                            caption: '冻结排款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'invoiceNo',
                            caption: '发票号码',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'dischargeStatus',
                            caption: '排款状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'verifyAmount',
                            caption: '核销金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'verifyStatus',
                            caption: '核销状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },

                    ],
                    onClick: function (event) {
                            //  record = this.get(event.recid);
                            //  console.log(this.get(event.recid))
                             self.activeName = 'first' 
                             self.logPage=1
                            setTimeout(()=>{
                                if(w2ui.billspayable.getSelection().length == 1){
                                    let arr = w2ui.billspayable.getSelection()
                                    if(arr[0] != this.get(event.recid).id){
                                         console.log('--------------')
                                    }else{ 
                                           self.getGoodsList(event.recid)
                                           self.$store.commit('getdeductionId', event.recid)
                                           self.getLoglist()
                                        // //  setTimeout(()=>{
                                        // //      self.activeName = 'first'
                                        // //  },100)  
                                        // // self.$set(self.activeName,'activeName','first');
                                        // // alert(self.activeName)
                                      
                                        //    self.logPage = 1
                                    
                                    }
                                }else{
                                    // self.resetCommit()
                                        
                                }
                            }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.billspayable.clear(); //清空
                w2ui.billspayable.records = arr
                w2ui.billspayable.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    payableAmount: current.totalPayableAmount,
                    dischargeAmount:current.totalDischargeAmount,
                    undischargeAmount:current.totalUndischargeAmount,
                    paidAmount:current.totalPaidAmount,
                    unpaidAmount:current.totalUnpaidAmount,
                    frozenDischargeAmount:current.frozenDischargeTotalAmount,
                    verifyAmount:current.totalVerifyAmount
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    payableAmount: total.totalPayableAmount,
                    dischargeAmount:total.totalDischargeAmount,
                    undischargeAmount:total.totalUndischargeAmount,
                    paidAmount:total.totalPaidAmount,
                    unpaidAmount:total.totalUnpaidAmount,
                    frozenDischargeAmount:total.frozenDischargeTotalAmount,
                    verifyAmount:total.totalVerifyAmount
                })
                  w2ui.billspayable.refresh();
                $('#main12').w2render('billspayable');
            } else {
                $(document).ready(function () {
                    w2ui.billspayable.clear(); //清空
                    w2ui['billspayable'].records = []
                    w2ui.billspayable.refresh();
                    $('#main12').w2render('billspayable')
                })

            }

        },
        resetCommit() {
            this.$store.commit('cleardeductionList')
            this.$store.commit('cleardeductionId')
            this.$store.commit('cleardeductionLogList')
        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = ''
            }
            // this.resetCommit()
            // this.formSearch = {
            //     year:new Date()
            // }
            // this.formSearch.year = new Date()
            // this.initTable([])
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
        getData() {
            this.resetCommit()
            this.loading = true;
            this.logList = []
            this.activeName='first';
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            // data.year = filters.get_unix_only(this.formSearch.year)
            data.basicCompanyId  = this.formSearch.companyId  //
            data.basicSupplierId = this.formSearch.supplierId//供应商id
            data.invoiceNo=   this.formSearch.invoiceNo;//发票号
            this.formSearch.createTime?data.createdStartTime=this.formSearch.createTime[0]:delete data.createdStartTime; //创建日期开始时间
            this.formSearch.createTime?data.createdEndTime=this.formSearch.createTime[1]:delete data.createdEndTime;      //创建日期结束时间
            this.formSearch.invoiceTime?data.invoiceStartDate=this.formSearch.invoiceTime[0]:delete data.invoiceStartDate;
            this.formSearch.invoiceTime?data.invoiceEndDate=this.formSearch.invoiceTime[1]:delete data.invoiceEndDate;
            this.formSearch.arriveTime?data.arriveInvoiceStartDate=this.formSearch.arriveTime[0]:delete data.arriveInvoiceStartDate;
            this.formSearch.arriveTime?data.arriveInvoiceEndDate=this.formSearch.arriveTime[1]:delete data.arriveInvoiceEndDate;
            data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';                      //结束状态
            data.invoiceType=this.formSearch.invoiceType!=''?Number(this.formSearch.invoiceType):'';       //发票类型

            // data.purchaseOrderNo = this.formSearch.purchaseOrderNo
            // data.status = Number(this.formSearch.status)
            // data.deductionType = this.formSearch.deductionType
            // this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
            // this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
            // data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
            // data.goodsNo = this.formSearch.goodsNo
            // data.deductionStatus = this.formSearch.dtStatus
            this.request('eop_boot_payable_page', data, true).then(res => {
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
        getGoodsList(id) {
            // console.log(100)
            this.$store.commit('clearactiveName')
            this.logPage=1;
            let data = {}
            data.payableId = id
            this.request('eop_boot_payable_detail', data, false).then((res) => {
                if (res.code == '1') {
                    this.AList = res.data
                    this.$store.commit('getDeductionList', res.data)
                }
                 else {
                    this.$store.commit('cleardeductionList')
                }
            })
        },
        //日志
        getLoglist() {
            let data = {}
            data.billNo = 'acc_payable_' + this.deductionId
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
                        this.$store.commit('initdeductionLogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initdeductionLogList', this.logList)
                    }
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
        operate() {
            this.$prompt('确定要审核选中的数据吗', '操作确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({
                value
            }) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' +(value?value:'无')
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        checkSelection() {
            let arr = w2ui.billspayable.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //继续审核
        continueExamine() {
            let arr = w2ui.billspayable.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            data.continueAudit = 1;
            data.remark = '审核'
            this.request('payable_reconciliationOrder_command', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success(res.msg)
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },
        //审核
        onExamine() {
            let arr = w2ui.billspayable.getSelection()
                // if(arr.length>1){
                //       return this.$message.error('一次只能审核一条数据')
                // }
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
                                                   data.ids = arr
                                                    this.request('eop_boot_payable_audit', data, false).then((res) => {
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
                }
            // let data = {};
            // // data.command = 'audit'
            // data.payableId = arr[0]
            // if (this.checkSelection()) {
            //     this.request('payable_deductionOrder_check', data, false).then((res) => {
            //         if (res.code == 1) {
            //             this.$prompt('确定要审核选中的数据吗', '操作确认', {
            //                 confirmButtonText: '确定',
            //                 cancelButtonText: '取消',
            //             }).then(({
            //                 value
            //             }) => {
            //                 data.remark = '审核 备注:' +(value?value:'无')
            //                 this.request('eop_boot_payable_audit', data, false).then((res) => {
            //                     if (res.code == 1) {
            //                         this.$message.success('审核成功')
            //                         this.getData()
            //                     } else {
            //                         this.$message.error(res.msg)
            //                     }
            //                 })
            //             }).catch(() => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: '已取消审核'
            //                 });
            //             });
            //         } else {
            //             if (res.code == 'FMS_704') {
            //                 this.$confirm(res.msg, '操作确认', {
            //                     confirmButtonText: '继续审核',
            //                     cancelButtonText: '暂不审核',
            //                     type: 'warning'
            //                 }).then(() => {
            //                     this.continueExamine()
            //                 }).catch(() => {
            //                     this.$message({
            //                         type: 'info',
            //                         message: '已取消继续审核'
            //                     });
            //                 });
            //             } else {
            //                 this.$message.error(res.msg)
            //             }

            //         }
            //     })
            // } else {
            //     this.$message.error('请勾选审核数据')

            // }

        },
        // 取消审核
        onExamineCancel() {
              let arr = w2ui.billspayable.getSelection()
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
                                                    data.ids = arr
                                                    this.request('eop_boot_payable_payable_unaudit', data, false).then((res) => {
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
                        //      data.payableId = arr[0]
                        //     this.request('eop_boot_payable_payable_unaudit', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success(res.msg)
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                }
            // let arr = w2ui.billspayable.getSelection()
            // let data = {};
            // // data.command = 'unAudit'
            // data.payableId = arr
            // if (this.checkSelection()) {
            //     this.request('payable_deductionOrder_check', data, false).then((res) => {
            //         if (res.code == 1) {
            //             this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
            //                 confirmButtonText: '确定',
            //                 cancelButtonText: '取消',
            //             }).then(({
            //                 value
            //             }) => {
            //                 data.remark = '取消审核 备注:'+(value?value:'无')
            //                 this.request('eop_boot_payable_payable_unaudit', data, false).then((res) => {
            //                     if (res.code == 1) {
            //                         this.$message.success('取消审核成功')
            //                         this.getData()
            //                     } else {
            //                         this.$message.error(res.msg)
            //                     }
            //                 })
            //             }).catch(() => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: '已取消'
            //                 });
            //             });
            //         } else {
            //             this.$message.error(res.msg)
            //         }
            //     })
            // } else {
            //     this.$message.error('请勾选取消审核数据')
            // }

        },
        //删除
        onDel() {
            let arr = w2ui.billspayable.getSelection()
            let data = {};
            data.command = 'delete'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_deductionOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要删除选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '删除 备注:'+(value?value:'无')
                            this.request('payable_deductionOrder_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('删除成功')
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
                this.$message.error('请勾选取消删除数据')
            }
        },
        resetForm(name) {
            this.$refs[name].resetFields();
        },
        saveAdjust(){
            let data = {}
            data.targetPurchaseOrderNo = this.adjustObj.codeNo//结算制单号
            data.id = record.id
            this.request('payable_deductionOrder_update', data, false).then(res => {
                if (res.code == '1') {
                    this.getData()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
                this.adjustVisible=false
            })     
        },
        cancelAdjust() {
            this.adjustVisible = false;
            this.resetForm('adjustForm')
        },
        //新增
        adjustAdd() {
            //   adjustList
        },
        adjustRemove() {

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
                            // data.year = filters.get_unix_only(this.formSearch.year)
                            data.basicCompanyId  = this.formSearch.companyId  //
                            data.basicSupplierId = this.formSearch.supplierId//供应商id
                            data.invoiceNo=   this.formSearch.invoiceNo;//发票号
                            this.formSearch.createTime?data.createdStartTime=this.formSearch.createTime[0]:delete data.createdStartTime; //创建日期开始时间
                            this.formSearch.createTime?data.createdEndTime=this.formSearch.createTime[1]:delete data.createdEndTime;      //创建日期结束时间
                            this.formSearch.invoiceTime?data.invoiceStartDate=this.formSearch.invoiceTime[0]:delete data.invoiceStartDate;
                            this.formSearch.invoiceTime?data.invoiceEndDate=this.formSearch.invoiceTime[1]:delete data.invoiceEndDate;
                            this.formSearch.arriveTime?data.arriveInvoiceStartDate=this.formSearch.arriveTime[0]:delete data.arriveInvoiceStartDate;
                            this.formSearch.arriveTime?data.arriveInvoiceEndDate=this.formSearch.arriveTime[1]:delete data.arriveInvoiceEndDate;
                            data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';                      //结束状态
                            data.invoiceType=this.formSearch.invoiceType!=''?Number(this.formSearch.invoiceType):'';       //发票类型   
                            w2ui.billspayable.getSelection().length>0?data.ids= w2ui.billspayable.getSelection():delete data.ids
                            this.exportObj.selected==1? data.containDetail=false:data.containDetail=true;
           this.request('eop_boot_payable_exportTotal',data,false).then(res=>{
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
                            // data.year = filters.get_unix_only(this.formSearch.year)
                            data.basicCompanyId  = this.formSearch.companyId  //
                            data.basicSupplierId = this.formSearch.supplierId//供应商id
                            data.invoiceNo=   this.formSearch.invoiceNo;//发票号
                            this.formSearch.createTime?data.createdStartTime=this.formSearch.createTime[0]:delete data.createdStartTime; //创建日期开始时间
                            this.formSearch.createTime?data.createdEndTime=this.formSearch.createTime[1]:delete data.createdEndTime;      //创建日期结束时间
                            this.formSearch.invoiceTime?data.invoiceStartDate=this.formSearch.invoiceTime[0]:delete data.invoiceStartDate;
                            this.formSearch.invoiceTime?data.invoiceEndDate=this.formSearch.invoiceTime[1]:delete data.invoiceEndDate;
                            this.formSearch.arriveTime?data.arriveInvoiceStartDate=this.formSearch.arriveTime[0]:delete data.arriveInvoiceStartDate;
                            this.formSearch.arriveTime?data.arriveInvoiceEndDate=this.formSearch.arriveTime[1]:delete data.arriveInvoiceEndDate;
                            data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';                      //结束状态
                            data.invoiceType=this.formSearch.invoiceType!=''?Number(this.formSearch.invoiceType):'';       //发票类型
                            w2ui.billspayable.getSelection().length>0?data.ids= w2ui.billspayable.getSelection():delete data.ids
                            this.exportObj.selected==1? data.containDetail=false:data.containDetail=true;
                      this.request('eop_boot_payable_exportAsync', data, false).then(res => {
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

.marginT0 {
    margin-bottom: 0px !important;
}
</style>

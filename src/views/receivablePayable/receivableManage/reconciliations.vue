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
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onImport">导出</el-button>
                </el-form-item>
            </div>
            <el-form-item><span style="color:red">*</span></el-form-item>
            <el-form-item label="平台：" size="small">
                <el-select v-model="formSearch.code" @change="changeCode(formSearch.code)" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.name" @change="changeName(formSearch.name)" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item v-if="show == true" label="期间：" size="small">
                <el-select v-model="formSearch.time" filterable placeholder="请选择" style="width:190px">
                    <el-option v-for="item in timeList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item v-if="formSearch.code == '云集'" label="账单ID：" size="small">
                  <el-input v-model="formSearch.yunjibillNo" placeholder="请输入" style="width:220px"></el-input>
                <!-- <el-select v-model="formSearch.time" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in timeList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
            
            <Col v-if="formSearch.code == '唯品会' ">
                   <el-form-item><span style="color:red">*</span></el-form-item>
                   <el-form-item label="平台模式：" size="small">
                        <el-select v-model="formSearch.vip" filterable @change="watchChange(formSearch.vip)" placeholder="请选择" style="width:120px">
                            <el-option label="JIT/JITX" value="JIT/JITX"></el-option>
                            <el-option label="OXO" value="OXO"></el-option>
                            <el-option label="MP" value="MP"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账单ID：" size="small">
                            <el-input v-model.trim="formSearch.billNo"  style="width:135px"></el-input>
                    </el-form-item>  
            </Col>
        </el-form>
    </header>
    <section class="middle" v-show="formSearch.code == '拼多多' ">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>
    <section class="middle" v-show="formSearch.code == '淘宝' ">

        <div id="mainTwo" style="width: 100%; height: 300px;"></div>
        </br>
        <div id="mainThree" style="width: 100%; height: 300px;"></div>
    </section>
    <!-- 云集 -->
    <section class="middle" v-show="formSearch.code == '云集' ">
          <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <div id="mainYunji" style="width: 100%; height: 300px;"></div>
    </section>
    <!-- 唯品会 -->
     <section class="middle" v-show="formSearch.code == '唯品会'&&formSearch.vip ">
           <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <div v-show="formSearch.vip=='JIT/JITX'" id="vipJIT" style="width: 100%; height: 300px;"></div>
          <div v-show="formSearch.vip=='OXO'"      id="vipOXO" style="width: 100%; height: 300px;"></div>
          <div v-show="formSearch.vip=='MP'"       id="vipMP" style="width: 100%; height: 300px;"></div>
    </section>
</div>
</template>

<script>
// import yunJi from '../component/yunji.vue'
export default {

    data() {
        return {
            timeAA: null,
            totalList: [],
            basicPlatformId: '',
            timeList: [],
            logList: [], //日志
            billNo: '',
            show: false,
            zhan: false,
            col: [{
                    label: '平台',
                    prop: 'basicPlatformName'
                },
                {
                    label: '公司',
                    prop: 'basicCompanyName'
                },
                {
                    label: '店铺',
                    prop: 'basicStoreName'
                },
                {
                    label: '期间',
                    prop: 'period'
                }, {
                    label: '多多进宝',
                    prop: 'ddjbAmount'
                }, {
                    label: '技术服务费',
                    prop: 'technicalServiceAmount'
                },
                {
                    label: '交易收入',
                    prop: 'transactionIncomeAmount'
                },
                {
                    label: '扣款',
                    prop: 'chargebackAmount'
                },
                {
                    label: '其他',
                    prop: 'elseAmount'
                },
                {
                    label: '销售折扣',
                    prop: 'salesDiscountAmount'
                },
                {
                    label: '退款',
                    prop: 'refundAmount'
                },
                {
                    label: '优惠券结算',
                    prop: 'couponAmount'
                },
                {
                    label: '销售金额',
                    prop: 'saleAmount'
                },
                {
                    label: '可用现金账户',
                    prop: 'availableCashAmount'
                },
                {
                    label: '营销保证金账户',
                    prop: 'marginDepositAmount'
                },
                {
                    label: '可提现金额',
                    prop: 'withdrawableAmount'
                },
                {
                    label: '提现',
                    prop: 'withdrawalAmount'
                },
                {
                    label: '不含试制费成本总额',
                    prop: 'noTrialProductionSumAmount'
                },
                {
                    label: '含试制费成本总额',
                    prop: 'trialProductionSumAmount'
                },
                {
                    label: '确认收入金额',
                    prop: 'recognitionIncomeAmount'
                },
                {
                    label: '有票费用',
                    prop: 'ticketAmount'
                },
                {
                    label: '无票费用（购买优惠券）',
                    prop: 'noTicketAmount'
                },
            ],
            tableData: [],
            formThead: [],
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
            companyCodeOptions: [],
            dialogVisible: false, //新增
            statusQptions: [{
                    value: 1,
                    name: '是'
                },
                {
                    value: 0,
                    name: '否'
                }
            ],
            formSearch: {
                code: '',
                name: '',
                person: '',
                vip   :'',
                billNo:'',
                yunjibillNo:''
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
            judgeMenu: [],
            buttonList: [], //按钮权限
            platformOptions:[],
        }
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])

    },
    methods: {
        getButtonJurisdiction() {
            console.log(this.$route.query.code, '0895643345\879')
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
            $(function () {
                $('#main').w2grid({
                    name: 'reconciliations',
                    header: 'List of Names',
                    show: {
                        toolbar: true,
                        // footer        : true,
                        selectColumn: true,
                        // expandColumn: true
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
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
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'period',
                            caption: '期间',
                            size: '100px'
                        },
                        {
                            field: 'ddjbAmount',
                            caption: '多多进宝',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'technicalServiceAmount',
                            caption: '技术服务费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'transactionIncomeAmount',
                            caption: '交易收入',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'chargebackAmount',
                            caption: '扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'elseAmount',
                            caption: '其他',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'salesDiscountAmount',
                            caption: '销售折扣',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'refundAmount',
                            caption: '退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'couponAmount',
                            caption: '优惠券结算',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'saleAmount',
                            caption: '销售金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'availableCashAmount',
                            caption: '可用现金账户',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'marginDepositAmount',
                            caption: '营销保证金账户',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'withdrawableAmount',
                            caption: '可提现金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'withdrawalAmount',
                            caption: '提现',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'noTrialProductionSumAmount',
                            caption: '不含试制费成本总额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'trialProductionSumAmount',
                            caption: '含试制费成本总额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'recognitionIncomeAmount',
                            caption: '确认收入金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'noTicketAmount',
                            caption: '无票费用（购买优惠券）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'ticketAmount',
                            caption: '有票费用',
                            size: '100px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
            });
            if (arr.length > 0) {
                $('#main').w2render('reconciliations');
                w2ui.reconciliations.clear(); //清空
                w2ui.reconciliations.records = arr
                w2ui.reconciliations.records.push({
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName: '<span>当页小计</span>',
                    availableCashAmount: currentPageSummary.availableCashAmount,
                    chargebackAmount: currentPageSummary.chargebackAmount,
                    couponAmount: currentPageSummary.couponAmount,
                    ddjbAmount: currentPageSummary.ddjbAmount,
                    elseAmount: currentPageSummary.elseAmount,
                    marginDepositAmount: currentPageSummary.marginDepositAmount,
                    noTicketAmount: currentPageSummary.noTicketAmount,
                    noTrialProductionSumAmount: currentPageSummary.noTrialProductionSumAmount,
                    recognitionIncomeAmount: currentPageSummary.recognitionIncomeAmount,
                    refundAmount: currentPageSummary.refundAmount,
                    saleAmount: currentPageSummary.saleAmount,
                    salesDiscountAmount: currentPageSummary.salesDiscountAmount,
                    technicalServiceAmount: currentPageSummary.technicalServiceAmount,
                    technicalServiceInvoiceAmount: currentPageSummary.technicalServiceInvoiceAmount,
                    ticketAmount: currentPageSummary.ticketAmount,
                    transactionIncomeAmount: currentPageSummary.transactionIncomeAmount,
                    trialProductionSumAmount: currentPageSummary.trialProductionSumAmount,
                    withdrawableAmount: currentPageSummary.withdrawableAmount,
                    withdrawalAmount: currentPageSummary.withdrawalAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName: '<span >合计</span>',
                    availableCashAmount: totalPageSummary.availableCashAmount,
                    chargebackAmount: totalPageSummary.chargebackAmount,
                    couponAmount: totalPageSummary.couponAmount,
                    ddjbAmount: totalPageSummary.ddjbAmount,
                    elseAmount: totalPageSummary.elseAmount,
                    marginDepositAmount: totalPageSummary.marginDepositAmount,
                    noTicketAmount: totalPageSummary.noTicketAmount,
                    noTrialProductionSumAmount: totalPageSummary.noTrialProductionSumAmount,
                    recognitionIncomeAmount: totalPageSummary.recognitionIncomeAmount,
                    refundAmount: totalPageSummary.refundAmount,
                    saleAmount: totalPageSummary.saleAmount,
                    salesDiscountAmount: totalPageSummary.salesDiscountAmount,
                    technicalServiceAmount: totalPageSummary.technicalServiceAmount,
                    technicalServiceInvoiceAmount: totalPageSummary.technicalServiceInvoiceAmount,
                    ticketAmount: totalPageSummary.ticketAmount,
                    transactionIncomeAmount: totalPageSummary.transactionIncomeAmount,
                    trialProductionSumAmount: totalPageSummary.trialProductionSumAmount,
                    withdrawableAmount: totalPageSummary.withdrawableAmount,
                    withdrawalAmount: totalPageSummary.withdrawalAmount,
                })
                w2ui.reconciliations.refresh();
               
            } else {
                   $(document).ready(function(){
                       $('#main').w2render('reconciliations')
                        w2ui.reconciliations.clear(); //清空
                        w2ui['reconciliations'].records = []
                        w2ui.reconciliations.refresh();
                   })
                   
            }

        },
        initTableTwo(arr = []) {
            $(function () {
                $('#mainTwo').w2grid({
                    name: 'AAAreconciliations',
                    header: '收入表明细',
                    show: {
                        toolbar: true,
                        header: true,
                        // footer        : true,
                        // selectColumn: true,
                        // expandColumn: true
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'storeName',
                            caption: '店铺名称',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'refundedPremiumPayment',
                            caption: '保险退保-退保保费支付',
                            size: '100px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'sendBack',
                            caption: '菜鸟物流单-退回',
                            size: '100px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'ctPlatformServiceFeeDeduction',
                            caption: '村淘平台服务费扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'returnPoints',
                            caption: '代扣交易退回积分',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'jhsCommission',
                            caption: '代扣款（扣款用途：聚划算佣金）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tbkCommission',
                            caption: '代扣款（扣款用途：淘宝客佣金月度返还）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tqgFeesForTechnicalServices',
                            caption: '代扣款（扣款用途：淘抢购实时划扣技术服务费）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbStaging',
                            caption: '花呗分期交易号',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbTransactionNo',
                            caption: '花呗交易号',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tbCashRedCashWithdrawal',
                            caption: '企业红包-淘宝现金红包提现',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tbkPromotionCommission',
                            caption: '淘宝客推广佣金月度返还',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tbkCommissionRefund',
                            caption: '淘宝客佣金退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'depositOfUnfreeze',
                            caption: '天猫保证金-解冻',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'merchantMarginClaim',
                            caption: '天猫保证金-支付-商家保证金理赔',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'commissionCategory',
                            caption: '天猫佣金（类目）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'sellCount',
                            caption: '销售',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'totalCount',
                            caption: '总计',
                            size: '100px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
            });
            if (arr.length > 0) {
                $('#mainTwo').w2render('AAAreconciliations');
                w2ui.AAAreconciliations.clear(); //清空
                w2ui.AAAreconciliations.records = arr
                w2ui.AAAreconciliations.refresh();
                
            } else {
                $(document).ready(function(){
                $('#mainTwo').w2render('AAAreconciliations')
                w2ui.AAAreconciliations.clear(); //清空
                w2ui['AAAreconciliations'].records = []
                w2ui.AAAreconciliations.refresh();
                })
            }

        },
        initTableThree(arr = [], currentPageSummary, totalPageSummary) {
            $(function () {
                $('#mainThree').w2grid({
                    name: 'BBBreconciliations',
                    header: '支出表明细',
                    show: {
                        toolbar: true,
                        header: true,
                        // footer        : true,
                        // selectColumn: true,
                        // expandColumn: true
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'storeName',
                            caption: '店铺名称',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'priceGIPremiumCollection',
                            caption: '保险承保-价格保障保险-保费收取',
                            size: '100px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'jhsFreightInsurancePremium',
                            caption: '保险承保-聚划算运费险保费收取',
                            size: '100px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'mjbFreightInsurancePremium',
                            caption: '保险承保-卖家版运费险保费收取',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'fidelityInsurancePremiumCollection',
                            caption: '保险承保-天猫材质保真险保费收',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'marginRefund',
                            caption: '保证金退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'ctPlatformServiceFeeDeduction',
                            caption: '村淘平台服务费扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'rebatePoints',
                            caption: '代扣返点积分',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'firstSingleNewPlan',
                            caption: '代扣款（扣款用途：品牌新享-首单拉新计划）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'everydaySale',
                            caption: '代扣款（扣款用途：天天特卖）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'loveDecibelHearingAidForChildren',
                            caption: '公益宝贝捐赠=爱的分贝听障儿童救助=盛放旗舰店',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'earthSproutAction',
                            caption: '公益宝贝捐赠=大地新芽行动=盛放旗舰店',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'childAntiSexualInvasion',
                            caption: '公益宝贝捐赠=儿童防性侵=盛放旗舰店',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'refuelingMulanPoorWomenSSafeguardProject',
                            caption: '公益宝贝捐赠=加油木兰贫困女性保障项目=盛放旗舰店',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'protectingTheNationalHeroSOldAge',
                            caption: '公益宝贝捐赠=守护民族英雄的晚年=盛放旗舰店',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbMarginRefund',
                            caption: '花呗-保证金退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbfqAfterSaleRefund',
                            caption: '花呗分期-售后退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbAfterSaleRefund',
                            caption: '花呗-售后退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hbPaymentServiceFee',
                            caption: '花呗支付服务费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'collectingTreasure',
                            caption: '集分宝',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'jhsInsuranceDepositPayment',
                            caption: '聚划算保险保证金-支付',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'polyCostEffectiveServiceFee',
                            caption: '聚划算活动保证金-支付-聚划算参团服务费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'hqgDeductionOfServiceFee',
                            caption: '聚划算活动保证金-支付-淘抢购参团服务费扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'smartFlashDeduction',
                            caption: '聚划算活动保证金-支付-智慧快闪扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'polyCostingCommission',
                            caption: '聚划算佣金',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'afterSaleRefund',
                            caption: '售后退款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tbKCommissionDeduction',
                            caption: '淘宝客佣金代扣款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'tqgRealTimeDeductionOfTechnicalServiceFees',
                            caption: '淘抢购实时划扣技术服务费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'merchantMarginFreeze',
                            caption: '天猫保证金-商家保证金冻结',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'merchantMarginClaim',
                            caption: '天猫保证金-支付-商家保证金理赔',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'commissionCategory',
                            caption: '天猫佣金（类目）',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'creditCardPaymentServiceFee',
                            caption: '信用卡支付服务费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'amount',
                            caption: '合计',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'withdraw',
                            caption: '提现',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'totalCount',
                            caption: '总计',
                            size: '100px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                    }
                })
            });
            // this.initTableTwo()
            if (arr.length > 0) {
                w2ui.BBBreconciliations.clear(); //清空
                w2ui.BBBreconciliations.records = arr
                w2ui.BBBreconciliations.refresh();
                $('#mainThree').w2render('BBBreconciliations');
            } else {
                $(document).ready(function(){
                     w2ui.BBBreconciliations.clear();//清空
                     $('#mainThree').w2render('BBBreconciliations')
                     w2ui['BBBreconciliations'].records = []
                     w2ui.BBBreconciliations.refresh();
                })
                

            }
        },
        //云集
        initTableYunji(arr = [], currentPageSummary, totalPageSummary) {
            let self=this;
            $(function () {
                $('#mainYunji').w2grid({
                    name: 'yunji',
                    show: {
                            toolbar: true,
                            selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
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
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'period',
                            caption: '期间',
                            size: '100px'
                        },
                         {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '100px'
                        },
                        {
                            field: 'merchantReceivableAmount',
                            caption: '商家应收金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'merchantPayableAmount',
                            caption: '应结算商家金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'platformChargeForUseAmount',
                            caption: '平台使用费金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'technicalServiceAmount',
                            caption: '技术服务费金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'goodAmount',
                            caption: '货品金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'refundAmount',
                            caption: '退款金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'transactionIncomeAmount',
                            caption: '收入',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'platformDiscountAmount',
                            caption: '平台承担折扣',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'returnFreightSubsidyAmount',
                            caption: '退货运费补贴',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'merchantDiscountAmount',
                            caption: '商家优惠金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'costAmount',
                            caption: '费用金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'freightChargeAmount',
                            caption: '运费',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'recognitionIncomeAmount',
                            caption: '确认收入金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'billReceivableAmount',
                            caption: '账单应收金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'noTicketAmount',
                            caption: '无票费用',
                            size: '100px',
                            render:'money',
                        },
                         {
                            field: 'ticketAmount',
                            caption: '有票费用',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'noTrialProductionSumAmount',
                            caption: '不含试制费成本总额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'trialProductionSumAmount',
                            caption: '含试制费成本总额',
                            size: '100px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
                if (arr.length > 0) {
                $('#mainYunji').w2render('yunji');
                w2ui.yunji.clear(); //清空
                w2ui.yunji.records = arr
                w2ui.yunji.records.push({
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName:'<span>当页小计</span>',
                    merchantReceivableAmount:currentPageSummary.merchantReceivableAmount,
                    merchantPayableAmount:currentPageSummary.merchantPayableAmount,
                    platformChargeForUseAmount:currentPageSummary.platformChargeForUseAmount,
                    technicalServiceAmount:currentPageSummary.technicalServiceAmount,
                    goodAmount            :currentPageSummary.goodAmount,
                    refundAmount          :currentPageSummary.refundAmount,
                    transactionIncomeAmount:currentPageSummary.transactionIncomeAmount,
                    platformDiscountAmount:currentPageSummary.platformDiscountAmount,
                    returnFreightSubsidyAmount:currentPageSummary.returnFreightSubsidyAmount,
                    merchantDiscountAmount:currentPageSummary.merchantDiscountAmount,
                    costAmount            :currentPageSummary.costAmount,
                    freightChargeAmount   :currentPageSummary.freightChargeAmount,
                    recognitionIncomeAmount:currentPageSummary.recognitionIncomeAmount,
                    noTicketAmount:currentPageSummary.noTicketAmount,
                    ticketAmount:currentPageSummary.ticketAmount,
                    noTrialProductionSumAmount:currentPageSummary.noTrialProductionSumAmount,
                    trialProductionSumAmount:currentPageSummary.trialProductionSumAmount
                }, {
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName:'<span >合计</span>',
                    merchantReceivableAmount:totalPageSummary.merchantReceivableAmount,
                    merchantPayableAmount:totalPageSummary.merchantPayableAmount,
                    platformChargeForUseAmount:totalPageSummary.platformChargeForUseAmount,
                    technicalServiceAmount:totalPageSummary.technicalServiceAmount,
                    goodAmount            :totalPageSummary.goodAmount,
                    refundAmount          :totalPageSummary.refundAmount,
                    transactionIncomeAmount:totalPageSummary.transactionIncomeAmount,
                    platformDiscountAmount:totalPageSummary.platformDiscountAmount,
                    returnFreightSubsidyAmount:totalPageSummary.returnFreightSubsidyAmount,
                    merchantDiscountAmount:totalPageSummary.merchantDiscountAmount,
                    costAmount            :totalPageSummary.costAmount,
                    freightChargeAmount   :totalPageSummary.freightChargeAmount,
                    recognitionIncomeAmount:totalPageSummary.recognitionIncomeAmount,
                    noTicketAmount:totalPageSummary.noTicketAmount,
                    ticketAmount:totalPageSummary.ticketAmount,
                    noTrialProductionSumAmount:totalPageSummary.noTrialProductionSumAmount,
                    trialProductionSumAmount:totalPageSummary.trialProductionSumAmount
                })
                w2ui.yunji.refresh();
              
            } else {
                $('#mainYunji').w2render('yunji')
                 w2ui.yunji.clear(); //清
                 w2ui.yunji.refresh();
               
            }
            });
            
        },
        //唯品会JIT/JITX
        initTablevipJIX(arr = [], currentPageSummary, totalPageSummary) {
            let self=this;
            $(function () {
                $('#vipJIT').w2grid({
                    name: 'JIT',
                    show: {
                            toolbar: true,
                            selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'platformPattern',
                            caption: '平台模式',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'billPattern',
                            caption: '账单模式',
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
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '期间',
                            size: '100px'
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '100px'
                        },
                        {
                            field: 'salesInfoAmount',
                            caption: '销售明细',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'clientRefundInfoAmount',
                            caption: '客退明细',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'activityDiscountInfoAmount',
                            caption: '活动折扣明细',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'otherInfoAmount',
                            caption: '其他明细',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'distanceInfoAmount',
                            caption: '差异明细',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'adjustAmount',
                            caption: '调整金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'penaltyAmount',
                            caption: '罚款',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'settlementAmount',
                            caption: '结算金额',
                            size: '100px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
                if (arr.length > 0) {
                $('#vipJIT').w2render('JIT');
                w2ui.JIT.clear(); //清空
                w2ui.JIT.records = arr
                w2ui.JIT.refresh();
              
            } else {
                    $('#vipJIT').w2render('JIT')
                    w2ui.JIT.clear(); //清
                    w2ui.JIT.refresh();
               
            }
            });
            
        },
         //唯品会OXO
        initTablevipOXO(arr = [], currentPageSummary, totalPageSummary) {
            let self=this;
            $(function () {
                $('#vipOXO').w2grid({
                    name: 'OXO',
                    show: {
                            toolbar: true,
                            selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'platformPattern',
                            caption: '平台模式',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'billPattern',
                            caption: '账单模式',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '期间',
                              size: '150px',
                            resizable: true
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'merchantReceivableAmount',
                            caption: '商家应收金额',
                            size: '150px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'preferentialInfoAmount',
                            caption: '唯品会优惠明细',
                            size: '150px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'chargesAmount',
                            caption: '唯品会佣金',
                            size: '150px',
                            render:'money',
                            resizable: true
                        },
                        {
                            field: 'settlementAmount',
                            caption: '结算金额',
                            size: '150px',
                            render:'money',
                            resizable: true
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
                if (arr.length > 0) {
                $('#vipOXO').w2render('OXO');
                w2ui.OXO.clear(); //清空
                w2ui.OXO.records = arr
                // w2ui.OXO.records.push({
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName:'<span>当页小计</span>',
                //     merchantReceivableAmount:currentPageSummary.merchantReceivableAmount,
                //     merchantPayableAmount:currentPageSummary.merchantPayableAmount,
                // }, {
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName:'<span >合计</span>',
                //     merchantReceivableAmount:totalPageSummary.merchantReceivableAmount,
                //     merchantPayableAmount:totalPageSummary.merchantPayableAmount,
                // })
                    w2ui.OXO.refresh();
              
            } else {
                    $('#vipOXO').w2render('OXO')
                    w2ui.OXO.clear(); //清
                    w2ui.OXO.refresh();
               
            }
            });
            
        },
         //唯品会MP
        initTablevipMP(arr = [], currentPageSummary, totalPageSummary) {
            let self=this;
            $(function () {
                $('#vipMP').w2grid({
                    name: 'MP',
                    show: {
                            toolbar: true,
                            selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'platformPattern',
                            caption: '平台模式',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'billPattern',
                            caption: '账单模式',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '150px',
                            resizable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '期间',
                            size: '150px'
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '150px'
                        },
                        {
                            field: 'merchantSalesAmount',
                            caption: '商家销售额',
                            size: '150px',
                            render:'money',
                        },
                        {
                            field: 'preferentialAmount',
                            caption: '商家优惠',
                            size: '150px',
                            render:'money',
                        },
                        {
                            field: 'chargesAmount',
                            caption: '唯品会佣金',
                            size: '150px',
                            render:'money',
                        },
                        {
                            field: 'settlementAmount',
                            caption: '结算金额',
                            size: '150px',
                            render:'money',
                        },
                    ],
                    onClick: function (event, obj) {
                        // this.showLog(obj.recid)
                        console.log(event, obj.recid)
                        let zhanzhan = obj.recid
                        console.log(zhanzhan, '-0909-09-09-09-09-09-09')
                        //  this.changeClick(obj.recid)
                    }
                })
                if (arr.length > 0) {
                $('#vipMP').w2render('MP');
                w2ui.MP.clear(); //清空
                w2ui.MP.records = arr
                // w2ui.MP.records.push({
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName:'<span>当页小计</span>',
                //     merchantReceivableAmount:currentPageSummary.merchantReceivableAmount,
                //     merchantPayableAmount:currentPageSummary.merchantPayableAmount,
                // }, {
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName:'<span >合计</span>',
                //     merchantReceivableAmount:totalPageSummary.merchantReceivableAmount,
                //     merchantPayableAmount:totalPageSummary.merchantPayableAmount,
                // })
                    w2ui.MP.refresh();
              
            } else {
                    $('#vipMP').w2render('MP')
                    w2ui.MP.clear(); //清
                    w2ui.MP.refresh();
               
            }
            });
            
        },
        //导出
        onImport() {
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformId = this.basicPlatformId //平台ID
            data.basicPlatformName = this.formSearch.code //平台名称
            data.basicCompanyId = this.formSearch.name //公司ID
            data.basicStoreId = this.formSearch.person //店铺ID
            data.period = this.formSearch.time //期间名称
            data.platformPattern=this.formSearch.vip
            data.billNo         =this.formSearch.yunjibillNo
            if(this.formSearch.billNo){
               data.accRecvdBillNos=this.formSearch.billNo.split(',')
            }else{
               delete data.accRecvdBillNos   
            }
            this.request('reconciliation_export', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        //循环key
        getKey(key) {
            const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                // message: res.data.subTitle,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle :"下载链接"),
                                ]),
                                // showClose: false,
                                duration: 0,
                            })
                            this.cleanKey(key)

                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                            // clearTimeOut(this.timeAA);
                            // this.cleanTime()

                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            console.log(url)
        if(url.indexOf('[') == -1){
          console.log('没有地址')
        }else{
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

        changeCode(code) {
             this.formSearch.vip='';
             this.formSearch.billNo='';
             let AAAA = ''
            this.platformOptions.map(function (item) {
                if (code == item.name) {
                    AAAA = item.id
                }
            })
            this.basicPlatformId = AAAA
            this.formSearch.person = ''
            this.changebasicPlatformId(AAAA)
            if (code == '拼多多') {
                this.initTable()
            } else if (code == '淘宝') {
                console.log('e678900')
                this.initTableThree()
                this.initTableTwo()
                console.log('e678900')
            }else if(code=='云集'){
                this.initTableYunji([])
            }
            
        },
        //唯品会平台模式切换监听
        watchChange(type){
              this.currentPage=1;
              this.pagesize=1000;
              this.total=0
              if(type=="JIT/JITX"){
                    this.initTablevipJIX()
              }else if(type=="OXO"){
                    this.initTablevipOXO()
              }else if(type=="MP"){
                    this.initTablevipMP()
              }
        },
        changeName(code) {
            let data = {}
            data.basicCompanyId = code
            data.type = 0
            this.request('accountPeriod_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.timeList = res.data
                }
            })
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, false).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                }
            })
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, false).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        changebasicPlatformId(id){
          console.log(id,'3456789')
          let data = {}
          data.platformId = id
          this.request('getBindingByPlatformId', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.shopList=res.data
                            }
                        }) 
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        //获取唯品会数据
        getVipData(){
        let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformId = this.basicPlatformId //平台ID
            data.basicPlatformName = this.formSearch.code //平台名称
            this.formSearch.name ? data.basicCompanyId = this.formSearch.name : delete data.basicCompanyId //公司ID
            data.basicStoreId = this.formSearch.person //店铺ID
            data.period = this.formSearch.time //期间名称
            data.platformPattern=this.formSearch.vip
           
            if(this.formSearch.billNo){
               data.accRecvdBillNos=this.formSearch.billNo.split(',')
            }else{
               delete data.accRecvdBillNos  
            }
            if(!data.platformPattern) return this.$message.error('平台模式不能为空')
            this.request('acc_reconciliation_getVipPage', data, true).then(res => {
                if (res.code == 1) {
                           this.total = res.data.count;
                    // this.tableData = res.data.data;
                        if(this.formSearch.code=='唯品会'){
                            if(this.formSearch.vip=='JIT/JITX'){
                                   if (res.data.jitList) {
                                    for (let i = 0, len = res.data.jitList.length; i < len; i++) {
                                        res.data.jitList[i].recid = res.data.jitList[i].id
                                    }
                                        this.initTablevipJIX(res.data.jitList)
                                  }else{
                                        this.initTablevipJIX()
                                  }   
                           }else if(this.formSearch.vip=='OXO'){
                                   if (res.data.oxoList) {
                                    for (let i = 0, len = res.data.oxoList.length; i < len; i++) {
                                        res.data.oxoList[i].recid = res.data.oxoList[i].id
                                    }
                                        this.initTablevipOXO(res.data.oxoList)
                                  }else{
                                        this.initTablevipOXO() 
                                  }     
                           }else if(this.formSearch.vip=='MP'){
                                   if (res.data.mpList) {
                                    for (let i = 0, len = res.data.mpList.length; i < len; i++) {
                                        res.data.mpList[i].recid = res.data.mpList[i].id
                                    }
                                        this.initTablevipMP(res.data.mpList)
                                  }else{
                                        this.initTablevipMP()
                                  }    
                           }
                    }
                } else {
                            this.$message.error(res.msg)
                }
            })
        },
        getData() {
            this.totalList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformId = this.basicPlatformId //平台ID
            data.basicPlatformName = this.formSearch.code //平台名称
            this.formSearch.name ? data.basicCompanyId = this.formSearch.name : delete data.basicCompanyId //公司ID
            data.basicStoreId = this.formSearch.person //店铺ID
            data.period = this.formSearch.time //期间名称
            data.billNo = this.formSearch.yunjibillNo//账单ID
            this.request('reconciliation_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.data;
                    if (res.data.data) {
                        for (let i = 0, len = res.data.data.length; i < len; i++) {
                            res.data.data[i].recid = res.data.data[i].id
                        }
                        if(this.formSearch.code == '云集'){
                                this.initTableYunji(res.data.data, res.data.currentPageSummary, res.data.totalPageSummary)
                        }else if(this.formSearch.code == '拼多多'){
                                this.initTable(res.data.data, res.data.currentPageSummary, res.data.totalPageSummary)
                        }
                    }else if(res.data.expensesList || res.data.revenueList){
                        for (let i = 0, len = res.data.expensesList.length; i < len; i++) {
                            res.data.expensesList[i].recid = res.data.expensesList[i].id
                        }
                        for (let i = 0, len = res.data.revenueList.length; i < len; i++) {
                            res.data.revenueList[i].recid = res.data.revenueList[i].id
                        }if(this.formSearch.code == '淘宝'){
                            this.initTableTwo(res.data.revenueList)
                                this.initTableThree(res.data.expensesList)
                        }
                    } else {
                        this.initTable([])
                        this.initTableTwo([])
                        this.initTableThree([])
                        this.initTableYunji([])
                    }
                    //push 合计
                    // this.totalList.push(res.data.currentPageSummary)
                    // this.totalList.push(res.data.totalPageSummary)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        onSearch() {
            this.currentPage = 1
            if(this.formSearch.code=='唯品会'){
              this.getVipData()
            }else{
              this.getData()
            }
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
            if(this.formSearch.code=='唯品会'){
              this.getVipData()
            }else{
              this.getData()
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val
             if(this.formSearch.code=='唯品会'){
               this.getVipData()
            }else{
               this.getData()
            }
        },
        onReset() {
            this.formSearch.code=''
            this.formSearch.name=''
            this.formSearch.person=''
            this.formSearch.time=''
            this.formSearch.vip=''
            this.formSearch.billNo=''
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

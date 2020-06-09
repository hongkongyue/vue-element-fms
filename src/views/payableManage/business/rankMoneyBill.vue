<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                <!-- v-if="judgeMenu.indexOf('查询') !== -1" -->
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                    <!-- v-if="judgeMenu.indexOf('编辑') !== -1" -->
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="modify">编辑</el-button>
                </el-form-item>
                 <!-- v-if="judgeMenu.indexOf('审核') !== -1" -->
                <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <!-- v-if="judgeMenu.indexOf('取消审核') !== -1" -->
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                </el-form-item>
                <!-- v-if="judgeMenu.indexOf('删除') !== -1" -->
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="onDel">删除</el-button>
                </el-form-item>
                <!-- v-if="judgeMenu.indexOf('关闭') !== -1" -->
                 <el-form-item size="small" class="marginT0">
                     <el-button  size="small" type="primary" @click="onClose">关闭</el-button>
                </el-form-item>
                <!-- v-if="judgeMenu.indexOf('导出') !== -1" -->
                 <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </Col>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supplierId" filterable placeholder="请选择" style="width:230px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
          
            <el-form-item label=" 公 司 ：" size="small" >
                <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据编号：" size="small" v-if="show == true">
                <el-input v-model="formSearch.bizNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item  label="单据日期：" size="small">
                <el-date-picker v-model="formSearch.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="单据状态：" size="small" v-show="show == true">
                <el-select v-model="formSearch.status" filterable clearable placeholder="请选择" style="width:155px">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关闭状态：" size="small" v-show="show == true">
                <el-select v-model="formSearch.closeStatus" filterable clearable placeholder="请选择" style="width:150px">
                    <el-option label="已关闭" value="1"></el-option>
                    <el-option label="未关闭" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款状态：" size="small" v-show="show == true">
                <el-select v-model="formSearch.paidStatus" filterable clearable placeholder="请选择" style="width:155px">
                    <el-option label="未付款" value="0"></el-option>
                    <el-option label="已付款" value="1"></el-option>
                    <el-option label="部分付款" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small" label-width="100px">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
           
            <!-- <el-form-item label="单据日期：" size="small" v-if="show == true">
                <el-date-picker style="width:370px" v-model="formSearch.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
        
             
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 350px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="排款详情" name="first">
                <section class="middle">
                    <el-table :data="geNewData" border style="width: 100%" max-height="200">
                        <el-table-column type="index" label="序号" align="center" width="50">
                        </el-table-column>
                        <!-- <el-table-column prop="name" align="center" label="公司" min-width="120">
                        </el-table-column>
                        <el-table-column prop="amount1" align="center" label="供应商" min-width="120">
                        </el-table-column> -->
                        <el-table-column prop="basicSupplierName" align="center" min-width="120" label="供应商" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="payableTotalAmount" align="center" min-width="120" label="本期发票余额" show-overflow-tooltip>
                              <template slot-scope="scope">{{scope.row.payableTotalAmount|moneyFilters}}</template>
                        </el-table-column>
                        <el-table-column prop="statementAmount" align="center" min-width="120" label="本期已对账货款余额" show-overflow-tooltip>
                              <template slot-scope="scope">{{scope.row.statementAmount|moneyFilters}}</template>
                        </el-table-column>
                        <el-table-column prop="adviseDischargeAmount" align="center" min-width="120" label="建议排款金额" show-overflow-tooltip>
                             <template slot-scope="scope">{{scope.row.adviseDischargeAmount|moneyFilters}}</template>
                        </el-table-column>
                        <el-table-column prop="dischargeAmount" align="center" min-width="120" label="本次排款金额" show-overflow-tooltip>
                               <template slot-scope="scope">{{scope.row.dischargeAmount|moneyFilters}}</template>
                        </el-table-column>
                        <el-table-column prop="paidAmount" align="center" min-width="120" label="付款金额" show-overflow-tooltip>
                              <template slot-scope="scope">{{scope.row.paidAmount|moneyFilters}}</template>
                        </el-table-column>
                        </el-table-column>
                        <el-table-column prop="unpaidAmount" align="center" min-width="120" label="本次已排未付金额" show-overflow-tooltip>
                              <template slot-scope="scope">{{scope.row.unpaidAmount|moneyFilters}}</template>
                        </el-table-column>
                        <el-table-column prop="paidStatus" align="center" min-width="120" label="付款状态" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="closeStatus" align="center" min-width="120" label="关闭状态" show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column prop="remark" align="center" min-width="120" label="备注" show-overflow-tooltip>
                        </el-table-column>
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
                            <el-option label="导出特定格式" value="3"></el-option>
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
            payableUserList:[],
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
                        basicCompanyId:'',
                        date:'',
                        status:'',
                        closeStatus:'',
                        supplierId:'',
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
    }),
    created() {
      this.getPayableUser()
    },
    destroyed() {
        this.resetCommit()
        this.activeName="first"
    },
    mounted() {
        // this.formSearch.year = new Date()
        this.getCompany()
        this.getSupply()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.supplierId = ''
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
        modify(){
                  const{code}=this.$route.query
                  let arr = w2ui.rankMoneyBil.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    this.$router.push({
                        name:'rankMoneyBillDetail',
                        query:{
                            id  :arr[0],
                            code:code
                        }
                    })
                }
        },
        handleClick(tab, event) {
            if (tab.name == 'second') {
                 //货品明细接口
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
                $('#main').w2grid({
                    name: 'rankMoneyBil',
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
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '单据日期',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'bizNo',
                            caption: '排款单号',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'payableTotalAmount',
                            caption: '本期发票余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'statementAmount',
                            caption: '本期已对账货款余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        //  {
                        //     field: 'payableTotalAmount',
                        //     caption: '应付发票余额',
                        //     size: '150px',
                        //     render: 'money',
                        //     sortable: true
                        // },
                        {
                            field: 'adviseDischargeAmount',
                            caption: '建议排款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'dischargeAmount',
                            caption: '本次排款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'paidAmount',
                            caption: '付款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        // {
                        //     field: 'deductionAmount',
                        //     caption: '扣款金额',
                        //     size: '100px',
                        //     sortable: true
                        // },
                        {
                            field: 'poUnderInvoiceAmount',
                            caption: '已排未付金额',
                            size: '150px',
                            render: 'money',
                        },
                        {
                            field: 'paidStatus',
                            caption: '付款状态',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'closeStatus',
                            caption: '关闭状态',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '150px',
                            sortable: true
                        },

                    ],
                    onClick: function (event) {
                        record = this.get(event.recid);
                        console.log(this.get(event.recid))
                        setTimeout(function(){
                            if(w2ui.rankMoneyBil.getSelection().length == 1){
                                let arr = w2ui.rankMoneyBil.getSelection()
                                if(arr[0]!= record.id){
                                    
                                }else{
                                    self.getGoodsList(event.recid)
                                    self.activeName = 'first'
                                    self.$store.commit('getdeductionId', event.recid)
                                    self.logPage = 1
                                }
                            }else{
                                   self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.rankMoneyBil.clear(); //清空
                w2ui.rankMoneyBil.records = arr
                w2ui.rankMoneyBil.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    payableTotalAmount: current.payableTotalAmount,
                    adviseDischargeAmount: current.adviseDischargeAmount,
                    dischargeAmount: current.dischargeAmount,
                    statementAmount: current.statementAmount,
                    paidAmount: current.paidAmount,
                    poUnderInvoiceAmount: current.poUnderInvoiceAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    payableTotalAmount: total.payableTotalAmount,
                    adviseDischargeAmount: total.adviseDischargeAmount,
                    dischargeAmount: total.dischargeAmount,
                    statementAmount: total.statementAmount,
                    paidAmount: total.paidAmount,
                    poUnderInvoiceAmount: total.poUnderInvoiceAmount,
                })
                $('#main').w2render('rankMoneyBil');
                w2ui.rankMoneyBil.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.rankMoneyBil.clear(); //清空
                    w2ui['rankMoneyBil'].records = []
                    w2ui.rankMoneyBil.refresh();
                    $('#main').w2render('rankMoneyBil')
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
            this.formSearch = {
                year:new Date(),
                supplierId:'',
            }
            this.getSupply()
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
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicSupplierId = this.formSearch.supplierId
                data.payableUserId = this.formSearch.payableUser//所属人员
                data.basicCompanyId = this.formSearch.basicCompanyId
                this.formSearch.paidStatus ? data.paidStatus=Number(this.formSearch.paidStatus):delete data.paidStatus
                data.status =this.formSearch.status!=''?Number(this.formSearch.status):''
                data.bizNo = this.formSearch.bizNo
                data.closeStatus=this.formSearch.closeStatus!=''?Number(this.formSearch.closeStatus):''
                this.formSearch.date ? data.bizStartDate = this.formSearch.date[0] : delete data.bizStartDate
                this.formSearch.date ? data.bizEndDate = this.formSearch.date[1]   : delete data.bizEndDate
            this.request('acc_acc_payable_discharge_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count
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
            this.activeName="first"
            this.$forceUpdate()
            let data = {}
                data.dischargeId = id
            this.request('acc_acc_payable_discharge_detail', data, false).then((res) => {
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
            data.billNo = 'acc_payable_discharge_' + this.deductionId
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
            let arr = w2ui.rankMoneyBil.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //继续审核
        continueExamine() {
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            data.continueAudit = 1;
            data.remark = '审核'
            this.request('payable_reconciliationOrder_command', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success('审核成功')
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },
         //关闭
        onClose() {
            let arr = w2ui.rankMoneyBil.getSelection()
            let data = {};
                data.ids = arr
            if (this.checkSelection()) {
                     this.$confirm('确定要关闭选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            this.request('acc_acc_payable_discharge_close', data, true).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('关闭成功')
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消关闭'
                            });
                        })
                // this.request('acc_acc_payable_discharge_close', data, false).then((res) => {
                //        if (res.code == 1) {
                //             this.$message.success('关闭成功')
                //             this.getData()
                //         } else {
                //             this.$message.error(res.msg)
                //         }
            } else {
                this.$message.error('请勾选关闭数据')
            }

        },
        onExamineNext(){
                  let arr = w2ui.rankMoneyBil.getSelection()
                     let data={}
                         data.ids=arr
                   this.request('acc_acc_payable_discharge_checkCanAudit', data, true).then((res) => {
                    if (res.code == 1) {
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
                                                    this.request('acc_acc_payable_discharge_audit', data, false).then((res) => {
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
                        //    this.request('acc_acc_payable_discharge_audit', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success('审核成功')
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //      })

                    } else if(res.code==-1) {
                           const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, res.msg),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                            this.request('acc_acc_payable_discharge_audit', data, false).then((res) => {
                                                if (res.code == 1) {
                                                    this.$message.success('审核成功')
                                                    this.getData()
                                                     done();
                                                } else {
                                                    this.$message.error(res.msg)
                                                     done();
                                                }
                                            })
                                        } else {
                                                    done();
                                                   this.$message({
                                                                type: 'info',
                                                                message: '已取消审核'
                                                        });
                                        }
                                      }
                                    })
                    }else{
                                  this.$message.error(res.msg)  
                    }
                })
        },
        //审核
        onExamine() {
            let arr = w2ui.rankMoneyBil.getSelection()
            let data = {};
                data.ids = arr
            if (this.checkSelection()) {
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
                                                this.onExamineNext()
                                                done(); 
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                            })
                
            } else {
                    this.$message.error('请勾选审核数据')
            }

        },
        // 取消审核
        onExamineCancel() {
            let arr = w2ui.rankMoneyBil.getSelection()
            let data = {}
                data.ids = arr
            if (this.checkSelection()) {
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
                                                    this.request('acc_acc_payable_discharge_cancelAudit', data, false).then((res) => {
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
                // this.request('acc_acc_payable_discharge_cancelAudit', data, false).then((res) => {
                //        if (res.code == 1) {
                //             this.$message.success('取消审核成功')
                //             this.getData()
                //         } else {
                //             this.$message.error(res.msg)
                //         }
                // })
            } else {
                this.$message.error('请勾选取消审核数据')
            }

        },
        //删除
        onDel() {
            let arr = w2ui.rankMoneyBil.getSelection()
            let data = {};
               data.ids = arr
            if (this.checkSelection()) {
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
                                                    this.request('acc_acc_payable_discharge_delete', data, false).then((res) => {
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
                // this.request('acc_acc_payable_discharge_delete', data, false).then((res) => {
                //     if (res.code == 1) {
                //           this.$message.success('删除成功')
                //           this.getData();
                //     } else {
                //         this.$message.error(res.msg)
                //     }
                // })
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
                        data.basicSupplierId = this.formSearch.supplierId
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.basicCompanyId = this.formSearch.basicCompanyId
                        this.formSearch.paidStatus ? data.paidStatus=Number(this.formSearch.paidStatus):delete data.paidStatus
                        data.status =this.formSearch.status!=''?Number(this.formSearch.status):''
                        data.bizNo = this.formSearch.bizNo
                        data.closeStatus=this.formSearch.closeStatus!=''?Number(this.formSearch.closeStatus):''
                        this.formSearch.date ? data.bizStartDate = this.formSearch.date[0] : delete data.bizStartDate
                        this.formSearch.date ? data.bizEndDate = this.formSearch.date[1]   : delete data.bizEndDate
                        w2ui.rankMoneyBil.getSelection().length>0?data.ids= w2ui.rankMoneyBil.getSelection():delete data.ids
                        this.exportObj.selected==2? data.containDetail=true:data.containDetail=false;
                        this.exportObj.selected==3? data.specialType=true:data.specialType=false;
           this.request('acc_acc_payable_discharge_exportTotal',data,false).then(res=>{
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
                        data.basicSupplierId = this.formSearch.supplierId
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.basicCompanyId = this.formSearch.basicCompanyId
                        this.formSearch.paidStatus ? data.paidStatus=Number(this.formSearch.paidStatus):delete data.paidStatus
                        data.status =this.formSearch.status!=''?Number(this.formSearch.status):''
                        data.bizNo = this.formSearch.bizNo
                        data.closeStatus=this.formSearch.closeStatus!=''?Number(this.formSearch.closeStatus):''
                        this.formSearch.date ? data.bizStartDate = this.formSearch.date[0] : delete data.bizStartDate
                        this.formSearch.date ? data.bizEndDate = this.formSearch.date[1]   : delete data.bizEndDate
                        w2ui.rankMoneyBil.getSelection().length>0?data.ids= w2ui.rankMoneyBil.getSelection():delete data.ids
                        this.exportObj.selected==2? data.containDetail=true:data.containDetail=false;
                        this.exportObj.selected==3? data.specialType=true:data.specialType=false;
                      this.request('acc_acc_payable_discharge_export', data, false).then(res => {
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

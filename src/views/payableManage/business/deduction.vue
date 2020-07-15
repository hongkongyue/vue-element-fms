<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="modify">编辑</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('取消审核') !== -1" size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
                </el-form-item>
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </Col>
            <!-- <el-divider></el-divider> -->
            <el-form-item label="年份：" size="small">
                <el-date-picker style="width:100px" v-model="formSearch.year" type="year" placeholder="请选择"> </el-date-picker>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="制单号：" size="small">
                <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supplierId" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="扣款类型：" size="small" v-if="show == true">
                <el-select v-model="formSearch.deductionType" filterable placeholder="请选择" style="width:150px">
                    <el-option label="大货延期" value="大货延期"></el-option>
                    <el-option label="拍照样延期" value="拍照样延期"></el-option>
                    <el-option label="取消订单" value="取消订单"></el-option>
                    <el-option label="质量问题" value="质量问题"></el-option>
                    <el-option label="其他问题" value="其他问题"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算制单号：" size="small" v-if="show == true">
                <el-input v-model="formSearch.targetPurchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="单据状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:100px">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 公 司 ：" size="small" v-if="show == true">
                <el-select v-model="formSearch.companyId" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="单据日期：" size="small" v-if="show == true">
                <el-date-picker style="width:370px" v-model="formSearch.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item v-if="show == true" label="单据日期：" size="small">
                <el-date-picker v-model="formSearch.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="扣款状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.dtStatus" filterable placeholder="请选择" style="width:100px">
                    <el-option label="已扣款" value="1"></el-option>
                    <el-option label="未扣款" value="0"></el-option>
                </el-select>
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
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 350px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <section class="middle">
                    <el-table :data="geNewData" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="50">
                        </el-table-column>
                        <!-- <el-table-column prop="name" align="center" label="公司" min-width="120">
                        </el-table-column>
                        <el-table-column prop="amount1" align="center" label="供应商" min-width="120">
                        </el-table-column> -->
                        <el-table-column prop="purchaseOrderNo" align="center" min-width="120" label="制单号">
                        </el-table-column>
                        <el-table-column prop="goodsNo" align="center" min-width="120" label="大货款号">
                        </el-table-column>
                        <el-table-column prop="batchNo" align="center" min-width="120" label="批次">
                        </el-table-column>
                        <el-table-column prop="deductionType" align="center" min-width="120" label="扣款类型">
                        </el-table-column>
                        <el-table-column prop="delayDays" align="center" min-width="120" label="延期天数">
                        </el-table-column>
                        <el-table-column prop="contractDate" align="center" min-width="120" label="合约货期">
                        </el-table-column>
                        <el-table-column prop="afterClippingOrderQty" align="center" min-width="120" label="裁剪后订单量">
                        </el-table-column>
                         <el-table-column prop="deductionAmount" align="center" min-width="120" label="扣款金额">
                              <template slot-scope="scope"><div style="text-align:right">{{scope.row.deductionAmount|moneyFilters}}</div></template>
                        </el-table-column>
                        <el-table-column prop="orderQty"     label="订单数量" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="adjustAmount" align="center" min-width="120" label="调整金额">
                             <template slot-scope="scope"><div style="text-align:right">{{scope.row.adjustAmount|moneyFilters}}</div></template>
                        </el-table-column>
                        <el-table-column prop="discountStr" align="center" min-width="120" label="折扣">
                        </el-table-column>
                        <el-table-column prop="remark" align="center" min-width="120" label="备注">
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
                    <el-input v-model="adjustObj.kkje" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="品牌：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.brand" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="结算制单号：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.codeNo" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.remark" style="width:200px"></el-input>
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
import {burypoint} from 'mixins/burypoint'
import {
    mapState
} from 'vuex'
export default {
    mixins:[burypoint],
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
                remark:'',

            }, // 扣款调整数据对象
            adjustList: [], //  调整扣款的列表 
            logList: [], // 日
            formSearch: {
                year:new Date(),
                supplierId:'',
            },
            companyList: [], // 公司列表
            supplyList: [], //供应商列表
            addBillObj: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
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
        this.getCompany()
        this.getSupply()
    },
    destroyed() {
        this.resetCommit()
    },
    mounted() {
        // this.formSearch.year = new Date()
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
        getRowData(id){
                 for(let i=0,len=this.list.length;i<len;i++){
                      if(this.list[i].id==id){
                          return this.list[i]
                      }
                 }
        },
        modify(){
            this.setBuryPoint('编辑')
                  let arr = w2ui.deduction.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    console.log(record,'56789')
                    this.adjustVisible=true
                    this.adjustObj.id=this.getRowData(arr[0]).id
                    this.adjustObj.gys =this.getRowData(arr[0]).supplierName //供应商
                    this.adjustObj.company = this.getRowData(arr[0]).companyName //公司
                    this.adjustObj.goodsNo = this.getRowData(arr[0]).goodsNo //大货款号
                    this.adjustObj.kklx = this.getRowData(arr[0]).deductionType//扣款类型
                    this.adjustObj.kkje =this.getRowData(arr[0]).finalDeductionAmount//扣款金额
                    this.adjustObj.brand = this.getRowData(arr[0]).brandName //品牌
                    this.adjustObj.codeNo =this.getRowData(arr[0]).targetPurchaseOrderNo//结算制单号
                    this.adjustObj.remark = this.getRowData(arr[0]).remark//备注
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
                    name: 'deduction',
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
                            field: 'statusStr',
                            caption: '单据状态',
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
                            field: 'bizCode',
                            caption: '单据编号',
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
                            field: 'companyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'brandName',
                            caption: '品牌',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'targetPurchaseOrderNo',
                            caption: '结算制单号',
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
                            field: 'deductionAmount',
                            caption: '扣款金额',
                            size: '100px',
                            sortable: true,
                            render:'money'
                        },
                        {
                            field: 'deductionType',
                            caption: '扣款类型',
                            size: '100px'
                        },
                        {
                            field: 'reconciliationOrderCode',
                            caption: '账单编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'deductionStatusStr',
                            caption: '扣款状态',
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
                        record = this.get(event.recid);
                        console.log(this.get(event.recid))
                        
                        self.activeName = 'first'
                        setTimeout(function(){
                            if(w2ui.deduction.getSelection().length == 1){
                                let arr = w2ui.deduction.getSelection()
                                if(arr[0] != record.id){
                                       // console.log('--------------')
                                }else{
                                    self.getGoodsList(event.recid)
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
                w2ui.deduction.clear(); //清空
                w2ui.deduction.records = arr
                w2ui.deduction.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    deductionAmount: current.deductionAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    deductionAmount: total.deductionAmount,
                })
                $('#main').w2render('deduction');
                w2ui.deduction.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.deduction.clear(); //清空
                    w2ui['deduction'].records = []
                    w2ui.deduction.refresh();
                    $('#main').w2render('deduction')
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
            this.loading = true;
            this.logList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.year = filters.get_unix_only(this.formSearch.year)
            data.companyId = this.formSearch.companyId
            data.supplierId = this.formSearch.supplierId
            data.purchaseOrderNo = this.formSearch.purchaseOrderNo
            data.status = Number(this.formSearch.status)
            data.deductionType = this.formSearch.deductionType
            data.payableUserId = this.formSearch.payableUser//所属人员
            this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
            this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
            data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
            data.goodsNo = this.formSearch.goodsNo
            data.deductionStatus = this.formSearch.dtStatus
            this.request('payable_deductionOrder_page', data, true).then(res => {
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
            let data = {}
            data.id = id
            this.request('payable_deductionOrder_detail', data, false).then((res) => {
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
            data.billNo = 'payable_deduction_order_' + this.deductionId
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
            this.setBuryPoint('查询')
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
            let arr = w2ui.deduction.getSelection()
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
        //审核
        onExamine() {
            this.setBuryPoint('审核')
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_deductionOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '审核 备注:' +(value?value:'无')
                            this.request('payable_deductionOrder_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('审核成功')
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
                        if (res.code == 'FMS_704') {
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
                        } else {
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
            this.setBuryPoint('取消审核')
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'unAudit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_deductionOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '取消审核 备注:'+(value?value:'无')
                            this.request('payable_deductionOrder_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('取消审核成功')
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
        //删除
        onDel() {
            this.setBuryPoint('删除')
            let arr = w2ui.deduction.getSelection()
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
            this.setBuryPoint('编辑确认')
            let data = {}
            data.targetPurchaseOrderNo = this.adjustObj.codeNo//结算制单号
            data.finalDeductionAmount = this.adjustObj.kkje //扣款金额
            data.remark = this.adjustObj.remark //备注
            data.id = this.adjustObj.id
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
            this.setBuryPoint('编辑取消')
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
            this.setBuryPoint('导出')
                 if(this.checkSelection()){
                    // this.onImport()
                     this.exportVisible=true
                 }else{
                     this.exportVisible=true
                 }
        },
        cancelExport(){
            this.setBuryPoint('导出取消')
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        getExportTotal(){
            this.setBuryPoint('导出确认')
           if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
           let data={}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.year = filters.get_unix_only(this.formSearch.year)
                        data.companyId = this.formSearch.companyId
                        data.supplierId = this.formSearch.supplierId
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.status = Number(this.formSearch.status)
                        data.deductionType = this.formSearch.deductionType
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
                        this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
                        data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
                        data.goodsNo = this.formSearch.goodsNo
                        data.deductionStatus = this.formSearch.dtStatus
                        w2ui.deduction.getSelection().length>0?data.ids= w2ui.deduction.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
           this.request('payable_deductionOrder_count',data,false).then(res=>{
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
                        data.year = filters.get_unix_only(this.formSearch.year)
                        data.companyId = this.formSearch.companyId
                        data.supplierId = this.formSearch.supplierId
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.status = Number(this.formSearch.status)
                        data.deductionType = this.formSearch.deductionType
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
                        this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
                        data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
                        data.goodsNo = this.formSearch.goodsNo
                        data.deductionStatus = this.formSearch.dtStatus
                        w2ui.deduction.getSelection().length>0?data.ids= w2ui.deduction.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('payable_deductionOrder_exportAsync', data, false).then(res => {
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

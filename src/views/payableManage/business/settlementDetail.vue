<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline ">
            <Col style="padding-left:10px;margin-bottom:20px">
            <el-form-item size="small" class="marginT0" label-width="100px">
                <!--  -->
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>

            <el-form-item size="small" class="marginT0" label-width="100px">
                <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="onExamine">审核</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0" label-width="100px">

                <el-button size="small" v-if="judgeMenu.indexOf('取消审核') !== -1" type="primary" @click="onExamineCancel">取消审核</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0" label-width="100px">

                <el-button size="small" v-if="judgeMenu.indexOf('扣款调整') !== -1" type="primary" @click="onAdjustment">扣款调整</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0" label-width="100px">

                <el-button size="small" v-if="judgeMenu.indexOf('生成对账单') !== -1" type="primary" @click="onGirthBillNo">生成对账单</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0" label-width="100px">

                <el-button size="small" v-if="judgeMenu.indexOf('删除') !== -1" type="primary" @click="onDel">删除</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0" label-width="100px">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>

            </Col>
            <!-- <el-divider></el-divider> -->
            <!-- <el-col> -->
            <el-form-item label="年份：" size="small" >
                <el-date-picker style="width:100px" v-model="formSearch.year" type="year" placeholder="请选择"> </el-date-picker>
            </el-form-item>
            <el-form-item label="大货款号：" size="small" >
                <el-input v-model="formSearch.goodsNo" placeholder="请输入" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="制单号 ：" size="small" >
                <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label=" 公 司 ：" size="small">
                <el-select v-model="formSearch.companyId" @change="watchBill(formSearch.companyId)" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对账期间 ：" size="small"  v-if="show==true">
                <el-select v-model="formSearch.periodId" filterable placeholder="请选择" style="width:200px">
                    <el-option v-for="item in SelectList" :key="item.name" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item>
            <!-- </el-col>
             <el-col v-if="show==true"> -->
            <el-form-item v-if="show==true" label="结算类型：" size="small" >
                <el-select v-model="formSearch.settlementType" filterable placeholder="请选择" style="width:120px">
                    <el-option label="经销" value="1"></el-option>
                    <el-option label="代销" value="-1"></el-option>
                    <el-option label="退次返修" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="供应商：" size="small">
                <el-select v-model="formSearch.supplierId" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="单据状态：" size="small">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:100px">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="关单后入库：" size="small" >
                <el-select v-model="formSearch.closeStockInStatus" filterable placeholder="请选择" style="width:100px">
                    <el-option label="已处理" value="1"></el-option>
                    <el-option label="未处理" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="批次：" size="small" >
                <el-input v-model="formSearch.batchNo" filterable placeholder="请输入" style="width:120px">
                </el-input>
            </el-form-item>
            <!-- </el-col> -->
            <el-form-item label="单据日期：" size="small" v-if="show==true">
                <el-date-picker style="width:290px" v-model="formSearch.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show==true" label="对账状态：" size="small">
                <el-select v-model="formSearch.settleStatus" filterable placeholder="请选择" style="width:120px">
                    <el-option label="未对账" value="0"></el-option>
                    <el-option label="已对账" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show==true" label="结算单号：" size="small" >
                <el-input v-model="formSearch.bizCode" filterable placeholder="请输入" style="width:150px">
                </el-input>
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
            <el-tab-pane label="货品明细" name="first">
                <section class="middle">
                    <el-table :data="goodsList" border max-height="250" :summary-method="getSummaries" show-summary style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="50">
                        </el-table-column>
                        <el-table-column prop="merchantCode" align="center" label="商家编码" min-width="120">
                        </el-table-column>
                        <el-table-column prop="goodsNo" align="center" label="大货款号" min-width="120">
                        </el-table-column>
                        <el-table-column prop="batchNo" align="center" min-width="120" label="批次">
                        </el-table-column>
                        <el-table-column prop="goodsName" align="center" min-width="120" label="货品名称">
                        </el-table-column>
                        <el-table-column prop="specificationName" align="center" min-width="120" label="规格名称">
                        </el-table-column>
                        <el-table-column prop="brandName" align="center" min-width="120" label="品牌">
                        </el-table-column>
                        <el-table-column prop="stockInQty" align="center" min-width="120" label="入库数量">
                        </el-table-column>
                        <el-table-column prop="taxIncludedTotalPurchaseUnitPrice" align="center" min-width="120" label="含税总采购单价">
                             <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedTotalPurchaseUnitPrice|singlePrice}}</div></template>
                        </el-table-column>
                        <el-table-column prop="taxIncludedPurchaseUnitPrice" align="center" min-width="120" label="含税采购单价">
                             <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedPurchaseUnitPrice|singlePrice}}</div></template>
                        </el-table-column>
                        <el-table-column prop="taxIncludedTrialFee" align="center" min-width="120" label="含税试制费单价">
                             <template slot-scope="scope"><div style="text-align:right">{{scope.row.taxIncludedTrialFee|singlePrice}}</div></template>
                        </el-table-column>
                    </el-table>
                </section>
            </el-tab-pane>
            <el-tab-pane label="扣款明细" name="second">
                <section class="middle">
                    <el-table :data="deductionList" border max-height="250" style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="50">
                        </el-table-column>
                        <!-- <el-table-column prop="bizDate" align="center" label="单据日期" min-width="120">
                        </el-table-column> -->
                        <el-table-column prop="companyName" align="center" label="公司" min-width="120">
                        </el-table-column>
                        <el-table-column prop="supplierName" align="center" min-width="120" label="供应商">
                        </el-table-column>
                        <el-table-column prop="brandName" align="center" min-width="120" label="品牌">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo" align="center" min-width="120" label="制单号">
                        </el-table-column>
                        <el-table-column prop="goodsNo" align="center" min-width="120" label="大货款号">
                        </el-table-column>
                        <el-table-column prop="deductionAmount" align="center" min-width="120" label="扣款金额">
                            <template slot-scope="scope"><div style="text-align:right">{{scope.row.deductionAmount|moneyFilters}}</div></template>
                        </el-table-column>
                        <el-table-column prop="deductionType" align="center" min-width="120" label="扣款类型">
                        </el-table-column>
                    </el-table>
                </section>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="third">
                <section class="middle">
                    <el-table :data="setDetaillogList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                        <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="setDetaillogList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="setDetaillogList.length>0&&!dataFlag">没有更多了…</div>
                </section>
            </el-tab-pane>
        </el-tabs>
    </section>
    <!--生成对账单 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" title="生成对账单" @on-cancel='cancelGenerate' :width="430" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addBillObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="指定账期" size="small" label-width="95px" prop="platform">
                    <el-select v-model="addBillObj.period" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in billList" :key="item.name" :label="item.name" :value="item.period"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:130px">
                    <Button type="primary" @click="confirmGenerate">确认</Button>
                    <Button type="default" @click="cancelGenerate">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 扣款调整 -->
    <Modal v-model="adjustVisible" :styles="mystyle" :rules="rules" title="扣款调整" @on-cancel='cancelAddQ' :width="1070" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="adjustForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="公司：" size="small" label-width="95px" prop="platform">
                    <el-input v-model="adjustObj.companyName" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="供应商：" size="small" label-width="95px" prop="platform">
                    <el-input v-model="adjustObj.supplierName" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="制单号：" size="small" label-width="95px" prop="platform">
                    <el-input v-model="adjustObj.purchaseOrderNo" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="大货款号：" size="small" label-width="95px" prop="platform">
                    <el-input v-model="adjustObj.goodsNo" disabled style="width:220px"></el-input>
                </el-form-item>
                <Button type="primary" @click="confirm">保存</Button>
                <Button type="primary" @click="cancelAdd">保存并审核</Button>
                </Col>
                <Col>
                <el-table :data="adjustList" @selection-change="changeSelection" border max-height="250" style="width: 100%">
                    <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->
                    <el-table-column prop="bizCode" label="扣款单编号" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column prop="deductionType" label="扣款类型" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column prop="deductionAmount" label="扣款金额" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column prop="bizDate" label="单据日期" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="adjustRemove(scope.row)" type="text" size="small">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </Col>
                <Col style="margin-top:20px">
                <el-form-item size="small" label-width="95px">
                    <el-input v-model="adjustObj.koukuan" placeholder="输入扣款单号" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item size="small" label-width="95px">
                    <Button type="default" @click="adjustAdd">添加</Button>
                    <!-- <Button type="default" @click="adjustRemove">移除</Button> -->
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
                       结算明细主单超过100000行, 确认导出？
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
            activeName: 'first',
            dataFlag: true,
            examineVisible: false, // 审核框
            dialogVisible: false, // 生成对账单框
            adjustVisible: false, // 扣款调整
            adjustObj: {}, // 扣款调整数据对象
            adjustList: [], //  调整扣款的列表 
            supplyList: [], //供应商列表
            billList: [], //生成对账单下拉列表
            logList: [], // 日志
            companyList: [], //公司列表
            list: [], //主表数据
            SelectList: [], //账期列表
            // goodsList     : [],// 货品列表
            formSearch: {
                year: '',
                goodsNo: '',
                closeStockInStatus: '',
                status: '',
                endDate: '',
                startDate: '',
                settlementType: '',
                purchaseOrderNo: '',
                batchNo: '',
                periodId: '',
                supplierId: '',
                companyId: '',
                settleStatus:'',
                bizCode:'',
            },
            addBillObj: {
                period: ''
            },
            billNo: '',
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            logPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            selectListA: [],
        }
    },
    computed: mapState({
        goodsList: state => state.setdetail.goodsList,
        setDetaillogList: state => state.setdetail.setDetaillogList,
        setdetailId: state => state.setdetail.setdetailId,
        deductionList: state => state.setdetail.deductionList,
    }),
    destroyed() {
        record.bizCode = ''
        this.$store.commit('cleardetailId') //清除id
        this.$store.commit('clearGoodsList') //货品明细
        this.$store.commit('clearsetlogList') //操作日志
        this.$store.commit('cleardeductionList') //扣款明细
        this.list = []
        this.logPage = 1
    },
    created() {
        this.getCompany()
        this.getSupply()
        this.getPayableUser()
    },
    mounted() {
        this.formSearch.year = new Date()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
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
        resetCommit() {
            this.$store.commit('cleardetailId') //清除id
            this.$store.commit('clearGoodsList') //货品明细
            this.$store.commit('clearsetlogList') //操作日志
            this.$store.commit('cleardeductionList') //扣款明细
        },
        handleClick(tab, event) {
            if (tab.name == 'second') {
                if (!this.setdetailId) return
                this.getReduceDetail(this.setdetailId)
            } else if (tab.name == 'third') {
                if (!this.setdetailId) return
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
        initTable(arr = [], currentPageSum, totalPageSum) {
            var self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'settlementDetail',
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
                            sortable: true,
                        },
                         {
                            field: 'settleStatus',
                            caption: '对账状态',
                            size: '100px',
                            sortable: true,
                        },
                        {
                            field: 'bizCode',
                            caption: '单据编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'closeTime',
                            caption: '关单时间',
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
                            field: 'purchaseOrderNo',
                            caption: '制单号',
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
                            field: 'processingType',
                            caption: '加工类型',
                            size: '100px'
                        },
                        {
                            field: 'orderTime',
                            caption: '下单日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'photoSampleNum',
                            caption: '拍照样数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'totalSettlementQty',
                            caption: '结算总数',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'totalFabricAmount',
                            caption: '面料总额',
                            size: '100px',
                            sortable: true,
                            render:'money',
                        },
                         {
                            field: 'photoSampleGoodsAmount',
                            caption: '拍照样贷款金额',
                            size: '100px',
                            sortable: true,
                             render:'money',
                        },
                        {
                            field: 'totalGoodsAmount',
                            caption: '货款总额',
                            size: '100px',
                            sortable: true,
                             render:'money',
                        },
                         {
                            field: 'photoSampleTrialAmount',
                            caption: '拍照样试制费金额',
                            size: '100px',
                            sortable: true,
                             render:'money',
                        },
                        {
                            field: 'totalTaxTrialAmount',
                            caption: '试制费总额',
                            size: '100px',
                            sortable: true,
                            render:'money',
                        },
                        {
                            field: 'totalDeductionAmount',
                            caption: '扣款总额',
                            size: '100px',
                            sortable: true,
                            render:'money',
                        },
                        {
                            field: 'settlementType',
                            caption: '结算类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'totalSettlementAmount',
                            caption: '结算总额',
                            size: '100px',
                            sortable: true,
                             render:'money',
                        },
                        {
                            field: 'reconciliationOrderCode',
                            caption: '账单编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '对账期间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'deductionRatioStr',
                            caption: '扣款比例',
                            size: '100px',
                            sortable: true
                        },
                        // {
                        //     field: 'closeStockInQty',
                        //     caption: '关单后入库数',
                        //     size: '100px',
                        //     sortable: true
                        // },
                        {
                            field: 'generationType',
                            caption: '生成方式',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                        // {
                        //     field: 'closeStockInStatusStr',
                        //     caption: '关单后入库处理',
                        //     size: '100px',
                        //     sortable: true
                        // },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        self.activeName = 'first'
                        record = this.get(event.recid)
                        console.log(record, '456789')
                        // self.logPage = 1
                        // self.getGoodsList(event.recid)
                        // self.$store.commit('getSetdetailId',event.recid)
                        setTimeout(function () {
                            if (w2ui.settlementDetail.getSelection().length == 1) {
                                let arr = w2ui.settlementDetail.getSelection()
                                if(arr[0] != record.id){
                                       // console.log('--------------')
                                }else{
                                    self.logPage = 1
                                    self.getGoodsList(event.recid)
                                    self.$store.commit('getSetdetailId', event.recid)
                                }
                            } else {
                                self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.settlementDetail.clear(); //清空
                w2ui.settlementDetail.records = arr
                w2ui.settlementDetail.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    photoSampleNum:currentPageSum.photoSampleNum,
                    totalSettlementQty: currentPageSum.totalSettlementQty,
                    totalFabricAmount: currentPageSum.totalFabricAmount,
                    photoSampleGoodsAmount:currentPageSum.photoSampleGoodsAmount,
                    totalGoodsAmount: currentPageSum.totalGoodsAmount,
                    photoSampleTrialAmount: currentPageSum.photoSampleTrialAmount,
                    totalTaxTrialAmount: currentPageSum.totalTaxTrialAmount,
                    totalDeductionAmount: currentPageSum.totalDeductionAmount,
                    totalSettlementAmount: currentPageSum.totalSettlementAmount
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    photoSampleNum:totalPageSum.photoSampleNum,
                    totalSettlementQty: totalPageSum.totalSettlementQty,
                    totalFabricAmount: totalPageSum.totalFabricAmount,
                    photoSampleGoodsAmount:totalPageSum.photoSampleGoodsAmount,
                    totalGoodsAmount: totalPageSum.totalGoodsAmount,
                    photoSampleTrialAmount: totalPageSum.photoSampleTrialAmount,
                    totalTaxTrialAmount: totalPageSum.totalTaxTrialAmount,
                    totalDeductionAmount: totalPageSum.totalDeductionAmount,
                    totalSettlementAmount: totalPageSum.totalSettlementAmount

                })
                $('#main').w2render('settlementDetail');
                w2ui.settlementDetail.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.settlementDetail.clear(); //清空
                    w2ui['settlementDetail'].records = []
                    w2ui.settlementDetail.refresh();
                    $('#main').w2render('settlementDetail')
                })

            }

        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = ''
            }
            record.bizCode = ''
            this.SelectList = []
            this.formSearch.year = new Date()
            this.getSupply()
            // this.initTable([])
            // this.resetCommit()
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, false).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        getSupply() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.supplyList = res.data
                }
            })
        },
        getData() {
            record.bizCode = ''
            this.loading = true;
            this.logPage = 1;
            // this.logList               = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.companyId = this.formSearch.companyId //公司
            data.supplierId = this.formSearch.supplierId //期间
            data.payableUserId = this.formSearch.payableUser//所属人员
            data.periodId = this.formSearch.periodId //公司名称
            data.year = filters.get_unix_only(this.formSearch.year) //年
            data.goodsNo = this.formSearch.goodsNo //大货款号
            data.batchNo = this.formSearch.batchNo
            data.purchaseOrderNo = this.formSearch.purchaseOrderNo
            data.settlementType = this.formSearch.settlementType
            data.startDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[0]) : ''
            // data.endDate           = this.formSearch.date? filters.get_year_month_day2(new Date().setTime(this.formSearch.date[1])/1000+24*60*60):''
            data.endDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[1]) : ''
            data.status = this.formSearch.status != '' ? Number(this.formSearch.status) : ''
            data.closeStockInStatus = this.formSearch.closeStockInStatus != '' ? Number(this.formSearch.closeStockInStatus) : '' // 关单后入库处理
            data.status == 0 ? '' : data.status == 1 ? '' : delete data.status
            data.closeStockInStatus == 0 ? '' : data.closeStockInStatus == 1 ? '' : delete data.closeStockInStatus
            data.startDate ? '' : delete data.startDate
            data.endDate ? '' : delete data.endDate
            data.bizCode=this.formSearch.bizCode
            data.settleStatus=this.formSearch.settleStatus!=''?Number(this.formSearch.settleStatus):''
            this.request('payable_settlementOrder_page', data, true).then(res => {
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
                    this.$store.commit('clearGoodsList') //货品明细
                    this.$store.commit('clearlogList') //操作日志
                    this.$store.commit('cleardeductionList') //扣款明细
                } else {
                    this.initTable([])
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
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
        watchBill(id) {
            if (!id) return
            this.formSearch.periodId = ''
            this.SelectList = []
            this.getSelectList(id)
        },
        getReduceDetail(id) { //
            if (!record.bizCode) return
            let data = {}
            data.settlementOrderCode = record.bizCode
            data.pageSize = 1000
            this.request('payable_deductionOrder_page', data, false).then((res) => {
                if (res.code == 1) {
                    this.$store.commit('initSetdetailList', res.data.records)
                } else {
                    this.$store.commit('clearSetdetailList')
                }
            })
        },
        // 账期下拉列表
        getSelectList(id) {
            let data = {}
            data.basicCompanyId = id
            data.type = 3;
            this.request('accountPeriod_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.SelectList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //日志
        getLoglist() {
            let data = {}
            data.billNo = 'payable_settlement_order_' + this.setdetailId
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
                        this.$store.commit('initsetlogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initsetlogList', this.logList)
                    }
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
        },
        //获取的货品明细
        getGoodsList(id) {
            let data = {}
            data.id = id
            this.request('payable_settlementOrder_detail', data, false).then((res) => {
                if (res.code == 1) {
                    this.$store.commit('initGoodsList', res.data.records)
                } else {
                    this.$store.commit('clearGoodsList')
                }
            })
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
        checkSelection() {
            let arr = w2ui.settlementDetail.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //审核
        onExamine() {
            let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr

            if (this.checkSelection()) {
                this.request('payable_settlementOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = value,
                            // data.continueAudit = 1
                            this.request('payable_settlementOrder_command', data, false).then((res) => {
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
                    }
                    else if (res.code == 'FMS_7011') {
                        this.$prompt(res.msg,'操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = value,
                            data.continueAudit = 1
                            this.request('payable_settlementOrder_command', data, false).then((res) => {
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
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选审核数据')

            }

        },
        // 取消审核
        onExamineCancel() {
            let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.command = 'unAudit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_settlementOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = value
                            this.request('payable_settlementOrder_command', data, false).then((res) => {
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
            let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.command = 'delete'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_settlementOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要删除选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = value
                            this.request('payable_settlementOrder_command', data, false).then((res) => {
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
        getId(id) {
            for (let i = 0, len = this.list.length; i < len; i++) {
                if (this.list[i].recid == id) {
                    return this.list[i].companyId
                }
            }
        },
        //生成对账单弹框
        onGirthBillNo() {
            // let arr = w2ui.grid.getSelection()
            //      this.dialogVisible = true
            let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.command = 'generateOrder'
            data.ids = arr
            data.periodId = -1
            data.periodNo = -1
            if (this.checkSelection()) {
                this.request('payable_settlementOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        let data = {}
                        data.basicCompanyId = this.getId(arr[0])
                        data.type = 3
                        //查询该公司的业务账期
                        this.request('accountPeriod_selector', data, false).then((res) => {
                            if (res.code == 1) {
                                this.billList = res.data
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                        this.dialogVisible = true
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选生成对账单数据')
            }

        },
        getNumber(id) {
            for (let i = 0; i < this.billList.length; i++) {
                if (this.billList[i].period == id) {
                    return this.billList[i].periodNo
                }
            }
        },
        //确认生成对账单
        confirmGenerate() {
            let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.command = "generateOrder";
            data.ids = arr;
            data.periodId = this.addBillObj.period;
            data.periodNo = this.getNumber(this.addBillObj.period)
            this.request('payable_settlementOrder_command', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message.success('生成对账单成功')
                    this.cancelGenerate()
                    this.dialogVisible = false
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        cancelGenerate() {
            this.dialogVisible = false
            this.billList = []
            this.addBillObj.period = ''
        },
        //扣款调整弹框
        onAdjustment() {
            let arr = w2ui.settlementDetail.getSelection();
            if (arr.length == 1) {
                this.request('payable_settlementOrder_deductionDetail', {
                    id: this.setdetailId
                }, false).then(res => {
                    if (res.code == '1') {
                        this.adjustVisible = true
                        this.adjustObj = res.data
                        this.adjustList = res.data.deductionOrderList
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else if (arr.length == 0) {
                this.$message.error('您没有勾选数据！')
            } else if (arr.length > 1) {
                this.$message.error('一次只能勾选一条数据')
            }

        },
        resetForm(name) {
            this.$refs[name].resetFields();
        },
        cancelAdjust() {
            this.adjustVisible = false;
            this.resetForm('adjustForm')
        },
        //保存
        confirm() {
            for(let i=0,len=this.adjustList.length;i<len;i++){
               this.adjustList[i].deductionAmount=filters.specialSymbol(this.adjustList[i].deductionAmount)
               this.adjustList[i].adjustAmount=filters.specialSymbol(this.adjustList[i].adjustAmount)
            }
            let data = {}
            data.audit = 0
            data.id = this.setdetailId
            data.deductionOrderList = this.adjustList
            this.request('payable_settlementOrder_adjustDeduction', data, true).then((res) => {
                if (res.code == '1') {
                    this.getData()
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
                this.adjustVisible = false
                this.adjustObj = {}
            })
        },
        //审核保存
        cancelAdd() {
             for(let i=0,len=this.adjustList.length;i<len;i++){
               this.adjustList[i].deductionAmount=filters.specialSymbol(this.adjustList[i].deductionAmount)
               this.adjustList[i].adjustAmount=filters.specialSymbol(this.adjustList[i].adjustAmount)
            }
            let data = {}
            data.audit = 1
            data.id = this.setdetailId
            data.deductionOrderList = this.adjustList
            // data.continueAudit = 1
            this.request('payable_settlementOrder_adjustDeduction', data, true).then((res) => {
                if (res.code == '1') {
                    this.getData()
                    this.$message.success(res.msg)
                }
                else if (res.code == 'FMS_7011') {
                        this.$prompt(res.msg,'操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = value,
                            data.audit = 1
                            data.id = this.setdetailId
                            data.deductionOrderList = this.adjustList
                            data.continueAudit = 1
                            this.request('payable_settlementOrder_adjustDeduction', data, false).then((res) => {
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
                    this.$message.error(res.msg)
                }
                this.adjustVisible = false
                this.adjustObj = {}
            })
        },
        //关闭
        cancelAddQ() {
            this.adjustVisible = false
            this.adjustObj = {}
        },
        //新增
        adjustAdd() {
            if (this.adjustObj.koukuan == undefined || this.adjustObj.koukuan == "") {
                this.$message.error('先输入扣款单号！')
            } else {
                let data = {}
                data.bizCode = this.adjustObj.koukuan
                this.request('payable_deductionOrder_page', data, false).then((res) => {
                    if (res.code == '1') {
                        this.adjustObj.koukuan = ''
                        let Arr = this.adjustList
                        if (res.data.records.length > 0) {
                            res.data.records.map(function (item) {
                                Arr.push({
                                    bizCode: item.bizCode,
                                    deductionType: item.deductionType,
                                    deductionAmount: item.deductionAmount,
                                    bizDate: item.bizDate
                                })
                            })
                            return Arr
                            this.adjustList = Arr
                        } else {
                            this.$message.error('暂无数据')
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        changeSelection(selection, row) {
            this.selectListA = selection
        },
        adjustRemove(row) {
            let val = row.bizCode //扣款单号
            if (val) {
                //将选中数据遍历
                // val.forEach((val, index) => {
                    //遍历源数据
                    this.adjustList.forEach((v, i) => {
                        //如果选中数据和源数据的某一条唯一标识符相等，删除对应的源数据
                        if (val === v.bizCode) {
                            this.adjustList.splice(i, 1)
                        }
                    })
                // })
            }
        },
        getSummaries(param) {
            const {
                columns,
                data
            } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (column.property != 'stockInQty') return
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
                        data.companyId = this.formSearch.companyId //公司
                        data.supplierId = this.formSearch.supplierId //期间
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.periodId = this.formSearch.periodId //公司名称
                        data.year = filters.get_unix_only(this.formSearch.year) //年
                        data.goodsNo = this.formSearch.goodsNo //大货款号
                        data.batchNo = this.formSearch.batchNo
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.settlementType = this.formSearch.settlementType
                        data.startDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[0]) : ''
                        // data.endDate           = this.formSearch.date? filters.get_year_month_day2(new Date().setTime(this.formSearch.date[1])/1000+24*60*60):''
                        data.endDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[1]) : ''
                        data.status = this.formSearch.status != '' ? Number(this.formSearch.status) : ''
                        data.closeStockInStatus = this.formSearch.closeStockInStatus != '' ? Number(this.formSearch.closeStockInStatus) : '' // 关单后入库处理
                        data.status == 0 ? '' : data.status == 1 ? '' : delete data.status
                        data.closeStockInStatus == 0 ? '' : data.closeStockInStatus == 1 ? '' : delete data.closeStockInStatus
                        data.startDate ? '' : delete data.startDate
                        data.endDate ? '' : delete data.endDate
                        w2ui.settlementDetail.getSelection().length>0?data.selectedIds= w2ui.settlementDetail.getSelection():delete data.selectedIds
                        this.exportObj.selected==1? data.onlyExportMainOrder=true:data.onlyExportMainOrder=false;
            this.request('payable_settlementOrder_preExportCount',data,false).then(res=>{
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
                    let data = {}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.companyId = this.formSearch.companyId //公司
                        data.supplierId = this.formSearch.supplierId //期间
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.periodId = this.formSearch.periodId //公司名称
                        data.year = filters.get_unix_only(this.formSearch.year) //年
                        data.goodsNo = this.formSearch.goodsNo //大货款号
                        data.batchNo = this.formSearch.batchNo
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.settlementType = this.formSearch.settlementType
                        data.startDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[0]) : ''
                        // data.endDate           = this.formSearch.date? filters.get_year_month_day2(new Date().setTime(this.formSearch.date[1])/1000+24*60*60):''
                        data.endDate = this.formSearch.date ? filters.get_year_month_day(this.formSearch.date[1]) : ''
                        data.status = this.formSearch.status != '' ? Number(this.formSearch.status) : ''
                        data.closeStockInStatus = this.formSearch.closeStockInStatus != '' ? Number(this.formSearch.closeStockInStatus) : '' // 关单后入库处理
                        data.status == 0 ? '' : data.status == 1 ? '' : delete data.status
                        data.closeStockInStatus == 0 ? '' : data.closeStockInStatus == 1 ? '' : delete data.closeStockInStatus
                        data.startDate ? '' : delete data.startDate
                        data.endDate ? '' : delete data.endDate
                        w2ui.settlementDetail.getSelection().length>0?data.selectedIds= w2ui.settlementDetail.getSelection():delete data.selectedIds
                        this.exportObj.selected==1? data.onlyExportMainOrder=true:data.onlyExportMainOrder=false;
                      this.request('payable_settlementOrder_exportAsync', data, false).then(res => {
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
// .headerstyle {
//     // min-height: 205px;
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

.marginT0 {
    margin-bottom: 0px !important;
}
</style>

<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="onSync">同步</el-button>
            </el-form-item>
             <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item label="年份：" size="small">
                <el-date-picker v-model="formSearch.years" value-format="yyyy" type="year" style="width:100px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="采购单号：" size="small">
                <el-input v-model="formSearch.ordersNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="设计款号：" size="small">
                <el-input v-model="formSearch.designsNo" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item v-if="show == true" label="公司：" size="small">
                <el-select v-model="formSearch.company" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="供应商：" size="small">
                <el-select v-model="formSearch.supplier" value-key="id" filterable placeholder="请选择" style="width:230px">
                    <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="单据日期：" size="small">
                <!-- <el-date-picker v-model="formSearch.documentDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker v-model="formSearch.documentDateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.documentDateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-if="show == true" label="下单日期：" size="small">
                <!-- <el-date-picker v-model="formSearch.orderDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker v-model="formSearch.orderDateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.orderDateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
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
                <el-table :data="goodsListOne" style="width: 100%" border :summary-method="getSummaries" show-summary tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="goodsStatus" label="大货状态" min-width="120" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">{{scope.row.goodsStatus == "0" ? "未完成" : (scope.row.goodsStatus == "1" ? "已完成" : "取消")}}</template> -->
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="color" label="颜色" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="colorNo" label="色号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningTypeStr" label="规划类型" min-width="120" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">{{scope.row.planningType == "10" ? "规划型首单" : "非规划型首单" }}</template> -->
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
                     <el-table-column prop="trialTaxRate" label="试制费税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="goodsTaxRate" label="货物税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="excludingTaxTrialFee" label="不含税试制费单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope"><div style="text-align:right">{{scope.row.excludingTaxTrialFee|singlePrice}}</div></template>
                    </el-table-column>
                     <el-table-column prop="excludingTaxPurchaseUnitPrice" label="不含税采购单价" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope"><div style="text-align:right">{{scope.row.excludingTaxPurchaseUnitPrice|singlePrice}}</div></template>
                    </el-table-column>
                     <el-table-column prop="excludingTaxTotalPurchaseUnitPrice" label="不含税总采购单价" min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope"><div style="text-align:right">{{scope.row.excludingTaxTotalPurchaseUnitPrice|singlePrice}}</div></template>
                    </el-table-column>
                    <el-table-column prop="contractAmount" label="合约金额" min-width="120" align="center" show-overflow-tooltip>
                           <template slot-scope="scope"><div style="text-align:right">{{scope.row.contractAmount|moneyFilters}}</div></template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="goodsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="goodsList.length>0&&!dataFlag">没有更多了…</div>
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
var totalPageSum = {}
import filters from '../../../filter/'
export default {

    data() {
        return {
            typeList:[],
            payableUserList:[],
             exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            activeName: 'first',
            timeAA: null,
            // tableList:[],//合计
            logList: [], //日志
            billNo: '',
            show: false,
            col: [],
            tableData: [],
            visible: false,
            brandList: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            formSearch: {
                code: '',
                name: '',
                person: '',
                supplier:'',
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            currentPageDelait: 1,
            footerData: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            delaiList: [],
            ASDid: '',
            // totalPageSum:{},
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.scmOrderList
        },
        goodsListOne() {
            return this.$store.state.app.onescmOrderList
        }
    },
    destroyed() {
        this.$store.commit('clearscmOrder')
    },
    mounted() {
        this.getPayableUser()
        this.getCompany()
        this.getTypeList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '')
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.supplier = ''
            console.log(name)
            let vars = {}
            vars.payableUserId = name
             this.requestWithUriVars('selectorPayableSupplier', vars, null, true).then(res => {
          if (res.code==1) {
              this.typeList = res.data
            }else{
                this.typeList = []
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
        getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
        sums[8] = totalPageSum.quantity
        });
        return sums;
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
                    name: 'scmOrder',
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
                            field: 'created',
                            caption: '单据日期',
                            size: '100px',
                            sortable: true,
                        },
                        {
                            field: 'bigGoodsStatus',
                            caption: '大货状态',
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
                            field: 'orderStatusStr',
                            caption: '下单状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'purchaseOrderNo',
                            caption: '采购单号',
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
                            field: 'supplierName',
                            caption: '供应商',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'hazardAmount',
                            caption: '风控额度',
                            size: '100px',
                            sortable: true,
                            render:'money',
                        },
                        {
                            field: 'materialAmount',
                            caption: '物料金额',
                            size: '100px',
                            sortable: true,
                            render:'money',
                        },
                        {
                            field: 'remainingAmount',
                            caption: '剩余额度',
                            size: '100px',
                            sortable: true,
                            render:'money',
                            // render: 'remainingAmount'
                        },
                        {
                            field: 'orderBatch',
                            caption: '下单批次',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTotal',
                            caption: '下单总数',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'manager',
                            caption: '理单员',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'productionOrder',
                            caption: '生产跟单',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'requestPhotoDate',
                            caption: '要求拍照样日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'materialDemandReturnDate',
                            caption: '物料需求回货日期',
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
                            field: 'productWarehouse',
                            caption: '成品仓库',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderType',
                            caption: '订单类别',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'salesType',
                            caption: '销售类别',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'designer',
                            caption: '设计师',
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
                            field: 'styleDescription',
                            caption: '款式描述',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'companyName',
                            caption: '公司主体',
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
                            field: 'submittedPerson',
                            caption: '提交人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'submissionTime',
                            caption: '提交时间',
                            size: '100px',
                            sortable: true
                        },{
                            field: 'maintenancePerson',
                            caption: '维护人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'maintenanceDate',
                            caption: '维护时间',
                            size: '100px',
                            sortable: true
                        },
                        
                    ],
                    onClick: function (event) {
                        // self.$store.commit('clearscmOrder')
                        var record = this.get(event.recid)
                        // self.getLoglist(record.purchaseOrderNo)
                        // self.getOrderList(record.purchaseOrderNo)
                        // self.currentPageDelait = 1;
                        // self.currentPage = 1;
                        // self.$store.commit('clearverification')
                          setTimeout(function(){
                            if(w2ui.scmOrder.getSelection().length == 1){

                                  let arr = w2ui.scmOrder.getSelection()
                                if(arr[0] != record.id){
                                    // console.log('--------------')
                                }else{
                                console.log(record.id)
                                self.$store.commit('clearscmOrder')
                                self.getLoglist(record.purchaseOrderNo)
                                self.getOrderList(record.purchaseOrderNo)
                                self.currentPageDelait = 1;
                                self.currentPage = 1;}
                            }else{
                                 self.$store.commit('clearscmOrder')
                            }
                        }, 200);

                    }
                })
            });
            if (arr.length > 0) {
                w2ui.scmOrder.clear(); //清空
                w2ui.scmOrder.records = arr
                w2ui.scmOrder.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    orderTotal: page.orderTotal,
                    // hazardAmount:'',
                    // materialAmount:'',
                    // remainingAmount:'',
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    orderTotal: total.orderTotal,
                    // hazardAmount:'',
                    // materialAmount:'',
                    // remainingAmount:'',
                })
                $('#main').w2render('scmOrder');
                w2ui.scmOrder.refresh();
            } else {
                $(document).ready(function () {
                w2ui.scmOrder.clear(); //清空
                w2ui['scmOrder'].records = []
                $('#main').w2render('scmOrder')
                w2ui.scmOrder.refresh();
                })
            }

        },
        //同步
        onSync() {
            let data = {}
            this.request('order_sync', data, false).then(res => {
                if (res.code == '1') {
                    this.getKey(res.data)
                    // this.$notify.success({
                    //     title: '同步',
                    //     message: res.msg,
                    //     duration: 0,
                    // });
                    // this.getData()
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
            // const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            if(res.data.processStatus == 1){
                                this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 0,
                            });
                            }else{
                                this.$notify.error({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 0,
                            });
                            }
                            this.cleanKey(key)
                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
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
        onReset() {
            this.formSearch = {
                code: '',
                name: '',
                person: '',
                supplier:'',
            }
            this.getTypeList()
        },
        getCompany() { //公司下拉
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        //供应商列表
        getTypeList() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.typeList = res.data
                }
            })
        },
        getData() {
            this.$store.commit('clearscmOrder')
            this.logList = []
            this.delaiList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.years = this.formSearch.years
            data.goodsNo = this.formSearch.goodsNo
            data.purchaseOrderNo = this.formSearch.ordersNo
            data.payableUserId = this.formSearch.payableUser
            data.designNumber = this.formSearch.designsNo
            data.companyId = this.formSearch.company
            data.supplierId = this.formSearch.supplier
            this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
            this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
            this.formSearch.orderDateStart ? data.orderDateStart = this.formSearch.orderDateStart : delete data.orderDateStart //下单日期
            this.formSearch.orderDateEnd ? data.orderDateEnd = this.formSearch.orderDateEnd : delete data.orderDateEnd
            this.request('order_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records,res.data.currentPageSum,res.data.totalPageSum)
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
        //明细
        getOrderList(code) {
            console.log(code,'/./././')
            this.ASDid = code
            let data = {}
            data.purchaseOrderNo = code
            this.request('order_getDetailByNo', data, true).then(res => {
                if (res.code == 1) {
                        this.delaiList = res.data.records
                        totalPageSum = res.data.totalPageSum
                        this.$store.commit('OnescmOrder', this.delaiList)
                }
            })
        },
        getLoglist(billNo) {
            console.log(billNo,'6789')
            this.billNo = 'biz_purchase_order_' + billNo
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
                        this.$store.commit('scmOrder', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('scmOrder', this.logList)
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
                        this.$store.commit('scmOrder', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('scmOrder', this.logList)
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
        checkSelection() {
            let arr = w2ui.scmOrder.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false
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
                        data.years   = this.formSearch.years
                        data.goodsNo = this.formSearch.goodsNo
                        data.purchaseOrderNo = this.formSearch.ordersNo
                        data.payableUserId = this.formSearch.payableUser
                        data.designNumber = this.formSearch.designsNo
                        data.companyId  = this.formSearch.company
                        data.supplierId = this.formSearch.supplier
                        this.exportObj.selected==1?    data.inclusionDetails=true:data.inclusionDetails=false;
                        this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
                        this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
                        this.formSearch.orderDateStart ? data.orderDateStart = this.formSearch.orderDateStart : delete data.orderDateStart //下单日期
                        this.formSearch.orderDateEnd ? data.orderDateEnd = this.formSearch.orderDateEnd : delete data.orderDateEnd
                        w2ui.scmOrder.getSelection().length>0?data.ids= w2ui.scmOrder.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
            this.request('payable_bizpurchaseorder_exportCount',data,false).then(res=>{
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
                        data.years   = this.formSearch.years
                        data.goodsNo = this.formSearch.goodsNo
                        data.purchaseOrderNo = this.formSearch.ordersNo
                        data.payableUserId = this.formSearch.payableUser
                        data.designNumber = this.formSearch.designsNo
                        data.companyId  = this.formSearch.company
                        data.supplierId = this.formSearch.supplier
                        this.exportObj.selected==1?    data.inclusionDetails=true:data.inclusionDetails=false;
                        this.formSearch.documentDateStart ? data.createStart = this.formSearch.documentDateStart : delete data.createStart //单据日期
                        this.formSearch.documentDateEnd ? data.createEnd = this.formSearch.documentDateEnd : delete data.createEnd
                        this.formSearch.orderDateStart ? data.orderDateStart = this.formSearch.orderDateStart : delete data.orderDateStart //下单日期
                        this.formSearch.orderDateEnd ? data.orderDateEnd = this.formSearch.orderDateEnd : delete data.orderDateEnd
                        w2ui.scmOrder.getSelection().length>0?data.ids= w2ui.scmOrder.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('payable_bizpurchaseorder_export', data, false).then(res => {
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

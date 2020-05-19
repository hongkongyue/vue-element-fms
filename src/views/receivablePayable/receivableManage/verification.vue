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
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('自动核销') !== -1" size="small" type="primary" @click="onWrite">自动核销</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('强制核销') !== -1" size="small" type="primary" @click="forceWrite">强制核销</el-button>
                </el-form-item>
            </div>
            <el-form-item><span style="color:red">*</span></el-form-item>
            <el-form-item label="平台：" size="small">
                <el-select v-model="formSearch.code" @change="changebasicPlatformId(formSearch.code)" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.name" @change="changeCode(formSearch.name)" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="期间：" size="small">
                <el-select v-model="formSearch.time" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in timeList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true"><span style="color:red">*</span></el-form-item>
            <el-form-item v-if="show == true" label="核销状态：" size="small">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in statusQptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="账单ID：" size="small">
                <el-input v-model="formSearch.themID" style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.themID" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in idList" :key="item.id" :label="item.orderTypeName" :value="item.id"></el-option>
                              </el-select> -->
            </el-form-item>

            <el-form-item v-if="show == true" label="未核销标记：" size="small">
                <el-select v-model="formSearch.verifyFailureType" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in verifyFailureTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <div id="main" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="订单明细" name="first">
                <el-table :data="goodsListOne" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicPlatformName" label="平台" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="skuName" label="货品名称" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="skuShortName" label="货品简介" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="原始订单编号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="subOrderNo" label="子订单编号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="purchaseNo" label="采购单号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sourcePurchaseNo" label="原采购单号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="financialType" label="财务类型" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sectionNo" label="货品编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="salePrice" label="标价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.salePrice|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="detailDiscount" label="优惠" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.detailDiscount|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="discountTaxEx" label="优惠（不含税）" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.discountTaxEx|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="dealAmount" label="成交价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.dealAmount|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="actualNum" label="实发数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="canPaySchedule" label="可付进度" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sharePost" label="分摊邮费" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.sharePost|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="adjustAmount" label="调整金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.adjustAmount|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="commission" label="唯品会佣金" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.commission|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="paid" label="已付" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.paid|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="paidTaxIn" label="已付（含税）" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.paidTaxIn|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="taxRate" label="税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="contNotTrialFeeCost" label="不含试制费成本" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.contNotTrialFeeCost|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="contTrialFeeCost" label="含试制费成本" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                 <div style="text-align:right">{{scope.row.contTrialFeeCost|moneyFilters}}</div>
                                 </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="goodsListOne.length>0&&dataFlagD" @click="getDDMore">点击加载更多</div>
                <div class="getmore" v-if="goodsListOne.length>0&&!dataFlagD">没有更多了…</div>
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

    <!-- <section class="footer" style="margin-bottom:0px">
        
    </section> -->
</div>
</template>

<script>
import filters from '../../../filter/'
export default {

    data() {
        return {
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
            logList: [], //日志
            billNo: '',
            show: true,
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
            currentPageDelait: 1,
            footerData: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            delaiList: [],
            ASDid: '',
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.verificationList
        },
        goodsListOne() {
            return this.$store.state.app.oneverificationList
        }
    },
    destroyed() {
        this.$store.commit('clearverification')
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        // this.getShop()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '')
    },
    methods: {
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
        initTable(arr = [], sum) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'verification',
                    show: {
                        // footer    : true,
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
                        },{
                            field: 'verifyTime',
                            caption: '核销时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'verifyUser',
                            caption: '核销人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
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
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '期间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderNo',
                            caption: '平台订单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '平台子订单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '交易时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderSendTime',
                            caption: '发货时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'finishTime',
                            caption: '完成时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'qty',
                            caption: '数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'financialType',
                            caption: '账务类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderSendAmount',
                            caption: '发货金额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'billAmount',
                            caption: '金额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'billDirection',
                            caption: '收/支方向',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billRemark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '商家编码',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '款号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'skuNo',
                            caption: '商品ID',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'logisticsNo',
                            caption: '物流单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'contNotTrialFeeCost',
                            caption: '不含试制费成本',
                            render:'money',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'contNotTrialFeeCostTotal',
                            caption: '不含试制费成本总额',
                            render:'money',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'contTrialFeeCost',
                            caption: '含试制费成本',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'contTrialFeeCostTotal',
                            caption: '含试制费成本总额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'bizNo',
                            caption: '业务单据编码',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '业务单据日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'verifyFailureTypeStr',
                            caption: '未核销标记',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'verifyFailureReason',
                            caption: '未核销原因',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        self.getLoglist(event.recid)
                        self.getOrderList(event.recid)
                        self.currentPageDelait = 1;
                        self.currentPage = 1;
                        self.$store.commit('clearverification')

                    }
                })
            });
            if (arr.length > 0) {
                w2ui.verification.clear(); //清空
                w2ui.verification.records = arr
                w2ui.verification.records.push({
                    w2ui: {
                        summary: true
                    },
                    verifyTime: '<span>当页小计</span>',
                    qty: sum.qtyCurrentPage,
                    billAmount: sum.amountCurrentPage,
                    contNotTrialFeeCostTotal:sum.contNotTrialFeeCostTotalPage,
                    contTrialFeeCostTotal:sum.contTrialFeeCostTotalPage
                }, {
                    w2ui: {
                        summary: true
                    },
                    verifyTime: '<span >合计</span>',
                    qty: sum.qtyForAll,
                    billAmount: sum.amountForAll,
                    contNotTrialFeeCostTotal:sum.contNotTrialFeeCostTotalAll,
                    contTrialFeeCostTotal:sum.contTrialFeeCostTotalAll
                })
                w2ui.verification.refresh();
                $('#main').w2render('verification');
            } else {
                w2ui.verification.clear(); //清空
                w2ui['verification'].records = []
                w2ui.verification.refresh();
                $('#main').w2render('verification')
            }

        },
        //异步导出
        onImport() {
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID列表
            data.accRecvdPeriodIds = this.formSearch.time //账期ID列表
            data.basicCompanyIds = this.formSearch.name //公司ID列表
            data.basicPlatformId = this.formSearch.code //平台ID
            data.basicStoreIds = this.formSearch.person //店铺ID列表
            data.status = this.formSearch.status //状态 0 未核销 1已核销
            this.request('accverification_asyncExport', data, false).then(res => {
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
        //自动核销
        onWrite() {
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID列表//账单ID列表
            data.accRecvdPeriodIds = this.formSearch.time //账期ID列表
            data.basicCompanyIds = this.formSearch.name //公司ID列表
            data.basicPlatformId = this.formSearch.code //平台ID
            data.basicStoreIds = this.formSearch.person //店铺ID列表
            data.status = this.formSearch.status //状态 0 未核销 1已核销
            this.request('accverification_asyncAutoVerify', data, false).then(res => {
                if (res.code == 1) {
                    this.getKeyD(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        //强制核销
        forceWrite() {
            if(this.formSearch.code == ''){
                this.$message.error('平台不能为空')
            }else if(this.formSearch.status !== 0){
                this.$message.error('核销状态应为未核销')
            }else if(this.formSearch.verifyFailureType == undefined){
                this.$message.error('未核销标记不能为空')
            }else{
                let arr = []
            arr = w2ui.verification.getSelection()
            if (arr.length == 0) {
                this.$message.error('请先选择需要强制核销的数据！')
            } else {
                let A = this.formSearch.code
                let code = ''
                this.platformOptions.map(function (item) {
                    if (A == item.id) {
                        code = item.code
                    }
                })
                let data = {}
                data.status = 0
                data.accRecvdIds = arr
                data.basicPlatformCode = code //平台编码
                data.basicPlatformId = this.formSearch.code //平台ID
                this.request('received_asyncAutoVerify', data, false).then(res => {
                    if (res.code == 1) {
                        this.getKeyD(res.data)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            }
            }
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
                            this.getData()
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
        handleCheckedCitiesChange() {
            let str = '';
            let store = '';
            setTimeout(() => {
                for (let i in this.$refs.currentRow.$children) {
                    if (this.$refs.currentRow.$children[i].isChecked) {
                        str += this.$refs.currentRow.$children[i].label
                        setTimeout(() => {
                            for (let j = 0; j < this.formThead.length; j++) {
                                if (str.includes(this.formThead[j].label)) {
                                    this.formThead[j].tag = true
                                } else {
                                    this.formThead[j].tag = false
                                }
                            }
                        }, 10);
                    } else {
                        store += this.$refs.currentRow.$children[i].label;
                        setTimeout(() => {
                            for (let j = 0; j < this.formThead.length; j++) {
                                if (store.includes(this.formThead[j].label)) {
                                    this.formThead[j].tag = false
                                } else {
                                    this.formThead[j].tag = true
                                }
                            }
                        }, 10);
                    }
                }
            }, 100);
        },
        onReset() {
            this.formSearch = {}
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
            this.logList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID列表
            data.accRecvdPeriodIds = this.formSearch.time //账期ID列表
            data.basicCompanyIds = this.formSearch.name //公司ID列表
            data.basicPlatformId = this.formSearch.code //平台ID
            data.basicStoreIds = this.formSearch.person //店铺ID列表
            data.status = this.formSearch.status //状态 0 未核销 1已核销
            data.verifyFailureType = this.formSearch.verifyFailureType //未核销标记
            this.request('accverification_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    //   this.tableData = res.data.records;

                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records, res.data.sums)
                        // this.hasData=true
                    } else {
                        this.initTable([])
                    }

                    this.loading = false
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
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
            this.request('accverification_detail', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records.length < data.pageSize) {
                        this.dataFlagD = false
                    } else {
                        this.dataFlagD = true
                    }
                    if (this.currentPageDelait == 1) {
                        this.delaiList = res.data.records
                        this.$store.commit('Oneverification', this.delaiList)
                    } else {
                        this.delaiList = this.delaiList.concat(res.data.records)
                        this.$store.commit('Oneverification', this.delaiList)
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
                        this.delaiList = res.data.records
                        this.$store.commit('Oneverification', this.delaiList)
                    } else {
                        this.delaiList = this.delaiList.concat(res.data.records)
                        this.$store.commit('Oneverification', this.delaiList)
                    }
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
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
                        this.$store.commit('verification', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('verification', this.logList)
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
                        this.$store.commit('verification', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('verification', this.logList)
                    }
                }
            })
        },
        showLog(row) {
            this.getLoglist(row.orderId)
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

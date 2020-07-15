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
            </div>
            <el-form-item label="平台：" size="small">
                <el-select v-model="formSearch.code" @change="changebasicPlatformId(formSearch.code)" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.name" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.bander" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="下单时间：" size="small">
                <el-date-picker type="date" placeholder="选择日期" @change="changeData" v-model="formSearch.date" style="width:150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="账单ID：" size="small">
                <el-input v-model="formSearch.billNo" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="单据类型：" size="small">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:200px">
                    <el-option v-for="item in statusList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="原始单号：" size="small">
                <el-input v-model="formSearch.orderNo" style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.orderNo" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in orderNoList" :key="item" :label="item" :value="item"></el-option>
                              </el-select> -->
            </el-form-item>
            <el-form-item v-if="show == true" label="款号：" size="small">
                <el-input v-model="formSearch.sectionNo" style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.sectionNo" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in sectionNoList" :key="item" :label="item" :value="item"></el-option>
                              </el-select> -->
            </el-form-item>
            <el-form-item v-if="show == true" label="商家编码：" size="small">
                <el-input v-model="formSearch.merchantCode" style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.merchantCode" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in merchantCodeList" :key="item" :label="item" :value="item"></el-option>
                              </el-select> -->
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
        </el-form>

    </header>

    <section class="middle" :style="{minHeight:'690px'}">
        <!-- <div v-if="newTime !== null" style="float:left;position:relative;top:5px;">数据最新更新时间：{{this.newTime}}</div> -->
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 筛选列选项 -->
        <!-- <el-popover style="margin-top:-30px;float:left;"  placement="right" title="列筛选" trigger="click">
            <el-checkbox-group  v-model="titleArray" ref="currentRow">
                        <el-checkbox  v-for="(item,index) in  col"  :value="item.label" :label="item.label" :key="index" @change="handleCheckedCitiesChange(item)">{{item.label}}</el-checkbox>
            </el-checkbox-group>
              <el-button size="small" slot="reference"><i class="el-icon-arrow-down el-icon-menu"></i></el-button>
          </el-popover>   -->

        <div id="main" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <!-- 表格信息 -->
        <!-- <el-table :data="tableData" ref="table"  @row-click="showLog"  border row-key="id" align="left" size="mini" max-height="250"> -->
        <!-- <el-table-column  type="selection" width="55"> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                 <el-table-column v-for="(item, index) in formThead" v-if="item.tag"  :prop="item.prop" :key="index" :label="item.label"  align="center" min-width="120"show-overflow-tooltip>
                </el-table-column>
        </el-table> -->

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品列表" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
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
                    <el-table-column prop="discountTaxEx" label="优惠(不含税)" min-width="120" align="center" show-overflow-tooltip>
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
                    <el-table-column prop="paidTaxIn" label="已付(含税)" min-width="120" align="center" show-overflow-tooltip>
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
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>

    <!-- <section class="footer" style="margin-bottom:0px">
        
    </section> -->

</div>
</template>

<script>
import filters from '../../../filter/'
import{burypoint} from 'mixins/burypoint.js'
export default {
    mixins:[burypoint],
    data() {
        return {
            newTime: null,
            currentPageSummary: {
                amount: '- -', //应收金额
                qty: '- -', //数量
                post: '- -',
                otherAmount: '- -',
                goodsAmount: '- -',
                discount: '- -'
            },
            totalPageSummary: {
                amount: '- -',
                qty: '- -',
                post: '- -',
                otherAmount: '- -',
                goodsAmount: '- -',
                discount: '- -'
            },
            merchantCodeList: [],
            orderNoList: [],
            sectionNoList: [],
            delaiList: [], //明细
            statusList: ['收入', '退款',
                'JIT/JITX客退明细月度','JIT/JITX其他明细月度','JIT/JITX销售明细月度','JIT/JITX差异明细月度',
                'JIT/JITX活动折扣明细月度','JIT/JITX客退明细进度','JIT/JITX销售明细进度','JIT/JITX差异明细进度',
                'JIT/JITX活动折扣明细进度','MP订单明细月度','MP订单明细进度','OXO账单明细月度','OXO唯品会优惠明细月度',
                'OXO账单调整明细进度','OXO账单明细进度','OXO应收费用明细进度','OXO唯品会优惠明细进度'],
            activeName: 'first',
            logList: [], //日志
            billNo: '',
            show: false,
            zhan: false,

            col: [{
                    label: '更新时间',
                    prop: 'lastUpdated'
                },
                {
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
                    label: '单据类型',
                    prop: 'bizType'
                }, {
                    label: '原始单号',
                    prop: 'orderNo'
                }, {
                    label: '订单状态',
                    prop: 'orderStatus'
                },
                {
                    label: '发货状态',
                    prop: 'shipmentStatus'
                },
                {
                    label: '下单时间',
                    prop: 'orderTime'
                },
                {
                    label: '收件人',
                    prop: 'receiverName'
                },
                {
                    label: '地址',
                    prop: 'receiverAddress'
                },
                {
                    label: '手机',
                    prop: 'receiverPhone'
                },
                {
                    label: '物流公司',
                    prop: 'logisticsCompany'
                },
                {
                    label: '物流单号',
                    prop: 'logisticsNo'
                },
                {
                    label: '应收金额',
                    prop: 'amount'
                },
                {
                    label: '货品总量',
                    prop: 'qty'
                },
                {
                    label: '货品总额',
                    prop: 'goodsAmount'
                },
                {
                    label: '邮资',
                    prop: 'post'
                },
                {
                    label: '其他费用',
                    prop: 'otherAmount'
                },
                {
                    label: '优惠',
                    prop: 'discount'
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
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.shouldGetList
        }
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([1], {
            name: 1
        }, {
            name: 1
        })

    },
    destroyed() {
        this.$store.commit('clearShouldGetList')
    },
    methods: {
        getId(name) {
            for (let i = 0; i < this.platformOptions.length; i++) {
                if (this.platformOptions[i].name == name) {
                    return this.platformOptions[i].id
                }
            }
        },
        changebasicPlatformId(id) {
            // for(let i=)
            this.formSearch.person = ''
            console.log(id, '3456789')
            let data = {}
            data.platformId = this.getId(id)
            this.request('getBindingByPlatformId', data, true).then((res) => {
                if (res.code == 1) {
                    this.shopList = res.data
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
                    name: 'receivables',
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
                        {
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        // { field: 'id', caption: 'ID', size: '100px' },
                        {
                            field: 'lastUpdated',
                            caption: '更新时间',
                            size: '100px',
                            resizable: true
                        },
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
                            field: 'billNo',
                            caption: '账单ID',
                            size: '100px',
                            resizable: true
                        },
                        {
                            field: 'bizType',
                            caption: '单据类型',
                            size: '100px'
                        },
                        {
                            field: 'orderNo',
                            caption: '原始单号',
                            size: '100px'
                        },
                        {
                            field: 'orderStatus',
                            caption: '订单状态',
                            size: '100px'
                        },
                        {
                            field: 'shipmentStatus',
                            caption: '发货状态',
                            size: '100px'
                        },
                        {
                            field: 'orderTime',
                            caption: '下单时间',
                            size: '100px'
                        },
                        {
                            field: 'receiverName',
                            caption: '收件人',
                            size: '100px'
                        },
                        {
                            field: 'receiverAddress',
                            caption: '地址',
                            size: '100px'
                        },
                        {
                            field: 'receiverPhone',
                            caption: '手机',
                            size: '100px'
                        },
                        {
                            field: 'logisticsCompany',
                            caption: '物流公司',
                            size: '100px'
                        },
                        {
                            field: 'logisticsNo',
                            caption: '物流单号',
                            size: '100px'
                        },
                        {
                            field: 'amount',
                            caption: '应收金额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'qty',
                            caption: '货品总量',
                            size: '100px'
                        },
                        {
                            field: 'goodsAmount',
                            caption: '货品总额',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'post',
                            caption: '邮资',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'otherAmount',
                            caption: '其他费用',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'discount',
                            caption: '优惠',
                            size: '100px',
                            render:'money',
                        },
                        {
                            field: 'bizNo',
                            caption: '业务单据编码',
                            size: '100px'
                        },
                        {
                            field: 'bizDate',
                            caption: '业务单据日期',
                            size: '100px'
                        }
                    ],
                    onClick: function (event, obj) {
                        let orderId = null
                        self.currentPage = 1
                        self.$store.commit('clearReceivables')
                        w2ui['receivables'].records.map(function (item) {
                            if (obj.recid == item.recid) {
                                orderId = item.orderId
                            }
                        })
                        self.getLoglist(orderId)
                        self.getDetail(obj.recid)
                    }
                })
            });
            if (arr.length > 0) {
                $('#main').w2render('receivables');
                w2ui.receivables.clear(); //清空
                w2ui.receivables.records = arr
                w2ui.receivables.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    amount: currentPageSummary.amount,
                    qty: currentPageSummary.qty,
                    goodsAmount: currentPageSummary.goodsAmount,
                    post: currentPageSummary.post,
                    otherAmount: currentPageSummary.otherAmount,
                    discount: currentPageSummary.discount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span>合计</span>',
                    amount: totalPageSummary.amount,
                    qty: totalPageSummary.qty,
                    goodsAmount: totalPageSummary.goodsAmount,
                    post: totalPageSummary.post,
                    otherAmount: totalPageSummary.otherAmount,
                    discount: totalPageSummary.discount,
                })
                w2ui.receivables.refresh();
            } else {
                $('#main').w2render('receivables')
                w2ui.receivables.clear(); //清空
                w2ui['receivables'].records = []
                w2ui.receivables.refresh();
            }

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
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, false).then(res => {
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
            data.basicPlatformName = this.formSearch.code //平台
            data.basicCompanyName = this.formSearch.name
            data.basicStoreName = this.formSearch.person
            data.orderTime = this.formSearch.date
            data.bizType = this.formSearch.status
            data.orderNo = this.formSearch.orderNo
            data.sectionNo = this.formSearch.sectionNo
            data.merchantCode = this.formSearch.merchantCode
            data.billNo = this.formSearch.billNo
            this.request('receivable_page', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.data) {
                        for (let i = 0, len = res.data.data.length; i < len; i++) {
                            res.data.data[i].index =i+1
                            res.data.data[i].recid = res.data.data[i].id
                        }
                        this.initTable(res.data.data, res.data.currentPageSummary, res.data.totalPageSummary)
                        // this.hasData=true
                    } else {
                        //  this.initTable([])
                        this.initTable()
                        console.log('78')
                    }
                    this.total = res.data.count;
                    // this.initTable(res.data.data)
                    this.tableData = res.data.data;
                    res.data.currentPageSummary ? this.currentPageSummary = res.data.currentPageSummary : this.currentPageSummary = {
                        amount: '- -',
                        qty: '- -',
                        post: '- -'
                    }
                    res.data.totalPageSummary ? this.totalPageSummary = res.data.totalPageSummary : this.totalPageSummary = {
                        amount: '- -',
                        qty: '- -',
                        post: '- -'
                    }
                    // this.totalageSummary = res.data.totalageSummary
                    this.newTime = res.data.lastUpdateTime
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
                        this.$store.commit('initReceivables', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initReceivables', this.logList)
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
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        //货品明细
        getDetail(id) {
            let data = {}
            data.accReceivableId = id
            this.request('receivable_detail', data, false).then(res => {
                if (res.code == '1') {
                    this.$store.commit('increment', res.data)
                }
            })
        },
        onSearch() {
            this.setBuryPoint('查询')
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

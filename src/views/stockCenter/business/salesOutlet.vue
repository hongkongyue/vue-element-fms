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
            <el-form-item label="仓库：" size="small">
                <el-select v-model="formSearch.warehouse" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.themID" placeholder="请输入"  style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.themCode" placeholder="请输入"  style="width:150px"></el-input>
            </el-form-item>
             <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="平台单号：" size="small">
                <el-input style="width:180px" placeholder="请输入"  v-model="formSearch.platformNo"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="业务类型：" size="small">
                <el-select v-model="formSearch.busType" filterable placeholder="请选择" style="width:160px">
                    <el-option v-for="item in busTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="公司：" size="small">
                <el-select v-model="formSearch.basicCompanyName" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item v-if="show == true" label="单据时间：" size="small">
                <el-date-picker :clearable="false"
                  v-model="dateRange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"  style="width:240px" placeholer="请选择">
                </el-date-picker>
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
        <div id="salesOutlet" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicPlatformName" label="平台" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="originalOrderNo" label="原始单号" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="outNo" label="子单号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsShortName" label="货品简称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderCount" label="下单数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="actualSendCount" label="实发数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="markAmount" label="标价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.markAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="discountAmount" label="优惠" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.discountAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="dealAmount" label="成交价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.dealAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="taxAcceptedAmount" label="已付" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxAcceptedAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="acceptedAmount" label="已付（不含税）" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.acceptedAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="taxSaleAmount" label="销售额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxSaleAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="saleAmount" label="销售额（不含税）" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.saleAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="excludingTaxPurchaseUnitPrice" label="成本价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.excludingTaxPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="taxRate" label="税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
           </el-tabs>
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
        
    </section> -->
</div>
</template>

<script>
let goodsList = []
    import filter from '../../../filter/'
export default {
    name:'timelyComponent',
    data() {
        return {
            busTypeList:[],
            warehouseList:[],
            brandList:[],
            select: '',
            list: [], //编辑存储列表
             activeName:'first',
            loading: false,
            show: false,
            shopList: [],
            themList: [],
            formSearch: {
                code: '',
                name: '',
                person: '',
            },
            logList:[],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            dateRange:[]
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.salesOutList
        }
    },
    destroyed() {
        this.$store.commit('clearSalesOut')
    },
    mounted() {
        this.getWarehouseList()
        this.getCompany()
        this.getBusType()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])
        this.setdateRange()
    },
    methods: {
        setdateRange(){
                this.dateRange=[new Date((new Date().getTime()-30*24*60*60*1000)),new Date()]
                console.log(this.dateRange,'09090')
        },
        getWarehouseList(){
            this.request('masterData_warehouse_selector', {}, true).then(res => {
                if (res.code == 1) {
                     this.warehouseList=res.data    
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
        initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#salesOutlet').w2grid({
                    name: 'salesOutlet',
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
                            size: '100px',
                            sortable: true,
                            info:true
                        },
                        {
                            field: 'bizCode',
                            caption: '单据编号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'bizType',
                            caption: '单据类型',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'busType',
                            caption: '业务类型',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
                            size: '130px'
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '130px'
                        },
                         {
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '130px'
                        },
                        {
                            field: 'receiverName',
                            caption: '收件人',
                            size: '130px'
                        },
                        {
                            field: 'receiverAddress',
                            caption: '收货地址',
                            size: '130px'
                        },
                          {
                            field: 'receiverMobile',
                            caption: '手机',
                            size: '130px'
                        },
                        {
                            field: 'receiverTelno',
                            caption: '座机',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'outNo',
                            caption: '外部系统单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicWarehouseName',
                            caption: '仓库',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'outOrderNo',
                            caption: '平台单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'logisticsName',
                            caption: '物流公司',
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
                            field: 'goodsQty',
                            caption: '货品数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'taxAcceptedAmount',
                            caption: '已付总额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'acceptedAmount',
                            caption: '已付总额（不含税）',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'taxSaleAmount',
                            caption: '销售总额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'saleAmount',
                            caption: '销售总额(不含税)',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'postAmount',
                            caption: '邮资',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'discountAmount',
                            caption: '优惠',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'otherFeeAmount',
                            caption: '其它费用',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'payTime',
                            caption: '付款时间',
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
                            field: 'stockOutTime',
                            caption: '发货时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        goodsList = []
                        let record = this.get(event.recid)
                        setTimeout(function(){
                            if(w2ui.salesOutlet.getSelection().length == 1){
                                let arr = w2ui.salesOutlet.getSelection()
                                if(arr[0] != record.id){
                                    self.$store.commit('clearSalesOut')
                                }else{
                                    self.getLoglist(event.recid)
                                self.currentPage = 1;
                                }
                            }else{
                                self.$store.commit('clearSalesOut')
                            }
                        })
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.salesOutlet.clear(); //清空
                w2ui.salesOutlet.records = arr
                $('#salesOutlet').w2render('salesOutlet');
                w2ui.salesOutlet.refresh();
            } else {
                 $(document).ready(function(){
                            $('#salesOutlet').w2render('salesOutlet');
                            w2ui['salesOutlet'].records = []
                            w2ui.salesOutlet.clear()
                            w2ui.salesOutlet.refresh();
                 })
            }

        },
        //子表明细
        getLoglist(id){
            let data = {}
            data.bizSoOutId = id
            this.request('bizStockOut_detail_page', data, true).then(res => {
                if (res.code == '1') {
                    // goodsList = res.data.records
                    this.$store.commit('salesOut', res.data.records)
                }
            })
        },
        //导出
        onImport(){
            let data = {}
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
             this.formSearch = {}
             this.setdateRange()
            // this.initTable([])
        },
        //公司
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        //品牌  
        getBrandList(){
                 let data={}
                    this.request('masterData_brand_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
        },
        //业务类型
        getBusType(){
            let data={bizType:'销售出库'}
                    this.request('businessType_all', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.busTypeList=res.data.records
                            }
                        }) 
        },
        //账单类型
        getThemID() {
            let data = {}
            this.request('received_orderType_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.themList = res.data
                }
            })
        },

        getData() {
            this.$store.commit('clearSalesOut')
            this.loading = true;
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicWarehouseId = this.formSearch.warehouse//仓库id
            data.goodsNo = this.formSearch.themID//货品编码
            data.merchantCode = this.formSearch.themCode //商家编码
            data.basicBrandId = this.formSearch.brand//品牌id
            data.outOrderNo = this.formSearch.platformNo//平台单号
            data.basicCompanyId = this.formSearch.basicCompanyName //公司Id
            data.busType = this.formSearch.busType//业务类型
            data.startDate=filter.get_year_month_day(this.dateRange[0])
            data.endDate=filter.get_year_month_day(this.dateRange[1])
            data.bizType = '销售出库'
            this.request('bizStockOut_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records, res.data.perAmount, res.data.totalAmount)
                    } else {
                        this.initTable([])
                    }

                    this.loading = false
                    //   this.perAmount = res.data.perAmount
                    //   this.totalAmount = res.data.totalAmount
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
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
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
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
</style>

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
                <el-select v-model="formSearch.wareHouse" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.themID" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.themCode" style="width:150px"></el-input>
            </el-form-item>
             <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="平台单号：" size="small">
                <el-input style="width:180px" placeholder="请输入"  v-model="formSearch.platform"></el-input>
            </el-form-item> -->
            <el-form-item label="业务类型：" size="small">
               <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:110px">
                    <el-option v-for="item in busTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据时间：" size="small">
                <el-date-picker :clearable="false"
                  v-model="dateRange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"  style="width:280px" placeholer="请选择">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </header>

    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="outStock" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderCount" label="数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="excludingTaxPurchaseUnitPrice" label="成本价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.excludingTaxPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="purchaseAmount" label="成本" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.purchaseAmount|moneyFilters}}</template>
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
import filter from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    name:'timelyComponent',
    data() {
        return {
            wareHouseList:[],
            brandList:[],
            busTypeList:[],
            input3: '',
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
            dateRange:[],
            // goodsList :[]
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.otherOutStockList
        }
    },
    destroyed() {
        this.$store.commit('clearotherOutStock')
    },
    created() {
        this.request('masterData_warehouse_selector', {}, true).then(res => {
            if (res.code == 1) {
                this.wareHouseList = res.data
            }
        })
        this.request('masterData_brand_selector', {}, false).then(res => {
            if (res.code == 1) {
                this.brandList = res.data
            }
        })
        this.request('businessType_all', {bizType:'其它出库'}, true).then((res) => {
            if (res.code == 1) {
                this.busTypeList = res.data.records
            }
        })
    },
    mounted() {
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])
        this.setdateRange()
    },
    methods: {
        setdateRange(){
                this.dateRange=[new Date((new Date().getTime()-30*24*60*60*1000)),new Date()]
                console.log(this.dateRange,'09090')
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
                $('#outStock').w2grid({
                    name: 'otherOutStock',
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
                            field: 'basicCompanyName',
                            caption: '公司主体',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'outNo',
                            caption: '外部单号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicWarehouseName',
                            caption: '仓库',
                            size: '130px'
                        },
                        {
                            field: 'sourceOrderNo',
                            caption: '源单号',
                            size: '130px'
                        },
                         {
                            field: 'logisticsName',
                            caption: '物流公司',
                            size: '130px'
                        },
                        {
                            field: 'logisticsNo',
                            caption: '物流单号',
                            size: '130px'
                        },
                          {
                            field: 'receiverName',
                            caption: '联系人',
                            size: '130px'
                        },
                        {
                            field: 'basicSupplierCode',
                            caption: '供应商编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'goodsQty',
                            caption: '货品数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'purchaseAmount',
                            caption: '总成本',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'createUser',
                            caption: '创建人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'stockOutTime',
                            caption: 'OMS创建时间',
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
                            field: 'remark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        let record = this.get(event.recid);
                        setTimeout(function(){
                            if(w2ui.otherOutStock.getSelection().length == 1){
                                let arr = w2ui.otherOutStock.getSelection()
                                if(arr[0] != record.id){
                                    self.$store.commit('clearotherOutStock')
                                }else{
                                    self.getOrderList(event.recid)
                                    self.currentPage = 1;
                                }
                            }else{
                                self.$store.commit('clearotherOutStock')
                            }
                        })
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.otherOutStock.clear(); //清空
                w2ui.otherOutStock.records = arr
                $('#outStock').w2render('otherOutStock');
                w2ui.otherOutStock.refresh();
            } else {
                 $(document).ready(function(){
                            $('#outStock').w2render('otherOutStock');
                            w2ui['otherOutStock'].records = []
                            w2ui.otherOutStock.clear()
                            w2ui.otherOutStock.refresh();
                 })
            }

        },
         //明细
        getOrderList(code) {
            let data = {}
            data.bizSoOutId = code
            this.request('bizStockOut_detail_page', data, true).then(res => {
                if (res.code == 1) {
                    // this.delaiList = res.data.records
                    this.$store.commit('otherOutStock', res.data.records)
                }
            })
        },
        onReset() {
            this.formSearch = {}
            this.setdateRange()
            // this.initTable([])
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
            this.$store.commit('clearotherOutStock')
            this.loading = true;
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.bizType = '其它出库'
            data.basicWarehouseId = this.formSearch.wareHouse //仓库ID
            // data.outOrderNo = this.formSearch.platform //平台单号
            data.busType = this.formSearch.code //业务类型
            data.basicBrandId = this.formSearch.person //品牌ID
            data.merchantCode = this.formSearch.themCode //商家编码
            data.goodsNo = this.formSearch.themID //货品编码
            data.startDate=filter.get_year_month_day(this.dateRange[0])
            data.endDate=filter.get_year_month_day(this.dateRange[1])
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
                        type: 'warning'
                    });
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

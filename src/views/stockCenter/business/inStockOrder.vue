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
            <el-form-item label="调出仓库：" size="small">
                <el-select v-model="formSearch.transferOutWarehouseId" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调入仓库：" size="small">
                <el-select v-model="formSearch.transferInWarehouseId" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.basicBrandId" placeholder="请选择" style="width:150px" filterable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平台单号：" size="small">
                <el-input style="width:180px" placeholder="请输入" v-model="formSearch.outOrderNo"></el-input>
            </el-form-item>
             <el-form-item label="调出状态：" size="small">
                <el-select v-model="formSearch.transferOutStatus" filterable placeholder="请选择" style="width:110px">
                    <el-option label="待调出" value="待调出"></el-option>
                    <el-option label="部分调出" value="部分调出"></el-option>
                    <el-option label="全部调出" value="全部调出"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调入状态：" size="small">
                <el-select v-model="formSearch.transferInStatus" filterable placeholder="请选择" style="width:110px">
                    <el-option label="待调入" value="待调入"></el-option>
                    <el-option label="部分调入" value="部分调入"></el-option>
                    <el-option label="全部调入" value="全部调入"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>

    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="StockOrder" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="outNo" label="子单号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planTransferNum" label="计划调拨数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="transferOutNum" label="实际调出数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="transferInNum" label="实际调入数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="differenceNum" label="差异数" min-width="120" align="center" show-overflow-tooltip>
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
import { mapState } from 'vuex'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    name: 'inStockOrder',
    data() {
        return {
            statusList: [{
                id: 1,
                name: '调入状态'
            }, {
                id: 0,
                name: '调出状态'
            }],
            activeName: 'first',
            show: false,
            formSearch: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            wareHouseList: [],
            brandList: []
        }
    },
   computed: mapState({
                goodsList  : state => state.inStockOrder.goodsList,
      }),
    destroyed() {
        this.$store.commit('clearinStockOrderList')
    },
    mounted() {
            this.request('masterData_warehouse_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.wareHouseList = res.data
                }
            })
            this.request('masterData_brand_selector', {}, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
            this.getButtonJurisdiction() //按钮权限
            this.initTable([])
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
        initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#StockOrder').w2grid({
                    name: 'inStockOrder',
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
                            caption: '调拨单号',
                            size: '130px',
                            sortable: true
                        },

                        {
                            field: 'outOrderNo',
                            caption: '平台单号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'sourceOrderNo',
                            caption: '源单号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'bizType',
                            caption: '业务类型',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'transferOutStatus',
                            caption: '调出状态',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'transferInStatus',
                            caption: '调入状态',
                            size: '130px'
                        },
                        {
                            field: 'transferOutWarehouseName',
                            caption: '调出仓库',
                            size: '130px',
                            sortable: true
                        },

                        {
                            field: 'transferInWarehouseName',
                            caption: '调入仓库',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'planTransferTotalNum',
                            caption: '调拨总数',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'transferOutTotalNum',
                            caption: '实际调出总数',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'transferInTotalNum',
                            caption: '实际调入总数',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'differenceTotalNum',
                            caption: '总差异数',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'purchaseAmount',
                            caption: '成本',
                            size: '130px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'reviewed',
                            caption: '审核时间',
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
                            if(w2ui.inStockOrder.getSelection().length == 1){
                                let arr = w2ui.inStockOrder.getSelection()
                                if(arr[0] != record.id){
                                    self.$store.commit('clearinStockOrderList')
                                }else{
                                    self.getLoglist(event.recid)
                                }
                            }else{
                                self.$store.commit('clearinStockOrderList')
                            }
                        })
                        
                        // self.$store.commit('clearreceipt')
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.inStockOrder.clear(); //清空
                w2ui.inStockOrder.records = arr
                $('#StockOrder').w2render('inStockOrder');
                w2ui.inStockOrder.refresh();
            } else {
                $(document).ready(function () {
                    $('#StockOrder').w2render('inStockOrder');
                    w2ui['inStockOrder'].records = []
                    w2ui.inStockOrder.clear()
                    w2ui.inStockOrder.refresh();
                })
            }

        },
        onReset() {
            for(let i in this.formSearch){
                 this.formSearch[i]=''
            }
            // this.initTable([])
            // this.$store.commit('clearinStockOrderList')
        },
          //子表明细
        getLoglist(id){
            let data = {}
                data.bizTransferOrderId = id
            this.request('stocks_bizTransferOrder_detail_page', data, true).then(res => {
                if (res.code == 1) {
                    this.$store.commit('getinStockOrderList', res.data.records)
                }
            })
        },
        getData() {
            this.$store.commit('clearinStockOrderList')
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.transferOutWarehouseId = this.formSearch.transferOutWarehouseId
            data.transferInWarehouseId = this.formSearch.transferInWarehouseId
            data.basicBrandId = this.formSearch.basicBrandId
            data.outOrderNo = this.formSearch.outOrderNo
            data.transferOutStatus = this.formSearch.transferOutStatus
            data.transferInStatus = this.formSearch.transferInStatus
            this.request('stocks_bizTransferOrder_page', data, true).then(res => {
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
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
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

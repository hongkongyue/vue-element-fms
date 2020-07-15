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
                <el-select v-model="formSearch.basicWarehouseId" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.goodsNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.merchantCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品牌" size="small">
                              <el-select v-model="formSearch.basicBrandId" placeholder="请选择" style="width:150px"   filterable >
                                  <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
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
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="outStock" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="actualSendCount" label="数量" min-width="120" align="center" show-overflow-tooltip>
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
import filter from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    name: 'noSingerReturnComponent',
    data() {
        return {
            dateRange:[],
            orderTypeList: [],
            brandList: [],
            select: '',
            list: [], //编辑存储列表
            activeName: 'first',
            wareHouseList:[],
            loading: false,
            show: false,
            shopList: [],
            themList: [],
            formSearch: {
            },
            logList    : [],
            total      : 0,
            pagesize   : 1000,
            currentPage: 1,
            judgeMenu  : [],
            buttonList : [], //按钮权限
        }
    },
    computed: mapState({
                goodsList  : state => state.noSingerReturn.goodsList,
      }),
    destroyed() {
        this.$store.commit('clearnoSingerReturnList')
    },
    mounted() {
          this.request('masterData_warehouse_selector', {}, true).then(res => {
                if (res.code == 1) {
                     this.wareHouseList=res.data    
                }
        })
        this.getCompany()
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
                    name: 'inStock',
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
                            field: 'outNo',
                            caption: '外部单号',
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
                            field: 'basicWarehouseName',
                            caption: '仓库',
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
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'receiverName',
                            caption: '客户姓名',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'receiverMobile',
                            caption: '客户电话',
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
                            field: 'purchaseAmount',
                            caption: '总成本',
                            size: '100px',
                            render:'money',
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
                        var record = this.get(event.recid)
                        setTimeout(function(){
                            if(w2ui.inStock.getSelection().length == 1){
                                let arr = w2ui.inStock.getSelection()
                                if(arr[0] != record.id){
                                    self.$store.commit('clearnoSingerReturnList')
                                }else{
                                   self.getOrderList(event.recid)
                                self.currentPage = 1;
                                }
                            }else{
                                self.$store.commit('clearnoSingerReturnList')
                            }
                        })
                        // self.getOrderList(event.recid)
                        // self.currentPage = 1;
                        // self.$store.commit('clearreceipt')
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.inStock.clear(); //清空
                w2ui.inStock.records = arr
                $('#outStock').w2render('inStock');
                w2ui.inStock.refresh();
            } else {
                $(document).ready(function () {
                    $('#outStock').w2render('inStock');
                    w2ui['inStock'].records = []
                    w2ui.inStock.clear()
                    w2ui.inStock.refresh();
                })
            }

        },
        //明细
        getOrderList(code) {
             let data = {}
                 data.bizStockInId = code
            this.request('core_bizStockIn_noBillsRefund_getDetails', data, true).then(res => {
                if (res.code == 1) {
                    this.$store.commit('getnoSingerReturnList', res.data)
                }
            })
        },
        //导出
        onImport() {
            this.setBuryPoint('导出')
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
            for(let i in this.formSearch){
                this.formSearch[i]=''
            }
            this.setdateRange()
            // this.$store.commit('clearnoSingerReturnList')
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
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
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
            this.$store.commit('clearnoSingerReturnList')
            let data = {}
                data.pageSize          =  this.pagesize
                data.currentPage       =  this.currentPage
                data.goodsNo           =  this.formSearch.goodsNo //平台名称
                data.basicWarehouseId  =  this.formSearch.basicWarehouseId //期间
                data.basicBrandId      =  this.formSearch.basicBrandId
                data.merchantCode      =  this.formSearch.merchantCode //财务类型
                data.bizType='销售出库'
                data.startDate=filter.get_year_month_day(this.dateRange[0])
                data.endDate=filter.get_year_month_day(this.dateRange[1])
            this.request('core_bizStockIn_noBillsRefund_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.total;
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

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
                <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- v-if="show == true" -->
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.goodsCode" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.themCode" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item label="库存日期：" size="small">
                <el-date-picker v-model="formSearch.days"  type="date" placeholder="选择日期" style="width:150px">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item> -->
           
        </el-form>
    </header>

    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>
</div>
</template>

<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    data() {
        return {
            wareHouseList:[],
            brandList:[],
            input3: '',
            select: '',
            list: [], //编辑存储列表
            loading: false,
            show: false,
            shopList: [],
            themList: [],
            formSearch: {
                code: '',
                name: '',
                person: '',
                days:new Date()
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.receiptList
        }
    },
    destroyed() {
        this.$store.commit('clearreceipt')
    },
    created(){
           
            this.request('masterData_warehouse_selector', {}, true).then(res => {
                if (res.code == 1) {
                     this.wareHouseList=res.data    
                }
            })
           this.request('masterData_brand_selector', {}, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
    },
    mounted() {
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
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
                $('#main').w2grid({
                    name: 'historical',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        // lineNumbers: true,
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
                            field: 'bizDate',
                            caption: '库存日期',
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
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicBrandName',
                            caption: '品牌',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '货品编码',
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
                            field: 'goodsName',
                            caption: '货品名称',
                            size: '100px'
                        },
                        {
                            field: 'specificationName',
                            caption: '规格名称',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'kinds',
                            caption: '品类',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'initQty',
                            caption: '期初库存',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'outQty',
                            caption: '当天出库总数',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'inQty',
                            caption: '当天入库总数',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'qty',
                            caption: '期末库存',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'avgCost',
                            caption: '成本价',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        // self.getLoglist(event.recid)
                        // self.currentPage = 1;
                        // self.$store.commit('clearreceipt')
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.historical.clear(); //清空
                w2ui.historical.records = arr
                // w2ui.historical.records.push({
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span>当页小计</span>',
                //     billAmount: current,
                // }, {
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span >合计</span>',
                //     billAmount: total,
                // })
                $('#main').w2render('historical');
                w2ui.historical.refresh();
            } else {
                $(document).ready(function(){
                w2ui.historical.clear(); //清空
                w2ui['historical'].records = []
                w2ui.historical.refresh();
                $('#main').w2render('historical')
                })
            }

        },
        resetTable() {},
        onReset() {
            this.formSearch = {
                code: '',
                name: '',
                person: '',
                days:new Date()
            }
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
            this.loading = true;
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.type = 1
            data.basicBrandId = this.formSearch.brand //品牌ID
            data.goodsNo = this.formSearch.goodsCode //货品编码
            data.merchantCode = this.formSearch.themCode //商家编码
            data.basicWarehouseId = this.formSearch.code //仓库
            data.bizDate = filters.get_year_month_day(this.formSearch.days)//库存日期
            this.request('historyCoreStock_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
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
        onImport(){
            let data = {}
            data.type = 1
            data.basicBrandId = this.formSearch.brand //品牌ID
            data.goodsNo = this.formSearch.goodsCode //货品编码
            data.merchantCode = this.formSearch.themCode //商家编码
            data.basicWarehouseId = this.formSearch.code //仓库
            data.bizDate = this.formSearch.days //库存日期
            this.request('core_core_export', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
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
                                // message: res.data.subTitle,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle :"下载链接"),
                                ]),
                                // showClose: false,
                                duration: 0,
                            })
                            this.cleanKey(key)

                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                            // clearTimeOut(this.timeAA);
                            // this.cleanTime()

                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
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
        if(url.indexOf('[') == -1){
          console.log('没有地址')
        }else{
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

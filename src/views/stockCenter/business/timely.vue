<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button  size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onImport">导出</el-button>
            </el-form-item>
            </div>
            <el-form-item label="仓库：" size="small">
                <el-select v-model="formSearch.basicWarehouseId" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                              <el-select v-model="formSearch.basicBrandId" placeholder="请选择" style="width:150px"   filterable>
                                  <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
            </el-form-item>
            <!-- v-if="show == true" -->
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.goodsNo" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.merchantCode" style="width:150px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="在库数：" size="small" v-if="false">
                <el-input style="width:180px" placeholder="请输入" v-model="formSearch.type" class="input-with-select">
                    <el-select style="width:78px" v-model="formSearch.type" slot="prepend" placeholder="">
                        <el-option label="不限" value="0"></el-option>
                        <el-option label="<" value="1"></el-option>
                        <el-option label="=" value="2"></el-option>
                        <el-option label=">" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-form-item> -->
             <el-form-item label="公司" size="small"   prop="company" >
                                    <el-select v-model="formSearch.basicCompanyId" placeholder="请选择" style="width:150px" filterable>
                                        <el-option v-for="v in companyList" :key="v.id" :disabled="v.used==0"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
            </el-form-item>
            
        </el-form>
    </header>

    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="timelyComponent" style="width: 100%; height: 400px;"></div>
    </section>
</div>
</template>

<script>
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    name:'timelyComponent',
    data() {
        return {
                input3: '',
                select: '',
                list: [], //编辑存储列表
                loading: false,
                show: false,
                shopList: [],
                wareHouseList:[],//仓库列表
                themList: [],
                brandList:[],
                formSearch: {
                    code: '',
                    name: '',
                    person: '',
                },
                total      : 0,
                pagesize   : 1000,
                currentPage: 1,
                judgeMenu  : [],
                companyList:[],//公司列表
                buttonList : [], //按钮权限
        }
    },
    computed: {
        // goodsList() {
        //     return this.$store.state.app.receiptList
        // }
    },
    destroyed() {
        // this.$store.commit('clearreceipt')
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
           this.request('masterData_company_selector', {}, true).then((res) => {
                            if (res.code == 1) {
                                  this.companyList=res.data
                            }
                        }) 
    },
    mounted() {
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
                $('#timelyComponent').w2grid({
                    name: 'timely',
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
                            field: 'basicWarehouseName',
                            caption: '仓库',
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
                            field: 'basicBrandName',
                            caption: '品牌',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '货品编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '商家编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'goodsName',
                            caption: '货品名称',
                            size: '130px'
                        },
                        {
                            field: 'specificationName',
                            caption: '规格名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'kinds',
                            caption: '品类',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'qty',
                            caption: '在库数',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'averageCost',
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
                w2ui.timely.clear(); //清空
                w2ui.timely.records = arr
                $('#timelyComponent').w2render('timely');
                w2ui.timely.refresh();
            } else {
                 $(document).ready(function(){
                            $('#timelyComponent').w2render('timely');
                            w2ui['timely'].records = []
                            w2ui.timely.clear()
                            w2ui.timely.refresh();
                 })
            }

        },
        onReset() {
            this.formSearch = {}
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
                data.basicCompanyId = this.formSearch.basicCompanyId 
                data.basicBrandId = this.formSearch.basicBrandId 
                data.goodsNo = this.formSearch.goodsNo 
                data.merchantCode = this.formSearch.merchantCode 
                data.basicWarehouseId = this.formSearch.basicWarehouseId 
                data.type = 0
            this.request('core_realCoreStock_page', data, true).then(res => {
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
        //导出
        onImport(){
                        let data={}
                            data.basicCompanyId = this.formSearch.basicCompanyId 
                            data.basicBrandId = this.formSearch.basicBrandId 
                            data.goodsNo = this.formSearch.goodsNo 
                            data.merchantCode = this.formSearch.merchantCode 
                            data.basicWarehouseId = this.formSearch.basicWarehouseId 
                            data.type = 0
                      this.request('core_core_export', data, false).then(res => {

                        if (res.code == 1) {
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
</style>

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
                <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
                    <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            
        </el-form>
    </header>

    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="outStock" style="width: 100%; height: 400px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicPlatformName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="skuName" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="skuShortName" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="subOrderNo" label="数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="financialType" label="成本价" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="总金额" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sectionNo" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
           </el-tabs>
    </section>
</div>
</template>

<script>
export default {
    name:'timelyComponent',
    data() {
        return {
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
            goodsList :[]
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
                            field: 'basicCompanyName',
                            caption: '单据编号',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicStoreName',
                            caption: '单据类型',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'merchantOrderNo',
                            caption: '业务类型',
                            size: '130px',
                            sortable: true
                        },
                         {
                            field: 'billNo',
                            caption: '公司',
                            size: '130px',
                            sortable: true
                        },
                         {
                            field: 'billNo',
                            caption: '状态',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '外部单号',
                            size: '130px'
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '仓库',
                            size: '130px'
                        },
                         {
                            field: 'merchantChildOrderNo',
                            caption: '源单号',
                            size: '130px'
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '货品数量',
                            size: '130px'
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '总成本',
                            size: '130px',
                            render:'money',
                        },
                          {
                            field: 'merchantChildOrderNo',
                            caption: '总金额',
                            size: '130px',
                            render:'money',
                        },
                        {
                            field: 'orderTime',
                            caption: '创建人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '审核人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '创建时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        self.getLoglist(event.recid)
                        self.currentPage = 1;
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
                 $(document).ready(function(){
                            $('#outStock').w2render('inStock');
                            w2ui['inStock'].records = []
                            w2ui.inStock.clear()
                            w2ui.inStock.refresh();
                 })
            }

        },
        onReset() {
            this.formSearch = {}
            // this.initTable([])
        },
        getData() {
            this.loading = true;
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformName = this.formSearch.code //平台名称
            data.period = this.formSearch.time //期间
            data.basicCompanyName = this.formSearch.name //公司名称
            data.basicStoreName = this.formSearch.person //店铺名称
            data.dataSource = this.formSearch.dataSource //来源
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID
            data.financialType = this.formSearch.cwlx //财务类型
            data.status = this.formSearch.nbhxStatus //状态
            this.request('accReceived_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;

                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
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

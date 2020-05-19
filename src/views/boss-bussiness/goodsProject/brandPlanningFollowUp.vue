<template>
<div>
    <header class="headerstyle">
        <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-form v-if="!showhidden" :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </div>
            
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="季节：" size="small">
                <el-select v-model="formSearch.season" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份：" size="small">
                <el-date-picker v-model="formSearch.years" type="year" style="width:150px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="波段：" size="small">
                <el-select v-model="formSearch.waveBand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in waveList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="maxHeight">
        <el-row>
            <el-col :span="24">
                <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table :data="tableData" style="width: 100%" @row-click="clickRow" border tooltip-effect="dark" :height="oneTableHeight" size="mini">
                            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                            <el-table-column prop="basicBrandName" label="品牌名称" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="season" label="季节" align="center" min-width="120" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="years" label="年份" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="waveBand" label="波段" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningDevelopDate" label="规划开发日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningDeliverDate" label="规划交接日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="colorSimpleDate" label="齐色样日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningArriveDate" label="规划到货日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="photoDate" label="拍照日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningLaunchDate" label="可上新日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="launchDate" label="上新日期" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="developStyleQty" label="开发款数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>

                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="开发明细" name="first">
                        <el-table :data="oneLsit" style="width: 100%" border tooltip-effect="dark" :max-height="twoTableHeight" size="mini">
                            <el-table-column prop="finishStyleQty" label="已开发款数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningDevelopPostponeDate" label="设计稿延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="fillingPostponeDay" label="建档延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstSimplePostponeDay" label="头版样衣指令延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="designerPostponeDay" label="设计师下单延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="simpleCreatePostponeDay" label="拍摄样指令延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="unPricingStyleQty" label="大货未核价款数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderStyleQty" label="下单款数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstColorQty" label="下单色数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstQty" label="下单数量" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstAmount" label="下单金额" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderTotalAmount" label="规划开发金额" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="diffAmount" label="金额差异" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="diffCostAmount" label="成本差异" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchasePostponeDay" label="入库延期天数" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseQty" label="入库数量" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseAmount" label="入库金额" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </section>
</div>
</template>

<script>
import {
    commonMixins
} from 'mixins/common';
import {
    debounce
} from 'mixins/debounce'
import Util from 'libs/util'
export default {
    mixins: [commonMixins, debounce],
    data() {
        return {
            activeName:'first',
            oneList:[],
            w2uiHeight: '',
            oneTableHeight: '',
            twoTableHeight: '',
            showhidden: false,
            formSearch: {},
            maxHeight: '',
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            oneLsit:[],
        }
    },
    created(){
        if (document.body.offsetHeight > 800) {

            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
            this.oneTableHeight = (document.body.offsetHeight - 300) * 0.6
            this.twoTableHeight = (document.body.offsetHeight - 300) * 0.3
            this.w2uiHeight = 'height:' + (document.body.offsetHeight - 300) * 0.6 + 'px;width:100%'
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
        } else {
            this.w2uiHeight = 'height:' + (document.body.offsetHeight - 300) * 0.5 + 'px;width:100%'
            this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
        }
    },
    mounted() {
        this.getBrandList()
        this.getwaveList()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        handleShowHidden(name) {
            console.log(name, '000')
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 170) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 170) * 0.25
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 220) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 220) * 0.25
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
                }
            }
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
        //主表数据接口
        getData() {
            this.oneLsit = []
            let data = {}
            data.basicBrandId = this.formSearch.brand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('pageBrandFollow', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.total
                    this.tableData = res.data.records
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //查询明细
        clickRow(row){
            this.oneLsit = [row]
        },
        //导出
        onExport(){
            let data = {}
            data.basicBrandId = this.formSearch.brand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            this.request('exportBrandFollow', data, true).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        
        //查询
        onSearch() {
            this.currentPage = 1
            this.getData()
        },
        //重置
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

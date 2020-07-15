<template>
<div>
    <header class="headerstyle" v-if="!showhidden">
        <!-- <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div> -->
        <el-form  :inline="true" :model="formSearch" class="demo-form-inline " style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
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
            <el-form-item label="二级品类：" size="small">
                <el-select v-model="formSearch.secondLevelname" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in secondLevel" :key="item.secondLevel" :label="item.secondLevel" :value="item.secondLevel"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设计款号：" size="small">
                <el-input v-model="formSearch.designNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
        </el-form>

    </header>
    <section class="middle" :style="maxHeight">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-row>
            <el-col :span="24">
                <el-pagination style="text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table :data="tableData" style="width: 100%" border @row-click="clickRow" tooltip-effect="dark" :height="oneTableHeight" size="mini">
                    <el-table-column type="index" width="55" label="序号" fixed="left" align="center"></el-table-column>
                    <el-table-column prop="basicBrandName" sortable fixed="left" label="品牌名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="years" label="年份" fixed="left" sortable align="center" min-width="80" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="season" label="季节" fixed="left" sortable min-width="80" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="waveBand" label="波段" fixed="left" sortable min-width="80" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="designNo" label="设计款号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="designer" label="设计师" sortable min-width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="firstLevel" label="一级品类" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="secondLevel" label="二级品类" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="thirdLevel" label="三级品类" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="developType" label="开发类型" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="factoryName" label="外发工厂" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="designDate" label="设计稿日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="fillingDate" label="建档时间" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningDevelopDate" label="规划开发日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningDeliverDate" label="规划交接日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="colorSimpleDate" label="齐色样日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningArriveDate" label="规划到货日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="photoDate" label="拍照日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningLaunchDate" label="可上新日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="launchDate" label="上新日期" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column prop="developStyleQty" label="开发款数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column prop="planningDelay" label="规划延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="fillingDelay" label="建档延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="remark" sortable label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="开发样衣" name="first">
                        <el-table :data="oneList" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column label="" align="center" min-width="120" show-overflow-tooltip>
                                <el-table-column prop="planningDeliverDate" label="规划交接日期" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="头版样衣" align="center" min-width="120" show-overflow-tooltip>
                                <el-table-column prop="bomCreateDate" label="BOM指令创建时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="bomFinishDate" label="BOM完成时间" sortable min-width="130" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="firstSimpleCreateDate" label="样衣指令创建时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="firstSimpleFinishDate" label="样衣完成时间" sortable min-width="130" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="firstSimpleCreateDelay" label="样衣指令延期天数" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="firstSimpleFinishDelay" label="样衣完成延期天数" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="二版样衣" align="center" min-width="120" show-overflow-tooltip>
                                <el-table-column prop="secondSimpleCreateDate" label="样衣指令创建时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="secondSimpleFinishDate" label="样衣完成时间" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="secondSimpleCreateDelay" label="样衣指令延期" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="secondSimpleFinishDelay" label="样衣完成延期" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="三版样衣" align="center" min-width="120" show-overflow-tooltip>
                                <el-table-column prop="thirdSimpleCreateDate" label="样衣指令创建时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="thirdSimpleFinishDate" label="样衣完成时间" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="thirdSimpleCreateDelay" label="样衣指令延期" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="thirdSimpleFinishDelay" label="样衣完成延期" sortable min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="warning" label="样衣预警" sortable  min-width="120" align="center" show-overflow-tooltip>
                                </el-table-column>
                            <el-table-column label="开发核价" align="center" min-width="120" show-overflow-tooltip>
                                <el-table-column prop="pricingCreateDate" label="开发核价提交时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="pricingFinishDate" label="开发核价完成时间" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="pricingDelay" label="开发核价延期天数" sortable min-width="150" align="center" show-overflow-tooltip>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="大货下单" name="second">
                        <el-table :data="twoList" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column prop="goodsNo" label="下单款号" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="designerDate" label="设计师下单时间" sortable min-width="140" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="bomStatus" label="大货bom状态" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="designerDelay" label="设计师下单延期" sortable min-width="140" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="bigPricingCreateDate" label="大货核价提交时间" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="bigPricingFinishDate" label="大货核价完成时间" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="bigPricingDelay" label="核价延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="produceCreateDate" label="生产下单提交时间" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="produceDelay" label="生产下单延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="齐色样" name="third">
                        <el-table :data="threeList" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column prop="colorSimpleDate" label="齐色样日期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="simpleCreateDate" label="样衣指令创建时间" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="simpleFinishDate" label="样衣完成时间" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="simpleCreateDelay" label="样衣指令延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="simpleFinishDelay" label="样衣完成延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="warning" label="样衣预警" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="入库跟进" name="fouth">
                        <el-table :data="fourList" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column prop="developCostPrice" label="规划品类开发成本" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="totalContractPrice" label="总合约单价" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="costPrice" label="税前成本价" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstColorQty" label="首单下单色数" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstQty" label="首单下单数量" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="firstAmount" label="首单下单金额" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningArriveDate" label="规划到货时间" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseQty" label="入库数量" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseAmount" label="入库金额" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="actualPurchaseDate" label="实际入库时间" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseDate80" label="完成80%入库时间" sortable min-width="150" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseDelay" label="入库延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="unPurchaseQty" label="未入库数量" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseRate" label="入库率%" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseDifferenceQty" label="入库差异" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="上新" name="fivth">
                        <el-table :data="fiveList" style="width: 100%" border tooltip-effect="dark" :max-height="twoTableHeight" size="mini">
                            <el-table-column prop="outdoorPhotoDelay" label="外拍图片延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="outdoorVideoDelay" label="外拍视频延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="stillLifePhotoDelay" label="静物图片延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="planningLaunchDelay" label="可上新延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="launchDelay" label="上新延期" sortable min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </section>
    <!--导出二次确认-->
    <Modal v-model="exportVisible" @on-cancel="cancelexportVisible" title="导出确认" :width="340">
        {{'目前要导出的数据超过10万条，确定继续导出吗?'}}
        <div slot="footer">
            <Button type="default" @click="cancelexportVisible">取消</Button>
            <Button type="primary" @click="saveexportVisible">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    commonMixins
} from 'mixins/common';
import {burypoint} from 'mixins/burypoint'
import Util from 'libs/util'
export default {
    mixins: [commonMixins,burypoint],
    data() {
        return {
            detailsShow:false,
            activeName: 'first',
            oneList: [],
            twoList: [],
            threeList: [],
            fourList: [],
            fiveList: [],
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
            exportVisible:false
        }
    },
    created(){
        if (document.body.offsetHeight > 800) {
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        } else {
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        }
    },
    mounted() {
        this.getBrandList()
        this.getwaveList()
        this.getSecondLevel()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        handleShowHidden(name) {
            this.detailsShow = false
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.37
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
                }
            }
        },
        clickDetails(name){
            if(!this.showhidden){
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                }
            }
            }else{
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                }
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
            this.oneList = []
            this.twoList = []
            this.threeList = []
            this.fourList = []
            this.fiveList = []
            let data = {}
            data.basicBrandId = this.formSearch.brand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            data.secondLevel = this.formSearch.secondLevelname
            data.designNo = this.formSearch.designNo
            data.goodsNo = this.formSearch.goodsNo
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('goodsFollow_page', data, true).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data.records
                    this.total = res.data.count
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        clickRow(row){
            let data = {}
            data.designNo = row.designNo
            this.request('goodsFollow_detail', data, true).then(res => {
                if (res.code == 1) {
                    res.data.developSimple ? this.oneList = res.data.developSimple : this.oneList = []
                    res.data.bigOrder ? this.twoList = res.data.bigOrder : this.twoList = []
                    res.data.colorSimple ? this.threeList = res.data.colorSimple : this.threeList = []
                    res.data.purchaseFollow ? this.fourList = res.data.purchaseFollow : this.fourList = []
                    res.data.productLaunch ? this.fiveList = res.data.productLaunch : this.fiveList = []
                    //this.fiveList = [res.data.bigOrder]
                }else{
                    this.$message.error(res.msg)
                }
            })

        },
        //导出
        onExport(){
            this.setBuryPoint('导出')
            //this.saveexportVisible()
            let data = {}
            data.basicBrandId = this.formSearch.brand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            data.secondLevel = this.formSearch.secondLevelname
            data.designNo = this.formSearch.designNo
            data.goodsNo = this.formSearch.goodsNo
            this.request('goodsFollow_exportCount', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data > 100000) {
                        this.exportVisible = true
                    } else {
                        this.saveexportVisible()
                    }
                }else{
                    this.$message.error(res.msg)
                }
            })

        },
        //确认导出
        saveexportVisible() {
            let data = {}
            data.basicBrandId = this.formSearch.brand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            data.secondLevel = this.formSearch.secondLevelname
            data.designNo = this.formSearch.designNo
            data.goodsNo = this.formSearch.goodsNo
            this.request('goodsFollow_export', data, true).then(res => {
                if (res.code == 1) {
                    this.exportVisible = false
                    this.getKey(res.data)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //取消导出
        cancelexportVisible() {
            this.exportVisible = false
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
            this.setBuryPoint('查询')
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
    padding: 10px 10px 10px 10px;
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

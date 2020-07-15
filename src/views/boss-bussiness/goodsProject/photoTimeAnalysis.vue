<template>
<div>
    <header class="headerstyle" v-if="!showhidden">
        <!-- <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div> -->
        <el-form  :inline="true" :model="formSearch" class="demo-form-inline" style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
            <!-- <el-form :inline="true" :model="formSearch" class="demo-form-inline "> -->
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
            </el-form-item>
            <Col>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.basicBrandId" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="季节：" size="small">
                <el-select v-model="formSearch.season" clearable filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份：" size="small">
                <el-date-picker style="width:100px" v-model="formSearch.years" type="year" placeholder="选择年" value-format="yyyy">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="波段：" size="small">
                <el-select v-model="formSearch.waveBand" clearable filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in waveList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组别：" size="small">
                <el-select v-model="formSearch.group" clearable filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in groupList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开发类型：" size="small">
                <el-select v-model="formSearch.developStatus" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in developStatusList" :key="item.id" :label="item.developType" :value="item.developType"></el-option>
                </el-select>
            </el-form-item>
            </Col>
        </el-form>
    </header>
    <section class="middle" :style="maxHeight">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-button v-if="judgeMenu.indexOf('默认配置') !== -1" style="float:left" size="small" slot="reference" @click="showDrag"><i class="el-icon-arrow-down el-icon-menu"></i></el-button>
        <el-pagination style="text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <plx-table-grid :data="list" border style="width: 100%" :height="oneTableHeight" :row-class-name="tableRowClassName" @row-click="clickRow" :summary-method="getSummaries" show-summary :pagination-show="false" :row-key="String(Math.random(1,100000))">
            <plx-table-column type="index" width="80" label="序号" fixed="left" resizable align="center" />
            <plx-table-column prop="basicBrandName" min-width="95" sortable resizable fixed="left" label="品牌" align="center" />
            <!-- <plx-table-column prop="finishStyleQty" min-width="95" resizable fixed="left" label="已开发款数" align="center" /> -->
            <plx-table-column v-for="v in columns" :key="v.label" sortable :prop="v.prop" :fixed="v.fixed" resizable min-width="95" :label="v.label" align="center" />
        </plx-table-grid>
        <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
        <el-tabs v-model="activeName" style="margin-top:10px" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <plx-table-grid :data="detailData" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                    <plx-table-column type="index" width="55" label="序号" align="center"></plx-table-column>
                    <plx-table-column prop="basicBrandName" label="品牌" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="groups" label="组别" sortable resizable align="center" min-width="80" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="years" label="年份" sortable resizable min-width="80" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="season" label="季节" sortable resizable min-width="80" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="waveBand" label="波段" sortable resizable min-width="80" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="developTypeName" label="开发类型" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningDevelopDate" label="规划开发日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningDeliverDate" label="规划交接日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="colorSimpleDate" label="规划齐色样日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningArriveDate" label="规划到货日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>

                    <plx-table-column prop="photoDate" label="拍照日期" min-width="120" sortable resizable align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningLaunchDate" label="可上新日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="launchDate" label="上新日期" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="developStyleQty" label="开发款数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="finishStyleQty" label="已开发款数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningDevelopPostponeDate" label="设计稿延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>

                    <plx-table-column prop="fillingPostponeDay" label="建档延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstSimplePostponeDay" label="头版样衣指令延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="designerPostponeDay" label="设计师下单延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="simpleCreatePostponeDay" label="拍摄样指令创建延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="unPricingStyleQty" label="大货未核价款数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>

                    <plx-table-column prop="orderStyleQty" label="下单款数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstColorQty" label="下单色数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstQty" label="下单数量" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstAmount" label="下单金额" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="orderTotalAmount" label="规划开发金额" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="diffAmount" label="金额差异" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="diffCostAmount" label="成本差异" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="purchasePostponeDay" label="入库延期天数" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="purchaseQty" label="入库数量" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="purchaseAmount" label="入库金额" sortable resizable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>

                </plx-table-grid>
            </el-tab-pane>
        </el-tabs>
    </section>
    <Modal v-model="showDragVisible" title="维度筛选" @on-cancel='cancelshowDragVisible' :width="680" class-name="customize-modal-center  showdragmodal">
        <Row class="background-color-white">
            <!-- <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules"> -->
            <div style="text-align:right;margin-bottom:10px">
                <Button type="primary" @click="onConfigConlunms">默认配置</Button>
                <Button type="primary" @click="onConfirmConlunms">确认</Button>
                <Button type="default" @click="cancelshowDragVisible">取消</Button>
            </div>

            <Card>
                <div class="drag-box-card">

                    <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
                    <drag-list :list1.sync="leftList" :list2.sync="rightList" :dropConClass="dropConClass" @on-change="handleChange">
                        <h3 slot="left-title">已选展示维度</h3>
                        <Card class="drag-item" slot="left" slot-scope="left">{{left.itemLeft.label}}</Card>
                        <h3 slot="right-title">待选展示维度</h3>
                        <Card class="drag-item" slot="right" slot-scope="right">{{right.itemRight.label}}</Card>
                    </drag-list>
                </div>
            </Card>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
var totalPageSum = {}
import DragList from '_c/drag-list'
import filters from '../../../filter/'
import {burypoint} from 'mixins/burypoint'
import {
    commonMixins
} from 'mixins/common'
import { export_json_to_excel,format_json_list_by_filter,convert26 } from '@/libs/excel/Export2Excel'
export default {
    mixins: [commonMixins,burypoint],
    components: {
        DragList
    },
    data() {
        return {
            detailsShow:false,
            subtotal:{},//当页小计
            combined:{brand:222,},//合计
            detailData: [],
            list: [],
            leftList: [],
            rightList: [],
            columns: [],
            dropConClass: {
                left: ['drop-box', 'left-drop-box'],
                right: ['drop-box', 'right-drop-box']
            },
            handleList: [],
            exportObj: {
                selected: ''
            },
            showDragVisible: false,
            exportVisible: false,
            moreLarge: false,
            activeName: 'first',
            show: false,
            formSearch: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            oneTableHeight: '',
            twoTableHeight: '',
            maxHeight: '',
            exportList:[],
            // totalPageSum:{},
        }
    },
    computed: {
        leftContainer() {
            console.log(this.$store.state.app.leftContainer, '8888')
            return this.$store.state.app.leftContainer
        },
        rightContainer() {
            return this.$store.state.app.rightContainer
        }
    },
    destroyed() {
        this.$store.commit('clearscmOrder')
    },
    created() {
        
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
        this.getDevelopStatusList()
        this.getHeaderList() //表头配置
        this.getSecondLevel()
        this.getBrandList()
        this.getwaveList()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
        if (row.summary === true) {
          return 'warning-row';
        }
        return '';
      },
        //表头配置
        getHeaderList() {
            let data = {}
            data.basicUserId = JSON.parse(window.sessionStorage.getItem('userinfo')).userId
            data.pageResourceCode = "photo-page"
            this.request('queryUserConfig', data, true).then(res => {
                if (res.code == 1) {
                    this.leftList = res.data.showList
                    this.rightList = res.data.hiddenList
                    this.columns = res.data.showList
                }
            })
        },
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
        showDrag() {
            this.showDragVisible = true
        },
        cancelshowDragVisible() {
            this.getHeaderList()
            this.showDragVisible = false
        },
        onConfirmConlunms() {
            this.columns = []
            let data = {}
            data.showList = this.leftList
            data.hiddenList = this.rightList
            this.request('updateUserConfig', data, true).then(res => {
                if (res.code == 1) {
                    this.$message.success('设置成功')
                    this.$forceUpdate()
                    this.showDragVisible = false
                    this.$nextTick(() => {
                        this.columns = this.leftList
                        this.getData()
                    })
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //保存默认配置
        onConfigConlunms() {
            this.columns = []
            let data = {}
            data.showList = this.leftList
            data.hiddenList = this.rightList
            this.request('boss_bossBiFieldUserMapping_saveTemplateConfig', data, true).then(res => {
                if (res.code == 1) {
                    this.$message.success('设置成功')
                    this.$forceUpdate()
                    // this.showDragVisible = false
                    this.$nextTick(() => {
                        this.columns = this.leftList
                        this.getData()
                    })
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        getSummaries({
            columns,
            data
        }) {
            const current = []
            const total = []
            columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                    current.push('当页小计')
                    total.push('合计')
                } else {
                    const values = data.map(item => Number(item[column.property]));
                    let obj = this.subtotal
                    let objT = this.combined
                    for (let i in obj) {
                        if (column.prop === i) {
                            current[columnIndex] = obj[i]
                        }
                    }
                    for (let v in objT) {
                        if (column.prop === v) {
                            total[columnIndex] = objT[v]
                        }
                    }
                }
            })
            // 返回一个二维数组的表尾合计
            return [current, total]
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
        onReset() {
            this.formSearch = {}
        },
        getData() {
            this.detailData = []
            let data = {}
            let propList = ["basicBrandName"]
            data.pageResourceCode = "photo-page"
            data.pageListName = "mainList"
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicBrandName = this.formSearch.basicBrandId
            data.years = this.formSearch.years
           data.season = this.formSearch.season
           data.waveBand = this.formSearch.waveBand
           data.groups = this.formSearch.group
           data.developTypeName = this.formSearch.developStatus
           this.columns.map((i)=>{
               propList.push(i.prop)
           })
           data.props = propList
            this.request('photoTimeAnalysis_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        this.list = res.data.records
                        this.subtotal = res.data.currentPageSum
                        this.combined = res.data.totalPageSum
                    }
                } else {
                    this.list = []
                    this.subtotal = {}
                    this.combined = {}
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        onExport(){
            this.setBuryPoint('导出')
            let data = {}
            let propList = ["basicBrandName"]
            data.pageResourceCode = "photo-page"
            data.pageListName = "mainList"
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicBrandName = this.formSearch.basicBrandId
            data.years = this.formSearch.years
           data.season = this.formSearch.season
           data.waveBand = this.formSearch.waveBand
           data.groups = this.formSearch.group
           data.developTypeName = this.formSearch.developStatus
           this.columns.map((i)=>{
               propList.push(i.prop)
           })
           data.props = propList
            this.request('photoTimeAnalysis_getExportVos', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data) {
                        for (let i = 0, len = res.data.length; i < len; i++) {
                                res.data[i].index =i+1
                             }
                        this.exportList = res.data
                        this.exportExcel()
                    }
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        exportExcel(){
            
         if(this.exportList.length==0)return this.$message.error('暂无导出数据')
        let dynamicFirstHead = new Array()
        let dynamicSecondHead = new Array()
        let dynamicProps = new Array()
        let dynamicFirstHeadMerges = new Array()
        let charCodeOfFix = 2
        this.columns.map(item=>{
             dynamicSecondHead.push(item.label)
             dynamicProps.push(item.prop)
             dynamicFirstHeadMerges.push(convert26(++charCodeOfFix)+"1")
        })
        console.log(dynamicFirstHeadMerges,'000000000')
        // let multiHeader = [['品牌', '年份','季节','二级品类','三级品类','原企划','','','调整后企划','','','原企划已开发','','','原企划实际开发','','', ...dynamicFirstHead]]
        let header = ['序号', '品牌',...dynamicSecondHead]
        let filterVal = ['index', 'basicBrandName', ...dynamicProps]
        let data = format_json_list_by_filter(filterVal, this.exportList)
        let merges = ['A1', 'B1', ...dynamicFirstHeadMerges]
        let myDate = new Date();
        myDate.toLocaleString();        //获取日期与时间
        let filename = '拍照时间分析' + myDate.toLocaleString()
                export_json_to_excel({
                    // multiHeader,
                    header,
                    merges,
                    data,
                    filename
                })

            // }
        },
        //获取明细
        clickRow(row){
            let data = row
            !!this.formSearch.basicBrandId ? data.basicBrandName = this.formSearch.basicBrandId : row.basicBrandName
            !!this.formSearch.years ? data.years = this.formSearch.years : row.years
            !!this.formSearch.season ? data.season = this.formSearch.season : row.season
            !!this.formSearch.waveBand ? data.waveBand = this.formSearch.waveBand : row.waveBand
            !!this.formSearch.group ? data.groups = this.formSearch.group : row.groups
            !!this.formSearch.developStatus ? data.developTypeName = this.formSearch.developStatus : row.developTypeName
            !!this.request('photoTimeAnalysis_getDetail', data, true).then(res => {
                if (res.code == 1) {
                    this.detailData = res.data
                }
            })
            console.log(row,'--------------')
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.currentPage = 1
            this.getData()

        },
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
.showdragmodal .ivu-modal {
    top: 10px !important
}

.drag-box-card {
    display: inline-block;
    width: 600px;
    height: 600px;

    .drag-list-con {
        overflow: scroll;
        min-height: 600px;
    }

    //   background: #eee;
    .drag-item {
        margin: 6px;
        border: 1px solid #eee;
        cursor: pointer;
        // background: #fff;
    }

    h3 {
        padding: 10px 15px;
    }

    .right-drop-box {
        margin-right: 0px;
    }
}

.handle-log-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 200px;
    height: 500px;

    h3 {
        padding: 10px 14px;
    }

    .handle-inner-box {
        height: ~"calc(100% - 44px)";
        overflow: auto;

        p {
            padding: 14px 0;
            margin: 0 14px;
            border-bottom: 1px dashed #eeeeee;
        }
    }
}

.res-show-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 350px;
    height: 570px;
}

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

.el-table__row td {
    padding: 0;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td {
    background-color: #f19944 !important;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}

.sum_footer {
    display: flex;
    display: -webkit-flex;
    line-height: 20px;
    color: #606266;
}

.sum_footer_unit {
    flex: 1;
    /* -webkit-flex-grow:1; */
    text-indent: 20px;
    font-size: 13px;

    &:nth-child(1) {
        text-indent: 16px;

    }

    ;

    &:nth-child(2) {
        text-indent: 16px;
    }

    ;

    &:nth-child(3) {
        text-indent: 16px;
    }

    ;

    &:nth-child(4) {
        text-indent: 16px;
    }

    ;

    &:nth-child(5) {
        text-indent: -16px;
    }

    ;

    &:nth-child(7) {
        text-indent: 16px;
    }

    ;
}

.sum_footer_unit.center {
    text-align: center;
    // text-indent:10px;
}

.sum_footer.xiaoji,
.sum_footer.heji {
    border-bottom: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;

}

.el-table__append-wrapper {
    margin-top: -1px;

}
</style><style>
.plx-table .plx-footer--column.col--ellipsis {
    height: 25px !important;
}

.plx-table .plx-header--column.col--ellipsis {
    height: 4px;
}

.plx-table .plx-body--column.col--ellipsis {
    height: 25px;
}

.plx-table tr,
.plx-table th {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
}

/* .plx-table--header-wrapper{
       line-height:40px!important;
       height:40px!important;
       padding:0!important;
} */
.plx-table--empty-block {
    height: 60px !important;
    line-height: 60px !important;
}

/* .plx-table--empty-content{
     /* padding-top: 45px; */
/* }  */
.ivu-card-body {
    padding: 4px 16px 4px 26px !important;
}

.drop-box {
    border: 1px solid #eeeeee;
    height: 540px;
    border-radius: 5px;
    overflow: auto;
}

.left-drop-box {
    margin-right: 10px;
}

.ivu-modal-body {
    padding: 10px;
    font-size: 12px;
    line-height: 1;
}

.plx-table .warning-row {
    background: oldlace;
  }

  .plx-table .success-row {
    background: #f0f9eb;
  }
</style>

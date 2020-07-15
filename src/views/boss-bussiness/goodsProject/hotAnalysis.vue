<template>
<div>
     <header class="headerstyle" v-if="!showhidden">
        <el-form   :inline="true" :model="formSearch" class="demo-form-inline" style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
        <!-- <el-form :inline="true" :model="formSearch" class="demo-form-inline "> -->
            <el-form-item size="small">
                <el-button  v-if="judgeMenu.indexOf('查询') !== -1"   size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button    size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button  v-if="judgeMenu.indexOf('导出') !== -1"    size="small" type="primary" @click="queryFollowByExportMdx">导出</el-button>
            </el-form-item>
            <Col>
                 <el-form-item label="品牌：" size="small">
                        <el-select v-model="formSearch.basicBrandName" clearable filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                 </el-form-item>
                 <el-form-item label="季节：" size="small">
                        <el-select v-model="formSearch.season" clearable  filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                 </el-form-item>
                 <el-form-item label="年份：" size="small">
                      <el-date-picker style="width:150px"
                              v-model="formSearch.years" 
                              type="year"
                              placeholder="选择年"  value-format="yyyy">
                      </el-date-picker>
                 </el-form-item>
                <el-form-item label="波段：" size="small">
                        <el-select v-model="formSearch.waveBand" clearable  filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in waveList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                 </el-form-item>
                 <el-form-item label="二级品类：" size="small">
                        <el-select v-model="formSearch.secondLevel" clearable  filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in secondLevel" :key="item.secondLevel" :label="item.secondLevel" :value="item.secondLevel"></el-option>
                        </el-select>
                 </el-form-item>
                  <el-form-item label="组别：" size="small">
                        <el-select v-model="formSearch.groups" clearable  filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in groupList" :key="item" :label="item" :value="item"></el-option>
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
        <el-button  v-if="judgeMenu.indexOf('默认配置') !== -1" style="float:left" size="small" slot="reference" @click="showDrag"><i class="el-icon-arrow-down el-icon-menu"></i></el-button>
        <el-pagination style="text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 2000, 3000, 4000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
            <div style="clear:both"></div>
            <plx-table-grid :data="list"  :summary-method="getSummaries"    @row-click="getRowData" :row-class-name="tableRowClassName"
                        show-summary  border style="width: 100%"   :height="oneTableHeight"  :pagination-show="false" :row-key="String(Math.random(1,100000))">
                        <plx-table-column fixed="left"   type="index"  width="80" label="序号"    sortable  resizable   align="center"/>
                        <plx-table-column fixed="left"    prop="basicBrandName"  min-width="100"  sortable resizable  label="品牌"        align="center"/>
                        <plx-table-column  v-for="v in columns" :key="v.label"   :prop="v.prop"  sortable  resizable min-width="100"   :label="v.label"  align="center"/>
            </plx-table-grid>
          <!-- <div style="padding-top:10px"></div> -->
          <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <plx-table-grid :data="listDetail" style="width: 100%" border   tooltip-effect="dark" :height="twoTableHeight" size="mini">
                    <plx-table-column type="index" width="55" label="序号"   align="center"></plx-table-column>
                    <plx-table-column prop="basicBrandName" sortable label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column  prop="groups"   sortable       label="组别"    align="center" min-width="120" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column  prop="years"    sortable       label="年份"     min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column  prop="season"   sortable      label="季节"     min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column  prop="waveBand"  sortable      label="波段"     min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column  prop="developTypeName" sortable label="开发类型" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="secondLevel"   sortable       label="二级品类" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningDevelopDate" sortable label="规划开发日期" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningDeliverDate" sortable label="规划交接日期" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="colorSimpleDate" sortable label="齐色样日期" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="planningArriveDate" sortable label="规划到货日期" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="developCostPrice" sortable label="品类开发成本" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">{{scope.row.developCostPrice|moneyFilters}}</template>
                    </plx-table-column>
                     <plx-table-column prop="developStyleQty" sortable label="计划开发款数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                     <plx-table-column prop="finishStyleQty" sortable label="已开发款数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                     <plx-table-column prop="planningDevelopPostponeDate" sortable label="设计稿延期天数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                     <plx-table-column prop="fillingPostponeDay" sortable label="建档延期天数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                     <plx-table-column prop="firstSimplePostponeDay" sortable label="头版样衣指令延期天数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstSimpleFinishPostponeDay"  sortable label="头版样衣完成延期天数" min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="orderStyleQty" label="下单款数" sortable min-width="120" align="center" show-overflow-tooltip>

                    </plx-table-column>
                    <plx-table-column prop="firstColorQty" label="下单色数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstQty" label="下单数量" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="firstAmount" label="下单金额" sortable min-width="120" align="center" show-overflow-tooltip>
                          <!--  -->
                    </plx-table-column>
                    <plx-table-column prop="designerPostponeDay" label="设计师下单延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="producePostponeDay" label="生产下单延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="simpleCreatePostponeDay" label="拍摄样指令创建延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="simpleFinishPostponeDay" label="拍摄样完成延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="unPricingStyleQty" label="大货未核价款数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="orderTotalAmount" label="规划开发金额" sortable min-width="120" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.orderTotalAmount|moneyFilters}}</template>
                    </plx-table-column>
                    <plx-table-column prop="actualCostAmount" label="实际开发成本" sortable min-width="120" align="center" show-overflow-tooltip>
                           <template slot-scope="scope">{{scope.row.actualCostAmount|singlePrice}}</template>
                    </plx-table-column>
                    <plx-table-column prop="diffAmount" label="金额差异" sortable min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">{{scope.row.diffAmount|moneyFilters}}</template>
                    </plx-table-column>
                    <plx-table-column prop="diffCostAmount" label="成本差异" sortable min-width="120" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">{{scope.row.diffCostAmount|singlePrice}}</template>
                    </plx-table-column>
                    <plx-table-column prop="purchasePostponeDay" label="入库延期天数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="purchaseQty" label="入库数量" min-width="120" sortable align="center" show-overflow-tooltip>
                    </plx-table-column>
                    <plx-table-column prop="purchaseAmount" label="入库金额" min-width="120" sortable align="center" show-overflow-tooltip>
                          <template slot-scope="scope">{{scope.row.purchaseAmount|moneyFilters}}</template>
                    </plx-table-column>
                </plx-table-grid>
            </el-tab-pane>
        </el-tabs>
    </section>
        <Modal v-model="showDragVisible" title="显示/隐藏列" @on-cancel='cancelshowDragVisible' :width="680" class-name="customize-modal-center  showdragmodal">
        <Row class="background-color-white">
                <div style="text-align:right;margin-bottom:10px">
                     <Button type="primary"   @click="onDefault">默认配置</Button> 
                     <Button type="primary"   @click="onConfirmConlunms(1)">确认</Button> 
                     <Button type="default"   @click="cancelshowDragVisible">取消</Button>
                </div>
                     
                <Card>
                <div class="drag-box-card">
                    <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
                    <drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange">
                        <h3 slot="left-title">展示列</h3>
                        <Card class="drag-item" slot="left" slot-scope="left">{{left.itemLeft.label}}</Card>
                        <h3 slot="right-title">隐藏列</h3>
                        <Card class="drag-item" slot="right" slot-scope="right">{{right.itemRight.label}}</Card>
                    </drag-list>
                </div>
                 </Card>
        </Row>
        <div slot="footer"></div>
    </Modal>
      <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col v-show="!moreLarge">
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="1"></el-option>
                            <el-option label="导出主表+明细" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-show="moreLarge" style="text-align:center">
                       目前要导出的数据超过10万条，确定继续导出吗？
                </Col>
                <el-form-item style="padding-left:130px">
                    <Button type="primary" v-if="!moreLarge" @click="getExportTotal">确认</Button>
                    <!-- 二次确认 -->
                    <Button type="primary" v-if="moreLarge" @click="onImport">确认</Button> 
                    <Button type="default" @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
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
import {commonMixins} from 'mixins/common'
import { export_json_to_excel,format_json_list_by_filter,convert26 } from '@/libs/excel/Export2Excel'
// import {  PlxTableGrid, PlxTableColumn } from 'pl-table';
export default {
     mixins    : [commonMixins,burypoint],
    components: {
           DragList,
        //    PlxTableGrid, PlxTableColumn
    },
    data() {
        return {
            oneTableHeight: '',
            twoTableHeight: '',
            maxHeight:'',
            detailsShow:false,
            listDetail: [],//优秀的人才
            list      : [],
            list1     : [
            ],
            list2 : [
            ],
            columns:[ ],
            dropConClass: {
                left : ['drop-box', 'left-drop-box'],
                right: ['drop-box', 'right-drop-box']
            },
            handleList: [],
             exportObj:{
                       selected:''
            },
            showDragVisible:false,
            exportVisible:false,
            moreLarge:false,
            activeName: 'first',
            timeAA: null,
            // tableList:[],//合计
            logList: [], //日志
            billNo: '',
            show: false,
            col: [],
            tableData: [],
            visible: false,
            brandList: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            formSearch: {
                        basicBrandName:'',
                        season:'',
                        years:'',
                        waveBand:'',
                        secondLevel:'',
                        groups:'',
                        developTypeName:'',
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            currentPageDelait: 1,
            footerData: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            currentPageSum:{},//当页小计
            totalPageSum:{},//合计
            userInfo:JSON.parse(sessionStorage.getItem('userinfo')),
            exportList:[],
            // totalPageSum:{},
        }
    },
    computed: {
        leftContainer(){
            return this.$store.state.app.leftContainer
        },
        rightContainer(){
            return this.$store.state.app.rightContainer  
        }
    },
    destroyed(){
            this.$store.commit('clearLeftContainer')
            this.$store.commit('clearRightContainer')
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
              this.getSecondLevel()
              this.getBrandList()
            //   this.getwaveList()
            //   developTypeName 
              this.getwaveLists()
              this.getTableTitle()
              this.getButtonJurisdiction() //按钮权限
              this.getDevelopStatusList()
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
        getwaveLists() {
            this.request('waveBand_selector_masterData', {developTypeName:'爆款'}, true).then(res => {
                if (res.code == 1) {
                    this.waveList = res.data
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
        // let multiHeader = [['品牌', '年份','季节','二级品类','三级品类','原企划','','','调整后企划','','','原企划已开发','','','原企划实际开发','','', ...dynamicFirstHead]]
            let header = ['序号', '品牌',...dynamicSecondHead]
            let filterVal = ['index', 'basicBrandName',...dynamicProps]
            let data = format_json_list_by_filter(filterVal, this.exportList)
            let merges = ['A1', 'B1',...dynamicFirstHeadMerges]
            let myDate = new Date();
            myDate.toLocaleString();        //获取日期与时间
        let filename = '爆款开发进度分析' + myDate.toLocaleString()
                export_json_to_excel({
                    // multiHeader,
                    header,
                    merges,
                    data,
                    filename
                })

            // }
        },
         tableRowClassName({row, rowIndex}) {
            if (row.summary === true) {
            return 'warning-row';
            }
            return '';
        },
        showDrag(){
                  this.showDragVisible=true
        },
        cancelshowDragVisible(){
                   this.showDragVisible=false
                   this.getTableTitle()
        },
        onConfirmConlunms(type){
                //    this.columns=[]
                   this.$forceUpdate()
                   console.log(this.columns,'现在的顺序')
                   this.showDragVisible=false
                   this.$nextTick(()=>{
                          this.saveTableTitle(type)
                   })
            
        },
         //默认配置
        onDefault(){
               let data={}
                   data.showList=this.list1
                   data.hiddenList=this.list2
                this.request('boss_bossBiFieldUserMapping_saveTemplateConfig',data,false).then(res=>{
                        if(res.code==1){
                                this.$message.success('设置成功')
                                 
                        }else{
                                 this.$message.error(res.msg)
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
        onReset() {
                 for(let i in this.formSearch){
                     this.formSearch[i]=''
                 }
        },
        saveTableTitle(type){
               let data={}
                   data.showList=this.list1
                   data.hiddenList=this.list2
                this.request('updateUserConfig',data,false).then(res=>{
                        if(res.code==1){
                                     this.$message.success('设置成功')
                                     this.getTableTitle(type)//刷新一下
                                    //   setTimeout(()=>{
                                    
                                    //  })
                        }else{
                             this.$message.error(res.msg)
                        } 
                })
        },
        getTableTitle(type){
            const{ userId }=this.userInfo
            let data={}
                data.basicUserId= userId
                data.pageResourceCode='faddish-page'
             this.request('queryUserConfig',data,false).then(res=>{
                         if(res.code==1){
                                        this.columns=[]
                                        this.$forceUpdate()
                                        this.$nextTick(()=>{
                                                          this.list1=res.data.showList
                                                          this.columns=res.data.showList
                                                          this.list2=res.data.hiddenList
                                                          if(type){
                                                             this.getData()
                                                          }else{

                                                          }
                                                          
                                       })
                                    
                           }else{
                                    this.$message.error(res.msg)
                           }
             })
        },
        getRowData(row){
                console.log(row)
                let data={}
                    data.basicBrandName = this.formSearch.basicBrandName
                    data.season = this.formSearch.season
                    data.years = this.formSearch.years
                    data.waveBand = this.formSearch.waveBand
                    data.secondLevel = this.formSearch.secondLevel
                    data.groups = this.formSearch.groups
                    data.developTypeName='爆款'
                    data.props=row 
                    this.request('boss_business_queryFollowDetail',data,false).then(res=>{
                            if(res.code==1){
                                  this.listDetail=res.data
                            }else{
                                 this.$message.error(res.msg)
                            }
                    })

        },
        queryFollowByExportMdx(){
            this.setBuryPoint('导出')
                 let arr=[]
                     arr.push('basicBrandName')
                    //  arr.push('finishStyleQty')
                 this.columns.map(item=>{
                        arr.push(item.prop)
                  }) 
                
            const{basicBrandName,season,years,waveBand,secondLevel,groups,developTypeName}=this.formSearch
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicBrandName = this.formSearch.basicBrandName
                data.season = this.formSearch.season
                data.years = this.formSearch.years?Number(this.formSearch.years):''
                data.waveBand = this.formSearch.waveBand
                data.secondLevel = this.formSearch.secondLevel
                data.groups = this.formSearch.groups
                data.developTypeName='爆款'
                data.pageListName="mainList"
                data.pageResourceCode="faddish-page"
                data.props=arr
            this.request('boss_business_queryFollowByExportMdx', data, true).then(res => {
                      if (res.code == 1) {
                       if (res.data) {
                            for (let i = 0, len = res.data.length; i < len; i++) {
                                res.data[i].index =i+1
                             }
                             this.exportList=res.data
                             this.exportExcel()
                        }
                      }else{
                            this.exportList=[]
                            this.$message.error(res.msg)
                      }
            })
        },
        getData() {
            this.listDetail=[]
            let arr=[]
                 arr.push('basicBrandName')
                //  arr.push('finishStyleQty')
                 this.columns.map(item=>{
                        arr.push(item.prop)
                 }) 
                
            // this.delaiList = []
            const{basicBrandName,season,years,waveBand,secondLevel,groups,developTypeName}=this.formSearch
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicBrandName = this.formSearch.basicBrandName
                data.season = this.formSearch.season
                data.years = this.formSearch.years?Number(this.formSearch.years):''
                data.waveBand = this.formSearch.waveBand
                data.secondLevel = this.formSearch.secondLevel
                data.groups = this.formSearch.groups
                data.developTypeName='爆款'
                data.pageListName="mainList"
                data.pageResourceCode="faddish-page"
                data.props=arr
            this.request('boss_business_queryFollowByMdx', data, true).then(res => {
                if (res.code == 1) {
                        this.total = res.data.count;
                        this.currentPageSum=res.data.currentPageSum
                        this.totalPageSum=res.data.totalPageSum
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list=res.data.records
                        // this.initTable(res.data.records,res.data.currentPageSum,res.data.totalPageSum)
                    } else {
                        // this.initTable([])
                    }

                    this.loading = false
                } else {
                     this.total =0;
                     this.currentPageSum={}
                     this.totalPageSum={}
                     this.list=[]
                    // this.initTable([])
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
       //导出相关
        checkExport(){
                 if(this.checkSelection()){
                    // this.onImport()
                    this.exportVisible=true
                 }else{
                     this.exportVisible=true
                 }
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
       getSummaries({columns, data}) {
            const means = []
            const list   =[]
          columns.forEach((column, columnIndex) => {
                if (columnIndex === 1) {
                       means.push(`${'当页小计'}`)
                       list .push(`${'合计'}`)
                } else {
                       const values = data.map(item => Number(item[column.property]));
                         let obj = this.currentPageSum
                         let objT = this.totalPageSum
                            for (let i in obj) {
                                if (column.prop === i) {
                                    means[columnIndex] = obj[i]
                                }
                            }
                            for (let v in objT) {
                                if (column.prop === v) {
                                    list[columnIndex] = objT[v]
                                }
                            }
                }
            })
          // 返回一个二维数组的表尾合计
          return [means,list]
      },
    }
}
</script> 


<style lang="less" scoped>
.showdragmodal .ivu-modal{
     top:10px!important
}
.drag-box-card{
  display: inline-block;
  width: 600px;
  height: 600px;
  .drag-list-con{
      overflow: scroll;
      min-height:600px ;
  }
//   background: #eee;
  .drag-item{
    margin: 6px;
    border:1px solid #eee;
    cursor: pointer;
    // background: #fff;
  }
  h3{
    padding: 10px 15px;
  }
  .right-drop-box{
    margin-right: 0px;
  }
}
.handle-log-box{
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 200px;
  height: 500px;
  h3{
    padding: 10px 14px;
  }
  .handle-inner-box{
    height: ~"calc(100% - 44px)";
    overflow: auto;
    p{
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
}
.res-show-box{
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
    height:auto;
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
.sum_footer{
         display:flex;
         display:-webkit-flex;
         line-height:30px;
         color:#606266;
    }
    .sum_footer_unit{
        flex:1;
        /* -webkit-flex-grow:1; */
        text-indent:30px;
        font-size:13px;
        &:nth-child(1){
           text-indent:25px;  
           
        };
        &:nth-child(2){
           text-indent:25px;  
        };
        &:nth-child(3){
           text-indent:25px;  
        };
        &:nth-child(4){
           text-indent:15px;  
        };
        &:nth-child(5){
           text-indent:-15px;  
        };
        &:nth-child(7){
           text-indent:90px;  
        };
    }
    .sum_footer_unit.center{
        text-align:center;
        // text-indent:10px;
    }
    .sum_footer.xiaoji,.sum_footer.heji{
        border-bottom:1px solid #EBEEF5;
        border-left:1px solid #EBEEF5;
        border-right:1px solid #EBEEF5;
       
    }
    .el-table__append-wrapper{
        margin-top:-1px;
       
    }
</style>
<style>
 .plx-table .plx-header--column.col--ellipsis{
    height: 4px;
}
 .plx-table .plx-body--column.col--ellipsis{
    height: 18px;
}

 .plx-table .plx-body--column.col--ellipsis, .plx-table.plx-editable .plx-body--column, .plx-table .plx-footer--column.col--ellipsis, .plx-table .plx-header--column.col--ellipsis {
    height: 32px;
}
.plx-table tr, .plx-table th {
    padding-top: 4px!important;
    padding-bottom: 4px!important;
}
/* .plx-table--header-wrapper{
       line-height:40px!important;
       height:40px!important;
       padding:0!important;
} */
 .plx-table--empty-block{
     height:60px!important;
     line-height: 60px!important;
 }
 /* .plx-table--empty-content{
     /* padding-top: 45px; */
 /* }  */
.ivu-card-body {
    padding: 4px 16px 4px 26px!important;
}
.drop-box{
    border: 1px solid #eeeeee;
    height: 540px;
    border-radius: 5px;
    overflow:auto;
  }
  .left-drop-box{
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

</style>

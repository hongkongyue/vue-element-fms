<template>
<div>
     <header class="headerstyle" v-if="!showhidden">
         <!-- <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div> -->
        <el-form   :inline="true" :model="formSearch" class="demo-form-inline" label-position="left" style="width:98%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
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
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="供应商：" size="small">
                <el-select v-model="formSearch.basicSupplierId" value-key="id" clearable filterable placeholder="请选择" style="width:230px">
                    <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
             <!-- <el-form-item label="制单号：" size="small">
                     <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                     <el-input v-model="formSearch.goodsNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item> -->
            <el-form-item  label="业务日期：" size="small">
                <!-- <el-date-picker v-model="formSearch.documentDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker :picker-options="pickerOptions"  :clearable="false" v-model="formSearch.startTime" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.endTime"     :clearable="false" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
            </el-form-item>
             <el-form-item  label="核销截止日期：" size="small">
                <el-date-picker v-model="formSearch.arriveInvoiceDate" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="请选择"></el-date-picker>
            </el-form-item>

            </Col>
        </el-form>
    </header>
    <section class="middle" style="height:auto" >
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 2000, 3000, 4000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
            <!-- <plx-table-grid :data="list"  :summary-method="getSummaries"   :row-class-name="tableRowClassName"
                        show-summary  border style="width: 100%"   :height="oneTableHeight"  :pagination-show="false">
                        <plx-table-column fixed="left"  type="index"  width="70" label="序号"  resizable   align="center"/>
                        <plx-table-column fixed="left"  prop="basicCompanyName" sortable  min-width="100"  resizable  label="公司"        align="center"/>
                        <plx-table-column fixed="left"  prop="actualPoInCount" sortable  min-width="100"  resizable  label="入库数量"        align="center"/>
                        <plx-table-column fixed="left"  prop="payableEstimateAmount" sortable  min-width="100"  resizable  label="应付暂估金额"        align="center"/>
                        <plx-table-column style="height:20px!important"  v-for="v in columns" :key="v.label" sortable   :prop="v.prop"  resizable min-width="100"   :label="v.label"  align="center"/>
            </plx-table-grid>:style="{'height':oneTableHeight}" -->
              <div :style="{height:oneTableHeight+'px'}">
                  <div id="main" style="width: 100%;height:600px" ></div>
             </div>
            <!-- <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
            </div> -->
    </section>
        <Modal v-model="showDragVisible" title="显示/隐藏列" @on-cancel='cancelshowDragVisible' :width="680" class-name="customize-modal-center  showdragmodal">
        <Row class="background-color-white">
            <!-- <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules"> -->
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
                <!-- <el-form-item style="padding-left:230px">
                  
                </el-form-item> -->
            <!-- </el-form> -->
        </Row>
        <div slot="footer"></div>
    </Modal>
      <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                 <Col style="text-align:center">
                          目前要导出的数据超过10万条，确定继续导出吗？
                 </Col>
                <el-form-item style="padding-left:130px">
                    <!-- 二次确认 -->
                    <Button type="primary" @click="onImport">确认</Button> 
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
import {debounce} from 'mixins/debounce.js'
import {burypoint} from 'mixins/burypoint'
import {commonMixins} from 'mixins/common'
export default {
     mixins    : [debounce,commonMixins,burypoint],
    components: {
           DragList,
        //    PlxTableGrid, PlxTableColumn
    },
    data() {
        return {
            listDetail: [],//优秀的人才
            list      : [],
            list1     : [
            ],
            list2 : [
            ],
            pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() < 1577808000000;}
                },
            mainTableHeight:350,
            secondTableHeight:250,
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
            typeList:[],
            dialogVisible: false, //新增
            formSearch: {
                        basicCompanyId:'',//公司
                        basicSupplierId:'',//供应商
                        startTime:filters.get_year_month_day(1577808000000),//开始日期
                        endTime:filters.get_year_month_day(new Date().getTime()),  //截止日期
                        arriveInvoiceDate:'',//核销截止日期
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
            detailsShow:false,
            maxHeight:null,
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
        
    },
    mounted() {
            if (document.body.offsetHeight > 800) {
                this.oneTableHeight = (document.body.offsetHeight +300) * 0.5
            } else {
                this.oneTableHeight = (document.body.offsetHeight + 260) * 0.4
            }
              this.getCompany()
              this.getTypeList()
            //   this.getwaveLists()
              this.getButtonJurisdiction() //按钮权限
            //   this.getDevelopStatusList()
              this.initTable([], '')
    },
    methods: {
    getCompany() { //公司下拉
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        //供应商列表
    getTypeList() {
                this.request('masterData_supplier_selector', {}, false).then(res => {
                    if (res.code == 1) {
                        this.typeList = res.data
                    }
                })
     },
     handleBottom(type){
            this.showTable=!this.showTable
          
           if(type=='hidden'){
                 this.mainTableHeight=350
                 this.secondTableHeight=150
                this.$nextTick(()=>{
                        $('.single-page').scrollTop(0)
                })
                //  this.showTable=true
            }else if(type=='show'){
                this.$nextTick(()=>{
                     $('.single-page').scrollTop=$('.single-page').scrollHeight
                })
                  
                // this.showTable=false
                 this.mainTableHeight=150
                 this.secondTableHeight=420
            }             
     },
      getwaveLists() {
            this.request('waveBand_selector_masterData', {notEqDevelopTypeName:'爆款'}, true).then(res => {
                if (res.code == 1) {
                    this.waveList = res.data
                }
            })
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
         initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'payableSummary',
                    show: {
                        toolbar: true,
                        // selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [{
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '230px',
                            sortable: true
                        },
                        {
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '230px',
                            sortable: true
                        },
                        {
                            field: 'unInvoiceQty',
                            caption: '未开票数量',
                            size: '230px',
                            sortable: true
                        },
                        {
                            field: 'payableEstimateAmount',
                            caption: '应付暂估金额',
                            size: '230px',
                            render: 'money',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.payableSummary.clear(); //清空
                w2ui.payableSummary.records = arr
                w2ui.payableSummary.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    unInvoiceQty: current.unInvoiceQty,
                    payableEstimateAmount: current.payableEstimateAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span>合计</span>',
                    unInvoiceQty: total.unInvoiceQty,
                    payableEstimateAmount: total.payableEstimateAmount,
                })
                $('#main').w2render('payableSummary');
                  w2ui.payableSummary.refresh();
                //  $(document).ready(function(){
                //     $('div[title="当页小计"]').find('span').eq(0).remove()
                // })
            } else {
                $(document).ready(function () {
                    w2ui.payableSummary.clear(); //清空
                    w2ui['payableSummary'].records = []
                    w2ui.payableSummary.refresh();
                    $('#main').w2render('payableSummary')
                })

            }

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
                  this.formSearch.startTime=filters.get_year_month_day(1577808000000)//开始日期
                  this.formSearch.endTime=filters.get_year_month_day(new Date().getTime())  //截止日期
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
                data.pageResourceCode='payable-provisional-estimate-page'
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
                    data.developTypeName=this.formSearch.developTypeName
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
                 const{basicCompanyId,basicSupplierId,purchaseOrderNo,goodsNo,startTime,endTime,arriveInvoiceDate}=this.formSearch
            if(new Date(startTime).getTime()>new Date(endTime).getTime()) return this.$message.error('业务开始时间不能大于结束时间')
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicCompanyId=basicCompanyId
                data.basicSupplierId=basicSupplierId
                data.purchaseOrderNo=purchaseOrderNo
                data.goodsNo=goodsNo
                data.poInTimeStart=startTime
                data.poInTimeEnd=endTime
                data.arriveInvoiceDate=arriveInvoiceDate
            this.request('payable_payable_provisional_estimate_detail_exportSumTotal', data, true).then(res => {
                      if (res.code == 1) {
                        if (res.data>100000){
                             this.exportVisible=true
                        }else{
                             this.onImport()
                        }
                       }else{
                            this.$message.error(res.msg)
                      }
            })
        },
         onImport(){
                 this.exportVisible=false;
                const{basicCompanyId,basicSupplierId,purchaseOrderNo,goodsNo,startTime,endTime,arriveInvoiceDate}=this.formSearch
            if(new Date(startTime).getTime()>new Date(endTime).getTime()) return this.$message.error('业务开始时间不能大于结束时间')
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicCompanyId=basicCompanyId
                data.basicSupplierId=basicSupplierId
                data.poInTimeStart=startTime
                data.poInTimeEnd=endTime
                data.arriveInvoiceDate=arriveInvoiceDate
            this.request('payable_payable_provisional_estimate_detail_exportSum', data, true).then(res => {
                      if (res.code == 1) {
                               this.getKey(res.data)
                       }else{
                            this.$message.error(res.msg)
                      }
            })
        },
        getData() {
             const{basicCompanyId,basicSupplierId,purchaseOrderNo,goodsNo,startTime,endTime,arriveInvoiceDate}=this.formSearch
            if(new Date(startTime).getTime()>new Date(endTime).getTime()) return this.$message.error('业务开始时间不能大于结束时间')
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.basicCompanyId=basicCompanyId
                data.basicSupplierId=basicSupplierId
                data.poInTimeStart=startTime
                data.poInTimeEnd=endTime
                data.arriveInvoiceDate=arriveInvoiceDate
                this.request('payable_payable_provisional_estimate_detail_sumPage', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index = i + 1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                    } else {
                        this.initTable([])
                    }
                    this.loading = false
                    this.$store.commit('clearCheckBillGoodsList')
                    this.$store.commit('clearcheckBilllogList')
                    this.$store.commit('clearcheckBilldeductionList')

                } else {
                    this.initTable([])
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
       handleShowHidden(name) {
            this.detailsShow = false
            console.log(name)
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight+ 560) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight +340) * 0.5
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight + 340) * 0.5
                   
                } else {
                    this.oneTableHeight = (document.body.offsetHeight+ 120) *0.5
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
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.37
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
    }
}

</script> 


<style lang="less" scoped>
 .el-form-item--mini.el-form-item{
     margin-bottom: 10px;
     margin-right:5px;
 }
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
.main,
.middle,
.footer {
    width: 99%;
    margin: 0 auto;
    height:auto;
    background: #fff;
    padding: 15px 0px 10px 10px;
    margin-bottom: 10px;
}
.headerstyle{
    width: 99%;
    margin: 0 auto;
    height:auto;
    background: #fff;
    padding: 20px 0px 0px 10px;
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

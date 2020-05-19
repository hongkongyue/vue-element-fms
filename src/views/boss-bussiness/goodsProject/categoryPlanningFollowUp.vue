<style lang="less" scoped>
 @import 'https://unpkg.com/pl-table/themes/index.css';
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
<template>
<div>
    <header class="headerstyle">
         <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-form  v-if="!showhidden" :inline="true" :model="formSearch" class="demo-form-inline" style="width:99%">
        <!-- <el-form :inline="true" :model="formSearch" class="demo-form-inline "> -->
            <el-form-item size="small">
                <el-button  v-if="judgeMenu.indexOf('查询') !== -1"   size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button    size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button  v-if="judgeMenu.indexOf('导出') !== -1"    size="small" type="primary" @click="onExport">导出</el-button>
            </el-form-item>
            <Col>
                 <el-form-item label="品牌：" size="small">
                        <el-select v-model="formSearch.basicBrandId" clearable filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
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
            </Col>
        </el-form>
    </header>
    <section class="middle" style="height:100%;padding-top:10px">
        <div   :style="{minHeight:showBink&&showhidden?'740px':'450px'}">
             <!-- <plx-table-grid :datas="list999"  border style="width: 100%"  :height="list.length>0?100:100" :pagination-show="false">
                        <plx-table-column   type="index" width="95" label="序号"  resizable   align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="任务编号"  align="center"/>
                        <plx-table-column   type="index" width="95" label="流程状态"  resizable   align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="发起人"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="发起部门"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="品牌"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="调整类型"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="调整建议"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="发起时间"  align="center"/>
            </plx-table-grid> -->
               <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
               </el-pagination>
               <el-table :data="list" border style="width: 100%" highlight-current-row  :height="showBink?400:280" :pagination-show="false" @row-click="getRowData">
                            <el-table-column   type="index" width="55" label="序号"    resizable   align="center" show-overflow-tooltip/>
                            <el-table-column   prop="basicBrandName"   min-width="95"  resizable  label="品牌"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="years" width="95" label="年份"    resizable  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="season"  min-width="95"  resizable  label="季节"      align="center" show-overflow-tooltip/>
                            <el-table-column   prop="waveBand"  min-width="95"  resizable  label="波段"      align="center" show-overflow-tooltip/>
                            <el-table-column   prop="secondLevel"  min-width="95"  resizable  label="二级品类"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="planningDevelopDate"  min-width="95"  resizable  label="规划开发日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="planningDeliverDate"  min-width="95"  resizable  label="规划交接日期" align="center" show-overflow-tooltip/>
                            <el-table-column   prop="colorSimpleDate"  min-width="95"  resizable  label="齐色样日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="planningArriveDate"  min-width="95"  resizable  label="规划到货日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="photoDate"          min-width="95"  resizable  label="拍照日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="planningLaunchDate"  min-width="95"  resizable  label="可上新日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="launchDate"          min-width="95"  resizable  label="上新日期"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="developCostPrice"  min-width="95"  resizable  label="品类开发成本"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.developCostPrice|moneyFilters}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column   prop="developStyleQty"  min-width="95"  resizable  label="计划开发款数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="remark"           min-width="95"  resizable  label="备注"  align="center" show-overflow-tooltip/>
                </el-table>
                <div style="height:40px;padding-top:20px;padding-left:10px">开发明细</div>
                 <el-table :data="downList" border style="width: 100%" :height="showhidden?200:''">
                            <el-table-column   prop="finishStyleQty"  min-width="95"  resizable  label="已开发款数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="planningDevelopPostponeDate" width="95" label="设计稿延期天数"    resizable   align="center" show-overflow-tooltip/>
                            <el-table-column   prop="fillingPostponeDay"  min-width="95"  resizable  label="建档延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="firstSimplePostponeDay"  min-width="95"  resizable  label="头版样衣指令延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="firstSimpleFinishPostponeDay"  min-width="95"  resizable  label="头版样衣完成延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="orderStyleQty"  min-width="95"  resizable  label="下单款数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="firstColorQty"          min-width="95" label="下单色数"    resizable   align="center" show-overflow-tooltip/>
                            <el-table-column   prop="firstQty"  min-width="95"  resizable  label="下单数量"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="firstAmount"  min-width="95"  resizable  label="下单金额"  align="center" show-overflow-tooltip>
                                 <template slot-scope="scope">
                                   <div style="text-align:right">{{scope.row.firstAmount|moneyFilters}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column   prop="designerPostponeDay"  min-width="95"  resizable  label="设计师下单延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="producePostponeDay"  min-width="95"  resizable  label="生产下单延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="simpleCreatePostponeDay"  min-width="95"  resizable  label="拍摄样指令创建延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="simpleFinishPostponeDay"  min-width="95"  resizable  label="拍摄样完成延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="unPricingStyleQty"  min-width="95"  resizable  label="大货未核价款数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="orderTotalAmount"  min-width="95"  resizable  label="规划开发金额"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                   <div style="text-align:right">{{scope.row.orderTotalAmount|moneyFilters}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column   prop="actualCostAmount"  min-width="95"  resizable  label="实际开发成本"  align="center" show-overflow-tooltip>
                               <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.actualCostAmount|moneyFilters}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column   prop="diffAmount"  min-width="95"  resizable  label="金额差异"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.diffAmount|moneyFilters}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column   prop="diffCostAmount"  min-width="95"  resizable  label="成本差异"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.diffCostAmount|moneyFilters}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column   prop="purchasePostponeDay"  min-width="95"  resizable  label="入库延期天数"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="purchaseQty"  min-width="95"  resizable  label="入库数量"  align="center" show-overflow-tooltip/>
                            <el-table-column   prop="purchaseAmount"  min-width="95"  resizable  label="入库金额"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.purchaseAmount|moneyFilters}}</div>
                                </template>
                            </el-table-column>
                </el-table>
        </div>  
    </section>
    <!--导出-->
    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible"  title="款号档案" @on-cancel='cancel' :width="560" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <el-table   border :data="tableList"  max-height="250"  style="width: 100%" >
                      <el-table-column
                        prop="radio"
                        label="状态"
                        width="180"
                        align="center"
                        >
                        <template slot-scope="scope">
                                    <el-radio v-model="scope.row.radio" label="1">启用</el-radio>
                                    <el-radio v-model="scope.row.radio" label="2">停用</el-radio>
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="设计款号"
                            align="center"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        align="center"
                        label="下单状态"
                        >
                        </el-table-column>
                </el-table>
                <el-form-item style="padding-left:200px">
                    <Button type="primary"  @click="submitForm">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
var totalPageSum = {}
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce.js'
import {commonMixins} from 'mixins/common'
export default {
    mixins    : [debounce,commonMixins],
    components: {
        //    DragList
    },
    data() {
        return {
            list  : [],
            downList:[],
            showEdit:false,
            judgeMenu:[],
            departmentList:[],
            formSearch:{
                        secondLevel:'',
                        basicBrandId:'',
                        years:'',
                        season:'',
                        waveBand:'',  
            },
            currentPage:1,
            total:0,
            pageSize:10,
            dialogVisible: false, //新增
            tableList:[
                {
                radio:'1',
                status:'已下单'

            },{
                radio:'2',
                status:'已下单'

            },{
                radio:'1',
                status:'已下单'

            },{
                radio:'1',
                status:'已下单'

            }
            ]
        }
    },
    computed: {
    },
    destroyed() {
        this.$store.commit('clearscmOrder')
    },
    mounted() {
              this.getButtonJurisdiction()
              this.getSecondLevel()
              this.getBrandList()
              this.getwaveList()
    },
    methods: {
        getAlert(param1,param2){
                   this.dialogVisible=true;
        },
        getRowData(obj){
            console.log(obj)
            this.$set(this.downList,0,obj)
            // this.downList=[obj]
        },
        showDrag(){
                  this.showDragVisible=true
        },
        submitForm(){
        },
        onSubmit(){
                console.log(this.list,'99999999999')
        },
        cancel(){
                  this.dialogVisible=false
        },
        onReset() {
            for(let i in this.formSearch){
                this.formSearch[i]=''
            }
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.currentPage = page
            this.getData()
        },
        getData() {
                this.downList=[]
                const{secondLevel,basicBrandId,years,season,waveBand}=this.formSearch
                let data = {}
                    data.pageSize = this.pageSize
                    data.currentPage = this.currentPage
                    data.secondLevel=secondLevel
                    data.basicBrandId=basicBrandId
                    data.years=years?Number(years):''
                    data.season=season
                    data.waveBand=waveBand
                this.request('boss_business_pageClassFollow', data, true).then(res => {
                    if (res.code == 1) {
                            this.total = res.data.total;
                            this.list=res.data.records
                            this.loading = false
                    } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                    }
                })
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        onExport(){
                  const{secondLevel,basicBrandId,years,season,waveBand}=this.formSearch
                let data = {}
                    data.pageSize = this.pageSize
                    data.currentPage = this.currentPage
                    data.secondLevel=secondLevel
                    data.basicBrandId=basicBrandId
                    data.years=years?Number(years):''
                    data.season=season
                    data.waveBand=waveBand
                this.request('boss_business_exportClassFollow', data, true).then(res => {
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
        getButtonJurisdiction() {
            let data = {};
            data.parentResourceCode = this.$route.query.code;
            this.request("masterData_resource_buttonResource", data, true).then(
                res => {
                if (res.code == 1) {
                    this.buttonList = res.data;
                    let newList = [];
                    this.buttonList.map(function(item) {
                         newList.push(item.resourceName);
                    });
                    this.judgeMenu = newList;
                }
                }
            );
        },
    }
}
</script> 



<style>
 .plx-table .plx-header--column.col--ellipsis{
    height: 4px;
}
 .plx-table .plx-body--column.col--ellipsis{
    height: 40px;
}

.plx-table tr, .plx-table th {
    padding-top: 6px!important;
    padding-bottom: 6px!important;
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
</style>
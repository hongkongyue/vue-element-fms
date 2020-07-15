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
.headerstyle{
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 10px 10px;
    height: 50px;
    margin-bottom: 10px;

}
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
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item v-if="this.$route.query.adjustTypeCode != '5'" size="small">
                <el-button    size="small" type="primary" @click="exportExcel">导出明细</el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <div  :style="{minHeight:showBink?'730px':'530px'}">
               <div style="display:flex">
             <plx-table-grid :data="upList"  border style="width: 100%;flex:1"  :height="150"  :pagination-show="false">
                        <plx-table-column   type="index" width="95" label="序号"  resizable   align="center"/>
                        <plx-table-column   prop="taskNo"  min-width="95"  resizable  label="任务编号"  align="center"/>
                        <plx-table-column   prop="adjustStatus" width="95" label="流程状态"  resizable   align="center">
                        </plx-table-column>
                        <plx-table-column   prop="createUser"  min-width="95"  resizable  label="发起人"  align="center"/>
                        <plx-table-column   prop="createUserDepartmentName"  min-width="95"  resizable  label="发起部门"  align="center"/>
                        <plx-table-column   prop="basicBrandName"  min-width="95"  resizable  label="品牌"  align="center"/>
                        <plx-table-column   prop="years"  min-width="95"  resizable  label="年份"  align="center"/>
                        <!-- <plx-table-column   prop="adjustTypeName"  min-width="95"  resizable  label="调整类型"  align="center"/> -->
                        <plx-table-column   prop="asjustAdvise"  min-width="95"  resizable  label="调整建议"  align="center"/>
                        <plx-table-column   prop="created"  min-width="95"  resizable  label="发起时间"  align="center"/>
            </plx-table-grid>
              <div v-if="this.$route.query.adjustTypeCode != '5'" style="flex:1;max-height:150px;overflow-y:auto;padding:0px 10px 10px 10px;border:1px solid #eee;border-left:0" title="修改日志">
                      <h3>修改日志:</h3>
                      <p v-for="v in log" :key="v">{{v}}</p>
                </div>
             </div>
            <div style="height:40px;line-height:40px;padding-left:20px">企划调整明细</div>
            <plx-table-grid v-if="this.$route.query.adjustTypeCode != '5'" :data="list" border style="width: 100%"  :height="showBink?565:355" :pagination-show="false">
                       <plx-table-column fixed="left"  type="index" width="65" label="序号"  resizable   align="center"/>
                        <plx-table-column fixed="left"  prop="basicBrandName"  min-width="95"  resizable  label="品牌"  align="center"/>
                        <plx-table-column fixed="left"  prop="years" width="95" label="年份"  resizable   align="center"/>
                        <plx-table-column fixed="left"  prop="season"  min-width="95"  resizable  label="季节"  align="center"/>
                        <plx-table-column fixed="left"  prop="secondLevel"  min-width="95"  resizable  label="二级品类"  align="center"/>
                        <plx-table-column fixed="left"  prop="thirdLevel"  min-width="95"  resizable  label="三级品类"  align="center"/>
                        <plx-table-column    min-width="180"  resizable  label="原企划"  align="center">
                                   <plx-table-column   prop="originDevelopQty"     width="90"  resizable  label="款数"  align="center">
                                   </plx-table-column>
                                   <plx-table-column   prop="originStyleColor"     width="90"  resizable  label="款色"  align="center">
                                   </plx-table-column>
                                   <plx-table-column   prop="originDevelopPercent"  width="90"  resizable  label="占比"  align="center">
                                   </plx-table-column>
                         </plx-table-column>
                         <plx-table-column             width="180"  resizable  label="调整后企划"  align="center">
                                   <plx-table-column   prop="adjustDevelopQty"  min-width="90"  resizable  label="款数"  align="center">
                                   </plx-table-column>
                                   <plx-table-column   prop="adjustStyleColor"  min-width="90"  resizable  label="款色"  align="center">
                                   </plx-table-column>
                                   <plx-table-column   prop="adjustDevelopPercent"  min-width="90"  resizable  label="占比"  align="center">
                                   </plx-table-column>
                         </plx-table-column>
                         <plx-table-column    width="180"  resizable  label="实际已开发"  align="center">
                                   <plx-table-column    prop="actualDevelopedQty"         width="90"  resizable  label="款数"  align="center">
                                   </plx-table-column>
                                   <plx-table-column    prop="actualDevelopedStyleColor"  width="90"  resizable  label="款色"  align="center">
                                   </plx-table-column>
                                   <plx-table-column    prop="actualDevelopedPercent"     width="90"  resizable  label="占比"  align="center">
                                   </plx-table-column>
                         </plx-table-column>
                         <plx-table-column  v-for="v in columns" :key="v.label"  :prop="v.prop"  resizable  width="220"   :label="v.label"  align="center">
                                   <plx-table-column v-for="i in v.arr" :key="i.prop"   :prop="i.prop"  width="110"  resizable  :label="i.label"  align="center">
                                       <template slot-scope="scope">
                                            <div v-if="i.label=='原开发款数'"  class="active currentEle" style="position:relative;cursor:pointer;"   @click="getAlert(v.label,scope.row)">{{scope.row[i.prop]}}</div>
                                             <div v-if="i.label=='调整后开发款数'"  style="position:relative;cursor:pointer;">{{scope.row[i.prop]}}</div>
                                            <!-- <el-input-number  :disabled="scope.row[i.prop]==0" style="width:80px" size="small" v-if="i.label=='调整后开发款数'" v-model="scope.row[i.prop]" :min="0" :controls="false"></el-input-number> -->
                                       </template>
                                   </plx-table-column>
                         </plx-table-column>
            </plx-table-grid>

            <!-- 品类要素调整 -->
            <plx-table-grid v-if="this.$route.query.adjustTypeCode == '5'" :data="this.goodsList" border style="width: 100%"  :height="showBink?500:300" :pagination-show="false">
                        <plx-table-column   type="index" width="65" label="序号"  resizable   align="center"/>
                        <plx-table-column   prop="basicBrandName"  min-width="95"  resizable  label="品牌"  align="center"/>
                        <plx-table-column   prop="years" width="95" label="年份"  resizable   align="center"/>
                        <plx-table-column   prop="season"  min-width="95"  resizable  label="季节"  align="center"/>
                        <plx-table-column   prop="secondLevel"  min-width="95"  resizable  label="二级品类"  align="center"/>
                        <plx-table-column   prop="thirdLevel"  min-width="95"  resizable  label="三级品类"  align="center"/>
                        <plx-table-column   prop="colorRateBefore"  min-width="95"  resizable  label="调整前色比"  align="center"/>
                        <plx-table-column   prop="colorRate"  min-width="95"  resizable  label="调整后色比"  align="center">
                            
                        </plx-table-column>
                        <plx-table-column   prop="developCostPriceBefore"  min-width="95"  resizable  label="调整前成本"  align="center"/>
                        <plx-table-column   prop="developCostPrice"  min-width="95"  resizable  label="调整后成本"  align="center">
                           
                        </plx-table-column>
                        <plx-table-column   prop="rateDevelopCostPrice"  min-width="95"  resizable  label="含税成本"  align="center"/>
                        
            </plx-table-grid>
        </div>  
    </section>
    <!--导出-->
      <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible"  title="款号档案" @on-cancel='cancel' :width="560" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <el-table   border :data="tableList"  max-height="250"  style="width: 100%" >
                      <el-table-column
                        prop="enable"
                        label="设计款号状态"
                        width="180"
                        align="center"
                        >
                        <template slot-scope="scope">
                                    <el-radio v-model="scope.row.enable" label="1">启用</el-radio>
                                    <el-radio v-model="scope.row.enable" label="0">停用</el-radio>
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="designNo"
                            label="设计款号"
                            align="center"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="orderStatus"
                        align="center"
                        label="大货首单状态"
                        >
                        </el-table-column>
                </el-table>
                <!-- <el-form-item style="padding-left:200px">
                    <Button type="primary"  @click="submitForm">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item> -->
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
var totalPageSum = {}
import filters from '../../../filter/'
import{debounce}  from 'mixins/debounce.js'
import {burypoint} from 'mixins/burypoint'
import { export_json_to_excel,format_json_list_by_filter,convert26 } from '@/libs/excel/Export2Excel'
export default {
    mixins:[debounce,burypoint],
    components: {

        //    DragList
    },
    data() {
        return {
            goodsList:[],
            list  : [],
            showEdit:false,
            formData:{},
            list1 : [
                    //  {label:'品牌'},
                     {label:'二级分类',prop:'purchaseOrderNo'},
                     {label:'品类开发成本',prop:'purchaseOrderNo'},
                     {label:'计划开发款数',prop:'purchaseOrderNo'},
                     {label:'已开发款数',prop:'purchaseOrderNo'},
                     {label:'下单款数',prop:'purchaseOrderNo'},
                     {label:'下单色数',prop:'purchaseOrderNo'},
                     {label:'大货未核价款数',prop:'goodsNo'},
                   
            ],
            list2 : [
                     {label:'下单数量',prop:'purchaseOrderNo'},
                     {label:'下单金额',prop:'purchaseOrderNo'},
                     {label:'规划开发金额',prop:'purchaseOrderNo'},
                     {label:'金额差异',prop:'purchaseOrderNo'},
                     {label:'实际平均成本',prop:'purchaseOrderNo'},
                     {label:'成本差额',prop:'purchaseOrderNo'},
            ],
            columns:[
                    //  {label:'二级分类',    prop:'purchaseOrderNo',
                    //  arr:[
                    //      {label:'原开发款数',    prop:'one'},
                    //      {label:'调整后开发款数',prop:'two'},
                    //      ]
                    //  },
                    //  {label:'品类开发成本',      prop:'purchaseOrderNo',
                    //    arr:[
                    //      {label:'原开发款数',    prop:'three'},
                    //      {label:'调整后开发款数',prop:'four'},
                    //      ]
                    //   },
                    //  {label:'计划开发款数',prop:'purchaseOrderNo'},
                    //  {label:'已开发款数',prop:'purchaseOrderNo'},
                    //  {label:'下单款数',prop:'purchaseOrderNo'},
                    //  {label:'下单色数',prop:'purchaseOrderNo'},
                    //  {label:'大货未核价款数',prop:'goodsNo'},

            ],
            dialogVisible: false, //新增
            tableList:[
            ],
            log:[], 
            upList:[],
        }
    },
    computed: {
    },
    // destroyed() {
    //     this.$store.commit('clearscmOrder')
    // },
    mounted() {
          this.getUptable()
          this.getData()
           $(document).on('click','.currentEle',function(){
                $(this).css({'background':'#99ff99'}).parents('td').siblings().find('.currentEle').css({'background':''})
                $(this).css({'background':'#99ff99'}).parents('tr').siblings().find('.currentEle').css({'background':''})
            })
            this.getLogList()
    },
    methods: {
          getLogList(){
                  let   data={}
                        data.adjustTaskNo=this.$route.query.taskNo
                        this.request('boss_bossGoodsPlanningAdujust_queryAdhustDetailLog',data,false).then(res=>{
                              if(res.code==1){
                                       this.log=res.data
                              }                
                        })
       },
        exportExcel(){
            this.setBuryPoint('导出明细')
         if(this.list.length==0)return this.$message.error('暂无导出数据')
        let dynamicFirstHead = new Array()
        let dynamicSecondHead = new Array()
        let dynamicProps = new Array()
        let dynamicFirstHeadMerges = new Array()
        let charCodeOfFix = 17
        this.columns.map(firstHead=>{
            dynamicFirstHead.push(firstHead.label)
            dynamicFirstHead.push('')  //首行列合并占位符
            dynamicFirstHeadMerges.push(convert26(++charCodeOfFix)+"1:"+ convert26(++charCodeOfFix)+"1")
            firstHead.arr.map(secondHead=>{
                dynamicSecondHead.push(secondHead.label)
                dynamicProps.push(secondHead.prop)
            })
        })
        console.log(dynamicFirstHeadMerges,'000000000')
        let multiHeader = [['品牌', '年份','季节','二级品类','三级品类','原企划','','','调整后企划','','','原企划已开发','','','原企划实际开发','','', ...dynamicFirstHead]]
        let header = ['', '','','','','款数','款色','占比','款数','款色','占比','款数','款色','占比','款数','款色','占比',...dynamicSecondHead]
        let filterVal = ['basicBrandName', 'years','season','secondLevel','thirdLevel','originDevelopQty','originStyleColor','originDevelopPercent','adjustDevelopQty','adjustStyleColor',
                          'adjustDevelopPercent','originDevelopedQty','originDevelopedStyleColor','originDevelopedPercent','actualDevelopedQty','actualDevelopedStyleColor','actualDevelopedPercent', ...dynamicProps]
        let data = format_json_list_by_filter(filterVal, this.list)
        let merges = ['A1:A2', 'B1:B2','C1:C2','D1:D2','E1:E2','F1:H1','I1:K1','L1:N1','O1:Q1', ...dynamicFirstHeadMerges]
        let myDate = new Date();
        myDate.toLocaleString();        //获取日期与时间
        let filename = '企划调整审核详情导出明细' + myDate.toLocaleString()
                export_json_to_excel({
                    multiHeader,
                    header,
                    merges,
                    data,
                    filename
                })

            // }
        },
       getAlert(waveBand,param){
                    // console.log(waveBand)
                    this.dialogVisible=true;
                   const{basicBrandId,years,season,thirdLevel}=param
                    let data={}
                        data.basicBrandId=basicBrandId
                        data.years=years
                        data.season=season
                        data.waveBand=waveBand
                        data.thirdLevel=thirdLevel
                    this.request('boss_bossGoodsPlanningAdujust_queryOriginDevelop',data,false).then(res=>{
                        if(res.code==1){
                                  for(let i=0,len=res.data.length;i<len;i++){
                                          res.data[i].enable=String(res.data[i].enable) 
                                   }
                                  this.tableList=res.data 
                        }else{
                                  this.$message.error(res.msg)
                        }
                    })
        },
   
    
        cancel(){
                  this.dialogVisible=false
        },
     
        withdraw(){
               const{id,taskNo}=this.$route.query
               let data={}
                   data.id=id
                   data.taskType='企划调整审核'
                this.request('boss_boss_adjust_task_callBack',data,false).then(res=>{
                     if(res.code==1){
                            this.$message.success('撤回成功')
                            this.$root.eventHub.$emit('closePageFromOtherPage', 'planningAdjustmentAuditDetail');//关闭新增页面
                            this.$router.push({
                                                    name:'planningAdjustmentAuditTask',
                                                    query: {   
                                                            taskNo: taskNo,
                                                            id:params.id,
                                                         }
                             })
                            
                     }else{
                            this.$message.error(res.msg)
                     }
                })            
        },
        aduit(){
               const{id,taskNo}=this.$route.query
               let data={}
                   data.id=id
                   data.taskType='企划调整审核'
                this.request('boss_boss_adjust_task_audit',data,false).then(res=>{
                     if(res.code==1){
                            this.$message.success('审核成功')
                            this.$root.eventHub.$emit('closePageFromOtherPage', 'planningAdjustmentAuditDetail');//关闭新增页面
                            this.$router.push({
                                                    name:'planningAdjustmentAuditComplated',
                                                    query: {   
                                                            taskNo: taskNo,
                                                            id:id,
                                                         }
                             })
                            
                     }else{
                           this.$message.error(res.msg)
                     }
                })
        },
        getUptable(){
             let data={}
                 data.taskStatus= 900
                 data.taskType  ='企划调整审核'
                 data.taskNo    =  this.$route.query.taskNo
               this.request('boss_boss_adjust_task_page_query_adjust_task', data, true).then(res => {
                    if (res.code == 1) {
                            this.upList=res.data.records
                    } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                     }
                })
        },
        getData() {
            if(this.$route.query.adjustTypeCode == '5'){
                let data  = {}
                data.mainId = this.$route.query.id
                this.request('getCategoryElementsDetail', data, true).then(res => {
                    if (res.code == 1) {
                            this.goodsList=res.data
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            }else{
                let data                 =  {}
                data.adjustTaskNo    =  this.$route.query.taskNo
                $('.currentEle').css({'background':''})
                this.request('boss_bossGoodsPlanningAdujust_queryAdhustDetail', data, true).then(res => {
                    if (res.code == 1) {
                         this.columns=res.data.columns
                        //  this.list=res.data.rows
                          res.data.rows.map(item=>{
                              for(let i in item){
                                  if(item[i]==-1){
                                      item[i]='--'
                                  }
                              }
                         })
                         setTimeout(()=>{
                               this.list=res.data.rows
                            // console.log(this.list)
                        },1000)
                } else {
                     this.list=[]
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
            }
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
    }
}
</script> 
<style>
 .plx-table .plx-header--column.col--ellipsis{
        height: 20px;
}
 .plx-table .plx-body--column.col--ellipsis{
        height: 32px;
}
.plx-table tr, .plx-table th {
        padding-top: 2px!important;
        padding-bottom: 2px!important;
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
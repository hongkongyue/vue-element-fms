<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                  <div>
                    <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('同步') !== -1"  size="small" type="primary" @click="synchronous">同步</el-button>
                          </el-form-item>
                  </div>
                </el-form>
          </header>
          <section class="middle" :style="maxHeight">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
           <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border
                  tooltip-effect="dark" max-height="250" @selection-change="handleSelectionChange">
                  <!-- <el-table-column
                type="selection"
                width="55">
            </el-table-column> -->
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="seasonCode" label="季节代码" min-width="120" align="center">
                </el-table-column>
                <el-table-column
                  prop="season"
                  label="季节"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
         </el-table>
         <p style="font-size:16px;margin-top:10px">操作日志</p>
         <!-- <section class="middle"> -->
                <el-table
                 :data="logList"
                 style="width: 100%"
                 border
                 tooltip-effect="dark"
                 max-height="250"
                 >
                <el-table-column
                  prop="operator"
                  label="操作员"
                  min-width="120"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="operateTime"
                  label="操作时间"
                  align="center"
                  min-width="120">
                    <template slot-scope="scope">{{scope.row.operateTime}}</template>
                </el-table-column>
                <el-table-column
                  prop="logContent"
                  label="操作记录"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
          </el-table-column>
         </el-table>  
         <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div> 
         <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>   
        </section>
        
     </div>
</template>


<script>
  import {burypoint} from 'mixins/burypoint'
  export default {
    mixins:[burypoint],
    data() {
      return {
              formSearch:{},
              maxHeight:'',
              logList:[],//日志
              billNo:'',
              total:0,
              pagesize:10,
              currentPage:1,
              tableData:[],//主table数据
              tableJournal:[],//操作日志数据
              buttonList:[],//按钮权限
              judgeMenu:[],
              logPage:1,
         }
    },
    mounted() {
        console.log(window.screen.height)
        if(window.screen.height > 1000){
          this.maxHeight = "height:740px"
        }else{
          this.maxHeight = "height:530px"
        }
            this.getData()
            this.getButtonJurisdiction()//按钮权限
        },
    methods: {
      //同步
      synchronous(){
        this.setBuryPoint('同步')
        let data = {}
        this.request('season_sync', data, true).then(res => {
          if (res.code==1) {
            this.getData()
            this.$message.success('同步成功')
            }else{
              this.$message.error(res.msg)
            }
          })
      },
      getButtonJurisdiction(){
        let data = {}
            data.parentResourceCode = this.$route.query.code
        this.request('masterData_resource_buttonResource', data, true).then(res => {
          if (res.code==1) {
            this.buttonList = res.data
            let newList = []
            this.buttonList.map(function(item){
              newList.push(item.resourceName)
            })
            this.judgeMenu = newList
            }
          })
      },
     handleSelectionChange(row){
        console.log(row)
        this.rowLenght = row.length
        this.rowObj = row[0]
        console.log(this.rowObj)
      },
      getData(){
        this.logList = []
        let data = {}
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('season_page', data, true).then(res => {
          if (res.code==1) {
            this.total = res.data.count;
            this.tableData = res.data.records;
            }
          })
        },
        getLoglist(billNo){
                     this.billNo=billNo
                     this.logPage=1
                    let data={}
                        data.billNo     ="master_data_season_"+ this.billNo
                        data.pageSize   = 3 
                        data.currentPage=this.logPage
                     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                            if (res.code == 1) {
                                   if (res.data.length < data.pageSize) {
                                        this.dataFlag = false
                                      } else {
                                        this.dataFlag = true
                                      }
                                  if (this.logPage== 1) {
                                       this.logList=res.data 
                                  } else {
                                    this.logList=this.logList.concat(res.data) 
                                  }   
                             }
                       }) 
        },
        getMore(){
                  this.logPage++
                  let data={}
                      data.billNo     ="master_data_season_"+ this.billNo
                      data.pageSize   = 3
                      data.currentPage=this.logPage
                      this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                              if (res.code == 1) {
                                    if (res.data.length < data.pageSize) {
                                          this.dataFlag = false
                                        } else {
                                          this.dataFlag = true
                                        }
                                    if (this.logPage== 1) {
                                        this.logList=res.data 
                                    } else {
                                      this.logList=this.logList.concat(res.data) 
                                    }   
                              }
                        }) 
          },
          showLog(row){
             this. getLoglist(row.id)  
          },
      
          handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
               this.pagesize = val
               this.getData()
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.currentPage = val
              this.getData()
          },
          onAdd(){
                this.dialogVisible=true    
          },
          //查询
        onSearch(){
          this.currentPage = 1
          this.getData()
          
        },
        //重置
        onReset(){
          this.formSearch = {}
        },

    }
  }
</script>
<style scoped="scoped" lang="less">
    .headerstyle,.main,.middle,.footer{
      width:99%;margin:0 auto;background:#fff;
      padding: 20px 20px 10px 20px;
      margin-bottom:10px;
    }
    .getmore{
          padding-top: 6px;
          width:100%;
          height:40px;
          line-height:40px;
          text-align: center;
          font-size:12px;
          cursor:pointer;
    }
    .pointer{
        cursor:pointer;
    }
    .pl20{
      padding-left: 20px
    }
</style>
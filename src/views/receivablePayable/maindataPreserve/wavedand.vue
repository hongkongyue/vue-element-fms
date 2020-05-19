<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                  <div>
                    <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onAdd">编辑</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('同步') !== -1"  size="small" type="primary" @click="synchronous">同步</el-button>
                          </el-form-item>
                  </div>
                          <el-form-item label="波段名称："   size="small">
                              <el-input style="width:150px" v-model="formSearch.developType" clearable placeholder="请输入内容"></el-input>
                          </el-form-item>
                          <el-form-item label="备注："   size="small">
                              <el-input style="width:150px" v-model="formSearch.remark" clearable placeholder="请输入内容"></el-input>
                          </el-form-item>
                          <el-form-item label="开发类型："   size="small">
                              <el-select v-model="formSearch.typeStatus" filterable clearable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in developTypeList" :key="item.developType" :label="item.developType" :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                          
                          
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
                  <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="code" label="波段编码" min-width="120" align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="波段名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="englishName" label="英文名称" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="contractUnitPriceDifferenceRange" label="合约单价差额范围" min-width="120" align="center">
                </el-table-column>
                 <el-table-column prop="remark" label="备注" min-width="120" align="center">
                </el-table-column>
                 <el-table-column prop="developTypeName" label="开发类型" min-width="120" align="center">
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
       <!-- </section> -->
        </section>
        <!-- <section class="footer" style="margin-bottom:0px">
           <div style="width:100%;font-size:20px;">操作日志</div>
        </section> -->
        
       <!-- 编辑弹框 -->
          <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="编辑"  :width="750" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form :rules="rules" ref="ruleForm" label-width="140px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="12">
                  <el-form-item label="波段编码：" size="small">
                    <el-input v-model="ruleForm.code" disabled style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="12">
                  <el-form-item label="波段名称：" size="small">
                    <el-input v-model="ruleForm.name" disabled style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="12">
                  <el-form-item label="英文名称：" size="small">
                    <el-input v-model="ruleForm.engName" disabled style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="12">
                  <el-form-item label="合约单价差额范围：" size="small">
                    <el-input v-model="ruleForm.money" disabled style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="24">
                  <el-form-item label="备注：" size="small">
                    <el-input v-model="ruleForm.remark" disabled style="width:500px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="12">
                  <el-form-item label="开发类型："prop="developStatus" size="small">
                    <el-select v-model="ruleForm.developStatus" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in developTypeList" :key="item.developType" :label="item.developType" :value="item.id"></el-option>
                        </el-select>
                  </el-form-item>
                </Col>
                <!-- <Col span="24">
                  <el-form-item style="text-align:center">
                      
                    </el-form-item>
                </Col> -->
                
              </el-form>
              
            </Row>
            <div slot="footer">
              <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                      <Button type="default" @click="addCancel">取消</Button>
            </div>
          </Modal>
     </div>
</template>


<script>
  export default {
    data() {
      return {
        developTypeList:[],
        typeStatusList:[{id:0,name:'停用'},{id:1,name:'启用'}],
          maxHeight:'',
        enableList:[{value:0,name:'停用'},{value:1,name:'启用'}],
        logList:[],//日志
        billNo:'',
        rowId:'',
        rowStatus:'',
        platformOptions:[],
        dialogVisible:false,//新增
        changeVisible:false,//编辑
        formSearch: {
              user: '',
              region: '',
             
        },
        ruleForm:{
            code:'',
            name: '',
            engName:'',
            money: '',
            remark:'',
            developStatus:''
        },
        rules:{  
          developStatus:[
            {  required: true, message: '请选择', trigger: 'change' }
          ]
        },
        total:0,
        pagesize:10,
        currentPage:1,
        tableData:[],//主table数据
        tableJournal:[],//操作日志数据
        rowLenght:0,//选择几条数据
        rowObj:{},//选择的数据对象
        buttonList:[],//按钮权限
        searchButton:false,//查询按钮
        addButton:false,//新增按钮
        editButton:false,//编辑按钮
        judgeMenu:[],
        logPage:1,
      }
    },
    mounted() {
        console.log(window.screen.height)
        if(window.screen.height > 1000){
          this.maxHeight = "height:690px"
        }else{
          this.maxHeight = "height:480px"
        }
            // this.getData()
            this.getdevelopType()
            this.getButtonJurisdiction()//按钮权限
        },
    methods: {
       //同步
      synchronous(){
        let data = {}
        this.request('waveBand_sync', data, true).then(res => {
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
        data.developTypeId = this.formSearch.typeStatus
        data.name = this.formSearch.developType
        data.remark = this.formSearch.remark
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('waveBand_page', data, true).then(res => {
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
                        data.billNo     ="master_data_wave_band_"+ this.billNo
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
                      data.billNo     ="master_data_wave_band_"+ this.billNo
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
        getdevelopType(){
          this.request('waveBand_selector', {}, true).then(res => {
          if (res.code==1) {
            this.developTypeList = res.data;
            }
          })
        },
      //编辑
      addSave(){
        this.dialogVisible=true
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) { //编辑保存
            let data = {}
            let id = this.ruleForm.developStatus
            let developTypeName = ''
            this.developTypeList.map((i)=>{
              if(i.id == id){
                developTypeName = i.developType
              }
            })
            data.id = this.rowObj.id
            data.developTypeId = id
            data.developTypeName = developTypeName
            this.request('waveBand_update', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('编辑波段成功')
                this.getData()
                this.dialogVisible=false
                this.ruleForm = {
                  code:'',
            name: '',
            engName:'',
            money: '',
            remark:'',
            developStatus:''
                }
              }else{
                this.$message.error(res.msg)
              }
              this.$refs['ruleForm'].resetFields();
            })
          } else { //验证表单
              return false;
          }
        });
      },
      addCancel(){
        this.dialogVisible = false
        this.ruleForm = {
          code:'',
            name: '',
            engName:'',
            money: '',
            remark:'',
            developStatus:''
        }
        this.$refs['ruleForm'].resetFields();

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
          //编辑
          onAdd(){
            if(this.rowLenght == 0){
              this.$message.warning('请先选择编辑的数据')
            }else if(this.rowLenght > 1){
              this.$message.warning('一次只能编辑一条数据')
            }else{
              this.dialogVisible=true
              this.ruleForm.code = this.rowObj.code
              this.ruleForm.name = this.rowObj.name
              this.ruleForm.engName = this.rowObj.englishName
              this.ruleForm.money = this.rowObj.contractUnitPriceDifferenceRange
              this.ruleForm.remark = this.rowObj.remark
              this.ruleForm.developStatus = this.rowObj.developTypeId
            }      
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
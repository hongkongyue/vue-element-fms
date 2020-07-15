<template>
    <div>
        <header class="headerstyle">
            <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
              <div>
                <el-form-item   size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item   size="small">
                    <el-button  size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item   size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item   size="small">
                      <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="clickTable">编辑</el-button>
                  </el-form-item>
              </div>
                <el-form-item label="平台名称："   size="small">
                    <el-select v-model="formSearch.region" @change="searchCode(formSearch.region)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
        </header>
        <section class="middle" :style="{minHeight:showBink?'680px':'480px'}" style="padding-top:10px">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
           <el-table ref="multipleTable" :data="tableData" @row-click="showLog" style="width: 100%" border tooltip-effect="dark" max-height="250" @selection-change="handleSelectionChange">
             <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="basicPlatformName" label="平台名称" min-width="120"align="center">
                </el-table-column>
                <el-table-column
                  prop="basicPlatformShortName"
                  label="平台缩写"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="financialType"
                  label="类型名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="name"
                  label="选项"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
         </el-table>
                    <section class="footer" style="margin-bottom:0px;">
                      <div style="width:100%;font-size:20px;">操作日志</div>
                    </section>
                    <section class="log">
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
        </section>
      
       <!-- 新增弹框 -->
          <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增"  :width="600" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-position="left">
                <Col span="24">
                  <el-form-item label="平台名称："  prop="code" size="small" label-width="120px">
                        <el-select v-model="ruleForm.code" filterable @change="changeCode(ruleForm.code)" style="width:300px">
                            <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                  </el-form-item>
                </Col>
                <Col span="24">
                  <el-form-item label="类别名称：" prop="name" size="small" label-width="120px">
                        <el-input v-model="ruleForm.name" style="width:300px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="24">
                  <el-form-item label="选项：" prop="subjectName" size="small" label-width="120px">
                        <el-input v-model="ruleForm.subjectName" type="textarea" :rows="2" style="width:300px"></el-input>
                  </el-form-item>
                </Col>
                
                <Col span="24">
                  <el-form-item style="text-align:center">
                      <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                      <Button type="default" @click="addCancel">取消</Button>
                    </el-form-item>
                </Col>
                
              </el-form>
              
            </Row>
            <div slot="footer"></div>
          </Modal>

        <!-- 编辑弹框 -->
          <Modal v-model="changeVisible"  :styles="mystyle" title="编辑"  @on-cancel='changeCancel' :width="600"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form ref="formChange" :model="formChange" class="demo-ruleForm " :label-position="left">
                        <Col span="24">
                          <el-form-item label="平台名称：" label-width="120px"   size="small">
                              <el-input v-model="formChange.code" :disabled="true" style="width:300px"></el-input>
                          </el-form-item>
                          </Col>
                          <Col span="24">
                          <el-form-item label="类别名称：" label-width="120px" size="small"> 
                              <el-input v-model="formChange.name" style="width:300px"></el-input>
                          </el-form-item>
                          </Col>
                          <Col span="24">
                            <el-form-item label="选项：" label-width="120px" size="small">
                              <el-input v-model="formChange.subjectName" style="width:300px"></el-input>
                            </el-form-item>
                          </Col>
                         <Col span="24">
                  <el-form-item style="text-align:center">
                      <Button type="primary" @click="changeSave">确认</Button>
                      <Button type="default" @click="changeCancel">取消</Button>
                    </el-form-item>
                </Col>
                </el-form>
            
          </Row>
          <div slot="footer"></div>
        </Modal>
     </div>
</template>


<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
  export default {
    mixins:[debounce,burypoint], 
    data() {
      return {
        logList:[],//日志
        billNo:'',
        dialogVisible:false,//新增
        changeVisible:false,//编辑
        formSearch: {
              user: '',
              region: '',
             
        },
        formChange:{
          code:'',
          name:'',
          subjectName:''
        },
        ruleForm:{
        },
        rules:{  
            code: [
            { required: true, message: '请选择平台名称', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          subjectName: [
            { required: true, message: '请输入选项', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在100个字符以内，以+隔开选项', trigger: 'blur' }
          ],
        },
        total:0,
        pagesize:10,
        currentPage:1,
        tableData:[],//主table数据
        tableJournal:[],//操作日志数据
        platformOptions:[],//平台
        // idAdd:'',
        // codeAdd:'',
        AAAA:'',
        BBBB:'',
        row:{},
        rowLenght:0,//选择几条数据
        rowObj:{},//选择的数据对象
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted() {
            this.getData()
            this.getplatformOptions()
            this.getButtonJurisdiction()//按钮权限
        },
    methods: {
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
      changeCode(code){
        let AAAA = ''
        let BBBB = ''
        this.platformOptions.map(function (item) {
              if(code == item.name){
                 AAAA = item.id
                BBBB = item.code
        }else{
          console.log('111')
        }
      })
      this.AAAA = AAAA
      this.BBBB = BBBB
      console.log(this.AAAA,this.BBBB,'00900')
      },
      getData(){
        this.logList=[]
        console.log(this.token)
        let data = {}
        data.basicPlatformName = this.formSearch.region
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('pageFinancialType', data, true).then(res => {
          if (res.code==1) {
            this.total = res.data.count;
            this.tableData = res.data.records;
            }
          })
        },
        getLoglist(billNo){
                     this.billNo=billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     ="master_data_financial_type_"+ this.billNo
                        data.pageSize   = 3 
                        data.currentPage=this.currentPage
                     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                            if (res.code == 1) {
                                   if (res.data.length < data.pageSize) {
                                        this.dataFlag = false
                                      } else {
                                        this.dataFlag = true
                                      }
                                  if (this.currentPage== 1) {
                                       this.logList=res.data 
                                  } else {
                                    this.logList=this.logList.concat(res.data) 
                                  }   
                             }
                       }) 
        },
        getMore(){
                  this.currentPage++
                  let data={}
                      data.billNo     ="master_data_financial_type_"+ this.billNo
                      data.pageSize   = 3
                      data.currentPage=this.currentPage
                      this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                              if (res.code == 1) {
                                    if (res.data.length < data.pageSize) {
                                          this.dataFlag = false
                                        } else {
                                          this.dataFlag = true
                                        }
                                    if (this.currentPage== 1) {
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
        getplatformOptions(){
          this.request('getPlatformSelector', {}, true).then(res => {
          if (res.code==1) {
            this.platformOptions = res.data;
            }
          })
        },
      //新增
      addSave(){
          this.setBuryPoint('新增确认')
          this.$refs['ruleForm'].validate((valid) => {
            console.log(this.ruleForm)
            if (valid) { //新增保存
            let data = {}
            data.basicPlatformName = this.ruleForm.code
            data.basicPlatformId = this.AAAA
            data.basicPlatformShortName = this.BBBB
            data.name = this.ruleForm.subjectName
            data.financialType = this.ruleForm.name
            this.request('addFinancialType', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('新增成功')
                this.getData()
                this.dialogVisible=false
                this.ruleForm = {}
              }
              else{
                this.$message.error(res.msg)
              }
            })
          } else { //验证表单
              return false;
          }
        });
      },
      addCancel(){
        this.dialogVisible = false
        this.ruleForm = {}
        this.$refs['ruleForm'].resetFields();

      },
        //编辑
        clickTable(row){
          this.setBuryPoint('编辑')
          if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            this.row = this.rowObj
            this.changeVisible = true
            this.formChange.code = this.rowObj.basicPlatformName
            this.formChange.name = this.rowObj.financialType
            this.formChange.subjectName = this.rowObj.name
          }
        },
        //编辑保存
        changeSave(){
            this.setBuryPoint('编辑确认')
          if(this.formChange.subjectName.length == 0){
            this.$message.warning('选项不能为空！')
          }else{
            // 保存
            this.changeVisible = false
            let row = this.row
            let data = {}
            data.id = row.id
            data.basicPlatformName = row.basicPlatformName
            
            data.name = this.formChange.subjectName
            data.financialType = this.formChange.name
            let CCCC = ''
            let DDDD = ''
        this.platformOptions.map(function (item) {
              if(row.basicPlatformName == item.name){
                 CCCC = item.id
                DDDD = item.code
        }else{
          console.log('111')
        }
      })
          
      this.CCCC = CCCC
      this.DDDD = DDDD
      data.basicPlatformId = this.CCCC
      data.basicPlatformShortName = this.DDDD
      console.log(this.AAAA,this.BBBB,'00900')
            this.request('updateFinancialType', data, true).then(res => {
          if (res.code==1) {
              this.changeVisible = false
              this.$message.success('编辑成功')
              this.getData()
            }
            else{
              this.$message.success(res.msg)
            }
          })
          }
        },
        //编辑取消
        changeCancel(){
          this.changeVisible = false
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
                this.setBuryPoint('新增')
                this.dialogVisible=true    
          },
          //查询
        onSearch(){
          this.setBuryPoint('查询')
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
      .middle{
      width: 99%;
      margin: 0 auto;
      background: #fff;
      padding: 0px 10px 10px 10px;
      margin-top: 0px;
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
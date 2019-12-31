<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                          <el-form-item label="平台："   size="small">
                              <el-select v-model="formSearch.region" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('修改') !== -1"  size="small" type="primary" @click="clickTable">编辑</el-button>
                          </el-form-item>
                </el-form>
          </header>
          <section class="middle">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
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
                <el-table-column prop="code" label="平台编码" min-width="120" align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="平台名称"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="subjectName"
                  label="平台主体名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="平台地址"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="telephone"
                  label="平台电话"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="enable"
                  label="状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.enable == 0 ? '停用' : '启用'}}</template>
                </el-table-column>
                
         </el-table>
        </section>
        <section class="footer" style="margin-bottom:0px">
           <div style="width:100%;font-size:20px;">操作日志</div>
        </section>
        <section class="middle">
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
       <!-- 新增弹框 -->
          <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增"  :width="900" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form :rules="rules" ref="ruleForm" label-width="120px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="8">
                  <el-form-item label="平台编码："prop="code" size="small">
                    <el-input v-model="ruleForm.code" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="平台名称："prop="name" size="small"> 
                    <el-input v-model="ruleForm.name" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="平台主体名称：" prop="subjectName" size="small">
                    <el-input v-model="ruleForm.subjectName" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="平台地址："prop="address" size="small">
                    <el-input v-model="ruleForm.address" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="平台电话："prop="telephone" size="small">
                    <el-input v-model="ruleForm.telephone" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="状态："prop="enable" size="small">
                    <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in enableList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
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
          <Modal v-model="changeVisible" :styles="mystyle" title="编辑"  @on-cancel='changeCancel' :width="900"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form ref="formChange" :model="formChange" label-width="120px" class="demo-ruleForm " :label-position="right">
                        <Col span="8">
                          <el-form-item label="平台编码："   size="small">
                              <el-input v-model="formChange.code" :disabled="true" style="width:150px"></el-input>
                          </el-form-item>
                          </Col>
                          <Col span="8">
                          <el-form-item label="平台名称："size="small"> 
                              <el-input v-model="formChange.name" :disabled="true" style="width:150px"></el-input>
                          </el-form-item>
                          </Col>
                          <Col span="8">
                          <el-form-item type="textarea" label="平台主体名称：" size="small">
                              <el-input v-model="formChange.subjectName" style="width:150px"></el-input>
                          </el-form-item>
                         </Col>
                         <Col span="8">
                           <el-form-item type="textarea" label="平台地址：" size="small">
                              <el-input v-model="formChange.address" style="width:150px"></el-input>
                          </el-form-item>
                          </Col>
                          <Col span="8">
                          <el-form-item  label="平台电话：" size="small">
                              <el-input v-model="formChange.telephone" style="width:150px"></el-input>
                          </el-form-item>
                        </Col>
                        <Col span="8">
                  <el-form-item label="状态："prop="enable" size="small">
                    <el-select v-model="formChange.enable" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in enableList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
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
  export default {
    data() {
      return {
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
        formChange:{
          code:'',
            name: '',
            subjectName:'',
            address: '',
            telephone:'',
            enable:''
        },
        ruleForm:{
            code:'',
            name: '',
            subjectName:'',
            address: '',
            telephone:'',
            enable:''
        },
        rules:{  
            code: [
            { required: true, message: '请输入平台编码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入平台名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          subjectName: [
            { required: true, message: '请输入平台主体名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入平台地址', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在50个字符以内', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入平台电话', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          enable:[
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
      getData(){
        let data = {}
        data.name = this.formSearch.region
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('getPlatform', data, true).then(res => {
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
                        data.billNo     ="master_data_platform_"+ this.billNo
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
                      data.billNo     ="master_data_platform_"+ this.billNo
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
        this.dialogVisible=true
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) { //新增保存
            let data = {}
            data.code = this.ruleForm.code
            data.name = this.ruleForm.name
            data.subjectName = this.ruleForm.subjectName
            data.address = this.ruleForm.address
            data.telephone = this.ruleForm.telephone
            data.enable = this.ruleForm.enable
            this.request('addPlatform', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('新增平台成功')
                this.getData()
                this.dialogVisible=false
                this.ruleForm = {}
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
        this.ruleForm = {}
        this.$refs['ruleForm'].resetFields();

      },
        //编辑
        clickTable(row){
           if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            this.changeVisible = true
            this.formChange.code = this.rowObj.code
            this.formChange.name = this.rowObj.name
            this.formChange.subjectName = this.rowObj.subjectName
            this.formChange.address = this.rowObj.address
            this.formChange.telephone = this.rowObj.telephone
            this.rowId = this.rowObj.id
            this.rowStatus = this.rowObj.status
            this.formChange.enable = this.rowObj.enable
          }
            // this.changeVisible = true
            // this.formChange.code = row.code
            // this.formChange.name = row.name
            // this.formChange.subjectName = row.subjectName
            // this.formChange.address = row.address
            // this.formChange.telephone = row.telephone
            // this.rowId = row.id
            // this.rowStatus = row.status
            // console.log(row,'1111')
        },
        //编辑保存
        changeSave(){
          if(this.formChange.subjectName == ''){
            this.$message.warning('平台主体名称不能为空！')
          }else if(this.formChange.address == ''){
            this.$message.warning('平台地址不能为空！')
          }else if(this.formChange.telephone == ''){
            this.$message.warning('平台电话不能为空！')
          }else{
            let data = {}
            data.id = this.rowId
            data.code = this.formChange.code
            data.name = this.formChange.name
            data.subjectName = this.formChange.subjectName
            data.address = this.formChange.address
            data.telephone = this.formChange.telephone
            data.enable = this.formChange.enable
            this.request('updatePlatform', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('修改平台成功')
                this.getData()
                this.changeVisible=false
              }else{
                this.$message.error(res.msg)
              }
            })
            // this.changeVisible = false
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
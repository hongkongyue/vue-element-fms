<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                          <el-form-item label="公司编码："   size="small">
                              <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.code" :label="item.code" :value="item.code"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="公司名称："   size="small">
                              <el-select v-model="formSearch.name" value-key= "id" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="负责人："   size="small">
                              <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyNameOptions" :key="item" :label="item" :value="item"></el-option>
                              </el-select>
                          </el-form-item>
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
           <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="250" @selection-change="handleSelectionChange">
             <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column type="index"width="55"label="序号"align="center"></el-table-column>
                <el-table-column prop="code"label="公司编码"min-width="120"align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="公司名称"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="shortName"
                  label="公司简称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="abbrName"
                  label="公司缩写"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="公司地址"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="orgLegal"
                  label="是否法人组织"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.orgLegal == 1 ? '是' : '否' }}</template>
                </el-table-column>
                <el-table-column
                  prop="officialLeader"
                  label="负责人"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="enable"
                  label="启用状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.enable == 1 ? '启用' : '停用' }}</template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="冻结"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.status == 1 ? '冻结' : '解冻' }}</template>
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
          
           <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增"  :width="70" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-position="left">
                <Col span="8">
                  <el-form-item label="公司编码："prop="code" label-width="120px" size="small">
                    <el-input v-model="ruleForm.code" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司名称："prop="name" label-width="120px" size="small"> 
                    <el-input v-model="ruleForm.name" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司简称：" prop="shortName" label-width="120px" size="small">
                    <el-input v-model="ruleForm.shortName" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                   <el-form-item label="公司缩写："prop="abbrName" label-width="120px" size="small">
                    <el-input v-model="ruleForm.abbrName" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司地址："prop="address" label-width="120px" size="small">
                    <el-input v-model="ruleForm.address" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="负责人：" prop="officialLeader" label-width="120px" size="small">
                    <el-select v-model="ruleForm.officialLeader" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in companyNameOptions" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="是否法人组织：" prop="orgLegal" label-width="120px" size="small">
                    <el-select v-model="ruleForm.orgLegal" filterable placeholder="请选择" style="width:150px">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                    <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:150px">
                        <el-option label="启用" value=1></el-option>
                        <el-option label="停用" value=0></el-option>
                    </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="冻结状态：" prop="status" label-width="120px" size="small">
                    <el-select v-model="ruleForm.status" filterable placeholder="请选择" style="width:150px">
                        <el-option label="冻结" value="1"></el-option>
                        <el-option label="解冻" value="0"></el-option>
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
          <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="修改"  :width="70" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form  ref="formChange" :model="formChange" class="demo-ruleForm " :label-position="left">
                <Col span="8">
                  <el-form-item label="公司编码："prop="code" label-width="120px" size="small">
                    <el-input v-model="formChange.code" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司名称："prop="name" label-width="120px" size="small"> 
                    <el-input v-model="formChange.name" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司简称：" prop="shortName" label-width="120px" size="small">
                    <el-input v-model="formChange.shortName" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                   <el-form-item label="公司缩写："prop="abbrName" label-width="120px" size="small">
                    <el-input v-model="formChange.abbrName " :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="公司地址："prop="address" label-width="120px" size="small">
                    <el-input v-model="formChange.address" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="负责人："prop="officialLeader" label-width="120px" size="small">
                    <el-select v-model="formChange.officialLeader" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in companyNameOptions" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="是否法人组织："prop="orgLegal" label-width="120px" size="small">
                        <el-select v-model="formChange.orgLegal" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in statusQptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="启用状态："prop="enable" label-width="120px" size="small">
                    <el-select v-model="formChange.enable" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in statusQptionsA" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="冻结状态："prop="status" label-width="120px" size="small">
                    <el-select v-model="formChange.status" filterable placeholder="请选择" style="width:150px">
                            <el-option v-for="item in statusQptionsB" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
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
  export default {
    data() {
      return {
        logList:[],//日志
        billNo:'',
        companyNameOptions:[],
        companyCodeOptions:[],
        dialogVisible:false,//新增
        changeVisible:false,//编辑
        statusQptions:[
          {value:1,name:'是'},
          {value:0,name:'否'}
        ],
        statusQptionsA:[
          {value:1,name:'启用'},
          {value:0,name:'停用'}
        ],
        statusQptionsB:[
          {value:1,name:'冻结'},
          {value:0,name:'解冻'}
        ],
        formSearch: {
             code:'',
             name:'',
             person:'',
        },
        formChange:{
            code:'',
            name: '',
            shortName:'',
            abbrName:'',
            address:'',
            officialLeader:'',
            orgLegal:'',
            enable:'',
            status:'',
        },
        ruleForm:{
            code:'',
            name: '',
            shortName:'',
            abbrName:'',
            address:'',
            officialLeader:'',
            orgLegal:'',
            enable:'',
            status:'',
        },
        rules:{
            code: [
            { required: true, message: '请输入公司编码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '请输入公司简称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          abbrName: [
            { required: true, message: '请输入公司缩写', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在50个字符以内', trigger: 'blur' }
          ],
          officialLeader:[
              { required: true, message: '请选择', trigger: 'change' },
          ],
          orgLegal: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
          enable: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
          status: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
        },
        total:0,
        pagesize:10,
        currentPage:1,
        tableData:[],
        rowLenght:0,//选择几条数据
        rowObj:{},//选择的数据对象
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted() {
            this.getData()
            this.getCompanyName()
            this.getButtonJurisdiction()//按钮权限
            this.getmasterData()
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
      //获取下拉列表   selectorCompany   masterData_staff_selector
      getCompanyName(){
         let data = {}
        this.request('selectorCompany', data, true).then(res => {
          if (res.code==1) {
            this.companyCodeOptions = res.data
            console.log(this.companyCodeOptions,'////')
            // this.tableData = res.data.records;
            }
          })
      },
      getmasterData(){
         let data = {}
        this.request('masterData_staff_selector', data, true).then(res => {
          if (res.code==1) {
            this.companyNameOptions = res.data.name
            }
          })
          console.log(this.companyNameOptions,'popopopo')
      },
       onReset(){
             this.formSearch = {
               code:'',
             name:'',
             person:'',
             }
         },
      getData(){
        console.log(this.formSearch.person)
        this.logList=[]
        let data = {}
        data.name = this.formSearch.name
        data.code = this.formSearch.code
        data.officialLeader = this.formSearch.person
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('getCompany', data, true).then(res => {
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
                        data.billNo     ="master_data_company_"+ this.billNo
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
                      data.billNo     ="master_data_company_"+ this.billNo
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
      onSearch(){
         this.currentPage = 1
         this.getData()
       
      },
      addSave(){
        console.log('11')
        this.$refs['ruleForm'].validate((valid) => {
           console.log(valid)
            if (valid) { //新增保存
            let data = {}
            data.code = this.ruleForm.code
            data.name = this.ruleForm.name
            data.abbrName = this.ruleForm.abbrName
            data.address = this.ruleForm.address
            data.shortName = this.ruleForm.shortName
            data.officialLeader = this.ruleForm.officialLeader
            data.orgLegal = this.ruleForm.orgLegal
            data.enable = this.ruleForm.enable
            data.status = this.ruleForm.status
            this.request('addCompany', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('新增成功')
                this.getData()
                this.dialogVisible = false
                this.ruleForm = {}
                this.$refs['ruleForm'].resetFields();
              }
              else{
              this.$message.error(res.msg);
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
          if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            this.changeVisible = true
            this.formChange.code = this.rowObj.code
            this.formChange.name = this.rowObj.name
            this.formChange.abbrName = this.rowObj.abbrName
            this.formChange.address = this.rowObj.address
            this.formChange.shortName = this.rowObj.shortName
            this.formChange.officialLeader = this.rowObj.officialLeader
            this.formChange.orgLegal = this.rowObj.orgLegal
            this.formChange.enable = this.rowObj.enable
            this.formChange.status = this.rowObj.status
            this.rowId = this.rowObj.id
          }
          console.log(this.rowLenght)
            console.log(row,'1111')
        },
        //编辑保存
        changeSave(){
          let data = {}
          data.id = this.rowId
          data.code = this.formChange.code
          data.name = this.formChange.name
          data.abbrName = this.formChange.abbrName
          data.address = this.formChange.address
          data.shortName = this.formChange.shortName
          data.officialLeader = this.formChange.officialLeader
          data.orgLegal = this.formChange.orgLegal
          data.enable = this.formChange.enable
          data.status = this.formChange.status
            this.request('updateCompany', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('修改平台成功')
                this.getData()
                this.changeVisible=false
              }else{
                this.$message.error(res.msg)
              }
            })
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
          }

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
    .el-table__header-wrapper{
 
       width:99.9% !important;

}
</style>
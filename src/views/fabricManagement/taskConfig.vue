<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
            <div>
                <el-form-item size="small">
                    <!-- v-if="judgeMenu.indexOf('查询') !== -1" -->
                    <el-button  size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                        <!-- v-if="judgeMenu.indexOf('新增') !== -1" -->
                        <el-button  size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                            <!-- v-if="judgeMenu.indexOf('编辑') !== -1" -->
                        <el-button  size="small"  type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                        <!-- v-if="judgeMenu.indexOf('删除') !== -1" -->
                        <el-button  size="small"   type="default" @click="onDel">删除</el-button>
                </el-form-item>
            </div>
            <el-form-item label="配置方案：" size="small">
                <el-select v-model="formSearch.configurationPlanId" placeholder="请选择" style="width:160px" filterable>
                     <el-option v-for="v in projectList" :key="v.id" :label="v.planName" :value="v.id"></el-option>
                     <!-- <el-option  label="面料加色流程" value="面料加色流程"></el-option> -->
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <!-- <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination> -->
        <!-- <div id="main" style="width: 100%; height: 400px;"></div> -->
          <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" highlight-current-row @row-click="showLog">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
             <el-table-column prop="configurationPlanName" label="配置方案" min-width="120"  align="center" show-overflow-tooltip>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
             <el-table-column prop="parentTaskName" label="上级任务名称" min-width="120"  align="center" show-overflow-tooltip>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="taskName" label="任务名称" min-width="120" align="center"         show-overflow-tooltip>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="taskLevel" label="任务级" min-width="120"         align="center"   show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="warehouseType" label="人员配置" min-width="120"   align="center"    show-overflow-tooltip>
                    <template slot-scope="scope">
                         <span v-for="v in scope.row.taskStaffMappingVOS" :key="v.id">{{v.basicUserName+' '}}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="created"     label="创建时间" min-width="120"     align="center"   show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="修改时间" min-width="120"     align="center"   show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <!-- <section class="middle"> -->
        <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">
            <el-table-column prop="operator" label="操作员" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                <template slot-scope="scope">{{scope.row.operateTime}}</template>
            </el-table-column>
            <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
    <!-- </section> -->
    </section>
      <!--新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle"  :title="dialogtitle" @on-cancel='cancel' :width="860"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="配置方案：" size="small" label-width="95px" prop="configurationPlanId">
                            <el-select :disabled="dialogtitle=='编辑'" v-model="formData.configurationPlanId" placeholder="请选择" style="width:150px" filterable>
                                   <el-option v-for="v in projectList" :key="v.id" :label="v.planName" :value="v.id"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="上级任务名称：" size="small" label-width="125px">
                        <!-- <el-input  v-model="formData.taskName"  style="width:150px" maxlength="50" placeholder="请输入"  show-word-limit></el-input> -->
                            <el-select :disabled="dialogtitle=='编辑'"    v-model="formData.parentTaskName" placeholder="请选择" style="width:150px" filterable>
                                   <el-option  v-for="v in taskNameList" :key="v.taskName" :label="v.taskName" :value="v.taskName"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="任务名称：" size="small" label-width="95px" prop="taskName">
                        <!-- <el-input  v-model="formData.taskName"  style="width:150px" maxlength="50" placeholder="请输入"  show-word-limit></el-input> -->
                            <el-select v-model="formData.taskName" placeholder="请选择" style="width:150px" filterable>
                                   <el-option v-for="v in taskNameList" :key="v.taskName" :label="v.taskName" :value="v.taskName"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="任务级：" size="small" label-width="95px" prop="taskLevel">
                            <el-select v-model="formData.taskLevel" placeholder="请选择" style="width:150px" filterable>
                                   <el-option v-for="v in taskLevelList" :key="v" :label="v" :value="v"></el-option>
                            </el-select>
                    </el-form-item>
                </Col>
                <Col class="MB20">
                      <el-button  size="small"  type="primary"  @click="addStaff">新增人员</el-button>
                </Col>
                <Col>
                     <el-table :data="staffList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                        <el-table-column type="index" label="序号" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="name" label="人员" min-width="120" align="center">
                                  <template slot-scope="scope" >
                                        <div v-if="!scope.row.name" style="width:96%;height:30px;border:1px solid #999;cursor:pointer" @click="showContract(scope.$index)"></div>
                                        <span  v-if="scope.row.name">{{scope.row.name}}</span>
                                </template>
                        </el-table-column>
                            <el-table-column prop="departmentRootName" label="一级部门" align="center" min-width="120"></el-table-column>
                            <el-table-column prop="departmentName" label="二级部门" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="logContent" label="操作" min-width="120" align="center" show-overflow-tooltip>
                                 <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                            </el-table-column>
                     </el-table>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" @click="dialogtitle=='新增'?submitForm('ruleForm'):submitForms('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--联动编辑人员弹框-->
    <Modal v-model="contactVisible"    title="人员" @on-cancel='cancelcontactVisible' :width="850"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true"  :model="formData2" class="demo-form-inline demo-ruleForm ">
                <Col>
                    <el-form-item label="选择人员：" size="small" label-width="95px">
                            <el-select v-model="basicUserNameCode" placeholder="请选择" style="width:150px" filterable @change="getDepartment(basicUserNameCode)">
                                           <el-option  
                                                v-for="item in onDutyList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                            </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="一级部门：" size="small" label-width="95px" prop="departmentName">
                           {{this.formData2.departmentRootName}}
                    </el-form-item>
                    <el-form-item label="二级部门：" size="small" label-width="95px" prop="departmentRootName">
                          {{this.formData2.departmentName}}    
                    </el-form-item>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" @click="gaveAnswers">确认</Button>
                    <Button type="default" @click="cancelcontactVisible">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    
</div>
</template>

<script>
import filters from '../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            staffList: [],
            onDutyList:[], //人员下拉列表
            dialogVisible: false,
            contactVisible:false,
            taskLevelList:[],
            basicUserNameCode:'',
            formSearch:{
                       configurationPlanId:'',
            },
            taskNameList:[
                          {taskName:'面料开发发起任务',taskLevel:1},
                          {taskName:'开发确认任务',   taskLevel:2},
                          {taskName:'检测任务',       taskLevel:3},
                          {taskName:'核价任务',       taskLevel:4},
                          {taskName:'录入采购信息',   taskLevel:5},
                          {taskName:'录入面料信息',   taskLevel:6},
                        //   {taskName:'发起人确认任务', taskLevel:7}
                         ],
            projectList:[],
            formData: {
                      configurationPlanId:'',
                      parentTaskName:'',
                      taskName:'',
                      taskLevel:'',
            },
            formData2:{
                      basicUserName:'',
                      
            },
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            IDS: [],
            companyList: [],
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            total:0,
            judgeMenu: [],
            index:'',
            buttonList: [], //按钮权限
             rules: {
               configurationPlanId: [
                     { required: true, message: '请选择', trigger: 'change' },
                ],
                taskName: [
                     { required: true, message: '请选择', trigger: 'change' },
                ],
               taskLevel: [
                     { required: true, message: '请选择', trigger: 'change' }
                ],
           }
        }
    },
    mounted() {
        this.getStaffList()
        this.getData()
        this.getButtonJurisdiction() //按钮权限
        this.getSelectList()
        for(let i=0;i<7;i++){
            if(i){
                this.taskLevelList.push(i)
            }
            
        }
    },
    methods: {
        showContract(index){
                    console.log(index)
                    this.index=index
                    this.contactVisible=true
        },
        accordCodeGetName(code){
               for(let i=0,len=this.onDutyList.length;i<len;i++){
                   if(this.onDutyList[i].code==code){
                       return this.onDutyList[i].name
                   }
               }               
        },
        gaveAnswers(){
                     console.log(this.staffList,'88888888888')
                     console.log(this.basicUserNameCode,'66666666666')
                     this.contactVisible=false;
                     for(let i=0,len=this.staffList.length;i<len;i++){
                         if(this.staffList[i].name==this.accordCodeGetName(this.basicUserNameCode)){
                                this.contactVisible=true;
                                this.basicUserNameCode=''
                                this.formData2.departmentRootName=''
                                this.formData2.departmentName=''
                             return this.$message.error('人员重复，不能提交')
                         }
                     }
                     this.$set(this.staffList,this.index,this.formData2)
                     this.staffList=JSON.stringify(this.staffList)
                     this.basicUserNameCode=''
                     this.formData2.departmentRootName=''
                     this.formData2.departmentName=''
                     this.staffList=JSON.parse(this.staffList)
                     // this.staffList[this.index]=this.formData2
        },
        getDepartment(v,index){
             console.log(index);
             this.request('masterData_staff_getDepartmentByCode',{code:v},false).then(res=>{
                    if(res.code==1){
                                    this.formData2=res.data
                    }else{

                    }
             })    
        },
        getStaffList(){
                 this.request('masterData_staff_singleSelector',{},false).then(res=>{
                         if(res.code==1){
                              this.onDutyList=res.data
                         }else{
                              this.onDutyList=[]
                         }
                 })
        },
        getSelectList(){
                  this.request('fabricDevelop_configurationPlan_selector',{planType:0},false).then(res=>{
                            if(res.code==1){
                                 this.projectList=res.data
                            }else{
                                 this.projectList=[]
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
        selection(selection) {
            this.IDS = selection
        },
        addStaff(){
              this.staffList.push({id:'',})  
        },
        handleDelete(index){
               this.staffList.splice(index,1)    
        },
        onEdit() {
            this.setBuryPoint('编辑')
            this.staffList=[] 
            this.formData.taskStaffMappingVOS=[]
            if (this.IDS.length == 1) {
                this.dialogVisible = true
                this.dialogtitle = "编辑"
                this.resetForm('ruleForm')
                this.formData= Object.assign({}, this.formData, this.IDS[0])
                this.formData.parentTaskName=this.IDS[0].parentTaskName
                if(this.formData.taskStaffMappingVOS){
                   this.staffList=this.formData.taskStaffMappingVOS 
                   for(let i=0,len=this.formData.taskStaffMappingVOS.length;i<len;i++){
                       this.staffList[i].name=this.formData.taskStaffMappingVOS[i].basicUserName;
                       this.staffList[i].id=this.formData.taskStaffMappingVOS[i].basicUserId;
                       this.staffList[i].staffId=this.formData.taskStaffMappingVOS[i].id
                       this.staffList[i].taskConfigurationId=this.formData.id,
                       this.staffList[i].code=this.formData.taskStaffMappingVOS[i].staffCode
                   }
                }else{
                  this.staffList=[]  
                  this.formData.taskStaffMappingVOS=[]  
                }
                
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择编辑的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能编辑一条数据!')
            }
        },
        onAdd() {
            this.setBuryPoint('新增')
            this.staffList=[];
            for(let i in this.formData){
                   this.formData[i]=''
             }
            this.dialogtitle = "新增"
            this.dialogVisible = true
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()

        },
        onReset() {
            for(let i in this.formSearch){
                  this.formSearch[i]=''
             }
        },
         submitForm(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addSubmit()
                } else {
                    return false;
                }
            });
        },
         submitForms(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editSubmit()
                } else {
                    return false;
                }
            });
        },
        onDel(){
            this.setBuryPoint('删除')
              let arr=[]
                  for(let i=0,len=this.IDS.length;i<len;i++){
                       arr.push(this.IDS[i].id)
                  }
              let data={}
                  data.ids=arr;
                this.request('fabricDevelop_taskConfiguration_deleteByIdList',data,false).then(res=>{
                           if(res.code==1){
                               this.getData()
                           }else{
                               this.$message.error(res.msg)
                           }
                })
        },
        getPretaskInfo(id){
            for(let i=0,len=this.list.length;i<len;i++){
                if(this.list[i].id==id){
                             if(this.list[i+1]){
                                return this.list[i+1]
                             }else{
                                return false
                             }
                              
                }
            }            
        },
        editSubmit(){
                     let arr=[]
                     for(let i =0,len=this.staffList.length;i<len;i++){
                         arr.push({
                                  id:this.staffList[i].staffId,
                                  basicUserName:this.staffList[i].name,
                                  basicUserId:this.staffList[i].id,
                                  departmentName:this.staffList[i].departmentName,
                                  departmentId:this.staffList[i].departmentId,
                                  departmentRootName:this.staffList[i].departmentRootName,
                                  departmentRootId:this.staffList[i].departmentRootId,
                                  taskConfigurationId:this.staffList[i].taskConfigurationId,
                                  staffCode:this.staffList[i].code
                                //   basicCode:this.staffList[i].code
                         })
                     }
                     let data={}
                    //    if(this.getPretaskInfo(this.formData.id)){
                    //     //  data.parentTaskId= this.getPretaskInfo(this.formData.id).id
                    //      data.parentTaskName=this.getPretaskInfo(this.formData.id).taskName
                         data.parentTaskName=this.formData.parentTaskName?this.formData.parentTaskName:''
                        //  data.parentTaskLevel=String(this.getPretaskInfo(this.formData.id).taskLevel)
                        //  }
                         data.id     =this.formData.id
                         data.taskName=this.formData.taskName
                         data.taskLevel=String(this.formData.taskLevel)
                         data.configurationPlanId=String(this.formData.configurationPlanId)
                         data.configurationPlanName=this.getConfigurationPlanName(this.formData.configurationPlanId)
                         data.taskStaffMappingFOList=arr
              this.request('fabricDevelop_taskConfiguration_saveOrUpdate',data,false).then(res=>{
                      if(res.code==1){
                                  this.getData()       
                                  this.dialogVisible=false;
                                  this.cancel()
                                  this.basicUserNameCode=''
                                  this.formData2.departmentName=''
                                  this.formData2.departmentRootName=''
                      }else{
                                  this.$message.error(res.msg)
                      }
              })  
        },
        addSubmit(){
                  let arr=[]
                     for(let i =0,len=this.staffList.length;i<len;i++){
                         arr.push({
                                  basicUserName:this.staffList[i].name,
                                  basicUserId:this.staffList[i].id,
                                  departmentName:this.staffList[i].departmentName,
                                  departmentId:this.staffList[i].departmentId,
                                  departmentRootName:this.staffList[i].departmentRootName,
                                  departmentRootId:this.staffList[i].departmentRootId,
                                //   basicCode:this.staffList[i].code
                                  staffCode:this.staffList[i].code
                         })
                     }
                let data={}
                        // if(this.list.length>0){
                        //         // data.parentTaskId=this.list[0].id
                        //         data.parentTaskName=this.list[0].taskName
                        //         // data.parentTaskLevel=String(this.list[0].taskLevel)
                        // }
                        data.parentTaskName=this.formData.parentTaskName?this.formData.parentTaskName:''
                        data.taskName=this.formData.taskName
                        data.taskLevel=String(this.formData.taskLevel)
                        data.configurationPlanId=String(this.formData.configurationPlanId)
                        data.configurationPlanName=this.getConfigurationPlanName(this.formData.configurationPlanId)
                        data.taskStaffMappingFOList=arr
              this.request('fabricDevelop_taskConfiguration_saveOrUpdate',data,false).then(res=>{
                      if(res.code==1){
                                  this.getData()       
                                  this.dialogVisible=false;
                                  this.cancel()
                                  this.basicUserNameCode=''
                                  this.formData2.departmentName=''
                                  this.formData2.departmentRootName=''
                      }else{
                                  this.$message.error(res.msg)
                      }
              })
        },
        getConfigurationPlanName(id){
               for(let i=0,len=this.projectList.length;i<len;i++){
                     if(this.projectList[i].id==id){
                         return this.projectList[i].planName
                     }
               }
        },
        getData() {
            this.logList = []
            let data = {}
                data.configurationPlanId=this.formSearch.configurationPlanId
            this.request('fabricDevelop_taskConfiguration_getTaskConfigurationList', data, true).then((res) => {
                if (res.code == 1) {
                    this.staffList=[]
                          this.total = res.data.count
                    if (res.data) {
                          this.list = res.data
                    } else {
                          this.list =[]    
                    }
                } else {
                          this.staffList=[]
                          this.$message({message: res.msg,type: 'warning'});
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        cancelcontactVisible(){
                                  this.contactVisible=false;
                                  this.basicUserNameCode=''
                                  this.formData2.departmentName=''
                                  this.formData2.departmentRootName=''   
        },
         cancel() {
            this.getData()
            this.resetForm('ruleForm')
            this.dialogVisible = false;
            console.log(this.staffList,'00000')
            // if(this.formData.taskConfigurationStaffMappingVOS){
            //     let len=this.formData.taskConfigurationStaffMappingVOS.length
            //     this.staffList.splice(len-1,len)
            // }
         },
          getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'develop_task_configuration_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })

        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = 'develop_task_configuration_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        showLog(row) {
            this.getLoglist(row.id)
        },
    }
}
</script>

<style lang="less" scoped>
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

.MB20{
    margin-bottom: 20px
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
</style>

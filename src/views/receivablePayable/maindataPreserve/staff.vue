<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline">
                        <Col>
                                <el-form-item label="姓名"   size="small">
                                    <el-select v-model="formData.name" placeholder="请选择" style="width:150px" filterable>
                                        <el-option  v-for="v in staffNameList " :key="v" :label="v" :value="v"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="工号" size="small">
                                    <el-select v-model="formData.code" placeholder="请选择" style="width:150px" filterable	>
                                         <el-option  v-for="v in codeList " :key="v" :label="v" :value="v"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属部门" size="small">
                                    <el-select v-model="formData.basicDepartmentName" placeholder="请选择" style="width:220px" filterable	>
                                        <el-option  v-for="v in departmentList " :key="v" :label="v" :value="v"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item   size="small">
                                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                                </el-form-item>
                                <el-form-item   size="small">
                                    <el-button  size="small" type="default" @click="onReset">重置</el-button>
                                </el-form-item>
                                <el-form-item   size="small">
                                    <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="sync">同步</el-button>
                                </el-form-item>
                                 <el-form-item  size="small">
                                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="exportImport">导出</el-button>
                                </el-form-item>
                          </Col>
                          <Col>
                                <el-form-item label="职级" size="small">
                                    <el-select v-model="formData.level" placeholder="请选择" style="width:100px">
                                            <el-option  v-for="v in levelList " :key="v" :label="v" :value="v"></el-option>
                                    </el-select>
                               </el-form-item>
                                <el-form-item label="员工类型" size="small">
                                    <el-select v-model="formData.type" placeholder="请选择" style="width:100px">
                                            <el-option label="基层" value="基层"></el-option>
                                            <el-option label="中层" value="中层"></el-option>
                                            <el-option label="班长" value="班长"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否在职" size="small">
                                    <el-radio-group v-model="formData.onJob">
                                            <el-radio label="1" value="1">是</el-radio>
                                            <el-radio label="0" value="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否班委" size="small">
                                    <el-radio-group v-model="formData.classCommittee">
                                            <el-radio label="1" value="1">是</el-radio>
                                            <el-radio label="0" value="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                          </Col>
                </el-form>
          </header>
          <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
               >
          </el-pagination>
           <el-table
                 ref="multipleTable"
                 :data="list"
                 style="width: 100%"
                 class="pointer"
                 border
                 tooltip-effect="dark"
                 :maxHeight="tableHieght"
                 highlight-current-row 
                 @row-click="showLog"
                  >
                <el-table-column
                   type="index"
                    width="55"
                    label="序号"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="工号"
                  min-width="120"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="departmentName"
                  label="部门"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="departmentRootName"
                  label="上级部门"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="postName"
                  label="岗位"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="职级"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="postLevelName"
                  label="岗位职级"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="chiefName"
                  label="直接上级"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="hrbpName"
                  label="HRBP"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop ="birthday"
                  label="出生日期"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                   <template slot-scope="scope">{{ scope.row.birthday| get_year_month_day }}</template>
                </el-table-column>
                 <el-table-column
                  prop="gender"
                  label="性别"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                   <template slot-scope="scope">{{ scope.row.gender==1?'男':'女'}}</template>
                </el-table-column>
                <el-table-column
                  prop="school"
                  label="学校"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="major"
                  label="专业"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="entryDate"
                  label="入职时间"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.entryDate| get_year_month_day }}</template>
                </el-table-column>
                </el-table-column>
                 <el-table-column
                  prop="positiveDate"
                  label="转正时间"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.positiveDate| get_year_month_day }}</template>
                </el-table-column>
                 <el-table-column
                  prop="contractDate"
                  label="合同时间"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.contractDate| get_year_month_day }}</template>
                </el-table-column>
                <el-table-column
                  prop="insurance"
                  label="保险"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="员工类型"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                 </el-table-column>
                 <el-table-column
                  prop="classCommittee"
                  label="是否班委"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.classCommittee==1?'是':'否' }}</template>
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号码"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="onJob"
                  label="是否离职"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.onJob==1?'否':'是' }}</template>
                </el-table-column>
         </el-table>
               <section class="footer" style="margin-bottom:0px;margin-top:10px">
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
        
     </div>
</template>


<script charset="UTF-8">
  import filters from '../../../filter/'
  import downLoad from '../../../filter/downLoad'
  import { setTimeout } from 'timers';
  import {debounce} from 'mixins/debounce'
  export default {
    mixins:[debounce],
    data() {
      return {
        dialogVisible:false,
        editformdata:{},
        dialogtitle:'新增',
        page:1,
        currentPage:1,
        pageSize:10,
        mystyle:{
                    top:'150px',
                },
        formData: {
                user: '',
                region: '',
             
        },
        // 日志相关
        dataFlag:true,
        logList:[], //日志列表
        billNo:'',
        currentPage:1,
        // 日志相关
        list:[],
        staffNameList :[], //员工姓名列表
        codeList      :[], //工号列表
        departmentList:[],//部门列表
        levelList     :[],//职级列表
        judgeMenu:[],
        buttonList:[],//按钮权限

       
      }
    },
    mounted(){
         this.getData()
         this.getResponse()
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
          exportImport(){
                  let data={}
                          data.currentPage        = this.page
                          data.pageSize           = this.pageSize
                          data.code               = this.formData.code
                          data.name               = this.formData.name
                          data.departmentName     = this.formData.basicDepartmentName
                          data.levelName          = this.formData.level
                          data.onJob              = Number(this.formData.onJob)
                          data.classCommittee     = Number(this.formData.classCommittee)
                          data.type               = this.formData.type  
                          downLoad.downLoad(data,'/eop-boot/masterData/staff/export')
                          
          },
          handleSizeChange(pageSize) {
                    this.pageSize = pageSize
                    this.getData()
          },
          handleCurrentChange(page) {
                    this.page = page
                    this.getData()
          },
          onAdd(){
                    this.dialogtitle="新增"
                    this.dialogVisible=true    
          },
          onSearch(){
                    this.page=1;
                    this.getData()
                   
          },
          onReset(){
                    this.formData={}
                    this.page=1;
                    this.getData()
          },
          onEdit(row){
                    this.dialogtitle="编辑"
                    this.dialogVisible=true
          },
          submitForm(formName) {
                    this.dialogVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {

                      } else {
                        return false;
                      }
                    });
          },
          getResponse(){
                let data={}
                    this.request('masterData_staff_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                    this.staffNameList =res.data.name
                                    this.codeList      =res.data.code
                                    this.departmentList=res.data.departmentName
                                    this.levelList     =res.data.level
                             }
                       }) 
         },
         getData(){
                      this.logList=[]
                      let data={}
                          data.currentPage        = this.page
                          data.pageSize           = this.pageSize
                          data.code               = this.formData.code
                          data.name               = this.formData.name
                          data.departmentName     = this.formData.basicDepartmentName
                          data.levelName          = this.formData.level
                          data.onJob              = Number(this.formData.onJob)
                          data.classCommittee     = Number(this.formData.classCommittee)
                          data.type               = this.formData.type
                      this.request('masterData_staff_page', data, true).then((res) => {
                              if (res.code == 1) {
                                  this.list       = res.data.records
                                  this.total      = res.data.count
                              }else{
                                  this.list       =  []
                                  this.total      =  '0' 
                              }
                          })
          },
           getLoglist(billNo){
                     this.billNo=billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     =filters.getConstant('staff')+ this.billNo
                        data.pageSize   =3
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
                      data.billNo     =filters.getConstant('staff')+ this.billNo
                      data.pageSize   =3
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
          resetForm(formName) {
                    this.$refs[formName].resetFields();
          },
          sync(){
                  let data={}
                      this.request('masterData_staff_sync', data, true).then((res) => {
                              if (res.code == 1) {
                                       this.$message({
                                          message: '同步成功',
                                          type: 'success'
                                       });
                                      this.page=1;
                                      this.getData()
                              }
                        }) 
          },
          cancel(){
                    this.editformdata={}
                      this.resetForm('ruleForm')
                      this.dialogVisible=false;
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
    .el-table__row td{
        padding: 0;
    }
    /* 用来设置当前页面element全局table 选中某行时的背景色*/
    .el-table__body tr.current-row>td{
       background-color: #f19944 !important;
      /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
    }
    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #f19944;
      /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
    }
    .el-table__header-wrapper{
 
       width:99.9% !important;

}
    // @media (height > 600px) {
    //         body { background: #000;}
    //     }
</style>
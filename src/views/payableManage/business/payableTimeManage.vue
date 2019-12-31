<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
                          <!-- <el-form-item label="公司编码" size="small">
                              <el-select v-model="formData.company" placeholder="请选择" style="width:100px" filterable	>
                                <el-option label="区域一" value="shanghai"></el-option>
                              </el-select>
                          </el-form-item> -->
                          <el-form-item label="公司名称" size="small">
                              <el-select v-model="formData.companyName" placeholder="请选择" style="width:100px" filterable>
                                 <el-option v-for="v in companyList" :key="v.name" :label="v.name" :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="启用时间" size="small">
                                <el-date-picker style="width:140px"
                                                    v-model="startTime"
                                                    type="date"
                                                    placeholder="选择日期">
                                </el-date-picker>
                          </el-form-item>
                          <el-form-item   size="small">
                              <!-- v-if="judgeMenu.indexOf('查询') !== -1" -->
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <!-- v-if="judgeMenu.indexOf('新增启用') !== -1" -->
                              <el-button v-if="judgeMenu.indexOf('新增启用') !== -1"  size="small" type="primary" @click="onAdd">新增启用</el-button>
                          </el-form-item>
                </el-form>
          </header>
          <el-row>
              <!-- <el-col :span="20"> -->
                <div class="grid-content bg-purple-light">
                       <section class="middle">
                             <el-table 
                                    ref="multipleTable"
                                    :data="list"
                                    style="width: 100%"
                                    class="pointer"
                                    border
                                    tooltip-effect="dark"
                                    max-height="250"
                                    header-row-style="height:25px"
                                    row-style="height:25px"
                                    highlight-current-row 
                                    @row-click="showLog"
                                      >
                                    <el-table-column
                                      type="index"
                                      label="序号"
                                      width="55"
                                      align="center"
                                    >
                                      
                                    </el-table-column>
                                    <el-table-column
                                      prop="basicCompanyCode"
                                      label="公司编码"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                     
                                    </el-table-column>
                                    <el-table-column
                                      prop="basicCompanyName"
                                      label="公司名称"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                      prop="beginDate"
                                      label="启用日期"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                      <!-- <template slot-scope="scope">{{scope.row.beginDate|Y_M_D}}</template> -->
                                    </el-table-column>
                                     <el-table-column
                                      prop="createUser"
                                      label="启用人"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
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
                </div>
            <!-- </el-col> -->
          </el-row>
          <!-- 新增 -->
          <Modal v-model="dialogVisible" :styles="mystyle"  title="新建期间方案"  @on-cancel='cancel' :width="770"  class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form :inline="true" ref="ruleForm" :model="addformdata" :rules="rules" class="demo-form-inline demo-ruleForm " :label-position="left"  >
                         <Col>
                                 <el-form-item label="公司名称" size="small"  prop="companyName">
                                    <el-select v-model="addformdata.companyName" placeholder="请选择" style="width:100px" filterable>
                                                  <el-option v-for="item in companyList" :key="item.code" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="启用时间" size="small" prop="useTime">
                                    <el-date-picker style="width:140px"
                                                        v-model="addformdata.useTime"
                                                        type="date"
                                                        placeholder="选择日期">
                                    </el-date-picker>
                                 </el-form-item>
                                 <el-form-item  size="small">
                                                    <Button type="primary" @click="submitForm('ruleForm')">添加</Button>
                                </el-form-item>
                          </Col>
                          <Col>
                                <section class="middle" style="padding: 0px 0px 0px 0px">
                                    <el-table 
                                            :data="addList"
                                            style="width: 100%"
                                            class="pointer"
                                            border
                                            tooltip-effect="dark"
                                            max-height="250"
                                            header-row-style="height:25px"
                                            row-style="height:25px"
                                            >
                                            <el-table-column
                                            prop="code"
                                            label="公司编码"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            
                                            </el-table-column>
                                            <el-table-column
                                            prop="name"
                                            label="公司名称"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="time"
                                            label="启用日期"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="user"
                                            label="启用人"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                </el-table>
                            </section>
                          </Col>
                          <Col>
                               <el-form-item label=""   size="small" label-width="125px">
                                      <span style="color:#999">提示：一个公司只能生成一条应付启用时间</span>
                                </el-form-item>
                          </Col>
                          <el-form-item style="padding-left:300px">
                                    <Button type="primary" @click="confirmSub">确认</Button>
                                    <Button type="default" @click="cancel">取消</Button>
                          </el-form-item>
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
        add:false,
        dialogVisible:false,
        addformdata :{},
        editformdata:{},
        canSelectedMonth:'',
        page:1,
        pageSize:10,
        addList :[], //新增的数据列表
        delArray:[], //删除用数组
        addList :[], //增加列表
        selectedYears:'',
        startTime    :'',
        endTime      :'',
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
        rules: {
                companyName: [
                       { required: true, message: '请选择公司',  trigger: 'change' },
                ],
                useTime: [
                      {type: 'date', required: true, message: '请选择启用日期',trigger: 'change' }
                ]
        },
        companyList:[], //公司列表
        logList: [], //日志列表
        list   : [],
        active : '',
        userInfo:{},
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted(){
          this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
          this.getData()
          this.getCompany()
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
          confirmSub(){
                let arr=[]
               if(this.addList.length>0){
                  for(let i=0;i<this.addList.length;i++){
                     arr.push({
                        basicCompanyId:this.addList[i].id,
                        basicCompanyName:this.addList[i].name,
                        basicCompanyCode:this.addList[i].code,
                        beginDate:this.addList[i].time,
                     })
                  }
                  let data = {}
                  data.values = arr
                  data.systemType = '2'
                 
                  this.request('basic_addBatch', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.dialogVisible=false
                                  this. cancel()
                                  this.$message.success('新增成功')
                                  this.page=1
                                  this.getData()
                            }else{
                                  this.$message.error(res.msg)
                            }
                        }) 
               }else{
                 this.$message.error('没有添加数据')
               }
          },
          selected(name) {
                    this.active= name.name;
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
                       this.dialogVisible=true    
          },
          onSearch(){
            this.page=1;
                     this.getData()
                     
                     console.log()
                    //  console.log(filters.get_unix_only(this.selectedYears))
          },
          onReset(){
                    this.startTime=''
                    this.formData={}
                    this.page=1;
                    // this.getData()
          },
          //验证通过添加的变量
          onNewAdd(){
                   if(this.addformdata.companyName&&this.addformdata.useTime){
                       if(this.addList.length>0){
                             for(let i=0;i<this.addList.length;i++){
                          if(this.addList[i].id==this.addformdata.companyName){
                               this.addformdata={}
                               this.resetForm('ruleForm')
                              return this.$message.error('已添加过，不能添加');
                              }
                         }
                       }   
                      this.addList.unshift({
                             id  :this.addformdata.companyName,
                             code:filters.getCompanyCode(this.companyList,this.addformdata.companyName),
                             name:filters.getName(this.companyList,this.addformdata.companyName),
                             time:filters.get_year_month_day(this.addformdata.useTime),
                             user:this.userInfo.userName

                      })
                       this.addformdata={}
                       this.resetForm('ruleForm')
                   }
          },
          submitForm(formName) {
                    this.dialogVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                        this.onNewAdd()
                      } else {
                        return false;
                      }
                    });
          },
         getData(){
                this.logList=[]
                let data={}
                    data.beginDate=filters.get_year_month_day(this.startTime)
                    data.basicCompanyId=this.formData.companyName
                    data.basicCompanyName=this.getName(this.formData.companyName)
                    data.basicCompanyCode=this.getCode(this.formData.companyName)
                    data.beginDate?'':delete  data.beginDate
                    data.systemType = 2
                    this.request('basic_pageQuery', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.list      =  res.data.records
                                  this.total     =  res.data.count
                            }else{
                                  this.list      =  []
                                  this.total     =  '0' 
                            }
                        })
        },
        getName(id){
             for(let i=0;i<this.companyList.length;i++){
                 if(this.companyList[i].id==id){
                    return this.companyList[i].name
                 }
             }
        },
        getCode(id){
              for(let i=0;i<this.companyList.length;i++){
                 if(this.companyList[i].id==id){
                    return this.companyList[i].code
                 }
             }
        },
        resetForm(formName) {
                     this.$refs[formName].resetFields();
        },
        getCompany(){
                  let data={}
                  this.request('masterData_company_selector',data,false).then((res) => {
                              this.companyList=res.data
                        })
        },
        cancel(){
                  this.addformdata={}
                  this.addList=[]
                  this.resetForm('ruleForm')
                  this.dialogVisible=false;
        },
        cancelAdd(){
                  this.addformdata={}
                  this.dialogVisible=false
        },
        confirm(){
                  this.add=true
                  this.dialogVisible=false

        },
         getLoglist(billNo){
                     this.billNo= 'master_data_active_time_' + billNo
                     this.currentPage=1
                    let data={}
                        data.billNo = this.billNo
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
                      data.billNo     = this.billNo
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
    }
  }
</script>
<style scoped="scoped"  lang="less">
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
    .active {
        color:#409EFF;
        font-size:20px;
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
</style>
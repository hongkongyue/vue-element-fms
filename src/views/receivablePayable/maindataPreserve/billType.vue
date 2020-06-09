<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
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
                           <el-form-item    size="small">
                              <el-button v-if="judgeMenu.indexOf('修改') !== -1"   size="small" type="primary" @click="onEdit">编辑</el-button>
                           </el-form-item>
                  </div>
                          <el-form-item label="平台名称" size="small">
                              <el-select v-model="formData.name" placeholder="平台名称" style="width:220px" filterable>
                                  <el-option v-for="v in platFormList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                              </el-select>
                          </el-form-item>
                </el-form>
          </header>
          <el-row>
              <!-- <el-col :span="20"> -->
                <div class="grid-content bg-purple-light">
                       <section class="middle" :style="{minHeight:showBink?'680px':'480px'}" style="padding-top:10px">
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
                                    @selection-change="selection"
                                    @select-all="selection"
                                    @select="selection"
                                    ref="multipleTable"
                                    :data="list"
                                    style="width: 100%"
                                    class="pointer"
                                    border
                                    tooltip-effect="dark"
                                    :maxHeight="tableHieght"
                                    header-row-style="height:25px"
                                    row-style="height:25px"
                                    @row-click="showLog"
                                    highlight-current-row
                                      >
                                      <el-table-column
                                        type="selection"
                                        width="55">
                                      </el-table-column>
                                    <el-table-column    
                                      type="index"
                                      width="55"
                                      label="序号"
                                      align="center">
                                    </el-table-column>
                                    <el-table-column
                                      prop="basicPlatformName"
                                      label="平台名称"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                     
                                    </el-table-column>
                                    <el-table-column
                                      prop="basicPlatformCode"
                                      label="平台编码"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                      prop="platformPattern"
                                      label="平台模式"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                      prop="billPattern"
                                      label="账单模式"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                      prop="orderTypeName"
                                      label="账单类型"
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
                                      max-height="170"
                                    
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
            <!-- </el-col> -->
          </el-row>
          <!-- 新增 -->
          <Modal v-model="dialogVisible" :styles="mystyle"  title="新增平台账单类型"  @on-cancel='cancel' :width="990"  class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form :inline="true" ref="ruleForm" :model="addformdata" :rules="rules" class="demo-form-inline demo-ruleForm " :label-position="left"  >
                         <Col>
                                 <el-form-item label="平台名称" size="small" prop="companyName">
                                    <el-select v-model="addformdata.companyName" placeholder="平台名称" style="width:200px" filterable>
                                        <el-option v-for="v in platFormList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                                    </el-select>
                                </el-form-item>
                                 <el-form-item label="平台模式" size="small" prop="platformPattern">
                                      <el-input v-model="addformdata.platformPattern" placeholder="平台模式" maxlength="20" style="width:100px"></el-input>
                                 </el-form-item>
                                  <el-form-item label="账单模式" size="small" prop="billPattern">
                                      <el-input v-model="addformdata.billPattern" placeholder="账单模式" maxlength="20" style="width:100px"></el-input>
                                 </el-form-item>
                                <el-form-item label="账单类型" size="small" prop="useTime">
                                      <el-input v-model="addformdata.useTime" placeholder="账单类型" maxlength="20" style="width:100px"></el-input>
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
                                            prop="name"
                                            label="平台名称"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="code"
                                            label="平台编码"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="platformPattern"
                                            label="平台模式"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="billPattern"
                                            label="账单模式"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="type"
                                            label="账单类型"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="user"
                                            label="操作"
                                            min-width="120"
                                            align="center"
                                            show-overflow-tooltip>
                                                  <template slot-scope="scope"> <el-button  size="mini" type="primary" @click="onSplice(scope.row)">删除</el-button> </template>
                                            </el-table-column>
                                </el-table>
                            </section>
                          </Col>
                          <!-- <Col>
                               <el-form-item label=""   size="small" label-width="125px">
                                      <span style="color:#999">提示：一个公司只能生成一条应收启用时间</span>
                                </el-form-item>
                          </Col> -->
                          <el-form-item style="padding-left:400px">
                                    <Button type="primary" @click="confirmSub">确认</Button>
                                    <Button type="default" @click="cancel">取消</Button>
                          </el-form-item>
                </el-form>
              </Row>
            <div slot="footer"></div>
          </Modal>
            <!--编辑弹框-->
          <Modal v-model="editVisible" :styles="mystyle" :rules="rules"  title="编辑"  @on-cancel='canceledit' :width="990"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForms" :model="editformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules" >
                         <Col>
                                <el-form-item label="平台名称"   size="small" label-width="95px"  prop="platform">
                                     <el-input v-model="editformdata.name" maxlength="20" style="width:220px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="平台编码" size="small"   label-width="95px"   prop="company">
                                      <el-input v-model="editformdata.code" maxlength="20" style="width:120px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="账单类型" size="small"  label-width="95px" prop="shopname">
                                     <el-input v-model="editformdata.shopname" maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                          </Col>
                           <Col>
                                <el-form-item label="平台模式"   size="small" label-width="95px"  prop="platformPattern">
                                     <el-input v-model="editformdata.platformPattern" maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="账单模式" size="small"   label-width="95px"   prop="billPattern">
                                      <el-input v-model="editformdata.billPattern" maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="订单类型" size="small"  label-width="95px" prop="shopname">
                                     <el-input v-model="editformdata.shopname" maxlength="20" style="width:120px"></el-input>
                                </el-form-item> -->
                          </Col>
                          <el-form-item style="padding-left:400px">
                                  <Button type="primary" @click="submitForms('ruleForms')">确认</Button>
                                  <Button type="default" @click="canceledit">取消</Button>
                          </el-form-item>
                </el-form>
              </Row>
            <div slot="footer"></div>
          </Modal>
     </div>
</template>
<script>
  import filters from '../../../filter/'
  import fetchData from '../../../filter/axios'
  import {debounce} from 'mixins/debounce'
  export default {
    mixins:[debounce],
    data() {
      return {
        add:false,
        dialogVisible:false,
        editVisible :false,
        addformdata :{},
        IDS:[],
        editformdata:{
          id:'',
          name:'',
          code:'',
          shopname:'',
          platformPattern:'',
          billPattern:''
        },
        canSelectedMonth:'',
        page:1,
        pageSize:10,
        addList :[], //新增的数据列表
        delArray:[], //删除用数组
        addList :[], //增加列表
        platFormList:[], //平台下拉列表
        selectedYears:'',
        startTime    :'',
        endTime      :'',
        mystyle:{
                    top:'150px',
                },
        formData: {

        },
         // 日志相关
        dataFlag:true,
        logList:[], //日志列表
        billNo:'',
        currentPage:1,
        // 日志相关
        rules: {
                shopname: [
                       { required: true, message: '请输入账单类型',   trigger: 'blur' },
                ],
                platformPattern: [
                        { required: true, message: '请输入平台模式',  trigger: 'blur' }
                ],
                billPattern: [
                        { required: true, message: '请输入账单模式',  trigger: 'blur' }
                ],
                companyName: [
                        { required: true, message: '请选择平台名称',  trigger: 'change' }
                ],
                useTime: [
                        { required: true, message: '请输入账单类型',  trigger: 'blur' }
                ],
        },
        companyList:[], //公司列表
        logList    : [], //日志列表
        list       : [],
        active     : '',
        userInfo   :{}, //用户信息
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted(){
          this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
          this.getData()
          this.getCompany()
          this.getPlatForm()
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
          // onEdit(row){
          //               this.editVisible=true
          //               this.editformdata.name=row.basicPlatformName;
          //               this.editformdata.code=row.basicPlatformCode
          //               this.editformdata.shopname=row.orderTypeName
          //               this.editformdata.id=row.id;
          //   },
           onEdit(){
                 if(this.IDS.length==1){
                        this.editVisible=true
                        this.editformdata.name=this.IDS[0].basicPlatformName;
                        this.editformdata.code=this.IDS[0].basicPlatformCode
                        this.editformdata.shopname=this.IDS[0].orderTypeName
                        this.editformdata.id=this.IDS[0].id;
                        this.editformdata.platformPattern=this.IDS[0].platformPattern;
                        this.editformdata.billPattern=this.IDS[0].billPattern;
                 }else if(this.IDS.length==0){
                    this.$message.error('请先选择修改的数据!')
                 }else if(this.IDS.length>1){
                     this.$message.error('一次只能修改一条数据!')
                 }
          },
          selection(selection){
              this.IDS=selection
              console.log(this.IDS)
          },
          canceledit(){
                        this.editVisible=false;
                         this.resetForm('ruleForms')
            },
          submitEdit(){
                 let data={}
                     data.id             =this.editformdata.id;
                     data.orderTypeName  =this.editformdata.shopname
                     data.billPattern    =this.editformdata.billPattern
                     data.platformPattern=this.editformdata.platformPattern
                 this.request('received_orderType_update', data, true).then((res) => {
                            if (res.code == 1) {
                                 this.editVisible=false;
                                  this.$message.success('编辑成功')
                                  this.getData()
                            }else{
                                  this.$message.error(res.msg)
                            }
                        }) 
           },
          onSplice(row){
                  for(let i=0;i<this.addList.length;i++){
                     if(this.addList[i]==row){
                         this.addList.splice(i,1)
                     }
                  }
          },
           confirmSub(){
                let arr=[]
               if(this.addList.length>0){
                  for(let i=0;i<this.addList.length;i++){
                     arr.push({
                        basicPlatformId   :this.addList[i].id,
                        basicPlatformCode :this.addList[i].code,
                        basicPlatformName :this.addList[i].name,
                        orderType         :2,
                        orderTypeName     :this.addList[i].type,
                        platformPattern   :this.addList[i].platformPattern,
                        billPattern       :this.addList[i].billPattern

                     })
                  }
                  this.request('received_orderType_add', arr, true).then((res) => {
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
                    this.page = 1;    
                    this.getData()  
          },
          onReset(){
                    this.formData={}
                    this.page=1;
                    this.getData()
          },
          //验证通过添加的变量
          onNewAdd(){
                   if(this.addformdata.companyName&&this.addformdata.useTime){
                       if(this.addList.length>0){
                             for(let i=0;i<this.addList.length;i++){
                          if(this.addList[i].name==this.addformdata.companyName&&this.addList[i].type==this.addformdata.useTime){
                               this.addformdata={}
                               this.resetForm('ruleForm')
                              return this.$message.error('已添加过，不能添加');
                              }
                         }
                       }   
                      this.addList.unshift({
                             id   : this.getIDS(this.addformdata.companyName),
                             name : this.addformdata.companyName,
                             code : this.getCode(this.addformdata.companyName),
                             type : this.addformdata.useTime,
                             platformPattern:this.addformdata.platformPattern,
                             billPattern:this.addformdata.billPattern

                       })
                       this.addformdata={}
                       this.resetForm('ruleForm')
                   }

          },
          getCode(name){
                  for(let i=0;i<this.platFormList.length;i++){
                     if(this.platFormList[i].name==name){
                         return this.platFormList[i].code
                     }
                  }
          },
           getIDS(name){
                  for(let i=0;i<this.platFormList.length;i++){
                     if(this.platFormList[i].name==name){
                         return this.platFormList[i].id
                     }
                  }
          },
          //编辑提交
          submitForms(formName) {
                    this.editVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                             this.submitEdit()
                      } else {
                           return false;
                      }
                    });
          },
          submitForm(formName) {
                    this.dialogVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                             this.getPlatForm()
                             this.onNewAdd()
                      } else {
                           return false;
                      }
                    });
          },
         getPlatForm(){
                    let data={}
                    this.request('getPlatformSelector', data, false).then((res) => {
                            if (res.code == 1) {
                              this.platFormList=res.data  
                            }
                        })
         },
         getData(){
                    this.logList=[]
                    let data={}
                        data.currentPage      = this.page
                        data.pageSize         = this.pageSize
                        data.basicPlatformName= this.formData.name
                    this.request('masterData_received_orderType_page', data, true).then((res) => {
                            if (res.code == 1) {
                                    this.list   = res.data.records
                                    this.total  = res.data.count
                             }
                         })
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
                     this.billNo=billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     ='acc_bill_type_'+ this.billNo
                        data.pageSize   =3
                        data.currentPage=this.currentPage
                     this.request('billLog_getPagingByBillNo', data, false).then((res) => {
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
                     data.billNo     ='acc_bill_type_'+ this.billNo
                     data.pageSize   =3
                     data.currentPage=this.currentPage
                     this.request('billLog_getPagingByBillNo', data, false).then((res) => {
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
</style>
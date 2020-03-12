<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
                  <div>
                    <el-form-item    size="small">
                              <!--  -->
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"   size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                          <el-form-item    size="small">
                              <!--  -->
                              <el-button v-if="judgeMenu.indexOf('新增') !== -1"   size="small" type="primary" @click="onAdd" >新增</el-button>
                          </el-form-item>
                           <el-form-item    size="small">
                               <!-- -->
                              <el-button  v-if="judgeMenu.indexOf('编辑') !== -1"    size="small" type="primary" @click="onEdit">编辑</el-button>
                           </el-form-item>
                  </div>
                          <el-form-item label="主体"   size="small">
                              <el-select v-model="formData.name" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in mainList" :key="v.id"  :label="v.name"  :value="v.name"></el-option>
                              </el-select>
                          </el-form-item>
                </el-form>
          </header>
          <section class="middle">
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
                 max-height="250"
                 highlight-current-row 
                 @row-click="showLog"
                  >
                 <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                   type="index"
                    width="55"
                    label="序号"
                    align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="主体编码"
                  min-width="120"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="主体名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="shortName"
                  label="主体简称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="salePattern"
                  label="销售模式"
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
                     <template slot-scope="scope">{{ scope.row.enable==1?'启用':'停用'}}</template>
                </el-table-column>
                 <el-table-column
                  prop="status"
                  label="冻结状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.status==1?'冻结':'解冻'}}</template>
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
          <!--新增弹框 -->
          <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle"  @on-cancel='cancel' :width="810" @on-ok="editSubmit"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form :inline="true" ref="ruleForm" :model="editformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules" >
                         <Col>
                                <el-form-item label="主体编码"   size="small" label-width="95px"  prop="mainCode">
                                          <el-input v-model="editformdata.mainCode"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="主体名称" size="small"   label-width="95px"   prop="name" >
                                          <el-input v-model="editformdata.name"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="主体简称" size="small"  label-width="95px"   prop="abbr" >
                                          <el-input v-model="editformdata.abbr"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                          </Col>
                          <Col>
                                    <el-form-item label="销售模式" size="small"   label-width="95px"  prop="mode">
                                        <el-input v-model="editformdata.mode"  maxlength="20" style="width:120px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="启用状态" size="small"  label-width="95px" prop="status">
                                        <el-select v-model="editformdata.status" placeholder="请选择" style="width:120px">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="停用" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="冻结状态" size="small"  label-width="95px" prop="freeze">
                                        <el-select v-model="editformdata.freeze" placeholder="请选择" style="width:120px">
                                            <el-option label="解冻" value="0"></el-option>
                                            <el-option label="冻结" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                         </Col>
                          <el-form-item style="padding-left:330px">
                                  <Button type="primary" @click="submitForm('ruleForm')">确认</Button>
                                  <Button type="default" @click="cancel">取消</Button>
                          </el-form-item>
                </el-form>
              </Row>
            <div slot="footer"></div>
          </Modal>
          <!--编辑弹框-->
          <Modal v-model="editVisible" :styles="mystyle" :rules="rules"  title="编辑"  @on-cancel='canceledit' :width="810" @on-ok="editSubmit"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForms" :model="editFormLine" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules" >
                         <Col>
                                <el-form-item label="主体编码"   size="small" label-width="95px"  prop="mainCode">
                                          <el-input v-model="editFormLine.mainCode"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="主体名称" size="small"   label-width="95px"   prop="name" >
                                          <el-input v-model="editFormLine.name"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="主体简称" size="small"  label-width="95px"   prop="abbr" >
                                          <el-input v-model="editFormLine.abbr"  maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                          </Col>
                          <Col>
                                    <el-form-item label="销售模式" size="small"   label-width="95px"  prop="mode">
                                        <el-input v-model="editFormLine.mode"  maxlength="20" style="width:120px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="启用状态" size="small"  label-width="95px" prop="status">
                                        <el-select v-model="editFormLine.status" placeholder="请选择" style="width:120px">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="停用" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="冻结状态" size="small"  label-width="95px" prop="freeze">
                                        <el-select v-model="editFormLine.freeze" placeholder="请选择" style="width:120px">
                                            <el-option label="解冻" value="0"></el-option>
                                            <el-option label="冻结" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                         </Col>
                        <el-form-item style="padding-left:330px">
                                  <Button type="primary" @click="submitForms('ruleForms')">确认</Button>
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
        userInfo     : {},             //用户信息
        dialogVisible:false,
        editVisible  :false,
        editformdata : {},
        editFormLine : {
                    platform   :null,
                    company    :null,
                    shopname   :null,
                    number     :null,
                    account    :null,
                    wangdiantong:null,
                    status     :null,
                    freeze     :null,
                    brand      :null
        },           //编辑信息
        dialogtitle  :'新增',
        mainList     : [] ,   //主体列表
        page         : 1,
        IDS          : [],
        pageSize     : 10,
        mystyle      : {top:'150px'},
        formData     : {
                      user  : '',
                      region: '',
        },
        // 日志相关
        dataFlag    :   true,
        logList     :   [], //日志列表
        billNo      :   '',
        currentPage :   1, // 日志相关
        list        :   [],
        rules       :  {
                    mainCode: [ { required: true, message: '请输入主体编码',      trigger: 'blur' } ],
                    name    : [ { required: true, message: '请输入主体编码',      trigger: 'blur' } ],
                    abbr    : [ { required: true, message: '请输入主体简称',      trigger: 'blur' } ],
                    mode    : [ { required: true, message: '请输入店铺名称',      trigger: 'blur' } ],
                    status  : [ { required: true, message: '请选择启用状态',      trigger:'change'} ],
                    freeze  : [ { required: true, message: '请选择冻结状态',      trigger:'change'} ],
        },
        judgeMenu  : [],
        buttonList : [],//按钮权限
      }
    },
    mounted(){
                    this.getData()
                    this.getMainList()
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
      onEdit(){
                 if(this.IDS.length==1){
                    this.editVisible=true
                    this.resetForm('ruleForms')
                    // this.editFormLine=row
                    this.editFormLine = Object.assign({},this.editFormLine,this.IDS[0])
                    this.editFormLine.mainCode    = this.IDS[0].code
                    this.editFormLine.name        = this.IDS[0].name
                    this.editFormLine.mode        = this.IDS[0].salePattern
                    this.editFormLine.abbr        = this.IDS[0].shortName
                    this.editFormLine.status      =(this.IDS[0].enable).toString()
                    this.editFormLine.freeze      =(this.IDS[0].status).toString()
                    this.editFormLine.id          =this.IDS[0].id
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

          submitForm(formName) {
                    this.dialogVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                           this.addShop()
                      } else {
                        return false;
                      }
                    });
          },
           submitForms(formName) {
                    // this.editVisible=true
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                        this.edit()
                          //  this.addShop()
                      } else {
                        return false;
                      }
                    });
          },
          getData(){
                  this.logList=[]
                  let data={}
                      data.currentPage     =this.page
                      data.pageSize        =this.pageSize
                      data.name            =this.formData.name
                      this.request('masterData_subject_page', data, true).then((res) => {
                              if (res.code == 1) {
                                  this.list      = res.data.records
                                  this.total     = res.data.count
                              }
                          })
          },
          addShop(){
                    let  data={}
                          data.code            =  this.editformdata.mainCode 
                          data.name            =  this.editformdata.name                                    
                          data.shortName       =  this.editformdata.abbr
                          data.salePattern     =  this.editformdata.mode                         
                          data.status          =  this.editformdata.freeze
                          data.enable          =  this.editformdata.status      
                      this.request('masterData_subject_add', data, true).then((res) => {
                              if (res.code == 1) {
                                    this.$message({
                                          message: '新增成功',
                                          type: 'success'
                                    });
                                    this.cancel()
                                    this.getData()
                                    this.getMainList()
                                    
                              }else{
                                      this.$message({
                                          message:res.msg,
                                          type: 'error'
                                    });  
                              }
                          }) 
          },
        edit(){
               let  data={}
                          data.code= this.editFormLine.mainCode    
                          data.name= this.editFormLine.name       
                          data.salePattern=  this.editFormLine.mode       
                          data.shortName =this.editFormLine.abbr       
                          data.enable=  Number(this.editFormLine.status)    
                          data.status= Number(this.editFormLine.freeze)
                          data.id = this.editFormLine.id        
                      this.request('masterData_subject_update', data, true).then((res) => {
                              if (res.code == 1) {
                                    this.$message({
                                          message: '编辑成功',
                                          type: 'success'
                                    });
                                    this.canceledit()
                                    this.getData()
                                    this.getMainList()
                                    
                              }else{
                                    this.$message({
                                            message:res.msg,
                                            type: 'error'
                                      });  
                              }
                          })  
        },
        getMainList(){
                let data={};
                this.request('masterData_subject_selector',data,false).then(res=>{
                           if(res.code==1){
                                this.mainList=res.data
                           }
                })
        },
        resetForm(formName) {
                  this.editformdata={}
                  this.$refs[formName].resetFields();
        },
        cancel(){
                  this.resetForm('ruleForm')
                  this.dialogVisible=false;
                  this.editVisible=false;
        },
        canceledit(){
                    this.resetForm('ruleForms')
                    this.dialogVisible=false;
                    this.editVisible=false;
        },
        getLoglist(billNo){
                     this.billNo=billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     ='master_data_customer_subject_'+ this.billNo
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
                     data.billNo     ='master_data_customer_subject_'+ this.billNo
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

</style>
<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
                  <div>
                    <el-form-item    size="small">
                               <!--  -->
                              <el-button   v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                          <el-form-item    size="small">
                                <!-- -->
                              <el-button  v-if="judgeMenu.indexOf('新增') !== -1"   size="small" type="primary" @click="onAdd" >新增</el-button>
                          </el-form-item>
                           <el-form-item    size="small">
                                <!-- -->
                              <el-button  v-if="judgeMenu.indexOf('修改') !== -1"    size="small" type="primary" @click="onEdit">编辑</el-button>
                           </el-form-item>
                  </div>
                          <el-form-item label="单据类型"   size="small">
                                <el-input v-model.trim="formData.name" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
                              <!-- <el-select v-model="formData.basicPlatformId" @change="changebasicPlatformId(formData.basicPlatformId)" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in platformList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select> -->
                          </el-form-item>
                          <el-form-item label="单据编码" size="small">
                             <el-input v-model.trim="formData.code" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
                          </el-form-item>
                           <el-form-item label="是否参与成本运算" size="small">
                            <el-select v-model="formData.isAttend" value-key="id" placeholder="请选择" style="width:120px" >
                                   <el-option  label="仅成本运算"   value="3"></el-option>
                                   <el-option  label="仅库存运算"   value="2"></el-option>
                                   <el-option  label="成本库存都参与预算"   value="1"></el-option>
                                   <el-option  label="成本库存都不参与预算"   value="0"></el-option>
                             </el-select>
                          </el-form-item>
                           <el-form-item label="类型状态" size="small">
                              <el-select v-model="formData.enable" value-key="id" placeholder="请选择" style="width:120px" >
                                   <el-option  label="启用" value="1"></el-option>
                                   <el-option  label="停用" value="0"></el-option>
                             </el-select>
                          </el-form-item>
                          
                </el-form>
          </header>
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
                  @row-click="showLog"
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
                    align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="单据编码"
                  min-width="120"
                  align="center"
                  >
                  
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单据类型"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                  <el-table-column
                  prop="calculateCostType"
                  label="是否参与成本运算"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.calculateCostType == '0' ? '成本库存都不参与运算' : (scope.row.calculateCostType == '1' ? '成本库存都参与运算' : (scope.row.calculateCostType == '2' ? '仅库存运算' : '仅成本运算')) }}</template>
                </el-table-column>
                 <el-table-column
                  prop="enable"
                  label="类型状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                   <template slot-scope="scope">{{scope.row.enable == 0 ? '停用' : '启用' }}</template>
                </el-table-column>
                 <el-table-column
                  prop="created"
                  label="创建时间"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="lastUpdated"
                  label="修改时间"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"
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
  
          <!--新增弹框 -->
          <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle"  @on-cancel='cancel' :width="610" @on-ok="editSubmit"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form :inline="true" ref="ruleForm" :model="addObject" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules" >
                          <Col>
                                <el-form-item label="单据编码:" size="small"  label-width="95px" prop="warehouseNumber">
                                      <el-input :disabled='canDisabled' v-model="addObject.warehouseNumber" maxlength="20" placeholder="请输入" style="width:150px"></el-input>
                                </el-form-item>
                                <el-form-item label="单据名称:" size="small"  label-width="95px" prop="warehouseName">
                                    <el-input :disabled='canDisabled' v-model="addObject.warehouseName" maxlength="20" placeholder="请输入" style="width:155px"></el-input>
                                </el-form-item>
                                 <el-form-item label="是否参与成本运算:" size="small"  prop="isAttend">
                                  <el-select v-model="addObject.isAttend" placeholder="请选择" style="width:135px" >
                                        <el-option  label="仅成本运算"   value="3"></el-option>
                                   <el-option  label="仅库存运算"   value="2"></el-option>
                                   <el-option  label="成本库存都参与预算"   value="1"></el-option>
                                   <el-option  label="成本库存都不参与预算"   value="0"></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="类型状态:" size="small" label-width="95px" prop="status">
                                    <el-select v-model="addObject.status"  placeholder="请选择" style="width:130px" >
                                        <el-option  label="启用" value="1"></el-option>
                                        <el-option  label="停用" value="0"></el-option>
                                  </el-select>
                                </el-form-item>
                          </Col>
                          <Col>
                               <el-form-item label="备注 :" size="small" label-width="95px">
                                    <el-input type="textarea" v-model="addObject.remark" maxlength="200" placeholder="请输入" style="width:412px"></el-input>
                                </el-form-item>  
                          </Col>
                          <el-form-item style="padding-left:220px">
                                  <Button type="primary"  @click="dialogtitle=='新增'?submitForm('ruleForm'):submitForms('ruleForm')">确认</Button>
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
  import fetchparams from 'fetchparams'
  import {debounce} from 'mixins/debounce'
  export default {
    mixins:[debounce],
    data() {
      return {
        canDisabled:false,
        userInfo     : {},             //用户信息
        formData: {                    //头部对象
        },
        dialogVisible:false,
        editVisible  :false,
        addObject    : {
                        warehouseNumber    :'',//仓库编码
                        warehouseName      :'',//仓库名称
                        remark:'',
        },                             //新增对象
        editObject   : {},             //编辑对象
        dialogtitle  :'新增',
        page:1,
        IDS:[],
        pageSize:10,
        mystyle:{
                    top:'150px',
                },
       
        // 日志相关
        dataFlag:true,
        logList:[], //日志列表
        billNo:'',
        currentPage:1,
        // 日志相关
        list   :[],
        rules  : {
            warehouseNumber: [  
              { required: true, message: '请输入仓库编码',  trigger: 'blur' },
            
            ],
            warehouseName: [
              { required: true, message: '请输入仓库名称',  trigger: 'blur' }
            ],
            isAttend : [
              { required: true, message: '请选择是否参与成本运算',  trigger: 'change' }
            ],
             status : [
              { required: true, message: '请选择类型状态',       trigger: 'change' }
            ],
        },
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    created(){
            this.getData()
    },
    mounted(){
          this.getButtonJurisdiction()//按钮权限
    },
    methods: {
      onDel(){
            if(this.IDS.length==1){
                   let data={}
                       data.id=this.IDS[0].id
                      //  let url=`/eop-boot/masterData/warehouse/delete/${this.IDS[0].id}`
                   this.request('masterData_code_delete', data, false).then((res) => {
                              if (res.code == 1) {
                                 this.$message.success('删除成功')
                                 this.getData()
                              }else{
                                 this.$message.error(res.msg)
                              }
                          })
                 }else if(this.IDS.length==0){
                    this.$message.error('请先选择删除的数据!')
                 }else if(this.IDS.length>1){
                     this.$message.error('一次只能删除一条数据!')
                 }  
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
      onEdit(){  toString()
                 if(this.IDS.length==1){
                   this.canDisabled = true
                    this.dialogVisible=true
                    this.dialogtitle="编辑"
                    this.resetForm('ruleForm')
                    this.addObject = Object.assign({},this.addObject,this.IDS[0])
                    this.addObject.warehouseName      = this.IDS[0].name
                    this.addObject.warehouseNumber    = this.IDS[0].code
                    this.addObject.id       =this.IDS[0].id
                    this.addObject.remark = this.IDS[0].remark
                    this.addObject.isAttend = this.IDS[0].calculateCostType.toString()
                    this.addObject.status = this.IDS[0].enable.toString()
                    // this.addObject.isAttend = this.IDS[0].calculateCostType
                    //  this.IDS[0].enable == 0 ? this.addObject.status = '停用' : 
                    // this.IDS[0].calculateCostType ==0 ? this.addObject.isAttend = '成本库存都不参与运算' : (this.IDS[0].calculateCostTyp == 1 ? this.addObject.isAttend = '成本库存都参与运算' : (this.IDS[0].calculateCostTyp == 2 ? this.addObject.isAttend = '仅库存运算' : this.addObject.isAttend= '仅成本运算'))
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
                    this.canDisabled = false
                    this.resetForm('ruleForm')
                    this.addObject = {
                      remark:'',
                      warehouseNumber:'',
                      warehouseName:'',
                      isAttend:'',
                      status:'',
                    }
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
                      data.code            =this.formData.code
                      data.name            =this.formData.name
                      data.calculateCostType = this.formData.isAttend
                      data.enable = this.formData.enable
                      this.request('masterData_code_page', data, false).then((res) => {
                              if (res.code == 1) {
                                  this.list      = res.data.records
                                  this.total     = res.data.count
                              }
                          })
          },
          addShop(){
                    let  data={}
                          data.name            = this.addObject.warehouseName 
                          data.code            = this.addObject.warehouseNumber
                          data.calculateCostType = this.addObject.isAttend    
                          data.enable = this.addObject.status
                          data.remark = this.addObject.remark                              
                      this.request('masterData_code_add', data, true).then((res) => {
                              if (res.code == 1) {
                                    this.$message({
                                          message: '新增成功',
                                          type: 'success'
                                    });
                                    this.cancel()
                                    this.getData()
                                    // this.getShop()
                                    
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
                          data.id                     =  this.addObject.id
                          data.name          =  this.addObject.warehouseName                              
                          data.code          = this.addObject.warehouseNumber 
                          data.calculateCostType = this.addObject.isAttend   
                          data.enable = this.addObject.status
                          data.remark = this.addObject.remark                                                       
                      this.request('masterData_code_update', data, true).then((res) => {
                              if (res.code == 1) {
                                    this.$message({
                                          message: '编辑成功',
                                          type: 'success'
                                    });
                                    this.canceledit()
                                    this.getData()
                                    
                              }else{
                                    this.$message({
                                            message:res.msg,
                                            type: 'error'
                                      });  
                              }
                              this.canDisabled = false
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
                  this.canDisabled = false
        },
        canceledit(){
                    this.resetForm('ruleForm')
                    this.canDisabled = false
                    this.dialogVisible=false;
                    this.editVisible=false;
        },
        getLoglist(billNo){
                     this.billNo= 'master_data_code_type_'  + billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     = this.billNo
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
                     data.billNo     = this.billNo
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

</style>
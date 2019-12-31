<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
                          <el-form-item label="平台"   size="small">
                              <el-select v-model="formData.basicPlatformId" @change="changebasicPlatformId(formData.basicPlatformId)" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in platformList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="公司" size="small">
                              <el-select v-model="formData.basicCompanyId" placeholder="请选择" style="width:100px" filterable>
                                <el-option v-for="v in companyList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                           <el-form-item label="品牌" size="small">
                              <el-select v-model="formData.brandId" placeholder="请选择" style="width:100px"   filterable>
                                  <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="店铺名称" size="small">
                              <el-select v-model="formData.shopId" placeholder="请选择" style="width:100px" filterable>
                                <el-option v-for="v in shopList" :key="v.basicBrandId"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="启用状态" size="small">
                              <el-select v-model="formData.enable" placeholder="请选择" style="width:100px">
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="停用" value="0"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="冻结状态" size="small">
                              <el-select v-model="formData.status" placeholder="请选择" style="width:100px">
                                  <el-option label="解冻" value="0"></el-option>
                                  <el-option label="冻结" value="1"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item    size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                          <el-form-item    size="small">
                              <el-button v-if="judgeMenu.indexOf('新增') !== -1"  size="small" type="primary" @click="onAdd" >新增</el-button>
                          </el-form-item>
                           <el-form-item    size="small">
                              <el-button  v-if="judgeMenu.indexOf('修改') !== -1"  size="small" type="primary" @click="onEdit">编辑</el-button>
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
                  prop="basicPlatformName"
                  label="平台"
                  min-width="120"
                  align="center"
                  >
                  <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                </el-table-column>
                <el-table-column
                  prop="basicCompanyName"
                  label="公司"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="basicBrandName"
                  label="品牌"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="name"
                  label="店铺名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="omsShopCode"
                  label="旺店通编号"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="店铺编号"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="basicPlatformAccount"
                  label="平台账号"
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
                     <template slot-scope="scope">{{ scope.row.enable==1?'启用':'停用' }}</template>
                </el-table-column>
                 <el-table-column
                  prop="status"
                  label="冻结状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.status==1?'冻结':'解冻' }}</template>
                </el-table-column>
                 <el-table-column 
                  prop="dataFrom"
                  label="数据来源"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                   <template slot-scope="scope">{{ scope.row.dataFrom==1?'外部来源':'内部自增' }}</template>
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
                                <el-form-item label="平台"   size="small" label-width="95px"  prop="platform">
                                    <el-select v-model="editformdata.platform" placeholder="请选择" style="width:120px" filterable>
                                         <el-option v-for="v in platformList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="公司" size="small"   label-width="95px"   prop="company" >
                                    <el-select v-model="editformdata.company" placeholder="请选择" style="width:120px" filterable>
                                        <el-option v-for="v in companyList" :key="v.id" :disabled="v.used==0"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="品牌" size="small"  label-width="95px"   prop="brand" >
                                    <el-select v-model="editformdata.brand" placeholder="请选择" style="width:120px" filterable>
                                        <el-option :disabled="v.used!=1" v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                          </Col>
                          <Col>
                                <el-form-item label="店铺名称" size="small"  label-width="95px" prop="shopname">
                                      <el-input v-model="editformdata.shopname" maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="店铺编号" size="small"  label-width="95px" prop="number">
                                    <el-input v-model="editformdata.number" maxlength="20" style="width:120px"></el-input>
                                </el-form-item>
                                <el-form-item label="平台账号" size="small"   label-width="95px" prop="account">
                                    <el-input v-model="editformdata.account" maxlength="50" style="width:120px"></el-input>
                                </el-form-item>
                          </Col>
                         <Col>
                          <el-form-item label="旺店通编号" size="small"   label-width="95px"  prop="wangdiantong">
                              <el-input v-model="editformdata.wangdiantong"  maxlength="20" style="width:120px"></el-input>
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
                                <el-form-item label="平台"   size="small" label-width="95px"  prop="platform">
                                    <el-select v-model="editFormLine.platform" placeholder="请选择" style="width:120px" filterable >
                                         <el-option v-for="v in platformList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="公司" size="small"   label-width="95px"   prop="company">
                                    <el-select v-model="editFormLine.company" placeholder="请选择" style="width:120px" filterable >
                                       <el-option v-for="v in companyList" :key="v.id"  :disabled="v.used==0"  :label="v.name"  :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="品牌" size="small"  label-width="95px"   prop="brand">
                                    <el-select v-model="editFormLine.brand" placeholder="请选择" style="width:120px"  filterable><el-option :disabled="v.used!=1" v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option></el-select>
                                </el-form-item>
                          </Col>
                          <Col>
                                <el-form-item label="店铺名称" size="small"  label-width="95px" prop="shopname">
                                     <el-input v-model="editFormLine.shopname" maxlength="20" style="width:120px" ></el-input>
                                </el-form-item>
                                <el-form-item label="店铺编号" size="small"  label-width="95px" prop="number">
                                    <el-input v-model="editFormLine.number" maxlength="20" style="width:120px" ></el-input>
                                </el-form-item>
                                <el-form-item label="平台账号" size="small"   label-width="95px" prop="account">
                                    <el-input v-model="editFormLine.account" maxlength="50" style="width:120px" >
                                    </el-input>
                                </el-form-item>
                          </Col>
                         <Col>
                            <el-form-item label="旺店通编号" size="small"   label-width="95px"  prop="wangdiantong">
                                <el-input v-model="editFormLine.wangdiantong"  maxlength="20" style="width:120px" ></el-input>
                            </el-form-item>
                            <el-form-item label="启用状态" size="small"  label-width="95px" prop="status">
                                <el-select v-model="editFormLine.status" placeholder="请选择" style="width:120px" >
                                    <el-option label="启用" value="1"></el-option>
                                    <el-option label="停用" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="冻结状态" size="small"  label-width="95px" prop="freeze">
                                <el-select v-model="editFormLine.freeze" placeholder="请选择" style="width:120px" >
                                    <el-option label="解冻" value="0"></el-option>
                                    <el-option label="冻结" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                          </Col>
                          <el-form-item style="padding-left:330px">
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
  import fetchparams from 'fetchparams'
 
  export default {
    data() {
      return {
        userInfo     : {},             //用户信息
        dialogVisible:false,
        editVisible  :false,
        editformdata : {},
        editFormLine : {
                    platform   :'',
                    company    :'',
                    shopname   :'',
                    number     :'',
                    account    :'',
                    wangdiantong:'',
                    status     :'',
                    freeze     :'',
                    brand      :''
        },           //编辑信息
        dialogtitle  :'新增',
        shopList     : [],         //店铺列表
        platformList : [],         //平台列表
        companyList  : [],         //公司列表
        brandList    : [],         //品牌列表
        page:1,
        IDS:[],
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
        list   :[],
        rules  : {
          platform: [  
            { required: true, message: '请选择平台',  trigger: 'change' },
           
          ],
          company: [
            { required: true, message: '请选择公司',  trigger: 'change' }
          ],
          brand: [
            { required: true, message: '请选择品牌',  trigger: 'change' }
          ],
          shopname: [
            { required: true, message: '请输入店铺名称',trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请选择店铺编号', trigger: 'blur' }
          ],
          account: [
            {  required: true, message: '请输入平台账号', trigger: 'blur' }
          ],
          wangdiantong: [
            {  required: true, message: '请输入旺店通编号',trigger: 'blur' }
          ],
          status: [
             {  required: true, message: '请选择启用状态', trigger: 'change' }
          ],
          freeze: [
             {  required: true, message: '请选择解冻状态', trigger: 'change'}
          ]
        },
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted(){
          console.log(fetchparams.getParams().code)
         this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
         this.getData()
        //  this.getShop()
         this.getPlatform()
         this.getCompany()
         this.getBrandList()
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
                    console.log(this.editFormLine,'000000')
                    this.editFormLine.platform    = this.IDS[0].basicPlatformId
                    this.editFormLine.company     = this.IDS[0].basicCompanyId
                    this.editFormLine.shopname    = this.IDS[0].name
                    this.editFormLine.number      = this.IDS[0].code
                    this.editFormLine.account     = this.IDS[0].basicPlatformAccount
                    this.editFormLine.wangdiantong= this.IDS[0].omsShopCode
                    this.editFormLine.status      =(this.IDS[0].enable).toString()
                    this.editFormLine.freeze      =(this.IDS[0].status).toString()
                    this.editFormLine.brand       =this.IDS[0].basicBrandId
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
                      data.basicBrandId    =this.formData.brandId
                      data.basicCompanyId  =this.formData.basicCompanyId
                      data.basicPlatformId =this.formData.basicPlatformId
                      data.id              =this.formData.shopId
                      data.enable          =this.formData.enable
                      data.status          =this.formData.status
                      this.request('merchantstore_basic_pageQuery', data, true).then((res) => {
                              if (res.code == 1) {
                                  this.list      = res.data.records
                                  this.total     = res.data.count
                              }
                          })
          },
          addShop(){
                    let  data={}
                          data.basicPlatformName    = filters.getName(this.platformList,this.editformdata.platform)   //平台名称
                          data.basicPlatformId      = this.editformdata.platform                                      //平台id
                          data.basicCompanyName     = filters.getName(this.companyList,this.editformdata.company)    //公司名
                          data.basicCompanyId       = Number(this.editformdata.company)                              //公司ID
                          data.basicCompanyCode     = filters.getCompanyCode(this.companyList,this.editformdata.company)
                          data.basicBrandName       = filters.getName(this.brandList, this.editformdata.brand)       //品牌名称
                          data.basicBrandId         = Number(this.editformdata.brand)                                //品牌Id
                          data.name                 = this.editformdata.shopname                                     //店铺名称
                          data.omsShopCode          = this.editformdata.wangdiantong                                 //旺店通编号
                          data.code                 = this.editformdata.number                                       //店铺编码
                          data.basicPlatformAccount = this.editformdata.account                                      //平台账号
                          data.enable               = this.editformdata.status                                       //是否启用
                          data.status               = this.editformdata.freeze                                       //是否冻结
                          data.lastUpdateUserId     = this.userInfo.userId                                           //用户id
                      this.request('merchantstore_basic_createNewStore', data, true).then((res) => {
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
                          data.basicPlatformName    = filters.getName(this.platformList,this.editFormLine.platform)   //平台名称
                          data.basicPlatformId      = this.editFormLine.platform                                      //平台id
                          data.basicCompanyName     = filters.getName(this.companyList,this.editFormLine.company)     //公司名
                          data.basicCompanyId       = Number(this.editFormLine.company)                               //公司ID
                          data.basicCompanyCode     = filters.getCompanyCode(this.companyList,this.editFormLine.company)
                          data.basicBrandName       = filters.getName(this.brandList, this.editFormLine.brand)       //品牌名称
                          data.basicBrandId         = Number(this.editFormLine.brand)                                //品牌Id
                          data.name                 = this.editFormLine.shopname                                     //店铺名称
                          data.omsShopCode          = this.editFormLine.wangdiantong                                 //旺店通编号
                          data.code                 = this.editFormLine.number                                       //店铺编码
                          data.basicPlatformAccount = this.editFormLine.account                                       //平台账号
                          data.enable               = this.editFormLine.status                                       //是否启用
                          data.status               = this.editFormLine.freeze                                       //是否冻结
                          // data.lastUpdateUserId     = this.editFormLine.userId                                           //用户id
                          data.id                   = this.editFormLine.id
                      this.request('merchantstore_basic_updateById', data, true).then((res) => {
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
                          })  
        },
        getCompany(){
                  //masterData_company_selector
                   let data={}
                    this.request('masterData_company_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.companyList=res.data
                            }
                        }) 
        },
        changebasicPlatformId(id){
          this.formData.shopId = ''
          console.log(id,'3456789')
          let data = {}
          data.platformId = id
          this.request('getBindingByPlatformId', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.shopList=res.data
                            }
                        }) 
        },
        // getShop(){
        //          let data={}
        //             this.request('merchantstore_basic_commonQuery', data, true).then((res) => {
        //                     if (res.code == 1) {
        //                           this.shopList=res.data
        //                     }
        //                 }) 
        // },
        getBrandList(){
                 let data={}
                    this.request('masterData_brand_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
        },
        getPlatform(){
                    //getPlatformSelector
                      let data={}
                      this.request('getPlatformSelector', data, true).then((res) => {
                              if (res.code == 1) {
                                    this.platformList=res.data
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
                        data.billNo     ='master_data_merchant_store_'+ this.billNo
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
                     data.billNo     ='master_data_merchant_store_'+ this.billNo
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
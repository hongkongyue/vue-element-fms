<template>
    <div>
        <!-- 数据列表 -->
        <Row class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
             <Form :model="formSearch" class="search" ref="formSearch" :label-width="80" inline label-position="right" :rules="rules" @keydown.native.enter.prevent="search">
                    <Form-item label="" :label-width='40'>
                      <el-button type="primary" size="small" @click="getIn">录入</el-button>
                    </Form-item>
            </Form>
            <el-table :data="list" size="mini" style="width: 100%"  border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="taskNo"            label="任务流编号" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="processStatus"     label="流程状态" align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateUserName"   label="品牌发起人"     min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateDepartmentName"      label="发起部门"       min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="majorClasses" label="面/辅料"       min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kinds"      label="面辅料品类分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialCategory"              label="是否特殊工艺"   min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="styleImg"               label="样品图1"        min-width="80" align="center" show-overflow-tooltip>
                 <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.styleImg)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.styleImg" 
                                        :preview-src-list="[scope.row.styleImg]">
                                    </el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2"       label="样图2"           min-width="80" align="center" show-overflow-tooltip>
                   <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.styleImg2)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.styleImg2" 
                                        :preview-src-list="[scope.row.styleImg2]">
                                    </el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="realMaterial" label="是否有实物" min-width="90" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.realMaterial == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="contrastColor" label="是否撞色" min-width="150" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.contrastColor == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="developer" label="开发员" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="requireDate" label="要求完成日期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="sendInspectDate" label="送检日期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="inspectResult" label="检测结果" min-width="140" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                        <span>{{scope.row.inspectResult==1?'合格':'不合格'}} </span>
                </template>
            </el-table-column>
            <el-table-column prop="inspectUser" label="检测人员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="inspectTime" label="检测时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="price" label="核准价格（元/米）" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="pricingUser" label="核价人员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="pricingTime" label="核价时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    
        <Row style="margin-top:30px">
        <!-- <Table size="small" :columns="columnsTwo" highlight-row :data="dataTwwo"></Table> -->
        <el-table  :data="tableData" size="mini" style="width: 100%"  border tooltip-effect="dark" max-height="350" >
            <el-table-column type="index" width="55" label="序号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="materialImg" label="图片" min-width="60" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.materialImg)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.materialImg" 
                                        :preview-src-list="[scope.row.materialImg]">
                                    </el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="materialYear" label="年份" align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialMonth" label="月份" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicSupplierShortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialColorNo" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialNo" label="物料编号" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialName" label="物料名称" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicColorName" label="颜色" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWidth" label="门幅（cm）" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWeight" label="克重（g/m2)" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="单位" min-width="150" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ingredient" label="成分" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="moq" label="起订量" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="firstMaterialType" label="一级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="twiceMaterialType" label="二级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="thirdMaterialType" label="三级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="materialSpecification" label="物料规格" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="loss" label="默认损耗（%）" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="loopedWeft" label="纬缩(%)" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="knees" label="经缩(%)" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="productCycle" label="生产周期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="orderCycle" label="订货周期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="kilogramsOfRice" label="公斤米数" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="riskRemark" label="质量风险提示" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="developer" label="开发人" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="enterTime" label="录入时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="materialUser" label="面料员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="materialEnterTime" label="面料录入时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <Modal v-model="dialogVisible" :styles="mystyle"  title="录入" @on-cancel='cancel' :width="810"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="年份：" size="small" label-width="55px" >
                        <el-input  v-model="formData.year"  style="width:160px" readonly :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="月份：" size="small" label-width="75px" prop="taskRank">
                        <el-input v-model="formData.month" maxlength="160" style="width:160px"  readonly   :disabled="true"></el-input>
                    </el-form-item>
                     <!-- <el-form-item label="物料编号：" size="small" label-width="95px" prop="numbercode">
                        <el-input disabled v-model="formData.taskRank" maxlength="160"  style="width:160px"  show-word-limit></el-input>
                    </el-form-item> -->
                     <el-form-item label="颜色：" size="small" label-width="75px" prop="color">
                         <el-input  v-model="formData.color"  style="width:185px" readonly></el-input>
                    </el-form-item>
                </Col>
                 <Col>
                  <el-form-item label="一级分类：" size="small" label-width="95px" prop="first">
                        <el-select v-model="formData.first" placeholder="请选择" style="width:140px" filterable @change="getSelectMaterialType(2,formData.first)">
                             <el-option v-for="v in firstLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类:" size="small" label-width="90px" prop="second">
                          <el-select v-model="formData.second" placeholder="请选择" style="width:140px" filterable @change="getSelectMaterialType(3,formData.second)">
                             <el-option v-for="v in secondLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="三级分类：" size="small" label-width="95px" prop="third">
                       <el-select v-model="formData.third" placeholder="请选择" style="width:150px" filterable>
                           <el-option v-for="v in thirdLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                </Col>
                <Col>
                    <el-form-item label="物料名称：" size="small" label-width="95px" prop="name">
                        <el-input v-model="formData.name" maxlength="120" style="width:140px"></el-input>
                    </el-form-item>
                    <el-form-item label="物料规格：" size="small" label-width="95px" prop="sku">
                        <el-input  v-model="formData.sku"   style="width:140px" ></el-input>
                    </el-form-item>
                    <el-form-item label="质量风险提示：" size="small" label-width="115px" prop="remark">
                        <el-input  v-model="formData.remark"  style="width:125px" maxlength="50" ></el-input>
                    </el-form-item>
                </Col>
                <Col style="positive:">
                    <span style="color:red;position:absolute;left:10px;top:10px">*</span>
                    <el-form-item label="图片：" size="small" label-width="75px" >
                         <!-- <el-button type="primary" size="small" @click="getIn">上传图片</el-button> -->
                           <Upload 
                                                    ref="upload"
                                                    name="file"
                                                    :headers="authentic"
                                                    :show-upload-list="false"
                                                    :before-upload="handleUpload"
                                                    :on-success="uploadSuccess"
                                                    :on-error="uploadError"
                                                    action="/eop-boot/masterData/ossFileAddress/upload"
                                                    :data="{fileName:Filename,className:1}"
                                                            >
                                                    <Button type="primary"        icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button>
                                          </Upload>
                                          <!-- <Button v-if="dealshowFilelist.length>0" type="primary" @click="tip" icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button> -->
                    </el-form-item>
                    <el-form-item label="" size="small" label-width="95px" prop="taskRank">
                         <img v-if="this.imgShowUrl" :src="this.imgShowUrl" style="width:100px;height:100px"/>
                    </el-form-item>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" @click="submitForms('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    </Row>
    </Row>
         
    </div>
</template>

<script>
    export default {
        data() {
            return {
                noPict:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
                value1:'',
                imgShowUrl:'',
                materialImg:'',
                visible: false,
                red_packet_table_row_index:-1,
                list:[],
                authentic:{
                       'X-AUTH-TOKEN' :window.sessionStorage.getItem('token')
                },
                url:'',
                file:null,
                Filename:null,
                srcList:[],
                dealshowFilelist:[],
                changeVisible:false,
                dialogVisible:false,
                tableData:[],
                formSearch:{},
                supplierMaterialColorNo:'',//色系
                formData:{
                         year:new Date().getFullYear(),
                         month:new Date().getMonth()+1,
                         color:'',
                         name:'',
                         first:'',
                         second:'',
                         third:'',
                         sku:'',
                         remark:'',
                },
                userInfo: {},
                firstLevelList:[],
                secondLevelList:[],
                thirdLevelList:[],
                total: 0,
                page: 1,
                pageSize: 10,
                rules:{
                       numbercode: [
                              { required: true, message: '请输入', trigger: 'blur' },
                        ],
                        color: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         name: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        first: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        second: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        third: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        sku: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         pict: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                },
            }
        },
        mounted() {
                this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                this.getTableData()
                this.getData() 
                this.getSelectMaterialType(1)
        },
        methods: {
             getIn(){
                   this.dialogVisible=true
                   this.getColor(this.supplierMaterialColorNo)
             },
             getColor(color){
                     let data={}
                         data.colorNo=color
                         this.request('color_page',data,false).then(res=>{
                             if(res.code==1){
                                 if(res.data.records){
                                      this.formData.colorId=res.data.records[0].id
                                      this.formData.color=res.data.records[0].colorNo+'-'+res.data.records[0].colorName+'-'+res.data.records[0].code
                                 }else{

                                 }
                                  
                             }else{
                                  this.$message.error(res.msg)
                             }
                         })       
             },
             getSelectMaterialType(level,parentId){
                      let data={}
                          data.level=level;

                          if(level==2){
                              this.formData.second=''
                              this.formData.third=''
                          }
                          if(level==3){
                               this.formData.third='' 
                          }
                          if(level>1){
                             data.parentId=parentId
                          }
                          this.request('materialType_selector',data,false).then(res=>{
                              if(res.code==1){
                                   if(level==1){
                                          this.firstLevelList=res.data
                                   }else if(level==2){
                                          this.secondLevelList=res.data
                                   }else if(level==3){
                                          this.thirdLevelList=res.data
                                   }
                              }else{
                                   if(level==1){
                                          this.firstLevelList =[]
                                   }else if(level==2){
                                          this.secondLevelList=[]
                                   }else if(level==3){
                                          this.thirdLevelList =[]
                                   }    
                              }
                          })
             },
             getLargePict(url){
                            this.url=url;
                            this.srcList=[url]
             },
             submitRecord(){
                     let {taskNo,taskDetailId,taskConfigurationId,taskConfigurationName}=this.$route.query
                     
                     let  data={}
                          data.taskNo=taskNo
                          data.materialImg=this.materialImg
                          data.materialYear=this.formData.year
                          data.materialMonth=this.formData.month
                          data.basicColorId=this.formData.colorId
                          data.basicColorName=this.formData.color
                          data.materialName=this.formData.name
                          data.materialTypeId=this.formData.third
                          data.firstMaterialType=this.getfirstName(1,this.formData.first)
                          data.twiceMaterialType=this.getfirstName(2,this.formData.second)
                          data.thirdMaterialType=this.getfirstName(3,this.formData.third)
                          data.thirdMaterialTypeCode=this.getfirstName(4,this.formData.third)
                          data.materialSpecification=this.formData.sku
                          data.riskRemark          =this.formData.remark
                          data.id                  =this.tableData[0]?this.tableData[0].id:''
                          data.taskDetailId        =taskDetailId
                          data.taskConfigurationId  =taskConfigurationId
                          data.taskConfigurationName=taskConfigurationName
                          if(!data.materialImg)return this.$message.error('图片不能为空')
                          this.request('fabric_developMaterialEnter_submit',data,false).then(res=>{
                               if(res.code==1){
                                      this.cancel()
                                      this.$root.eventHub.$emit('closePageFromOtherPage', 'fabricdetail');//关闭新增页面
                                      this.$router.push({
                                                          name:'fabriccomplated',
                                                          query: { 
                                                                 taskNo: taskNo,
                                                                 taskDetailId:taskDetailId
                                                         }
                                                 })
                                    
                               }else{
                                    this.$message.error(res.msg)
                               }
                          })
             },
             getfirstName(type,id){
                  if(type==1){
                      for(let i=0,len=this.firstLevelList.length;i<len;i++){
                          if(this.firstLevelList[i].id==id){
                              return this.firstLevelList[i].name
                          }
                      }
                  }else if(type==2){
                     for(let i=0,len=this.secondLevelList.length;i<len;i++){
                          if(this.secondLevelList[i].id==id){
                              return this.secondLevelList[i].name
                          }
                      } 
                  }else if(type==3){
                       for(let i=0,len=this.thirdLevelList.length;i<len;i++){
                          if(this.thirdLevelList[i].id==id){
                              return this.thirdLevelList[i].name
                          }
                      } 
                  }else if(type==4){
                       for(let i=0,len=this.thirdLevelList.length;i<len;i++){
                          if(this.thirdLevelList[i].id==id){
                              return this.thirdLevelList[i].code
                          }
                      } 
                  }
             },
             resetForm(formName) {
                 this.$refs[formName].resetFields();
             },
             submitForms(formName) {
                        this.dialogVisible = true
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.submitRecord()
                            } else {
                                return false;
                            }
                        });
                },
             getTableData(){
                              let { taskNo }=this.$route.query
                              this.tableData=[]
                              let data={}
                                  data.taskNo=taskNo
                                  this.request('fabric_developMaterialEnter_detail',data,false).then(res=>{
                                       if(res.code==1){
                                               if(res.data){
                                                    this.supplierMaterialColorNo=res.data.supplierMaterialColorNo
                                                    this.tableData=[res.data]
                                               }else{
                                                    this.tableData=[] 
                                               }
                                                
                                       }else{
                                                    this.$message.error(res.msg)
                                                    this.tableData=[]
                                       }
                                  })
                },
                //初始化第一个列表数据
                getData() {
                              let { taskNo }=this.$route.query
                              let data={}
                                  data.taskNo=taskNo
                        this.request('fabric_fabric_develop_pricing_queryPricingDetail', data, false).then((res) => {
                            if(res.code==1){
                                     if(res.data){
                                           this.list=[res.data]
                                     }else{
                                           this.list       = []
                                     }
                              }else{
                                     
                                     this.list       = []
                                     this.$message.error(res.msg)
                                }
                            })    

                    },
               handleUpload(file) {
                if (!/\.jpg$|.png$|.jpe$|.bmp$|.jfif$/.test(file.name)) {
                // if (!/\.jpg$|.png$|.jpe$/.test(file.name)) {
                     this.$Message.warning('类型不符,请重新选择图片');
                     return false
                } else {
                    console.log(file)
                     this.file = file;
                     this.Filename= file.name
                     this.className=1
                     setTimeout(()=>{
                            this.$refs['upload'].post(file)
                        },1000)
                      return false;
                }
                },
                allDealsList(brandId){
                        let data={};
                        this.formSearch.plannerOaId=''
                        // this.formSearch.plannerOaId=''
                        // this.formSearch.plannerOaId=''
                        data.brandId=Number(brandId)
                        this.request('productlaunch_developDesignerConfig_plannerListInit', {data:data}, false).then((res) => {
                                if(res.code==1){
                                     this.alldealList=res.data
                                     if(res.data.length==0){
                                            // document.querySelector('.ivu-select-selected-value').innerHTML=''
                                            this.alldealList=[]
                                            //  this.$set(this.alldealList)
                                            this.formSearch.plannerOaId=''
                                     }
                                }
                            })    
                },
                uploadSuccess(res, file) {
                        if (res.code == 1) {
                            this.file = '';
                                 file='';
                                this.imgShowUrl=res.data.htmlOssAddress
                                this.materialImg=res.data.ossAddress
                            this.$Message.success({
                                content: res.msg,
                                duration: 3
                            });
                        } else {
                            this.file = '';
                                file='';
                            this.loadingStatus = false;
                            this.$Message.error({
                                content: res.msg,
                                duration: 3
                            });
                        }
                    },
               cancel(){
                        this.dialogVisible=false;
                         this.imgShowUrl=''
                        this.resetForm('ruleForm')
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

    .el-table__header-wrapper {

        width: 99.9% !important;

    }
   
</style>
<style>
 .el-image-viewer__close{
        color:#fff!important;
    }
.el-image-viewer__prev,.el-image-viewer__next{
     display: none;
}
</style>

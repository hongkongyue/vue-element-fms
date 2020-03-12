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
        <el-table ref="multipleTable" :data="tableData" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" label="序号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="basicSupplierShortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialColorNo" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column prop="price" label="物料编号" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="物料名称" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="singleDosage" label="颜色" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column prop="fabricWidth" label="门幅（cm）" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWeight" label="克重（g/m2)" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="单位" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ingredient" label="成分" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="moq" label="起订量" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <!-- <el-table-column prop="lastUpdated" label="物料规格" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column> -->
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
             <el-table-column prop="developer" label="开发人" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="enterTime" label="录入时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <Modal v-model="dialogVisible" :styles="mystyle"  title="录入" @on-cancel='cancel' :width="940"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <!--  -->
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="供应商简称：" size="small" label-width="115px" prop="basicSupplierId">
                       <el-select v-model="formData.basicSupplierId" placeholder="请选择" style="width:160px" filterable>
                                <el-option v-for="v in supplyList" :key="v.id" :label="v.shortName" :value="v.id"></el-option>
                        </el-select>
                       </el-form-item>
                    <el-form-item label="供应商物料编号：" size="small" label-width="135px" prop="supplierMaterialNo">
                        <el-input v-model="formData.supplierMaterialNo" maxlength="160" style="width:150px" ></el-input>
                    </el-form-item>
                     <el-form-item label="供应商物料色号：" size="small" label-width="135px" prop="supplierMaterialColorNo">
                        <el-input  v-model="formData.supplierMaterialColorNo" maxlength="100"  style="width:150px"></el-input>
                    </el-form-item>
                </Col>
                <Col>
                    <el-form-item label="门幅(cm)：" size="small" label-width="115px" prop="fabricWidth">
                        <el-input type="number"  v-model="formData.fabricWidth" max="999"  style="width:160px" ></el-input>
                    </el-form-item>
                    <el-form-item label="克重(g/m2)：" size="small" label-width="125px" prop="fabricWeight">
                        <el-input type="number" v-model="formData.fabricWeight" max="999" style="width:160px" ></el-input>
                    </el-form-item>
                     <el-form-item label="单位：" size="small" label-width="115px" prop="unit">
                        <el-select v-model="formData.unit" placeholder="请选择" style="width:170px" filterable>
                        <el-option v-for="v in unitList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                    </el-form-item>
                </Col>
                 <Col>
                    <el-form-item label="成分:" size="small" label-width="115px" prop="ingredient">
                           <el-input v-model="formData.ingredient" style="width:160px" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="起订量：" size="small" label-width="115px" prop="moq">
                       <el-input v-model.number="formData.moq" style="width:160px" max="99999"></el-input>
                    </el-form-item>
                     <el-form-item label="默认损耗(%)：" size="small" label-width="125px">
                        <el-input-number type="number"  v-model="formData.loss" :min="0" :max="100"  style="width:170px"  show-word-limit></el-input-number>
                    </el-form-item>
                </Col>
                  <Col>
                    <el-form-item label="纬缩(%):" size="small" label-width="120px" >
                            <el-input-number type="number" v-model="formData.loopedWeft" :min="0" :max="100" style="width:155px" ></el-input-number>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="经缩(%):" size="small" label-width="120px" >
                           <el-input-number type="number" v-model="formData.knees" :min="0" :max="100" style="width:165px" ></el-input-number>
                    </el-form-item>
                     <el-form-item label="生产周期：" size="small" label-width="115px" >
                        <el-input-number type="number" v-model.number="formData.productCycle" :min="0"  style="width:170px"  show-word-limit></el-input-number>
                    </el-form-item>
                </Col>
                 <Col>
                    <el-form-item label="订货周期:" size="small" label-width="115px" >
                           <el-input-number type="number" v-model="formData.orderCycle"  :min="0" style="width:160px"></el-input-number>
                    </el-form-item>
                    <el-form-item label="公斤米数:" size="small" label-width="115px">
                           <el-input-number type="number" v-model="formData.kilogramsOfRice"  :min="0"  style="width:160px" ></el-input-number>
                    </el-form-item>
                     <el-form-item label="备注：" size="small" label-width="125px">
                        <el-input  v-model="formData.remark"   style="width:170px" maxlength="99"  show-word-limit></el-input>
                    </el-form-item>
                </Col>
                <el-form-item style="padding-left:400px">
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
                value1:'',
                visible: false,
                red_packet_table_row_index:-1,
                list:[],
                imgShowUrl:'',
                materialImg:'',
                dealshowFilelist:[],
                supplyList:[],//供应商下拉列表
                changeVisible:false,
                dialogVisible:false,
                tableData:[],
                formSearch:{},
                formData:{
                        basicSupplierId:'',
                        supplierMaterialNo:'',
                        supplierMaterialColorNo:'',
                        fabricWidth:'',
                        fabricWeight:'',
                        unit:'',
                        ingredient:'',
                        moq:'',
                        loss:'',
                        knees:'',
                        loopedWeft:'',
                        productCycle:'',
                        orderCycle:'',
                        kilogramsOfRice:'',
                        remark:'',
                },
                pickerOptions: {
                disabledDate(time) {
                    return (time.getTime() <Date.now());
                   },
                 },
                userInfo: {},
                total: 0,
                page: 1,
                pageSize: 10,
                rules:{
                       basicSupplierId: [
                            { required: true, message: '请选择', trigger: 'change' },
                        ],
                       supplierMaterialNo: [
                            { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        supplierMaterialColorNo: [
                            { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        fabricWidth: [
                            { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        fabricWeight: [
                            { required: true, message: '请输入', trigger: 'change' }
                        ],
                        unit: [
                            { required: true, message: '请选择', trigger: 'change' }
                        ],
                        ingredient: [
                             { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         moq: [
                             { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        loss: [
                             { required: true, message: '请输入', trigger: 'blur' }
                        ],
                },
            }
        },
        mounted() {
                this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                this.getData()
                this.getTableData()
                this.getSupplyList()
                this.getUnitList()
                // this.getdownList()
        },
        activated() {

        },
        methods: {
            getIn(){
                   this.dialogVisible=true
            },
             getLargePict(url){
                            this.url=url;
                            this.srcList=[url]
             },
              changeTable() {
                  this.changeVisible = true
              },
              search(){
                            this.page =1
                            this.getData()
                    },  
                currentChange(page) {
                            this.page = page
                            this.getData()
                    },
                sizeChange(pageSize) {
                            this.pageSize = pageSize
                            this.getData()
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
                getUnitList(){
                        this.request('masterData_basicMeasureUnit_pullDown',{},false).then(res=>{
                            if(res.code==1){
                                this.unitList=res.data
                            }
                        })
                },
                getSupplyList(){
                         this.request('masterData_supplier_selector',{},false).then(res=>{
                                if(res.code==1){
                                    this.supplyList=res.data
                                }else{
                                    this.$message.error(res.msg)
                                }
                         })
                },
                getsupplyName(id){
                   for(let i=0,len=this.supplyList.length;i<len;i++){
                       if(this.supplyList[i].id==id){
                           return this.supplyList[i].name
                       }
                   }
                },
                submitRecord(){
                    let { taskNo,taskDetailId,taskConfigurationId,taskConfigurationName }=this.$route.query
                    let data={}
                        data.taskDetailId=Number(taskDetailId)
                        data.taskNo=taskNo
                        data.taskConfigurationId=taskConfigurationId
                        data.taskConfigurationName=taskConfigurationName
                        data.basicSupplierId=Number(this.formData.basicSupplierId)
                        data.basicSupplierShortName=this.getsupplyName(this.formData.basicSupplierId)
                        data.supplierMaterialNo=this.formData.supplierMaterialNo
                        data.supplierMaterialColorNo=this.formData.supplierMaterialColorNo
                        data.fabricWidth=Number(this.formData.fabricWidth)
                        data.fabricWeight=Number(this.formData.fabricWeight)
                        data.unit=this.formData.unit
                        data.ingredient=this.formData.ingredient
                        data.moq=Number(this.formData.moq)
                        //缺少
                        data.loss=this.formData.loss?Number(this.formData.loss):0;
                        data.knees=this.formData.knees?Number(this.formData.knees):0
                        data.loopedWeft=this.formData.loopedWeft?Number(this.formData.loopedWeft):0
                        data.productCycle=this.formData.productCycle?Number(this.formData.productCycle):0
                        data.orderCycle=this.formData.orderCycle?Number(this.formData.orderCycle):0
                        data.kilogramsOfRice=this.formData.kilogramsOfRice?Number(this.formData.kilogramsOfRice):0
                        data.remark=this.formData.remark
                        data.id=this.tableData[0]?this.tableData[0].id:''
                       
                    this.request('fabricDevelop_poEnter_enterPurchaseDetail',data,false).then(res=>{
                           if(res.code==1){
                                      this.cancel()
                                      this.$root.eventHub.$emit('closePageFromOtherPage', 'purchasingdetail');//关闭新增页面
                                //    this.$router.push({name: 'returnAudit'});//跳转
                                      this.$router.push({
                                                          name:'purchasingcomplated',
                                                          query: { 
                                                                 taskNo: taskNo,
                                                                 taskDetailId:taskDetailId
                                                         }
                                                 })
                                      
                               }else{
                                    this.$message.error(res.msg)
                               }
                        //    }
                    })

                },
                getTableData(){
                              let { taskNo,taskDetailId }=this.$route.query
                              this.tableData=[]
                              let data={}
                                  data.taskNo=taskNo
                                //   data.taskDetailId=taskDetailId
                                  this.request('fabricDevelop_poEnter_detail',data,false).then(res=>{
                                       if(res.code==1){
                                               if(res.data){
                                                    // this.supplierMaterialColorNo=res.data.supplierMaterialColorNo
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
                                     
                                     
                                     this.$message.error(res.msg)
                                }
                            })    

                },
                cancel(){
                        this.dialogVisible=false;
                        this.resetForm('ruleForm')
                        for(let i in this.formData){
                              this.formData[i]=''
                        }
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                }
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


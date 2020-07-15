<template>
	     <div>
	     	  <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
            <Col style="margin-bottom:0px">
                     <el-form-item size="small" class="marginT0">
                       <!--   -->
                        <el-button  v-if="judgeMenu.indexOf('查询') != -1" size="small" type="primary" @click="onSearch">查询</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                            <el-button size="small" type="default" @click="onReset">重置</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                            <!--  " -->
                            <el-button v-if="judgeMenu.indexOf('新增') != -1"  size="small" type="primary" @click="onAdd">新增</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                       <!--  -->
                        <el-button   v-if="judgeMenu.indexOf('编辑') != -1" size="small" type="primary" @click="onEdit">编辑</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                          <!--   -->
                        <el-button  v-if="judgeMenu.indexOf('删除') != -1" size="small" type="primary" @click="del111">删除</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                        <!--  -->
                        <el-button   v-if="judgeMenu.indexOf('下载模板') != -1" size="small" type="primary" @click="downLoadTemplate">下载模板</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                        <!-- -->
                         <el-button   v-if="judgeMenu.indexOf('导入') != -1" size="small" type="primary" @click="onImport">导入</el-button>
                     </el-form-item>
            </Col>
            <el-form-item label="供应商全称：" size="small">
                <el-select v-model="formSearch.supplierId" placeholder="请选择" style="width:260px" filterable >
                    <el-option v-for="v in suppyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商简称：" size="small">
                <el-input v-model="formSearch.supplierShortName" placeholder="请输入" ></el-input>
            </el-form-item>
            <el-form-item label="生效期间：" size="small">
                    <el-date-picker
	                    v-model="formSearch.date"
	                    type="daterange"
	                    range-separator="~"
	                    start-placeholder="生效日期"
	                    end-placeholder="失效日期">
                    </el-date-picker>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection"   @row-click="showLog" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="tableHieght" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="supplierCode" label="供应商编号" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="supplierShortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商全称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="startTime" label="生效日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="endTime" label="失效日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="discount" label="折扣%" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="最后修改时间" min-width="120" align="center" show-overflow-tooltip>
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
     
      <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible"   :styles="mystyle"  :title="dialogtitle"  :width="560" @on-cancel='cancel1' class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData"  label-width="80px" class="demo-form-inline demo-ruleForm " label-position="left" :rules="rules">
                <!-- <Col> -->
                    <el-form-item label="供应商全称" size="small" label-width="95px" prop="supplierId">
                      <!--   <el-input  v-model="formData.supplierName" maxlength="20" style="width:120px"></el-input> -->
		                    <el-select :disabled="this.dialogtitle=='编辑'" v-model="formData.supplierId" placeholder="请选择" style="width:380px" filterable  @change="watchSupplierId2(formData.supplierId)">
		                    <el-option v-for="v in suppyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
		                </el-select>
                    </el-form-item>
                    <el-form-item label="供应商简称" size="small" label-width="95px" prop="supplierShortName">
                        <el-input disabled v-model="formData.supplierShortName" maxlength="20" style="width:120px"></el-input>
                    </el-form-item>
                     <el-form-item label="折扣%" size="small" label-width="70px" prop="discount">
                      <!--   <el-input type="number" v-model="formData.discount" :min="0" maxlength="20" style="width:110px"></el-input> -->
                        <el-input-number v-model="formData.discount" controls-position="right" @change="handleChange"    :max="100" style="width:180px"></el-input-number>
                    </el-form-item>
                    <Col>
                    <el-form-item label="生效日期" size="small" label-width="95px" prop="startTime">
                               <el-date-picker
                                v-model="formData.startTime"
                                type="date"
                                placeholder="选择日期" style="width:130px">
                                </el-date-picker>
                    </el-form-item>
                    <el-form-item label="失效日期" size="small" label-width="95px" prop="endTime">
                               <el-date-picker
                                    v-model="formData.endTime"
                                    type="date"
                                    placeholder="选择日期" style="width:145px">
                                </el-date-picker>
                    </el-form-item>
                    </Col>
                    <Col>
                   
                    <el-form-item label="备注" size="small" label-width="95px">
                        <el-input  type="textarea"  v-model="formData.remark" maxlength="1000" style="width:380px"></el-input>
                    </el-form-item>
                 </Col>
                <el-form-item style="padding-left:210px">
                    <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="primary" v-else  @click="submitFormEdit('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel1">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal> 
       <!-- 下载模板 -->
     <Modal v-model="downLoadVisible" :styles="mystyle" title="下载模板"  :width="410"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true"   class="demo-form-inline demo-ruleForm " :label-position="left" >
                <Col>
                    <p style="text-align:center">扣款折扣模板确认下载</p>    
                </Col>
                <el-form-item style="padding-left:115px">
                    <Button type="primary"  @click="confirmDownload">确认</Button>
                    <Button type="default" @click="cancelconfirmDownload">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
     <Modal v-model="cancelVisible" :styles="mystyle" title="操作确认"  :width="410"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true"   class="demo-form-inline demo-ruleForm " :label-position="left" >
                <Col>
                    <p style="text-align:center">确认要删除数据吗？</p>    
                </Col>
                <el-form-item style="padding-left:115px">
                    <Button type="primary"  @click="confirmDel">确认</Button>
                    <Button type="default" @click="cancelonfirmDel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <Modal v-model="importVisible" :styles="mystyle" title="导入"  :width="610" @on-cancel="cancelimportConfirm"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true"   class="demo-form-inline demo-ruleForm " :label-position="left" >
            	<Col>
                <el-form-item>
                   <el-upload
                        class="upload-demo"
                        :before-upload="getFile"
                        :on-change="getFile"
                        :auto-upload="false"
                        :show-file-list="false"
                         action="/eop-boot/masterData/deductionDiscount/uploadAsync">
                        <el-button size="small" type="default">点击上传</el-button><span v-if="this.uploadList.length==0" style="padding-left:10px" size="small" type="default">未选择任何文件</span>
                    </el-upload>
               </el-form-item>
               </Col>
               <Col v-if="uploadList.length>0">
               	 {{uploadList[0].name}}
               </Col>
                <el-form-item style="padding-left:215px">
                    <Button type="primary"  @click="importConfirm">确认</Button>
                    <Button type="default" @click="cancelimportConfirm">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>
<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
        	true:true,
            dialogVisible: false,
            downLoadVisible:false,
            downLoadVisible:false,
            cancelVisible:false,
            importVisible:false,
            logList:[],
            file:'',
            uploadList:[],
            formSearch   :{
            	      supplierId:'',
            	      date:''
            },
            formData     :{
                           endTime:'',
                           startTime:'',
                           supplierId:'',
                           supplierShortName:'',
                           discount:100,
                           remark  :'',
            },
            dialogtitle: '新增',
            suppyList:[],   //供应商列表
            page: 1,
            total:'',
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            IDS: [],
            list: [],
            judgeMenu:[],
            judgeMenu:[],
            buttonList:[],//按钮权限
            rules:  {
                    supplierId : [ { required: true, message: '请选择供应商',        trigger: 'change'}],
                    startTime    : [ { required: true, message: '请选择生效日期',      trigger: 'blur' } ],
                    endTime      : [ { required: true, message: '请选择失效日期',      trigger: 'blur' } ],
                    discount     : [ { required: true, message: '请输入折扣',          trigger: 'change' },
                                     {pattern:/^[1-9]\d*(\.\d+)?$/i,message:'折扣须大于0'}],
              },
        }
    },
    mounted() {
        this.getResponse()
        this.getData()
        this.getButtonJurisdiction()
    },
    watch:{
          'formData.endTime':{
               handler(n,o){
                      if(n&&this.formData.startTime){
                           if(new Date(n).getTime()<new Date(this.formData.startTime).getTime()){
                                this.$message.error('失效日期不能小于生效日期')
                                this.formData.endTime=''
                           }
                      }
               },
               // deep:true
          },
          'formData.startTime':{
               handler(n,o){
                      if(n&&this.formData.endTime){
                           if(new Date(n).getTime()>new Date(this.formData.endTime).getTime()){
                                this.$message.error('生效日期不能大于失效日期')
                                this.formData.startTime=''
                           }
                      }
               },
               // deep:true
          }
    },
    methods: {
       watchSupplierId(id){
       	  console.log(this.getName(id),'999999')
          this.formSearch.supplierShortName=this.getName(id)      	
       },
       watchSupplierId2(id){
       	  // console.log(this.getName(id),'999999')
          this.formData.supplierShortName=this.getName(id)      	
       },
       getName(id){
           for(let i=0,len=this.suppyList.length;i<len;i++){
             	if(this.suppyList[i].id==id){
             		 return this.suppyList[i].shortName
             	}
             }
       },
        getCode(id){
           for(let i=0,len=this.suppyList.length;i<len;i++){
             	if(this.suppyList[i].id==id){
             		 return this.suppyList[i].code
             	}
             }
       },
        getName2(id){
           for(let i=0,len=this.suppyList.length;i<len;i++){
             	if(this.suppyList[i].id==id){
             		 return this.suppyList[i].name
             	}
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
      confirmDel(){
                   let data={}
            	       data.id=this.IDS[0].id
                   this.request('masterData_deductionDiscount_delete', data, false).then((res) => {
                if (res.code == 1) {
                	 this.$message.success('删除成功')
                     this.getData()
                     this.cancelVisible=false;
                }else{
                	this.$message.error(res.msg)
                }
            })       
      },
      cancelonfirmDel(){
                   this.cancelVisible=false
      },
      del111(){
               this.setBuryPoint('删除')
            if (this.IDS.length == 1) {
            	  this.cancelVisible=true
            } else if (this.IDS.length == 0) {
                 this.$message.error('请先选择删除的数据！')
            } else if (this.IDS.length > 1) {
                 this.$message.error('一次只能删除一条数据！')
            }
      },
       onEdit() {
                this.setBuryPoint('编辑')
            if (this.IDS.length == 1) {
                this.dialogtitle = "编辑"
                this.dialogVisible = true
                this.formData = Object.assign({}, this.formData, this.IDS[0])
                this.formData.startTime=new Date(this.IDS[0].startTime)
                this.formData.endTime=new Date(this.IDS[0].endTime)
                this.formData.id = this.IDS[0].id
                console.log(this.formData,'9999999')
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据！')
            }
        },
        selection(selection) {
            this.IDS = selection
        },

        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            console.log(filters.getConstant('brand'), '000000000')
            let data = {}
            data.billNo = 'master_data_deduction_discount_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
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
            data.billNo = 'master_data_deduction_discount_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
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
        onAdd() {
            this.setBuryPoint('新增')
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
            this.page = 1;
            this.getData()
        },

        submitForm(formName) {
            this.setBuryPoint('新增确认')
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addBrand()
                } else {
                    return false;
                }
            });
        },
        submitFormEdit(formName) {
            this.setBuryPoint('编辑确认')
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                      this.editBrand()
                } else {
                     return false;
                }
            });
        },
        choiced(id) {
            console.log(id)
            for (let i = 0, len = this.companyList.length; i < len; i++) {
                if (this.companyList[i].id == id) {
                    this.addformdata.companyAddress = this.companyList[i].address
                    this.addformdata.companyPhone = this.companyList[i].companyPhone
                }
            }
        },
        getData() {
            this.logList = []
            let data = {}
	            data.currentPage= this.page
	            data.pageSize   = this.pageSize
	            data.supplierId = this.formSearch.supplierId
	            data.supplierShortName=this.formSearch.supplierShortName
	            data.startTime  = filters.get_year_month_day3(this.formSearch.date[0])
	            data.endTime    = filters.get_year_month_day4(this.formSearch.date[1])
            this.request('masterData_deductionDiscount_pageQuery', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.list = []
                    this.total = '0'
                }
            })
        },
        getResponse() {
            let data = {}
            this.request('masterData_supplier_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.suppyList = res.data
                }
            })
        },
        getDepartmentList() {
            let data = {}
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList = res.data
                }
            })
        },
        getCompany() {
            //masterData_company_selector
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        cancel1(){
        	 this.dialogVisible=false
             this.resetForm('ruleForm')
        },
        addBrand() {
            let data = {}
	            data.supplierId = this.formData.supplierId
	            data.supplierCode = this.getCode(this.formData.supplierId)
	            data.supplierName = this.getName2(this.formData.supplierId)
	            data.supplierShortName = this.formData.supplierShortName
	            data.startTime =filters.get_year_month_day3(this.formData.startTime)
	            data.endTime   = filters.get_year_month_day4(this.formData.endTime)
	            data.discount  = this.formData.discount
	            data.remark    = this.formData.remark
            this.request('masterData_deductionDiscount_add', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.cancel1()
                    this.getData()
                    this.getResponse()
                    this.formData.remark=''
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                     this.formData.remark=''
                }
            })
        },
        editBrand() {
            let data = {}
                data.id = this.formData.id
	            data.startTime = filters.get_year_month_day3(this.formData.startTime)
	            data.endTime   = filters.get_year_month_day(this.formData.endTime)
	            data.discount  = this.formData.discount
	            data.remark    = this.formData.remark
            this.request('masterData_deductionDiscount_update', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.cancel1()
                    this.getData()
                    this.cancel()
                    this.formData.remark=''

                } else {
                	this.formData.remark=''
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        downLoadTemplate(){
                  this.setBuryPoint('下载模板')
        	      this.downLoadVisible=true;
        },
        confirmDownload(){
              window.location = ('/excel/扣款折扣导入模板.xlsx')
              this.$message.success('下载模板成功')
               this.downLoadVisible=false
        },
        cancelconfirmDownload(){
                this.downLoadVisible=false
        },
        cancel() {
            this.resetEditForm()
            this.resetForm('ruleForm')
            this.dialogVisible = false;
        },
        onImport(){
            this.setBuryPoint('导入')
            this.importVisible=true
        },
        showLog(row) {
            this.getLoglist(row.id)
        },
        submitUpload(){
             this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        getFile(file){
        	       console.log(file)
        	      if (!/\.xls$|.xlsx$|.csv$/.test(file.name)) {
                    this.$Message.warning('文件类型不符,请重新选择文件');
                    return false
                }
        	    this.uploadList[0]=file
        	    this.file=file;
        	    this.$set(this.uploadList,0,file)
        	    console.log(this.file)
        },
        importConfirm(){
                    this.setBuryPoint('导入确认')
                    let data =new FormData()
                        data.append('file',this.file.raw)
                        this.request('masterData_deductionDiscount_uploadAsync',data,false).then(res=>{
                        if (res.code == 1) {
                        	this.importVisible=false;
                        	this.uploadList=[]
                            this.getKeyD(res.data)
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        })
        },
         getKeyD(key) {
            const h = this.$createElement;
            let data = {}
                data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                           
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : res.data.subTitle),
                                ]),
                                duration: 0,
                            });
                            this.cleanKey(key)
                            function myStopFunction() {
                                clearTimeout(this.timeBB);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKeyD(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                // window.location.href = r
                this.getData()
            }
        },
        cleanKey(key) {
            let data = {}
                data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
        },
        cancelimportConfirm(){
        	             this.importVisible=false
                         this.file=''
                         this.uploadList=[]
        },
        beforeRemove(file, fileList) {
            return this.$message.success(`成功移除文件`);
        }
       
    }
}
</script>

<style lang="less" scoped>
.headerstyle,
.main,

.footer {
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
}
.middle{
     width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 0px 10px 10px 10px;
    margin-bottom: 0px;
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
</style>

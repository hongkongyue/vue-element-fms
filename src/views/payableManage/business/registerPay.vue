<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <!-- v-if="judgeMenu.indexOf('查询') !== -1" -->
                    <!--  -->
                    <el-button  v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
              
                <!--  -->
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1"  size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button  v-if="judgeMenu.indexOf('编辑') !== -1"   size="small" type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <!---->
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1"  size="small" type="primary" @click="onDelete">删除</el-button>
                </el-form-item>
                 <el-form-item size="small">
                    <el-button  v-if="judgeMenu.indexOf('下载模板') !== -1"   size="small" type="primary" @click="downLoad">下载模板</el-button>
                </el-form-item>
                <!--  -->
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导入') !== -1"  size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <!--  -->
                <el-form-item size="small">
                    <el-button  v-if="judgeMenu.indexOf('导出') !== -1"  size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                  <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <!-- -->
               
            </div>
            <el-form-item label="公司：" size="small">
                    <el-select v-model="formSearch.companyId"  filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                    <el-select v-model="formSearch.supplierId" placeholder="请选择" style="width:150px" filterable >
                        <el-option v-for="v in suppyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
            </el-form-item>
             <el-form-item label="付款日期：" size="small">
                <el-date-picker
                    v-model="formSearch.paymentDate"
                    type="date"
                    placeholder="付款日期" style="width:150px">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="登记日期：" size="small">
                <el-date-picker
                    v-model="formSearch.created"
                    type="date"
                    placeholder="登记日期" style="width:150px">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>
    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="480" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="right" :rules="rules">
                <Col>
                        <el-form-item label="公司：" size="small" label-width="100px" prop="basicCompanyId">
                            <el-select v-model="formData.basicCompanyId"  filterable placeholder="请选择" style="width:250px">
                                <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                         </el-form-item>
                        <el-form-item label="供应商：" size="small" label-width="100px" prop="supplierId">
                                <el-select v-model="formData.supplierId" placeholder="请选择" style="width:250px" filterable >
                                    <el-option v-for="v in suppyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="付款日期：" size="small" label-width="100px"  prop="date">
                            <el-date-picker
                                v-model="formData.date"
                                type="date"
                                :format="yyyy-hh-mm"
                                placeholder="付款日期" style="width:250px">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="付款金额：" size="small" label-width="100px"  prop="money">
                              <el-input v-model="formData.money"  placeholder="请输入付款金额" type="number" style="width:250px" :precision="2"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" size="small" label-width="100px">
                            <el-input v-model="formData.remark"  maxlength="1000" type="textarea" style="width:250px"></el-input>
                        </el-form-item>
                </Col>
                <el-form-item style="padding-left:100px">
                    <Button type="primary" @click="submitFormEdit('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--导入选择文件-->
    <Modal v-model="visible" title="导入文件" @on-cancel='cancelImport'>
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/payable/paymentRegistration/import" :data="{}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelImport">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
var record
import filters from '../../../filter/'
import Util from 'libs/util'
import{ debounce } from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            newId:null,
            newBasicCompanyId: null, //公司ID
            newBasicCompanyCode: null, //公司CODE
            newBasicBrandId: null, //品牌ID
            processTypeId: null, //加工类型ID
            file: null,
            name: '',
            visible: false,
            typeList: [], //类型
            projectList: [], //项目
            dialogVisible: false,
            IDS: [],
            formData: {
                 basicCompanyId:'',
                 supplierId:'',
                 date:'',
                 money:'',
                 remark:''
            },
            editformdata: {},
            dialogtitle: '新增',
            total: 0,
            page: 1,
            pageSize: 1000,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formSearch:{
                    companyId:'',
                    created:'',
                    paymentDate:'',
                    supplierId:'',
            },
            companyList: [],
            suppyList:[],
            responseList: [], //负责人列表
            brandList: [], //品牌列表
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            rules: {
                basicCompanyId: [{
                    required: true,
                    message: '请选择公司',
                    trigger: 'change'
                }, ],
                supplierId: [{
                    required: true,
                    message: '请选择供应商',
                    trigger: 'change'
                }],
                money: [{
                    required: true,
                    message: '请输入付款金额',
                    trigger: 'change'
                }],
                date: [{
                    required: true,
                    message: '请选择付款日期',
                    trigger: 'change'
                }],
            },
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    computed: {
        // goodsList() {
        //     return this.$store.state.app.revisionList
        // }
    },
    // destroyed() {
    //     this.$store.commit('clearrevision')
    // },
    mounted() {
        this.getResponse()
        this.getCompany()
        this.getButtonJurisdiction() //按钮权限
        // this.getTypeList()
        // this.getProjectList()
        this.initTable([])
    },
    methods: {
          getResponse() {
            let data = {}
            this.request('masterData_supplier_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.suppyList = res.data
                }
            })
        },
        initTable(arr = [], page,total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'registerPay',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        selectColumn: true,
                    },
                    // multiSelect: false,
                    reorderColumns: true,
                    // reorderRows: true,  
                    columns: [
                      {
                            field: 'index',
                            caption: '序号',
                            size: '100px',
                            sortable: true,
                            info:true
                        },{
                            field: 'companyName',
                            caption: '公司',
                            size: '250px',
                            sortable: true
                        },
                        {
                            field: 'supplierName',
                            caption: '供应商',
                            size: '250px',
                            sortable: true
                        },
                        {
                            field: 'paymentDate',
                            caption: '付款日期',
                            size: '250px',
                            sortable: true
                        },
                        {
                            field: 'paymentAmount',
                            caption: '付款金额',
                            size: '250px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
                            size: '200px',
                            sortable: true
                        },
                         {
                            field: 'created',
                            caption: '登记日期',
                            size: '200px',
                            sortable: true
                        },
                        {
                            field: 'createUser',
                            caption: '创建人',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event, obj) {
                    }
                })
                if (arr.length > 0) {
                    w2ui.registerPay.clear();//清空
                    w2ui.registerPay.records = arr
                    w2ui.registerPay.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    paymentAmount: page.paymentAmount,
                   
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    paymentAmount: total.paymentAmount,
                  
                })
                    $('#main').w2render('registerPay');
                    w2ui.registerPay.refresh();

                } else {
                    $(document).ready(function(){
                        w2ui.registerPay.clear();//清空
                        w2ui['registerPay'].records = []
                        w2ui.registerPay.refresh();
                        $('#main').w2render('registerPay')
                    })
                   
                }
            });
        },
        //导入
        onImport() {
            this.setBuryPoint('导入')
            this.visible = true
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.$refs['upload'].post(this.file);
                let data = new FormData
                data.append('file', this.file)
                this.request('payable_paymentRegistration_import', data, true).then((res) => {
                    if (res.code == 1) {
                        this.getKeyD(res.data)
                          this.file = null;
                    }
                })
                this.visible = false
            }
        },
        //上传之前
        handleUpload(file) {
            if (!/\.xls$|.xlsx$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file //需要传给后台的file文件
                this.name = file.name
            }
            return false
        },
        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                this.loadingStatus = false;
                this.file = null;
                this.getKey(res.data)
            } else {
                this.loadingStatus = false;
                this.$message.error({
                    content: res.msg,
                    duration: 3
                });
            }
        },
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        cancelImport() {
            this.file = null
            this.visible = false
        },
        //下载模板
        downLoad() {
            this.setBuryPoint('下载模板')
            window.location.href = 'https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/PayablePaymentRegistrationController/import/%E4%BB%98%E6%AC%BE%E7%99%BB%E8%AE%B0%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
        },
        //异步导出
        onExport() {
            this.setBuryPoint('导出')
           let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            this.formSearch.paymentDate? data.paymentDate =Util.dateFormat(this.formSearch.paymentDate, 'yyyy-MM-dd'):delete data.paymentDate  //年份
            this.formSearch.companyId?  data.companyId = this.formSearch.companyId    :delete data.companyId  //品牌主键id(老)
            this.formSearch.supplierId?data.supplierId = this.formSearch.supplierId:delete data.supplierId //款号/货品编码(老)
            this.formSearch.created? data.created =Util.dateFormat(this.formSearch.created, 'yyyy-MM-dd'):delete data.created  //年份
            this.request('payable_paymentRegistration_export', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        //循环key
        getKey(key) {
            const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
                                duration: 0,
                            });
                            this.cleanKey(key)

                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }

                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        getKeyD(key) {
            let data = {}
            data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 0,
                            });
                            this.cleanKey(key)

                            function myStopVFunction() {
                                clearTimeout(this.timeBB);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 3000
                            });
                            this.getKeyD(key)
                        }
                    } else {
                        this.message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            console.log(url)
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
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
        onDelete() {
            this.setBuryPoint('删除')
            let arr = w2ui.registerPay.getSelection()
            if (arr.length > 0) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAll(arr)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message.error("请先选择删除的数据！");
            }
        },
        delAll(ids) {
            this.request('payable_paymentRegistration_delete', {
                idList: ids,
                id:0,
            }, false).then(res => {
                if (res.code == 1) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData()
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
        onAdd(){
            this.setBuryPoint('新增')
                for(let i in this.formData){
                  this.formData[i]=''
                 }
                this.resetForm('ruleForm')
                this.dialogtitle = "新增"
                this.dialogVisible = true
        },
        getSupplyName(id){
               for(let i=0,len=this.suppyList.length;i<len;i++){
                   if(this.suppyList[i].id==id){
                       return this.suppyList[i].name
                   }
               }
        },
        getCompanyName(id){
               for(let i=0,len=this.companyList.length;i<len;i++){
                   if(this.companyList[i].id==id){
                       return this.companyList[i].name
                   }
               }
        },
        addSubmit(){
                   const {basicCompanyId,supplierId,date,money,remark}=this.formData
                   let  data={}
                        data.companyId=basicCompanyId
                        data.companyName=this.getCompanyName(basicCompanyId)
                        data.supplierId=supplierId
                        data.supplierName=this.getSupplyName(supplierId)
                        data.paymentDate=Util.dateFormat(date, 'yyyy-MM-dd') 
                        data.paymentAmount=money
                        data.remark=remark
                    this.request('payable_paymentRegistration_add', data, true).then((res) => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.getData()
                        this.dialogVisible = false
                    } else {
                         this.$message.error(res.msg)
                    }
                })
                      
        },
        onEdit() {
            this.setBuryPoint('编辑')
            let arr = w2ui.registerPay.getSelection()
            let obj = {}
            console.log(arr, '0987689', w2ui['registerPay'].records, arr[0])
            if (arr.length > 1) {
                this.$message.error('一次只能编辑一条数据')
            } else if (arr.length == 0) {
                this.$message.error('请先选择数据再编辑')
            } else {
                w2ui['registerPay'].records.map(function (item) {
                    if (arr[0] == item.id) {
                        obj = item
                    }
                })
                console.log(obj.paymentAmount,'99999999999')
                this.dialogtitle   = "编辑"
                this.dialogVisible = true
                this.formData.id   = obj.id
                this.formData.basicCompanyId = obj.companyId //年份
                this.formData.supplierId = obj.supplierId //公司(老)
                this.formData.date=new Date(obj.paymentDate)
                this.formData.money = obj.paymentAmount.replace(/,/g, "")
                this.formData.remark =obj.remark
            }
        
        },
         editSubmit(){
                    const {id,basicCompanyId,supplierId,date,money,remark}=this.formData
                   let  data={}
                        data.id=id;
                        data.companyId=basicCompanyId
                        data.companyName=this.getCompanyName(basicCompanyId)
                        data.supplierId=supplierId
                        data.supplierName=this.getSupplyName(supplierId)
                        data.paymentDate=Util.dateFormat(date, 'yyyy-MM-dd') 
                        data.paymentAmount=money
                        data.remark=remark
                    this.request('payable_paymentRegistration_update', data, true).then((res) => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.getData()
                        this.dialogVisible = false
                    } else {
                         this.$message.error(res.msg)
                    }
                })
        },
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        resetEditForm() {
            this.addformdata = {
                                companyAddress: null,
                                companyPhone: null,
                                brandNumber: null,
                                brandName: null,
                                includesReponsor: null,
                                brandsuo: null,
                                diaopai: null,
                                type: null,
                                goodsStore: null,
                                costRate: null,
                                tailMoney: null,
                                companyName: null,
                                companyAddress: null,
                                companyPhone: null,
                                includesMoney: null,
                   }
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formSearch = {}
            this.page = 1;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitFormEdit(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //   this.editBrand()
                      if(this.dialogtitle=='新增'){
                           this.addSubmit()
                      }else{
                           this.editSubmit()
                      }
                } else {
                     return false;
                }
            });
        },
        getData() {
           let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            this.formSearch.paymentDate? data.paymentDate =Util.dateFormat(this.formSearch.paymentDate, 'yyyy-MM-dd'):delete data.paymentDate  //年份
            this.formSearch.companyId?  data.companyId = this.formSearch.companyId    :delete data.companyId  //品牌主键id(老)
             this.formSearch.supplierId?data.supplierId = this.formSearch.supplierId:delete data.supplierId //款号/货品编码(老)
              this.formSearch.created? data.created =Util.dateFormat(this.formSearch.created, 'yyyy-MM-dd'):delete data.created  //年份
            this.request('payable_paymentRegistration_pageQuery', data, true).then((res) => {
                if (res.code == "1") {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records,res.data.currentPageSum,res.data.totalPageSum)
                    } else {
                        this.initTable([])
                    }
                    //  this.list       = res.data.records
                    //  this.total      = res.data.count
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
        cancel() {

            this.dialogVisible = false;
            this.resetForm('ruleForm')
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

<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                     <el-form-item size="small" class="marginT0">
                       <!--  v-if="judgeMenu.indexOf('查询') != -1" -->
                        <el-button  size="small" type="primary" @click="onSearch">查询</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                            <el-button size="small" type="default" @click="onReset">重置</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                            <!--  v-if="judgeMenu.indexOf('新增') != -1" -->
                            <el-button  size="small" type="primary" @click="onAdd">新增</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                       <!--  v-if="judgeMenu.indexOf('修改') != -1" -->
                        <el-button  size="small" type="primary" @click="onEdit">编辑</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                          <!--  v-if="judgeMenu.indexOf('删除') != -1" -->
                        <el-button  size="small" type="primary" @click="onDel">删除</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                        <!--  v-if="judgeMenu.indexOf('下载模板') != -1" -->
                        <el-button  size="small" type="primary" @click="downLoadTemplate">下载模板</el-button>
                     </el-form-item>
                     <el-form-item size="small" class="marginT0">
                        <!-- v-if="judgeMenu.indexOf('导入') != -1" -->
                         <el-button  size="small" type="primary" @click="onImport">导入</el-button>
                     </el-form-item>
            </Col>
            <el-form-item label="供应商全称：" size="small">
                <el-select v-model="formSearch.b" placeholder="请选择" style="width:150px" filterable>
                    <el-option v-for="v in departmentList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商简称：" size="small">
                <el-input v-model="formSearch.a" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="生效期间：" size="small">
               <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="生效日期"
                    end-placeholder="失效日期">
                    </el-date-picker>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="code" label="供应商编号" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="name" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="parentName" label="供应商全称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="leader" label="生效日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="leader" label="生效日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="leader" label="折扣%" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="companyName" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="companyName" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="最后修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>

    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible"   :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="860" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="供应商全称" size="small" label-width="110px" prop="supplierName">
                        <el-input disabled v-model="formData.supplierName" maxlength="20" style="width:120px"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商简称" size="small" label-width="110px" prop="supplierShortName">
                        <el-input disabled v-model="formData.supplierShortName" maxlength="20" style="width:120px"></el-input>
                    </el-form-item>
                    <el-form-item label="生效日期" size="small" label-width="110px" prop="startTime">
                               <el-date-picker
                                v-model="formData.startTime"
                                type="date"
                                placeholder="选择日期" style="width:130px">
                                </el-date-picker>
                    </el-form-item>
                    </Col>
                    <Col>
                    <el-form-item label="失效日期" size="small" label-width="110px" prop="endTime">
                               <el-date-picker
                                    v-model="formData.endTime"
                                    type="date"
                                    placeholder="选择日期" style="width:129px">
                                </el-date-picker>
                    </el-form-item>
                    <el-form-item label="折扣%" size="small" label-width="110px" prop="discount">
                        <el-input type="number" v-model="formData.discount" : maxlength="20" style="width:110px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" size="small" label-width="110px">
                        <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="formData.remark" maxlength="1000" style="width:130px"></el-input>
                    </el-form-item>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="primary" v-else  @click="submitFormEdit('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 下载模板 -->
     <Modal v-model="downLoadVisible" :styles="mystyle" title="下载模板"  :width="810"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <p style="text-align:center">扣款折扣模板确认下载</p>    
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary"  @click="submitFormEdit('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <Modal v-model="downLoadVisible" :styles="mystyle" title="下载模板"  :width="810"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
               <el-form-item>
                   <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>

                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
               </el-form-item>
                <el-form-item style="padding-left:330px">
                    <Button type="primary"  @click="submitFormEdit('ruleForm')">确认</Button>
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
            dialogVisible: false,
            downLoadVisible:false,
            formSearch   :{},
            formData      :{
                           endTime:'',
                           startTime:'',
                           supplierName:'',
                           supplierShortName:'',
                           discount:'',
                           remark  :'',
            },
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            IDS: [],
            list: [],
            judgeMenu:[],
            buttonList:[],//按钮权限
            rules:  {
                    supplierName : [ { required: true, message: '请选择供应商',        trigger: 'change'}],
                    startTime    : [ { required: true, message: '请选择生效日期',      trigger: 'blur' } ],
                    endTime      : [ { required: true, message: '请选择失效日期',      trigger: 'blur' } ],
                    discount     : [ { required: true, message: '请输入折扣',          trigger: 'blur' } ],
              },
        }
    },
    mounted() {
        this.getData()
        // this.getDepartmentList()
        // this.getResponse()
        // this.getCompany()
        this.getButtonJurisdiction()//按钮权限
    },
    watch:{
          // 'formData.endTime':{
          //      handler(n,o){
          //               console.log(new Date(this.formData.startTime).getTime(),'00001234')

          //             if(n&&this.formData.startTime){
          //                  if(new Date(n).getTime()<new Date(this.formData.startTime).getTime()){
          //                       this.$message.error('失效日期不能小于生效日期')
          //                       this.formData.endTime=''
          //                  }
          //             }
          //      },
          //      // deep:true
          // },
          // 'formData.startTime':{
          //      handler(n,o){
          //             if(n&&this.formData.endTime){
          //                  if(new Date(n).getTime()>new Date(this.formData.endTime).getTime()){
          //                       this.$message.error('生效日期不能大于失效日期')
          //                       this.formData.startTime=''
          //                  }
          //             }
          //      },
          //      // deep:true
          // }
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
       onEdit() {
            if (this.IDS.length == 1) {
                this.dialogtitle = "编辑"
                this.dialogVisible = true
                this.formData = Object.assign({}, this.formData, this.IDS[0])
                this.formData.brandNumber = this.IDS[0].code
                this.formData.brandName = this.IDS[0].name
                this.formData.brandsuo = this.IDS[0].parentName
                this.formData.diaopai = this.IDS[0].companyName
                this.formData.response = this.IDS[0].leader
                this.formData.goodsStore = (this.IDS[0].enable).toString()
                this.formData.id = this.IDS[0].id
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
            data.billNo = filters.getConstant('department') + this.billNo
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
            data.billNo = filters.getConstant('brand') + this.billNo
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
            this.dialogtitle = "新增"
            this.dialogVisible = true
        },
        onSearch() {
            this.page = 1;
            this.getData()
            
        },
        onReset() {
            this.formData = {}
            this.page = 1;
            this.getData()
        },

        submitForm(formName) {
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
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.companyName = this.formData.company
            data.leader = this.formData.response
            data.name = this.formData.department
            this.request('masterData_department_page', data, true).then((res) => {
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
            this.request('masterData_staff_singleSelector', data, true).then((res) => {
                if (res.code == 1) {
                    this.responseList = res.data
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
        addBrand() {
            let data = {}
            data.code = this.addformdata.brandNumber
            data.name = this.addformdata.brandName
            data.leader = this.addformdata.includesReponsor
            data.shortName = this.addformdata.brandsuo
            data.dropName = this.addformdata.diaopai
            data.status = 0
            data.type = Number(this.addformdata.type)
            data.enable = 1
            data.warehouseName = this.addformdata.goodsStore
            data.costMultiplying = this.addformdata.costRate
            data.soPriceTail = this.addformdata.tailMoney
            data.companyName = filters.getName(this.companyList, this.addformdata.companyName)
            data.companyCode = filters.getCompanyCode(this.companyList, this.addformdata.companyName)
            data.companyAddress = this.addformdata.companyAddress
            data.companyPhone = this.addformdata.companyPhone
            data.containsTrialFee = Number(this.addformdata.includesMoney)
            this.request('masterData_brand_add', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.cancel()
                    this.getData()
                    this.getBrandList()
                    this.getResponse()
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        editBrand() {
            let data = {}
            data.enable = this.addformdata.goodsStore
            data.id = this.addformdata.id
            this.request('masterData_department_enable', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.getData()

                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        downLoadTemplate(){
              　 window.location = ('/excel/扣款折扣导入模板.xlsx')
                 this.$message.success('下载模板成功')
        },
        cancel() {
            //  this.addformdata={}
            this.resetEditForm()
            this.resetForm('ruleForm')
            this.dialogVisible = false;
        },
        showLog(row) {
            this.getLoglist(row.id)
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
</style>

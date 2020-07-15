<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            </div>
            <el-form-item label="部门名称" size="small">
                <el-select v-model="formData.department" placeholder="部门名称" style="width:220px" filterable>
                    <el-option v-for="v in departmentList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="负责人" size="small">
                <el-select v-model="formData.response" placeholder="负责人" style="width:220px" filterable>
                    <el-option v-for="v in responseList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属公司" size="small">
                <el-select v-model="formData.company" placeholder="所属公司" style="width:220px" filterable>
                    <el-option v-for="v in companyList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            
            <!-- <el-form-item   size="small">
                              <el-button  size="small" type="primary" @click="onAdd">新增</el-button>
                          </el-form-item> -->
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="tableHieght" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="code" label="部门编码" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="name" label="部门名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="parentName" label="上级部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="leader" label="负责人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="companyName" label="所属公司" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.enable==1?'启用':'禁用' }}</template>
            </el-table-column>
        </el-table>
         <section class="footer" style="margin-bottom:0px;margin-top:10px">
        <!-- <span class="pl20"><i class="el-icon-arrow-up pointer "></i></span> -->
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <section class="log">
        <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">
            <el-table-column prop="operator" label="操作员" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                <template slot-scope="scope">{{scope.row.operateTime}}</template>
            </el-table-column>
            <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
    </section>
    </section>
   
    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="810" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="部门编码" size="small" label-width="110px">
                    <el-input disabled v-model="addformdata.brandNumber" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" size="small" label-width="110px">
                    <el-input disabled v-model="addformdata.brandName" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="上级部门" size="small" label-width="110px">
                    <el-input disabled v-model="addformdata.brandsuo" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="负责人" size="small" label-width="110px">
                    <el-input disabled v-model="addformdata.response" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="所属公司" size="small" label-width="110px">
                    <el-input disabled v-model="addformdata.diaopai" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="状态" size="small" label-width="110px">
                    <el-select v-model="addformdata.goodsStore" placeholder="请选择" style="width:120px">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="primary" v-if="dialogtitle=='编辑'" @click="submitFormEdit('ruleForm')">确认</Button>
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
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            dialogVisible: false,
            addformdata: {
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
                response: null
            },
            editformdata: {},
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {
                code: '',
                brandId: '',
                name: '',
            },
            IDS: [],
            companyList: [],
            responseList: [], //负责人列表
            departmentList: [], //品牌列表
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            judgeMenu:[],
        buttonList:[],//按钮权限
        }
    },
    mounted() {
        this.getData()
        this.getDepartmentList()
        this.getResponse()
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
        onEdit() {
                this.setBuryPoint('编辑')
            if (this.IDS.length == 1) {
                this.dialogtitle = "编辑"
                this.dialogVisible = true
                this.addformdata = Object.assign({}, this.addformdata, this.IDS[0])
                this.addformdata.brandNumber = this.IDS[0].code
                this.addformdata.brandName = this.IDS[0].name
                this.addformdata.brandsuo = this.IDS[0].parentName
                this.addformdata.diaopai = this.IDS[0].companyName
                this.addBrand.response = this.IDS[0].leader
                this.addformdata.goodsStore = (this.IDS[0].enable).toString()
                this.addformdata.id = this.IDS[0].id
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据！')
            }
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
                response: null
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
            this.setBuryPoint('查询')
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
        cancel() {
            //  this.addformdata={}
            this.resetEditForm()
            this.resetForm('ruleForm')
            this.dialogVisible = false;
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
.middle{
     width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 0px 10px 10px 10px;
    margin-top: 0px;
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

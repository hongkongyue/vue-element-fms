<template>
    <div>
        <header class="headerstyle">
            <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                <div>
                    <el-form-item size="small">
                        <el-button size="small" type="primary" @click="onSearch" v-if="judgeMenu.indexOf('查询') !== -1" >查询</el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button size="small" type="default" @click="onReset">重置</el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button size="small" type="primary" @click="onAdd"  v-if="judgeMenu.indexOf('新增') !== -1">新增</el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button size="small" type="primary" @click="clickTable"  v-if="judgeMenu.indexOf('编辑') !== -1">编辑</el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button size="small" type="primary" @click="exportCsv"  v-if="judgeMenu.indexOf('导出') !== -1">导出</el-button>
                    </el-form-item>
                </div>
                <el-form-item label="姓名：" size="small">
                    <el-input v-model="formSearch.fullName"></el-input>
                </el-form-item>
                <el-form-item label="工号：" size="small">
                    <el-input v-model="formSearch.staffCode"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" size="small">
                    <el-input v-model="formSearch.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" size="small">
                    <el-input v-model="formSearch.email"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称：" size="small">
                    <el-select v-model="formSearch.positionId" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in positionOptions" :key="item.name" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属供应商：" size="small">
                    <el-select v-model="formSearch.supplierId" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in supplierOptions" :key="item.name" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" size="small">
                    <el-select v-model="formSearch.enable" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in statusQptions" :key="item.name" :label="item.name"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </header>
        <section class="middle" :style="{minHeight:showBink?'640px':'430px'}">
            <el-pagination style="margin-bottom:10px;text-align:right"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage4"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
            <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border
                      tooltip-effect="dark" max-height="250" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="staffCode" label="工号" min-width="120" align="center" show-overflow-tooltip/>
                <el-table-column prop="fullName" label="姓名" min-width="120" align="center" show-overflow-tooltip/>
                <el-table-column prop="supplierName" label="所属供应商" min-width="120" align="center"  show-overflow-tooltip/>
                <el-table-column prop="positionNameList" label="岗位" min-width="120" align="center" show-overflow-tooltip/>
                <el-table-column prop="telephone" label="手机号码" min-width="120" align="center"/>
                <el-table-column prop="email" label="绑定邮箱" min-width="120" align="center"/>
                <el-table-column prop="enableStr" label="状态" min-width="120" align="center"/>

            </el-table>

            <section class="footer" style="margin-bottom:0px">
            <div style="width:100%;font-size:20px;">操作日志</div>
        </section>
        <!-- <section class="middle"> -->
            <el-table
                    :data="logList"
                    style="width: 100%"
                    border
                    tooltip-effect="dark"
                    max-height="250"
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
        <!-- </section> -->
        </section>
        

        <!-- 新增弹框 -->
        <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增" :width="70"
               class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-staff="left">

                    <Col span="12">
                        <el-form-item label="工号：" prop="staffCode" label-width="120px" size="small">
                            <el-input v-model="ruleForm.staffCode" :disabled="true" style="width:200px" ></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="姓名：" prop="fullName" label-width="120px" size="small">
                            <el-input v-model="ruleForm.fullName" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="岗位："  prop="positionIds" label-width="120px" size="small">
                            <el-select v-model="ruleForm.positionIds" multiple filterable placeholder="请选择" style="width:200px">
                                <el-option v-for="item in positionOptions" :key="item.name" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="手机号：" prop="telephone" label-width="120px" size="small">
                            <el-input v-model="ruleForm.telephone" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="邮箱：" prop="email" label-width="120px" size="small">
                            <el-input v-model="ruleForm.email" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="所属供应商：" prop="supplierId" label-width="120px" size="small" >
                            <el-select v-model="ruleForm.supplierId"  filterable  placeholder="请选择" style="width:200px">
                                <el-option v-for="item in supplierOptions" v-show="item.shortName" :key="item.shortName" :label="item.shortName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>

                    <Col span="12">
                        <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                            <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:200px">
                                <el-option label="启用" value=1></el-option>
                                <el-option label="禁用" value=0></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>

                    <Col span="24">
                        <el-form-item style="text-align:center">
                            <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                            <Button type="default" @click="addCancel">取消</Button>
                        </el-form-item>
                    </Col>

                </el-form>

            </Row>
            <div slot="footer"></div>
        </Modal>


        <!-- 编辑弹框 -->
        <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="修改" :width="70"
               class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form ref="formChange" :model="formChange" class="demo-ruleForm " :label-staff="left">

                    <Col span="12">
                        <el-form-item label="工号：" prop="staffCode" label-width="120px" size="small">
                            <el-input v-model="formChange.staffCode" :disabled="true" style="width:200px" ></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="姓名：" prop="fullName" label-width="120px" size="small">
                            <el-input v-model="formChange.fullName" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="岗位："  prop="positionIds" label-width="120px" size="small">
                            <el-select v-model="formChange.positionIds" multiple filterable placeholder="请选择" style="width:200px">
                                <el-option v-for="item in positionOptions" :key="item.name" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="手机号：" prop="telephone" label-width="120px" size="small">
                            <el-input v-model="formChange.telephone" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="邮箱：" prop="email" label-width="120px" size="small">
                            <el-input v-model="formChange.email" style="width:200px"></el-input>
                        </el-form-item>
                    </Col>
                    <Col span="12">
                        <el-form-item label="所属供应商：" prop="supplierId" label-width="120px" size="small">
                            <el-select v-model="formChange.supplierId" :value-key="id" filterable placeholder="请选择" style="width:200px">
                                <el-option v-for="item in supplierOptions" v-show="item.shortName" :key="item.shortName" :label="item.shortName"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>

                    <Col span="12">
                        <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                            <el-select v-model="formChange.enable" filterable placeholder="请选择" style="width:200px">
                                <el-option label="启用" value='1'></el-option>
                                <el-option label="禁用" value='0'></el-option>
                            </el-select>
                        </el-form-item>
                    </Col>

                    <Col span="24">
                        <el-form-item style="text-align:center">
                            <Button type="primary" @click="changeSave">确认</Button>
                            <Button type="default" @click="changeCancel">取消</Button>
                        </el-form-item>
                    </Col>

                </el-form>

            </Row>
            <div slot="footer"></div>
        </Modal>

    </div>
</template>


<script>
    import Util from 'libs/util'
    import downLoad from '../../../filter/downLoad'
import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce],
        data() {
            return {
                logList: [],//日志
                billNo: '',
                dialogVisible: false,//新增
                changeVisible: false,//编辑
                statusQptions: [
                    {value: 1, name: '启用'},
                    {value: 0, name: '禁用'}
                ],
                positionOptions: [],
                supplierOptions: [],
                formSearch: {
                    staffCode: '',
                    fullName: '',
                    positionId: '',
                    supplierId: '',
                    telephone: '',
                    email: '',
                    enable: '',
                },
                formChange: {
                    id:'',
                    staffCode: '',
                    fullName: '',
                    positionIds: [],
                    supplierId: '',
                    telephone: '',
                    email: '',
                    enable: '',
                },
                ruleForm: {
                    staffCode: '',
                    fullName: '',
                    positionIds: [],
                    supplierId: '',
                    telephone: '',
                    email: '',
                    enable: '',
                },
                rules: {
                    fullName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在10个字符以内', trigger: 'blur'}
                    ],
                    positionIds: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    supplierId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    telephone: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    enable: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                },
                total: 0,
                pagesize: 10,
                currentPage: 1,
                tableData: [],
                rowLenght: 0,//选择几条数据
                rowObj: {},//选择的数据对象
                judgeMenu: [],
                buttonList: [],//按钮权限
            }
        },
        mounted() {
            this.getButtonJurisdiction()//按钮权限
            this.getData()
            //岗位下拉
            this.getSupplierPositionSelector()
            //供应商下拉
            this.getSupplierSelector()
        },
        methods: {
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
            getSupplierPositionSelector() {
                let data = {}
                this.request('basic_supplier_position_selector', data, true).then(res => {
                    if (res.code == 1) {
                        this.positionOptions = res.data;
                    }
                })
            },
            getSupplierSelector() {
                let data = {}
                this.request('supplier_selector', data, true).then(res => {
                    if (res.code == 1) {
                        this.supplierOptions = res.data;
                    }
                })
            },
            getData() {
                this.logList = []
                let data = {}
                data.staffCode = this.formSearch.staffCode
                data.fullName = this.formSearch.fullName
                data.positionId = this.formSearch.positionId
                data.supplierId = this.formSearch.supplierId
                data.telephone = this.formSearch.telephone
                data.email = this.formSearch.email
                data.enable = this.formSearch.enable
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                this.request('basic_supplier_staff_page_query', data, true).then(res => {
                    if (res.code == 1) {
                        this.total = res.data.count;
                        this.tableData = res.data.records;
                    }
                })
            },
            exportCsv() {
                let data = Util.deepClone(this.formSearch);
                downLoad.downLoad(data,'/eop-boot/basicsupplierstaff/basic-supplier-staff/export')
            },
            handleSelectionChange(row) {
                console.log(row)
                this.rowLenght = row.length
                this.rowObj = row[0]
                console.log(this.rowObj)
            },
            onReset() {
                this.formSearch = {}
            },
            onSearch() {
                this.currentPage = 1
                this.getData()

            },

            //============新增相关
            onAdd() {
                this.autoCreateBizCode();
                this.dialogVisible = true
            },
            addSave() {
                this.$refs['ruleForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) { //新增保存
                        let data = {}
                        data.staffCode = this.ruleForm.staffCode
                        data.fullName = this.ruleForm.fullName
                        data.positionIds = this.ruleForm.positionIds
                        data.telephone = this.ruleForm.telephone
                        data.email = this.ruleForm.email
                        data.supplierId = this.ruleForm.supplierId
                        data.enable = this.ruleForm.enable
                        this.request('basic_supplier_staff_add', data, true).then(res => {
                            if (res.code == 1) {
                                this.$message.success('新增成功')
                                this.getData()
                                this.dialogVisible = false
                                this.ruleForm = {
                                    staffCode: '',
                                    fullName: '',
                                    positionIds: [],
                                    supplierId: '',
                                    telephone: '',
                                    email: '',
                                    enable: ''}
                                this.$refs['ruleForm'].resetFields();
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    } else { //验证表单
                        return false;
                    }
                });
            },
            addCancel() {
                this.dialogVisible = false
                this.ruleForm = {
                    staffCode: '',
                    fullName: '',
                    positionIds: [],
                    supplierId: '',
                    telephone: '',
                    email: '',
                    enable: ''}
                this.$refs['ruleForm'].resetFields();
            },



            //==========编辑相关
            clickTable(row) {
                if (this.rowLenght == 0) {
                    this.$message.error('请先选择修改的数据！')
                } else if (this.rowLenght > 1) {
                    this.$message.error('一次只能修改一条数据！')
                } else {
                    this.changeVisible = true
                    this.formChange.staffCode = this.rowObj.staffCode
                    this.formChange.fullName = this.rowObj.fullName
                    this.formChange.positionIds = this.rowObj.positionIdArr
                    this.formChange.supplierId = this.rowObj.supplierId
                    this.formChange.telephone = this.rowObj.telephone
                    this.formChange.email = this.rowObj.email
                    this.formChange.enable = this.rowObj.enable.toString()
                    this.formChange.id = this.rowObj.id
                }
            },
            //编辑保存
            changeSave() {
                let data = Util.deepClone(this.formChange);
                data.enable = Number(data.enable);
                this.request('basic_supplier_staff_update', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('修改成功')
                        this.getData()
                        this.changeVisible = false

                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //编辑取消
            changeCancel() {
                this.changeVisible = false
            },


            //=========分页页码操作
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getData()
            },

            //========自动生成人员工号
            autoCreateBizCode() {
                let data = {}
                data.prefix = "FMS-STAFF-"
                data.numLength = 5
                this.request('auto_create_biz_code', data, true).then(res => {
                    if (res.code == 1) {
                        this.ruleForm.staffCode = res.data;
                    }
                })
            },

            //==========日志相关 start
            getLoglist(billNo) {
                this.billNo = billNo
                this.currentPage = 1
                let data = {}
                data.billNo = "master_data_supplier_staff" + this.billNo
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
                data.billNo = "master_data_supplier_staff" + this.billNo
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
            showLog(row) {
                this.getLoglist(row.id)
            },
            //==========日志相关 end
        },
    }
</script>
<style scoped="scoped" lang="less">
    .headerstyle, .main, .middle, .footer {
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
</style>
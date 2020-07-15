<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="clickTable">编辑</el-button>
            </el-form-item>
            </div>
            <el-form-item label="库存动态：" size="small">
                <el-select v-model="formSearch.kcdt" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in kcdtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据类型：" size="small">
                <el-select v-model="formSearch.documentType" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in documentTypeList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型：" size="small">
                <el-input style="width:140px" v-model="formSearch.businessType" placeholder="请输入"></el-input>
            </el-form-item>
             <el-form-item label="类型状态：" size="small">
                <el-select v-model="formSearch.lxzt" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in lxztList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}" style="padding-top:10px">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border tooltip-effect="dark" :maxHeight="tableHieght" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="status" label="库存动态" min-width="120" align="center">
                <template slot-scope="scope">{{scope.row.status == 0 ? '出库' : '入库'}}</template>
            </el-table-column>
            <el-table-column prop="bizType" label="单据类型" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="name" label="业务类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="outerBusinessType" label="OMS/WMS业务类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="类型状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.enable == 0 ? '停用' : '启用'}}</template>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
                 <section class="footer" style="margin-bottom:0px;margin-top:0px">
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

    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增" :width="900" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" label-width="120px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="24" style="display: flex">
                <el-form-item label="库存动态：" prop="code" size="small">
                    <el-select v-model="ruleForm.code" placeholder="请选择" style="width:150px">
                        <el-option v-for="item in stockList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单据类型：" prop="name" size="small">
                    <el-select v-model="ruleForm.name" value-key="id" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in documentTypeList" :key="item.name" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="130px" label="业务类型：" prop="subjectName" size="small">
                    <el-input v-model="ruleForm.subjectName" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label-width="180px" label="OMS/WMS业务类型：" size="small">
                    <el-input v-model="ruleForm.address" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="类型状态："  size="small">
                    <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in enableList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item label="备注：" size="small">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="ruleForm.telephone"></el-input>
                </el-form-item>
                </Col>
            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                <Button type="default" @click="addCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 编辑弹框 -->
    <Modal v-model="changeVisible" :styles="mystyle" title="编辑" @on-cancel='changeCancel' :width="900" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form ref="formChange" :model="formChange" label-width="120px" class="demo-ruleForm " :label-position="right">
                <Col span="24" style="display: flex">
                <el-form-item label="库存动态：" prop="code" size="small">
                    <el-select v-model="formChange.code" disabled filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in stockList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单据类型：" prop="name" size="small">
                    <el-select v-model="formChange.name" value-key="id" disabled filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in documentTypeList" :key="item.name" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="130px" label="业务类型：" prop="subjectName" size="small">
                    <el-input v-model="formChange.subjectName" disabled style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label-width="180px" label="OMS/WMS业务类型：" size="small">
                    <el-input v-model="formChange.address" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="类型状态：" prop="enable" size="small">
                    <el-select v-model="formChange.enable" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in enableList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item label="备注：" prop="telephone" size="small">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="formChange.telephone"></el-input>
                </el-form-item>
                </Col>
            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="changeSave">确认</Button>
                <Button type="default" @click="changeCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            kcdtList:[{id:0,name:'出库'},{id:1,name:'入库'}],
            lxztList:[{id:0,name:'停用'},{id:1,name:'启用'}],
            enableList: [{
                value: 0,
                name: '停用'
            }, {
                value: 1,
                name: '启用'
            }],
            logList: [], //日志
            billNo: '',
            rowId: '',
            rowStatus: '',
            platformOptions: [],
            dialogVisible: false, //新增
            changeVisible: false, //编辑
            formSearch: {
                user: '',
                region: '',

            },
            formChange: {
                code: '',
                name: '',
                subjectName: '',
                address: '',
                telephone: '',
                enable: null
            },
            ruleForm: {
                code: '',
                name: '',
                subjectName: '',
                address: '',
                telephone: '',
                enable: ''
            },
            rules: {
                code: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                subjectName: [{
                        required: true,
                        message: '请输入FMS业务类型',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在50个字符以内',
                        trigger: 'blur'
                    }
                ],
                address: [{
                        required: true,
                        message: '请输入OMS/WMS业务类型',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在50个字符以内',
                        trigger: 'blur'
                    }
                ],
                telephone: [{
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在1000个字符以内',
                        trigger: 'blur'
                    }
                ],
                enable: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            },
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            buttonList: [], //按钮权限
            searchButton: false, //查询按钮
            addButton: false, //新增按钮
            editButton: false, //编辑按钮
            judgeMenu: [],
            documentTypeList: [],
            stockList: [{
                value: 0,
                name: '出库'
            }, {
                value: 1,
                name: '入库'
            }],
        }
    },
    mounted() {
        this.getData()
        this.getCodeTypeList()
        this.getButtonJurisdiction() //按钮权限
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
        handleSelectionChange(row) {
            this.rowLenght = row.length
            this.rowObj = row[0]
        },
        getData() {
            let data = {}
            data.status = this.formSearch.kcdt//库存动态
            data.enable = this.formSearch.lxzt//库存动态
            this.formSearch.documentType ? data.bizTypeId = this.formSearch.documentType.id : delete data.bizTypeId //单据类型ID
            this.formSearch.documentType ? data.bizType = this.formSearch.documentType.name : delete data.bizType //单据类型名称
            data.name = this.formSearch.businessType //业务类型名称
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('businessType_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = "master_data_business_type_" + this.billNo
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
            data.billNo = "master_data_business_type_" + this.billNo
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
        getCodeTypeList() {
            this.request('masterData_code_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.documentTypeList = res.data;
                }
            })
        },
        //新增
        addSave() {
            this.setBuryPoint('新增确认')
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    data.name = this.ruleForm.subjectName //业务类型
                    data.outerBusinessType = this.ruleForm.address //OMS/WMS业务类型
                    data.status = this.ruleForm.code //库存动态
                    data.enable = this.ruleForm.enable //类型状态
                    data.remark = this.ruleForm.telephone //备注
                    data.bizTypeId = this.ruleForm.name.id //单据类型id
                    data.bizType = this.ruleForm.name.name //单据类型name
                    this.request('businessType_add', data, true).then(res => {
                        if (res.code == '1') {
                            this.$message.success('新增成功')
                            this.getData()
                            this.dialogVisible = false
                            this.ruleForm = {}
                        } else {
                            this.$message.error(res.msg)
                            // this.dialogVisible = false
                        }
                        this.$refs['ruleForm'].resetFields();
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel() {
            this.dialogVisible = false
            this.ruleForm = {}
            this.$refs['ruleForm'].resetFields();

        },
        //编辑
        clickTable(row) {
            this.setBuryPoint('编辑')
            if (this.rowLenght == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.rowLenght > 1) {
                this.$message.error('一次只能修改一条数据！')
            } else {
                this.changeVisible = true
                this.formChange.code = this.rowObj.status
                this.formChange.name = this.rowObj.bizType
                this.formChange.subjectName = this.rowObj.name
                this.formChange.address = this.rowObj.outerBusinessType
                this.formChange.enable = this.rowObj.enable
                this.formChange.telephone = this.rowObj.remark
            }
        },
        //编辑保存
        changeSave() {
                 this.setBuryPoint('编辑确认')
                let data = {}
                data.id = this.rowObj.id
                data.name = this.formChange.subjectName //业务类型
                data.outerBusinessType = this.formChange.address //OMS/WMS业务类型
                data.status = this.formChange.code //库存动态
                data.enable = this.formChange.enable //类型状态
                data.remark = this.formChange.telephone //备注
                data.bizTypeId = this.rowObj.bizTypeId //单据类型id
                data.bizType = this.formChange.name //单据类型name
                this.request('businessType_update', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('编辑成功')
                        this.getData()
                        this.changeVisible = false
                    } else {
                        this.changeVisible = false
                        this.$message.error(res.msg)
                    }
                })
        },
        //编辑取消
        changeCancel() {
            this.changeVisible = false
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        onAdd() {
            this.setBuryPoint('新增')
            this.dialogVisible = true
            this.ruleForm.enable = 1
        },
        //查询
        onSearch() {
            this.setBuryPoint('查询')
            this.currentPage = 1
            this.getData()

        },
        //重置
        onReset() {
            this.formSearch = {}
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
</style>

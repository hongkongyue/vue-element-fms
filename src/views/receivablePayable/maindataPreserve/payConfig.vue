<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDelete">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="clickTable">编辑</el-button>
                </el-form-item>
            </div>

        </el-form>
    </header>
    <section class="middle" :style="getHeight">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" :max-height="tableHeight" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="code" label="编码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="支付方式" align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createUser" label="创建人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="启用状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.enable == 1 ? '启用' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <section class="middle">
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
    </section> -->
    <!-- 新增弹框 -->

    <Modal v-model="addVisible" @on-cancel="addCancel" :styles="mystyle" title="新增" :width="650" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-position="left">
                <Col span="12">
                <el-form-item label="编码：" prop="code" label-width="120px" size="small">
                    <el-input v-model="ruleForm.code" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="支付方式：" prop="pay" label-width="120px" size="small">
                    <el-input v-model="ruleForm.pay" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                   <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in enableList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="备注："  label-width="120px" size="small">
                    <el-input v-model="ruleForm.remark" type="textarea" style="width:150px"></el-input>
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
    <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="修改" :width="650" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="formChange" :model="formChange" class="demo-ruleForm " :label-position="left">
                <Col span="12">
                <el-form-item label="编码：" prop="code" label-width="120px" size="small">
                    <el-input v-model="formChange.code" disabled style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="支付方式：" prop="pay" label-width="120px" size="small">
                    <el-input v-model="formChange.pay" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                    <el-select v-model="formChange.enable" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in enableList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="备注：" label-width="120px" size="small">
                    <el-input v-model="formChange.remark " type="textarea" style="width:150px"></el-input>
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
import filters from '../../../filter/'
export default {
    data() {
        return {
            addVisible:false,
            changeVisible:false,
            logList: [], //日志
            billNo: '',
            enableList:[{name:'启用',id:'1'},{name:'禁用',id:'0'}],
            formChange: {
                code: '',
                pay: '',
                enable:'',
                remark:''
            },
            ruleForm: {
                code: '',
                pay: '',
                enable:'',
                remark:''
            },
            rules: {
                code: [{
                        required: true,
                        message: '请输入编码',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                pay: [{
                        required: true,
                        message: '请输入支付方式',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                enable:[
                    {
                        required: true,
                        message: '请选择状态',
                        trigger: 'change'
                    },
                ],
                remark: [{
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在50个字符以内',
                        trigger: 'blur'
                    }
                ],
            },
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [],
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            judgeMenu: [],
            buttonList: [], //按钮权限
            rowData:[],
            getHeight : ''

        }
    },
    mounted() {
        if (window.screen.height > 1000) {
            this.getHeight = "height:740px"
            this.tableHeight = "650"
        } else {
            this.getHeight = "height:520px"
            this.tableHeight = "450"
        }
        this.getData()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        //删除
        onDelete(){
            if (this.rowLenght == 0) {
                this.$message.error('请先选择删除的数据！')
            }else{
                let list = []
                this.rowData.map((item)=>{
                    list.push(item.id)
                })
                console.log(list,'++++++++++')
                let data = {}
                data.ids = list
                this.request('basicpayablepayway_delete', data, false).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
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
        handleSelectionChange(row) {
            console.log(row)
            this.rowLenght = row.length
            this.rowObj = row[0]
            this.rowData = row
            // console.log(this.rowObj)
        },
        getData() {
            this.logList = []
            let data = {}
            this.request('basicpayablepayway_getAll', data, true).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = "master_data_company_" + this.billNo
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
            data.billNo = "master_data_company_" + this.billNo
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
        onSearch() {
            this.getData()

        },
        addSave() {
            this.$refs['ruleForm'].validate((valid) => {
                console.log(valid)
                if (valid) { //新增保存
                    let data = {}
                    data.code = this.ruleForm.code
                    data.name = this.ruleForm.pay
                    data.enable = this.ruleForm.enable
                    data.remark = this.ruleForm.remark
                    this.request('basicpayablepayway_add', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                            this.getData()
                            this.addVisible = false
                            this.ruleForm = {}
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
            this.addVisible = false
            this.ruleForm = {}
            this.$refs['ruleForm'].resetFields();
        },
        //编辑
        clickTable(row) {
            if (this.rowLenght == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.rowLenght > 1) {
                this.$message.error('一次只能修改一条数据！')
            } else {
                this.changeVisible = true
                this.formChange.code = this.rowObj.code
                this.formChange.pay = this.rowObj.name
                this.formChange.enable = this.rowObj.enable.toString()
                this.formChange.remark = this.rowObj.remark
                this.rowId = this.rowObj.id
            }
        },
        //编辑保存
        changeSave() {
            this.$refs['formChange'].validate((valid) => {
                console.log(valid)
                if (valid) { //编辑
                let data = {}
            data.id = this.rowObj.id
            data.name = this.formChange.pay
            data.remark = this.formChange.remark
            data.enable = this.formChange.enable
            this.request('basicpayablepayway_update', data, true).then(res => {
                if (res.code == 1) {
                    this.$message.success(res.msg)
                    this.getData()
                    this.changeVisible = false
                } else {
                    this.$message.error(res.msg)
                }
            })
                } else { //验证表单
                    return false;
                }
            });
            
        },
        //编辑取消
        changeCancel() {
            this.changeVisible = false
            this.$refs['formChange'].resetFields();
        },
        onAdd() {
            this.addVisible = true
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

.el-table__header-wrapper {

    width: 99.9% !important;

}
</style>

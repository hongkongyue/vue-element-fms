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
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd('add')">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onAdd('edit')">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="exportImport">导出</el-button>
                </el-form-item>
            </div>
            <el-form-item label="检测项目" size="small">
                <el-input v-model="formData.name" placeholder="检测项目" maxlength="20" style="width:170px"></el-input>
                
            </el-form-item>
        </el-form>
    </header>
    <el-row>
        <!-- <el-col :span="20"> -->
        <div class="grid-content bg-purple-light">
            <section class="middle" :style="{minHeight:showBink?'690px':'480px'}" style="padding-top:10px">
                <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="tableHieght" header-row-style="height:25px" row-style="height:25px" @row-click="showLog" highlight-current-row>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="55" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="itemContent" label="检测项目" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column prop="basicPlatformCode" label="检测方法" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="platformPattern" label="标准值及允差" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column prop="enable" label="启用" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.enable == 1 ? '是' : '否'}}
                        </template>
                    </el-table-column>
                </el-table>

                <section class="log">
                    <div style="width:100%;font-size:20px;">操作日志</div>
                    <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="170">
                        <el-table-column prop="operator" label="操作员" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" width="180">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
                </section>
            </section>

        </div>
        <!-- </el-col> -->
    </el-row>
    <!-- 新增 编辑 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :title="showtitle" @on-cancel='cancel' :width="690" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" :rules="rules" class="demo-form-inline demo-ruleForm " :label-position="left">
                <!-- <Col> -->
                <el-form-item label="检测项目" size="small" label-width="120px" prop="platformPattern">
                    <el-input v-model="addformdata.platformPattern" placeholder="检测项目" maxlength="20" style="width:170px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="检测方法" size="small" label-width="120px" prop="billPattern">
                    <el-input v-model="addformdata.billPattern" placeholder="检测方法" maxlength="20" style="width:170px"></el-input>
                </el-form-item>
                <el-form-item label="标准值及允差" size="small" label-width="120px" prop="useTime">
                    <el-input v-model="addformdata.useTime" placeholder="标准值及允差" maxlength="20" style="width:170px"></el-input>
                </el-form-item> -->
                <el-form-item label="启用" size="small" label-width="120px" prop="status">
                    <el-select v-model="addformdata.status" filterable placeholder="请选择" style="width:170px">
                        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <!-- </Col> -->

            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="confirmSub">确认</Button>
            <Button type="default" @click="cancel">取消</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import filters from '../../../filter/'
import fetchData from '../../../filter/axios'
import downLoad from '../../../filter/downLoad'
import {
    debounce
} from 'mixins/debounce'
export default {
    mixins: [debounce],
    data() {
        return {
            statusList: [{
                name: '是',
                id: 1
            }, {
                name: '否',
                id: 0
            }],
            showtitle: '',
            selectRow: [],
            add: false,
            dialogVisible: false,
            addformdata: {
                platformPattern: '',
                status: 1
            },
            page: 1,
            pageSize: 10,
            platFormList: [], //平台下拉列表
            mystyle: {
                top: '150px',
            },
            formData: {

            },
            logPage:1,
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            rules: {
                status: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                platformPattern: [{
                    required: true,
                    message: '请输入检测项目',
                    trigger: 'blur'
                },{ min: 1, max: 15, message: '长度在15 个字符以内', trigger: 'blur' }],
                billPattern: [{
                    required: true,
                    message: '请输入检测方法',
                    trigger: 'blur'
                }],
                useTime: [{
                    required: true,
                    message: '请输入标准值及允差',
                    trigger: 'blur'
                }],
            },
            logList: [], //日志列表
            list: [],
            active: '',
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    mounted() {
        this.getData()
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

        selection(selection) {
            this.selectRow = selection
            console.log(this.selectRow)
        },
        selected(name) {
            this.active = name.name;
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onAdd(name) {
            if (name == 'add') {
                this.showtitle = '新增'
                this.dialogVisible = true
            } else {
                if (this.selectRow.length != 1) {
                    this.$message.warning('请选择一条数据进行编辑')
                } else {
                    this.showtitle = '编辑'
                    this.dialogVisible = true
                    //赋值
                    this.addformdata.platformPattern = this.selectRow[0].itemContent
                    this.addformdata.status = Number(this.selectRow[0].enable)
                }
            }
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
        //导出
        exportImport() {
            // let data = {}
            // data.currentPage = this.page
            // data.pageSize = this.pageSize
            // data.code = this.formData.code
            // data.name = this.formData.name
            // data.departmentName = this.formData.basicDepartmentName
            // data.levelName = this.formData.level
            // data.onJob = Number(this.formData.onJob)
            // data.classCommittee = Number(this.formData.classCommittee)
            // data.type = this.formData.type
            // downLoad.downLoad(data, '/eop-boot/masterData/staff/export')

        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.itemContent = this.formData.name
            this.request('basicFabricQcItem_page', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                }
            })
        },
        //新增提交
        confirmSub() {
            this.submitForm()
        },
        //新增
        submitForm(formName) {
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data = {}
                    if(this.showtitle == '编辑'){
                        data.id = this.selectRow[0].id
                    }
                    data.itemContent = this.addformdata.platformPattern.trim() //质检项目
                    data.enable = this.addformdata.status //质检项目
                    this.request('basicFabricQcItem_insertOrUpdate', data, true).then((res) => {
                        if (res.code == 1) {
                            this.$message.success('成功')
                            this.getData()
                            this.cancel()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs['ruleForm'].resetFields();
        },

        cancel() {
            this.addformdata = {
                platformPattern: '',
                status: 1
            }
            this.resetForm('ruleForm')
            this.dialogVisible = false;
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.logPage = 1
            let data = {}
            data.billNo = 'fabric_qc_item_log_prefix_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })

        },
        getMore() {
            this.logPage++
            let data = {}
            data.billNo = 'fabric_qc_item_log_prefix_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
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

.middle {
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

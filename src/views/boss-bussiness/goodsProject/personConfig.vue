<template>
<div>
    <header id="header" class="headerstyle">
        <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-form v-if="!showhidden" :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd('add')">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onAdd('edit')">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDelete">删除</el-button>
                </el-form-item>
            </div>
            <el-form-item label="部门：" size="small">
                <el-select v-model="formSearch.department" clearable @change="searchCode(formSearch.department)" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in departmentList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收人：" size="small">
                <el-select v-model="formSearch.person" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in personList" :key="item.username" :label="item.username" :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="推送类型：" size="small">
                <el-select v-model="formSearch.sendType" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in sendTypeList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        
    </header>
    <section class="middle" :style="maxHeight">
        <el-row>

            <el-col :span="24">
                <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border tooltip-effect="dark" :height="oneTableHeight" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                    <el-table-column prop="departmentName" label="部门" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="brandNames" label="对应品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="username" label="接收人" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sendType" label="推送类型" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="adjustTypeNames" label="任务类型" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="lastUpdated" label="修改时间" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <p style="font-size:16px;margin-top:10px">操作日志</p>
                <!-- <section class="middle"> -->
                <el-table :data="logList" style="width: 100%" border :max-height="twoTableHeight" tooltip-effect="dark">
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
            </el-col>
        </el-row>

    </section>

    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" :title="addtitle" :width="980" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" label-width="120px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="24">
                <Col span="12">
                <el-form-item label="部门：" prop="department" size="small">
                    <el-select v-model="ruleForm.department" filterable placeholder="请选择" style="width:270px">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="接收人：" prop="person" size="small">
                    <el-select v-model="ruleForm.person" filterable placeholder="请选择" style="width:270px">
                        <el-option v-for="item in addpersonList" :key="item.value" :label="item.userName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="12">
                <el-form-item label="品牌：" size="small">
                    <el-select v-model="ruleForm.brand" filterable @change="changeBrand(ruleForm.brand)" multiple placeholder="请选择" style="width:270px">
                        <el-option v-for="item in brandList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="任务类型：" size="small">
                    <el-select v-model="ruleForm.workType" multiple filterable placeholder="请选择" style="width:270px">
                        <el-option v-for="item in adjustTypeList" :key="item.value" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                </Col>
                <Col span="12">
                <el-form-item label="推送类型：" size="small">
                    <el-select v-model="ruleForm.sendType" disabled filterable placeholder="请选择" style="width:270px">
                        <el-option v-for="item in sendTypeList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                
                </Col>
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="addSave('ruleForm')">确认</Button>
            <Button type="default" @click="addCancel">取消</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    commonMixins
} from 'mixins/common';
import {
    debounce
} from 'mixins/debounce'
export default {
    mixins: [commonMixins, debounce],
    data() {
        return {
            addpersonList: [],
            personList: [],
            departmentList: [],
            brandList: [],
            sendTypeList: [{
                name: '全部推送',
                id: 0
            }, {
                name: '按品牌推送',
                id: 1
            }],
            addtitle: '新增',
            dialogVisible: false,
            ruleForm: {
                department: '',
                person: '',
                brand: '',
                sendType: 0,
                workType:''
            },
            rules: {
                department: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                person: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            },
            heightTree: '',
            oneTableHeight: '',
            twoTableHeight: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'nameWithCount'
            },
            showhidden: false,
            formSearch: {},
            maxHeight: '',
            logList: [], //日志
            billNo: '',
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            pageSecond: false,
            clickTree: '',
            rowLenght: '',
            rowObj: {},
            selection: [],
            logPage:[],
        }
    },
    created(){
        if (document.body.offsetHeight > 800) {
            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
            this.oneTableHeight = (document.body.offsetHeight - 300) * 0.6
            this.twoTableHeight = (document.body.offsetHeight - 300) * 0.3
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
        } else {
            this.oneTableHeight = (document.body.offsetHeight - 300) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
        }
    },
    mounted() {
        this.getDepartmentList()
        this.getBrandList()
        this.getplatformOptions()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {

        handleShowHidden(name) {
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 170) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 170) * 0.25
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 220) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 220) * 0.25
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 300) * 0.25
                }
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
            this.selection = row
            this.rowLenght = row.length
            this.rowObj = row[0]
        },
        onDelete() {
            let arr = []
            this.selection.map((i) => {
                arr.push(i.id)
            })
            if (arr.length > 0) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.ids = arr
                    this.request('sendDingTalkConfig_delete', data, true).then(res => {
                        if (res.code == 1) {
                            this.currentPage= 1,
                            this.$message.success('删除成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
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
        getData() {
            this.logList = []
            let data = {}
            data.departmentId = this.formSearch.department
            data.basicBrandId = this.formSearch.brand
            data.userId = this.formSearch.person
            data.sendType = this.formSearch.sendType
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('sendDingTalkConfig_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                }
            })
        },

        getLoglist(billNo) {
            this.billNo = billNo
            this.logPage = 1
            let data = {}
            data.billNo = "boss_send_ding_talk_config_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
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
            data.billNo = "boss_send_ding_talk_config_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
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
        //部门
        getDepartmentList() {
            let data = {}
                data.parentName = '杭州全尚科技股份有限公司'
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList = res.data
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        getplatformOptions() { //接收人
            this.request('sendDingTalkConfig_userSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.personList = res.data;
                }
            })
        },

        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        onAdd(name) {
            // 查询接收人
            let data = {}
            data.pagesize = 10000
            data.onJob = 1
            this.request('user_page', data, true).then(res => {
                if (res.code == 1) {
                    this.addpersonList = res.data.records
                }
            })
            if (name == 'add') {
                this.dialogVisible = true
                this.addtitle = '新增'
            } else if (name == 'edit') {
                this.addtitle = '编辑'
                if (this.rowLenght == 0) {
                    this.$message.warning('请先选择编辑的数据')
                } else if (this.rowLenght > 1) {
                    this.$message.warning('一次只能编辑一条数据')
                } else {
                    this.dialogVisible = true
                    this.ruleForm.department = this.rowObj.departmentId
                    this.ruleForm.person = this.rowObj.userId
                    this.ruleForm.brand = this.rowObj.brandIdList
                    this.ruleForm.sendType = this.rowObj.sendType == '按品牌推送' ? 1 : 0
                    this.ruleForm.workType = this.rowObj.adjustCodeList
                    // this.changeDepartment(this.rowObj.departmentId,1)
                }
            }
        },
        //新增
        addSave() {
            let postUrl = ''
            let departmentObj = {}
            let personObj = {}
            let data = {}
            this.departmentList.map((i) => {
                if (this.ruleForm.department == i.id) {
                    departmentObj = i
                }
            })
            this.addpersonList.map((i) => {
                if (this.ruleForm.person == i.id) {
                    personObj = i
                }
            })
            if (this.addtitle == '新增') {
                postUrl = 'sendDingTalkConfig_add'
            } else {
                postUrl = 'sendDingTalkConfig_update'
                data.id = this.rowObj.id
            }
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    data.departmentId = this.ruleForm.department
                    data.departmentCode = departmentObj.code
                    data.departmentName = departmentObj.name
                    data.userId = this.ruleForm.person
                    data.userCode = personObj.staffCode
                    data.userName = personObj.userName
                    data.userEopId = personObj.eopUserId
                    data.sendType = this.ruleForm.sendType
                    data.adjustTypeCodes = this.ruleForm.workType
                    data.brandIds = this.ruleForm.brand
                    this.request(postUrl, data, true).then(res => {
                        if (res.code == 1) {
                            // this.pagesize= 10,
                            this.currentPage= 1,
                            this.$message.success('保存成功')
                            this.getData()
                            this.$refs['ruleForm'].resetFields();
                            this.dialogVisible = false
                            this.ruleForm = {
                                department: '',
                                person: '',
                                brand: '',
                                sendType: 0,
                                workType:''
                            }
                            this.addpersonList = []
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        changeBrand(name) {
            if (name.length == 0) {
                this.ruleForm.sendType = 0
            } else {
                this.ruleForm.sendType = 1
            }
        },
        addCancel() {
            this.dialogVisible = false
            this.addpersonList = []
            this.ruleForm = {
                department: '',
                person: '',
                brand: '',
                sendType: 0,
                workType:''
            }
            this.$refs['ruleForm'].resetFields();

        },
        //查询
        onSearch() {
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

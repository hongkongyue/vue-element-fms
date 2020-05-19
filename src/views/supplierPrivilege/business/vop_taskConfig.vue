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
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('启用') !== -1" size="small" type="primary" @click="onEnable">启用</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('禁用') !== -1" size="small" type="danger" @click="onProhibit">禁用</el-button>
                </el-form-item>
            </div>
            <el-form-item label="配置方案" size="small">
                <el-select v-model="formData.configurationPlanId" style="width:120px" filterable>
                    <el-option v-for="v in configurationPlanList" :key="v.id" :label="v.planName" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <!-- <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination> -->
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="configurationPlanName" label="配置方案" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="taskName" label="任务名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="positionName" label="岗位配置" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status==1?'启用':'禁用' }}</template>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <section class="footer" style="margin-bottom:0px">
        <!-- <span class="pl20"><i class="el-icon-arrow-up pointer "></i></span> -->
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <!-- <section class="middle"> -->
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
    <!-- </section> -->
    </section>
    
    <!-- 新增弹框 -->
    <Modal v-model="addVisible" :styles="mystyle" :rules="rules" title="新增" @on-cancel='onAddCancel' :width="810" @on-ok="onAddSave" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="addformdata" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <div style="margin-left:40px;margin-bottom:10px">
                    <el-button size="small" type="primary" @click="onAddSave">确认</el-button>
                    <el-button size="small" @click="onAddCancel">取消</el-button>
                </div>
                <el-form-item label="配置方案" size="small" prop="config" label-width="100px">
                    <el-select v-model="addformdata.config" @change="changeConfig(addformdata.config)" style="width:120px" filterable>
                        <el-option v-for="v in configurationPlanList" :key="v.id" :label="v.planName" :value="v.planName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务名称" size="small" prop="taskName" label-width="100px">
                    <el-input v-model="addformdata.taskName" maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="状态" size="small" prop="status" label-width="100px">
                    <el-select v-model="addformdata.status" style="width:120px" filterable>
                        <el-option v-for="v in statusList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="岗位名称" size="small" label-width="100px">
                    <el-select v-model="addformdata.position" @change="changePosition(addformdata.position)" style="width:120px" filterable>
                        <el-option v-for="v in positionList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-button size="small" type="primary" @click="onAddNew">新增</el-button>
                <el-table :data="AddtableData" size='mini' height="250" style="width: 100%">
                    <el-table-column type="index" width="55" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="positionName" label="岗位名称" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center" min-width="180">
                        <template slot-scope="scope">
                            <el-button @click="deleteMenu(scope.row)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 编辑弹框 -->
    <Modal v-model="editVisible" :styles="mystyle" :rules="rules" title="编辑" @on-cancel='onEditCancel' :width="810" @on-ok="onEditSave" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="editformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <div style="margin-left:40px;margin-bottom:10px">
                    <el-button size="small" type="primary" @click="onEditSave">确认</el-button>
                    <el-button size="small" @click="onEditCancel">取消</el-button>
                </div>
                <el-form-item label="配置方案" size="small" label-width="100px">
                    <el-input v-model="editformdata.config" disabled maxlength="20" style="width:120px"></el-input>
                    <!-- <el-select v-model="editformdata.config" disabled style="width:120px" filterable>
                        <el-option v-for="v in configurationPlanList" :key="v.id" :label="v.planName" :value="v.planName"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="任务名称" size="small" label-width="100px">
                    <el-input v-model="editformdata.taskName" disabled maxlength="20" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="状态" size="small" label-width="100px">
                    <el-select v-model="editformdata.status" style="width:120px" filterable>
                        <el-option v-for="v in statusList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="岗位名称" size="small" label-width="100px">
                    <el-select v-model="editformdata.position" @change="changePosition(editformdata.position)" style="width:120px" filterable>
                        <el-option v-for="v in positionList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-button size="small" type="primary" @click="onEditNew">新增</el-button>
                <el-table :data="edittableData" size='mini' style="width: 100%">
                    <el-table-column type="index" width="55" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="positionName" label="岗位名称" align="center" min-width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center" min-width="180">
                        <template slot-scope="scope">
                            <el-button @click="deleteMenuTwo(scope.row)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce],
    data() {
        return {
            positionObj: {},
            AddtableData: [],
            edittableData:[],
            statusList: [{
                id: '1',
                name: '启用'
            }, {
                id: '0',
                name: '禁用'
            }],
            configurationPlanList: [],
            editVisible: false,
            addVisible: false,
            addformdata: {
                config: '',
                taskName: '',
                status: '1',
                position: '',
            },
            rules: {
                config: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                taskName: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }, ],
                status: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
            },
            editformdata: {
                config:'',
                status:'',
                taskName:'',
                position:''
            },
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
            judgeMenu: [],
            buttonList: [], //按钮权限
            testlist: [],
            configId: '',
            editlist:[],
            positionObjEdit:{},
        }
    },
    mounted() {
        this.getData()
        this.getPositionList() //岗位下拉
        this.getConfig() //配置方案下拉
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        //新增
        onAdd() {
            this.addVisible = true
        },
        //新增取消
        onAddCancel() {
            this.$refs["addformdata"].resetFields();
            this.addVisible = false
            this.AddtableData = []
            this.testlist = []
            this.addformdata.position = ''
            this.configId = ''
        },
        //新增保存
        onAddSave() {
            this.$refs["addformdata"].validate((valid) => {
                if (valid) {
                    if (this.AddtableData.length == 0) {
                        this.$message.error('请先添加岗位数据')
                    } else {
                        let data = {}
                        data.taskName = this.addformdata.taskName //任务名称
                        data.status = this.addformdata.status //状态
                        data.configurationPlanId = this.configId //任务配置ID
                        data.configurationPlanName = this.addformdata.config //任务配置名称
                        data.mappings = this.AddtableData
                        this.request('configuration_insertOrUpdate', data, true).then((res) => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                 this.getData()
                                this.$refs["addformdata"].resetFields();
                                this.addVisible = false
                                this.AddtableData = []
                                this.testlist = []
                                this.configId = ''
                                this.addformdata.position = ''
                            } else {
                                this.$message.error(res.msg)
                                // this.$refs["addformdata"].resetFields();
                                // this.addVisible = false
                                // this.AddtableData = []
                                // this.testlist = []
                                // this.configId = ''
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        changeConfig(name) {
            let id = ''
            this.configurationPlanList.map((item) => {
                if (item.planName == name) {
                    id = item.id
                }
            })
            this.configId = id
        },
        onAddNew() {
            if (this.addformdata.position == '' || !this.addformdata.position) {
                this.$message.error('请先选择岗位名称再新增')
            } else {
                if (this.testlist.indexOf(this.addformdata.position) !== -1) {
                    this.$message.error('请勿重复添加')
                } else {
                    this.testlist.push(this.addformdata.position)
                    this.AddtableData.push({
                        positionId: this.positionObj.id,
                        positionName: this.positionObj.name,
                        positionCode: this.positionObj.code,
                    })
                    this.addformdata.position = ''
                    this.positionObj = {}
                }
            }
        },
        //编辑新增
        onEditNew(){
            if (this.editformdata.position == '' || !this.editformdata.position) {
                this.$message.error('请先选择岗位名称再新增')
            } else {
                if (this.editlist.indexOf(this.editformdata.position) !== -1) {
                    this.$message.error('请勿重复添加')
                } else {
                    this.editlist.push(this.editformdata.position)
                    this.edittableData.push({
                        positionId: this.positionObj.id,
                        positionName: this.positionObj.name,
                        positionCode: this.positionObj.code,
                    })
                    this.editformdata.position = ''
                    this.positionObj = {}
                }
            }
        },
        //删除
        deleteMenu(row) {
            let list = this.edittableData
            this.AddtableData.map((item, index) => {
                if (row.positionName == item.positionName) {
                    list.splice(index, 1)
                    this.editlist.splice(index, 1)
                }
            })
            this.AddtableData = list
            console.log(this.AddtableData)
        },
        deleteMenuTwo(row){
            let list = this.edittableData
            this.edittableData.map((item, index) => {
                if (row.positionName == item.positionName) {
                    list.splice(index, 1)
                    this.editlist.splice(index, 1)
                }
            })
            this.edittableData = list
            console.log(this.AddtableData)
        },
         //编辑
        onEdit() {
            if (this.IDS.length == 1) {
                console.log(this.IDS)
                this.editVisible = true
                 this.editformdata.taskName  = this.IDS[0].taskName //任务名称
                 this.editformdata.status = (this.IDS[0].status).toString() //状态
                 this.editformdata.config = this.IDS[0].configurationPlanName //任务配置名称
                 this.request('configurationPlan_detail', {id:this.IDS[0].id}, true).then((res) => {
                if (res.code == 1) {
                    let list = []
                    this.edittableData = res.data.positions //
                    res.data.positions.map((item)=>{
                        list.push(item.positionName)
                    })
                    this.editlist = list
                }
            })
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据！')
            }
        },
        onEditSave(){
            if(this.edittableData.length == 0){
                this.$message.error('请先选择岗位名称再新增')
            }else{
                let data = {}
            data.id = this.IDS[0].id
            data.mappings = this.edittableData
            data.status = this.editformdata.status //状态
            data.taskName = this.IDS[0].taskName //任务名称
            data.configurationPlanId = this.IDS[0].configurationPlanId //任务配置ID
            data.configurationPlanName = this.IDS[0].configurationPlanName //任务配置名称
            this.request('configuration_insertOrUpdate', data, true).then((res) => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                 this.getData()
                                this.editVisible = false
                                this.edittableData = []
                                this.editformdata.position = ''
                                this.editlist = []
                            } else {
                                this.$message.error(res.msg)
                                // this.editVisible = false
                                // this.edittableData = []
                                // this.editlist = []
                            }
                        })
            }
            console.log(data,'0000000000000000')
        },
        onEditCancel(){
            this.editVisible = false
            this.editformdata.position = ''
        },
        changePosition(name) {
            let obj = {}
            this.positionList.map((item) => {
                if (item.name == name) {
                    obj = item
                }
            })
            this.positionObj = obj
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
        
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        resetEditForm() {
            this.addformdata = {}
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
            this.billNo = "develop_task_configuration_"+billNo
            this.currentPage = 1
            let data = {}
            data.billNo = this.billNo
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
            data.billNo = this.billNo
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
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.addBrand()
            //     } else {
            //         return false;
            //     }
            // });
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
            data.configurationPlanId = this.formData.configurationPlanId
            this.request('configuration_list', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data
                } else {
                    this.list = []
                }
            })
        },
        getPositionList() {
            let data = {}
            this.request('basic_supplier_position_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.positionList = res.data
                }
            })
        },
        getConfig() {
            //masterData_company_selector
            let data = {}
            data.planType = 1
            this.request('configurationPlan_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.configurationPlanList = res.data
                }
            })
        },
        //启用
        onEnable(){
            if(this.IDS.length == 0){
                this.$message.error('请先选择数据')
            }else{
                let list = []
                this.IDS.map((item)=>{
                    list.push(item.id)
                })
                let data = {}
                data.ids = list
                data.status = 1
                 this.request('configuration_changeStatus', data, true).then((res) => {
                if (res.code == 1) {
                    this.getData()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
            })
            }
        },
        //禁用
        onProhibit(){
            if(this.IDS.length == 0){
                this.$message.error('请先选择数据')
            }else{
                let list = []
                this.IDS.map((item)=>{
                    list.push(item.id)
                })
                let data = {}
                data.ids = list
                data.status = 0
                 this.request('configuration_changeStatus', data, true).then((res) => {
                if (res.code == 1) {
                    this.getData()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
            })
            }
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
</style>

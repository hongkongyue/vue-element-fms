<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <el-form-item label="仓库名称" size="small">
                <el-input v-model.trim="formData.warehouseName" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
                <!-- <el-select v-model="formData.basicPlatformId" @change="changebasicPlatformId(formData.basicPlatformId)" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in platformList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select> -->
            </el-form-item>
            <el-form-item label="仓库编码" size="small">
                <el-input v-model.trim="formData.warehouseCode" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="仓库状态" size="small">
                <el-select v-model="formData.status" placeholder="请选择" style="width:100px">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库类别" size="small">
                <el-select v-model="formData.warehouseType" placeholder="请选择" style="width:100px">
                    <!-- <el-option label="全部" value="2"></el-option> -->
                    <el-option label="实体仓" value="0"></el-option>
                    <el-option label="虚拟仓" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <!--  -->
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!--  -->
                <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!-- -->
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!--  v-if="judgeMenu.indexOf('删除') !== -1" -->
                <!-- <el-button     size="small" type="primary" @click="onDel">删除</el-button> -->
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'740px':'520px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="tableHieght" highlight-current-row @row-click="showLog">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="warehouseCode" label="仓库编码" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="warehouseName" label="仓库名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="warehouseType" label="仓库类别" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.warehouseType==1?'虚拟仓':'实体仓' }}</template>
            </el-table-column>
            <el-table-column prop="warehouseAddress" label="仓库地址" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="warehouseLeader" label="仓库负责人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="warehouseLeaderPhone" label="仓库负责人电话" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="仓库状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status==1?'启用':'禁用' }}</template>
            </el-table-column>
            <el-table-column prop="enable" label="启用状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.enable==1?'启用':'冻结' }}</template>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.created | get_year_month_day }}</template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>

            </el-table-column>
        </el-table>
            <section class="footer" style="margin-bottom:0px">
                <div style="width:100%;font-size:20px;">操作日志</div>
            </section>
            <section class="log">
                <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="170">
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

    <!--新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="810" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addObject" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="仓库编码" size="small" label-width="95px" prop="warehouseNumber">
                    <el-input @blur="checkNumber(addObject.warehouseNumber)" v-model="addObject.warehouseNumber" maxlength="20" placeholder="请输入" :disabled="dialogtitle=='编辑'" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称" size="small" label-width="95px" prop="warehouseName">
                    <el-input v-model="addObject.warehouseName" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="仓库类别" size="small" label-width="95px" prop="warehouseCategory">
                    <el-select v-model="addObject.warehouseCategory" placeholder="请选择" style="width:130px">
                        <el-option label="实体仓" value="0"></el-option>
                        <el-option label="虚拟仓" value="1"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="仓库地址" size="small" label-width="95px" prop="warehouseAddress">
                    <el-input v-model.trim="addObject.warehouseAddress" placeholder="请输入" maxlength="255" style="width:580px" show-word-limit></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="仓库负责人" size="small" label-width="95px" prop="warehouseLeader">
                    <el-input v-model="addObject.warehouseLeader" placeholder="请输入" maxlength="20" style="width:110px"></el-input>
                </el-form-item>
                <el-form-item label="仓库负责人电话" size="small" label-width="125px" prop="warehousePhone">
                    <el-input type="number" v-model="addObject.warehousePhone" placeholder="请输入" maxlength="12" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item label="仓库状态" size="small" label-width="95px" prop="warehouseStatus">
                    <el-select v-model="addObject.warehouseStatus" placeholder="请选择" style="width:110px" filterable>
                        <el-option label="禁用" value="0"></el-option>
                        <el-option label="启用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="启用状态" size="small" label-width="95px" prop="enble">
                    <el-select v-model="addObject.enble" placeholder="请选择" style="width:110px" filterable>
                        <el-option label="冻结" value="0"></el-option>
                        <el-option label="启用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" size="small" label-width="95px" prop="remark">
                    <el-input type="textarea" placeholder="请输入"  maxlength="255" show-word-limit  v-model.trim="addObject.remark" style="width:365px"></el-input>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary" @click="dialogtitle=='新增'?submitForm('ruleForm'):submitForms('ruleForm')">确认</Button>
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
import fetchparams from 'fetchparams'
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    data() {
        return {
            userInfo: {}, //用户信息
            formData: { //头部对象
            },
            dialogVisible: false,
            editVisible: false,
            addObject: {
                warehouseNumber: '', //仓库编码
                warehouseName: '', //仓库名称
                warehouseCategory: '',
                warehouseAddress: '',
                warehouseLeader: '',
                warehousePhone: '',
                warehouseStatus: '',
                remark: '',
                enble: ''
            }, //新增对象
            editObject: {}, //编辑对象
            dialogtitle: '新增',
            page: 1,
            IDS: [],
            pageSize: 10,
            mystyle: {
                top: '150px',
            },

            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            rules: {
                warehouseNumber: [{
                        required: true,
                        message: '请输入仓库编码',
                        trigger: 'blur'
                    },

                ],
                warehouseName: [{
                    required: true,
                    message: '请输入仓库名称',
                    trigger: 'blur'
                }],
                warehouseCategory: [{
                    required: true,
                    message: '请选择仓库类别',
                    trigger: 'change'
                }],
                warehouseAddress: [{
                    required: true,
                    message: '请输入仓库地址',
                    trigger: 'blur'
                }, ],
                warehouseLeader: [{
                    required: true,
                    message: '请输入负责人',
                    trigger: 'blur'
                }],
                warehousePhone: [{
                        required: true,
                        message: '请输入负责人电话',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 12,
                        message: '长度不能超过12位',
                        trigger: 'blur'
                    }
                ],
                warehouseStatus: [{
                    required: true,
                    message: '请选择仓库状态',
                    trigger: 'change'
                }],
                enble: [{
                    required: true,
                    message: '请选择启用状态',
                    trigger: 'change'
                }],
            },
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        checkNumber(type) {
            if (type) {
                this.request('masterData_warehouse_booleanWareHouse', {
                    warehouseCode: type
                }, false).then((res) => {
                        if(res.code==1){
                            
                        }else{
                            this.addObject.warehouseNumber=''
                            this.$message.error(res.msg)
                        }
                })

            }
        },
        watchLength(type) {
            //  console.log('999')
            this.addObject.warehousePhone = type.substring(0, 12)
        },
        onDel() {
            if (this.IDS.length == 1) {
                let data = {}
                data.id = this.IDS[0].id
                this.request('masterData_warehouse_delete', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('删除成功')
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择删除的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能删除一条数据!')
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
        onEdit() {
            if (this.IDS.length == 1) {
                this.dialogVisible = true
                this.dialogtitle = "编辑"
                this.resetForm('ruleForm')
                this.addObject = Object.assign({}, this.addObject, this.IDS[0])
                this.addObject.warehouseName = this.IDS[0].warehouseName
                this.addObject.warehouseCategory = (this.IDS[0].warehouseType).toString()
                this.addObject.warehouseNumber = this.IDS[0].warehouseCode
                this.addObject.warehouseAddress = this.IDS[0].warehouseAddress
                this.addObject.warehouseLeader = this.IDS[0].warehouseLeader
                this.addObject.warehousePhone = this.IDS[0].warehouseLeaderPhone
                this.addObject.warehouseStatus = (this.IDS[0].status).toString()
                this.addObject.enble = (this.IDS[0].enable).toString()
                this.addObject.id = this.IDS[0].id
                this.addObject.remark = this.IDS[0].remark
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择修改的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据!')
            }
        },
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onAdd() {
            this.dialogtitle = "新增"
            this.addObject.warehouseStatus = '1'
            this.addObject.enble = '1'
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
                    this.addShop()
                } else {
                    return false;
                }
            });
        },
        submitForms(formName) {
            // this.editVisible=true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.edit()
                    //  this.addShop()
                } else {
                    return false;
                }
            });
        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.warehouseName = this.formData.warehouseName
            data.warehouseType = Number(this.formData.warehouseType)
            data.warehouseCode = this.formData.warehouseCode
            data.status = Number(this.formData.status)
            data.warehouseType == 1 ? '' : (data.warehouseType == 0 ? '' : delete data.warehouseType)
            data.status == 1 ? '' : (data.status == 0 ? '' : delete data.status)
            this.request('masterData_warehouse_page', data, false).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                }
            })
        },
        addShop() {
            let data = {}
            data.warehouseName = this.addObject.warehouseName
            data.warehouseType = this.addObject.warehouseCategory
            data.warehouseCode = this.addObject.warehouseNumber
            data.warehouseAddress = this.addObject.warehouseAddress
            data.warehouseLeader = this.addObject.warehouseLeader
            data.warehouseLeaderPhone = this.addObject.warehousePhone
            data.status = this.addObject.warehouseStatus
            data.enable = this.addObject.enble
            data.remark = this.addObject.remark
            this.request('masterData_warehouse_add', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.cancel()
                    this.getData()
                    // this.getShop()

                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        edit() {
            let data = {}
            data.id = this.addObject.id
            data.warehouseName = this.addObject.warehouseName
            data.warehouseType = this.addObject.warehouseCategory
            data.warehouseCode = this.addObject.warehouseNumber
            data.warehouseAddress = this.addObject.warehouseAddress
            data.warehouseLeader = this.addObject.warehouseLeader
            data.warehouseLeaderPhone = this.addObject.warehousePhone
            data.status = this.addObject.warehouseStatus
            data.enable = this.addObject.enble
            data.remark = this.addObject.remark
            this.request('masterData_warehouse_update', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.canceledit()
                    this.getData()

                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        resetForm(formName) {
            this.editformdata = {}
            this.$refs[formName].resetFields();
        },
        cancel() {
            this.resetForm('ruleForm')
            this.dialogVisible = false;
            this.editVisible = false;
            this.addObject.warehouseStatus = ''
        },
        canceledit() {
            this.resetForm('ruleForm')
            this.dialogVisible = false;
            this.editVisible = false;
            this.addObject.warehouseStatus = ''
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'master_data_warehouse_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
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
            data.billNo = 'master_data_warehouse_' + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
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

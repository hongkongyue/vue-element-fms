<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <el-form-item size="small" v-if="judgeMenu.indexOf('新增') !== -1">
                <el-button size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('禁用') !== -1">
                <el-button size="small" type="primary" @click="onClosed">禁用</el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'740px':'520px'}">
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="400" highlight-current-row>
          <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="enable" label="启用状态" min-width="120" align="center">
                <template slot-scope="scope">{{ scope.row.enable == 0 ? '禁用' : '启用' }}</template>
            </el-table-column>
            <el-table-column prop="basicDepartmentCode" label="部门编码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicDepartmentName" label="生产部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="startTime" label="扣款大货合约日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="最后修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>

    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="610" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="启用状态:" size="small" prop="isAttend" label-width="140px">
                    <el-select v-model="ruleForm.isAttend" placeholder="请选择" style="width:250px">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="所属部门:" size="small" prop="warehouseNumber" label-width="140px">
                    <el-select v-model="ruleForm.warehouseNumber" value-key="id" placeholder="部门名称" style="width:250px" filterable>
                        <el-option v-for="v in departmentList" :key="v.id" :label="v.name" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="扣款大货合约时间:" size="small" prop="warehouseName" label-width="140px">
                    <el-date-picker v-model="ruleForm.warehouseName" type="date" placeholder="选择日期" style="width:250px">
                    </el-date-picker>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:220px">
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
            ruleForm: {
                warehouseNumber: '',
                warehouseName: '',
                isAttend: ''
            },
            rules: {
                warehouseNumber: [{
                        required: true,
                        message: '请选择部门',
                        trigger: 'change'
                    },

                ],
                warehouseName: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                isAttend: [{
                    required: true,
                    message: '请选择状态',
                    trigger: 'change'
                }],
                status: [{
                    required: true,
                    message: '请选择类型状态',
                    trigger: 'change'
                }],
            },
            departmentList: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.getDepartmentList() //部门
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
      //禁用
      onClosed(){
        if(this.IDS.length == 0){
          this.$message.error('请先选择数据，再禁用')
        }else if(this.IDS.length > 1){
          this.$message.error('一次只能操作一条数据')
        }else{
          let data = {}
          data.id = this.IDS[0].id
          data.enable = 0
          this.request('payableDelayConfig_update', data, true).then((res) => {
                if (res.code == 1) {
                    this.getData()
                    this.$message.success(res.msg)
                }else{
                  this.$message.success(res.msg)
                }
                this.IDS = []
          })
        }
      },
        getDepartmentList() {
            let data = {}
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList = res.data
                }
            })
        },
        onDel() {
            if (this.IDS.length == 1) {
                let data = {}
                data.id = this.IDS[0].id
                //  let url=`/eop-boot/masterData/warehouse/delete/${this.IDS[0].id}`
                this.request('masterData_code_delete', data, false).then((res) => {
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
                this.addObject.warehouseName = this.IDS[0].name
                this.addObject.warehouseNumber = this.IDS[0].code
                this.addObject.id = this.IDS[0].id

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
            let data = {}
            //     data.currentPage     =this.page
            //     data.pageSize        =this.pageSize
            //     data.code            =this.formData.code
            //     data.name            =this.formData.name
            this.request('payableDelayConfig_selectAll', data, false).then((res) => {
                if (res.code == 1) {
                    this.list = res.data
                    this.total = res.data.count
                }
            })
        },
        addShop() {
          let obj = this.ruleForm.warehouseNumber
          console.log(this.ruleForm.warehouseNumber)
            let data = {}
            data.basicDepartmentCode = obj.code
            data.basicDepartmentId = obj.id
            data.basicDepartmentName = obj.name
            data.startTime = this.ruleForm.warehouseName
            data.enable = this.ruleForm.isAttend
            this.request('payableDelayConfig_add', data, true).then((res) => {
                if (res.code == '1') {
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
            data.name = this.addObject.warehouseName
            data.code = this.addObject.warehouseNumber
            this.request('masterData_code_update', data, true).then((res) => {
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
            this.ruleForm = {}
        },
        canceledit() {
            this.resetForm('ruleForm')
            this.dialogVisible = false;
            this.editVisible = false;
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'MASTER_DATA_LOG_PREFIX_WAREHOUSE' + this.billNo
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
            data.billNo = 'MASTER_DATA_LOG_PREFIX_WAREHOUSE' + this.billNo
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

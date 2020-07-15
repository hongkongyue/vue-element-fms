<template>
<div>
    <header class="headerstyle" v-if="!showhidden">
        <el-form :inline="true" :model="formSearch" @submit.native.prevent class="demo-form-inline" style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
            <Col style="margin-bottom:0px">
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('查询') != -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('新增') != -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('编辑') != -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('删除') != -1" size="small" type="primary" @click="onDel">删除</el-button>
            </el-form-item>
            </Col>
            <Col>
            <el-form-item size="small" class="marginT0" label="任务类型">
                <!--   -->
                <el-input v-model.trim="formSearch.taskName" size="small" clearable></el-input>
            </el-form-item>
            </Col>
        </el-form>
    </header>
    <section class="middle" style="padding-top:10px" :style="{minHeight:showBink&&showhidden?'830px':'690px'}">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-pagination style="margin-bottom:0px;text-align:right;margin-top:5px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        <el-table @selection-change="selection" @row-click="showLog" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :maxHeight="oneTableHeight" highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center" sortable></el-table-column>
            <el-table-column prop="taskName" label="任务类型" min-width="120" align="center" sortable>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column sortable prop="postponeDay1" label="延期1天" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="postponeDay2" label="延期2天" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="postponeDay3" label="延期3天" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="postponeDay4" label="延期4天" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="postponeDay5" label="延期5天" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="lastUpdated" label="修改时间" min-width="120" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <section class="footer" style="margin-bottom:0px;margin-top:10px">
            <div style="width:100%;font-size:12px;">操作日志</div>
        </section>
        <section class="log" :style="{height:showhidden?330+'px':150+'px'}">
            <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" :maxHeight="150">
                <el-table-column prop="operator" label="操作员" min-width="120" align="center"></el-table-column>
                <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                    <template slot-scope="scope">{{scope.row.operateTime}}</template>
                </el-table-column>
                <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
            <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
        </section>
    </section>
    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :title="dialogtitle" :width="600" @on-cancel="cancel1" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" label-width="80px" class="demo-form-inline demo-ruleForm" label-position="right" :rules="rules">
                <!-- <Col> -->
                <el-form-item label="任务类型" size="small" label-width="95px" prop="taskId">
                    <!--   <el-input  v-model="formData.supplierName" maxlength="20" style="width:120px"></el-input> -->
                    <el-select v-model="formData.taskId" placeholder="请选择" style="width:150px" filterable>
                        <el-option v-for="v in taskList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="延期1天" size="small" label-width="95px" prop="postponeDay1">
                    <!--   <el-input type="number" v-model="formData.discount" :min="0" maxlength="20" style="width:110px"></el-input> -->
                    <el-input-number v-model="formData.postponeDay1" :controls="false" :precision="2" :min="0" style="width:150px"></el-input-number>
                </el-form-item>
                <Col>
                <el-form-item label="延期2天" size="small" label-width="95px" prop="postponeDay2">
                    <el-input-number v-model="formData.postponeDay2" :controls="false" :precision="2" :min="0" style="width:150px"></el-input-number>
                </el-form-item>
                <el-form-item label="延期3天" size="small" label-width="95px" prop="postponeDay3">
                    <el-input-number v-model="formData.postponeDay3" :controls="false" :precision="2" :min="0" style="width:150px"></el-input-number>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="延期4天" size="small" label-width="95px" prop="postponeDay4">
                    <el-input-number v-model="formData.postponeDay4" :controls="false" :precision="2" :min="0" style="width:150px"></el-input-number>
                </el-form-item>
                <el-form-item label="延期5天" size="small" label-width="95px" prop="postponeDay5">
                    <el-input-number v-model="formData.postponeDay5" :controls="false" :precision="2" :min="0" style="width:150px"></el-input-number>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:230px">
                    <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="primary" v-else @click="submitFormEdit('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel1">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
import filters from "../../../filter/";
import {
    debounce
} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
        return {
            true: true,
            dialogVisible: false,
            downLoadVisible: false,
            downLoadVisible: false,
            cancelVisible: false,
            importVisible: false,
            brandList: [], //品牌列表
            logList: [],
            formSearch: {
                taskName: '',
            },
            formData: {
                taskId: '',
                taskCode: '',
                taskName: '',
                postponeDay1: '',
                postponeDay2: '',
                postponeDay3: '',
                postponeDay4: '',
                postponeDay5: '',
            },
            dialogtitle: "新增",
            page: 1,
            total: "",
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: "150px"
            },
            IDS: [],
            list: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            rules: {
                taskId: [{
                    required: true,
                    message: "请选择品牌",
                    trigger: "change"
                }],
                postponeDay1: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "blur"
                    },
                ],
                postponeDay2: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "blur"
                    },
                ],
                postponeDay3: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "blur"
                    },
                ],
                postponeDay4: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "blur"
                    },
                ],
                postponeDay5: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "blur"
                    },
                ],
            },
            taskList: [],
        };
    },
    mounted() {
        this.getData();
        this.getButtonJurisdiction();
        this.getTaskList()
    },
    methods: {
        //删除
        onDel() {
          this.setBuryPoint('删除')
            let arr = []
            for (let i = 0, len = this.IDS.length; i < len; i++) {
                arr.push(this.IDS[i].taskId)
            }
            if (this.IDS.length > 0) {
                this.$confirm('将所选择的行数据进行删除，是否继续？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //结尾
                    let data = {}; //received_accReceived_manual_delete
                    data.taskIds = arr
                    this.request('boss_delayCostConfig_deleted', data, true).then(res => {
                        if (res.code == 1) {
                            this.getData()
                            this.$message.success('已删除')
                        } else {
                            this.$message.error(res.msg)
                            // this.$refs['ruleForm'].resetFields();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message.error('请勾选删除数据')
            }

        },
        getName(id) {
            for (let i = 0, len = this.taskList.length; i < len; i++) {
                if (this.taskList[i].id == id) {
                    return this.taskList[i].name;
                }
            }
        },
        getCode(id) {
            for (let i = 0, len = this.taskList.length; i < len; i++) {
                if (this.taskList[i].id == id) {
                    return this.taskList[i].code;
                }
            }
        },
        getButtonJurisdiction() {
            let data = {};
            data.parentResourceCode = this.$route.query.code;
            this.request("masterData_resource_buttonResource", data, true).then(
                res => {
                    if (res.code == 1) {
                        this.buttonList = res.data;
                        let newList = [];
                        this.buttonList.map(function (item) {
                            newList.push(item.resourceName);
                        });
                        this.judgeMenu = newList;
                    }
                }
            );
        },
        cancelonfirmDel() {
            this.cancelVisible = false;
        },
        onEdit() {
          this.setBuryPoint('编辑')
            if (this.IDS.length == 1) {
                this.dialogtitle = "编辑";
                this.dialogVisible = true;
                this.formData = Object.assign({}, this.formData, this.IDS[0]);
                this.formData.id = JSON.stringify(this.IDS[0].taskId)
                // this.formData.status=String(this.IDS[0].status)
                // this.formData.id = this.IDS[0].id;
            } else if (this.IDS.length == 0) {
                this.$message.error("请先选择修改的数据！");
            } else if (this.IDS.length > 1) {
                this.$message.error("一次只能修改一条数据！");
            }
        },
        selection(selection) {
            this.IDS = selection;
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getData();
        },
        handleCurrentChange(page) {
            this.page = page;
            this.getData();
        },
        getLoglist() {

            let data = {};
            data.billNo = "boss_delay_cost_config_prefix_" + this.billNo;
            data.pageSize = 3;
            data.currentPage = this.currentPage;
            this.request("billLog_getPagingByBillNo", data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false;
                    } else {
                        this.dataFlag = true;
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data;
                    } else {
                        this.logList = this.logList.concat(res.data);
                    }
                }
            });
        },
        getMore() {
            this.currentPage++;
            this.getLoglist()
        },
        onAdd() {
          this.setBuryPoint('新增')
            this.dialogtitle = "新增";
            this.dialogVisible = true;
        },
        onSearch() {
          this.setBuryPoint('查询')
            this.page = 1;
            this.getData();
        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = "";
            }
            this.page = 1;
            this.getData();
        },
        submitForm(formName) {
            this.dialogVisible = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.confirmeAdd()
                    // this.addBrand();
                } else {
                    return false;
                }
            });
        },
        confirmeAdd() {
            const {
                taskId,
                postponeDay1,
                postponeDay2,
                postponeDay3,
                postponeDay4,
                postponeDay5
            } = this.formData
            let data = {}
            data.taskId = taskId
            data.taskCode = this.getCode(taskId)
            data.taskName = this.getName(taskId)
            data.postponeDay1 = postponeDay1
            data.postponeDay2 = postponeDay2
            data.postponeDay3 = postponeDay3
            data.postponeDay4 = postponeDay4
            data.postponeDay5 = postponeDay5
            this.request('boss_delayCostConfig_add', data, false).then(res => {
                if (res.code == 1) {
                    this.$message.success('新增成功')
                    this.dialogVisible = false
                    this.resetForm("ruleForm");
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },

        confirmeEdit() {
            const {
                taskId,
                postponeDay1,
                postponeDay2,
                postponeDay3,
                postponeDay4,
                postponeDay5
            } = this.formData
            let data = {}
            data.taskId = taskId
            data.taskCode = this.getCode(taskId)
            data.taskName = this.getName(taskId)
            data.postponeDay1 = postponeDay1
            data.postponeDay2 = postponeDay2
            data.postponeDay3 = postponeDay3
            data.postponeDay4 = postponeDay4
            data.postponeDay5 = postponeDay5
            data.oldTaskId = JSON.parse(this.formData.id)
            this.request('boss_delayCostConfig_update', data, false).then(res => {
                if (res.code == 1) {
                    this.$message.success('编辑成功')
                    this.dialogVisible = false
                    this.resetForm("ruleForm");
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        submitFormEdit(formName) {
            this.dialogVisible = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.confirmeEdit();
                } else {
                    return false;
                }
            });
        },
        getTaskList() {
            this.request('boss_goods_planning_manage_constant', {
                type: 'planning_delay_task_type'
            }, false).then(res => {
                if (res.code == 1) {
                    this.taskList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getData() {
            this.currentPage = 1;
            this.logList = [];
            let data = {};
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.taskName = this.formSearch.taskName
            this.request("boss_delayCostConfig_page", data, true).then(
                res => {
                    if (res.code == 1) {
                        this.list = res.data.records;
                        this.total = res.data.count;
                    } else {
                        this.list = [];
                        this.total = "0";
                    }
                }
            );
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        cancel1() {
            this.dialogVisible = false;
            this.resetForm("ruleForm");
        },

        cancel() {
            this.resetForm("ruleForm");
            this.dialogVisible = false;
        },
        showLog(row) {
            this.billNo = row.taskId;
            this.getLoglist(row.taskId);
        },

    }
};
</script>

<style lang="less" scoped>
.left_side {
    width: 100%;
    background: #fff;

    li {
        display: inline-block !important;

        &:nth-child(1) {
            width: 30%;
            text-align: left //  height:700px;
        }

        // &:nth-child(1){

        //         };
        &:nth-child(2) {
            width: 70%;
        }
    }
}

.headerstyle {
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
}

.headerstyle1 {
    width: 101%;
    margin: 0 auto;
    background: #fff;
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
}

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
    margin-bottom: 0px;
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
    padding-left: 20px;
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

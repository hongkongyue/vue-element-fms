<template>
<div>
    <header class="headerstyle" style="width:99%" v-if="!showhidden">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
            <Col style="margin-bottom:0px">
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('查询') != -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small" class="marginT0">
                <el-button v-if="judgeMenu.indexOf('导出') != -1" size="small" type="primary" @click="onExportExcel">导出</el-button>
            </el-form-item>
            </Col>
            <Col>
            <el-form-item label="规划日期：" size="small">
                <el-date-picker v-model="formSearch.planFinishDateStart" type="date" value-format="yyyy-MM-dd" placeholder="开始日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" size="small">
                <el-date-picker v-model="formSearch.planFinishDateEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.basicBrandId" placeholder="请选择" style="width:150px" filterable clearable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门：" size="small">
                <el-select v-model="formSearch.departmentId" @change="changeDepartment(formSearch.departmentId)" placeholder="请选择" style="width:150px" filterable clearable>
                    <el-option v-for="v in departmentList12" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工姓名：" size="small">
                <el-select v-model="formSearch.userId" placeholder="请选择" style="width:150px" filterable clearable>
                    <el-option v-for="v in staffList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务类型：" size="small">
                <el-select v-model="formSearch.taskId" placeholder="请选择" style="width:150px" filterable clearable>
                    <el-option v-for="v in taskList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            </Col>
        </el-form>
    </header>
    <section class="middle" :style="maxHeight">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-pagination style="margin-bottom:0px;text-align:right;margin-top:5px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        <el-table @selection-change="selection" @row-click="showLog" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" :height="oneTableHeight" highlight-current-row>
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column type="index" width="105" label="序号" align="center" sortable></el-table-column>
            <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" sortable>
            </el-table-column>
            <el-table-column sortable prop="taskName" label="任务类型" min-width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="userName" label="员工" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column sortable prop="departmentName" label="部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column sortable prop="delayDays" label="延期天数(总)" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column sortable prop="delayAmount" label="计费费用(总)" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div style="text-align:right">{{scope.row.delayAmount|moneyFilters}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div slot="append">
            <div class='sum_footer xiaoji'>
                <div class='sum_footer_unit center el-table_1_column_6  is-center is-leaf'>当页小计</div>
                <div v-for="v in  column " :key="v" class='sum_footer_unit center  el-table_1_column_6  adjust   is-center is-leaf'>
                    <div v-if="v=='delayDays'" style="width:60%;text-align:center;">{{currObj.delayDays}}</div>
                    <div v-else-if="v=='delayAmount'" style="text-align:right;padding-right:10px">
                        <span v-if="currObj.delayAmount!=''"> {{currObj.delayAmount|moneyFilters}}</span>
                        <span v-else></span>
                    </div>
                    <div v-else></div>
                </div>
            </div>
            <div class='sum_footer heji'>
                <div class='sum_footer_unit center el-table_1_column_6  is-center is-leaf'>合计</div>
                <div v-for="v in  column " :key="v" class='sum_footer_unit center  el-table_1_column_6  adjust   is-center is-leaf'>
                    <div v-if="v=='delayDays'" style="width:60%;text-align:center;">{{totalObj.delayDays}}</div>
                    <div v-else-if="v=='delayAmount'" style="text-align:right;padding-right:10px">
                        <span v-if="totalObj.delayAmount!=''"> {{totalObj.delayAmount|moneyFilters}}</span>
                        <span v-else></span>
                    </div>
                    <div v-else></div>
                </div>
            </div>
        </div>
       <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
            <div style="width:100%;font-size:12px;">明细</div>
        <section class="log">
            <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight">
                <el-table-column type="index" label="序号" min-width="120" align="center"></el-table-column>
                <el-table-column prop="basicBrandName" sortable label="品牌" min-width="120" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="years" label="年份" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="season" label="季节" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="waveBand" label="波段" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="firstLevel" label="一级品类" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="secondLevel" label="二级品类" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="thirdLevel" label="三级品类" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="designNo" label="设计款号" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taskName" label="任务类型" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" label="员工" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="departmentName" label="部门" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="planFinishDate" label="规划完成日期" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="actualStartDate" label="实际开始时间" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="actualFinishDate" label="实际完成时间" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="actualUseDays" label="实际使用天数" sortable align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="delayDays" label="延期天数" align="center" sortable min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="delayAmount" label="计费费用" align="center" sortable min-width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div style="text-align:right">{{scope.row.delayAmount|moneyFilters}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </section>
</div>
</template>

<script>
import filters from "../../../filter/";
// import {
//     debounce
// } from 'mixins/debounce'
import {
    commonMixins
} from 'mixins/common'
export default {
    name: 'planningDelayBilling',
    mixins: [commonMixins],
    data() {
        return {
            oneTableHeight: '',
            twoTableHeight: '',
            maxHeight:'',
            true: true,
            dialogVisible: false,
            downLoadVisible: false,
            downLoadVisible: false,
            cancelVisible: false,
            importVisible: false,
            brandList: [], //品牌列表
            logList: [],
            formSearch: {
                planFinishDateStart: '',
                planFinishDateEnd: "",
                taskId: '',
                basicBrandId: '',
                departmentId: "",
                userId: '',
            },
            currObj: {
                delayDays: '',
                delayAmount: '',
            },
            totalObj: {
                delayDays: '',
                delayAmount: '',
            },
            page: 1,
            total: "",
            pageSize: 10,
            currentPage: 1,
            IDS: [],
            list: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            departmentList12: [], //departmentList
            taskList: [],
            rules: {
                basicBrandId: [{
                    required: true,
                    message: "请选择品牌",
                    trigger: "change"
                }],
                status: [{
                    required: true,
                    message: "请选择状态",
                    trigger: "change"
                }],
                discountRate: [{
                        required: true,
                        message: "请输入减值率",
                        trigger: "change"
                    },
                    {
                        pattern: /^[1-9]\d*(\.\d+)?$/i,
                        message: "减值率须大于0"
                    }
                ]
            },
            column: ['basicBrandName', 'departmentName', 'taskName', 'userName', 'delayDays', 'delayAmount'],
            data: [],
        };
    },
    created(){
        if (document.body.offsetHeight > 800) {
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        } else {
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        }
    },
    mounted() {
        this.getBrandList()
        this.getDepartmentList()
        this.getStaffList()
        this.getTaskList()
        this.getButtonJurisdiction();
        this.initDate()
        //  this.getData();
    },
    methods: {
      handleShowHidden(name) {
            this.detailsShow = false
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.37
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
                }
            }
        },
        clickDetails(name){
            if(!this.showhidden){
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                }
            }
            }else{
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                }
            }
            }
            
        },
        //员工与部门联动
        changeDepartment(id) { //
            console.log(id, '=------------')
            this.formSearch.userId = ''
            if (!!id) {
                this.departmentList12.map((i) => {
                    if (id == i.id) {
                        name = i.name
                    }
                })
                let data = {}
                data.pageSize = 1000
                data.departmentRootName = name
                this.request('masterData_staff_page', data, true).then((res) => {
                    if (res.code == 1) {
                        this.staffList = res.data.records
                    }
                })
            } else {
                this.request('masterData_staff_singleSelector', {}, true).then(res => {
                    if (res.code == 1) {
                        this.staffList = res.data
                    }
                })
            }
        },
        initDate() {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            this.formSearch.planFinishDateStart = filters.get_year_month_day(firstDay)
            this.formSearch.planFinishDateEnd = filters.get_year_month_day(lastDay)
        },
        onExportExcel() {
            const {
                planFinishDateStart,
                planFinishDateEnd,
                taskId,
                basicBrandId,
                departmentId,
                userId
            } = this.formSearch
            this.logList = [];
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize;
            planFinishDateStart ? data.planFinishDateStart = planFinishDateStart : delete data.planFinishDateStart
            planFinishDateEnd ? data.planFinishDateEnd = planFinishDateEnd : delete data.planFinishDateEnd
            data.planFinishDateEnd = planFinishDateEnd
            data.taskId = taskId
            data.basicBrandId = basicBrandId
            data.departmentId = departmentId
            data.userId = userId
            this.request('boss_bossDelayCostDetail_export', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        timeFormat(date) {
            if (!date || typeof (date) === "string") {
                return
            }
            var y = date.getFullYear(); //年
            var m = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1; //月
            var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日
            return y + "-" + m + "-" + d;
        },
        etFirstDayOfMonth(date) {
            date.setDate(1);
            return this.timeFormat(date);
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
        getDepartmentList() {
            let data = {}
            data.parentName = '杭州全尚科技股份有限公司'
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList12 = res.data
                }
            })
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
        onAdd() {
            this.dialogtitle = "新增";
            this.dialogVisible = true;
        },
        onSearch() {
            this.page = 1;
            this.getData();
        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = "";
            }
            this.changeDepartment()
            this.initDate()
            this.page = 1;
            this.getData();
        },
        getData() {
            const {
                planFinishDateStart,
                planFinishDateEnd,
                taskId,
                basicBrandId,
                departmentId,
                userId
            } = this.formSearch
            this.logList = [];
            let data = {};
            data.currentPage = this.page;
            data.pageSize = this.pageSize;
            planFinishDateStart ? data.planFinishDateStart = planFinishDateStart : delete data.planFinishDateStart
            planFinishDateEnd ? data.planFinishDateEnd = planFinishDateEnd : delete data.planFinishDateEnd
            data.taskId = taskId
            data.basicBrandId = basicBrandId
            data.departmentId = departmentId
            data.userId = userId
            this.request("boss_bossDelayCostDetail_pageQuery", data, true).then(
                res => {
                    if (res.code == 1) {
                        this.list = res.data.records;
                        this.total = res.data.count;
                        if (res.data.currentPageSum) {
                            this.currObj = res.data.currentPageSum
                        } else {
                            this.currObj.delayDays = ''
                            this.currObj.delayAmount = ''
                        }
                        // this.currObj=res.data.currentPageSum
                        if (res.data.totalPageSum) {
                            this.totalObj = res.data.totalPageSum
                        } else {
                            this.totalObj.delayDays = ''
                            this.totalObj.delayAmount = ''
                        }

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
        cancelconfirmDownload() {
            this.downLoadVisible = false;
        },
        cancel() {
            // this.resetEditForm();
            this.resetForm("ruleForm");
            this.dialogVisible = false;
        },
        onImport() {
            this.importVisible = true;
        },
        showLog(row) {
            console.log(row.detailIds)
            this.getDetail(row.detailIds)
        },
        getDetail(id) {
            this.request('boss_bossDelayCostDetail_getDetails', {
                detailIds: id
            }, false).then(res => {
                if (res.code == 1) {
                    this.logList = res.data
                } else {
                    this.logList = []
                    this.$message.error(res.msg)
                }
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        cancelimportConfirm() {
            this.importVisible = false;
            this.file = "";
            this.uploadList = [];
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
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 10px 10px 10px 10px;
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

.sum_footer {
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    color: #606266;
    background: #cff5e7;
}

.sum_footer_unit {
    flex: 1;
    /* -webkit-flex-grow:1; */
    text-indent: 30px;
    font-size: 13px;

    &:nth-child(1) {
        text-indent: 25px;

    }

    ;

    &:nth-child(2) {
        text-indent: 25px;
    }

    ;

    &:nth-child(3) {
        text-indent: 25px;
    }

    ;

    &:nth-child(4) {
        text-indent: 15px;
    }

    ;

    &:nth-child(5) {
        text-indent: -15px;
    }

    ;

    &:nth-child(7) {
        text-indent: 90px;
    }

    ;
}

.sum_footer_unit.center {
    text-align: center;
    // text-indent:10px;
}

.sum_footer.xiaoji,
.sum_footer.heji {
    border-bottom: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;

}

.el-table__append-wrapper {
    margin-top: -1px;

}
</style>

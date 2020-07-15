<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <el-form-item label="角色编码" size="small">
                <el-select v-model="formData.code" placeholder="请选择" style="width:100px" filterable>
                    <el-option v-for="v in roleList" :key="v.id" :label="v.code" :value="v.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色名称" size="small">
                <el-select v-model="formData.name" placeholder="请选择" style="width:100px" filterable>
                    <el-option v-for="v in roleList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onSearch"  v-if="judgeMenu.indexOf('查询') !== -1">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onAdd"  >新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onEdit"  v-if="judgeMenu.indexOf('编辑') !== -1">编辑</el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'740px':'530px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" highlight-current-row @row-click="showLog">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="serialNo" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="roleCode" label="角色编码" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createUser" label="维护人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.enable==1?'启用':'禁用'}}</template>
            </el-table-column>
        </el-table>

        <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <!-- <section class="middle"> -->
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
    <!-- </section> -->
    </section>
    
</div>
</template>

<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
        return {
            IDS: [],
            userInfo: {}, //用户信息
            dialogVisible: false,
            editVisible: false,
            editformdata: {},
            editFormLine: {
                platform: null,
                company: null,
                shopname: null,
                number: null,
                account: null,
                wangdiantong: null,
                status: null,
                freeze: null,
                brand: null
            }, //编辑信息
            dialogtitle: '新增',
            roleList: [], //角色集合
            page: 1,

            pageSize: 10,
            mystyle: {
                top: '150px',
            },
            formData: {
                user: '',
                region: '',

            },
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            judgeMenu: [],
            buttonList: [],//按钮权限
        }
    },
    mounted() {
        this.getData()
        this.getRoleCode()
        this.getButtonJurisdiction()
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
        onEdit() {
            this.setBuryPoint('编辑')
            if (this.IDS.length == 1) {
                this.$router.push({
                    name: 'edit_supply_role',
                    query: {
                        obj: this.IDS[0]
                    }
                })
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
            this.setBuryPoint('新增')
            this.$router.push({
                name: 'add_supply_role',
            })
        },
        onSearch() {
            this.setBuryPoint('查询')
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
            data.roleCode = this.formData.code
            data.roleName = this.formData.name
            this.request('basicsupplierrole_basic_supplier_role_page', data, true).then((res) => {
                if (res.code == 1) {
                     let serialNoBegain = this.pageSize * (this.page - 1);
                        res.data.records.forEach((item) => {
                                    serialNoBegain ++;
                                    item.serialNo = serialNoBegain
                                })
                    this.list = res.data.records
                    this.total = res.data.count
                }
            })
        },
        //获取下拉的列表
        getRoleCode() {
            let data = {};
            // this.request('masterData_basicRole_selector', data, false).then((res) => {
            this.request('basicsupplierrole_basic_supplier_role_selector', data, false).then((res) => {
                if (res.code == 1) {
                    this.roleList = res.data
                }
            })
        },
        getCompany() {
            //masterData_company_selector
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
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
        },
        canceledit() {
            this.resetForm('ruleForms')
            this.dialogVisible = false;
            this.editVisible = false;
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'master_data_supplier_role' + this.billNo
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
            data.billNo = 'master_data_role_' + this.billNo
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

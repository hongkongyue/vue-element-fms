<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <div>
                 <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
             <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small"  type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </div>
            <el-form-item label="年份" size="small">
                <el-date-picker style="width:100px" v-model="formData.year" value-format="yyyy" type="year" placeholder="请选择"> </el-date-picker>
            </el-form-item>
            <el-form-item label="公司" size="small">
                <el-select v-model="formData.company" placeholder="公司" style="width:220px" filterable>
                    <el-option v-for="v in companyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌" size="small">
                <el-select v-model="formData.brandId" placeholder="请选择" style="width:140px" filterable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="款号/货品编码" size="small">
                <el-input v-model.trim="formData.goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="条码/商家编码" size="small">
                <el-input v-model.trim="formData.barCode" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="返单入库时间" size="small">
                <el-date-picker v-model="formData.time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
           
            <!-- <el-form-item   size="small">
                              <el-button  size="small" type="primary" @click="onAdd">新增</el-button>
                          </el-form-item> -->
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section> -->
    <!-- <section class="middle">
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
</div>
</template>

<script>
import filters from '../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            brandList: [],
            dialogVisible: false,
            addformdata: {
                companyAddress: null,
                companyPhone: null,
                brandNumber: null,
                brandName: null,
                includesReponsor: null,
                brandsuo: null,
                diaopai: null,
                type: null,
                goodsStore: null,
                costRate: null,
                tailMoney: null,
                companyName: null,
                companyAddress: null,
                companyPhone: null,
                includesMoney: null,
                response: null
            },
            editformdata: {},
            dialogtitle: '新增',
            page: 1,
            pageSize: 1000,
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
            total:0,
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    mounted() {
        // this.getData()
        this.getDepartmentList()
        this.getResponse()
        this.getBrandList()
        this.getCompany()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
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
          initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'returnRecord',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        // lineNumbers: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        {
                            field: 'index',
                            caption: '序号',
                            size: '100px',
                            sortable: true,
                            info:true
                        },
                        {
                            field: 'year',
                            caption: '年份',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'companyName',
                            caption: '公司',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'brandName',
                            caption: '品牌',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '款号/货品编码',
                            size: '200px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '条码/商家编码',
                            size: '200px',
                            sortable: true
                        },
                        {
                            field: 'color',
                            caption: '颜色',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'size',
                            caption: '尺码',
                            size: '100px'
                        },
                        {
                            field: 'stockInTime',
                            caption: '返单入库时间',
                            size: '200px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '同步时间',
                            size: '200px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        // self.getLoglist(event.recid)
                        // self.currentPage = 1;
                        // self.$store.commit('clearreceipt')
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.returnRecord.clear(); //清空
                w2ui.returnRecord.records = arr
                // w2ui.historical.records.push({
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span>当页小计</span>',
                //     billAmount: current,
                // }, {
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span >合计</span>',
                //     billAmount: total,
                // })
                $('#main').w2render('returnRecord');
                w2ui.returnRecord.refresh();
            } else {
                $(document).ready(function(){
                w2ui.returnRecord.clear(); //清空
                w2ui['returnRecord'].records = []
                w2ui.returnRecord.refresh();
                $('#main').w2render('returnRecord')
                })
            }

        },
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        resetEditForm() {
            this.addformdata = {
                companyAddress: null,
                companyPhone: null,
                brandNumber: null,
                brandName: null,
                includesReponsor: null,
                brandsuo: null,
                diaopai: null,
                type: null,
                goodsStore: null,
                costRate: null,
                tailMoney: null,
                companyName: null,
                companyAddress: null,
                companyPhone: null,
                includesMoney: null,
                response: null
            }
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
            this.billNo = billNo
            this.currentPage = 1
            console.log(filters.getConstant('brand'), '000000000')
            let data = {}
            data.billNo = filters.getConstant('department') + this.billNo
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
            data.billNo = filters.getConstant('brand') + this.billNo
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
        onAdd() {
            this.dialogtitle = "新增"
            this.dialogVisible = true
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()

        },
        onReset() {
            this.formData = {}
            this.page = 1;
        },

        submitForm(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addBrand()
                } else {
                    return false;
                }
            });
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
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.year = this.formData.year //年份
            data.companyId = this.formData.company //公司ID
            data.brandId = this.formData.brandId   //品牌ID
            data.goodsNo = this.formData.goodsNo 
            data.merchantCode = this.formData.barCode
            this.formData.time ? data.startTime = this.formData.time[0] : delete data.startTime
            this.formData.time ? data.endTime = this.formData.time[1]   : delete data.endTime
            // data.companyName = this.formData.company
            // data.leader = this.formData.response
            // data.name = this.formData.department
            this.request('returnRecord_page', data, true).then((res) => {
                if (res.code == 1) {
                   this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.perAmount, res.data.totalAmount)
                    } else {
                        this.initTable([])
                    }
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
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
        getResponse() {
            let data = {}
            this.request('masterData_staff_singleSelector', data, true).then((res) => {
                if (res.code == 1) {
                    this.responseList = res.data
                }
            })
        },
        getDepartmentList() {
            let data = {}
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList = res.data
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
            this.$refs[formName].resetFields();
        },
        addBrand() {
            let data = {}
            data.code = this.addformdata.brandNumber
            data.name = this.addformdata.brandName
            data.leader = this.addformdata.includesReponsor
            data.shortName = this.addformdata.brandsuo
            data.dropName = this.addformdata.diaopai
            data.status = 0
            data.type = Number(this.addformdata.type)
            data.enable = 1
            data.warehouseName = this.addformdata.goodsStore
            data.costMultiplying = this.addformdata.costRate
            data.soPriceTail = this.addformdata.tailMoney
            data.companyName = filters.getName(this.companyList, this.addformdata.companyName)
            data.companyCode = filters.getCompanyCode(this.companyList, this.addformdata.companyName)
            data.companyAddress = this.addformdata.companyAddress
            data.companyPhone = this.addformdata.companyPhone
            data.containsTrialFee = Number(this.addformdata.includesMoney)
            this.request('masterData_brand_add', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.cancel()
                    this.getData()
                    this.getResponse()
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        editBrand() {
            let data = {}
            data.enable = this.addformdata.goodsStore
            data.id = this.addformdata.id
            this.request('masterData_department_enable', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.getData()

                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        cancel() {
            //  this.addformdata={}
            this.resetEditForm()
            this.resetForm('ruleForm')
            this.dialogVisible = false;
        },
        showLog(row) {
            this.getLoglist(row.id)
        },
        //异步导出
        onExport() {
            this.setBuryPoint('导出')
            let data = {}
                data.currentPage = this.page
                data.pageSize = this.pageSize
                data.year = this.formData.year //年份
                data.companyId = this.formData.company //公司ID
                data.brandId = this.formData.brandId   //品牌ID
                data.goodsNo = this.formData.goodsNo 
                data.merchantCode = this.formData.barCode
                this.formData.time ? data.startTime = this.formData.time[0] : delete data.startTime
                this.formData.time ? data.endTime = this.formData.time[1]   : delete data.endTime
            this.request('stocks_returnRecord_exportAsync', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        //循环key
        getKey(key) {
            const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus) {
                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
                                duration: 0,
                            });
                            this.cleanKey(key)
                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            console.log(url)
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
            }
        },
        cleanKey(key) {
            let data = {}
            data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
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

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
                <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="synchronization">同步</el-button>
            </el-form-item>
            </div>
            <el-form-item label="色系" size="small">
                <el-select v-model="formData.color" placeholder="色系" style="width:150px" filterable>
                    <el-option v-for="v in colorList" :key="v.id" :label="v.color" :value="v.color"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle"  :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="550" @row-click="showLog" highlight-current-row>
            <!-- <el-table-column type="selection" width="55">
            </el-table-column> -->
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="color" label="色系" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="colorNo" label="颜色编码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="colorName" label="颜色名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="code" label="拼音代号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="tagColorCode" label="吊牌颜色代号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createUser" label="同步人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="同步时间" min-width="120" align="center" show-overflow-tooltip>
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
</div>
</template>

<script>
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            colorList:[],
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {},
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
            judgeMenu:[],
        buttonList:[],//按钮权限
        }
    },
    mounted() {
        this.getData()
        this.getColorList()
        this.getButtonJurisdiction()//按钮权限
    },
    methods: {
        getButtonJurisdiction(){
        let data = {}
        data.parentResourceCode = this.$route.query.code
        this.request('masterData_resource_buttonResource', data, true).then(res => {
          if (res.code==1) {
            this.buttonList = res.data
            let newList = []
            this.buttonList.map(function(item){
              newList.push(item.resourceName)
            })
            this.judgeMenu = newList
            }
          })
      },
        //同步
        synchronization(){
            this.setBuryPoint('同步')
            let data = {}
            this.request('color_syncColor', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message.success('同步成功')
                    this.getData()
                }
            })
        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.color = this.formData.color
            this.request('color_page', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.list = []
                    this.total = '0'
                }
            })
        },
        getColorList() {
            //masterData_company_selector
            let data = {}
            this.request('color_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.colorList = res.data
                }
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onSearch() {
             this.setBuryPoint('查询')
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formData = {}
        },
        // getLoglist(billNo) {
        //     this.billNo = billNo
        //     this.currentPage = 1
        //     console.log(filters.getConstant('brand'), '000000000')
        //     let data = {}
        //     data.billNo = filters.getConstant('department') + this.billNo
        //     data.pageSize = 3
        //     data.currentPage = this.currentPage
        //     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
        //         if (res.code == 1) {
        //             if (res.data.length < data.pageSize) {
        //                 this.dataFlag = false
        //             } else {
        //                 this.dataFlag = true
        //             }
        //             if (this.currentPage == 1) {
        //                 this.logList = res.data
        //             } else {
        //                 this.logList = this.logList.concat(res.data)
        //             }
        //         }
        //     })

        // },
        // getMore() {
        //     this.currentPage++
        //     let data = {}
        //     data.billNo = filters.getConstant('brand') + this.billNo
        //     data.pageSize = 3
        //     data.currentPage = this.currentPage
        //     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
        //         if (res.code == 1) {
        //             if (res.data.length < data.pageSize) {
        //                 this.dataFlag = false
        //             } else {
        //                 this.dataFlag = true
        //             }
        //             if (this.currentPage == 1) {
        //                 this.logList = res.data
        //             } else {
        //                 this.logList = this.logList.concat(res.data)
        //             }
        //         }
        //     })
        // },
        
        
        // showLog(row) {
        //     this.getLoglist(row.id)
        // },

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

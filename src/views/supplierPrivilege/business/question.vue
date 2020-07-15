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
                    <el-button v-if="judgeMenu.indexOf('确认问题') !== -1" size="small" type="primary" @click="onEdit">确认问题</el-button>
                </el-form-item>
            </div>
            <el-form-item label="问题类型" size="small">
                <el-select v-model="formData.feedType" placeholder="问题类型" style="width:120px" filterable>
                    <el-option v-for="v in feedTypeList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="确认状态" size="small">
                <el-select v-model="formData.status" placeholder="确认状态" style="width:120px" filterable>
                    <el-option v-for="v in statusList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="picUrlList" label="图片" min-width="120" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.picUrlList" style="width: 40px; height: 40px" :src="scope.row.picUrlList[0]" :preview-src-list="scope.row.picUrlList">
                    </el-image>
                    <el-image v-if="!scope.row.picUrlList" style="width: 40px; height: 40px" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="feedType" label="问题类型" min-width="120" align="center">
                <template slot-scope="scope">{{ scope.row.feedType == 1 ? '提建议' : (scope.row.feedType == 2 ? '操作优化' : '吐槽') }}</template>
            </el-table-column>
            <el-table-column prop="remark" label="问题描述" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createUser" label="提交人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierPositionName" label="岗位" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierName" label="所属供应商" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="提交时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status==1?'已确认':'待确认' }}</template>
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
    
</div>
</template>

<script>
import filters from '../../../filter/'
import Util from 'libs/util'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
        return {
            feedTypeList:[{id:1,name:'提建议'},{id:2,name:'操作优化'},{id:3,name:'吐槽'}],//问题类型
            statusList:[{id:1,name:'已确认'},{id:0,name:'待确认'}],
            dialogVisible: false,
            editformdata: {},
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {
            },
            IDS: [],
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [{
                pic: ['https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=1&spn=0&di=184140&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3173584241%2C3533290860&os=1133571898%2C402444249&simid=3493630544%2C246115770&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fp7rtwg_z%26e3Bkwthj_z%26e3Bv54AzdH3Ftrw1AzdH3Fwa_0b_cd_a8daaaaa8dnb908n99n9cdl0ln8mb_3r2_z%26e3Bip4s&gsm=2&islist=&querylist=', 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=2&spn=0&di=179300&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2534506313%2C1688529724&os=1097436471%2C408122739&simid=3354786982%2C133358663&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fp7rtwg_z%26e3Bkwthj_z%26e3Bv54AzdH3Ftrw1AzdH3Fwn_89_0c_a8naaaaa8m98bm8d8nmm0cmbanmbm_3r2_z%26e3Bip4s&gsm=2&islist=&querylist=']
            }, {
                pic: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584346781432&di=7af337fce73b5c3e529f663b657fa370&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0704%2Fe53c868ee9e8e7b28c424b56afe2066d.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584346781431&di=437db048a2f370241085f22d5e37afb8&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg']
            }],
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    mounted() {
        this.getData()
        this.getDepartmentList()
        this.getResponse()
        this.getCompany()
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
        getLoglist(billNo) {
            this.billNo = "vop_log_prefix_feedback_"+billNo
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
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()

        },
        onReset() {
            this.formData = {}
            this.page = 1;
            this.getData()
        },
        //确认问题
        onEdit(){
            this.setBuryPoint('确认问题')
            if(this.IDS.length == 0){
                this.$message.error('请先选择数据再确认问题')
            }else{
                let list = []
                this.IDS.map((item)=>{
                    list.push(item.id)
                })
                let data = {}
                data.status = 1
                data.ids = list
                this.request('feedback_update', data, true).then((res) => {
                if (res.code == 1) {
                    this.onSearch()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
            })
            }
        },
        getData() {
            this.logList = []
            let data = Util.deepClone(this.formData)
            data.currentPage = this.page
            data.pageSize = this.pageSize
            this.request('biz_supplier_feedback_pageQuery', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.list = []
                    this.total = '0'
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
<style>
 .el-image-viewer__close{
        color:#fff!important;
    }
</style>
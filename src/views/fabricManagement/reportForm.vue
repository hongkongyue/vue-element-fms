<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onImport">导出</el-button>
                </el-form-item>
            </div>
            <el-form-item label="任务流编号：" size="small">
                <el-input v-model="formSearch.taskNo" maxlength="20" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="流程状态：" size="small">
                <el-select v-model="formSearch.processStatus" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in statusList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="450" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="taskNo" label="任务流编号" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="processStatus" label="流程状态" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateUserName" label="品牌发起人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateDepartmentName" label="发起部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="majorClasses" label="面/辅料" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kinds" label="面辅料品类分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialCategory" label="是否特殊工艺" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.specialCategory == 1 ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="styleImg" label="样品图1" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div @click="imgClick(scope.row.styleImg)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2" label="样图2" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div @click="imgClick(scope.row.styleImg2)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="realMaterial" label="是否有实物" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.realMaterial == 1 ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column prop="contrastColor" label="是否撞色" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.contrastColor == 1 ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column prop="developer" label="开发员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="requireDate" label="要求完成日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sendInspectDate" label="送检日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="inspectResult" label="检测结果" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.inspectResult ? (scope.row.inspectResult == 1 ? '合格' : '不合格') : '' }}</template>
            </el-table-column>
            <el-table-column prop="inspectUser" label="检测人员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="inspectTime" label="检测时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="price" label="核准价格（元/米）" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pricingUser" label="核价人员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pricingTime" label="核价时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="confirmTime" label="发起人确认时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
           <div style="width:100%;font-size:20px;">操作日志</div>
        </section> -->
    <section class="middle">
        <!-- <Table ref="currentRowTable" @on-select-cancel="choiceId" @on-select-all-cancel="choiceId" max-height='550' @on-select="choiceId" @on-select-all="choiceId" :columns="columns" size="small" highlight-row :data="list"></Table> -->
        <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">

            <el-table-column prop="operator" label="图片" min-width="120" align="center">
                <template slot-scope="scope">
                    <div @click="imgClick(scope.row.materialImg)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.materialImg" :preview-src-list="[scope.row.materialImg]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="materialYear" label="年份" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="materialMonth" label="月份" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicSupplierShortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialColorNo" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialNo" label="物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialName" label="物料名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicColorName" label="颜色" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWidth" label="门幅(cm)" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWeight" label="克重（g/m2)" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="单位" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ingredient" label="成分" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="moq" label="起订量" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="firstMaterialType" label="一级分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="twiceMaterialType" label="二级分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="thirdMaterialType" label="三级分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialSpecification" label="物料规格" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="loss" label="默认损耗（%）" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="loopedWeft" label="纬缩(%)" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="knees" label="经缩(%)" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productCycle" label="生产周期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="orderCycle" label="订货周期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kilogramsOfRice" label="公斤米数" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="riskRemark" label="质量风险提示" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="developer" label="开发人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enterTime" label="采购录入时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialUser" label="面料员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialEnterTime" label="面料录入时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>

        </el-table>
        <!-- <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div> 
         <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>    -->
    </section>
</div>
</template>

<script>
import Util from 'libs/util'
import downLoad from '../../filter/downLoad'
export default {
    data() {
        return {
            statusList:[],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [],
            logList: [], //日志
            billNo: '',
            companyCodeOptions: [],
            dialogVisible: false, //新增
            changeVisible: false, //编辑
            formSearch: {},
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [],
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    mounted() {
        this.getData()
        this.getStatusList()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        //导出
        onImport(){
            let data = Util.deepClone(this.formSearch);
            downLoad.downLoad(data,'/eop-boot/fabric/report/downloadXlsx')
            console.log(data,'00000000000000')
        },
        imgClick(url) {
            this.srcList = [url]
            console.log('pppppppppppppp')
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
            console.log(row)
            this.rowLenght = row.length
            this.rowObj = row[0]
            console.log(this.rowObj)
        },
        //获取下拉列表   selectorCompany   masterData_staff_selector
        getStatusList() {
            //masterData_company_selector
            let data = {}
            this.request('queryProcessStatus', data, true).then((res) => {
                if (res.code == 1) {
                    this.statusList = res.data
                }
            })
        },
        onReset() {
            this.formSearch = {}
        },
        getData() {
            this.logList = []
            let data = Util.deepClone(this.formSearch);
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('report_queryReport', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }
            })
        },
        getLoglist(taskNo) {
            let data = {}
            data.taskNo = taskNo
            this.request('report_queryReportDetail', data, true).then((res) => {
                if (res.code == 1) {
                    this.logList = res.data
                }else{
                    this.logList = []
                }
            })
        },
        showLog(row) {
            this.getLoglist(row.taskNo)
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.getData()
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

.el-table__header-wrapper {

    width: 99.9% !important;

}
.el-icon-circle-close:before {
 color:white
}
</style>

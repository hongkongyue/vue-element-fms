<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition">
            <!-- <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">确认</Button>
            </div> -->
            <!-- <Table :columns="columns" size="small" highlight-row :data="list" @on-row-dblclick="edit"></Table>
                    <Table style="margin-top:20px"  :columns="columns1" size="small" highlight-row :data="list1" @on-row-dblclick="edit"></Table>
                     -->
            <el-table ref="multipleTable" :data="tableData" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="taskNo" label="任务流编号" min-width="90" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="processStatus" label="流程状态" align="center" min-width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="initiateUserName" label="品牌发起人" min-width="90" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="initiateDepartmentName" label="发起部门" min-width="80" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="majorClasses" label="面/辅料" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="kinds" label="面辅料品类分类" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="specialCategory" label="是否特殊工艺" min-width="120" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
                </el-table-column>
                <el-table-column prop="specialProcessCategory" label="特俗工艺类目" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="styleImg" label="样品图1" min-width="80" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.styleImg" @click="imgClick(scope.row.styleImg)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg" >
                        <el-image style="width: 40px; height: 40px" :src = noneUrl></el-image>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="styleImg2" label="样图2" min-width="80" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.styleImg2" @click="imgClick(scope.row.styleImg2)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg2" >
                       <el-image style="width: 40px; height: 40px" :src = noneUrl></el-image>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="realMaterial" label="是否有实物" min-width="90" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.realMaterial == 1 ? '是' : '否'}}</template>
                </el-table-column>
                <el-table-column prop="contrastColor" label="是否撞色" min-width="150" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.contrastColor == 1 ? '是' : '否'}}</template>
                </el-table-column>
                <el-table-column prop="developer" label="开发员" min-width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="submitTime" label="提交日期" min-width="80" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="requireDate" label="要求完成日期" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sendInspectDate" label="送检日期" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div style="height:40px"></div>
            <el-table ref="multipleTable" :data="tableDetail" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
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
        </Row>
        
    </Content>
</Layout>
</template>

<script>
import Util from 'libs/util';
import axios from 'axios';

export default {
    name: 'personComplete',
    data() {
        return {
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            testList:[{name:'合格',id:'1'},{name:'不合格',id:'0'}],
            basicUserName: '',
            addformdata: {},
            turnData: {},
            personList: [], //开发员
            tableData: [],
            tableDetail:[],
            srcList: [],
            formSearch: {},
            visible: false,
            turnvisible: false,
        }
    },
    mounted() {
        this.getData()
        this.getDetailData()
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
    },
    methods: {
        imgClick(url) {
            this.srcList = [url]
            console.log('pppppppppppppp')
        },
        //主表
        getData() {
            let data = {}
            data.taskNo = this.$route.query.taskDetailId
            this.request('specialPricingDetail', data, false).then((res) => {
                if (res.code == 1) {
                    this.tableData = [res.data]
                }
            })
        },
        //子表   
        getDetailData(){
            let data = {}
            data.taskNo = this.$route.query.taskDetailId
            this.request('fabric_developMaterialEnter_detail', data, false).then((res) => {
                if (res.code == 1) {
                    this.tableDetail = [res.data]
                }
            })
        },
    }
}
</script>

<style>
.el-icon-circle-close:before {
 color:white
}
</style>
<style>
 .el-image-viewer__close{
        color:#fff!important;
    }
.el-image-viewer__prev,.el-image-viewer__next{
     display: none;
}
</style>

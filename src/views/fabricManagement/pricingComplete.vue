<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <!-- <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">核价结果</Button>
            </div> -->
            <!-- <Table :columns="columns" size="small" highlight-row :data="list" @on-row-dblclick="edit"></Table>
                    <Table style="margin-top:20px"  :columns="columns1" size="small" highlight-row :data="list1" @on-row-dblclick="edit"></Table>
                     -->
            <el-table ref="multipleTable" :data="tableData" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="taskNo" label="开发任务编号" min-width="90" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="processStatus" label="流程状态" align="center" min-width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="initiateUserName" label="发起人" min-width="90" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="initiateDepartmentName" label="发起部门" min-width="80" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="majorClasses" label="物料类型" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="kinds" label="品类分类" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="specialCategory" label="是否特殊工艺" min-width="120" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
                </el-table-column>
                <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
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
                <el-table-column prop="inspectResult" label="检测结果" min-width="140" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.inspectResult ? (scope.row.inspectResult == 1 ? '合格' : '不合格') : ''}}</template>
                </el-table-column>
                <el-table-column prop="inspectUser" label="检测人员" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="inspectTime" label="检测时间" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="price" label="核准价格（元/米）" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="pricingUser" label="核价人员" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="pricingTime" label="核价时间" min-width="140" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </Row>
    </Content>
</Layout>
</template>

<script>
import Util from 'libs/util';
import axios from 'axios';
import {burypoint} from 'mixins/burypoint'
import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce,burypoint],
    name: 'pricingConduct',
    data() {
        return {
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            addformdata: {},
            tableData: [],
            srcList: [],
            visible: false,
            userInfo:{},
        }
    },
    mounted() {
        this.getData()
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
    },
    methods: {
        imgClick(url) {
            this.srcList = [url]
            console.log('pppppppppppppp')
        },
        getData() {
            let data = {}
            data.taskNo = this.$route.query.taskDetailId
            this.request('queryPricingDetail', data, false).then((res) => {
                if (res.code == 1) {
                    this.tableData = [res.data]
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

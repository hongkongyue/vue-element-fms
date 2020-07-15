<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">检测结果</Button>
            </div>
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
        </Row>
        <Modal v-model="visible" :styles="mystyle" title="检测结果" @on-cancel='submitCancel' :width="410" @on-ok="submitSave" class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                    <Col span="24">
                    <el-form-item label="检测结果" size="small" label-width="120px">
                        <el-select v-model="addformdata.testing" style="width:150px" filterable>
                            <el-option v-for="v in testList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                    </Col>
                    <Col span="24">
                    <el-form-item style="padding-left:115px">
                        <Button type="primary" @click="submitSave()">确认</Button>
                        <Button type="default" @click="submitCancel">取消</Button>
                    </el-form-item>
                    </Col>
                </el-form>
            </Row>
            <div slot="footer"></div>
        </Modal>
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
    name: 'testingConduct',
    data() {
        return {
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            testList:[{name:'合格',id:'1'},{name:'不合格',id:'0'}],
            basicUserName: '',
            addformdata: {},
            turnData: {},
            personList: [], //开发员
            tableData: [],
            srcList: [],
            formSearch: {},
            visible: false,
            turnvisible: false,
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
            data.taskDetailId = this.$route.query.taskDetailId
            this.request('fabricDevelopCheck_detail', data, false).then((res) => {
                if (res.code == 1) {
                    this.tableData = [res.data]
                }
            })
        },
        //检测合格
        submit() {
            this.setBuryPoint('检测结果')
            this.visible = true
            this.addformdata.requireDate = Util.currentDate()
        },
        //检测合格确认
        submitSave() {
            console.log(this.addformdata.testing,'-------')
            if(this.addformdata.testing == undefined){
                this.$message.error('请先选择检测结果');
            }else{
                let getId = this.$route.query.taskDetailId
                let data = Util.deepClone(this.tableData[0]);
            data.verify = this.addformdata.testing
            data.taskDetailId =  Number(this.$route.query.taskDetailId)
            console.log(data)
            this.request('fabricDevelopCheck_verfiy', data, true).then((res) => {
                if (res.code == 1) {
                    // this.getData()
                    this.$message.success(res.msg);
                    this.visible = false
                    if(this.addformdata.testing == 1){
                        // this.$root.eventHub.$emit('closePageFromOtherPage', 'testingConduct'); //关闭新增页面
                        // setTimeout(()=>{ 
                            this.$root.eventHub.$emit('closePageFromOtherPage', 'testingConduct')
                            //   },200); //关闭新增页面
                                    this.$router.push({
                                        name: 'testingComplete',
                                        query:{
                                            taskDetailId: getId,
                                        }
                                    });
                    }else{
                        // setTimeout(()=>{ 
                            this.$root.eventHub.$emit('closePageFromOtherPage', 'testingConduct')
                            //   },200); //关闭新增页面
                        // this.$root.eventHub.$emit('closePageFromOtherPage', 'testingConduct'); //关闭新增页面
                                    this.$router.push({
                                        name: 'testingList'
                                    });
                    }
                     this.addformdata = {}
                }else{
                    this.$message.error(res.msg)
                }
            })
            }
        },
        //取消检测
        submitCancel() {
            this.visible = false
            this.addformdata = {}
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

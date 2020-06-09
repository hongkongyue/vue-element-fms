<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">确认</Button><Button type="primary" @click="turnAlround">转交</Button>
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
                <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="styleImg" label="样品图1" min-width="80" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.styleImg" @click="imgClick(scope.row.styleImg)">
                            <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                            </el-image>
                        </div>
                        <div v-if="!scope.row.styleImg">
                            <el-image style="width: 40px; height: 40px" :src=noneUrl></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="styleImg2" label="样图2" min-width="80" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <!-- <div @click="imgClick(scope.row.styleImg2)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div> -->
                        <div v-if="scope.row.styleImg2" @click="imgClick(scope.row.styleImg2)">
                            <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                            </el-image>
                        </div>
                        <div v-if="!scope.row.styleImg2">
                            <el-image style="width: 40px; height: 40px" :src=noneUrl></el-image>
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
            </el-table>
        </Row>
        <Modal v-model="visible" :styles="mystyle" title="确认" @on-cancel='submitCancel' :width="1210" @on-ok="submitSave" class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                    <Col span="6">
                     <span style="position:relative;top:10px;left:34px;color:red">*</span>
                    <el-form-item label="送检日期：" size="small" label-width="120px">
                        <DatePicker v-model="addformdata.requireDate" type="date" style="width: 150px">
                        </DatePicker>
                    </el-form-item>
                    </Col>
                     
                    <Col span="18">
                    <span style="position:relative;top:10px;left:0px;color:red">*</span>
                    <el-form-item label="是否加急：" size="small">
                         <el-select v-model="urgentStr"  filterable  placeholder="请选择" style="width:120px">
                                <el-option v-for="item in urgentList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                         </el-select>
                    </el-form-item>
                    <span style="position:relative;top:10px;left:35px;color:red">*</span>
                    <el-form-item label="检测说明：" size="small" label-width="120px">
                        <el-input type="textarea" style="width:400px" :rows="2" placeholder="请输入内容" v-model="description">
                        </el-input>
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="任务流编号：" size="small" label-width="120px">
                        {{this.tableData[0].taskNo}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="流程状态：" size="small" label-width="120px">
                        {{this.tableData[0].processStatus}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="品牌发起人：" size="small" label-width="120px">
                        {{this.tableData[0].initiateUserName}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="发起部门：" size="small" label-width="120px">
                        {{this.tableData[0].initiateDepartmentName}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="面/辅料：" size="small" label-width="120px">
                        {{this.tableData[0].majorClasses}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="面辅料品类分类：" size="small" label-width="130px">
                        {{this.tableData[0].kinds}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="是否特殊工艺：" size="small" label-width="120px">
                        {{this.tableData[0].specialCategory== 1 ? '是' : '否'}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="特殊工艺类目：" size="small" label-width="120px">
                        {{this.tableData[0].specialProcessCategory}}
                    </el-form-item>
                    </Col>
                    
                    <Col span="6">
                    <el-form-item label="是否有实物：" size="small" label-width="120px">
                        {{this.tableData[0].contrastColor == 1 ? '是' : '否'}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="开发员：" size="small" label-width="120px">
                        {{this.tableData[0].developer}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="提交日期：" size="small" label-width="120px">
                        {{this.tableData[0].submitTime}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="要求完成日期：" size="small" label-width="120px">
                        {{this.tableData[0].requireDate}}
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="样品图1：" size="small" label-width="120px">
                        <el-image v-if="this.tableData[0].styleImg" style="width: 40px; height: 40px" :src="this.tableData[0].styleImg" :preview-src-list="[this.tableData[0].styleImg]">
                            </el-image>
                            <el-image v-if="!this.tableData[0].styleImg" style="width: 40px; height: 40px" :src=noneUrl></el-image>
                    </el-form-item>
                    </Col>
                    <Col span="6">
                    <el-form-item label="样图2：" size="small" label-width="120px">
                        <el-image v-if="this.tableData[0].styleImg2" style="width: 40px; height: 40px" :src="this.tableData[0].styleImg2" :preview-src-list="[this.tableData[0].styleImg2]">
                        </el-image>
                        <el-image v-if="!this.tableData[0].styleImg2" style="width: 40px; height: 40px" :src=noneUrl></el-image>
                    </el-form-item>
                    </Col>
                </el-form>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="submitSave()">确认</Button>
                <Button type="default" @click="submitCancel">取消</Button>
            </div>
        </Modal>

        <Modal v-model="turnvisible" :styles="mystyle" title="转交" @on-cancel='turnCancel' :width="410" @on-ok="turnSave" class-name="customize-modal-center">
            <Row class="margin-bottom-10 background-color-white exhibition">
                <el-form :inline="true" ref="ruleForm" :model="turnData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                    <Col span="24">
                    <el-form-item label="开发员" size="small" label-width="120px">
                        <el-select v-model="turnData.developer" @change="changedeveloper(turnData.developer)" style="width:150px" filterable>
                            <el-option v-for="v in personList" :key="v.id" :label="v.basicUserName" :value="v.basicUserId"></el-option>
                        </el-select>
                    </el-form-item>
                    </Col>
                    <Col span="24">
                    <el-form-item style="padding-left:115px">
                        <Button type="primary" @click="turnSave()">确认</Button>
                        <Button type="default" @click="turnCancel">取消</Button>
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

import {
    debounce
} from 'mixins/debounce'
export default {
    mixins: [debounce],
    name: 'developConfirmConduct',
    data() {
        return {
            urgentStr:'',
            urgentList:[ {label:'是',    value:'1' },
                          {label:'否',    value:'0'},
                          ],
            description:'',
            noneUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            goodsList: [],
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
            this.request('queryConfirmTask', data, false).then((res) => {
                if (res.code == 1) {
                    this.tableData = res.data
                }
            })
        },
        //确认
        submit() {
            this.visible = true
            this.addformdata.requireDate = Util.currentDate()
        },
        //保存确认
        submitSave() {
            if(!this.addformdata.requireDate){
                this.$message.warning('请选择送检日期')
            }else if(!this.urgentStr){
                this.$message.warning('请选择是否加急')
            }else if(!this.description || this.description == ''){
                this.$message.warning('请输入检测说明')
            }else{
            let getId = this.$route.query.taskDetailId
            let data = Util.deepClone(this.tableData[0]);
            data.description = this.description //检测说明
            data.urgent=this.urgentStr
            data.sendInspectDate = Util.dateFormat(this.addformdata.requireDate, 'yyyy-MM-dd')
            data.taskDetailId = Number(this.$route.query.taskDetailId)
            console.log(data)
            this.request('inspectConfirmTask', data, true).then((res) => {
                if (res.code == 1) {
                    // this.getData()
                    this.$message.success(res.msg)
                    this.visible = false
                    this.addformdata = {} //
                    this.description=''
                    this.urgentStr=''
                    this.$root.eventHub.$emit('closePageFromOtherPage', 'developConfirmConduct')
                    this.$router.push({
                        name: 'developConfirmComplete',
                        query: {
                            taskDetailId: getId,
                        }
                    });
                    //  setTimeout(()=>{ 

                    //  },200); //关闭新增页面

                } else {
                    this.$message.error(res.msg)
                }
            })
            }
        },
        //取消确认
        submitCancel() {
            this.description=''
            this.urgentStr=''
            this.visible = false
            this.addformdata = {}
        },
        //转交
        turnAlround() {
            this.turnvisible = true
            let data = {}
            this.request('queryNextId', data, true).then((res) => {
                if (res.code == 1) {
                    // this.queryNextId = 
                    this.getPersonList(res.data)
                    // this.personList = res.data
                }
            })
        },
        //确认转交
        turnSave() {
            console.log(this.turnData.developer)
            let data = Util.deepClone(this.tableData[0]);
            data.developer = this.basicUserName
            data.developerId = this.turnData.developer
            data.taskDetailId = this.$route.query.taskDetailId
            this.request('deliverConfirmTask', data, true).then((res) => {
                if (res.code == 1) {
                    // this.getData()
                    this.turnvisible = false
                    this.turnData = {}
                    this.$message.success(res.msg)
                    this.$root.eventHub.$emit('closePageFromOtherPage', 'developConfirmConduct'); //关闭新增页面
                    this.$router.push({
                        name: 'developConfirmList'
                    });
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        changedeveloper(id) {
            console.log(id)
            let developname = ''
            this.personList.map(item => {
                if (id == item.basicUserId) {
                    developname = item.basicUserName
                }
            });
            this.basicUserName = developname
        },
        //取消转交
        turnCancel() {
            this.turnvisible = false
            this.turnData = {}
        },
        //获取人员下拉
        getPersonList(id) {
            let data = {}
            data.taskConfigurationId = id
            this.request('getListByTaskConfigurationId', data, true).then((res) => {
                if (res.code == 1) {
                    this.personList = res.data
                }
            })
        },
    }
}
</script>

<style>
.el-icon-circle-close:before {
    color: white
}
</style><style>
.el-image-viewer__close {
    color: #fff !important;
}

.el-image-viewer__prev,
.el-image-viewer__next {
    display: none;
}
</style>

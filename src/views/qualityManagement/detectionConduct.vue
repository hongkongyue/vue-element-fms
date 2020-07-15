<template>
<Layout>
    <Content>
        
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submitConfirm">提交</Button>
            </div>
            <h3>检测任务详情</h3>
            <el-form :inline="true" :model="formObj" label-width="120px" class="demo-form-inline ">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="检测任务编号：" size="small">
                            {{this.formObj.taskNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发起人：" size="small">
                            {{this.formObj.initiatingPromoter}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发起部门：" size="small">
                            {{this.formObj.initiatingDepartment}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="样品来源：" size="small">
                            {{this.formObj.sampleSource}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否有实物：" size="small">
                            {{this.formObj.realMaterial == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否撞色：" size="small">
                            {{this.formObj.contrastColor == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" v-if="!bigGoods">
                        <el-form-item label="开发员：" size="small">
                            {{this.formObj.developer}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods">
                        <el-form-item label="品类分类：" size="small">
                            {{this.formObj.kinds}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods && !bAddColor">
                        <el-form-item label="特殊工艺类目：" size="small">
                            {{this.formObj.specialProcessCategory}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods">
                        <el-form-item label="物料类型：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods && !!bAddColor">
                        <el-form-item label="物料编号：" size="small">
                            {{this.formObj.materialNo}}
                        </el-form-item>
                    </el-col>
                    <!-- 大货 -->
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="大货款号：" size="small">
                            {{this.formObj.goodsNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="大货批次：" size="small">
                            {{this.formObj.batchNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods || aDevelop">
                        <el-form-item label="设计款号：" size="small">
                            {{this.formObj.designNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="颜色：" size="small">
                            {{this.formObj.styleColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="下单总数：" size="small">
                            {{this.formObj.purchaseQty}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="使用部位：" size="small">
                            {{this.formObj.usingPart}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bDevelop" >
                        <el-form-item label="供应商：" size="small">
                            {{this.formObj.supplier}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="物料编号+色号：" size="small">
                            {{this.formObj.materialNoPlusColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="样品类别：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="bigGoods">
                        <el-form-item label="样品名称：" size="small">
                            {{this.formObj.kinds }}{{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="织法：" size="small">
                            {{this.formObj.weaveMethod}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="检测要求：" size="small">
                            {{this.formObj.description}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods">
                        <el-form-item label="图1：" size="small">
                            <el-image style="width: 40px; height: 40px" :src="this.formObj.styleImg" :preview-src-list="[this.formObj.styleImg]">
                            </el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!bigGoods && bDevelop">
                        <el-form-item label="图2：" size="small">
                            <el-image style="width: 40px; height: 40px" :src="this.formObj.styleImg2" :preview-src-list="[this.formObj.styleImg2]">
                            </el-image>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="8">
                        <el-form-item label="受理说明：" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" disabled placeholder="请输入内容" v-model="formObj.acceptRemark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="预判成分：" size="small">
                            <el-input type="textarea" placeholder="请输入内容" disabled :autosize="{ minRows: 3, maxRows: 4}" v-model="formObj.forecastIngredient" maxlength="15" show-word-limit></el-input>
                        </el-form-item>
                    </el-col>
                   <!-- <el-col :span="8" v-if="!bigGoods && bDevelop">
                        <el-form-item label="织法：" size="small">
                            <div style="width:180px;height:100px;border:1px solid #eee;padding:3px 3px;overflow-y:auto">
                                <el-radio-group v-model="formObj.weaveMethod" disabled v-for="v in weaveMethodList" :key="v.label">
                                    <el-radio style="padding-left:10px" :label="v.name">{{v.name}}</el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="!bigGoods && !bDevelop">
                        <el-form-item label="织法：" size="small">
                            <div style="width:180px;height:100px;border:1px solid #eee;padding:3px 3px;overflow-y:auto">
                                <el-radio-group v-model="formObj.weaveMethod" disabled v-for="v in weaveMethodList" :key="v.label">
                                    <el-radio style="padding-left:10px" :label="v.name">{{v.name}}</el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                    </el-col>-->
                </el-row>
            </el-form>
            <el-divider></el-divider>
             <div style="display: inline-flex"><h3>检测项目</h3>  <Button style="margin-left:20px" type="primary" @click="submit">保存</Button></div>
            <el-table ref="multipleTable" :data="innterList" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column prop="basicQcItemContent" min-width="100" label="检测项目" align="center"></el-table-column>
                <el-table-column prop="internalInspectResult" label="内检是否合格" min-width="90" align="center" show-overflow-tooltip>
                     <template slot-scope="scope">
                               <el-radio-group v-model="scope.row.internalInspectResult">
                                            <el-radio :label="2">合格</el-radio>
                                            <el-radio :label="1">不合格</el-radio>
                                </el-radio-group>
                     </template>
                </el-table-column>
                <el-table-column prop="internalRemark" label="说明" align="center" min-width="80" show-overflow-tooltip>
                             <template slot-scope="scope">
                                     <el-input type="text"  placeholder="请输入内容" v-model.trim="scope.row.internalRemark"></el-input>
                             </template>
                </el-table-column>
            </el-table>
             <el-table ref="multipleTable" :data="outerList" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column prop="basicQcItemContent" min-width="100" label="检测项目" align="center"></el-table-column>
                <el-table-column prop="outsideInspectResult" label="外检是否合格" min-width="90" align="center" show-overflow-tooltip>
                             <template slot-scope="scope">
                                    <el-radio-group v-model="scope.row.outsideInspectResult">
                                             <el-radio :label="2">合格</el-radio>
                                             <el-radio :label="1">不合格</el-radio>
                                    </el-radio-group>
                            </template>
                </el-table-column>
                <el-table-column prop="outsideRemark" label="说明" align="center" min-width="80" show-overflow-tooltip>
                            <template slot-scope="scope">
                                     <el-input type="text"  placeholder="请输入内容" v-model.trim="scope.row.outsideRemark"></el-input>
                            </template>
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
    name: 'detectionConduct',
    data() {
        return {
            bDevelop:false,//面料开发（B类开发）
            bAddColor:false,//B类加色
            aDevelop:false,//A类开发
            bigGoods:false, //判断任务类型
            weaveMethodList:[],
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            testList:[{name:'合格',id:'1'},{name:'不合格',id:'0'}],
            basicUserName: '',
            addformdata: {},
            formObj:{},
            turnData: {},
            radio:9,
            personList: [], //开发员
            tableData: [],
            srcList: [],
            formSearch: {},
            visible: false,
            turnvisible: false,
            innterList:[],
            outerList:[],
            fabricDevelopCheckTaskDetailId:'',
        }
    },
    mounted() {
        this.getWeaveMethod()
        this.getData(),
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
    },
    methods: {
        getWeaveMethod(){
            this.request('getWeaveMethod', {}, false).then((res) => {
                if (res.code == 1) {
                    this.weaveMethodList = res.data
                }
            })
        },
        getData() {
            let data = {}
            data.taskFlowId = this.$route.query.checkListMainId
            data.taskStatus = this.$route.query.status
            data.taskType = this.$route.query.taskType
            this.request('showTaskNode', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.sampleSource == 'A类开发') {
                        this.bigGoods = false
                        this.aDevelop = true
                    }else if (res.data.sampleSource == 'B类加色') {
                        this.bAddColor = true
                        this.bigGoods = false
                    }else if (res.data.sampleSource == 'B类开发') {
                        this.bigGoods = false
                        this.bDevelop = true
                    } else {
                        this.bigGoods = true
                    }
                    this.fabricDevelopCheckTaskDetailId=res.data.fabricDevelopCheckTaskDetailId
                    this.formObj=res.data
                    this.innterList=this.formObj.inDetails
                    this.outerList=this.formObj.outDetails
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        //检测合格 保存
        submit() {
            this.setBuryPoint('保存检测项目')
                for(let i=0,len=this.innterList.length;i<len;i++){
                    if(this.innterList[i].internalInspectResult==1&&!this.innterList[i].internalRemark){
                        return this.$message.error('内检不合格时，请填写说明信息')
                    }
                }
                  for(let i=0,len=this.outerList.length;i<len;i++){
                    if(this.outerList[i].outsideInspectResult==1&&!this.outerList[i].outsideRemark){
                        return this.$message.error('外检不合格时，请填写说明信息')
                    }
                }
                let arr=[...this.innterList,...this.outerList]
                let data={}
                    data.checkItemList = arr
                    data.acceptRemark = this.formObj.acceptRemark //受理说明
                    data.weaveMethod = this.formObj.weaveMethod // 织法
                    data.checkListMainId = this.$route.query.checkListMainId
                    data.fabricQcCheckListId = this.$route.query.checkListMainId
                    data.taskNodeStatus = this.$route.query.status
                    data.taskType = this.$route.query.taskType
                    data.taskNodeId = this.$route.query.id
                 this.request('updateTaskNode',data,false).then(res=>{
                       if(res.code==1){
                           this.$message.success('保存成功')
                       }else{
                           this.$message.error(res.msg)
                       }
                 })
        },
        afterConfirm(){
              for(let i=0,len=this.innterList.length;i<len;i++){
                    if(this.innterList[i].internalInspectResult==0) return  this.$message.error('请填写所有检测项')
                    if(this.innterList[i].internalInspectResult==1&&!this.innterList[i].internalRemark){
                        return this.$message.error('内检不合格时，请填写说明信息')
                    }
                }
                  for(let i=0,len=this.outerList.length;i<len;i++){
                        if(this.outerList[i].outsideInspectResult==0) return  this.$message.error('请填写所有检测项')
                    if(this.outerList[i].outsideInspectResult==1&&!this.outerList[i].outsideRemark){
                        return this.$message.error('外检不合格时，请填写说明信息')
                    }
                }
                let arr=[...this.innterList,...this.outerList]
                      
                let data={}
                    data.checkItemList = arr
                    data.acceptRemark = this.formObj.acceptRemark //受理说明
                    data.weaveMethod = this.formObj.weaveMethod // 织法
                    data.checkListMainId = this.$route.query.checkListMainId
                    data.fabricQcCheckListId = this.$route.query.checkListMainId
                    data.taskNodeStatus =2
                    data.taskType = this.$route.query.taskType
                    data.taskNodeId = this.$route.query.id
                    data.fabricDevelopCheckTaskDetailId=this.fabricDevelopCheckTaskDetailId
                    const{checkListMainId,taskType,id}=this.$route.query
                 this.request('updateTaskNode',data,false).then(res=>{
                       if(res.code==1){
                           this.$message.success('提交成功')
                           this.$root.eventHub.$emit('closePageFromOtherPage', 'detectionConduct')
                            this.$router.push({
                                        name: 'detectionComplete',
                                        query:{
                                            checkListMainId: checkListMainId,
                                            taskType:taskType,
                                            status:2,
                                            id:id
                                        }
                                    });

                       }else{
                           this.$message.error(res.msg)
                       }
                 })  
        },
        //检测合格  提交
        submitConfirm() {
            this.setBuryPoint('提交')
            this.$confirm('提交操作不可逆, 是否继续?', '提交确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                       this.afterConfirm()
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                });          
                });
            
        },
        //取消检测
        submitCancel() {
            this.visible = false
            this.addformdata = {}
        },
    }
}
</script>

<style lang="less" scoped>
.el-form-item--small.el-form-item {
    margin-bottom: 0px!important;
}
.el-icon-circle-close:before {
 color:white
}
</style>
<style>
.el-form-item--small.el-form-item {
    margin-bottom: 2px!important;
}
 .el-image-viewer__close{
        color:#fff!important;
    }
.el-image-viewer__prev,.el-image-viewer__next{
     display: none;
}
</style>

<template>
<Layout>
    <Content>
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">提交</Button>
            </div>
            <h3>检测任务详情</h3>
            <el-form :inline="true" :model="formData" label-width="120px" class="demo-form-inline ">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="任务编号：" size="small">
                            {{this.formObj.taskNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="品牌发起人：" size="small">
                            {{this.formObj.initiatingPromoter}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="发起部门：" size="small">
                            {{this.formObj.initiatingDepartment}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="样品来源：" size="small">
                            {{this.formObj.sampleSource}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="开发员：" size="small">
                            {{this.formObj.developer}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="面料品类分类：" size="small">
                            {{this.formObj.kinds}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="特殊工艺类目：" size="small">
                            {{this.formObj.specialProcessCategory}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="面/辅料：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="是否有实物：" size="small">
                            {{this.formObj.realMaterial == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="是否撞色：" size="small">
                            {{this.formObj.contrastColor == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="图1：" size="small">
                             <el-image  style="width: 40px; height: 40px" :src="this.formObj.styleImg" :preview-src-list="[this.formObj.styleImg]">
                        </el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="!bigGoods">
                        <el-form-item label="图2：" size="small">
                            <el-image style="width: 40px; height: 40px" :src="this.formObj.styleImg2" :preview-src-list="[this.formObj.styleImg2]">
                        </el-image>
                        </el-form-item>
                    </el-col>

                    <!-- 大货 -->
                     <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="大货款号：" size="small">
                            {{this.formObj.goodsNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="大货批次：" size="small">
                            {{this.formObj.batchNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" >
                        <el-form-item label="设计款号：" size="small">
                            {{this.formObj.designNo}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="颜色：" size="small">
                            {{this.formObj.styleColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="下单总数：" size="small">
                            {{this.formObj.purchaseQty}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" v-if="bigGoods">
                        <el-form-item label="使用部位：" size="small">
                            {{this.formObj.usingPart}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" v-if="bigGoods">
                        <el-form-item label="供应商：" size="small">
                            {{this.formObj.supplier}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="物料编号+色号：" size="small">
                            {{this.formObj.materialNoPlusColor}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="样品类别：" size="small">
                            {{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-if="bigGoods">
                        <el-form-item label="样品名称：" size="small">
                            {{this.formObj.kinds }}{{this.formObj.majorClasses}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="bigGoods">
                        <el-form-item label="织法：" size="small">
                            {{this.formObj.weaveMethod}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                        <el-form-item label="检测说明：" size="small">
                            {{this.formObj.description}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="受理说明：" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  placeholder="请输入内容" v-model="formObj.acceptRemark">
                            </el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="!bigGoods">
                        <el-form-item label="织法：" size="small">
                            <div  style="width:180px;height:100px;border:1px solid #eee;padding:3px 3px;overflow-y:auto">
                                       <el-radio-group v-model="formObj.weaveMethod" v-for="v in weaveMethodList" :key="v.label">
                                            <el-radio style="padding-left:10px" :label="v.name">{{v.name}}</el-radio>
                                        </el-radio-group>
                                 </div>
                            <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input> -->

                        </el-form-item>
                    </el-col>
                    <!--  -->
                </el-row>
            </el-form>
            <el-divider></el-divider>
             <div style="display: inline-flex;"><h3>检测项目</h3>  <Button style="margin-left:20px" type="primary" @click="onSave">保存</Button></div>
             <el-table ref="multipleTable"  :data="tableData" style="width: 100%" border tooltip-effect="dark" max-height="220" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="basicQcItemContent" label="检测项目" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="internal" label="内检" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.internal"></el-checkbox>
                    </template>
            </el-table-column>
            <el-table-column prop="outside" label="外检" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.outside"></el-checkbox>
                    </template>
            </el-table-column>
        </el-table>
        </Row>
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
    name: 'toAcceptConduct',
    data() {
        return {
            weaveMethodList:[],
            formObj:{
            },
            bigGoods:false, //判断任务类型
            formData: {},
            noneUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            testList: [{
                name: '合格',
                id: '1'
            }, {
                name: '不合格',
                id: '0'
            }],
            basicUserName: '',
            addformdata: {},
            turnData: {},
            personList: [], //开发员
            tableData: [{yearsCode:'23456',years:false}],
            srcList: [],
            formSearch: {},
            visible: false,
            turnvisible: false,
        }
    },
    mounted() {
        this.getWeaveMethod()
        this.getData()
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
                    if(res.data.sampleSource=='开发样'){
                        this.bigGoods=false
                    }else{
                         this.bigGoods=true
                    }
                    let list = res.data.details
                    list.map((item)=>{
                        if(item.internal == 1){
                            this.$set(item,'internal',true)
                        }else{
                            this.$set(item,'internal',false)
                        }
                        if(item.outside == 1){
                            this.$set(item,'outside',true)
                        }else{
                            this.$set(item,'outside',false)
                        }
                    })
                    this.tableData = list
                    this.formObj = res.data
                    // this.formObj.weaveMethod = res.data.weaveMethod
                }
            })
        },
        //保存
        onSave(){
            // 
             console.log(this.tableData,'7777')
              let sort=false;
             for(let i=0,len=this.tableData.length;i<len;i++){
                if(this.tableData[i].internal||this.tableData[i].outside){
                          sort=true
                        //   this.checkSubmit()
                          break        
                 }
             }
             if(sort) this.checkSubmit()
             else this.$message.error('需选择检测项目')
        },
        checkSubmit(){
                       let data = {}
                            data.checkItemList = this.tableData
                            data.acceptRemark = this.formObj.acceptRemark //受理说明
                            data.weaveMethod = this.formObj.weaveMethod // 织法
                            data.checkListMainId = this.$route.query.checkListMainId
                            data.fabricQcCheckListId = this.$route.query.checkListMainId
                            data.taskNodeStatus = this.$route.query.status
                            data.taskType = this.$route.query.taskType
                            data.taskNodeId = this.$route.query.id
                            this.request('updateTaskNode', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('保存成功')
                                }else{
                                    this.$message.error(res.msg)
                                }
                            })
        },
         checkAgain(){
              
              let row = this.$route.query
                    let data = this.formObj
                        data.checkItemList = this.tableData
                        data.acceptRemark = this.formObj.acceptRemark //受理说明
                        data.weaveMethod = this.formObj.weaveMethod // 织法
                        data.checkListMainId = this.$route.query.checkListMainId
                        data.fabricQcCheckListId = this.$route.query.checkListMainId
                        data.taskNodeStatus = 2
                        data.taskType = this.$route.query.taskType
                        data.taskNodeId = this.$route.query.id
                    this.request('updateTaskNode', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('提交成功')
                            this.$root.eventHub.$emit('closePageFromOtherPage', 'toAcceptConduct')
                            //   },200); //关闭新增页面
                            this.$router.push({
                                name: 'toAcceptComplete',
                                query: {
                                    id:row.id,
                                    checkListMainId: row.checkListMainId,
                                    status:2,
                                    taskType:row.taskType
                            }
                            });
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
         },
        //检测合格
        submit() {
            // if(this.formObj.weaveMethod == '' || this.formObj.weaveMethod == undefined){
            //     this.$message.error('请先')
            // }
            this.$confirm('确认提交吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                      let sort=false;
                     for(let i=0,len=this.tableData.length;i<len;i++){
                if(this.tableData[i].internal||this.tableData[i].outside){
                          sort=true
                        //   this.checkSubmit()
                          break        
                 }
             }
             if(sort) this.checkAgain()
             else this.$message.error('需选择检测项目')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        
    }
}
</script>

<style lang="less" scoped="scoped">
.el-form-item--small.el-form-item {
    margin-bottom: 0px!important;
}
.el-icon-circle-close:before {
 color:white
}
</style>
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

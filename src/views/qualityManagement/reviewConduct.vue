<template>
<Layout>
    <Content>
        
        <Row class="background-color-white exhibition" :style="{minHeight:showBink?'830px':'620px'}">
            <div style="margin-bottom :20px; height:50px;background-color:#f5f7f9;text-align:left;line-height:50px;font-size:16px; font-weight: bold;padding-left: 20px;">
                <Button type="primary" @click="submit">提交</Button>
            </div>
            <h3>检测任务详情</h3>
            <el-form :inline="true" :model="formData" label-width="120px" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="任务编号：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="品牌发起人：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发起部门：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="样品来源：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="开发员：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="面料品类分类：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="特殊工艺类目：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="面/辅料：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否有实物：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否撞色：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="图1：" size="small">
                                <el-image @click="clickImg(1)" style="width: 40px; height: 40px" :src="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591354209677&di=86122570cb3dc872b32873ea6a10142a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg'" :preview-src-list="['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591354209677&di=86122570cb3dc872b32873ea6a10142a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg']">
                                </el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="图2：" size="small">
                         <el-image @click="clickImg(1)" style="width: 40px; height: 40px" :src="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591354209677&di=86122570cb3dc872b32873ea6a10142a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg'" :preview-src-list="['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591354209677&di=86122570cb3dc872b32873ea6a10142a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg']">
                                </el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="受理说明:" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="织 法：" size="small">
                                  <div style="width:200px;height:60px;border:1px solid #eee;padding:3px 3px">
                                       <el-radio-group v-model="radio">
                                            <el-radio :label="3">备选项</el-radio>
                                            <el-radio :label="6">备选项</el-radio>
                                            <el-radio :label="9">备选项</el-radio>
                                            <el-radio :label="1">备选项</el-radio>
                                            <el-radio :label="2">备选项</el-radio>
                                            <el-radio :label="4">备选项</el-radio>
                                        </el-radio-group>
                                 </div>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="风评结果：" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
            </el-form>
            <!-- 另一种情况 -->
             <el-form :inline="true" :model="formData" label-width="120px" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="任务编号：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="品牌发起人：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发起部门：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="样品来源：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                <el-row> -->
                    <el-col :span="6">
                        <el-form-item label="大货批次：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="设计款号：" size="small">
                            {{12345}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="颜色：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="下单总数：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="使用部位：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="供应商：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="物料编号+色号：" size="small">
                            {{123456}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="样品类别" size="small">
                          {{133454}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="样品名称：" size="small">
                             {{'针织类'}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="织法：" size="small">
                              {{'针织类'}}
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-form-item label="受理说明：" size="small">
                                     <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input>
                            <el-image style="width: 40px; height: 40px" :src="scope" :preview-src-list="[scope]">
                            </el-image>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="6">
                        <el-form-item label="受理说明：" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input>

                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-form-item label="织法：" size="small">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                            </el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="6">
                        <el-form-item label="风评结果：" size="small">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2">
                          
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-divider></el-divider>
             <div style="display: inline-flex"><h3>检测项目</h3>  <Button style="margin-left:20px" type="primary" @click="submit">保存</Button></div>
            <el-table ref="multipleTable" :data="tableData" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column prop="index" min-width="100" label="检测项目" align="center"></el-table-column>
                <el-table-column prop="taskNo" label="内检是否合格" min-width="90" align="center" show-overflow-tooltip>
                     <template slot-scope="scope">
                               <el-radio-group v-model="scope.row.radio">
                                            <el-radio :label="1">合格</el-radio>
                                            <el-radio :label="2">不合格</el-radio>
                                </el-radio-group>
                     </template>
                </el-table-column>
                <el-table-column prop="processStatus" label="说明" align="center" min-width="80" show-overflow-tooltip>
                             <template slot-scope="scope">
                                     <el-input type="text"  placeholder="请输入内容" v-model.trim="scope.row.remark"></el-input>
                             </template>
                </el-table-column>
            </el-table>
             <el-table ref="multipleTable" :data="tableData" size="mini" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
                <el-table-column prop="index" min-width="100" label="检测项目" align="center"></el-table-column>
                <el-table-column prop="taskNo" label="外检是否合格" min-width="90" align="center" show-overflow-tooltip>
                             <template slot-scope="scope">
                                    <el-radio-group v-model="scope.row.radio">
                                            <el-radio :label="1">合格</el-radio>
                                            <el-radio :label="2">不合格</el-radio>
                                    </el-radio-group>
                            </template>
                </el-table-column>
                <el-table-column prop="remark" label="说明" align="center" min-width="80" show-overflow-tooltip>
                            <template slot-scope="scope">
                                     <el-input type="text"  placeholder="请输入内容" v-model.trim="scope.row.remark"></el-input>
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
    name: 'detectionConduct',
    data() {
        return {
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
            formData:{},
            turnData: {},
            radio:9,
            personList: [], //开发员
            tableData: [{yearsCode:'23456',years:false}],
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
        clickImg(url) {
            this.imgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591354209677&di=86122570cb3dc872b32873ea6a10142a&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg'
            console.log('pppppppppppppp',url)
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

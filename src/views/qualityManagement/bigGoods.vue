<template>
<div>
    <header id="header" class="headerstyle" v-if="!showhidden">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline " style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('检测新增') !== -1" size="small" type="primary" @click="onAdd('1')">检测新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('取消流程') !== -1" size="small" type="primary" @click="cancel">取消流程</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </div>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="创建人：" size="small">
                <!-- <el-input v-model="formSearch.developer" clearable placeholder="请输入" style="width:150px"></el-input> -->
                <el-select v-model="formSearch.developer" clearable placeholder="请选择" style="width:150px" filterable>
                                  <el-option v-for="v in developerList" :key="v"  :label="v"  :value="v"></el-option>
                              </el-select>
            </el-form-item>
            <el-form-item label="批次：" size="small">
                <el-input v-model="formSearch.batchNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="设计款号：" size="small">
                <el-input v-model="formSearch.designNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="任务编号：" size="small">
                <el-input v-model="formSearch.taskNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="检测结果：" size="small">
                <el-select v-model="formSearch.inspectResultStr" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in checkStatus" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务状态：" size="small">
                <el-select v-model="formSearch.flowStatus" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in taskStatus" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据来源：" size="small">
                <el-select v-model="formSearch.dataSource" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in dataSourceList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否加急：" size="small">
                <el-select v-model="formSearch.urgentStr" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in urgentList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

    </header>
    <section class="middle" :style="maxHeight">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-row>

            <el-col :span="24">
                <el-pagination style="text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table ref="multipleTable" @row-click="showLog" highlight-current-row :data="tableData" style="width: 100%" border tooltip-effect="dark" :height="oneTableHeight" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                    <el-table-column prop="taskNoGroup" label="任务编号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskNo" label="检测任务编号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="flowStatus" label="任务状态" sortable min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.flowStatus == 0 ? '待受理' : (scope.row.flowStatus == 1 ? '受理完成' :  (scope.row.flowStatus == 2 ? '检测完成' : '已取消'))}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="contrastColor" label="是否撞色" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="realMaterial" label="是否有实物" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="urgentStr" label="是否加急" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="inspectResultStr" label="检测结果" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="大货款号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="styleColor" label="颜色" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="batchNo" label="批次" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="designNo" label="设计款号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="purchaseQty" label="下单总数" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="supplier" label="供应商" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="supplierColor" label="供应商色号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="materialNoPlusColor" label="物料编码+色号" sortable min-width="160" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="usingPart" label="使用部位" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="dataSource" label="数据来源" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="description" label="检测要求" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="acceptRemark" label="受理说明" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="createUser" label="创建人" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="created" label="创建时间" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>

                </el-table>
                <p style="font-size:12px;">操作日志</p>
                <el-table :data="logList" style="width: 100%" border :height="twoTableHeight" tooltip-effect="dark">
                    <el-table-column prop="operator" label="操作员" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="80">
                        <template slot-scope="scope">{{scope.row.operateTime}}</template>
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="220" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
            </el-col>
        </el-row>

    </section>

    <!-- 新增弹框 -->
    <Modal v-model="visibleBig" @on-cancel="bigCancel" :styles="mystyle" :title="'大货物料检测'" :width="1180" class-name="customize-modal-center">
        <Row class="">
            <el-button size="small" type="primary" @click="onSubmitBig">提交</el-button>
            <el-button size="small" type="primary" @click="onseeMore">查询</el-button>
            <el-form :rules="rules" ref="ruleForm" label-width="120px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="24">
                <Col span="6">
                <el-form-item label="大货款号：" prop="bigGoods" size="small">
                    <el-input v-model="ruleForm.bigGoods" @change="changeBigGoods(ruleForm.bigGoods)" clearable placeholder="请输入" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="批次号：" prop="batchNo" size="small">
                    <el-select v-model="ruleForm.batchNo" @change="changeBizNo(ruleForm.batchNo)" filterable placeholder="请选择" style="width:170px">
                        <el-option v-for="item in bicNoList" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="颜色：" prop="colors" size="small">
                    <el-select v-model="ruleForm.colors" filterable multiple clearable placeholder="请选择" style="width:170px">
                        <el-option v-for="item in colorList" :key="item.styleColor" :label="item.styleColor" :value="item.styleColor"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="是否撞色：" prop="contrastColor" size="small">
                    <el-select v-model="ruleForm.contrastColor" filterable clearable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in yesNoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="是否有实物：" prop="realMaterial" size="small">
                    <el-select v-model="ruleForm.realMaterial" filterable clearable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in yesNoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="设计款号：" prop="designNo" size="small">
                    <el-input v-model="ruleForm.designNo" disabled clearable placeholder="请输入" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="24">
                <el-form-item label="检测要求：" prop="description" size="small">
                    <el-input v-model="ruleForm.description" type="textarea" clearable placeholder="请输入" style="width:850px"></el-input>
                </el-form-item>
                </Col>
                </Col>
            </el-form>
            <h3>物料明细</h3>
            <el-table ref="multipleTable" :data="tableAdd" style="width: 100%" border tooltip-effect="dark" :height="350" @selection-change="handleSelectionBig">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="styleColor" label="大货颜色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="majorClasses" label="项目" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialNoPlusColor" label="物料编码+色号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="internalInspectResult" label="内检结果" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="externalInspectResult" label="外检结果" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialName" label="物料名称" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialColor" label="颜色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplierColor" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplier" label="供应商" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="usingPart" label="使用部位" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="kinds" label="样品名称" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="weaveMethod" label="织法" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>

            </el-table>
        </Row>
        <div slot="footer">
        </div>
    </Modal>

    <!-- 新增弹框 -->
    <Modal v-model="visibleDesign" @on-cancel="designCancel" :styles="mystyle" :title="'设计款号物料检测'" :width="1180" class-name="customize-modal-center">
        <Row class="">
            <el-button size="small" type="primary" @click="onSubmitDesign">提交</el-button>
            <el-button size="small" type="primary" @click="onSeeDesign">查询</el-button>
            <el-form :rules="rulesDesign" ref="ruleFormDesign" label-width="120px" :model="ruleFormDesign" class="demo-ruleForm " :label-position="right">
                <Col span="24">
                <Col span="8">
                <el-form-item label="设计款号：" prop="designNo" size="small">
                    <el-input v-model="ruleFormDesign.designNo" @change="changeDesign(ruleFormDesign.designNo)" clearable placeholder="请输入" style="width:150px"></el-input>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="颜色：" prop="color" size="small">
                    <el-select v-model="ruleFormDesign.color" @change="changeDesignColor(ruleFormDesign.color)" filterable placeholder="请选择" style="width:170px">
                        <el-option v-for="item in colorList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="版样类别：" prop="simpleCategory" size="small">
                    <el-select v-model="ruleFormDesign.simpleCategory" filterable placeholder="请选择" style="width:170px">
                        <el-option v-for="item in simpleCategoryList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="24">
                <el-form-item label="检测要求：" prop="description" size="small">
                    <el-input v-model="ruleFormDesign.description" type="textarea" clearable placeholder="请输入" style="width:850px"></el-input>
                </el-form-item>
                </Col>
                </Col>
            </el-form>
            <h3>物料明细</h3>
            <el-table ref="multipleTable" :data="tableDesign" style="width: 100%" border tooltip-effect="dark" :height="350" @selection-change="handleSelectionDesign">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>

                <el-table-column prop="designNo" label="设计款号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="styleColor" label="设计款号颜色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="majorClasses" label="项目" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialNoPlusColor" label="物料编码+色号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialName" label="物料名称" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materialColor" label="颜色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplierColor" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplier" label="供应商" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="usingPart" label="使用部位" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="kinds" label="样品名称" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="weaveMethod" label="织法" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>

            </el-table>
        </Row>
        <div slot="footer">
        </div>
    </Modal>
</div>
</template>

<script>
import {
    commonMixins
} from 'mixins/common';
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [commonMixins,burypoint],
    data() {
        return {
            yesNoList:[{id:1,name:'是'},{id:0,name:'否'}],
            urgentList: [{
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                },
            ],
            dataSourceList: [{
                    label: '面料新开发',
                    value: '面料新开发'
                },
                {
                    label: '设计款号',
                    value: '设计款号'
                },
                {
                    label: '大货款号',
                    value: '大货款号'
                },
            ],
            checkStatus: [{
                    label: '全部',
                    value: ''
                },
                {
                    label: '检测中',
                    value: '0'
                },
                {
                    label: '不合格',
                    value: '1'
                },
                {
                    label: '合格',
                    value: '2'
                },
            ],
            taskStatus: [{
                    label: '待受理',
                    value: '0'
                },
                {
                    label: '受理完成',
                    value: '1'
                },
                {
                    label: '检测完成',
                    value: '2'
                },
                {
                    label: '已取消',
                    value: '4'
                },
                // {label:'风评完成',  value:'3'},
            ],
            selectDeisgn: [],
            simpleCategoryList: [],
            selectBig: [],
            colorList: [],
            bicNoList: [],
            tableDesign: [], //新增设计款号
            tableAdd: [], //新增大货物料
            visibleDesign: false,
            visibleBig: false,
            addpersonList: [],
            personList: [],
            departmentList: [],
            brandList: [],
            brandNewList: [],
            sendTypeList: [{
                name: '全部推送',
                id: 0
            }, {
                name: '按品牌推送',
                id: 1
            }],
            addtitle: '新增',
            dialogVisible: false,
            ruleForm: {
                bigGoods: '',
                batchNo: '',
                colors: [],
                designNo: '',
                num: '',
                simpleCategory: '',
                description: '',
                realMaterial:'',
                contrastColor:''
            },
            ruleFormDesign: {
                bigGoods: '',
                batchNo: '',
                color: '',
                designNo: '',
                num: '',
                simpleCategory: '',
                description: ''
            },
            rulesDesign: {
                
                bigGoods: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                batchNo: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                color: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                simpleCategory: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                designNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                num: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                description: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
            },
            rules: {
                contrastColor: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                realMaterial: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                bigGoods: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                batchNo: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                colors: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                simpleCategory: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                designNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                num: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                description: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
            },
            oneTableHeight: '',
            twoTableHeight: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'nameWithCount'
            },
            showhidden: false,
            formSearch: {},
            maxHeight: '',
            logList: [], //日志
            billNo: '',
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            pageSecond: false,
            clickTree: '',
            rowLenght: '',
            rowObj: {},
            selection: [],
            logPage: 1,
            developerList:[],
        }
    },
    created() {
        if (document.body.offsetHeight > 800) {
            this.oneTableHeight = (document.body.offsetHeight - 280) * 0.6
            this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
            this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
        } else {
            this.oneTableHeight = (document.body.offsetHeight - 280) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 280) * 0.27
            this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
        }
    },
    mounted() {
        this.getDeveloperList()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
         getDeveloperList() { //
            let data = {}
            this.request('fabric_getdeveloperList', data, false).then(res => {
                if (res.code == 1) {
                    this.developerList = res.data;
                }
            })
        },
        //检测申请取消功能
        cancel() {
            this.setBuryPoint('取消流程')
            let list = []
            this.selection.map((item) => {
                list.push(item.taskNo)
            })
            if (list.length > 0) {
                this.$confirm('取消选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.taskNos = list
                    this.request('fabric_cancelTask', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('取消成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            } else {
                this.$message.error("请先选择取消的数据！");
            }
        },
        bigCancel() {
            this.$refs['ruleForm'].resetFields();
            this.ruleForm = {
                bigGoods: '',
                batchNo: '',
                colors: [],
                designNo: '',
                num: '',
                simpleCategory: '',
                description: ''
            }
            this.bicNoList = []
            this.colorList = []
            this.tableAdd = []
            this.selectBig = []
            this.visibleBig = false
        },
        designCancel() {
            this.$refs['ruleFormDesign'].resetFields();
            this.ruleFormDesign = {
                bigGoods: '',
                batchNo: '',
                color: '',
                designNo: '',
                num: '',
                simpleCategory: '',
                description: ''
            }
            this.colorList = []
            this.simpleCategoryList = []
            this.tableDesign = []
            this.selectDeisgn = []
            this.visibleDesign = false
        },
        changeBigGoods(num) {
            this.ruleForm.batchNo = ''
            this.ruleForm.colors = ''
            this.ruleForm.designNo = ''
            this.bicNoList = []
            this.colorList = []
            let data = {}
            data.goodsNo = num
            this.request('goodsCheck_selector', data, true).then(res => {
                if (res.code == 1) {
                    this.bicNoList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        changeBizNo(biz) {
            this.ruleForm.colors = ''
            this.ruleForm.designNo = ''
            this.colorList = []
            let data = {}
            data.batchNo = biz
            data.goodsNo = this.ruleForm.bigGoods
            this.request('goodsCheck_selector', data, true).then(res => {
                if (res.code == 1) {
                    this.colorList = res.data
                    this.ruleForm.designNo = res.data[0].designNo
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //新增查询
        onseeMore() {
            if (!this.ruleForm.bigGoods) return this.$message.error('请输入大货款号')
            let data = this.ruleForm
            data.goodsNo = this.ruleForm.bigGoods
            this.request('goodsCheck_materielDetail', data, true).then(res => {
                if (res.code == 1) {
                    this.tableAdd = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleSelectionBig(row) {
            this.selectBig = row
            console.log(row, '-----------')
        },
        //新增大货物料提交
        onSubmitBig() {
            if (this.selectBig.length == 0) {
                this.$message.warning('请先勾选数据')
            } else {
                this.$refs['ruleForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) { //新增保存
                        let data = this.ruleForm
                        data.goodsNo = this.ruleForm.bigGoods
                        data.details = this.selectBig
                        // data.includeFabricDevelopData=false
                        this.request('goodsCheck_batchAdd', data, true).then(res => {
                            if (res.code == 1) {
                                this.$message.success('提交成功')
                                this.getData()
                                this.$refs['ruleForm'].resetFields();
                                this.bigCancel()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else { //验证表单
                        return false;
                    }
                });
            }
        },

        changeDesign(num) {
            this.ruleFormDesign.color = ''
            this.ruleFormDesign.simpleCategory = ''
            this.simpleCategoryList = []
            this.colorList = []
            let data = {}
            data.designNo = num
            this.request('goodsCheck_colorSelector', data, true).then(res => {
                if (res.code == 1) {
                    this.colorList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        changeDesignColor(color) {
            this.ruleFormDesign.simpleCategory = ''
            this.simpleCategoryList = []
            let data = {}
            data.designNo = this.ruleFormDesign.designNo
            data.styleColor = color
            this.request('goodsCheck_simpleCategorySelector', data, true).then(res => {
                if (res.code == 1) {
                    this.simpleCategoryList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        onSeeDesign() {
            let data = this.ruleFormDesign
            data.styleColor = this.ruleFormDesign.color
            if (!data.designNo) return this.$message.error('请输入设计款号')
            this.request('goodsCheck_design_materielDetail', data, true).then(res => {
                if (res.code == 1) {
                    this.tableDesign = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        onSubmitDesign() {
            if (this.selectDeisgn.length == 0) {
                this.$message.warning('请先勾选数据')
            } else {
                this.$refs['ruleFormDesign'].validate((valid) => {
                    console.log(valid)
                    if (valid) { //新增保存
                        let data = this.ruleFormDesign
                        data.styleColor = this.ruleFormDesign.color
                        data.details = this.selectDeisgn
                        this.request('goodsCheck_batchAdd', data, true).then(res => {
                            if (res.code == 1) {
                                this.$message.success('提交成功')
                                this.getData()
                                this.$refs['ruleFormDesign'].resetFields();
                                this.designCancel()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else { //验证表单
                        return false;
                    }
                });
            }
        },
        handleSelectionDesign(row) {
            this.selectDeisgn = row
        },
        handleShowHidden(name) {
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 110) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 110) * 0.25
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 110) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 110) * 0.27
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 280) * 0.6
                    this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 280) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 280) * 0.27
                }
            }
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
            this.selection = row
            this.rowLenght = row.length
            this.rowObj = row[0]
        },
        //异步导出
        onExport() {
            this.setBuryPoint('导出')
            let data = {}
            data.developer = this.formSearch.developer
            data.goodsNo = this.formSearch.goodsNo
            data.batchNo = this.formSearch.batchNo
            data.designNo = this.formSearch.designNo
            data.taskNo = this.formSearch.taskNo
            data.inspectResult = this.formSearch.inspectResultStr
            data.flowStatus = this.formSearch.flowStatus
            data.dataSource = this.formSearch.dataSource
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.urgent = this.formSearch.urgentStr
            data.includeFabricDevelopData = false
            this.request('goodsCheck_export', data, true).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getData() {
            this.logPage = 1
            this.logList = []
            let data = {}
            data.developer = this.formSearch.developer
            data.goodsNo = this.formSearch.goodsNo
            data.batchNo = this.formSearch.batchNo
            data.designNo = this.formSearch.designNo
            data.taskNo = this.formSearch.taskNo
            data.inspectResult = this.formSearch.inspectResultStr
            data.flowStatus = this.formSearch.flowStatus
            data.dataSource = this.formSearch.dataSource
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.urgent = this.formSearch.urgentStr
            data.includeFabricDevelopData = false
            this.request('goodsCheck_goodsQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                } else {
                    this.$message.error(res.msg)
                }
            })
        },

        getLoglist() {
            let data = {}
            data.billNo = "fabric_qc_flow_task_prefix_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()

        },
        showLog(row) {
            this.billNo = row.id
            this.getLoglist()
        },
        //部门
        getDepartmentList() {
            let data = {}
            data.parentName = '杭州全尚科技股份有限公司'
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.departmentList = res.data
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then((res) => {
                if (res.code == 1) {
                    let obj = {
                        name: '全部',
                        id: -1
                    }
                    this.brandList = [obj, ...res.data]
                    this.brandNewList = res.data
                }
            })
        },
        getplatformOptions() { //接收人
            this.request('sendDingTalkConfig_userSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.personList = res.data;
                }
            })
        },

        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        //人员部门联动
        changeAddDepartmeng(id) {
            this.ruleForm.person = ""
            let name
            this.departmentList.map((item) => {
                if (id == item.id) {
                    name = item.name
                }
            })
            let data = {}
            data.departmentName = name
            this.request('getByDepartment', data, true).then((res) => {
                if (res.code == 1) {
                    this.addpersonList = res.data
                } else {
                    this.$message.error(res.msg)
                    this.addpersonList = []
                }
            })
        },
        onAdd(name) {
            this.setBuryPoint('检测新增')
            if (name == '1') {
                this.visibleBig = true
            } else {
                this.visibleDesign = true
            }
        },
        //新增
        addSave() {
            let postUrl = ''
            let departmentObj = {}
            let personObj = {}
            let data = {}
            this.departmentList.map((i) => {
                if (this.ruleForm.department == i.id) {
                    departmentObj = i
                }
            })
            this.addpersonList.map((i) => {
                if (this.ruleForm.person == i.id) {
                    personObj = i
                }
            })
            if (this.addtitle == '新增') {
                postUrl = 'sendDingTalkConfig_add'
            } else {
                postUrl = 'sendDingTalkConfig_update'
                data.id = this.rowObj.id
            }
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    data.departmentId = this.ruleForm.department
                    data.departmentCode = departmentObj.code
                    data.departmentName = departmentObj.name
                    data.userId = this.ruleForm.person
                    data.userCode = personObj.staffCode
                    data.userName = personObj.userName
                    data.userEopId = personObj.eopUserId
                    data.sendType = this.ruleForm.sendType
                    data.adjustTypeCodes = this.ruleForm.workType
                    data.brandIds = this.ruleForm.brand
                    this.request(postUrl, data, true).then(res => {
                        if (res.code == 1) {
                            // this.pagesize= 10,
                            this.currentPage = 1,
                                this.$message.success('保存成功')
                            this.getData()
                            this.$refs['ruleForm'].resetFields();
                            this.dialogVisible = false
                            this.ruleForm = {
                                department: '',
                                person: '',
                                brand: '',
                                sendType: 0,
                                workType: ''
                            }
                            this.addpersonList = []
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        changeBrand(name) {
            if (name.length == 0) {
                this.ruleForm.sendType = 0
            } else {
                this.ruleForm.sendType = 1
            }
        },
        addCancel() {
            this.dialogVisible = false
            this.addpersonList = []
            this.ruleForm = {
                department: '',
                person: '',
                brand: '',
                sendType: 0,
                workType: ''
            }
            this.$refs['ruleForm'].resetFields();

        },
        //查询
        onSearch() {
            this.setBuryPoint('查询')
            this.currentPage = 1
            this.getData()

        },
        //重置
        onReset() {
            this.formSearch = {}
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
</style>

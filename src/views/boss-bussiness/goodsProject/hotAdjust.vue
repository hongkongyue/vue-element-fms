<template>
<div>
    <header id="header" class="headerstyle" v-if="!showhidden">
        <el-form  :inline="true" :model="formSearch" class="demo-form-inline " style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd('add')">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('下载模板') !== -1" size="small" type="primary" @click="downLoad">下载模板</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导入') !== -1" size="small" type="primary" @click="onUpload">导入</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('发起调整指令') !== -1" size="small" type="primary" @click="startAdjust">发起调整指令</el-button>
                </el-form-item>
            </div>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份：" size="small">
                <el-date-picker v-model="formSearch.years" type="year" style="width:150px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="季节：" size="small">
                <el-select v-model="formSearch.season" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="波段：" size="small">
                <el-select v-model="formSearch.waveBand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in waveList" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
                <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border tooltip-effect="dark" :height="oneTableHeight" @selection-change="handleSelectionChange">
                    <!-- <el-table-column type="selection" width="50">
                    </el-table-column> -->
                    <el-table-column type="index" width="50" label="序号" fixed="left" align="center"></el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" fixed="left" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="years" label="年份" min-width="80" fixed="left" sortable align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="season" label="季节" min-width="80" fixed="left" sortable align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="hotGoodsPlanningAmount" label="爆款规划金额" sortable min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.hotGoodsPlanningAmount}}</div> 
                                </template>
                    </el-table-column>
                    <el-table-column prop="firstOrderTotalAmount" label="首单下单总金额" sortable min-width="140" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.firstOrderTotalAmount}}</div> 
                                </template>
                    </el-table-column>
                    <el-table-column prop="adjustAmount" label="调整金额" sortable min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.adjustAmount}}</div> 
                                </template>
                    </el-table-column>
                    <el-table-column prop="afterAdjustAmount" label="调整后金额" sortable min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.afterAdjustAmount}}</div> 
                                </template>
                    </el-table-column>
                    <el-table-column prop="remainingAmount" label="剩余金额" sortable min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.remainingAmount}}</div> 
                                </template>
                    </el-table-column>
                </el-table>
                <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="明细" name="first">
                        <el-table :data="detailsData" style="width: 100%" border tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column type="index" width="55" label="序号" fixed="left" align="center"></el-table-column>
                            <el-table-column prop="secondLevel" label="二级品类" fixed="left" sortable align="center" min-width="100" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="thirdLevel" label="三级品类" fixed="left" sortable min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="waveBand" label="波段" fixed="left" sortable min-width="80" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="goodsNo" label="大货款号" fixed="left" sortable min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="color" label="颜色" sortable min-width="80" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderNumber" label="下单数量" sortable min-width="110" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="excludingTaxPurchaseUnitPrice" label="不含税成本" sortable min-width="120" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.excludingTaxPurchaseUnitPrice}}</div> 
                                </template>
                            </el-table-column>
                            <el-table-column prop="firstOrderAmount" label="首单下单金额" sortable min-width="120" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                     <div style="text-align:right">{{scope.row.firstOrderAmount}}</div> 
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="日志" name="second">
                        <el-table :data="logList" style="width: 100%" border :max-height="twoTableHeight" tooltip-effect="dark">
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
                        </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </section>

    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" :title="addtitle" :width="680" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" label-width="100px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="24">
                <Col span="12">
                <el-form-item label="品牌：" prop="brand" size="small">
                    <el-select v-model="ruleForm.brand" clearable filterable  placeholder="请选择" style="width:150px">
                        <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="年份：" prop="year" size="small">
                    <el-date-picker v-model="ruleForm.year" type="year" format="yyyy" style="width:150px" placeholder="选择年">
                </el-date-picker>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="12">
                <el-form-item label="季节：" prop="waveBand" size="small">
                    <el-select v-model="ruleForm.waveBand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="金额：" prop="money" size="small">
                    <el-input-number style="width:150px" v-model="ruleForm.money" size="mini" controls-position="right" :precision="2" :min="0" :max="1000000000"></el-input-number>
                </el-date-picker>
                </el-form-item>
                </Col>
                </Col>
                
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="addSave('ruleForm')">确认</Button>
            <Button type="default" @click="addCancel">取消</Button>
        </div>
    </Modal>

    <!--发起爆款调整-->
    <Modal v-model="startAdjustVisible" @on-cancel="cancelStartAdjust" title="发起爆款调整" :width="940">
        <el-form :rules="startAdjustRules" ref="startAdjustForm" label-width="120px" :model="startAdjustForm" class="demo-ruleForm " :label-position="right">
            <el-row>
            <el-col :span="8">
            <el-form-item label="品牌名称：" prop="brand" size="small">
                <el-select v-model="startAdjustForm.brand" clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="季节：" prop="season" size="small">
                <el-select v-model="startAdjustForm.season" clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
            <el-col :span="8">
            <el-form-item label="年份：" prop="year" size="small">
                <el-select v-model="startAdjustForm.year"  clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="24">
            <el-form-item label="调整建议：" prop="remark" size="small">
                <el-input type="textarea" maxlength="300" clearable  show-word-limit v-model="startAdjustForm.remark" placeholder="请输入" style="width:600px"></el-input>
            </el-form-item>
            </el-col>
            </el-row>

        </el-form>
        <div slot="footer">
            <Button type="default" @click="cancelStartAdjust">取消</Button>
            <Button type="primary" @click="saveStartAdjust">确定</Button>
        </div>
    </Modal>

    <!--导入文件-->
    <Modal v-model="uploadVisible" @on-cancel="cancelUpload" title="导入文件">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/payable/deductionAdvice/uploadAsync" :data="{}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelUpload">取消</Button>
            <Button type="primary" @click="saveUpload">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import filters from '../../../filter/'
import {
    commonMixins
} from 'mixins/common';
// import {
//     debounce
// } from 'mixins/debounce'
import Util from 'libs/util'
export default {
    mixins: [commonMixins],
    data() {
        return {
            detailsShow:false,
            uploadVisible:false,
            file:null,
            activeName:'first',
            detailsData:[],
            startAdjustVisible: false,
            startAdjustForm: {
                brand: '',
                season: '',
                year: '',
                remark: ''
            },
            startAdjustRules: {
                brand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                season: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                year: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                remark: [{
                    required: true,
                    message: '请输入调整建议',
                    trigger: 'blur'
                }, ]
            },
            personList: [],
            departmentList: [],
            brandList: [],
            brandNewList:[],
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
                brand:'',
                year:'',
                waveBand:'',
                money:''
            },
            rules: {
                brand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                year: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                waveBand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                money:[{ required: true, message: '请输入', trigger: 'blur' },]
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
            logPage:[],
        }
    },
    created(){
        if (document.body.offsetHeight > 800) {
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        } else {
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        }
    },
    mounted() {
        this.getYearList()
        this.getBrandList()
        this.getwaveBandList()
        this.getPlanningStatus()
        //this.getAdjustType()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        getwaveBandList(){
            let data = {}
            data.developTypeName = "爆款"
            this.request('waveBand_selector_masterData', data, true).then(res => {
                if (res.code == 1) {
                    this.waveList = res.data
                }
            })
        },
        handleShowHidden(name) {
            this.detailsShow = false
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.37
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
                }
            }
        },
        clickDetails(name){
            if(!this.showhidden){
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                }
            }
            }else{
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                }
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
        //发起调整指令
        startAdjust() {
            this.startAdjustVisible = true
        },
        //保存调整指令
        saveStartAdjust() {
            this.$refs['startAdjustForm'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    let brandObj = {}
                    this.brandList.map((v)=>{
                        if(v.id == this.startAdjustForm.brand){
                            brandObj = v
                        }
                    })
                    data.basicBrandName = brandObj.name
                    data.basicBrandCode = brandObj.code
                    data.basicBrandId = this.startAdjustForm.brand
                    data.yearsList = [this.startAdjustForm.year]
                    data.season = this.startAdjustForm.season
                    // data.adjustTypeId = this.startAdjustForm.changeType
                    // data.adjustTypeName = obj.name
                    data.adjustTypeCode = '6' //爆款code
                    data.asjustAdvise = this.startAdjustForm.remark
                    this.request('createHotAdjust', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('保存调整指令成功')
                            this.startAdjustForm = {
                                brand: '',
                                season: '',
                                year: '',
                                remark: ''
                            }
                            this.$refs['startAdjustForm'].resetFields();
                            this.startAdjustVisible = false
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        //取消调整指令
        cancelStartAdjust() {
            this.startAdjustVisible = false
            this.startAdjustForm = {
                brand: '',
                season: '',
                year: '',
                remark: ''
            }
            this.$refs['startAdjustForm'].resetFields();
        },
        //下载模板
        downLoad(){
            window.location = ('https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/BossHotGoodsPlanningController/uploadTemplate/企划爆款调整导入模板.xlsx')
        },
        //导入
        onUpload() {
            this.uploadVisible = true
        },
        //上传之前
        handleUpload(file) {
            if (!/\.csv$|.xls$|.xlsm$|.xlsx$|.xlt$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file
            }
            return false
        },

        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                this.loadingStatus = false;
                this.file = null;
                this.$message.success(res.msg);
            } else {
                this.loadingStatus = false;
                this.$message.error({
                    content: res.msg,
                    duration: 3
                });
            }
        },
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        //确定上传
        saveUpload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                let data = new FormData
                data.append('file', this.file)
                this.request('hotGoodsPlanning_uploadAsync', data, true).then((res) => {
                    if (res.code == 1) {
                        this.file = null
                        this.uploadVisible = false
                        this.getKeyD(res.data)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //取消上传
        cancelUpload() {
            this.uploadVisible = false
            this.file = null
        },
        getData() {
            this.logList = []
            this.detailsData = []
            let data = {}
            data.basicBrandName = this.formSearch.brand
            data.season = this.formSearch.season
            data.waveBand = this.formSearch.waveBand
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('hotGoodsPlanning_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.tableData = []
                    this.$message.error(res.msg)
                }
            })
        },
        //获取明细
        showLog(row) {
            this.getLoglist(row.id)
            this.getDeatails(row.bizNo) //
        },
        getDeatails(bizNo){
            let data = {}
            data.bizNo = bizNo
            data.waveBand = this.formSearch.waveBand
            this.request('hotGoodsPlanning_getDetail', data, true).then(res => {
                if (res.code == 1) {
                    this.detailsData = res.data
                }else{
                    this.detailsData = []
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.logPage = 1
            let data = {}
            data.billNo = "boss_hot_goods_planning_prefix_" + this.billNo
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
            let data = {}
            data.billNo = "boss_hot_goods_planning_prefix_" + this.billNo
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
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
       
        onAdd(name) {
            if (name == 'add') {
                this.dialogVisible = true
                this.addtitle = '新增'
            }
        },
        //新增
        addSave() {
            let data = {}
            this.dialogVisible = true
            let brandObj = {}
            this.brandList.map((item)=>{
                if(item.name == this.ruleForm.brand){
                    brandObj = item
                }
            })
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    data.basicBrandId = brandObj.id
                    data.basicBrandCode = brandObj.code
                    data.basicBrandName = this.ruleForm.brand
                    data.season = this.ruleForm.waveBand
                    data.years = Util.dateFormat(this.ruleForm.year, 'yyyy')
                    data.hotGoodsPlanningAmount = this.ruleForm.money
                    this.request('hotGoodsPlanning_add', data, true).then(res => {
                        if (res.code == 1) {
                            this.currentPage= 1,
                            this.$message.success('保存成功')
                            this.getData()
                            this.$refs['ruleForm'].resetFields();
                            this.dialogVisible = false
                            this.ruleForm = {
                                brand:'',
                                year:'',
                                waveBand:'',
                                money:''
                            }
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel() {
            this.dialogVisible = false
            this.ruleForm = {
                brand:'',
                year:'',
                waveBand:'',
                money:''
            }
            this.$refs['ruleForm'].resetFields();

        },
        //查询
        onSearch() {
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
    padding: 10px 10px 10px 10px;
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
.el-tabs__nav-scroll{
    height: 40px;
}
</style>
<style>
.el-tabs__header is-top{
    margin-bottom: 0px!important;
}
</style>

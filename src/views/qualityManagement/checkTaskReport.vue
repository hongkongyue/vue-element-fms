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
                    <el-button v-if="judgeMenu.indexOf('调整检测结果') !== -1" size="small" type="primary" @click="changeTesting">调整检测结果</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
            </div>
               <el-form-item label="开发任务编号：" size="small">
                <el-input v-model="formSearch.fabricDevelopTaskNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
              <el-form-item label="检测任务编号：" size="small">
                <el-input v-model="formSearch.taskNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="开发员：" size="small">
                    <el-select v-model="formSearch.developer"  filterable  placeholder="请选择" style="width:120px">
                        <el-option v-for="item in developerList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="批次号：" size="small">
                <el-input v-model="formSearch.batchNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="设计款号：" size="small">
                <el-input v-model="formSearch.designNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="任务状态：" size="small">
                    <el-select v-model="formSearch.flowStatus"  filterable  placeholder="请选择" style="width:120px">
                        <el-option v-for="item in taskStatus" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="检测结果：" size="small">
                    <el-select v-model="formSearch.inspectResultStr"  filterable  placeholder="请选择" style="width:120px">
                        <el-option v-for="item in checkStatus" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
            </el-form-item>
             
            <!-- <el-form-item label="数据来源：" size="small">
                    <el-select v-model="formSearch.dataSource"  filterable  placeholder="请选择" style="width:170px">
                        <el-option v-for="item in dataSourceList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            
              <el-form-item label="是否加急：" size="small">
                    <el-select v-model="formSearch.urgentStr"  filterable  placeholder="请选择" style="width:170px">
                        <el-option v-for="item in urgentList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item> -->
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
                    <el-table-column prop="fabricDevelopTaskNo" label="开发任务编号" sortable min-width="150" align="center" show-overflow-tooltip>
                     </el-table-column>
                     <el-table-column prop="taskNo" label="检测任务编号" sortable min-width="120" align="center" show-overflow-tooltip>
                     </el-table-column>
                     <el-table-column prop="dataSource" label="样品来源" sortable min-width="120" align="center" show-overflow-tooltip>
                     </el-table-column>
                    <el-table-column prop="flowStatus" label="任务状态" sortable min-width="120" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.flowStatus == 0 ? '待受理' : (scope.row.flowStatus == 1 ? '受理完成' :  (scope.row.flowStatus == 2 ? '检测完成' : '已取消'))}}
                    </template>
                    </el-table-column>
                      <el-table-column prop="developer" label="开发员" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="inspectResultStr" label="检测结果" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="acceptUser" label="受理人" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="inspectUser" label="检测人" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="description" label="检测要求" sortable min-width="120" align="center" show-overflow-tooltip>
                     </el-table-column>
                     <el-table-column prop="acceptRemark" label="受理说明" sortable min-width="120" align="center" show-overflow-tooltip>
                     </el-table-column>
                     <el-table-column prop="supplier" label="加工厂" sortable min-width="120" align="center" show-overflow-tooltip>
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
                    <el-table-column prop="majorClasses" label="物料类型" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="weaveMethod" label="织  法" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="kinds" label="品类分类" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="materialName" label="物料名称" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="supplier" label="供应商" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="supplierColor" label="供应商色号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="materialNoPlusColor" label="物料编码+色号" sortable min-width="160" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="usingPart" label="使用部位" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="styleColor" label="物料颜色" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="supplierMaterialNo" label="供应商物料编号" sortable min-width="130" align="center" show-overflow-tooltip>
                    </el-table-column>
                  <el-table-column prop="styleImg" label="样图1" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg">
                        <el-image style="width: 40px; height: 40px" :src="noneUrl"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2" label="样图2" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg2" >
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg2">
                        <el-image style="width: 40px; height: 40px" :src="noneUrl"></el-image>
                    </div>
                </template>
            </el-table-column>
                    <el-table-column prop="createUser" label="创建人" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="created" label="创建时间" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="明细" name="first">
                        <el-table :data="detailsData" style="width: 100%" border highlight-current-row tooltip-effect="dark" :height="twoTableHeight" size="mini">
                            <el-table-column type="index" width="55" label="序号" fixed="left" align="center"></el-table-column>
                            <el-table-column prop="basicQcItemContent" label="检测项目" fixed="left" width="160" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="internalOrOutside" label="内检/外检" fixed="left" align="center" width="100" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="inspectResult" label="检测结果" fixed="left" width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="checkRemark" label="检测说明" fixed="left" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志" name="second">
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
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
         <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="0"></el-option>
                            <el-option label="导出主表+明细" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <el-form-item style="padding-left:130px">
                    <!-- 二次确认 -->
                    <Button type="primary" @click="onExport">确认</Button> 
                    <Button type="default" @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    </section>

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
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            developerList:[],
            activeName:'first',
            detailsData:[],//明细
            urgentList:[ {label:'是',    value:'1' },
                          {label:'否',  value:'0'},
                          ],
            dataSourceList:[
                 {label:'面料新开发',    value:'面料新开发' },
                 {label:'设计款号',  value:'设计款号'},
                 {label:'大货款号',  value:'大货款号'},
            ],
            checkStatus:[
                {label:'全部',    value:'' },
                {label:'检测中',  value:'0'},
                {label:'不合格', value:'1'},
                {label:'合格',  value:'2'},
            ],
            taskStatus:[{label:'待受理',    value:'0' },
                        {label:'受理完成',  value:'1'},
                        {label:'检测完成', value:'2'},
                        {label:'已取消',  value:'4'},
                        ],
            selectDeisgn:[],
            simpleCategoryList:[],
            selectBig:[],
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
                description: ''
            },
            ruleFormDesign:{
                bigGoods: '',
                batchNo: '',
                color: '',
                designNo: '',
                num: '',
                simpleCategory: '',
                description: ''
            },
            rulesDesign:{
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
            logPage:1,
            exportVisible:false,
            exportObj:{
                selected:''
            },
            moreLarge:true,
            
        }
    },
    created() {
        if (document.body.offsetHeight > 800) {
            this.oneTableHeight = (document.body.offsetHeight - 280) * 0.55
            this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
            this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
        } else {
            this.oneTableHeight = (document.body.offsetHeight - 280) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
            this.maxHeight = 'height:' + (document.body.offsetHeight - 245) + 'px'
        }
    },
    mounted() {
        this.getdeveloperList()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        getdeveloperList(){
            this.request('fabric_getdeveloperList', {}, true).then(res => {
                if (res.code == 1) {
                    this.developerList = res.data
                }
            })
        },
        handleShowHidden(name) {
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 110) * 0.55
                    this.twoTableHeight = (document.body.offsetHeight - 110) * 0.25
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 110) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 110) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 110) * 0.27
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 280) * 0.55
                    this.twoTableHeight = (document.body.offsetHeight - 280) * 0.25
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 250) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 245) + 'px'
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
        //调整检测结果
        changeTesting(){
            this.setBuryPoint('调整检测结果')
            if(this.selection.length != 1){
                this.$message.warning('请选择一条检测不合格的数据进行调整！')
            }else if(this.selection[0].inspectResultStr !== '不合格'){
                this.$message.warning('请选择检测不合格的数据进行调整！')
                }else{
                let msg = this.selection[0].taskNo
                this.$prompt('【' + msg +'】原检测状态为不合格，请确认是否修改为合格？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入备注信息',
                type: 'warning'
            }).then(({value}) => {
                console.log(!value || value.trim() == '')
                if(!value || value.trim() == ''){
                    this.$message.warning('请输入备注信息')
                }else{
                    let data = {}
                data.remark = value
                data.id = this.selection[0].id
            this.request('fabric_checkQualified', data, true).then(res => {
                if (res.code == 1) {
                    this.$message.success('调整成功')
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })
                }
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
            }
        },
        //导出相关
        checkExport(){
            this.setBuryPoint('导出')
            this.exportVisible=true
        },
        cancelExport(){
            this.exportVisible=false;
            this.exportObj.selected=''
        },
        
        //异步导出
        onExport() {
            if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
            let data = {}
                data.includeDetail = this.exportObj.selected
                data.goodsNo = this.formSearch.goodsNo
                data.batchNo = this.formSearch.batchNo
                data.designNo = this.formSearch.designNo
                data.taskNo=this.formSearch.taskNo
                data.inspectResult=this.formSearch.inspectResultStr
                data.flowStatus=this.formSearch.flowStatus
                data.dataSource=this.formSearch.dataSource
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.urgent=this.formSearch.urgentStr
                data.fabricDevelopTaskNo=this.formSearch.fabricDevelopTaskNo
                data.developer = this.formSearch.developer //开发员
            this.request('goodsCheck_export', data, true).then(res => {
                if (res.code == 1) {
                    this.cancelExport()
                    this.getKey(res.data)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getData() {
            this.logPage=1
            this.logList = []
            this.detailsData = []
            let data = {}
                data.goodsNo = this.formSearch.goodsNo
                data.batchNo = this.formSearch.batchNo
                data.designNo = this.formSearch.designNo
                data.taskNo=this.formSearch.taskNo
                data.inspectResult=this.formSearch.inspectResultStr
                data.flowStatus=this.formSearch.flowStatus
                data.dataSource=this.formSearch.dataSource
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.urgent=this.formSearch.urgentStr
                data.fabricDevelopTaskNo=this.formSearch.fabricDevelopTaskNo
                data.developer = this.formSearch.developer //开发员
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
        getDetailsList(id){ //明细
        let data = {}
        data.id = id
        this.request('goodsCheck_detail', data, true).then((res) => {
                if (res.code == 1) {
                    this.detailsData = res.data
                }else{
                    this.detailsData = []
                }
            })
        },
        showLog(row) {
            this.billNo=row.id
            this.getLoglist()
            this.getDetailsList(row.id)
        },

        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
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
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
}

.getmore {
    // padding-top: 6px;
    width: 100%;
    height: 20px;
    line-height: 20px;
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

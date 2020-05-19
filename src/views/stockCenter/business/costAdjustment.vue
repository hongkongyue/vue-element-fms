<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline "> 
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <!-- <el-form-item size="small">
                <el-button size="small" type="primary" @click="onImport">导出</el-button>
            </el-form-item> -->
                <el-form-item size="small">
                    <!--v-if="judgeMenu.indexOf('修改') !== -1" -->
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <!--v-if="judgeMenu.indexOf('修改') !== -1" -->
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <!--v-if="judgeMenu.indexOf('修改') !== -1" -->
                    <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <!-- v-if="judgeMenu.indexOf('修改') !== -1"-->
                    <el-button v-if="judgeMenu.indexOf('取消') !== -1" size="small" type="primary" @click="onMainCancel">取消</el-button>
                </el-form-item>
            </div>
            <el-form-item label="仓库：" size="small">
                <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.goodsCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.sjCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="状态：" size="small">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in statusList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="公司：" size="small">
                <el-select v-model="formSearch.company" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in companyCodeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
        </el-form>
    </header>
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="addchangetitle" @on-cancel='onCancel' :width="1250" :mask-closable="false" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addObject" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="公司" size="small" label-width="95px" prop="company">
                    <el-select v-model="addObject.company" value-key="id" placeholder="请选择" style="width:120px" filterable>
                        <el-option v-for="v in companyCodeOptions" :key="v.id" :disabled="v.used==0" :label="v.name" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存账期" size="small" label-width="95px">
                    <el-select disabled v-model="addObject.basicData" placeholder="请选择" style="width:120px" filterable>
                        <el-option v-for="v in stockList" :key="v.id" :disabled="v.used==0" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调整类型" size="small" label-width="95px" prop="enable">
                    <el-select v-model="addObject.enable" placeholder="请选择" style="width:120px" filterable>
                        <el-option v-for="v in enableList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务日期" size="small" label-width="95px" prop="time">
                    <el-date-picker disabled v-model="addObject.time" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:150px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商家编码" size="small" label-width="95px" prop="sjcode">
                    <el-input v-model="addObject.sjcode" placeholder="请输入" style="width:120px"></el-input>
                </el-form-item>
                </Col>
                <Col style="padding-left:30px">
                <el-form-item size="small">
                    <el-button size="small" :disabled="canDisabled" type="primary" @click="add">添加明细</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" :disabled="canDisabled" type="default" @click="onDelete">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <div style="padding-left:30px;float:right">
                    <el-form-item size="small">
                        <el-button size="small" :disabled="canDisabled" type="primary" @click="onSave">提交</el-button>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button size="small" type="default" @click="onCancel">取消</el-button>
                    </el-form-item>
                    <!-- <el-form-item size="small">
                        <el-button size="small" type="primary" @click="onSaveEmit">提交并审核</el-button>
                    </el-form-item> -->
                </div>
                </Col>

                <Col>
                <el-table ref="addTable" :data="addgoodsList" @selection-change="changeSelection" :row-class-name="tableRowClassName" border tooltip-effect="dark" max-height="350" size="mini">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="150" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">
                            <el-input size='mini' v-model="scope.row.merchantCode" style="width:120px;height: 35px;margin-top:5px" v-on:blur="codeCheck(scope.row.merchantCode,scope.$index)" autocomplete="off"></el-input>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="kinds" label="品类" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="adjustAmount" label="调整金额" min-width="130" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input size='mini' v-model="scope.row.adjustAmount" @blur="blurAdjustAmount(scope.row.adjustAmount)" style="width:100px;height: 35px;margin-top:5px" autocomplete="off"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 编辑弹框 -->

    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;margin-bottom:20px"></div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品名称" name="first">
                <el-table :data="goodsListOne" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">{{scope.row.goodsStatus == "0" ? "未完成" : (scope.row.goodsStatus == "1" ? "已完成" : "取消")}}</template> -->
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="kinds" label="品类" min-width="120" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">{{scope.row.planningType == "10" ? "规划型首单" : "非规划型首单" }}</template> -->
                    </el-table-column>
                    <el-table-column prop="adjustAmount" label="调整金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.adjustAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="goodsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="goodsList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
        
    </section> -->
    <moneyAdd ref="stock"></moneyAdd>
</div>
</template>

<script>
var record
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    data() {
        return {
            canDisabled: false,
            addchangetitle: null,
            searchObj: {}, //新增商家编码查出来的数据
            enableList: ['采购入库', '销售出库', '调拨出库'],
            selectList: [],
            addList: [{
                basicPlatformName: '',
                skuName: '',
                orderNo: '',
            }],
            companyList: [],
            select: '',
            list: [], //编辑存储列表
            activeName: 'first',
            loading: false,
            show: false,
            // goodsVisible: false,
            shopList: [],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            addgoodsList: [],
            addObject: {
                company: '',
                enable: '',
                time: new Date(),
                warehouseCategory: '',
                sjCode: ''
            },
            statusList: [{
                    id: 0,
                    name: '未审核'
                },
                {
                    id: 1,
                    name: '已审核'
                },
                {
                    id: 2,
                    name: '取消'
                }
            ],
            wareHouseList: [],
            title: '新增',
            addVisible: false,
            editVisible: false,
            ruleForm: {},
            editFormData: {
                themID: '',
                cwlx: '',
                money: '',
                remark: '',
                id: ''
            }, //编辑数据
            list: [], //编辑存储列表
            rules: {
                basicPlatformName: [{
                    required: true,
                    message: '请输入品牌编码',
                    trigger: 'blur'
                }, ],
                warehouseCategory: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                time: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                company: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                enable: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                sjcode: [{
                    required: true,
                    message: '请输入商家编码',
                    trigger: 'blur'
                }]
            },
            loading: false,
            logList: [], //日志
            billNo: '',
            show: false,
            file: null,
            visible: false,
            obj: {
                id: ''
            },
            ID: '',
            // ID:importantId,
            brandList: [],
            shopList: [],
            shopListTwo: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            formSearch: {
                code: '',
                name: '',
                person: '',
            },
            formAdd: {

            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            platformCode: null,
            platformID: null,
            basicCompanyID: null,
            basicCompanyCode: null,
            basicStoreID: null,
            basicStoreCode: null,
            periodAddress: null,
            delaiList: [],
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.costAdjustLogList //日志
        },
        goodsListOne() {
            return this.$store.state.app.costAdjustmentList //明细
        }
    },
    destroyed() {
        this.$store.commit('clearcostAdjustMent')
    },
    created() {
        this.request('masterData_warehouse_selector', {}, true).then(res => {
            if (res.code == 1) {
                this.wareHouseList = res.data
            }
        })
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        // this.getShop()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
    },
    methods: {
        changeSelection(selection, row) {
            this.selectList = selection
        },
        codeCheck(code, index) {

        },
        blurAdjustAmount(code) {
            if (code == '' || code == 0 || code == undefined) {
                this.canDisabled = true
                this.$message.error('调整金额不能为空，不能为0')
            } else {
                this.canDisabled = false
            }

        },
        //添加明细
        addSome() {
            let data = {}
            this.addObject.company.id ? data.basicCompanyId = this.addObject.company.id : data.basicCompanyId = record.basicCompanyId
            this.addObject.company.name ? data.basicCompanyName = this.addObject.company.name : data.basicCompanyName = record.basicCompanyName
            data.merchantCode = this.addObject.sjcode
            this.request('adjustment_coreCostSelector', data, true).then(res => {
                if (res.code == '1') {
                    this.searchObj = res.data
                    let skuIdaDD = 0
                    if(res.data.skuId){
                        skuIdaDD = res.data.skuId
                    }else{
                        skuIdaDD = 0
                    }
                    this.addgoodsList.push({
                        index: this.addgoodsList.length,
                        merchantCode: res.data.merchantCode,
                        basicBrandName: res.data.basicBrandName,
                        goodsNo: res.data.goodsNo,
                        goodsName: res.data.goodsName,
                        basicBrandId: res.data.basicBrandId,
                        specificationName: res.data.specificationName,
                        adjustAmount: res.data.adjustAmount,
                        kinds: res.data.kinds,
                        skuId: skuIdaDD
                    })
                    this.addObject.sjcode = ''
                    this.canDisabled = true
                    this.$nextTick(() => {
                        this.$refs.addTable.bodyWrapper.scrollTop = this.$refs.addTable.bodyWrapper.scrollHeight;
                    })
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //添加明细
        add() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //判断
                    if (this.addgoodsList.length == 0) {
                        this.addSome() //添加明细
                    } else if (this.addgoodsList.length > 0) {
                        if (this.addgoodsList[this.addgoodsList.length - 1].goodsName == '' || this.addgoodsList[this.addgoodsList.length - 1].goodsName == undefined) {
                            this.$message.error('请先完善上一条数据！')
                        } else {
                            if (this.addObject.sjcode == undefined || this.addObject.sjcode == '') {
                                this.$message.error('请输入商家编码')
                            } else {
                                if (this.addgoodsList.length > 0) {
                                    let same = false
                                    let code = this.addObject.sjcode
                                    this.addgoodsList.map(function (item) {
                                        if (item.merchantCode == code) {
                                            same = true
                                        }
                                    })
                                    if (same == true) {
                                        this.$message.error('请勿添加重复数据')
                                    } else {
                                        this.addSome() //添加明细
                                    }
                                }
                            }
                        }
                    }
                } else { //验证表单
                    return false;
                }
            });
        },
        onSave() {
            if (this.addgoodsList.length == 0) {
                this.$message.error('请先添加明细再提交')
            } else {
                if (this.addchangetitle == '新增') {
                    this.saveAddOrChange() //新增保存
                } else {
                    this.saveChange() //编辑保持
                }
            }
        },
        saveAddOrChange() {
            let data = {}
            data.detailsFoList = this.addgoodsList //数组 
            data.status = 0
            data.basicCompanyId = this.addObject.company.id
            data.basicCompanyName = this.addObject.company.name
            data.basicCompanyCode = this.addObject.company.code
            data.bizName = this.addObject.enable //调整类型
            data.bizDate = this.addObject.time //业务日期
            this.request('adjustment_addCost', data, true).then(res => {
                if (res.code == '1') {
                    this.$message.success(res.msg)
                    this.getData()
                }else{
                    this.$message.error(res.msg)
                }
                    this.dialogVisible = false
                    this.addchangetitle = null
                    this.addgoodsList = []
                    this.addObject = {
                            company: '',
                            time: new Date(),
                            warehouseCategory: '',
                            sjCode: ''
                        },
                        this.$refs['ruleForm'].resetFields();
            })
        },
        saveChange() {
            let data = {}
            data.id = record.id
            data.detailsFoList = this.addgoodsList //数组 
            data.status = 0
            this.addObject.company.id ? data.basicCompanyId = this.addObject.company.id : data.basicCompanyId = record.basicCompanyId
            this.addObject.company.name ? data.basicCompanyName = this.addObject.company.name : data.basicCompanyName = record.basicCompanyName
            this.addObject.company.code ? data.basicCompanyCode = this.addObject.company.code : data.basicCompanyCode = record.basicCompanyCode
            data.bizName = this.addObject.enable //调整类型
            data.bizDate = this.addObject.time //业务日期
            this.request('adjustment_updateCost', data, true).then(res => {
                if (res.code == '1') {
                    this.$message.success(res.msg)
                    this.getData()
                }else{
                    this.$message.error(res.msg)
                }
                this.dialogVisible = false
                    this.addchangetitle = null
                    this.addgoodsList = []
                    this.addObject = {
                            company: '',
                            time: new Date(),
                            warehouseCategory: '',
                            sjCode: ''
                        },
                        this.$refs['ruleForm'].resetFields();
            })
        },
        onDelete() {
            //拿到选中的数据
            let val = this.selectList
            //如果选中数据存在
            if (val) {
                //将选中数据遍历
                val.forEach((val, index) => {
                    //遍历源数据
                    this.addgoodsList.forEach((v, i) => {
                        //如果选中数据和源数据的某一条唯一标识符相等，删除对应的源数据
                        if (val.index === v.index) {
                            this.addgoodsList.splice(i, 1)
                        }
                    })
                })
            }
        },
        //新增
        onAdd() {
            this.dialogVisible = true
            this.addchangetitle = '新增'
        },
        onCancel() {
            this.dialogVisible = false
            this.addchangetitle = null
            this.addgoodsList = []
            this.addObject = {
                    company: '',
                    time: new Date(),
                    warehouseCategory: '',
                    sjCode: '',
                    enable: ''
                },
                this.$refs['ruleForm'].resetFields();
                this.canDisabled = false
        },
        //审核
        onExamine() {
            let arr = w2ui.costAdjustment.getSelection()
            if (arr.length == 0) {
                this.$message.error('请先选择审核的数据')
            } else if (arr.length > 1) {
                this.$message.error('一次只能审核一条数据')
            } else {
                let data = {}
                data.status = 1 //状态  
                data.id = record.id
                data.remark = '审核通过' //取消
                this.request('adjustment_reviewCost', data, true).then(res => {
                    if (res.code == '1') {
                        this.$message.success(res.msg)
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //取消
        onMainCancel() {
            let arr = w2ui.costAdjustment.getSelection()
            if (arr.length == 0) {
                this.$message.error('请先选择取消的数据')
            } else if (arr.length > 1) {
                this.$message.error('一次只能取消一条数据')
            } else {
                let data = {}
                data.status = 2 //取消 2
                data.id = record.id
                data.remark = '取消' //
                this.request('adjustment_reviewCost', data, true).then(res => {
                    if (res.code == '1') {
                        this.$message.success(res.msg)
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //编辑
        onEdit() {
            let arr = w2ui.costAdjustment.getSelection()
            if (arr.length == 0) {
                this.$message.error('请先选中编辑的数据')
            } else if (arr.length > 1) {
                this.$message.error('一次只能编辑一条数据')
            } else {
                this.dialogVisible = true
                this.addchangetitle = '编辑'
                this.addObject.company = record.basicCompanyName
                this.addObject.basicData = record.periodNo
                this.addObject.enable = record.bizName
                // this.addObject.time = record.bizDate
                this.addgoodsList = this.$store.state.app.costAdjustmentList //选中的数据
            }
        },
        //取消

        getKeyD(key) {
            const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
                                // showClose: false,
                                duration: 0,
                            });
                            this.cleanKey(key)

                            function myStopFunction() {
                                clearTimeout(this.timeBB);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 3000
                            });
                            this.getKeyD(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        cleanKey(key) {
            let data = {}
            data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
        },
        clickA(url) {
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
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
        initTable(arr = [], current, total) {

            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'costAdjustment',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        lineNumbers: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        {
                            field: 'index',
                            caption: '序号',
                            size: '100px',
                            sortable: true,
                            info:true
                        },
                        {
                            field: 'bizCode',
                            caption: '单据编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'status',
                            caption: '状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizName',
                            caption: '调整类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '调整账期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '业务日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'createUser',
                            caption: '创建人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'reviewer',
                            caption: '审核人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '创建时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '修改时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'reviewDate',
                            caption: '审核时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        }
                    ],
                    onClick: function (event) {
                        record = this.get(event.recid);
                        setTimeout(function(){
                            if(w2ui.costAdjustment.getSelection().length == 1){
                                let arr = w2ui.costAdjustment.getSelection()
                                if(arr[0] != record.id){
                                    self.$store.commit('clearcostAdjustMent')
                                }else{
                                    self.$store.commit('clearcostAdjustMent')
                                    self.getLoglist(event.recid) //日志
                                    self.getOrderList(event.recid) //明细
                                    self.currentPage = 1;
                                }
                            }else{
                                self.$store.commit('clearcostAdjustMent')
                            }
                        })
                        
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.costAdjustment.clear(); //清空
                w2ui.costAdjustment.records = arr
                // w2ui.costAdjustment.records.push({
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span>当页小计</span>',
                //     billAmount: current,
                // }, {
                //     w2ui: {
                //         summary: true
                //     },
                //     basicPlatformName: '<span >合计</span>',
                //     billAmount: total,
                // })
                $('#main').w2render('costAdjustment');
                w2ui.costAdjustment.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.costAdjustment.clear(); //清空
                    w2ui['costAdjustment'].records = []
                    w2ui.costAdjustment.refresh();
                    $('#main').w2render('costAdjustment')
                })
            }

        },
        onReset() {
            this.formSearch = {}
            // this.initTable([])
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, false).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                }
            })
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, false).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        changebasicPlatformId(id) {
            this.formSearch.person = ''
            let data = {}
            data.platformId = id
            this.request('getBindingByPlatformId', data, true).then((res) => {
                if (res.code == 1) {
                    this.shopList = res.data
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },

        getData() {
            this.$store.commit('clearcostAdjustMent')
            this.loading = true;
            let data = {}
            data.pageSize = this.pagesize 
            data.currentPage = this.currentPage
            data.basicWarehouseId = this.formSearch.code //仓库
            data.goodsNo = this.formSearch.goodsCode //货品编码
            data.merchantCode = this.formSearch.sjCode //商家编码
            data.basicCompanyId = this.formSearch.company //公司
            data.status = this.formSearch.status //状态
            data.basicBrandId = this.formSearch.brand //品牌
            this.request('adjustment_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.perAmount, res.data.totalAmount)
                    } else {
                        this.initTable([])
                    }

                    this.loading = false
                    //   this.perAmount = res.data.perAmount
                    //   this.totalAmount = res.data.totalAmount
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        getOrderList(code) {
            let data = {}
            // data.pageSize = 10
            // data.currentPage = this.currentPageDelait
            data.id = code
            this.request('adjustment_details', data, true).then(res => {
                if (res.code == '1') {
                    this.delaiList = res.data
                    this.$store.commit('costAdjustMent', this.delaiList)
                } else {
                    this.delaiList = []
                    this.$store.commit('costAdjustMent', this.delaiList)
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = 'core_adjust_cost_record_' + billNo
            this.currentPage = 1
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('costAdjustLog', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('costAdjustLog', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('costAdjustLog', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('costAdjustLog', this.logList)
                    }
                }
            })
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        changeRadio(i) {},
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },

    }
}
</script> 

<style lang="less" scoped>
.headerstyle,
.main,
.middle,
.footer {
    transform: translateZ(0);
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

// .pl20 {
//     padding-left: 20px
// }
</style>

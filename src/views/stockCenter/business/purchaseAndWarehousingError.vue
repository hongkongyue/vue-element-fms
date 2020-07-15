<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                 <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('指定公司') !== -1" size="small" type="primary" @click="onGenerate">指定公司</el-button>
                </el-form-item>
            </div>
            <el-form-item label="仓库：" size="small">
                <el-select v-model="formSearch.warehouse" multiple filterable clearable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货品编码：" size="small">
                <el-input v-model="formSearch.themID" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="商家编码：" size="small">
                <el-input v-model="formSearch.themCode" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" filterable clearable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!-- <el-form-item v-if="show == true" label="账单编号：" size="small">
                <el-input v-model="formSearch.orderCode" style="width:210px"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="允许结算：" size="small">
                <el-select v-model="formSearch.allowed" filterable placeholder="请选择" style="width:80px">
                    <el-option v-for="item in allowedList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="关单后入库：" size="small">
                <el-select v-model="formSearch.closed" filterable placeholder="请选择" style="width:80px">
                    <el-option v-for="item in closedList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="结算类型：" size="small">
                <el-select v-model="formSearch.setType" filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in setTypeList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="主采购单号：" size="small">
                <el-input style="width:180px" placeholder="请输入" v-model="formSearch.platformNo"></el-input>
            </el-form-item> -->
            <el-form-item v-if="show == true" label="业务类型：" size="small">
                <el-select v-model="formSearch.orderType" filterable multiple placeholder="请选择" style="width:150px">
                    <el-option v-for="item in busTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item v-if="show == true" label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="供应商：" size="small">
                <el-select v-model="formSearch.supplierId" filterable clearable placeholder="请选择" style="width:250px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item v-if="show == true" label="外部系统采购单号：" size="small">
                <el-input v-model="formSearch.sourceOrderNo" clearable style="width:180px"></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="show == true" label=" 公 司 ：" size="small">
                <el-select v-model="formSearch.companyId" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item v-if="show == true" label="入库时间：" size="small">
                <!-- <el-date-picker v-model="formSearch.date" style="width:260px" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker v-model="formSearch.dateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.dateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="原入库单号：" size="small">
                <el-input v-model="formSearch.outNo" clearable style="width:180px"></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="show == true" label="单据时间：" size="small"> -->
                <!-- <el-date-picker :clearable="false"
                  v-model="dateRange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"  style="width:280px" placeholer="请选择">
                </el-date-picker> -->
                <!-- <el-date-picker v-model="formSearch.orderdateStart" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="开始日期"></el-date-picker>
                <span>~</span>
                <el-date-picker v-model="formSearch.orderdateEnd" type="date" value-format="yyyy-MM-dd" style="width:150px" placeholder="结束日期"></el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item v-if="show==true" label="开票状态：" size="small" label-width="100px">
                <el-select v-model="formSearch.invoiceStatus" filterable placeholder="请选择" style="width:120px">
                    <el-option label="未完成" value="0"></el-option>
                    <el-option label="已完成" value="1"></el-option>
                </el-select>
            </el-form-item> -->
             <!-- <el-form-item v-if="show==true" label="是否生成结算明细：" size="small" label-width="140px">
                <el-select v-model="formSearch.settle" filterable placeholder="请选择" style="width:80px">
                   <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>

        </el-form> 
    </header>
    <el-dialog title="指定公司" :visible="dialogFormVisible" :modal-append-to-body="false" width="400px" :before-close="dialogFormCancel">
        <el-form :model="formdialog">
            <!-- <el-form-item label="对账账期：" size="small">
                <el-select v-model="formdialog.period" value-key="id" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in periodList" :key="item.name" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item> -->
            <span style="color:red;position:relative;left:-10px;top:30px">*</span>
            <el-form-item  label=" 公 司 ：" size="small">
                <el-select  v-model="formdialog.companyId" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button size="small"                @click="dialogFormCancel">取 消</el-button>
            <el-button size="small" type="primary" @click="dialogFormSave">确 定</el-button>
        </div>
    </el-dialog>

    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="outStock" style="width: 100%; height: 400px;" :style="{minHeight:showBink?'600px':'400px'}"></div>
        <!-- <div style="height:200px"></div> -->
        <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="货品明细" name="first">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="货品编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="merchantCode" label="商家编码" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsShortName" label="货品简称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="specificationName" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="actualPoInCount" label="数量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taxIncludedPurchaseUnitPrice" label="含税采购单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxIncludedPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="taxIncludedTrialFee" label="含税试制费单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxIncludedTrialFee|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="trialTaxRate" label="试制费税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsTaxRate" label="货物税率" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taxIncludedTotalPurchaseUnitPrice" label="含税总采购单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxIncludedTotalPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="excludingTaxTrialFee" label="不含税试制费单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.excludingTaxTrialFee|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="excludingTaxPurchaseUnitPrice" label="不含税采购单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.excludingTaxPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="excludingTaxTotalPurchaseUnitPrice" label="不含税总采购单价" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.excludingTaxTotalPurchaseUnitPrice|singlePrice}}</template>
                    </el-table-column>
                    <el-table-column prop="taxTrialAmount" label="含税试制费" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxTrialAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="taxPurchaseAmount" label="含税采购金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxPurchaseAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="taxTrialPurchaseAmount" label="含税总采购金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.taxTrialPurchaseAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="trialAmount" label="不含税试制费" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.trialAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="purchaseAmount" label="不含税采购金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.purchaseAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="trialPurchaseAmount" label="不含税总采购金额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.trialPurchaseAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="trialTaxAmount" label="试制费税额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.trialTaxAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="purchaseTaxAmount" label="货物税额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.purchaseTaxAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="trialPurchaseTaxAmount" label="总税额" min-width="120" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.trialPurchaseTaxAmount|moneyFilters}}</template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs> -->
    </section>
    <!-- <section class="footer" style="margin-bottom:0px">
        
    </section> -->
      <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col v-show="!moreLarge">
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="1"></el-option>
                            <el-option label="导出主表+明细" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-show="moreLarge" style="text-align:center">
                       目前要导出的数据超过10万条，确定继续导出吗？   
                </Col>
                <el-form-item style="padding-left:130px">
                    <Button type="primary" v-if="!moreLarge" @click="getExportTotal">确认</Button>
                    <!-- 二次确认 -->
                    <Button type="primary" v-if="moreLarge"  @click="onImport">确认</Button> 
                    <Button type="default"  @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
let record
import filter from '../../../filter/'
import{debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    name: 'timelyComponent',
    data() {
        return {
            payableUserList:[],
             exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            dateRange:[],
            newTableList:[],//test
            periodList:[],
            formdialog: {
                        period:'',
            },
            dialogFormVisible: false,
            allowedList: [{
                id: 1,
                name: '是'
            }, {
                id: -1,
                name: '否'
            }],
            closedList: [{
                id: 1,
                name: '是'
            }, {
                id: 0,
                name: '否'
            }],
            setTypeList: [{
                id: -1,
                name: '代销'
            }, {
                id: 1,
                name: '经销'
            }, {
                id: 2,
                name: '退次返修'
            }], //结算类型
            companyList: [],
            supplyList: [],
            warehouseList: [],
            orderTypeList: [],
            brandList: [],
            select: '',
            list: [], //编辑存储列表
            activeName: 'first',
            loading: false,
            show: false,
            shopList: [],
            themList: [],
            formSearch: {
                code: '',
                name: '',
                person: '',
                invoiceStatus:'',
                supplierId:'',
                sourceOrderNo:'',
                outNo:'',
            },
            logList: [],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            busTypeList: [],
        }
    },
    mounted() {
        this.getPayableUser()
        // this.setdateRange()
        this.getWarehouseList()
        this.getCompany()
        this.getSupply()
        this.getBusType()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.supplierId = ''
            console.log(name)
            let vars = {}
            vars.payableUserId = name
             this.requestWithUriVars('selectorPayableSupplier', vars, null, true).then(res => {
          if (res.code==1) {
              this.supplyList = res.data
            }else{
                this.supplyList = []
            }
          })
        },
        getPayableUser(){
            this.request('supplier_selectorPayable', {}, true).then(res => {
                if (res.code == 1) {
                    this.payableUserList = res.data
                }
            })
        },
        //  setdateRange(){
        //         this.dateRange=[new Date((new Date().getTime()-30*24*60*60*1000)),new Date()]
        //         console.log(this.dateRange,'09090')
        // },
        //生成结算明细  //bizStockIn_add
        onGenerate() {
            this.setBuryPoint('指定公司')
            let arr = w2ui.purchaseError.getSelection()
            if (arr.length == 0) {
                this.$message.error('请先选择指定公司的数据')
            } else {
                  this.dialogFormVisible = true
                //生成结算明细校验
                // let data = {}
                //     data.ids = arr
                // this.request('bizStockIn_addCheck', data, true).then(res => {
                //     if (res.code == '1') {
                //         this.dialogFormVisible = true
                //         this.getperiodList(arr[0])
                //     } else {
                //         this.$message.error(res.msg)
                //     }
                // })
            }

            // let arr = w2ui.purchase.getSelection()
            // if (arr.length == 0) {
            //     this.$message.error('请先选择生成结算明细的数据')
            // } else {
            //     let data = {}
            //     data.ids = arr
            //     this.request('bizStockIn_add', data, true).then(res => {
            //         if (res.code == '1') {
            //             this.$message.success(res.msg)
            //             this.getdata()
            //         } else {
            //             this.$message.error(res.msg)
            //         }
            //     })
            // }
        },
        //获取对账账期
        getperiodList(name){
            console.log(record,'090909090',this.newTableList)
            let basicCompanyId = ''
            this.newTableList.map(x => {
                if(name == x.id){
                    basicCompanyId = x.basicCompanyId
                }
                })
            let data = {}
               data.basicCompanyId=basicCompanyId
               data.type=3;
            this.request('accountPeriod_selector', data, true).then((res) => {
                if (res.code == 1) {
                     this.periodList = res.data
                }else{
                     this.$message.error(res.msg)
                }
            })
        },
        // getperiodNo(id){
        //      for(let i=0,len=this.periodList.length;i<len;i++){
        //          if(this.periodList[i].period==id){
        //              return this.periodList[i].periodNo
        //          }
        //     }
        // },
        dialogFormSave() {
            if (!this.formdialog.companyId) {
                    this.$message.error('请选择公司')
            } else {
                let arr = w2ui.purchaseError.getSelection()
                let data = {}
                data.idList = arr
                data.basicCompanyId = this.formdialog.companyId
                this.request('stocks_bizStockIn_manualChoose', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('操作成功！')
                        this.dialogFormVisible = false
                        this.formdialog.companyId = ''
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                        // this.dialogFormVisible  = false
                        // this.formdialog.companyId =''
                    }
                })
            }
        },
        dialogFormCancel() {
            this.dialogFormVisible = false
            this.formdialog = {}
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
                $('#outStock').w2grid({
                    name: 'purchaseError',
                    show: {
                        toolbar: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [{
                            field: 'index',
                            caption: '序号',
                            size: '100px',
                            sortable: true,
                            info: true
                        },
                        {
                            field: 'busType',
                            caption: '业务类型',
                            size: '130px',
                            sortable: true
                        },
                         {
                            field: 'sourceOrderNo',
                            caption: '外部系统采购单号',
                            size: '130px'
                        },
                        {
                            field: 'outNo',
                            caption: '原入库单号',
                            size: '130px'
                        },
                         {
                            field: 'basicSupplierCode',
                            caption: '供应商编码',
                            size: '130px',
                            sortable: true
                        },
                         {
                            field: 'basicSupplierName',
                            caption: '供应商名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'basicWarehouseName',
                            caption: '仓库',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicBrandName',
                            caption: '品牌',
                            size: '130px',
                             sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '货品编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '商家编码',
                            size: '130px'
                        },
                        {
                            field: 'goodsName',
                            caption: '货品名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'specificationName',
                            caption: '规格名称',
                            size: '130px',
                            sortable: true
                        },
                       
                        {
                            field: 'actualPoInCount',
                            caption: '数量',
                            size: '100px',
                            sortable: true
                        },
                        
                        {
                            field: 'taxPurchaseAmount',
                            caption: '含税采购金额',
                            render:'money',
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
                            field: 'poInTime',
                            caption: '入库时间',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    // onClick: function (event) {
                    //     record = this.get(event.recid)
                    //     setTimeout(function () {
                    //         if (w2ui.purchaseError.getSelection().length == 1) {
                    //             let arr = w2ui.purchaseError.getSelection()
                    //             if (arr[0] != record.id) {
                    //                 self.$store.commit('clearpurchase')
                    //             } else {
                    //                 self.getOrderList(event.recid)
                    //                 self.currentPage = 1;
                    //             }
                    //         } else {
                    //             self.$store.commit('clearpurchase')
                    //         }
                    //     })
                    //     // self.getOrderList(event.recid)
                    //     // self.currentPage = 1;
                    //     // self.$store.commit('clearreceipt')
                    // }
                })
            });
            if (arr.length > 0) {
                w2ui.purchaseError.clear(); //清空
                w2ui.purchaseError.records = arr
                      w2ui.purchaseError.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    actualPoInCount:current.actualPoInCount,
                    taxPurchaseAmount:current.taxPurchaseAmount,
                    // taxPurchaseAmount:current.taxPurchaseAmount,
                    // trialAmount:current.trialAmount,
                    // purchaseAmount:current.purchaseAmount,
                    // totalCurrentPeriodAmount: current.totalCurrentPeriodAmount,
                    // totalTaxTrialAmount: current.totalTaxTrialAmount,
                    // totalSaleAmount: current.totalSaleAmount,
                    // totalProcessingAmount: current.totalProcessingAmount,
                    // totalReturnRepairAmount: current.totalReturnRepairAmount,
                    // totalDeductionAmount: current.totalDeductionAmount,
                    // goodsInvoiceAmount: current.goodsInvoiceAmount,
                    // tryFeeInvoiceAmount: current.tryFeeInvoiceAmount,
                    // totalTicketAmount: current.totalTicketAmount,
                    // totalChargeAgainstAmount: current.totalChargeAgainstAmount,
                    // totalUnTicketAmount: current.totalUnTicketAmount
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span>合计</span>',
                    actualPoInCount:total.actualPoInCount,
                    taxPurchaseAmount:total.taxPurchaseAmount,
                    // taxPurchaseAmount:total.taxPurchaseAmount,
                    // trialAmount:total.trialAmount,
                    // purchaseAmount:total.purchaseAmount,
                    // totalCurrentPeriodAmount: total.totalCurrentPeriodAmount,
                    // totalTaxTrialAmount: total.totalTaxTrialAmount,
                    // totalSaleAmount: total.totalSaleAmount,
                    // totalProcessingAmount: total.totalProcessingAmount,
                    // totalReturnRepairAmount: total.totalReturnRepairAmount,
                    // totalDeductionAmount: total.totalDeductionAmount,
                    // goodsInvoiceAmount: total.goodsInvoiceAmount,
                    // tryFeeInvoiceAmount: total.tryFeeInvoiceAmount,
                    // totalTicketAmount: total.totalTicketAmount,
                    // totalChargeAgainstAmount: total.totalChargeAgainstAmount,
                    // totalUnTicketAmount: total.totalUnTicketAmount
                })
                $('#outStock').w2render('purchaseError');
                 w2ui.purchaseError.refresh();
            } else {
                $(document).ready(function () {
                    $('#outStock').w2render('purchaseError');
                    w2ui['purchaseError'].records = []
                    w2ui.purchaseError.clear()
                    w2ui.purchaseError.refresh();
                })
            }

        },
        //明细
        getOrderList(code) {
            let data = {}
            data.bizStockInId = code
            this.request('bizStockIn_detail_page', data, true).then(res => {
                if (res.code == 1) {
                    // this.delaiList = res.data.records
                    this.$store.commit('purchaseError', res.data.records)
                }
            })
        },
        
        onReset() {
            this.formSearch = {
                code: '',
                name: '',
                person: '',
                invoiceStatus:'',
                supplierId:''
            }
            // this.setdateRange()
            this.getSupply()
            // this.initTable([])
        },
        //公司
        getCompany() {
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        //供应商
        getSupply() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.supplyList = res.data
                }
            })
        },
        //仓库
        getWarehouseList() {
            this.request('masterData_warehouse_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.warehouseList = res.data
                }
            })
        },
        //品牌
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        //业务类型
        getBusType() {
            let data = {
                bizType: '采购入库'
            }
            this.request('businessType_all', data, true).then((res) => {
                if (res.code == 1) {
                    this.busTypeList = res.data.records
                }
            })
        },
        //账单类型
        getThemID() {
            let data = {}
            this.request('received_orderType_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.themList = res.data
                }
            })
        },

        getData() {
            this.loading = true;
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
                data.bizType = '采购入库'
                data.payableReconciliationOrderCode = this.formSearch.orderCode //账单编号
                data.allowSettlement = this.formSearch.allowed //允许结算
                data.closed = this.formSearch.closed //关单后入库
                data.billingType = this.formSearch.setType //结算类型
                data.payableSettlementOrderCode = this.formSearch.setCode //结算明细编号
                data.basicWarehouseIds = this.formSearch.warehouse //仓库ID
                data.originPoInNo = this.formSearch.platformNo //平台单号
                data.basicBrandId = this.formSearch.brand //品牌ID
                data.merchantCode = this.formSearch.themCode //商家编码
                data.goodsNo = this.formSearch.themID //货品编码
                data.busTypes = this.formSearch.orderType //业务类型
                data.payableUserId = this.formSearch.payableUser //所属人员
                data.basicCompanyId = this.formSearch.companyId //公司ID
                data.basicSupplierCode = this.formSearch.supplierId //供应商编码
                data.sourceOrderNo=this.formSearch.sourceOrderNo
                data.outNo=this.formSearch.outNo
                this.formSearch.dateStart ? data.omsStartDate = this.formSearch.dateStart : delete data.omsStartDate //开始时间
                this.formSearch.dateEnd ? data.omsEndDate = this.formSearch.dateEnd : delete data.omsEndDate //结束时间
                this.formSearch.orderdateStart ? data.startDate = this.formSearch.orderdateStart : delete data.startDate //开始时间
                this.formSearch.orderdateEnd ? data.endDate = this.formSearch.orderdateEnd : delete data.endDate //结束时间
                // data.startDate=filter.get_year_month_day(this.dateRange[0])
                // data.endDate  =filter.get_year_month_day(this.dateRange[1])
                data.invoiceStatus=this.formSearch.invoiceStatus!=''?Number(this.formSearch.invoiceStatus):''
            this.formSearch.settle ? data.settle=Number(this.formSearch.settle):delete data.settle
            this.request('stocks_bizStockIn_exceptionPage', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index = i + 1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                        this.newTableList = res.data.records
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
        onSearch() {
            this.setBuryPoint('查询')
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
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
        },
        checkSelection() {
            let arr = w2ui.purchaseError.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false
        },
         //导出相关
        checkExport(){
                 if(this.checkSelection()){
                    // this.onImport()
                    this.exportVisible=true
                 }else{
                     this.exportVisible=true
                 }
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        getExportTotal(){
            //   if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
        let data={}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.bizType = '采购入库异常池'
            data.payableReconciliationOrderCode = this.formSearch.orderCode //账单编号
            data.allowSettlement = this.formSearch.allowed //允许结算
            data.closed = this.formSearch.closed //关单后入库
            data.billingType = this.formSearch.setType //结算类型
            data.payableSettlementOrderCode = this.formSearch.setCode //结算明细编号
            data.basicWarehouseIds = this.formSearch.warehouse //仓库ID
            data.originPoInNo = this.formSearch.platformNo //平台单号
            data.basicBrandId = this.formSearch.brand //品牌ID
            data.merchantCode = this.formSearch.themCode //商家编码
            data.goodsNo = this.formSearch.themID //货品编码
            data.busTypes = this.formSearch.orderType //业务类型
            data.payableUserId = this.formSearch.payableUser //所属人员
            data.basicCompanyId = this.formSearch.companyId //公司ID
            data.basicSupplierCode = this.formSearch.supplierId //供应商编码
            data.sourceOrderNo=this.formSearch.sourceOrderNo
            data.outNo=this.formSearch.outNo
            this.formSearch.dateStart ? data.omsStartDate = this.formSearch.dateStart : delete data.omsStartDate //开始时间
            this.formSearch.dateEnd ? data.omsEndDate = this.formSearch.dateEnd : delete data.omsEndDate //结束时间
            this.formSearch.orderdateStart ? data.startDate = this.formSearch.orderdateStart : delete data.startDate //开始时间
            this.formSearch.orderdateEnd ? data.endDate = this.formSearch.orderdateEnd : delete data.endDate //结束时间
            // data.startDate=filter.get_year_month_day(this.dateRange[0])
            // data.endDate  =filter.get_year_month_day(this.dateRange[1])
            data.invoiceStatus=this.formSearch.invoiceStatus!=''?Number(this.formSearch.invoiceStatus):''
            this.formSearch.settle ? data.settle=Number(this.formSearch.settle):delete data.settle
            this.request('stocks_bizStockIn_exportExPoInAsync',data,false).then(res=>{
               if(res.code==1){
                   if(res.data>100000){
                       this.moreLarge=true
                   }else{
                       this.moreLarge=false
                       this.onImport()
                   }
               }else{
                   this.$message.error(res.msg)
               }
           })
        },
         //导出
        onExport(){
                    this.setBuryPoint('导出')
                    let data={}
                            data.pageSize = this.pagesize
                            data.currentPage = this.currentPage
                            data.bizType = '采购入库异常池'
                            data.payableReconciliationOrderCode = this.formSearch.orderCode //账单编号
                            data.allowSettlement = this.formSearch.allowed //允许结算
                            data.closed = this.formSearch.closed //关单后入库
                            data.billingType = this.formSearch.setType //结算类型
                            data.payableSettlementOrderCode = this.formSearch.setCode //结算明细编号
                            data.basicWarehouseIds = this.formSearch.warehouse //仓库ID
                            data.originPoInNo = this.formSearch.platformNo //平台单号
                            data.basicBrandId = this.formSearch.brand //品牌ID
                            data.merchantCode = this.formSearch.themCode //商家编码
                            data.goodsNo = this.formSearch.themID //货品编码
                            data.busTypes = this.formSearch.orderType //业务类型
                            data.payableUserId = this.formSearch.payableUser //所属人员
                            data.basicCompanyId = this.formSearch.companyId //公司ID
                            data.basicSupplierCode = this.formSearch.supplierId //供应商编码
                            data.sourceOrderNo=this.formSearch.sourceOrderNo
                            data.outNo=this.formSearch.outNo
                            this.formSearch.dateStart ? data.omsStartDate = this.formSearch.dateStart : delete data.omsStartDate //开始时间
                            this.formSearch.dateEnd ? data.omsEndDate = this.formSearch.dateEnd : delete data.omsEndDate //结束时间
                            this.formSearch.orderdateStart ? data.startDate = this.formSearch.orderdateStart : delete data.startDate //开始时间
                            this.formSearch.orderdateEnd ? data.endDate = this.formSearch.orderdateEnd : delete data.endDate //结束时间
                            // data.startDate=filter.get_year_month_day(this.dateRange[0])
                            // data.endDate  =filter.get_year_month_day(this.dateRange[1])
                            data.invoiceStatus=this.formSearch.invoiceStatus!=''?Number(this.formSearch.invoiceStatus):''
                            this.formSearch.settle ? data.settle=Number(this.formSearch.settle):delete data.settle
                      this.request('stocks_bizStockIn_exportExPoInAsync', data, false).then(res => {
                        if (res.code == 1) {
                            this.cancelExport()
                            this.getKeyD(res.data)
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                }) 
        },
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
                                    message: 
                                        h('a', {
                                            on: {
                                                 click: () => {
                                                    this.clickA(res.data.subTitle)
                                                }
                                            }
                                        }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载"),
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
        clickA(url) {
            console.log(url)
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
        cleanKey(key) {
            let data = {}
                data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('9999','现在的log')
                }
            })
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

.pl20 {
    padding-left: 20px
}
</style>

<template>
<div v-loading="loading2"  element-loading-text="正在重新计算，请稍等" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
               
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onImport">导出</el-button>
                </el-form-item>
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('生成排款单') !== -1" size="small" type="primary" :loading="canOperate" @click="onExamine">生成排款单</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button  size="small" type="primary" :loading="refreshLoading" @click="onRefresh">重算排款建议</el-button>
                </el-form-item>
                 <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                
            </Col>
            <!-- <el-divider></el-divider> -->
              <el-form-item label=" 公 司 ：" size="small">
                <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.basicSupplierId" filterable clearable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item size="small" label-width="100px">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item> -->
            <!-- <br/> -->
            <el-form-item style="margin-left:20px"  label="过滤应付未付面料款金额>0的数据：" size="small" :label-width="300">
                  <el-checkbox v-model="formSearch.hasFabricAmount"></el-checkbox>
            </el-form-item>
            <!-- <br/> -->
            <el-form-item style="margin-left:20px" label="显示建议排款金额为0的数据：" size="small" :label-width="300">
                  <el-checkbox v-model="formSearch.hasAdviseAmount"></el-checkbox>
            </el-form-item>
            <!-- <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="制单号：" size="small">
                <el-input v-model="formSearch.purchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item> -->
             <!-- <el-form-item label="单据状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.status" filterable placeholder="请选择" style="width:155px"> -->
                     <!-- <el-option label="待审核" value="0"></el-option> -->
                    <!-- <el-option label="编辑中" value="2"></el-option>
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="审核通过" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发票类型：" size="small" v-if="show == true">
                <el-select v-model="formSearch.deductionType" filterable placeholder="请选择" style="width:150px">
                    <el-option label="货款发票" value="货款发票"></el-option>
                    <el-option label="试制费发票" value="试制费发票"></el-option>
                    <el-option label="冲红发票" value="冲红发票"></el-option>
                </el-select>
            </el-form-item> -->
          
            <!-- <el-form-item v-if="show == true" label="到票日期：" size="small">
                 <el-date-picker v-model="formSearch.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
            <el-form-item v-if="show == true" label="开票日期：" size="small">
                 <el-date-picker v-model="formSearch.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
            <el-form-item label="发票编码：" size="small" v-if="show == true">
                <el-input v-model="formSearch.targetPurchaseOrderNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="扣款状态：" size="small" v-if="show == true">
                <el-select v-model="formSearch.dtStatus" filterable placeholder="请选择" style="width:150px">
                    <el-option label="已扣款" value="1"></el-option>
                    <el-option label="未扣款" value="0"></el-option>
                </el-select>
            </el-form-item> -->
          
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'640px':'420px'}">
        <span style="color:red;float:left">{{updateTime?'排款建议更新时间：'+updateTime:''}}</span>
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 350px;"></div>
    </section>
    <!--修改-->
    <Modal v-model="adjustVisible" :styles="mystyle" :rules="rules" title="修改扣款单" @on-cancel='cancelAdjust' :width="440" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="adjustForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="供应商：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.gys" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="公司：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.company" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="大货款号：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.goodsNo" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="扣款类型：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.kklx" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="扣款金额：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.kkje" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="品牌：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.brand" disabled style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="结算制单号：" size="small" label-width="115px" prop="platform">
                    <el-input v-model="adjustObj.codeNo" style="width:200px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item size="small" label-width="95px" style="padding-left:130px">
                    <Button type="primary" @click="saveAdjust">确定</Button>
                    <Button type="default" @click="cancelAdjust">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
     <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <p></p>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 重新计算 -->
    <Modal v-model="refreshVisible" title="重新计算" @on-cancel='refreshCancel' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <span>重算排款建议需要一段时间！确认是否重新计算排款建议</span>
                <!-- <el-radio style="margin-left:20px" v-model="radioyes" label="1">是</el-radio>
                <el-radio v-model="radioyes" label="0">否</el-radio> -->
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="refreshSave">确认</Button> 
            <Button type="default" @click="refreshCancel">取消</Button>
        </div>
    </Modal>
</div>
</template>

<script>
var record={}
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {
    mapState
} from 'vuex'
export default {
    mixins:[debounce],
    data() {
        return {
            loading2:false,
            radioyes:'1',
            refreshVisible:false,
            refreshLoading:false,
            adviceSuccess:false,
             exportObj:{
                       selected:''
            },
            updateTime:'',//更新时间
            exportVisible:false,
            moreLarge:false,
            canOperate:false,
            show: false,
            loading: false,
            examineVisible: false, // 审核框
            dialogVisible: false, // 生成对账单框
            adjustVisible: false, // 扣款调整
            activeName: 'first',
            adjustObj: {
                gys    :'',
                company:'',
                goodsNo :'',//大货款号
                kklx:'',//扣款类型
                kkje :'',//扣款金额
                brand :'', //品牌
                codeNo :'',//结算制单号

            }, // 扣款调整数据对象
            adjustList: [], //  调整扣款的列表 
            logList: [], // 日
            formSearch: {  
                            basicCompanyId :'',
                            basicSupplierId:'',
                            hasAdviseAmount:true,
                            hasFabricAmount:true,
            },
            companyList: [], // 公司列表
            supplyList: [], //供应商列表
            addBillObj: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            AList:[],
        }
    },
    computed: mapState({
                    geNewData: state => state.deduction.deductionList,
                    logsList: state => state.deduction.deductionLogList,
                    deductionId: state => state.deduction.id,
    }),
    created() {
        this.getCompany()
        this.getSupply()
    },
    destroyed() {
        this.resetCommit()
    },
    mounted() {
        // this.formSearch.year = new Date()
        this.getUpdateTime()
        this.getButtonJurisdiction() //按钮权限
        
        this.initTable([])
    },
    methods: {
        //重新计算
        onRefresh(){
            this.refreshVisible = true
        },
        refreshSave(){
            if(this.radioyes == '1'){
                this.getAdviceSync()
            }
                this.radioyes = '1'
                this.refreshVisible = false
            console.log(this.radioyes,'-------------')
        },
        refreshCancel(){
            this.radioyes = '1'
            this.refreshVisible = false
        },
        getAdviceSync(){//
       this.loading2 = true
            let data = {}
            this.request('accPayable_dischargeAdvice_sync', data, false).then(res => {
                if (res.code == 1) {
                    this.$message.success('重算成功')
                    this.getData()
                    console.log('------')
                }else{
                    this.$message.error(res.msg)
                }
                this.loading2 = false
                // loading.close();
            })
        },
        async getUpdateTime(){
               let data={};
               let res= await this.request('accPayable_dischargeAdvice_getSyncDate',data,false)
                   if(res.code==1){
                         this.updateTime=res.data
                   }else{
                         this.$message.error(res.msg)
                   }
        },
        modify(){
                  let arr = w2ui.deduction.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    console.log(record,'56789')
                    this.adjustVisible=true
                    this.adjustObj.gys = record.supplierName //供应商
                    this.adjustObj.company = record.companyName //公司
                    this.adjustObj.goodsNo = record.goodsNo //大货款号
                    this.adjustObj.kklx = record.deductionType//扣款类型
                    this.adjustObj.kkje = record.deductionAmount//扣款金额
                    this.adjustObj.brand = record.brandName //品牌
                    this.adjustObj.codeNo = record.targetPurchaseOrderNo//结算制单号
                }
        },
        handleClick(tab, event) {
            if (tab.name == 'second') {
                 //货品明细接口
            } else if (tab.name == 'third') {
                if (!this.deductionId) return
                      this.getLoglist()
            }
        },
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
        },
        getObj(orignArr, props, params1) {
            if (orignArr instanceof Array) {
                for (let i = 0, len = orignArr.length; i < len; i++) {
                    if (orignArr[i].hasOwnProperty(props)) {
                        if (orignArr[i][props] == params1) {
                            return orignArr[i]
                        }
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
        initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'rankMoneySuggest',
                    show: {
                        toolbar: true,
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
                            info: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '150px',
                            sortable: true
                        },
                        
                        {
                            field: 'statementAmount',
                            caption: '本期已对账货款余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'payableTotalAmount',
                            caption: '本期发票余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'poUnderInvoiceAmount',
                            caption: '累计入库未到票金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'twentyPercentStatementAmount',
                            caption: '20%本期已对账货款余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        
                        {
                            field: 'lastDischargeCloseAmount',
                            caption: '上次排款后关闭释放金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'lastDischargeUndischargeAmount',
                            caption: '上次排款后剩余待排可排金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'lastUndischargeAmount',
                            caption: '上次排款后待排款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'eightyPercentPayableTotalAmount',
                            caption: '80%本期发票余额',
                            size: '200px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'twentyPercentPayableTotalAmount',
                            caption: '20%本期发票余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        // {
                        //     field: 'deductionAmount',
                        //     caption: '未关联金额',
                        //     size: '150px',
                        //     sortable: true
                        // },
                        {
                            field: 'adviseDischargeAmount',
                            caption: '本次建议排款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'undischargeAmount',
                            caption: '本次剩余待排款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'dischargeUnpaidTotalAmount',
                            caption: '累计已排未付金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'payableInvoiceTotalAmount',
                            caption: '累计发票余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'statementTotalAmount',
                            caption: '累计已对账货款余额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'payableUnpaidFabricAmount',
                            caption: '应付未付面料款金额',
                            size: '150px',
                            render: 'money',
                            sortable: true
                        },

                    ],
                    onClick: function (event) {
                        // record = this.get(event.recid);
                        // console.log(this.get(event.recid))
                        
                        // self.activeName = 'first'
                        // setTimeout(function(){
                        //     if(w2ui.deduction.getSelection().length == 1){
                        //         let arr = w2ui.deduction.getSelection()
                        //         if(arr[0] != record.id){
                        //                // console.log('--------------')
                        //         }else{
                        //             self.getGoodsList(event.recid)
                        //             self.$store.commit('getdeductionId', event.recid)
                        //             self.logPage = 1
                        //         }
                        //     }else{
                        //         self.resetCommit()
                        //     }
                        // }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.rankMoneySuggest.clear(); //清空
                w2ui.rankMoneySuggest.records = arr
                w2ui.rankMoneySuggest.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    payableTotalAmount: current.payableTotalAmount,
                    statementAmount:current.statementAmount,
                    twentyPercentStatementAmount:current.twentyPercentStatementAmount,
                    lastDischargeCloseAmount:current.lastDischargeCloseAmount,
                    lastUndischargeAmount:current.lastUndischargeAmount,
                    lastDischargeUndischargeAmount:current.lastDischargeUndischargeAmount,
                    eightyPercentPayableTotalAmount:current.eightyPercentPayableTotalAmount,
                    twentyPercentPayableTotalAmount:current.twentyPercentPayableTotalAmount,
                    adviseDischargeAmount:current.adviseDischargeAmount,
                    undischargeAmount:current.undischargeAmount,
                    payableUnpaidFabricAmount:current.payableUnpaidFabricAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    payableTotalAmount: total.payableTotalAmount,
                    statementAmount:total.statementAmount,
                    twentyPercentStatementAmount:total.twentyPercentStatementAmount,
                    lastDischargeCloseAmount:total.lastDischargeCloseAmount,
                    lastUndischargeAmount:total.lastUndischargeAmount,
                    lastDischargeUndischargeAmount:total.lastDischargeUndischargeAmount,
                    eightyPercentPayableTotalAmount:total.eightyPercentPayableTotalAmount,
                    twentyPercentPayableTotalAmount:total.twentyPercentPayableTotalAmount,
                    adviseDischargeAmount:total.adviseDischargeAmount,
                    undischargeAmount:total.undischargeAmount,
                    payableUnpaidFabricAmount:total.payableUnpaidFabricAmount,
                })
                $('#main').w2render('rankMoneySuggest');
                w2ui.rankMoneySuggest.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.rankMoneySuggest.clear(); //清空
                    w2ui['rankMoneySuggest'].records = []
                    w2ui.rankMoneySuggest.refresh();
                    $('#main').w2render('rankMoneySuggest')
                })

            }

        },
        resetCommit() {
            this.$store.commit('cleardeductionList')
            this.$store.commit('cleardeductionId')
            this.$store.commit('cleardeductionLogList')
        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = ''
            }
            // this.resetCommit()
            this.formSearch = {
                 hasAdviseAmount:false,
                 hasFabricAmount:false,
            }
            // this.formSearch.year = new Date()
            // this.initTable([])
        },
        //公司下拉列表
        getCompany() {
            //masterData_company_selector
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        //供应商列表
        getSupply() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.supplyList = res.data
                }
            })
        },
        getData() {
             this.resetCommit()
            this.loading = true;
            this.logList = []
            let data = {}
                data.pageSize        = this.pagesize
                data.currentPage     = this.currentPage
                data.basicCompanyId  = this.formSearch.basicCompanyId
                data.basicSupplierId = this.formSearch.basicSupplierId
                data.hasAdviseAmount = this.formSearch.hasAdviseAmount?1:0
                data.hasFabricAmount = this.formSearch.hasFabricAmount?1:0
            this.request('accPayable_dischargeAdvice_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                        this.getUpdateTime()
                    } else {
                        this.initTable([])
                    }
                       this.loading = false
                } else {
                    this.initTable([])
                    this.$message({
                        message: res.msg,  
                        type: 'error'
                    });
                }
            })
        },
        //获取货品明细
        getGoodsList(id) {
            let data = {}
            data.id = id
            this.request('payable_deductionOrder_detail', data, false).then((res) => {
                if (res.code == '1') {
                    this.AList = res.data
                    this.$store.commit('getDeductionList', res.data)
                }
                 else {
                    this.$store.commit('cleardeductionList')
                }
            })
        },
        //日志
        getLoglist() {
            let data = {}
            data.billNo = 'payable_deduction_order_' + this.deductionId
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                        this.$store.commit('initdeductionLogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initdeductionLogList', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            this.getLoglist()
        },
        onSearch() {
            this.getData()
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        operate() {
            this.$prompt('确定要审核选中的数据吗', '操作确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({
                value
            }) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' +(value?value:'无')
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        checkSelection() {
            let arr = w2ui.rankMoneySuggest.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //生成排款建议
        continueExamine() {
            const{code}=this.$route.query
            let arr = w2ui.rankMoneySuggest.getSelection()
            let data = {}
                data.ids = arr
            this.request('accPayable_dischargeAdvice_createAccPayableDischarge', data, true).then((res) => {
                if (res.code == 1) {
                    this.$message.success('生成排款单成功')
                    this.canOperate=false;
                     setTimeout(()=>{
                               this.$router.push({
                                    name:'rankMoneyBillDetail',
                                    query:{
                                        id:res.data,
                                        tag:6,
                                        code:code,
                                    }
                                })
                             },1000)
                             
                    // this.getData()
                } else {
                    this.canOperate=false
                    this.$message.error(res.msg)
                }
            })

        },
      //校验是否存在应付未付面料款金额不为0
      checkAgain(){
            let arr = w2ui.rankMoneySuggest.getSelection()
            let data = {};
                data.ids = arr
            if (this.checkSelection()) {
                this.request('accPayable_dischargeAdvice_checkUnpaidFabricAmount', data, false).then((res) => {
                    if (res.code == 1) {
                            this.continueExamine()  
                       }else if (res.code == -1) {
                                 const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, res.msg),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                        // instance.confirmButtonLoading = true;
                                        // instance.confirmButtonText = '执行中...';
                                        // setTimeout(() => {
                                             done();
                                        //     setTimeout(() => {
                                        //     instance.confirmButtonLoading = false;
                                        //     }, 300);
                                        // }, 3000);
                                               this.continueExamine()
                                        } else {
                                            done();
                                            this.canOperate=false
                                            this.$message({
                                                    type: 'info',
                                                    message: '已取消审核'
                                            });
                                        }
                                    }
                                    })     
                       }else {
                                    this.canOperate=false
                                    this.$message.error(res.msg)
                           }
                       })
              } else {
                       this.$message.error('请勾选生成排款单数据')
               

            }
      },
        //生成排款建议
     async onExamine() {
            let arr = w2ui.rankMoneySuggest.getSelection()
            let data = {};
                data.ids = arr
            if (this.checkSelection()) {
                         this.canOperate=true
                         const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认选中的数据生成排款单吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                            this.request('accPayable_dischargeAdvice_checkCanBeCreated', data, false).then((res) => {
                                                
                                               if (res.code == 1) {
                                                         done();
                                                         this.checkAgain()  
                                                }else{
                                                        this.canOperate=false
                                                        this.$message.error(res.msg)
                                                          done();
                                                    }
                                                })
                                            // this.request('acc_acc_payable_discharge_audit', data, false).then((res) => {
                                            //     if (res.code == 1) {
                                            //         this.$message.success('审核成功')
                                            //         this.getData()
                                            //          done();
                                            //     } else {
                                            //         this.$message.error(res.msg)
                                            //          done();
                                            //     }
                                            // })
                                        } else {
                                                   done();
                                                   this.canOperate=false
                                                   this.$message({
                                                                type: 'info',
                                                                message: '已取消审核'
                                                        });
                                        }
                                      }
                                    })
               
            } else {
                            this.$message.error('请勾选生成排款单数据')
               

            }

        },
        // 取消审核
        onExamineCancel() {
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'unAudit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_deductionOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '取消审核 备注:'+(value?value:'无')
                            this.request('payable_deductionOrder_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('取消审核成功')
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
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消审核数据')
            }

        },
        //删除
        onDel() {
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'delete'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('payable_deductionOrder_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要删除选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '删除 备注:'+(value?value:'无')
                            this.request('payable_deductionOrder_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success('删除成功')
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
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消删除数据')
            }
        },
        resetForm(name) {
            this.$refs[name].resetFields();
        },
        saveAdjust(){
            let data = {}
            data.targetPurchaseOrderNo = this.adjustObj.codeNo//结算制单号
            data.id = record.id
            this.request('payable_deductionOrder_update', data, false).then(res => {
                if (res.code == '1') {
                    this.getData()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
                this.adjustVisible=false
            })     
        },
        cancelAdjust() {
            this.adjustVisible = false;
            this.resetForm('adjustForm')
        },
        //新增
        adjustAdd() {
            //   adjustList
        },
        adjustRemove() {

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
           if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
           let data={}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.year = filters.get_unix_only(this.formSearch.year)
                        data.companyId = this.formSearch.companyId
                        data.supplierId = this.formSearch.supplierId
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.status = Number(this.formSearch.status)
                        data.deductionType = this.formSearch.deductionType
                        this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
                        this.formSearch.date ? data.endDate = this.formSearch.date[1]   : delete data.endDate
                        data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
                        data.goodsNo = this.formSearch.goodsNo
                        data.deductionStatus = this.formSearch.dtStatus
                        w2ui.deduction.getSelection().length>0?data.ids= w2ui.deduction.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
           this.request('payable_deductionOrder_count',data,false).then(res=>{
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
        onImport(){
                    let data={}
                        if(w2ui.rankMoneySuggest.getSelection().length>0)w2ui.rankMoneySuggest.getSelection().length>0?data.ids= w2ui.rankMoneySuggest.getSelection():delete data.ids
                        else
                            data.pageSize        = this.pagesize
                            data.currentPage     = this.currentPage
                            data.basicCompanyId  = this.formSearch.basicCompanyId
                            data.basicSupplierId = this.formSearch.basicSupplierId
                            data.hasAdviseAmount = this.formSearch.hasAdviseAmount?1:0
                            data.hasFabricAmount = this.formSearch.hasFabricAmount?1:0
                        // w2ui.rankMoneySuggest.getSelection().length>0?data.ids= w2ui.rankMoneySuggest.getSelection():delete data.ids
                        // this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('accPayable_dischargeAdvice_export', data, true).then(res => {
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
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
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
                    console.log('oooo')
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

.marginT0 {
    margin-bottom: 0px !important;
}
</style>

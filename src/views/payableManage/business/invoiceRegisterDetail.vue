<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:10px">
                   <div style="line-height:40px;border-bottom:1px solid #eee;font-weight:bold">基本信息</div>
            </Col>
             <Col style="margin-bottom:0px">
                        <el-form-item label=" 公 司 ：" size="small" >
                            <el-select v-model="formSearch.basicCompanyId" disabled filterable placeholder="请选择" style="width:200px">
                                <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="发票号码：" size="small">
                            <el-input v-model="formSearch.invoiceNo"  disabled>
                            </el-input>
                        </el-form-item>
                           <el-form-item label="供应商 ：" size="small" >
                            <el-select v-model="formSearch.basicSupplierId" disabled filterable placeholder="请选择" style="width:200px">
                                <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="开票日期：" size="small">
                              <el-date-picker v-model="formSearch.invoiceDate"  value-format="yyyy-MM-dd">
                              </el-date-picker>
                        </el-form-item>
                        
            </Col>
             <Col style="margin-bottom:0px">
                         <el-form-item label="到票日期 ：" size="small" >
                               <el-date-picker v-model="formSearch.arriveInvoiceDate"  value-format="yyyy-MM-dd">
                              </el-date-picker>
                        </el-form-item>
                        <el-form-item  label="税额：" size="small">
                              <el-input v-model="formSearch.taxAmount" disabled style="">
                              </el-input>
                        </el-form-item>
                          <el-form-item label="含税总金额：" size="small">
                            <el-input v-model="formSearch.taxIncludedAmount" disabled align="right" style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="不含税金额：" size="small" >
                            <el-input v-model="formSearch.taxExcludedAmount" disabled style="width:190px;"></el-input>
                        </el-form-item>
            </Col>
            <Col style="margin-bottom:0px">
                         <el-form-item label="发票类型:" size="small" >
                           <el-input v-model="formSearch.invoiceTypeName" disabled style="width:200px"></el-input>
                            </el-form-item>
                        <el-form-item label="开票数量：" size="small">
                           <el-input v-model="totalInvoiceQty" disabled style="width:200px"></el-input>
                         </el-form-item>
            </Col>
            <!-- <el-form-item size="small" label-width="100px">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item> -->
           
            <!-- <el-form-item label="单据日期：" size="small" v-if="show == true">
                <el-date-picker style="width:370px" v-model="formSearch.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
        
             
        </el-form>
    </header>
    <section class="middle" style="position:relative"  :style="{ height:showBink?'600px':'430px'}" >
        <span style="position:absolute;font-weight:bold;top:20px">排款明细</span> 
        <!-- <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination> -->
         <el-table :data="tableData" border style="width: 100%;position:relative" ref="mainTable" :maxHeight="tableHieght">
                        <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                            <el-table-column prop="payableReconciliationOrderNo" label="对账单编号" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="purchaseOrderNo" label="制单号" align="center" min-width="120" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="goodsNo" label="大货款号" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="batchNo" label="批次" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="invoiceQty" label="开票数量" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="taxExcludedPrice" label="不含税单价" min-width="120" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.taxExcludedPrice|singlePrice}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taxExcludedAmount" label="不含税金额" min-width="120" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.taxExcludedAmount|moneyFilters}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="tax" label="税率" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="taxAmount" label="税额" min-width="120" align="center" show-overflow-tooltip>
                                 <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.taxAmount|moneyFilters}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taxIncludedPrice" label="含税单价" min-width="120" align="center" show-overflow-tooltip>
                                 <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.taxIncludedPrice|singlePrice}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taxIncludedAmount" label="含税金额" min-width="120" align="center" show-overflow-tooltip>
                                   <template slot-scope="scope">
                                    <div style="text-align:right">{{scope.row.taxIncludedAmount|moneyFilters}}</div>
                                </template>
                            </el-table-column>
                    </el-table>
                    <!-- <div slot="append">
                                <div class='sum_footer xiaoji'>
                                        <div class='sum_footer_unit center el-table_1_column_6  is-center is-leaf'>当页小计</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center   is-leaf'></div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{this.currentPageSum|moneyFilters}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'54678657656'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust   is-leaf'></div>
                                </div>
                                <div class='sum_footer heji'>
                                        <div class='sum_footer_unit center el-table_1_column_6  is-center is-leaf'>合计</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center   is-leaf'></div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                         <div class='sum_footer_unit el-table_1_column_6  is-center  adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center  adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'>{{'13545636565'}}</div>
                                        <div class='sum_footer_unit el-table_1_column_6  is-center adjust  is-leaf'></div>
                                </div>
                      </div> -->
                      <div>
                             <center style="margin-top:10px">
                                    <Button type="primary" @click="onExamine">保存并审核</Button>
                                    <Button type="primary" @click="onSave">保存</Button>
                                    <Button type="default" @click="cancelAdjust">取消</Button>
                             </center>
                      </div>
        <!-- <div id="main" style="width: 100%; height: 350px;"></div> -->
    </section>
</div>
</template>

<script>
var record={}
import filters from '../../../filter/'
import {debounce}from 'mixins/debounce.js'
import {
    mapState
} from 'vuex'
export default {
    mixins:[debounce],
    data() {
        return {
             exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
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
            totalInvoiceQty:'',
            formSearch: {
                        totalInvoiceQty:'',
                        arriveInvoiceDate:'',
                        invoiceDate:'',
                        bizNo:'',
                        bizDate:'',
                        dischargeAmount:'',
                        adviseDischargeAmount:'',
                        paidAmount:'',
                        poUnderInvoiceAmount:'',
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
            currentPageSum:'',
            tableData:[]
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
        // this.resize()
        this.getData()
        this.getDetail()
        if(document.body.clientWidth<1600){
                                $('.el-table').css({'max-height':'250px'})
                                $('.adjust').eq(0).css({'text-indent':'60px'})
                                $('.adjust').eq(1).css({'text-indent':'30px'})
                                $('.adjust').eq(2).css({'text-indent':'20px'}) 
                                $('.adjust').eq(6).css({'text-indent':'60px'})
                                $('.adjust').eq(7).css({'text-indent':'30px'})
                                $('.adjust').eq(8).css({'text-indent':'20px'})
                         }else{
                                $('.adjust').eq(0).css({'text-indent':'25px'})
                                $('.adjust').eq(1).css({'text-indent':'25px'})
                                $('.adjust').eq(2).css({'text-indent':'10px'}) 
                                $('.adjust').eq(6).css({'text-indent':'25px'})
                                $('.adjust').eq(7).css({'text-indent':'25px'})
                                $('.adjust').eq(8).css({'text-indent':'10px'})  
                                $('.el-table').css({'max-height':'450px'})    
         }

    },
    methods: {
        resize(){
            window.onresize=()=>{
                   if(document.body.clientWidth){
                         if(document.body.clientWidth<1600){
                                $('.adjust').eq(0).css({'text-indent':'60px'})
                                $('.adjust').eq(1).css({'text-indent':'30px'})
                                $('.adjust').eq(2).css({'text-indent':'20px'}) 
                                $('.adjust').eq(6).css({'text-indent':'60px'})
                                $('.adjust').eq(7).css({'text-indent':'30px'})
                                $('.adjust').eq(8).css({'text-indent':'20px'})
                         }else{
                                $('.adjust').eq(0).css({'text-indent':'25px'})
                                $('.adjust').eq(1).css({'text-indent':'25px'})
                                $('.adjust').eq(2).css({'text-indent':'10px'}) 
                                $('.adjust').eq(6).css({'text-indent':'25px'})
                                $('.adjust').eq(7).css({'text-indent':'25px'})
                                $('.adjust').eq(8).css({'text-indent':'10px'})      
                         }
                       }
                   }
            // }
        },
        handleChange(price){
                            // let currentPageSum=0;
                            //      this.tableData.forEach(x=>{
                            //        if(x.delayDays){
                                    
                            //         }else{
                            //             x.delayDays=0  
                            //         }
                            //         currentPageSum+=x.delayDays*100
                            //     })
                            //  this.currentPageSum=currentPageSum/100
                              let    currentPageSum=this.tableData.reduce((val,item)=>{
                                         if(!item.dischargeAmount){
                                             item.dischargeAmount=0
                                         }
                                         return val+item.dischargeAmount
                               },0)
                                 console.log(currentPageSum)
                                this.formSearch.dischargeAmount=currentPageSum
                            
        },
        onSave(){
                const {tag,code}=this.$route.query
                let data={
                          id:this.$route.query.id,
                          invoiceDate:this.formSearch.invoiceDate,
                          arriveInvoiceDate:this.formSearch.arriveInvoiceDate,
                          status:0
                     }
                this.request('accPayable_invoiceRegister_update',data,false).then(res=>{
                       if(res.code==1){
                           this.$message.success('保存成功')
                           this.$root.eventHub.$emit('closePageFromOtherPage', 'invoiceRegisterDetail');//关闭新增页面
                        //    setTimeout(()=>{
                                this.$router.push({
                                        name:'invoiceRegister',
                                        query:{
                                                code:code
                                        }
                                }) 
                        //    },1000)
                            
                       }else{
                             this.$message.error(res.msg)
                       }
                })
        },
         onExamine(){
                const {tag,code}=this.$route.query
                let data={
                          id:this.$route.query.id,
                          invoiceDate:this.formSearch.invoiceDate,
                          arriveInvoiceDate:this.formSearch.arriveInvoiceDate,
                          status:1
                     }
                this.request('accPayable_invoiceRegister_update',data,false).then(res=>{
                       if(res.code==1){
                           this.$message.success('保存并审核成功')
                           this.$root.eventHub.$emit('closePageFromOtherPage', 'invoiceRegisterDetail');//关闭新增页面
                           setTimeout(()=>{
                                this.$router.push({
                                        name:'invoiceRegister',
                                        query:{
                                                code:code
                                        }
                                }) 
                           },1000)
                            
                       }else{
                             this.$message.error(res.msg)
                       }
                })
        },
        
        getDetail(){
                 const {id}=this.$route.query
                 let data = {}
                     data.payableInvoiceRegisterId =id
            this.request('accPayable_invoiceRegisterDetail_queryDetail', data, true).then(res => {
                if (res.code == 1) {
                       this.tableData=res.data.records
                    //    this.formSearch.totalInvoiceQty=res.data.totalSum.totalInvoiceQty
                    //    this.$set(this.formSearch,'totalInvoiceQty',1000)
                       this.totalInvoiceQty=res.data.totalSum.totalInvoiceQty
                    //    this.tableData[0].unpaidAmount=20000
                } else {
                    // this.initTable([])
                    this.$message({
                        message: res.msg,  
                        type: 'error'
                    });
                }
            })
                   
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
        // initTable(arr = [], current, total) {
        //     let self = this;
        //     $(function () {
        //         $('#main').w2grid({
        //             name: 'deduction',
        //             show: {
        //                 toolbar: true,
        //                 selectColumn: true,
        //             },
        //             reorderColumns: true,
        //             reorderRows: true,
        //             columns: [
        //                  {
        //                     field: 'index',
        //                     caption: '序号',
        //                     size: '80px',
        //                     sortable: true,
        //                     info: true
        //                 },
        //                 {
        //                     field: 'statusStr',
        //                     caption: '单据状态',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'bizDate',
        //                     caption: '业务日期',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'bizCode',
        //                     caption: '创建时间',
        //                     size: '100px',
        //                     sortable: true
        //                 },

        //                 {
        //                     field: 'supplierName',
        //                     caption: '排款单号',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'companyName',
        //                     caption: '公司',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'brandName',
        //                     caption: '建议排款金额',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'targetPurchaseOrderNo',
        //                     caption: '本次排款金额',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'goodsNo',
        //                     caption: '付款金额',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'deductionAmount',
        //                     caption: '扣款金额',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'deductionType',
        //                     caption: '已排未付金额',
        //                     size: '100px'
        //                 },
        //                 {
        //                     field: 'reconciliationOrderCode',
        //                     caption: '付款状态',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'deductionStatusStr',
        //                     caption: '关闭状态',
        //                     size: '100px',
        //                     sortable: true
        //                 },
        //                 {
        //                     field: 'lastUpdated',
        //                     caption: '最后修改时间',
        //                     size: '100px',
        //                     sortable: true
        //                 },

        //             ],
        //             onClick: function (event) {
        //                 record = this.get(event.recid);
        //                 console.log(this.get(event.recid))
                        
        //                 self.activeName = 'first'
        //                 setTimeout(function(){
        //                     if(w2ui.deduction.getSelection().length == 1){
        //                         let arr = w2ui.deduction.getSelection()
        //                         if(arr[0] != record.id){
        //                                // console.log('--------------')
        //                         }else{
        //                             self.getGoodsList(event.recid)
        //                             self.$store.commit('getdeductionId', event.recid)
        //                             self.logPage = 1
        //                         }
        //                     }else{
        //                         self.resetCommit()
        //                     }
        //                 }, 200);
        //             }
        //         })
        //     });
        //     if (arr.length > 0) {
        //         w2ui.deduction.clear(); //清空
        //         w2ui.deduction.records = arr
        //         w2ui.deduction.records.push({
        //             w2ui: {
        //                 summary: true
        //             },
        //             index: '<span>当页小计</span>',
        //             deductionAmount: current.deductionAmount,
        //         }, {
        //             w2ui: {
        //                 summary: true
        //             },
        //             index: '<span >合计</span>',
        //             deductionAmount: total.deductionAmount,
        //         })
        //         $('#main').w2render('deduction');
        //         w2ui.deduction.refresh();
        //     } else {
        //         $(document).ready(function () {
        //             w2ui.deduction.clear(); //清空
        //             w2ui['deduction'].records = []
        //             w2ui.deduction.refresh();
        //             $('#main').w2render('deduction')
        //         })

        //     }

        // },
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
                year:new Date()
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
            const {id}=this.$route.query
            let data = {}
                data.id =id
            this.request('accPayable_invoiceRegister_page', data, true).then(res => {
                if (res.code == 1) {
                          this.formSearch=res.data.records[0]
                          this.formSearch.taxAmount=filters.moneyFilters(res.data.records[0].taxAmount)
                          this.formSearch.taxIncludedAmount=filters.moneyFilters(res.data.records[0].taxIncludedAmount)
                          this.formSearch.taxExcludedAmount=filters.moneyFilters(res.data.records[0].taxExcludedAmount)
                          this.$set(this.formSearch,'invoiceDate',res.data.records[0].invoiceDate)
                          this.$set(this.formSearch,'arriveInvoiceDate',res.data.records[0].arriveInvoiceDate)
                    // this.loading = false
                } else {
                    // this.initTable([])
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
            let arr = w2ui.deduction.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //继续审核
        continueExamine() {
            let arr = w2ui.deduction.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            data.continueAudit = 1;
            data.remark = '审核'
            this.request('payable_reconciliationOrder_command', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success('审核成功')
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })

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
        // cancelAdjust() {
        //      this.getData()
        //      this.getDetail()
        // },
        cancelAdjust(){
                  const {tag,code}=this.$route.query
                    this.$root.eventHub.$emit('closePageFromOtherPage', 'invoiceRegisterDetail');//关闭新增页面
                    this.$router.push({
                                        name:'invoiceRegister',
                                        query:{
                                                code:code
                                        }
                                }) 
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
                        this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
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
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.year = filters.get_unix_only(this.formSearch.year)
                        data.companyId = this.formSearch.companyId
                        data.supplierId = this.formSearch.supplierId
                        data.purchaseOrderNo = this.formSearch.purchaseOrderNo
                        data.status = Number(this.formSearch.status)
                        data.deductionType = this.formSearch.deductionType
                        this.formSearch.date ? data.startDate = this.formSearch.date[0] : delete data.startDate
                        this.formSearch.date ? data.endDate = this.formSearch.date[1] : delete data.endDate
                        data.targetPurchaseOrderNo = this.formSearch.targetPurchaseOrderNo
                        data.goodsNo = this.formSearch.goodsNo
                        data.deductionStatus = this.formSearch.dtStatus
                        w2ui.deduction.getSelection().length>0?data.ids= w2ui.deduction.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('payable_deductionOrder_exportAsync', data, false).then(res => {
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
    padding: 10px 10px 10px 20px;
    margin-bottom: 10px;}
// }

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
.sum_footer{
         display:flex;
         display:-webkit-flex;
         line-height:30px;
         color:#606266;
    }
    .sum_footer_unit{
        flex:1;
        /* -webkit-flex-grow:1; */
        text-indent:30px;
        font-size:13px;
        &:nth-child(1){
           text-indent:25px;  
           
        };
        &:nth-child(2){
           text-indent:25px;  
        };
        &:nth-child(3){
           text-indent:25px;  
        };
        &:nth-child(4){
           text-indent:15px;  
        };
        &:nth-child(5){
           text-indent:-15px;  
        };
        &:nth-child(7){
           text-indent:90px;  
        };
    }
    .sum_footer_unit.center{
        text-align:center;
        // text-indent:10px;
    }
    .sum_footer.xiaoji,.sum_footer.heji{
        border-bottom:1px solid #EBEEF5;
        border-left:1px solid #EBEEF5;
        border-right:1px solid #EBEEF5;
       
    }
    .el-table__append-wrapper{
        margin-top:-1px;
       
    }
</style>

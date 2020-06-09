<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <Col style="margin-bottom:20px">
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1"  size="small" type="primary"  @click="onAdd">新增</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1"  size="small" type="primary" @click="onExamine">审核</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('取消审核') !== -1" size="small" type="primary" @click="onExamineCancel">取消审核</el-button>
                </el-form-item>
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="modify">编辑</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
                </el-form-item>
                 <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('导入') !== -1" size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <el-form-item size="small" class="marginT0">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
            </Col>
            <!-- <el-divider></el-divider> -->
              <el-form-item label=" 公 司 ：" size="small">
                <el-select v-model="formSearch.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.basicSupplierId" filterable clearable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="单据状态：" size="small">
                <el-select v-model="formSearch.status" filterable clearable placeholder="请选择" style="width:155px">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item  label="单据日期：" size="small">
                 <el-date-picker v-model="formSearch.arriveTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
             
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 350px;"></div>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name="first">
                <section class="middle">
                    <el-table :data="logsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                        <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="logsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="logsList.length>0&&!dataFlag">没有更多了…</div>
                </section>
            </el-tab-pane>
        </el-tabs>
    </section>
    <!--新增-->
    <Modal v-model="adjustVisible" :styles="mystyle"  :title="title" @on-cancel='cancelAdjust' :width="740" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="adjustForm" :model="adjustObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                        <el-form-item label="公司：" size="small" label-width="95px" prop="basicCompanyId">
                            <el-select v-model="adjustObj.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                                  <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供应商：" size="small" label-width="95px" prop="basicSupplierId">
                               <el-select v-model="adjustObj.basicSupplierId" filterable clearable placeholder="请选择" style="width:220px">
                                   <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                               </el-select>
                       </el-form-item>
                 </Col>
                 <Col>
                <el-form-item label="付款日期：" size="small" label-width="95px" prop="payTime">
                     <el-date-picker v-model="adjustObj.payTime"  type="date" value-format="yyyy-MM-dd" style="width:220px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：" size="small" label-width="95px" prop="amount">
                         <el-input-number clearable v-model.trim="adjustObj.amount" :controls="false" :precision="2" :min="0.00" style="width:220px"></el-input-number>
                        <!-- <el-input v-model="adjustObj.kklx"  style="width:200px"></el-input> -->
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="付款方式：" size="small" label-width="95px" prop="payway">
                      <el-select v-model="adjustObj.payway" filterable clearable placeholder="请选择" style="width:220px">
                                   <el-option v-for="item in payList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                </el-form-item>
                </Col>
                <Col>
                   <el-form-item label="备注：" size="small" label-width="95px" prop="remark">
                            <el-input v-model="adjustObj.remark" clearable style="width:510px"></el-input>
                   </el-form-item>
                </Col>
                <Col>
                <el-form-item size="small" label-width="95px" style="padding-left:230px">
                    <!-- <Button type="primary" @click="submitForm('adjustForm')">保存并审核</Button> -->
                    <Button type="primary" @click="submitForms('adjustForm')">保存</Button>
                    <Button type="default" @click="cancelAdjust">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--修改-->
    <Modal v-model="editVisible" :styles="mystyle" :title="title" @on-cancel='cancelEdit' :width="740" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="editForm" :model="editObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                         <el-form-item label="付款单号：" size="small" label-width="95px" prop="remark">
                            <el-input disabled v-model="editObj.bizNo" clearable style="width:220px"></el-input>
                         </el-form-item>
                        <el-form-item label="公司：" size="small" label-width="95px" prop="basicCompanyId">
                            <el-select v-model="editObj.basicCompanyId" filterable clearable placeholder="请选择" style="width:220px">
                                  <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                 </Col>
                 <Col>
                    <el-form-item label="供应商：" size="small" label-width="95px" prop="basicSupplierId">
                                <el-select v-model="editObj.basicSupplierId" filterable clearable placeholder="请选择" style="width:220px">
                                    <el-option v-for="item in supplyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                    </el-form-item>
                    <el-form-item label="付款日期：" size="small" label-width="95px" prop="payTime2">
                        <el-date-picker v-model="editObj.payTime2"  type="date" value-format="yyyy-MM-dd" style="width:220px">
                    </el-date-picker>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item label="付款方式：" size="small" label-width="95px" prop="payway">
                      <el-select v-model="editObj.payway" filterable clearable placeholder="请选择" style="width:220px">
                                  <el-option v-for="item in payList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                </el-form-item>
                 <el-form-item label="付款金额：" size="small" label-width="95px" prop="amount">
                            <el-input-number clearable v-model.trim="editObj.amount" :controls="false" :precision="2" :min="0.00" style="width:220px"></el-input-number>
                </el-form-item>
                </Col>
                <Col>
                   <el-form-item label="备注：" size="small" label-width="95px" prop="remark">
                            <el-input v-model="editObj.remark" clearable style="width:510px"></el-input>
                   </el-form-item>
                </Col>
                <Col>
                <el-form-item size="small" label-width="95px" style="padding-left:230px">
                    <!-- <Button type="primary" @click="submitForm('editForm')">保存并审核</Button> -->
                    <Button type="primary" @click="submitForm12('editForm')">保存</Button>
                    <Button type="default" @click="cancelEdit">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--导入选择文件-->
    <Modal v-model="visible" title="导入文件" @on-cancel='cancelImport'>
                   <el-form :inline="true" ref="editForm" :model="subObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules" @submit.native.prevent>
                            <span style="color:red;position:absolute;left:50px;top:77px">*</span>
                            <el-form-item label="公司：" size="small" label-width="95px" >
                                   
                                    <el-select v-model="basicCompanyId" filterable clearable placeholder="请选择" style="width:200px">
                                        <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                            </el-form-item>
                    </el-form>
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/markchange/markChangeRecord/uploadAsync" :data="{}">
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
            <Button type="default" @click="cancelImport">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>

import filters from '../../../filter/'
// import importComponent from '../components/import.vue'
import {
    mapState
} from 'vuex'
let record;
export default {
    // components:{
    //       importComponent,
    // },
    data() {
        return {
            payableUserList:[],
            basicCompanyId:'',
            exportObj:{
                       selected:''
            },
            subObj:{},
            file: null,
            name: '',
            visible: false,
            title:'新增',
            exportVisible:false,
            moreLarge:false,
            show: false,
            loading: false,
            dataFlag:true,
            examineVisible: false, // 审核框
            dialogVisible: false, // 生成对账单框
            adjustVisible: false, // 扣款调整
            editVisible:false,
            activeName: 'first',
            adjustObj: {
                       basicCompanyId:'',
                       basicSupplierId:'',
                       payTime:'',
                       payway:'',
                       amount:'',
                       remark:'',
            }, // 扣款调整数据对象
            editObj: {
                       basicCompanyId:'',
                       basicSupplierId:'',
                       payTime:'',
                       payway:'',
                       amount:'',
                       remark:'',
            }, // 扣款调整数据对象
            adjustList: [], //  调整扣款的列表 
            logList: [], // 日
            formSearch: {
                        basicCompanyId:'',
                        basicSupplierId:'',
                        status:'',
                        arriveTime:'',
            },
            companyList: [], // 公司列表
            supplyList: [], //供应商列表
            addBillObj: {},
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            logPage:1,
            dataFlag:true,
            judgeMenu: [],
            buttonList: [], //按钮权限
            AList  :[],
            payList:[],//支付方式列表
            rules  : {
                basicCompanyId: [{
                                required: true,
                                message: '请选择',
                                trigger: 'change'
                }],
                basicSupplierId: [{
                            required: true,
                            message: '请选择',
                            trigger: 'change'
                }],
                amount: [
                      {
                        required: true,
                        message: '请输入',
                        trigger: 'blur',
                      },
                      {pattern:/^[1-9]\d*(\.\d+)?$/i,message:'付款金额大于0'}
                ],
                payTime: [{
                            required: true,
                            message: '请选择',
                            trigger: 'change'
                }],
                 payTime2: [{
                            required: true,
                            message: '请选择',
                            trigger: 'blur'
                }],
                payway: [{
                            required: true,
                            message: '请选择',
                            trigger: 'change'
                }],
            },
        }
    },
    computed: mapState({
                geNewData: state => state.paymentBill.deductionList,
                logsList: state => state.paymentBill.deductionLogList,
                deductionId: state => state.paymentBill.id,
    }),
    created() {
        this.getCompany()
        this.getSupply()
        this.getPayableUser()
    },
    destroyed() {
        this.resetCommit()
        this.logPage=1;
        this.logList=[];
    },
    mounted() {
        // this.formSearch.year = new Date()
        this.logList=[];
        this.getButtonJurisdiction() //按钮权限
        this.getPaywayList()
        this.initTable([])
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.basicSupplierId = ''
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
        getPaywayList(){
              this.request('masterdata_basicpayablepayway_selector',{},false).then(res=>{
                  if(res.code==1){
                            this.payList=res.data
                  }
              })
        },
        onAdd(){
                  this.adjustVisible=true
                  this.title="新增"
                  for(let i in this.adjustObj){
                    this.adjustObj[i]=''
                  }
        },
        modify(){

                  let arr = w2ui.paymentBill.getSelection()
                if(arr.length<1){
                    this.$message.error('请选择编辑数据')
                }else if(arr.length>1){
                    this.$message.error('一次只能修改一条数据')
                }else if(arr.length==1){
                    this.editVisible=true
                    this.title="编辑" 
                    this.editObj = this.getRowData(arr[0])
                    this.$set(this.editObj,'payTime2',this.getRowData(arr[0]).paidDate)
                    this.$set(this.editObj,'payway',this.getRowData(arr[0]).paidWayId)
                    this.$set(this.editObj,'amount',(String(this.getRowData(arr[0]).paidAmount)).indexOf(',')>-1?(this.getRowData(arr[0]).paidAmount).replace(/,/gi, ''):this.getRowData(arr[0]).paidAmount)
                }
        },
        getRowData(id){
             for(let i=0,len=this.list.length;i<len;i++){
                 if(this.list[i].id==id){
                     return this.list[i]
                 }
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
                    // console.log(this.getButtonJurisdiction())
                }
            })
        },
        initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'paymentBill',
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
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        {
                            field: 'status',
                            caption: '单据状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '单据日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizNo',
                            caption: '付款单编号',
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
                            field: 'basicSupplierName',
                            caption: '供应商',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'paidAmount',
                            caption: '付款金额',
                            size: '100px',
                            render: 'money',
                            sortable: true
                        },
                        {
                            field: 'paidDate',
                            caption: '付款日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'paidWay',
                            caption: '付款方式',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'remark',
                            caption: '备注',
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
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },

                    ],
                    onClick: function (event) {
                        let    record = this.get(event.recid);
                             console.log(this.get(event.recid))
                                 
                        setTimeout(function(){
                            if(w2ui.paymentBill.getSelection().length == 1){
                                let arr = w2ui.paymentBill.getSelection()
                                if(arr[0]!= record.id){
                                       // console.log('--------------')
                                }else{
                                    // self.getGoodsList(event.recid)
                                    self.$store.commit('getpaymentBillId', event.recid)
                                    self.getLoglist(event.recid)
                                    self.logPage = 1
                                    self.activeName = 'first'
                                }
                            }else{
                                   self.resetCommit()
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.paymentBill.clear(); //清空
                w2ui.paymentBill.records = arr
                w2ui.paymentBill.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    payableAmount: current.totalPayableAmount,
                    dischargeAmount:current.totalDischargeAmount,
                    undischargeAmount:current.totalUndischargeAmount,
                    paidAmount:current.totalPaidAmount,
                    unpaidAmount:current.totalUnpaidAmount,
                    frozenDischargeAmount:current.frozenDischargeAmount,
                    verifyAmount:current.totalVerifyAmount
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    payableAmount: total.totalPayableAmount,
                    dischargeAmount:total.totalDischargeAmount,
                    undischargeAmount:total.totalUndischargeAmount,
                    paidAmount:total.totalPaidAmount,
                    unpaidAmount:total.totalUnpaidAmount,
                    frozenDischargeAmount:total.frozenDischargeAmount,
                    verifyAmount:total.totalVerifyAmount
                })
                $('#main').w2render('paymentBill');
                w2ui.paymentBill.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.paymentBill.clear(); //清空
                    w2ui['paymentBill'].records = []
                    w2ui.paymentBill.refresh();
                    $('#main').w2render('paymentBill')
                })

            }

        },
        resetCommit() {
            this.$store.commit('clearpaymentBillId')
            this.$store.commit('clearpaymentBillLogList')
            // this.$store.commit('cleardeductionLogList')
        },
        onReset() {
            for (let i in this.formSearch) {
                this.formSearch[i] = ''
            }
            this.getSupply()
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
            this.activeName='first';
            this.logList = []
            let data = {}
                data.pageSize        = this.pagesize
                data.currentPage     = this.currentPage
                data.basicCompanyId  = this.formSearch.basicCompanyId  //
                data.basicSupplierId = this.formSearch.basicSupplierId //供应商id
                data.payableUserId = this.formSearch.payableUser//所属人员
                this.formSearch.arriveTime?data.bizStartDate=this.formSearch.arriveTime[0]:delete data.bizStartDate;
                this.formSearch.arriveTime?data.bizEndDate=this.formSearch.arriveTime[1]:delete data.bizEndDate;
                data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';       
            this.request('acc_acc_payment_query_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
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
            data.payableId = id
            this.request('eop_boot_payable_detail', data, false).then((res) => {
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
        getLoglist(id) {
            let data = {}
            data.billNo =id?'acc_payment_'+id:'acc_payment_'+ this.deductionId
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize){
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                        this.$store.commit('initpaymentBillLogList', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('initpaymentBillLogList', this.logList)
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
            let arr = w2ui.paymentBill.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false

        },
        //继续审核
        continueExamine() {
            let arr = w2ui.paymentBill.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            data.continueAudit = 1;
            data.remark = '审核'
            this.request('payable_reconciliationOrder_command', data, false).then((res) => {
                if (res.code == 1) {
                    this.$message.success(res.msg)
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },
        getPayName(id){
             for(let i=0,len=this.payList.length;i<len;i++){
                 if(this.payList[i].id==id){
                     return this.payList[i].name
                 }
             }                
        },
        getArray(){
                let arr = w2ui.paymentBill.getSelection()
                console.log(arr,'99999')
                let subArray=[]
                for(let i=0,len=this.list.length;i<len;i++ ){
                   for(let j=0,len2=arr.length;j<len2;j++){
                       if(this.list[i].id==arr[j]){
                           subArray.push(this.list[i])
                       }
                   }
                }
                for(let i=0,len2=subArray.length;i<len2;i++){
                    for(let j=i+1;j<len2;j++){
                        if(subArray[i].id==subArray[j].id){
                           subArray.splice(j,1)
                            len2--;
                            j-- ;
                        }
                    }
                }
                return subArray
        },
        //审核
        onExamine() {
                 let arr = w2ui.paymentBill.getSelection()
                 if(arr.length==0){
                      return  this.$message.error('请勾选审核数据')
                }else if(arr.length>0){
                                    const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认审核选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                               let data = {};
                                                    data.ids= arr
                                                    this.request('acc_acc_payment_audit', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('审核成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })
                        //  let data = {};
                        //       data.ids= arr
                            // this.request('acc_acc_payment_audit', data, false).then((res) => {
                            //     if (res.code == 1) {
                            //         this.$message.success(res.msg)
                            //         this.getData()
                            //     } else {
                            //         this.$message.error(res.msg)
                            //     }
                            // })
                }
          

        },
        // 取消审核
        onExamineCancel() {
             let arr = w2ui.paymentBill.getSelection()
                 if(arr.length==0){
                      return  this.$message.error('请勾选取消审核数据')
                }else if(arr.length>0){
                               const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认取消审核选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                                let data = {};
                                                    data.ids= arr
                                                    this.request('acc_acc_payment_cancelAudit', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('取消审核成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })
                        //  let data = {};
                        //       data.ids =arr
                        //     this.request('acc_acc_payment_cancelAudit', data, false).then((res) => {
                        //         if (res.code == 1) {
                        //             this.$message.success(res.msg)
                        //             this.getData()
                        //         } else {
                        //             this.$message.error(res.msg)
                        //         }
                        //     })
                }
            //   let arr = w2ui.paymentBill.getSelection()
            //     if(arr.length>1){
            //           return this.$message.error('一次只能取消审核一条数据')
            //     }else if(arr.length==0){
            //           return  this.$message.error('请勾选取消审核数据')
            //     }else if(arr.length==1){
            //              let data = {};
            //                  data.payableId = arr[0]
            //                 this.request('eop_boot_payable_payable_unaudit', data, false).then((res) => {
            //                     if (res.code == 1) {
            //                         this.$message.success(res.msg)
            //                         this.getData()
            //                     } else {
            //                         this.$message.error(res.msg)
            //                     }
            //                 })
            //     }
            // let arr = w2ui.paymentBill.getSelection()
            // let data = {};
            // // data.command = 'unAudit'
            // data.payableId = arr
            // if (this.checkSelection()) {
            //     this.request('payable_deductionOrder_check', data, false).then((res) => {
            //         if (res.code == 1) {
            //             this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
            //                 confirmButtonText: '确定',
            //                 cancelButtonText: '取消',
            //             }).then(({
            //                 value
            //             }) => {
            //                 data.remark = '取消审核 备注:'+(value?value:'无')
            //                 this.request('eop_boot_payable_payable_unaudit', data, false).then((res) => {
            //                     if (res.code == 1) {
            //                         this.$message.success('取消审核成功')
            //                         this.getData()
            //                     } else {
            //                         this.$message.error(res.msg)
            //                     }
            //                 })
            //             }).catch(() => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: '已取消'
            //                 });
            //             });
            //         } else {
            //             this.$message.error(res.msg)
            //         }
            //     })
            // } else {
            //     this.$message.error('请勾选取消审核数据')
            // }

        },
        //删除
        onDel() {
            let arr = w2ui.paymentBill.getSelection()
            let data = {};
               data.ids = arr
            if (this.checkSelection()) {
                  const h = this.$createElement;
                                    this.$msgbox({
                                    title: '操作确认',
                                    message: h('p', null, [
                                        h('span', null, '确认删除选中的数据吗'),
                                        h('i', { style: 'color: teal' }, '')
                                    ]),
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                                let data = {};
                                                    data.ids= arr
                                                    this.request('acc_acc_payment_delete', data, false).then((res) => {
                                                        if (res.code == 1) {
                                                             this.$message.success('删除成功')
                                                               done();
                                                               this.getData()
                                                        } else {
                                                               this.$message.error(res.msg)
                                                               done();
                                                        }
                                                    })
                                        } else {
                                                done();
                                                this.$message({
                                                        type: 'info',
                                                        message: '已取消'
                                                });
                                                }
                                    }
                                    })  
                // this.request('acc_acc_payment_delete', data, false).then((res) => {
                //     if (res.code == 1) {
                //           this.$message.success('删除成功')
                //           this.getData()
                //     } else {
                //           this.$message.error(res.msg)
                //     }
                // })
            } else {
                   this.$message.error('请勾选取消删除数据')
            }
        },
        resetForm(name) {
            this.$refs[name].resetFields();
        },
        submitForm12(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                      this.saveEdit()
                } else {
                    return false;
                }
            });
        },
        submitForms(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveAdd()
                } else {
                        return false;
                }
            })
        },
        getCompanyName(id){
             for(let i=0,len=this.companyList.length;i<len;i++){
                 if(this.companyList[i].id==id){
                      return this.companyList[i].name
                 }
             }     
        },
         getCompanyCode(id){
             for(let i=0,len=this.companyList.length;i<len;i++){
                 if(this.companyList[i].id==id){
                      return this.companyList[i].code
                 }
             }     
        },
        getSupplierName(id){
            for(let i=0,len=this.supplyList.length;i<len;i++){
                if(this.supplyList[i].id==id){
                    return this.supplyList[i].name
                }
            }
        },
         getSupplierCode(id){
            for(let i=0,len=this.supplyList.length;i<len;i++){
                if(this.supplyList[i].id==id){
                    return this.supplyList[i].code
                }
            }
        },
        saveAdd(){
                  let data={}
                      data.basicCompanyId=this.adjustObj.basicCompanyId
                      data.basicCompanyCode=this.getCompanyCode(this.adjustObj.basicCompanyId)
                      data.basicCompanyName=this.getCompanyName(this.adjustObj.basicCompanyId)
                      data.basicSupplierId=this.adjustObj.basicSupplierId
                      data.basicSupplierCode=this.getSupplierCode(this.adjustObj.basicSupplierId)
                      data.basicSupplierName=this.getSupplierName(this.adjustObj.basicSupplierId)
                      data.paidDate=this.adjustObj.payTime
                      data.paidAmount=this.adjustObj.amount
                      data.paidWayId=this.adjustObj.payway
                      data.paidWay=this.getPayName(this.adjustObj.payway)
                      data.remark=this.adjustObj.remark       
                this.request('acc_acc_payment_save',data,false).then(res=>{
                        if(res.code==1){
                            this.adjustVisible=false;
                            for(let i in this.adjustObj){
                                this.adjustObj[i]=''  
                             }  
                            this.resetForm('adjustForm')
                            this.getData()
                            this.$message.success('新增成功')
                        }else{
                             this.$message.error(res.msg)
                        }
                })        
        },
        saveEdit(){

                  let data={}
                      data.id=this.editObj.id;
                      data.bizNo=this.editObj.bizNo
                      data.basicCompanyId=this.editObj.basicCompanyId
                      data.basicCompanyCode=this.getCompanyCode(this.editObj.basicCompanyId)
                      data.basicCompanyName=this.getCompanyName(this.editObj.basicCompanyId)
                      data.basicSupplierId=this.editObj.basicSupplierId
                      data.basicSupplierCode=this.getSupplierCode(this.editObj.basicSupplierId)
                      data.basicSupplierName=this.getSupplierName(this.editObj.basicSupplierId)
                      data.paidDate=this.editObj.payTime2
                      data.paidAmount=this.editObj.amount
                      data.paidWayId=this.editObj.payway
                      data.paidWay=this.getPayName(this.editObj.payway)
                      data.remark=this.editObj.remark       
                this.request('acc_acc_payment_update',data,false).then(res=>{
                        if(res.code==1){
                             this.editVisible=false;
                             this.getData()
                             this.$message.success('编辑成功')
                        }else{
                             this.$message.error(res.msg)
                        }
                })  
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
         cancelEdit() {
            this.editVisible = false;
            // for(let i in this.adjustObj){
            //      this.adjustObj[i]=''
            // }
            // this.resetForm('editForm')
        },
        checkImport(){
                     this.$refs.importComp.visible=true
                     this.$refs.importComp.importURL='payable_billArrivalRegistration_uploadAsync'
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        // getExportTotal(){
        //    if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
        //    let data={}
        //                     data.pageSize = this.pagesize
        //                     data.currentPage = this.currentPage
        //                     // data.year = filters.get_unix_only(this.formSearch.year)
        //                     data.basicCompanyId  = this.formSearch.companyId  //
        //                     data.basicSupplierId = this.formSearch.supplierId//供应商id
        //                     data.invoiceNo=   this.formSearch.invoiceNo;//发票号
        //                     this.formSearch.createTime?data.createdStartTime=this.formSearch.createTime[0]:delete data.createdStartTime; //创建日期开始时间
        //                     this.formSearch.createTime?data.createdEndTime=this.formSearch.createTime[1]:delete data.createdEndTime;      //创建日期结束时间
        //                     this.formSearch.invoiceTime?data.invoiceStartDate=this.formSearch.invoiceTime[0]:delete data.invoiceStartDate;
        //                     this.formSearch.invoiceTime?data.invoiceEndDate=this.formSearch.invoiceTime[1]:delete data.invoiceEndDate;
        //                     this.formSearch.arriveTime?data.arriveInvoiceStartDate=this.formSearch.arriveTime[0]:delete data.arriveInvoiceStartDate;
        //                     this.formSearch.arriveTime?data.arriveInvoiceEndDate=this.formSearch.arriveTime[1]:delete data.arriveInvoiceEndDate;
        //                     data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';                      //结束状态
        //                     data.invoiceType=this.formSearch.invoiceType!=''?Number(this.formSearch.invoiceType):'';     
        //                     w2ui.paymentBill.getSelection().length>0?data.ids= w2ui.paymentBill.getSelection():delete data.ids
        //                     this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
        //    this.request('payable_deductionOrder_count',data,false).then(res=>{
        //        if(res.code==1){
        //            if(res.data>100000){
        //                this.moreLarge=true
        //            }else{
        //                this.moreLarge=false
        //                this.onImport()
        //            }
        //        }else{
        //            this.$message.error(res.msg)
        //        }
        //    })
        // },
        //  //导出
        // onImport(){
        //             let data={}
        //                     data.pageSize = this.pagesize
        //                     data.currentPage = this.currentPage
        //                     // data.year = filters.get_unix_only(this.formSearch.year)
        //                     data.basicCompanyId  = this.formSearch.companyId  //
        //                     data.basicSupplierId = this.formSearch.supplierId//供应商id
        //                     data.invoiceNo=   this.formSearch.invoiceNo;//发票号
        //                     this.formSearch.createTime?data.createdStartTime=this.formSearch.createTime[0]:delete data.createdStartTime; //创建日期开始时间
        //                     this.formSearch.createTime?data.createdEndTime=this.formSearch.createTime[1]:delete data.createdEndTime;      //创建日期结束时间
        //                     this.formSearch.invoiceTime?data.invoiceStartDate=this.formSearch.invoiceTime[0]:delete data.invoiceStartDate;
        //                     this.formSearch.invoiceTime?data.invoiceEndDate=this.formSearch.invoiceTime[1]:delete data.invoiceEndDate;
        //                     this.formSearch.arriveTime?data.arriveInvoiceStartDate=this.formSearch.arriveTime[0]:delete data.arriveInvoiceStartDate;
        //                     this.formSearch.arriveTime?data.arriveInvoiceEndDate=this.formSearch.arriveTime[1]:delete data.arriveInvoiceEndDate;
        //                     data.status=this.formSearch.status!=''?Number(this.formSearch.status):'';                      //结束状态
        //                     data.invoiceType=this.formSearch.invoiceType!=''?Number(this.formSearch.invoiceType):'';       //发票类型

                        
        //                     w2ui.paymentBill.getSelection().length>0?data.ids= w2ui.paymentBill.getSelection():delete data.ids
        //                     this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
        //               this.request('payable_deductionOrder_exportAsync', data, false).then(res => {
        //                 if (res.code == 1) {
        //                     this.cancelExport()
        //                     this.getKeyD(res.data)
        //                 } else {
        //                     this.$message({
        //                         message: res.msg,
        //                         type: 'error'
        //                     });
        //                 }
        //         }) 
        // },
         //导入
        onImport() {
            this.visible = true
        },
        upload() {
            if(!this.basicCompanyId) return this.$message.error('公司不能为空')
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.$refs['upload'].post(this.file);
                let data = new FormData
                data.append('basicCompanyId',this.basicCompanyId)
                data.append('basicCompanyCode',this.getCompanyCode(this.basicCompanyId))
                data.append('basicCompanyName',this.getCompanyName(this.basicCompanyId))
                data.append('file', this.file)
                this.request('acc_acc_payment_uploadAsync', data, true).then((res) => {
                    if (res.code == 1) {
                        this.basicCompanyId=''
                        this.file=null
                        this.getKeyD(res.data)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                this.visible = false
            }
        },
        //上传之前
        handleUpload(file) {
            if (!/\.xls$|.xlsx$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file //需要传给后台的file文件
                this.name = file.name
            }
            return false
        },
        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                this.loadingStatus = false;
                this.file = null;
                this.getKeyD(res.data)
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
        cancelImport() {
            this.file = null
            this.visible = false
            this.basicCompanyId=''
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
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : ""),
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
                // window.location.href = r
                return false
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

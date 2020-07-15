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
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('手工录入') !== -1" size="small" type="primary" @click="onImport">手工录入</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('内部核销') !== -1" size="small" type="primary" @click="onInternal">内部核销</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!--v-if="judgeMenu.indexOf('修改') !== -1" -->
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!-- v-if="judgeMenu.indexOf('修改') !== -1"-->
                <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
            </el-form-item>
            </div>
            <el-form-item label="平台：" size="small">
                <el-select v-model="formSearch.code" @change="changePT(formSearch.code)" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.name" @change="changeCode(formSearch.name)" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="账单ID：" size="small">
                <el-input v-model="formSearch.themID" style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.themID" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in themList" :key="item.id" :label="item.orderTypeName" :value="item.id"></el-option>
                              </el-select> -->
            </el-form-item>

            <el-form-item v-if="show == true" label="财务类型：" size="small">
                <el-select v-model="formSearch.cwlx" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in cwlxList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="期间：" size="small">
                <el-select v-model="formSearch.time" filterable placeholder="请选择" style="width:190px">
                    <el-option v-for="item in timeList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="平台订单号：" size="small">
                <el-input v-model="formSearch.ptddh" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item v-if="show == true" label="数据来源：" size="small">
                <el-select v-model="formSearch.dataSource" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in fromList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="内部核销状态：" size="small">
                <el-select v-model="formSearch.nbhxStatus" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in nbhxStatusList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="账单类型：" size="small">
                <el-select v-model="formSearch.platformOrderTypeId" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in billTypelist" :key="item.id" :label="item.compositeName" :value="item.id"></el-option>
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

    <Modal v-model="saveVisible" @on-cancel="addTwoCancel" :mask-closable="false" :styles="mystyle" title="二次确认" :width="600" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <Col span="24">
            <div style="text-align:center;margin-bottom:40px;font-size:18px">内部核销前，请先确认账单已完成应收核销！</div>
            </Col>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="addTwoSave('ruleForm')">确认</Button>
                <Button type="default" @click="addTwoCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 手工录入 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="手工录入" :width="1000" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" :rules="rules" ref="ruleForm" label-width="100px" :model="ruleForm" class="demo-form-inline " :label-position="left">

                <el-form-item label="平台：" prop="code" size="small">
                    <!-- <el-input v-model="ruleForm.code" style="width:120px"></el-input> -->
                    <el-select v-model="ruleForm.code" @change="changeBeyPT(ruleForm.code)" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司：" prop="name" size="small">
                    <!-- <el-input v-model="ruleForm.name" style="width:120px"></el-input> -->

                    <el-select v-model="ruleForm.name" @change="changeByCode(ruleForm.name)" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店铺：" prop="subjectName" size="small">
                    <el-select v-model="ruleForm.subjectName" @change="changeBysubjectName(ruleForm.subjectName)" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in shopListTwo" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    <!-- <el-input v-model="ruleForm.subjectName" style="width:120px"></el-input> -->
                </el-form-item>
                <el-form-item label="期间：" prop="address" size="small">
                    <!-- <el-input v-model="ruleForm.address" style="width:120px"></el-input> -->
                    <el-select v-model="ruleForm.address" @change="changeByAddress(ruleForm.address)" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in timeByList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账单ID：" prop="themID" size="small">
                    <el-input v-model="ruleForm.themID" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="财务类型：" prop="cwlx" size="small">
                    <!-- <el-input v-model="ruleForm.cwlx" style="width:120px"></el-input> -->
                    <el-select v-model="ruleForm.cwlx" filterable placeholder="请选择" style="width:200px">
                        <el-option v-for="item in cwlxByList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额：" prop="money" size="small">
                    <el-input type="number" v-model="ruleForm.money" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" size="small">
                    <el-input v-model="ruleForm.remark" style="width:200px"></el-input>
                </el-form-item>

            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                <Button type="default" @click="addCancel">取消</Button>

            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 编辑弹框 -->
    <Modal v-model="editVisible" @on-cancel="addCancel" :styles="mystyle" title="编辑" :width="780" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" :rules="rules" ref="ruleForms" label-width="100px" :model="editFormData" class="demo-form-inline " :label-position="left">
                <el-form-item label="账单ID：" prop="themID" size="small">
                    <el-input v-model="editFormData.themID" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="财务类型：" prop="cwlx" size="small">
                    <!-- <el-input v-model="ruleForm.cwlx" style="width:120px"></el-input> -->
                    <el-select v-model="editFormData.cwlx" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in cwlxByList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额：" prop="money" size="small">
                    <el-input type="number" v-model="editFormData.money" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" size="small">
                    <el-input v-model="editFormData.remark" style="width:220px"></el-input>
                </el-form-item>

            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="editSave('ruleForms')">确认</Button>
                <Button type="default" @click="addCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>
    <section class="middle" :style="{minHeight:'690px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>


        <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
        <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
            <el-table-column prop="operator" label="操作员" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                <template slot-scope="scope">{{scope.row.operateTime}}</template>
            </el-table-column>
            <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="getmore" v-if="goodsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="goodsList.length>0&&!dataFlag">没有更多了…</div>
    </section>
    
    <!-- <section class="middle">
        
    </section> -->
</div>
</template>

<script>
import{burypoint} from 'mixins/burypoint.js'
export default {
    mixins:[burypoint],
    data() {
        return {
            saveVisible: false,
            editVisible: false,
            ruleForm: {},
            editFormData:{
                themID:'',
                cwlx:'',
                money:'',
                remark:'',
                id:''
            }, //编辑数据
            list: [], //编辑存储列表
            rules: {
                code: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                subjectName: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                address: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                telephone: [{
                        required: true,
                        message: '请输入平台电话',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                themID: [{
                        required: true,
                        message: '请输入账单ID',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 30,
                        message: '长度在30个字符以内',
                        trigger: 'blur'
                    }
                ],
                cwlx: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                money: [{
                        required: true,
                        message: '请正确输入金额',
                        trigger: 'blur'
                    },
                    // {
                    //     min: 1,
                    //     max: 30,
                    //     message: '长度在30个字符以内',
                    //     trigger: 'blur'
                    // }
                ],
                remark: [{
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 100,
                        message: '长度在100个字符以内',
                        trigger: 'blur'
                    }
                ]
            },
            nbhxStatusList: [{
                value: 0,
                name: '未核销'
            }, {
                value: 1,
                name: '已核销'
            }],
            cwlxList: [], //财务类型
            cwlxByList: [],
            loading: false,
            logList: [], //日志
            hasData: false,
            billNo: '',
            show: false,
            zhan: false,
            tableData: [],
            formThead: [],
            file: null,
            visible: false,
            importData: [{
                    value: 1,
                    name: '通用格式'
                },
                {
                    value: 0,
                    name: '特定格式'
                }
            ],
            obj: {
                id: ''
            },
            editObj: {},
            ID: '',
            // ID:importantId,
            brandList: [],
            shopList: [],
            shopListTwo: [],
            themList: [],
            timeList: [],
            timeByList: [],
            fromList: [
                '账单导入', '手工录入'
            ],
            companyCodeOptions: [],
            companyCodeBYOptions: [],
            dialogVisible: false, //新增
            statusQptions: [{
                    value: 1,
                    name: '是'
                },
                {
                    value: 0,
                    name: '否'
                }
            ],
            formSearch: {
                code: '',
                name: '',
                person: '',
                platformOrderTypeId:''
            },
            formChange: {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
            },
            titleArray: [],
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
            periodAddress : null,
            billTypelist  :[],//账单下拉列表
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.receiptList
        }
    },
    destroyed() {
        this.$store.commit('clearreceipt')
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        // this.getShop()
        this.getBrandList()
        this.getThemID()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '', '')
    },
    methods: {
        getBillTypeList(platformId){
               this.request('received_orderType_selectorForAccReceivedSearch', {platformId:platformId}, false).then(res => {
                        if (res.code == 1) {
                               this.billTypelist=res.data
                        } else {
                               this.$message.error(res.msg)
                        }
                    })
        },
        //删除
         
        onDel(){
              this.setBuryPoint('删除')
              let arr=[]
                  arr=w2ui.grid.getSelection()
                  if(arr.length>0){
                   this.$confirm('此操作将永久删除所选文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                      this.setBuryPoint('删除确认')
                     //结尾
                      let data={};//received_accReceived_manual_delete
                          data.AccReceivedManualQOs=[]
                          for(let i=0;i<arr.length;i++){
                              data.AccReceivedManualQOs.push({id:arr[i]})
                          }
                       this.request('received_accReceived_manual_delete', data, true).then(res => {
                        if (res.code == 1) {
                            this.getData()
                            this.$message.success('已删除')
                        } else {
                            this.$message.error(res.msg)
                            this.shopListTwo = []
                            this.$refs['ruleForm'].resetFields();
                        }
                    })  
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                   
                  }else{
                       this.$message.error('请选择需要删除的数据')  
                  }   

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
        //编辑
        onEdit() {
            this.setBuryPoint('编辑')
            let arr = []
            arr = w2ui.grid.getSelection()
            if (arr.length == 0) {
                     this.$message.error('请先选择修改的数据!')
            } else if (arr.length > 1) {
                     this.$message.error('一次只能修改一条数据!')
                 }else if(arr.length==1){
                     this.editObj=this.getObj(this.list,'recid',arr[0])
                    if(this.editObj.dataSource!='手工录入'&&this.editObj.status!=='0'){
                       this.$message.error('不支持非手工录入编辑和已核销状态的编辑')
                    }else{
                       this.editVisible=true
                    //    this.editFormData=this.editObj
                       this.editFormData = Object.assign({}, this.editFormData, this.editObj)
                       this.editFormData.themID= this.editObj.billNo
                       this.editFormData.remark= this.editObj.billRemark
                       this.editFormData.money = this.editObj.billAmount
                       this.editFormData.id    =this .editObj.recid
                       let data={};
                        data.basicPlatformId = this.editObj.basicPlatformId //平台ID
                        this.request('accReceived_selector', data, false).then(res => {
                            if (res.code == 1) {
                                // this.orderTypeList = res.data
                                this.cwlxByList=[]
                                this.cwlxByList = res.data
                                this.editFormData.cwlx=this.editObj.financialType
                            }
                        })
                    }
                    
                 }
        },
        // 编辑提交
            //保存手工录入
        editSave(formName) {
            this.setBuryPoint('编辑确认')
            this.$refs[formName].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                        data.id = this.editFormData.id
                        data.billNo =  this.editFormData.themID
                        data.billAmount =  this.editFormData.money
                        data.financialType =  this.editFormData.cwlx
                        data.remark =   this.editFormData.remark
                    this.request('received_accReceived_manual_update', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('编辑成功')
                            this.editVisible = false
                            this.shopListTwo = []
                            this.$refs['ruleForms'].resetFields();
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                            this.shopListTwo = []
                            // this.$refs['ruleForms'].resetFields();
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        //保存手工录入
        addSave(formName) {
            this.setBuryPoint('手工录入确认')
            this.$refs[formName].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    data.basicPlatformId = this.platformID //平台ID
                    data.basicPlatformCode = this.platformCode
                    data.basicPlatformName = this.ruleForm.code //名称
                    data.basicCompanyId = this.basicCompanyID
                    data.basicCompanyCode = this.basicCompanyCode
                    data.basicCompanyName = this.ruleForm.name //公司名称
                    data.basicStoreId = this.basicStoreID
                    data.basicStoreCode = this.basicStoreCode
                    data.basicStoreName = this.ruleForm.subjectName //店铺名称
                    data.period = this.ruleForm.address //期间ID
                    data.periodNo = this.periodAddress //期间
                    data.billNo = this.ruleForm.themID //账单ID
                    data.billAmount = this.ruleForm.money //账单金额
                    data.financialType = this.ruleForm.cwlx //财务类型
                    data.remark = this.ruleForm.remark //备注
                    this.request('accReceived_add', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('保存成功')
                            this.dialogVisible = false
                            this.ruleForm = {}
                            this.shopListTwo = []
                            this.$refs['ruleForm'].resetFields();
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                            this.shopListTwo = []
                            this.$refs['ruleForm'].resetFields();
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        //取消
        addCancel() {
            this.shopListTwo = []
            this.dialogVisible = false
            this.ruleForm = {}
            this.editVisible = false
            this.$refs['ruleForm'].resetFields();
             this.$refs['ruleForms'].resetFields();
        },
        //手工录入
        onImport() {
            this.setBuryPoint('手工录入')
            this.dialogVisible = true
        },
        //内部核销
        onInternal() {
            this.setBuryPoint('内部核销')
            this.saveVisible = true

        },
        addTwoSave() {
              this.setBuryPoint('内部核销确认')
            let data = {}
            data.basicPlatformName = this.formSearch.code //核销平台名称
            data.status = this.formSearch.nbhxStatus //核销状态
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //核销账单号
            this.request('accReceived_asyncInnerVerify', data, false).then(res => {
                if (res.code == 1) {
                    this.getKeyD(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
            this.saveVisible = false
        },
        addTwoCancel() {
            this.saveVisible = false
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
                                // message: res.data.subTitle,
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
                    name: 'grid',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        // lineNumbers: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [{
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },{
                            field: 'basicPlatformName',
                            caption: '平台',
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
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'periodNo',
                            caption: '期间',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'orderTypeName',
                            caption: '账单类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'merchantOrderNo',
                            caption: '平台订单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'merchantChildOrderNo',
                            caption: '平台子订单号',
                            size: '100px'
                        },
                        {
                            field: 'purchaseNo',
                            caption: '采购单号',
                            size: '100px'
                        },
                        {
                            field: 'sourcePurchaseNo',
                            caption: '原采购单号',
                            size: '100px'
                        },
                        {
                            field: 'financialType',
                            caption: '账务类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'qty',
                            caption: '数量',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'canPayQty',
                            caption: '可付数量',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'canPaySchedule',
                            caption: '可付进度',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'canPayAmount',
                            caption: '金额(不含税)',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'billAmount',
                            caption: '金额',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'commission',
                            caption: '唯品会佣金',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'taxRate',
                            caption: '税率',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billDirection',
                            caption: '收/支方向',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderTime',
                            caption: '交易时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'orderSendTime',
                            caption: '发货时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'finishTime',
                            caption: '完成时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billRemark',
                            caption: '备注',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '商家编码',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '款号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'skuNo',
                            caption: '商品ID',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'logisticsNo',
                            caption: '物流单号',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'platformPattern',
                            caption: '订单发货类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'dataSource',
                            caption: '数据来源',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'created',
                            caption: '导入时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'createUser',
                            caption: '导入人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizNo',
                            caption: '业务单据编码',
                            size: '100px'
                        },
                        {
                            field: 'bizDate',
                            caption: '业务单据日期',
                            size: '100px'
                        }
                    ],
                    onClick: function (event) {
                        self.getLoglist(event.recid)
                        self.currentPage = 1;
                        self.$store.commit('clearreceipt')
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.grid.clear(); //清空
                w2ui.grid.records = arr
                w2ui.grid.records.push({
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName: '<span>当页小计</span>',
                    billAmount: current,
                }, {
                    w2ui: {
                        summary: true
                    },
                    basicPlatformName: '<span >合计</span>',
                    billAmount: total,
                })
                $('#main').w2render('grid');
                w2ui.grid.refresh();
            } else {
                $(document).ready(function(){
                        w2ui.grid.clear(); //清空
                        w2ui['grid'].records = []
                        w2ui.grid.refresh();
                        $('#main').w2render('grid')
                })
            }

        },
        resetTable() {},
        onReset() {
            // this.formSearch = {}
            for(let i in this.formSearch){
                this.formSearch[i]='' 
            }
            this.initTable([])
            this.billTypelist=[]
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
            console.log(id, '3456789')
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
        //账单类型
        getThemID() {
            let data = {}
            this.request('received_orderType_selector', data, false).then(res => {
                if (res.code == 1) {
                    this.themList = res.data
                }
            })
        },
        //change平台选择财务类型
        changePT(name) {
            this.formSearch.platformOrderTypeId=''
            this.billTypelist=[]
            console.log(this.platformOptions, '09856467890')
            let platformID = ''
            this.platformOptions.map(function (item) {
                if (item.name == name) {
                    platformID = item.id
                }
            })
            this.changebasicPlatformId(platformID)
            this.getBillTypeList(platformID)
            let data = {}
            data.basicPlatformId = platformID //平台ID
            this.request('accReceived_selector', data, false).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.cwlxList = res.data
                }
            })

        },
        changeBeyPT(name) {
            let platformID = ''
            let platformCode
            this.platformOptions.map(function (item) {
                if (item.name == name) {
                    console.log(item, '9876546789')
                    platformID = item.id
                    platformCode = item.code
                }
            })
            this.changebasicPlatformIdBy(platformID)
            this.platformID = platformID
            this.platformCode = platformCode
            let data = {}
            data.basicPlatformId = platformID //平台ID
            this.request('accReceived_selector', data, false).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.cwlxByList = res.data
                }
            })
        },
        changebasicPlatformIdBy(id) {
            this.formSearch.person = ''
            console.log(id, '3456789')
            let data = {}
            data.platformId = id
            this.request('getBindingByPlatformId', data, true).then((res) => {
                if (res.code == 1) {
                    this.shopListTwo = res.data
                }
            })
        },
        changeCode(code) {
            let AAAA = ''
            this.companyCodeOptions.map(function (item) {
                if (code == item.name) {
                    AAAA = item.id
                }
            })
            let data = {}
            data.basicCompanyId = AAAA
            data.type = 0
            this.request('accountPeriod_selector', data, false).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.timeList = res.data
                }
            })
        },
        changeByCode(code) {
            let AAAA = ''
            let basicCompanyID = null
            let basicCompanyCode = null
            this.companyCodeOptions.map(function (item) {
                if (code == item.name) {
                    AAAA = item.id
                    basicCompanyID = item.id
                    basicCompanyCode = item.code
                }
            })
            this.basicCompanyID = basicCompanyID
            this.basicCompanyCode = basicCompanyCode
            let data = {}
            data.basicCompanyId = AAAA
            data.type = 0
            this.request('accountPeriod_selector', data, false).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.timeByList = res.data
                }
            })
        },

        changeBysubjectName(name) {
            let basicStoreID = null
            let basicStoreCode = null
            this.shopListTwo.map(function (item) {
                if (name == item.name) {
                    basicStoreID = item.id
                    basicStoreCode = item.code
                }
            })
            this.basicStoreCode = basicStoreCode
            this.basicStoreID = basicStoreID
        },
        changeByAddress(name) {
            console.log(name)
            let periodAddress = null
            this.timeByList.map(function (item) {
                console.log(item, '6789')
                if (name == item.period) {
                    periodAddress = item.name
                }
            })
            this.periodAddress = periodAddress
        },
        getData() {
            this.loading = true;
            this.logList = []
            let data = {}
            data.merchantOrderNo = this.formSearch.ptddh
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformName = this.formSearch.code //平台名称
            data.period = this.formSearch.time //期间
            data.basicCompanyName = this.formSearch.name //公司名称
            data.basicStoreName = this.formSearch.person //店铺名称
            data.dataSource = this.formSearch.dataSource //来源
            this.formSearch.themID ? data.accRecvdBillNos = this.formSearch.themID.split(",") : delete data.accRecvdBillNos //账单ID
            data.financialType = this.formSearch.cwlx //财务类型
            data.status = this.formSearch.nbhxStatus                     //状态
            data.platformOrderTypeId=this.formSearch.platformOrderTypeId //账单类型
            this.request('accReceived_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    //   this.tableData = res.data.records;

                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].recid = res.data.records[i].id
                            res.data.records[i].index =i+1
                        }
                        this.list = res.data.records;
                        this.initTable(res.data.records, res.data.perAmount, res.data.totalAmount)
                        // this.hasData=true
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
        getLoglist(billNo) {
            this.billNo = billNo
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
                        this.$store.commit('receipt', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('receipt', this.logList)
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
                        this.$store.commit('receipt', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('receipt', this.logList)
                    }
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

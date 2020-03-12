<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            </div>
            <el-form-item label="单据名称" size="small">
                <el-select v-model="formData.ruleName" placeholder="单据名称" style="width:100px" filterable>
                    <el-option v-for="item in billList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司名称" size="small">
                <el-select v-model="formData.basicCompanyId" placeholder="公司名称" style="width:100px" filterable>
                    <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="单据名称" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="basicCompanyName" label="公司" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="code" label="标识" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicCodeTypeCode" label="单据编码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicCodeTypeName" label="单据类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessTypeCode" label="业务编码" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessType" label="业务类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="codeHeaderTimeFormatStr" label="时间信息" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="codeSerialLength" label="流水号长度" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="codeSerialStartStr" label="流水号起始" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="codeSerialEndStr" label="流水号结束" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enableStr" label="启用状态" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>
    <section class="footer" style="margin-bottom:0px">
        <!-- <span class="pl20"><i class="el-icon-arrow-up pointer "></i></span> -->
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <section class="middle">
        <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">
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
    </section>
    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="300" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="editformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="单据类型" size="small" label-width="95px" prop="platform">
                    <!-- <el-input v-model="editformdata.platform" placeholder="单据名称" maxlength="20" style="width:120px"></el-input> -->
                    <el-select v-model="editformdata.platform" value-key="id" placeholder="请选择" style="width:120px" @change="watchCode(editformdata.platform)">
                        <el-option v-for="v in selectList" :key="v.id" :label="v.name" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="业务类型" size="small" label-width="95px">
                    <el-select v-model="editformdata.ywlx" value-key="id" placeholder="请选择" @change="changeYwlx" style="width:120px">
                        <el-option v-for="item in ywlxList" :key="item.id" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称" size="small" label-width="95px" prop="basicCompanyIds">
                    <el-select v-model="editformdata.basicCompanyIds" multiple placeholder="公司名称" style="width:120px" filterable>
                        <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标识" size="small" label-width="95px">
                    <el-input style="width:120px" disabled v-model="editformdata.code" placeholder="请输入"></el-input>
                    <!-- <el-select v-model="editformdata.code" placeholder="请选择" style="width:120px" @change="watchCode2">
                        <el-option v-for="v in selectList" :key="v.id" :label="v.code" :value="v.code"></el-option>
                    </el-select> -->
                </el-form-item>
                <!-- </Col>
                          <Col> -->
                <el-form-item label="时间信息" size="small" label-width="95px" prop="timeInfor">
                    <el-select v-model="editformdata.timeInfor" placeholder="请选择" style="width:120px">
                        <el-option label="年月" value="1"></el-option>
                        <el-option label="年月日" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="流水号长度" size="small" label-width="95px" prop="number">
                    <!-- <el-select v-model="editformdata.number" placeholder="请选择" style="width:120px">
                                   <el-option label="3" value="3"></el-option>
                                   <el-option label="4" value="4"></el-option>
                                   <el-option label="5" value="5"></el-option>
                                   <el-option label="6" value="6"></el-option>
                               </el-select> -->
                    <el-input-number v-model="editformdata.number" controls-position="right" style="width:120px" :min="1" :max="8"></el-input-number>
                </el-form-item>
                <el-form-item label="状态" size="small" label-width="95px" prop="status">
                    <el-select v-model="editformdata.status" placeholder="请选择" style="width:120px">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:70px">
                    <Button v-if="dialogtitle=='新增'" type="primary" @click="submitForm('ruleForm')">确认</Button>
                    <Button v-if="dialogtitle=='编辑'" type="primary" @click="submitsForm('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>

                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--编辑弹框-->
    <Modal v-model="editVisible" :styles="mystyle" :rules="rules" title="编辑" @on-cancel='cancels' :width="300" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForms" :model="editData" class="demo-form-inline demo-ruleForm" :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="单据类型" size="small" label-width="95px" prop="platform">
                    <el-select v-model="editData.platform" disabled value-key="id" placeholder="请选择" style="width:120px" @change="watchCode3(editData.platform)">
                        <el-option v-for="v in selectList" :key="v.id" :label="v.name" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型" size="small" label-width="95px">
                    <el-select v-model="editData.ywlx" disabled value-key="id" placeholder="请选择" @change="changeEditYwlx(editData.ywlx)" style="width:120px">
                        <el-option v-for="item in editywlxList" :key="item.id" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称" size="small" label-width="95px" prop="basicCompanyIds">
                    <el-select v-model="editData.basicCompanyIds" placeholder="公司名称" style="width:120px" filterable>
                        <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标识" size="small" label-width="95px" prop="code">
                    <el-input style="width:120px" disabled v-model="editData.code" placeholder="请输入"></el-input>
                    <!-- <el-select v-model="editData.code" placeholder="请选择" style="width:120px" @change="watchCode4">
                        <el-option v-for="v in selectList" :key="v.id" :label="v.code" :value="v.code"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="时间信息" size="small" label-width="95px" prop="timeInfor">
                    <el-select v-model="editData.timeInfor" placeholder="请选择" style="width:120px">
                        <el-option label="年月" value="1"></el-option>
                        <el-option label="年月日" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="流水号长度" size="small" label-width="95px" prop="number">
                    <el-input-number v-model="editData.number" controls-position="right" style="width:120px" :min="1" :max="8"></el-input-number>
                </el-form-item>
                <el-form-item label="状态" size="small" label-width="95px" prop="status">
                    <el-select v-model="editData.status" placeholder="请选择" style="width:120px">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:70px">
                    <!-- <Button v-if="dialogtitle=='新增'" type="primary" @click="submitForm('ruleForm')">确认</Button> -->
                    <Button type="primary" @click="submitsForm('ruleForms')">确认</Button>
                    <Button type="default" @click="cancels">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
import filters from '../../../filter/'
export default {
    data() {
        return {
            editywlxList:[],
            ywlxList:[],
            dialogVisible: false,
            editVisible: false,
            editformdata: {},
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            IDS: [], //行内数据
            mystyle: {
                top: '150px',
            },
            formData: {},
            editformdata: {
                ywlx:{
                    id :'',
                    code:'',
                    name:'',
                },
                code: '',
                platform: '',
                basicCompanyIds: '',
                timeInfor: '',
                number: '',
                status: '',
                id: '',
            }, //前端增加数据
            editData: {
                code: '',
                platform: '',
                basicCompanyIds: '',
                timeInfor: '',
                number: '',
                status: '',
                basicCodeTypeId: '',
                ywlx:{
                    id :'',
                    code:'',
                    name:'',
                }
            }, //前端编辑数据
            billList: [], //单据列表
            logList: [], //日志列表
            companyList: [], //公司列表
            selectList: [], //下拉列表
            list: [],
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            rules: {
                platform: [{
                    required: true,
                    message: '请选择公司',
                    trigger: 'change'
                }
                ],
                basicCompanyIds: [{
                    required: true,
                    message: '请选择公司',
                    trigger: 'change'
                }],
                code: [{
                        required: true,
                        message: '请输入标识',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'change'
                    }
                ],
                timeInfor: [{
                    required: true,
                    message: '请选择时间信息',
                    trigger: 'change'
                }, ],
                number: [{
                    required: true,
                    message: '请选择流水号长度',
                    trigger: 'change'
                }],
                status: [{
                    required: true,
                    message: '请选择启用状态',
                    trigger: 'change'
                }]
            },
             buttonList:[],//按钮权限
             judgeMenu:[],
        }
    },
    mounted() {
        this.getData()
        this.getBillList()
        this.getCompanyList()
        this.getSelname()
        this.getButtonJurisdiction()//按钮权限
    },
    methods: {
        changeYwlx(){
            console.log()
            this.editformdata.code = this.editformdata.platform.code + this.editformdata.ywlx.code
        },
        changeEditYwlx(code){
            console.log(code)
            this.editData.code = this.editData.platform.code + this.editData.ywlx.code
            console.log(this.editData.code,'=-098754345678')
        },
        getButtonJurisdiction(){
        let data = {}
        data.parentResourceCode = this.$route.query.code
        this.request('masterData_resource_buttonResource', data, true).then(res => {
          if (res.code==1) {
            this.buttonList = res.data
            let newList = []
            this.buttonList.map(function(item){
              newList.push(item.resourceName)
            })
            this.judgeMenu = newList
            }
          })
      },
        //  onEdit(row){

        // },
        onEdit() {
            if (this.IDS.length == 1) {
                console.log(this.IDS,'-90-9087890')
                this.editVisible = true;
                this.editData.id = this.IDS[0].id
                this.editData.code = this.IDS[0].code
                this.editData.platform = this.IDS[0].basicCodeTypeName
                this.editData.ywlx = this.IDS[0].businessType
                this.editData.basicCodeTypeId = this.IDS[0].basicCodeTypeId
                this.IDS[0].enableStr == '启用' ? this.editData.status = '1' : this.editData.status = '0'
                this.editData.number = this.IDS[0].codeSerialLength
                this.IDS[0].codeHeaderTimeFormatStr == '年月日' ? this.editData.timeInfor = '0' : this.editData.timeInfor = '1'
                this.editData.basicCompanyIds = this.getID(this.IDS[0].basicCompanyName)

                //      this.$router.push({
                //          name:'edit__role',
                //          query:{obj:this.IDS[0]}
                // })  
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择修改的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据!')
            }
        },
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        watchCode(v) { //
            console.log(v)
            let data = {}
            data.bizTypeId          = v.id
            this.editformdata.ywlx.id  = ''
            this.editformdata.ywlx.name= ''
            this.editformdata.ywlx.code= ''
            this.request('businessType_page', data, false).then((res) => {
                if (res.code == '1') {
                    this.ywlxList = res.data.records
                    if(this.ywlxList.length == 0){
                        this.editformdata.code = this.editformdata.platform.code
                    }else{
                        this.$message.warning('该单据类型已绑定业务类型，请选择具体的业务类型生成单据编码规则')
                        this.editformdata.code = ''
                    }
                }
            })
            
        },
        watchCode2(v) {
            console.log(v)
            for (let i = 0; i < this.selectList.length; i++) {
                if (this.selectList[i].code == v) {
                    this.editformdata.id = this.selectList[i].id
                    return this.editformdata.platform = this.selectList[i].name
                }
            }
        },
        watchCode3(v) {
            console.log(v)
            // for (let i = 0; i < this.selectList.length; i++) {
            //     if (this.selectList[i].name == v) {
            //         this.editData.basicCodeTypeId = this.selectList[i].id
            //         return this.editData.code = this.selectList[i].code
            //     }
            // }
            let data = {}
            data.bizTypeId = v.id
            this.request('businessType_page', data, false).then((res) => {
                if (res.code == '1') {
                    this.editywlxList = res.data.records
                    if(this.editywlxList.length == 0){
                        this.editData.code = this.editData.platform.code
                    }else{
                        this.$message.warning('该单据类型已绑定业务类型，请选择具体的业务类型生成单据编码规则')
                        this.editData.code = ''
                    }
                }
            })
        },
        watchCode4(v) {
            console.log(v)
            for (let i = 0; i < this.selectList.length; i++) {
                if (this.selectList[i].code == v) {
                    this.editData.basicCodeTypeId = this.selectList[i].id
                    return this.editData.platform = this.selectList[i].name
                }
            }
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onAdd() {
            // this.editformdata={}
            this.dialogtitle = "新增"
            this.dialogVisible = true
        },
        confirmAdd() {
            console.log(this.editformdata.platform,'4567890')
            let data = {};
            data.businessTypeId = this.editformdata.ywlx.id
            data.businessTypeCode = this.editformdata.ywlx.code
            data.businessType = this.editformdata.ywlx.name
            data.code = this.editformdata.code
            data.basicCodeTypeId = this.editformdata.platform.id
            data.basicCodeTypeCode = this.editformdata.platform.code
            data.basicCodeTypeName = this.editformdata.platform.name
            data.basicCompanyIds = this.editformdata.basicCompanyIds;
            data.codeHeaderTimeFormat = this.editformdata.timeInfor
            data.codeSerialLength = this.editformdata.number
            data.enable = Number(this.editformdata.status)
            this.request('masterData_coderuler_add', data, false).then((res) => {
                if (res.code == 1) {
                    this.dialogVisible = false;
                    this.resetForm('ruleForm')
                    this.onReset()
                    // this.editformdata.ywlx = ''
                     this.editformdata.ywlx.id  = ''
                     this.editformdata.ywlx.name= ''
                     this.editformdata.ywlx.code= ''
                     this.editformdata.code = ''
                     this.editformdata.number=''
                    // this.editformdata = {}
                    this.$message.success('新增成功')
                    this.getBillList()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },
        confirmEdit() {
            console.log(this.editData.ywlx,'-098765',this.IDS,'00000000000000000',this.IDS.basicCodeTypeId)
            let data = {};
            data.id = this.editData.id;
            data.code = this.editData.code;
            data.businessTypeId = this.IDS[0].businessTypeId
            data.businessTypeCode = this.IDS[0].businessTypeCode
            data.businessType = this.IDS[0].businessType
            // data.name = this.editData.platform;
            data.basicCompanyId = this.editData.basicCompanyIds;
            data.codeHeaderTimeFormat = this.editData.timeInfor
            data.codeSerialLength = Number(this.editData.number)
            data.enable = Number(this.editData.status)
            data.basicCodeTypeId = this.IDS[0].basicCodeTypeId
            data.basicCodeTypeCode = this.IDS[0].basicCodeTypeCode
            data.basicCodeTypeName = this.IDS[0].basicCodeTypeName
            this.request('masterData_coderuler_update', data, false).then((res) => {
                if (res.code == 1) {
                    this.editVisible = false;
                    //  this.resetForm('ruleForms')
                    //  this.onReset()
                    //  this.page=1;
                    this.getData()
                    this.$message.success('编辑成功')
                    this.getBillList()
                } else {
                    this.$message.error(res.msg)
                }
            })

        },
        onSearch() {
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formData = {}
            this.page = 1;
            this.getData()
        },

        getID(name) {
            for (let i = 0; i < this.companyList.length; i++) {
                if (this.companyList[i].name == name) {
                    return this.companyList[i].id
                }
            }
        },
        submitForm(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.confirmAdd()
                } else {
                    return false;
                }
            });
        },
        submitsForm(formName) {
            this.editVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.confirmEdit()
                } else {
                    return false;
                }
            });
        },
        getBillList() {
            let data = {}
            data.name = ''
            this.request('masterData_coderuler_nameList', data, false).then((res) => {
                if (res.code == 1) {
                    this.billList = res.data
                }
            })
        },
        getSelname() {
            let data = {}
            this.request('masterData_code_selector', data, false).then((res) => {
                if (res.code == 1) {
                    this.selectList = res.data
                }
            })
        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.name = this.formData.ruleName
            data.basicCompanyId = this.formData.basicCompanyId
            this.request('masterData_coderuler_page', data, false).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getCompanyList() {
            let data = {}
            this.request('masterData_company_selector', data, false).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        cancel() {
            this.editformdata = {}
            this.editformdata.number = ''
            this.resetForm('ruleForm')
            this.dialogVisible = false;
        },
        cancels() {
            // this.editData={}
            this.resetForm('ruleForms')
            this.editVisible = false
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = filters.getConstant('code') + this.billNo
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
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })

        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = filters.getConstant('code') + this.billNo
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
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        showLog(row) {
            console.log(row)
            this.getLoglist(row.id)
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

.el-table__row td {
    padding: 0;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td {
    background-color: #f19944 !important;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}
</style>

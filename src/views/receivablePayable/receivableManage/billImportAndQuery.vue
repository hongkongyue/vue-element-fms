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
                <el-button v-if="judgeMenu.indexOf('导入') !== -1" size="small" type="primary" @click="onImport">导入</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('云集费用') !== -1"  size="small" type="primary" @click="onImportYun">云集费用</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="default" @click="onDelete">删除</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!-- <el-button v-if="judgeMenu.indexOf('账单处理') !== -1" size="small" type="primary" @click="onBillProcessing">账单处理</el-button> -->
                <el-button size="small" type="primary" @click="onBillProcessing">账单处理</el-button>
            </el-form-item>
         </div>
            <el-form-item label="平台：" size="small">
                <el-select v-model="formSearch.basicPlatformName" @change="changePlatformName(formSearch.basicPlatformName)" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in platformOptionsT" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司：" size="small">
                <el-select v-model="formSearch.basicCompanyName" @change="changeCode(formSearch.basicCompanyName)" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺：" size="small">
                <el-select v-model="formSearch.basicStoreName" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in shopListA" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="show == true" label="期间：" size="small">
                <el-select v-model="formSearch.time" filterable placeholder="请选择" style="width:170px">
                    <el-option v-for="item in timeList" :key="item.period" :label="item.name" :value="item.period"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="账单类型：" size="small">
                <el-select v-model="formSearch.orderTypeName" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in zlNewList" :key="item.orderTypeName" :label="item.orderTypeName" :value="item.orderTypeName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="导入人：" size="small">
                <el-select v-model="formSearch.person" filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in staffNameList" :key="item" :label="item" :value="item"></el-option>
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
    <section class="middle" :style="{minHeight:showBink?'690px':'690px'}">
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
                <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
            </el-table-column>
            <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button v-if="judgeMenu.indexOf('下载') !== -1" @click="handleClickDown(scope.row.logContent)" type="primary" size="small">下载文件</el-button>{{scope.row.logContent.substr(0, scope.row.logContent.indexOf(','))}}
                </template>
            </el-table-column>
        </el-table>
        <div class="getmore" v-if="goodsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="goodsList.length>0&&!dataFlag">没有更多了…</div>
    </section>

    
    <!-- <section class="middle">
        
    </section> -->
    <!-- 导入弹框 -->

    <Modal :mask-closable="false" v-model="dialogVisible" :styles="mystyle" @on-cancel="importCancel" title="导入账单" :width="750" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-position="left">
                <Col span="24" style="margin-left:170px">
                <el-form-item label="导入格式：" label-width="120px" prop="resource">
                    <el-radio-group :disabled="disabledYun" v-model="ruleForm.resource" @change="changeRadio">
                        <el-radio v-for="item in importData" :key="item.value" :label="item.name" :value="item.value"></el-radio>
                    </el-radio-group>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="平台：" prop="code" label-width="100px" size="small">
                    <el-select :disabled="disabledYun" v-model="ruleForm.code" @change="changePT(ruleForm.code)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col v-if="ruleForm.resource == '特定格式'" span="12">
                <el-form-item label="平台模式：" prop="ptms" label-width="100px" size="small">
                    <el-select v-model="ruleForm.ptms" @change="changePtms(ruleForm.ptms)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in PTList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '特定格式'" span="12">
                <el-form-item label="账单模式：" prop="zdms" label-width="100px" size="small">
                    <el-select v-model="ruleForm.zdms" @change="changeZdms(ruleForm.zdms)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in ZDList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '特定格式'" span="12">
                <el-form-item label="账单类型：" prop="address" label-width="100px" size="small">
                    <el-select v-model="ruleForm.address" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in zlList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12" v-if="ruleForm.resource">
                <el-form-item label="公司：" prop="name" label-width="100px" size="small">
                    <el-select v-model="ruleForm.name" @change="changeName(ruleForm.name)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="店铺：" prop="shortName" label-width="100px" size="small">
                    <el-select v-model="ruleForm.shortName" @change="changeDP(ruleForm.shortName)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="期间：" prop="abbrName" label-width="100px" size="small">
                    <el-select v-model="ruleForm.abbrName" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in timeListT" :key="item.period" :label="item.name" :value="item.period"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12">
                <el-form-item label-width="70px">
                    <Button type="default" @click="choses">选择文件</Button>
                    <span>{{this.file ? this.file.name : '未选择任何文件' }}</span><br>
                    <span v-if="ruleForm.resource == '特定格式'">（*支持文件类型为.csv.xls.xlt.xlsm.xlsx）</span>
                </el-form-item>
                </Col>
                <Col span="12" v-if="ruleForm.resource == '通用格式'">
                <el-form-item label-width="70px">
                    <Button type="primary" @click="download">下载模板</Button>
                    <span>首次导入请先下载通用模版</span>
                </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '特定格式'" span="24">
                <el-form-item v-if="ruleForm.code == '唯品会' || ruleForm.code == '云集' " label="账单ID：" prop="themID" label-width="120px" size="small">
                    <el-input v-model="ruleForm.themID" style="width:300px"></el-input>
                </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '特定格式'" span="12">
                    <el-form-item v-if="ruleForm.code == '唯品会'" label="工作薄：" prop="sheetNumber" label-width="120px" size="small">
                        <el-select v-model="ruleForm.sheetNumber" filterable placeholder="请选择" style="width:170px">
                            <el-option v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '通用格式'" span="24">
                <el-form-item style="text-align:center">
                    <!-- <Button type="primary" @click="importSave('ruleForm')">导入</Button> -->
                    <Button type="primary" @click="importSave('ruleForm','生成收款单')">生成收款单</Button>
                    <!-- <Button type="primary" @click="importSave('ruleForm','生成应收单')">生成应收单</Button> -->
                    <Button type="default" @click="importCancel">取消</Button>
                </el-form-item>
                </Col>
                <Col v-if="ruleForm.resource == '特定格式'" span="24">
                <el-form-item style="text-align:center" v-if="ruleForm.code !== ''">
                    <!-- <Button type="primary" @click="importSave('ruleForm')">导入</Button> -->
                    <Button :disabled="disabledBtn" v-if="ruleForm.code !== '唯品会'" type="primary" @click="importSave('ruleForm','生成收款单')">生成收款单</Button>
                    <Button :disabled="disabledBtn" v-if="ruleForm.code == '唯品会'" type="primary" @click="importSave('ruleForm','生成应收单')">生成应收单</Button>
                    <Button type="default" @click="importCancel">取消</Button>
                </el-form-item>
                </Col>

                <Col v-if="ruleForm.resource == '特定格式'" span="24"> <!-- 刚进页面显示两个按钮，选择平台后隐藏 -->
                <el-form-item style="text-align:center" v-if="ruleForm.code == ''">
                    <!-- <Button type="primary" @click="importSave('ruleForm')">导入</Button> -->
                    <Button :disabled="disabledBtn" type="primary" @click="importSave('ruleForm','生成收款单')">生成收款单</Button>
                    <Button :disabled="disabledBtn" type="primary" @click="importSave('ruleForm','生成应收单')">生成应收单</Button>
                    <Button type="default" @click="importCancel">取消</Button>
                </el-form-item>
                </Col>
            </el-form>

        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 导入弹框 -->

    <Modal :mask-closable="false" v-model="dialogTwoVisible" :styles="mystyle" @on-cancel="importTwoCancel" title="账单处理" :width="750" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleFormA" :model="ruleFormA" class="demo-ruleForm " :label-position="left">
                <!-- <Col span="24">
              <el-form-item label="导入格式：" label-width="120px"  prop="resource">
                <el-radio-group v-model="ruleForm.resource" @change="changeRadio">
                    <el-radio v-for="item in importData" :key="item.value" :label="item.name" :value="item.value"></el-radio>
                </el-radio-group>
                </el-form-item>
                </Col> -->
                <Col span="12">
                <el-form-item label="平台：" prop="code" label-width="100px" size="small">
                    <el-select v-model="ruleFormA.code" @change="changePT(ruleFormA.code)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in platformOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12">
                <el-form-item label="平台模式：" prop="ptmsTwo" label-width="100px" size="small">
                    <el-select v-model="ruleFormA.ptmsTwo" @change="changePtmsTwo(ruleFormA.ptmsTwo)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in PTList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="账单模式：" prop="zdmsTwo" label-width="100px" size="small">
                    <el-select v-model="ruleFormA.zdmsTwo" @change="changeZdmsTwo(ruleFormA.zdmsTwo)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in ZDList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12">
                <el-form-item label="账单类型：" prop="address" label-width="100px" size="small">
                    <el-select v-model="ruleFormA.address" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in zlList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12">
                <el-form-item label="公司：" prop="name" label-width="100px" size="small">
                    <!-- <el-input v-model="ruleForm.name" style="width:150px"></el-input> -->
                    <el-select v-model="ruleFormA.name" @change="changeName(ruleFormA.name)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>

                </Col>
                <Col span="12">
                <el-form-item label="店铺：" prop="shortName" label-width="100px" size="small">
                    <!-- <el-input v-model="ruleForm.shortName" style="width:150px"></el-input> -->
                    <el-select v-model="ruleFormA.shortName" @change="changeDP(ruleFormA.shortName)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="12">
                <el-form-item label="期间：" prop="abbrName" label-width="100px" size="small">
                    <!-- <el-input v-model="ruleForm.abbrName" style="width:150px"></el-input> -->
                    <el-select v-model="ruleFormA.abbrName" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in timeListT" :key="item.period" :label="item.name" :value="item.period"></el-option>
                    </el-select>
                </el-form-item>
                </Col>

                <Col span="12">
                <el-form-item label-width="70px">
                    <Button type="default" @click="choses">选择文件</Button>
                    <span>{{this.file ? this.file.name : '未选择任何文件' }}</span><br>
                    <!-- <span v-if="ruleForm.resource == '特定格式'">（*支持文件类型为.csv.xls.xlt.xlsm.xlsx）</span> -->
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item style="text-align:center">
                    <Button type="primary" @click="importTwoSave('ruleFormA')">导入</Button>
                    <Button type="default" @click="importTwoCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>

        </Row>
        <div slot="footer"></div>
    </Modal>

    <!--导入账单选择文件-->
    <Modal v-model="visible" title="导入账单文件">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop/productlaunch/uploadTempGoodInfoFile" :data="{}">
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
            <Button type="default" @click="cancelGood">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
var cancelID = null
import {
    type
} from 'os'
import { fstat } from 'fs'
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    data() {
        return {
            yunjiLogo:false,
            disabledYun:false,
            disabledBtn:false,
            platformOptionsT: [],
            length: 0, //选中数据长度
            selectID: null, //选择数据的id
            timeAA: null,
            timeBB: null,
            zlList: [], //账单类型
            zlNewList: [],
            zlOldList: [],
            timeList: [], //期间
            timeListT: [],
            orderTypeList: [], //订单类型
            logList: [], //日志
            billNo: '',
            show: false,
            zhan: false,
            titleArray: [],
            tableData: [],
            formThead: [],

            file: null,
            visible: false,
            staffNameList: [],
            importData: [{
                    value: 1,
                    name: '通用格式'
                },
                {
                    value: 0,
                    name: '特定格式'
                }
            ],
            shopList: [],
            shopListA: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            dialogTwoVisible: false, //账单处理
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
                basicStoreName: '',
                orderTypeName: '',
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
            ruleForm: {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                resource: '通用格式',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
                ptms: '',
                zdms: '',
                themID: '',
                sheetNumber: '',
                zdmsTwo: '',
                ptmsTwo: '',
            },
            ruleFormA: {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                resource: '通用格式',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
                ptms: '',
                zdms: '',
                themID: '',
                zdmsTwo: '',
                ptmsTwo: '',
            },
            rules: {
                ptmsTwo: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                zdmsTwo: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change' 
                }],
                ptms: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                zdms: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                 name: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                shortName: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
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
                sheetNumber: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                code: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                zd: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                resource: [{
                    required: true,
                    message: '请选择导入格式',
                    trigger: 'change'
                }],
               
                abbrName: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                address: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                orgLegal: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                enable: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                status: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            AAAA: '',

            basicPlatformId: '', //平台
            basicPlatformCode: '',
            basicCompanyId: '', //公司
            basicCompanyCode: '',
            basicStoreId: '', //店铺
            basicStoreCode: '',
            cancelId: null,
            TTT: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            importURL: null,
            interfaceUrl: null, //接口
            billPattern: null, //账单模式
            platformPattern: null, //平台模式
            billCodeType: null,
            PTList: [],
            ZDList: [],
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.billImportList
        }
    },
    destroyed() {
        this.$store.commit('clearBillImport')
    },
    mounted() {
        this.getplatformOptions()
        this.getCompany()
        this.getOrterTyoe() //获取订单类型
        this.getResponse()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([])

    },
    methods: {
        changeZDTwo(name) {
            let billPattern = null //账单模式
            let platformPattern = null //平台模式
            this.zlList.map(function (item) {
                if (name = item.orderTypeName) {
                    billPattern = item.billPattern
                    platformPattern = item.platformPattern
                }
            })
            this.ruleFormA.zdmsTwo = billPattern
            this.ruleFormA.ptmsTwo = platformPattern
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
        //日志下载
        handleClickDown(url) {
            url.replace()
            let aPos = url.indexOf('[');
            let bPos = url.indexOf(']');
            let r = url.substr(aPos + 1, bPos - aPos - 1);
            window.location.href = r
        },
        initTable(arr = []) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'billImportAndQuery',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        selectColumn: true,
                    },
                    multiSelect: false,
                    reorderColumns: true,
                    // reorderRows: true,  
                    columns: [
                        {
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },{
                            field: 'created',
                            caption: '导入时间',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'createUser',
                            caption: '导入人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicPlatformName',
                            caption: '平台',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'basicCompanyName',
                            caption: '公司',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'basicStoreName',
                            caption: '店铺',
                            size: '150px',
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
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'sheetNumber',
                            caption: 'Excel工作簿',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'originFileName',
                            caption: '文件名称',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'billNo',
                            caption: '账单ID',
                            size: '150px',
                            sortable: true
                        },  
                        {
                            field: 'platformPattern',
                            caption: '平台模式',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'billPattern',
                            caption: '账单模式',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event, obj) {
                        console.log(event, obj)
                        let orderId = null
                        self.currentPage = 1
                        self.$store.commit('clearBillImport')
                        w2ui['billImportAndQuery'].records.map(function (item) {
                            if (obj.recid == item.id) {
                                orderId = item.billNo
                            }
                        })
                        self.getLoglist(orderId, '456789')
                        cancelID = orderId
                    }
                })
                if (arr.length > 0) {
                    // w2ui.billImportAndQuery.clear();//清空
                    w2ui.billImportAndQuery.records = arr
                    $('#main').w2render('billImportAndQuery');
                    w2ui.billImportAndQuery.refresh();

                } else {
                    // w2ui.billImportAndQuery.clear();//清空
                    w2ui['billImportAndQuery'].records = []
                    // w2ui.billImportAndQuery.refresh();
                    $('#main').w2render('billImportAndQuery')
                }
            });
        },
        //根据平台找店铺
        changePlatformName(id) {
            let basicPlatformId = null
            this.platformOptionsT.map(function (item) {
                if (id == item.name) {
                    basicPlatformId = item.id
                }
            })
            let data = {}
            data.platformId = basicPlatformId
            this.request('getBindingByPlatformId', data, true).then(res => {
                if (res.code == 1) {
                    this.shopListA = res.data
                    this.formSearch.basicStoreName = ''
                }
            })
            this.getZdlxList(basicPlatformId)
            this.formSearch.orderTypeName = ''
        },
        getZdlxList(id) {
            let data = {}
            data.basicPlatformId = id
            this.request('received_orderType_platformId', data, true).then(res => {
                if (res.code == 1) {
                    this.zlNewList = res.data
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
            this.request('accountPeriod_selector', data, true).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.timeList = res.data
                }
            })
        },
        //获取平台信息   platformOptions
        changePT(code) {
            this.ruleForm.address = ''
            this.ruleForm.zdms = ''
            this.ruleForm.ptms = ''
            this.ruleFormA.address = ''
            this.ruleFormA.zdmsTwo = ''
            this.ruleFormA.ptmsTwo = ''
            this.PTList = []
            this.ZDList = []
            this.zlList = []
            let basicPlatformId = ''
            let basicPlatformCode = ''
            this.platformOptions.map(function (item) {
                if (code == item.name) {
                    basicPlatformId = item.id
                    basicPlatformCode = item.code
                }
            })
            this.basicPlatformId = basicPlatformId
            this.basicPlatformCode = basicPlatformCode
            let data = {}
            data.basicPlatformName = code
            this.request('masterData_received_orderType_page', data, true).then((res) => {
                if (res.code == 1) {
                    // this.PTList = res.data.records
                    // this.ZDList = res.data.records
                    let PTList = []
                    res.data.records.map(function (item) {
                        PTList.push(item.platformPattern)
                    })
                    this.PTList = [...new Set(PTList)]

                }
            })
            this.getdianpuList(basicPlatformId)
        },
        changePtms(name) {
            this.ZDList = []
            this.zlList = []
            this.ruleForm.address = ''
            this.ruleForm.zdms = ''
            this.ruleFormA.address = ''
            this.ruleFormA.zdmsTwo = ''
            let data = {}
            data.basicPlatformName = this.ruleForm.code
            data.platformPattern = name
            this.request('masterData_received_orderType_page', data, true).then((res) => {
                if (res.code == 1) {
                    let ZDList = []
                    res.data.records.map(function (item) {
                        ZDList.push(item.billPattern)
                    })
                    this.ZDList = [...new Set(ZDList)]
                }
            })
        },
        changeZdms(name) {
            this.zlList = []
            this.ruleForm.address = ''
            this.ruleFormA.address = ''
            let data = {}
            data.basicPlatformName = this.ruleForm.code
            data.platformPattern = this.ruleForm.ptms
            data.billPattern = name
            this.request('masterData_received_orderType_page', data, true).then((res) => {
                if (res.code == 1) {
                    let zlList = []
                    res.data.records.map(function (item) {
                        zlList.push(item.orderTypeName)
                    })
                    this.zlList = [...new Set(zlList)]
                }
            })

        },
        changePtmsTwo(name) {
            this.ZDList = []
            this.zlList = []
            this.ruleForm.address = ''
            this.ruleForm.zdms = ''
            this.ruleFormA.address = ''
            this.ruleFormA.zdmsTwo = ''
            let data = {}
            data.basicPlatformName = this.ruleFormA.code
            data.platformPattern = name
            this.request('masterData_received_orderType_page', data, true).then((res) => {
                if (res.code == 1) {
                    let ZDList = []
                    res.data.records.map(function (item) {
                        ZDList.push(item.billPattern)
                    })
                    this.ZDList = [...new Set(ZDList)]
                }
            })
        },
        changeZdmsTwo(name) {
            this.zlList = []
            this.ruleForm.address = ''
            this.ruleFormA.address = ''
            let data = {}
            data.basicPlatformName = this.ruleFormA.code
            data.platformPattern = this.ruleFormA.ptmsTwo
            data.billPattern = name
            this.request('masterData_received_orderType_page', data, true).then((res) => {
                if (res.code == 1) {
                    let zlList = []
                    res.data.records.map(function (item) {
                        zlList.push(item.orderTypeName)
                    })
                    this.zlList = [...new Set(zlList)]
                }
            })

        },
        getdianpuList(code) {
            let data = {}
            data.platformId = code
            this.request('getBindingByPlatformId', data, true).then(res => {
                if (res.code == 1) {
                    this.shopList = res.data
                }
            })
        },
        //获取店铺信息
        changeDP(code) {
            let basicStoreId = ''
            let basicStoreCode = ''
            this.shopList.map(function (item) {
                if (code == item.name) {
                    basicStoreId = item.id
                    basicStoreCode = item.omsShopCode
                }
            })
            this.basicStoreId = basicStoreId
            this.basicStoreCode = basicStoreCode
        },
        //获取公司信息
        changeName(code) {
            let BBBB = ''
            let basicCompanyCode = ''
            let basicCompanyId = ''
            this.companyCodeOptions.map(function (item) {
                if (code == item.name) {
                    BBBB = item.id
                    basicCompanyCode = item.code
                    basicCompanyId = item.id
                }
            })
            this.basicCompanyCode = basicCompanyCode
            this.basicCompanyId = basicCompanyId
            let data = {}
            data.basicCompanyId = BBBB
            data.type = 0
            this.ruleForm.abbrName = ''
            this.ruleFormA.abbrName = ''
            this.request('accountPeriod_selector', data, true).then(res => {
                if (res.code == 1) {
                    // this.orderTypeList = res.data
                    this.timeListT = res.data
                }
            })
        },
        getOrterTyoe() {
            this.request('received_orderType_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.orderTypeList = res.data
                }
            })
        },
        handleCheckedCitiesChange() {
            let str = '';
            let store = '';
            setTimeout(() => {
                for (let i in this.$refs.currentRow.$children) {
                    if (this.$refs.currentRow.$children[i].isChecked) {
                        str += this.$refs.currentRow.$children[i].label
                        setTimeout(() => {
                            for (let j = 0; j < this.formThead.length; j++) {
                                if (str.includes(this.formThead[j].label)) {
                                    this.formThead[j].tag = true
                                } else {
                                    this.formThead[j].tag = false
                                }
                            }
                        }, 10);
                    } else {
                        store += this.$refs.currentRow.$children[i].label;
                        setTimeout(() => {
                            for (let j = 0; j < this.formThead.length; j++) {
                                if (store.includes(this.formThead[j].label)) {
                                    this.formThead[j].tag = false
                                } else {
                                    this.formThead[j].tag = true
                                }
                            }
                        }, 10);
                    }
                }
            }, 100);
        },
        choses() {
            this.visible = true
        },
        cancelGood() {
            this.file = null
            this.visible = false
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                this.visible = false
            }
        },
        //上传之前
        handleUpload(file) {
            if (!/\.csv$|.xls$|.xlsm$|.xlsx$|.xlt$/.test(file.name)) {
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
                this.$message.success(res.msg);
                this.picterVisible = false;
                this.imgUrlSave = res.data
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
        getplatformOptions() {
            this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                    this.platformOptionsT = res.data;
                }
            })
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        getResponse() {
            let data = {}
            this.request('masterData_staff_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.staffNameList = res.data.name
                }
            })
        },

        getData() {
            this.logList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.basicPlatformName = this.formSearch.basicPlatformName //平台名称
            data.basicCompanyName = this.formSearch.basicCompanyName //公司名称
            data.basicStoreName = this.formSearch.basicStoreName //店铺名称
            data.orderTypeName = this.formSearch.orderTypeName //订单类型
            data.period = this.formSearch.time //期间
            data.createUser = this.formSearch.person //人
            this.request('acc_received_file_record_page', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            //  res.data.records[i].recid=res.data.records[i].billNo
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records)
                        this.TTT = res.data.records
                        // this.hasData=true
                    } else {
                        this.initTable([])
                    }
                    this.total = res.data.count;
                    this.tableData = res.data.records;
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
                        this.$store.commit('billImport', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('billImport', this.logList)
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
                        this.$store.commit('billImport', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('billImport', this.logList)
                    }
                }
            })
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        onReset() {
            this.formSearch = {}
        },
        changeRadio(i) {},
        importTwoSave() {
            this.$refs['ruleFormA'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    if (this.file == null) {
                        this.$message({
                            message: '请先选择文件再导入！',
                            type: 'warning'
                        });
                    } else if (this.file !== null) {
                        let data = new FormData
                        data.append('file', this.file)
                        let index = this.file.name.lastIndexOf(".");
                        let suffix = this.file.name.substr(index + 1); //截取后缀   
                        data.append('basicPlatformId', this.basicPlatformId)
                        data.append('basicPlatformName', this.ruleFormA.code)
                        data.append('basicPlatformCode', this.basicPlatformCode)
                        data.append('basicCompanyId', this.basicCompanyId)
                        data.append('basicCompanyCode', this.basicCompanyCode)
                        data.append('basicCompanyName', this.ruleFormA.name)
                        data.append('basicStoreCode', this.basicStoreCode)
                        data.append('basicStoreId', this.basicStoreId)
                        data.append('basicStoreName', this.ruleFormA.shortName)
                        data.append('period', this.ruleFormA.abbrName)
                        data.append('fileType', suffix)
                        data.append('fileTemplateType', 2)
                        data.append('orderTypeName', this.ruleFormA.address)
                        data.append('billPattern', this.ruleFormA.zdmsTwo)
                        data.append('platformPattern', this.ruleFormA.ptmsTwo)
                        data.append('fileName', this.file.name)
                        this.request('doAsyncModifyParsing', data, false).then(res => {
                            if (res.code == 1) {
                                this.getTwoKey(res.data)
                                this.zlList = []
                                this.PTList = []
                                this.ZDList = []
                                this.basicPlatformId = '', //平台
                                    this.basicPlatformCode = '',
                                    this.basicCompanyId = '', //公司
                                    this.basicCompanyCode = '',
                                    this.basicStoreId = '', //店铺
                                    this.basicStoreCode = ''
                                this.dialogTwoVisible = false
                                this.ruleFormA = {
                                    code: '',
                                    name: '',
                                    shortName: '',
                                    abbrName: '',
                                    resource: '通用格式',
                                    address: '',
                                    officialLeader: '',
                                    orgLegal: '',
                                    enable: '',
                                    status: '',
                                    themID: '',
                                    zdmsTwo: '',
                                    ptmsTwo: '',
                                }
                                this.$refs['ruleFormA'].resetFields();
                                this.file = null

                            } else {
                                this.zlList = []
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    }
                } else { //验证表单
                    return false;
                }
            });
        },
        importSave(from, name) {
            this.disabledYun = false
            if (name == '生成收款单') {
                this.billCodeType ='PTZD'
            } else if (name == '生成应收单') {
                this.billCodeType = 'PTZD'
            }
            this.$refs['ruleForm'].validate((valid) => {
                console.log(valid, '0997656546789')
                if (valid) { //新增保存
                    let data = {}
                    if (this.file == null) {
                        this.$message({
                            message: '请先选择文件再导入！',
                            type: 'warning'
                        });
                    } else if (this.ruleForm.resource == '通用格式') {
                        let A = 0
                        let B = 1
                        this.ruleForm.resource == '通用格式' ? A = 0 : A = 1 //格式
                        let data = new FormData
                        data.append('file', this.file)
                        let index = this.file.name.lastIndexOf(".");
                        let suffix = this.file.name.substr(index + 1); //截取后缀
                        data.append('codeTypeCode', this.billCodeType)
                        data.append('basicPlatformId', this.basicPlatformId)
                        data.append('basicPlatformName', this.ruleForm.code)
                        data.append('basicPlatformCode', this.basicPlatformCode)
                        data.append('basicCompanyId', this.basicCompanyId)
                        data.append('basicCompanyCode', this.basicCompanyCode)
                        data.append('basicCompanyName', this.ruleForm.name)
                        data.append('basicStoreCode', this.basicStoreCode)
                        data.append('basicStoreId', this.basicStoreId)
                        data.append('basicStoreName', this.ruleForm.shortName)
                        data.append('period', this.ruleForm.abbrName)
                        data.append('fileType', suffix)
                        data.append('fileTemplateType', A)
                        data.append('fileName', this.file.name)
                        data.append('orderTypeName', this.ruleForm.address)

                        this.request('uploadStdSync', data, false).then(res => {
                            this.disabledBtn = true
                            if (res.code == 1) {
                                this.disabledBtn = false
                                this.getKey(res.data)
                            } else {
                                this.disabledBtn = false
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        let data = new FormData
                        if(this.ruleForm.name == ''){
                            this.$message.error('请选择公司')
                        }else if(this.ruleForm.shortName == ''){
                            this.$message.error('请选择店铺')
                        }else if(this.ruleForm.abbrName == ''){
                            this.$message.error('请选择期间')
                        }else{
                            if(this.yunjiLogo == true){
                                data.append('abnormalType','费用')
                            }
                            //特定接口
                        let A = 0
                        let B = 1
                        this.ruleForm.resource == '通用格式' ? A = 0 : A = 1 //格式
                        data.append('file', this.file)
                        let index = this.file.name.lastIndexOf(".");
                        let suffix = this.file.name.substr(index + 1); //截取后缀
                        data.append('codeTypeCode', this.billCodeType)
                        data.append('billPattern', this.ruleForm.zdms)
                        data.append('platformPattern', this.ruleForm.ptms)
                        this.ruleForm.themID ? data.append('billNo', this.ruleForm.themID) : delete data.append('billNo', this.ruleForm.themID)
                        this.ruleForm.sheetNumber ? data.append('sheetNumber', this.ruleForm.sheetNumber) : delete data.append('sheetNumber', this.ruleForm.sheetNumber)
                        data.append('basicPlatformId', this.basicPlatformId)
                        data.append('basicPlatformName', this.ruleForm.code)
                        data.append('basicPlatformCode', this.basicPlatformCode)
                        data.append('basicCompanyId', this.basicCompanyId)
                        data.append('basicCompanyCode', this.basicCompanyCode)
                        data.append('basicCompanyName', this.ruleForm.name)
                        data.append('basicStoreCode', this.basicStoreCode)
                        data.append('basicStoreId', this.basicStoreId)
                        data.append('basicStoreName', this.ruleForm.shortName)
                        data.append('period', this.ruleForm.abbrName)
                        data.append('fileType', suffix)
                        data.append('fileTemplateType', A)
                        data.append('fileName', this.file.name)
                        data.append('orderTypeName', this.ruleForm.address)
                        this.disabledBtn = true
                        this.request('uploadSync', data, true).then(res => {
                            if (res.code == 1) {
                                this.disabledBtn = false
                                this.getKeyD(res.data)
                            } else {
                                this.disabledBtn = false
                                this.zlList = []
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                            if(this.yunjiLogo == true){
                                this.yunjiLogo = true
                                this.disabledYun = true
                            }else{
                                this.yunjiLogo = false
                                this.disabledYun = false
                            }
                        })
                        }
                    }
                } else { //验证表单
                    this.disabledBtn = false
                    return false;
                }
            });
        },
        //循环key
        getKey(key) {
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 0,
                            });
                            this.cleanKey(key)
                            // clearTimeOut(getKey);
                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        getTwoKey(key) {
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 0,
                            });
                            this.cleanKey(key)
                            // clearTimeOut(getKey);
                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 3000
                            });
                            this.getTwoKey(key)
                        }
                    } else {
                        this.message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        getKeyD(key) {
            let data = {}
            data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {

                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                // showClose: false,
                                duration: 0,
                            });
                            this.cleanKey(key)

                            function myStopVFunction() {
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
                        this.message.warning(res.msg)
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
        //下载模板
        download() {
            window.location.href = 'http://eptison.oss-cn-hangzhou.aliyuncs.com/upload/test/eop-fms/AbstractAccReceivedAnalysisTemplate/uploadOssFile/0f957252-97f3-4d63-bf17-93451323325e.xlsx'
        },
        importCancel() {
            this.yunjiLogo = false
            this.disabledYun = false
            this.shopList = []
            this.PTList = []
            this.ZDList = []
            this.zlList = []
            this.dialogVisible = false
            this.file = null
            this.ruleForm = {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                resource: '通用格式',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
                ptms: '',
                zdms: '',
                themID: '',
            }
            this.$refs['ruleForm'].resetFields();
        },
        importTwoCancel() {
            this.PTList = []
            this.ZDList = []
            this.zlList = []
            this.shopList = []
            this.dialogTwoVisible = false
            this.file = null
            this.ruleFormA = {
                code: '',
                name: '',
                shortName: '',
                abbrName: '',
                resource: '通用格式',
                address: '',
                officialLeader: '',
                orgLegal: '',
                enable: '',
                status: '',
                themID: '',
                zdmsTwo: '',
                ptmsTwo: '',
            }
            this.$refs['ruleFormA'].resetFields();
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        onImport() {
            this.dialogVisible = true
            this.importURL = '导入'
        },
        onImportYun(){
            this.yunjiLogo = true
            this.dialogVisible = true
            this.importURL = '导入'
            this.disabledYun = true
            this.ruleForm.resource = '特定格式'
            this.ruleForm.code = '云集'
            this.changePT(this.ruleForm.code)
        },
        //账单处理
        onBillProcessing() {
            this.dialogTwoVisible = true
            this.importURL = '账单处理'
        },
        //选中删除
        // handleSelectionChange(i){
        //   this.length = i.length
        //     let data = ''
        //     i.map(item => {
        //         data += ',' +item.id;
        //     })
        //   let newData=data.substr(1);
        //     this.selectID = newData
        // },
        onDelete() {
            let billNo = null
            if (cancelID == null) {
                this.$message.warning('请先选择一条明细！')
            } else {
                let arr = w2ui.billImportAndQuery.getSelection()
                console.log(arr.toString(),'0000000')
                // this.TTT.map(function (item) {
                //     if (cancelID == item.billNo) {
                //         billNo = item.id
                //     }
                // })
                this.$Modal.confirm({
                    title: '提示',
                    content: '该行将会删除，请确认！',
                    onOk: () => {
                        this.tableDelete(arr.toString()); // 确认删除
                    },
                    onCancel: () => {
                        this.$message.warning('已取消删除');
                    }

                })
            }
        },
        tableDelete(cancelId) {
            let data = {}
            data.id = cancelId
            this.request('uploadRemove', data, false).then(res => {
                if (res.code == 1) {
                    this.$message.success('删除成功');
                    this.getData()
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
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

<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <!-- v-if="judgeMenu.indexOf('查询') !== -1" -->
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDelete">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导入') !== -1" size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('下载模板') !== -1" size="small" type="primary" @click="downLoad">下载模板</el-button>
                </el-form-item>
            </div>
            <el-form-item label="年份" size="small">
                <el-date-picker style="width:120px" v-model="formData.year" value-format="yyyy" type="year" placeholder="请选择"> </el-date-picker>
            </el-form-item>
            <el-form-item label="品牌(老)" size="small">
                <el-select v-model="formData.old_brandId" placeholder="请选择" style="width:140px" filterable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="款号/货品编码(老)" size="small">
                <el-input v-model="formData.old_goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品牌(新)" size="small">
                <el-select v-model="formData.new_brandId" placeholder="请选择" style="width:140px" filterable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="款号/货品编码(新)" size="small">
                <el-input v-model="formData.new_goodsNo" placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="加工类型" size="small">
                <el-select v-model="formData.type" placeholder="请选择" style="width:120px" filterable>
                    <el-option v-for="v in typeList" :key="v.processType" :label="v.processType" :value="v.processType"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="加工项目" size="small">
                <el-select v-model="formData.project" placeholder="请选择" style="width:120px" filterable>
                    <el-option v-for="v in projectList" :key="v.processProject" :label="v.processProject" :value="v.processProject"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div id="main" style="width: 100%; height: 400px;"></div>

        <section class="footer" style="margin-bottom:0px">
        <!-- <span class="pl20"><i class="el-icon-arrow-up pointer "></i></span> -->
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <!-- <section class="middle"> -->
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
    <!-- </section> -->
    </section>
    
    <!-- 编辑新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="1210" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="年份" size="small" label-width="150px">
                    <el-input v-model="addformdata.year" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="公司(老)" size="small" label-width="150px">
                    <el-input v-model="addformdata.oldcompany" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="品牌(老)" size="small" label-width="150px">
                    <el-input v-model="addformdata.oldbrand" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="款号/货品编码(老)" size="small" label-width="150px">
                    <el-input v-model="addformdata.oldgoodsNo" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="条码/商家编码(老)" size="small" label-width="150px">
                    <el-input v-model="addformdata.oldmerchCode" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="成本(老)" size="small" label-width="150px">
                    <el-input v-model="addformdata.oldcost" maxlength="20" :disabled="dialogtitle=='编辑'" style="width:220px"></el-input>
                </el-form-item>
                </Col>
                <Col>

                <el-form-item label="*公司(新)" size="small" label-width="150px">
                    <el-select v-model="addformdata.newcompany" @change="changenewcompany(addformdata.newcompany)" filterable placeholder="请选择" style="width:220px">
                        <el-option v-for="item in companyList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*品牌(新)" size="small" label-width="150px">
                    <el-select v-model="addformdata.newbrand" @change="changenewbrand(addformdata.newbrand)" placeholder="请选择" style="width:220px" filterable>
                        <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*款号/货品编码(新)" size="small" label-width="150px">
                    <el-input v-model="addformdata.newgoodsNo" maxlength="20" style="width:220px"></el-input>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="*条码/商家编码(新)" size="small" label-width="150px">
                    <el-input v-model="addformdata.newmerchCode" maxlength="20" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="成本(新)" size="small" label-width="150px">
                    <el-input v-model="addformdata.newcost" maxlength="20" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="加工数量" size="small" label-width="150px">
                    <el-input v-model="addformdata.jgnum" maxlength="20" style="width:220px"></el-input>
                </el-form-item>

                </Col>
                <Col>
                <el-form-item label="加工类型" size="small" label-width="150px">
                    <el-select v-model="addformdata.jgtype" @change="changejgtype(addformdata.jgtype)" placeholder="请选择" style="width:220px" filterable>
                        <el-option v-for="v in typeList" :key="v.processType" :label="v.processType" :value="v.processType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="加工项目" size="small" label-width="150px">
                    <el-select v-model="addformdata.jgproject" placeholder="请选择" multiple style="width:220px" filterable>
                        <el-option v-for="v in projectList" :key="v.processProject" :label="v.processProject" :value="v.processProject"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="改标发起时间" size="small" label-width="150px">
                    <el-date-picker style="width:220px" v-model="addformdata.startTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="改标完成时间" size="small" label-width="150px">
                    <el-date-picker style="width:220px" v-model="addformdata.endTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="费用承担人" size="small" label-width="150px">
                    <el-input v-model="addformdata.people" maxlength="20" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="业务单位" size="small" label-width="150px">
                    <el-input v-model="addformdata.busines" maxlength="20" style="width:220px"></el-input>
                </el-form-item>
                </Col>
                <el-form-item style="padding-left:460px">
                    <Button type="primary" @click="submitFormEdit">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--导入选择文件-->
    <Modal v-model="visible" title="导入文件" @on-cancel='cancelImport'>
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
var record
import filters from '../../filter/'
import Util from 'libs/util'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
          newId:null,
            newBasicCompanyId: null, //公司ID
            newBasicCompanyCode: null, //公司CODE
            newBasicBrandId: null, //品牌ID
            processTypeId: null, //加工类型ID
            file: null,
            name: '',
            visible: false,
            typeList: [], //类型
            projectList: [], //项目
            dialogVisible: false,
            IDS: [],
            addformdata: {
                year: null, //年份
                oldcompany: null, //公司(老)
                oldbrand: null, //品牌(老)
                oldgoodsNo: null, //款号/货品编码(老)
                oldmerchCode: null, //条码/商家编码(老)
                oldcost: null, //成本(老)

                newcompany: null, //公司(新)
                newbrand: null, //品牌(新)
                newgoodsNo: null, //款号/货品编码(新)
                newmerchCode: null, //条码/商家编码(新)
                newcost: null, //成本(新)

                jgnum: null, //加工数量
                jgtype: null, //加工类型
                jgproject: null, //加工项目

                startTime: null, //改标发起时间
                endTime: null, //改标完成时间
                people: null, //费用承担人
                busines: null, //业务单位
            },
            editformdata: {},
            dialogtitle: '新增',
            total: 0,
            page: 1,
            pageSize: 1000,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {
                code: '',
                brandId: '',
                name: '',
            },
            companyList: [],
            responseList: [], //负责人列表
            brandList: [], //品牌列表
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            rules: {
                brandNumber: [{
                    required: true,
                    message: '请输入品牌编码',
                    trigger: 'blur'
                }, ],
                brandName: [{
                    required: true,
                    message: '请输入品牌名称',
                    trigger: 'blur'
                }],
                brandsuo: [{
                    required: true,
                    message: '请输入品牌缩写',
                    trigger: 'blur'
                }],

                diaopai: [{
                    required: true,
                    message: '请输入吊牌名称',
                    trigger: 'blur'
                }, ],
                type: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'change'
                }],
                goodsStore: [{
                    required: true,
                    message: '请选择仓库',
                    trigger: 'change'
                }],
                costRate: [{
                    required: true,
                    message: '请输入成本倍率',
                    trigger: 'blur'
                }],
                tailMoney: [{
                    required: true,
                    message: '请输入零售价尾数',
                    trigger: 'blur'
                }],
                companyName: [{
                    required: true,
                    message: '请选择公司名称',
                    trigger: 'change'
                }],
                includesMoney: [{
                    required: true,
                    message: '请选择是否含试制费',
                    trigger: 'change'
                }],
                includesReponsor: [{
                    required: true,
                    message: '请输入负责人',
                    trigger: 'blur'
                }]
            },
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.revisionList
        }
    },
    destroyed() {
        this.$store.commit('clearrevision')
    },
    mounted() {
        this.getBrandList()
        this.getCompany()
        this.getButtonJurisdiction() //按钮权限
        this.getTypeList()
        this.getProjectList()
        this.initTable([])
    },
    methods: {
        initTable(arr = []) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'revision',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        selectColumn: true,
                    },
                    // multiSelect: false,
                    reorderColumns: true,
                    // reorderRows: true,  
                    columns: [
                      {
                            field: 'index',
                            caption: '序号',
                            size: '100px',
                            sortable: true,
                            info:true
                        },{
                            field: 'oldYear',
                            caption: '年份',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'oldBasicCompanyName',
                            caption: '公司(老)',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'oldBasicBrandName',
                            caption: '品牌(老)',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'oldGoodsNo',
                            caption: '款号/货品编码(老)',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'oldMerchantCode',
                            caption: '条码/商家编码(老)',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'newBasicCompanyName',
                            caption: '公司(新)',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'newBasicBrandName',
                            caption: '品牌(新)',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'newGoodsNo',
                            caption: '款号/货品编码(新)',
                            size: '150px',
                            sortable: true
                        },
                        {
                            field: 'newMerchantCode',
                            caption: '条码/商家编码(新)',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'oldCost',
                            caption: '成本(老)',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'newCost',
                            caption: '成本(新)',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'processQuantity',
                            caption: '加工数量',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'processType',
                            caption: '加工类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'processProject',
                            caption: '加工项目',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'startTime',
                            caption: '改标发起时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'endTime',
                            caption: '改标完成时间',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'costTaker',
                            caption: '费用承担人',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'businessDepartment',
                            caption: '业务单位',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event, obj) {
                        console.log(event, obj)
                        record = this.get(obj.recid);
                        console.log(this.get(obj.recid), '090909')
                        setTimeout(function () {
                            if (w2ui.revision.getSelection().length == 1) {
                                self.$store.commit('clearrevision')
                                let arr = w2ui.revision.getSelection()
                                if (arr[0] != obj.recid) {
                                    self.$store.commit('clearrevision')
                                } else {
                                    self.getLoglist(obj.recid)
                                    self.currentPage = 1;
                                }
                            } else {
                                self.$store.commit('clearrevision')
                            }
                        }, 200);
                    }
                })
                if (arr.length > 0) {
                    // w2ui.billImportAndQuery.clear();//清空
                    w2ui.revision.records = arr
                    $('#main').w2render('revision');
                    w2ui.revision.refresh();

                } else {
                    // w2ui.billImportAndQuery.clear();//清空
                    w2ui['revision'].records = []
                    // w2ui.billImportAndQuery.refresh();
                    $('#main').w2render('revision')
                }
            });
        },
        //导入
        onImport() {
            this.setBuryPoint('导入')
            this.visible = true
        },
        upload() {
            this.setBuryPoint('导入确认')
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.$refs['upload'].post(this.file);
                let data = new FormData
                data.append('file', this.file)
                this.request('markchange_uploadAsync', data, true).then((res) => {
                    if (res.code == 1) {
                        this.getKeyD(res.data)
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
                this.getKey(res.data)
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
        },
        //下载模板
        downLoad() {
            this.setBuryPoint('下载模板')
            window.location.href = 'https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/MarkChangeRecordBizServiceImpl/uploadOssFile/C1CD733240112EAD7697F72E36CB21D6.xlsx'
        },
        //异步导出
        onExport() {
            this.setBuryPoint('导出')
            let data = {}
            data.oldYear = this.formData.year //年份
            data.oldBasicBrandId = this.formData.old_brandId //品牌主键id(老)
            data.oldGoodsNo = this.formData.old_goodsNo //款号/货品编码(老)
            data.newBasicBrandId = this.formData.new_brandId
            data.newGoodsNo = this.formData.new_goodsNo
            data.processType = this.formData.type //类型
            data.processProject = this.formData.project //项目
            this.request('markchange_exportAsync', data, false).then(res => {
                if (res.code == 1) {
                    this.getKey(res.data)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        //循环key
        getKey(key) {
            const h = this.$createElement;
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
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
                                clearTimeout(this.timeAA);
                            }

                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
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
        onDelete() {
            this.setBuryPoint('删除')
            let arr = w2ui.revision.getSelection()
            if (arr.length > 0) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAll(arr)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message.error("请先选择删除的数据！");
            }
        },
        delAll(ids) {
            this.request('markchange_delete', {
                ids: ids
            }, false).then(res => {
                if (res.code == 1) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData()
                }
            })
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
        changenewcompany(name) {
            let newBasicCompanyId = ''
            let newBasicCompanyCode = ''
            this.companyList.map(x => {
                if (name == x.name) {
                    newBasicCompanyId = x.id,
                        newBasicCompanyCode = x.code
                }
            })
            this.newBasicCompanyId = newBasicCompanyId
            this.newBasicCompanyCode = newBasicCompanyCode
        },
        changenewbrand(name) {
            let newBasicBrandId = ''
            this.brandList.map(x => {
                if (name == x.name) {
                    newBasicBrandId = x.id
                }
            })
            this.newBasicBrandId = newBasicBrandId
        },
        changejgtype(name) {
            let processTypeId = ''
            this.typeList.map(x => {
                if (name == x.processType) {
                    processTypeId = x.id
                }
            })
            this.processTypeId = processTypeId
        },
        onEdit() {
            this.setBuryPoint('编辑')
            let arr = w2ui.revision.getSelection()
            let obj = {}
            console.log(arr, '0987689', w2ui['revision'].records, arr[0])
            if (arr.length > 1) {
                this.$message.error('一次只能编辑一条数据')
            } else if (arr.length == 0) {
                this.$message.error('请先选择数据再编辑')
            } else {
                w2ui['revision'].records.map(function (item) {
                    if (arr[0] == item.id) {
                        obj = item
                    }
                })
                this.dialogtitle = "编辑"
                this.dialogVisible = true
                this.newId = obj.id
                this.addformdata.year = obj.oldYear //年份
                this.addformdata.oldcompany = obj.oldBasicCompanyName //公司(老)
                this.addformdata.oldbrand = obj.oldBasicBrandName //品牌(老)
                this.addformdata.oldgoodsNo = obj.oldGoodsNo //款号/货品编码(老)
                this.addformdata.oldmerchCode = obj.oldMerchantCode //条码/商家编码(老)
                this.addformdata.oldcost = obj.oldCost //成本(老)

                this.addformdata.newcompany = obj.newBasicCompanyName //公司(新)
                this.newBasicCompanyId = obj.newBasicCompanyId
                this.newBasicCompanyCode = obj.newBasicCompanyCode

                this.addformdata.newbrand = obj.newBasicBrandName //品牌(新)
                this.newBasicBrandId = obj.newBasicBrandId

                this.addformdata.newgoodsNo = obj.newGoodsNo //款号/货品编码(新)
                this.addformdata.newmerchCode = obj.newMerchantCode //条码/商家编码(新)
                this.addformdata.newcost = obj.newCost //成本(新)

                this.addformdata.jgnum = obj.processQuantity //加工数量
                this.addformdata.jgtype = obj.processType //加工类型
                this.processTypeId = obj.processTypeId

                obj.processProject ? this.addformdata.jgproject = obj.processProject.split(',') : this.addformdata.jgproject = '' //加工项目
                this.addformdata.startTime = obj.startTime //改标发起时间
                this.addformdata.endTime = obj.endTime //改标完成时间
                this.addformdata.people = obj.costTaker //费用承担人
                this.addformdata.busines = obj.costTaker //业务单位
            }
        },
        selection(selection) {
            this.IDS = selection
            console.log(this.IDS)
        },
        resetEditForm() {
            this.addformdata = {
                companyAddress: null,
                companyPhone: null,
                brandNumber: null,
                brandName: null,
                includesReponsor: null,
                brandsuo: null,
                diaopai: null,
                type: null,
                goodsStore: null,
                costRate: null,
                tailMoney: null,
                companyName: null,
                companyAddress: null,
                companyPhone: null,
                includesMoney: null,
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
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            console.log(filters.getConstant('brand'), '000000000')
            let data = {}
            data.billNo = 'mark_change_record_' + this.billNo
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
                        this.$store.commit('revision', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('revision', this.logList)
                    }
                }
            })

        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = "mark_change_record_" + this.billNo
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
                        this.$store.commit('revision', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('revision', this.logList)
                    }
                }
            })
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formData = {}
            this.page = 1;
        },
        submitFormEdit() {
            this.setBuryPoint('编辑保存')
            this.dialogVisible = true
            console.log(this.addformdata.newgoodsNo, '09889')
            if (this.addformdata.newcompany == null || this.addformdata.newcompany.length == 0) {
                this.$message.error('公司(新)不能为空')
            } else if (this.addformdata.newbrand == null || this.addformdata.newbrand.length == 0) {
                this.$message.error('品牌(新)不能为空')
            } else if (this.addformdata.newgoodsNo == null || this.addformdata.newgoodsNo.length == 0) {
                this.$message.error('款号/货品编码(新)不能为空')
            } else if (this.addformdata.newmerchCode == null || this.addformdata.newmerchCode.length == 0) {
                this.$message.error('条码/商家编码(新)不能为空')
            } else {
                let data = {}
                data.id = this.newId
                data.oldYear = this.addformdata.year //年份
                data.newBasicCompanyName = this.addformdata.newcompany //公司(新)name
                data.newBasicCompanyId = this.newBasicCompanyId //id
                data.newBasicCompanyCode = this.newBasicCompanyCode //code
                data.newBasicBrandName = this.addformdata.newbrand //品牌(新)name
                data.newBasicBrandId = this.newBasicBrandId //id
                data.newGoodsNo = this.addformdata.newgoodsNo //款号/货品编码(新)
                data.newMerchantCode = this.addformdata.newmerchCode //条码/商家编码(新)
                data.newCost = this.addformdata.newcost //成本(新)

                data.processQuantity = this.addformdata.jgnum //加工数量
                data.processType = this.addformdata.jgtype //加工类型
                data.processTypeId = this.processTypeId //id
                data.processProject = this.addformdata.jgproject.join() //加工项目

                data.startTime = Util.dateFormat(this.addformdata.startTime, 'yyyy-MM-dd') //改标发起时间
                data.endTime = Util.dateFormat(this.addformdata.endTime, 'yyyy-MM-dd') //改标完成时间
                data.costTaker = this.addformdata.people //费用承担人
                data.businessDepartment = this.addformdata.busines //业务单位
                this.request('markchange_update', data, true).then((res) => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.getData()
                        this.dialogVisible = false
                        this.newBasicCompanyId = null
                        this.newBasicCompanyCode = null
                        this.newBasicBrandId = null
                        this.processTypeId = null
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.oldYear = this.formData.year //年份
            data.oldBasicBrandId = this.formData.old_brandId //品牌主键id(老)
            data.oldGoodsNo = this.formData.old_goodsNo //款号/货品编码(老)
            data.newBasicBrandId = this.formData.new_brandId
            data.newGoodsNo = this.formData.new_goodsNo
            data.processType = this.formData.type //类型
            data.processProject = this.formData.project //项目
            this.request('markchange_page', data, true).then((res) => {
                if (res.code == "1") {
                    this.total = res.data.count;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                            res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records)
                    } else {
                        this.initTable([])
                    }
                    //  this.list       = res.data.records
                    //  this.total      = res.data.count
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        getTypeList() {
            let data = {}
            this.request('discount_markChangeProcessType', data, true).then((res) => {
                if (res.code == 1) {
                    this.typeList = res.data
                }
            })
        },
        getProjectList() {
            let data = {}
            this.request('discount_markChangeProcessProject', data, true).then((res) => {
                if (res.code == 1) {
                    this.projectList = res.data
                }
            })
        },
        getCompany() {
            //masterData_company_selector
            let data = {}
            this.request('masterData_company_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.companyList = res.data
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        cancel() {
            this.dialogVisible = false;
        },
        showLog(row) {
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

.el-table__header-wrapper {

    width: 99.9% !important;

}
</style>

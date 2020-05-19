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
                    <el-button v-if="judgeMenu.indexOf('发起流程') !== -1" size="small" type="primary" @click="onStart">发起流程</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('取消流程') !== -1" size="small" type="primary" @click="onEnd">取消流程</el-button>
                </el-form-item>
            </div>
            <el-form-item label="任务流编号" size="small">
                <el-input v-model="formData.taskCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="流程状态" size="small">
                <el-select v-model="formData.processStatus" placeholder="流程状态" style="width:150px" filterable>
                    <el-option v-show="v!='已完成'" v-for="v in statusList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- <Table ref="currentRowTable" @on-select-cancel="choiceId" @on-select-all-cancel="choiceId" max-height='550' @on-select="choiceId" @on-select-all="choiceId" :columns="columns" size="small" highlight-row :data="list"></Table> -->
        <el-table @select-all="selectionAll" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="390" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="taskNo" label="任务流编号" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="processStatus" label="流程状态" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateUserName" label="品牌发起人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateDepartmentName" label="发起部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="majorClasses" label="面/辅料" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kinds" label="面料品类分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialCategory" label="是否特殊工艺" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
            </el-table-column> 
            <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="styleImg" label="样图1" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg.length>0" @click="imgClick(scope.row.styleImg)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                        </el-image>
                    </div>
                    <div v-if="scope.row.styleImg.length==0" >
                        <el-image style="width: 40px; height: 40px" :src = noneUrl></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2" label="样图2" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg2.length>0" @click="imgClick(scope.row.styleImg2)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div>
                    <div v-if="scope.row.styleImg2.length==0" >
                       <el-image style="width: 40px; height: 40px" :src = noneUrl></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="realMaterial" label="是否有实物" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.realMaterial == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="contrastColor" label="是否撞色" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.contrastColor == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="developer" label="开发员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="requireDate" label="要求完成日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>
    <!-- 编辑新增弹框 -->
    <Modal v-model="visible" :styles="mystyle" title="发起流程" @on-cancel='cancel' :width="1010" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col span="24">
                <Col span="8">
                <el-form-item label="面/辅料" prop="majorClasses" size="small" label-width="120px">
                    <el-select v-model="addformdata.majorClasses" @change="changeMajorClasses(addformdata.majorClasses)" style="width:150px" filterable>
                        <el-option v-for="v in majorClassesList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="面辅料品类分类" prop="kinds" size="small" label-width="120px">
                    <el-select v-model="addformdata.kinds" @change="changeKinds(addformdata.kinds)" style="width:150px" filterable>
                        <el-option v-for="v in kindsList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="是否有实物" prop="realMaterial" size="small" label-width="120px">
                    <el-select v-model="addformdata.realMaterial" style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="8">
                <el-form-item label="是否撞色" prop="contrastColor" size="small" label-width="120px">
                    <el-select v-model="addformdata.contrastColor" style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="是否特殊工艺" prop="specialCategory" size="small" label-width="120px">
                    <el-select v-model="addformdata.specialCategory"  style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item v-if="this.addformdata.specialCategory == 1" label="特殊工艺类目" size="small" label-width="120px">
                    <el-select v-model="addformdata.specialProcessCategory" @change="changespecialProcessCategory(addformdata.specialProcessCategory)" style="width:150px" filterable>
                        <el-option v-for="v in typeList" :key="v.specialProcessCategory" :label="v.specialProcessCategory" :value="v.specialProcessCategory"></el-option>
                    </el-select>
                    <!-- <el-input v-model="addformdata.specialCategoryType" :disabled="true" style="width:120px"></el-input> -->
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="8">
                <el-form-item label="开发员" prop="developer" size="small" label-width="120px">
                    <el-select v-model="addformdata.developer" @change="changeDevelop(addformdata.developer)" style="width:150px" filterable>
                        <el-option v-for="v in personList" :key="v.id" :label="v.basicUserName" :value="v.basicUserName"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="要求完成日期" prop="requireDate" size="small" label-width="120px">
                    <DatePicker v-model="addformdata.requireDate" type="date" style="width: 150px">
                    </DatePicker>
                </el-form-item>
                <!-- data.planStockinTime = Util.dateFormat(this.formSearch.planStockinTime, 'yyyy-MM-dd'); -->
                </Col>
                </Col>
                <Col span='24'>
                <Col span="8">
                <el-form-item label="设计师需求样品图" size="small" label-width="140px">
                    <div style="width: 100px; height: 100px" @click="clickImg('1')">
                        <el-image v-if="imgUrl1.length>0" style="width: 100px; height: 100px" :src="imgUrl1">
                        </el-image>
                       <el-image v-if="imgUrl1.length ==0" style="width: 100px; height: 100px" :src = noneUrl></el-image>
                    </div>
                </el-form-item>
                </Col>
                <Col span="8">
                <div style="width: 100px; height: 100px" @click="clickImg('2')"> 
                    <el-image v-if="imgUrl2.length>0" style="width: 100px; height: 100px" :src="imgUrl2"></el-image>
                    <el-image v-if="imgUrl2.length == 0" style="width: 100px; height: 100px" :src = noneUrl></el-image>
                </div>
                
                </Col>
                </Col>
                <Col span="24">
                <el-form-item style="padding-left:430px">
                    <Button type="primary" @click="submitForm('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <!--导入账单选择文件-->
    <Modal v-model="picVisible" @on-cancel='cancelGood' title="上传图片">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/masterData/ossFileAddress/upload" :data="{className:'面料开发'}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将图片拖拽到此处</p>
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

    <Modal title="查看大图" v-model="imgVisible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- <section class="footer" style="margin-bottom:0px">
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
    </section> -->
</div>
</template>

<script>
import Util from 'libs/util'
import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce],
    data() {
        return {
            noneUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            getDay: '',
            userInfo: {},
            rowId: '',
            personList: [],
            typeList: [],
            kindsList: [],
            oldKindsList: [],
            getObj: {},
            majorClassesList: ['面料', '辅料'],
            yesNoList: [{
                id: '1',
                name: '是'
            }, {
                id: '0',
                name: '否'
            }],
            statusList: [], //任务状态
            imgUrl1: '',
            imgUrl2: '',
            getOssUrl1: '',
            getOssUrl2: '',
            imgType: '',
            // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [],
            picVisible: false,
            file: null,
            rules: {
                specialCategoryType: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                majorClasses: [ //面料
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                kinds: [ //分类
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                realMaterial: [ //是否有实物
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                contrastColor: [ //是否撞色
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                specialCategory: [ //是否特殊工艺
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                developer: [ //开发员
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                requireDate: [ //要求完成日期
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    }
                ],
            },
            imgUrl: '',
            visible: false,
            addformdata: {
                kinds:'',
                specialProcessCategory:'',
                specialCategory:'',
            },
            colorList: [],
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {},
            IDS: [],
            companyList: [],
            responseList: [], //负责人列表
            departmentList: [], //品牌列表
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            department: {},
            developId:'',
        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        this.getData()
        this.getStatusList()
        this.getDepartment()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        changeDevelop(name){
            console.log(name)
            let id = ''
            this.personList.map(item =>{
                if(name == item.basicUserName){
                    id = item.basicUserId
                }
            })
            this.developId = id 
        },
        imgClick(url) {
            this.srcList = [url]
            console.log('pppppppppppppp',this.srcList)
        },
        getDepartment() {
            let data = {}
            data.code = this.userInfo.staffCode
            this.request('masterData_staff_getDepartmentByCode', data, false).then(res => {
                if (res.code == 1) {
                    this.department = res.data
                    // this.formData2=res.data
                }
            })
        },
        changeMajorClasses(name) {
            this.addformdata.kinds = ''
            this.addformdata.specialProcessCategory = ''
            this.addformdata.specialCategory = ''
            this.kindsList = []
            this.typeList = []
            let data = {}
            data.majorClasses = name
            this.request('fabric_developCycle_select', data, true).then(res => {
                if (res.code == 1) {
                    // this.kindsList = res.data
                    let List = []
                    res.data.map(item => {
                        List.push(item.kinds)
                    });
                    this.oldKindsList = res.data
                    this.kindsList = [...new Set(List)]
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        changeKinds(name) {
            // this.kindsList = []
            this.addformdata.specialCategory = ''
            this.addformdata.specialProcessCategory = ''
            console.log(name)
            let data = {}
            data.majorClasses = this.addformdata.majorClasses
            data.kinds = name
            this.request('fabric_developCycle_select', data, true).then(res => {
                if (res.code == 1) {
                    console.log(res.data.length)
                    if (res.data.length > 0) {
                        this.typeList = res.data
                        // this.addformdata.specialCategory = '1'
                    } else {
                        // this.addformdata.specialCategory = '0'
                    }
                    // this.kindsList = res.data
                } else {
                    this.$message.error(res.msg);
                }
            })
            let obj = {}
            this.oldKindsList.map(item => {
                if (name == item.kinds) {
                    obj = item
                    console.log(item, '0000000000000000')
                }
            });
            this.getObj = obj
            // this.addformdata.specialCategoryType = code
            // if(this.addformdata.specialCategoryType.length == 0){
            //     this.addformdata.specialCategory = '0'
            // }else{
            //     this.addformdata.specialCategory = '1'
            // }
            console.log(this.getObj)
        },
        changespecialProcessCategory(name) {
            console.log(name)
            let day = ''
            this.typeList.map(item => {
                if (name == item.specialProcessCategory) {
                    day = item.specialProcessCategoryDay
                    // obj = item
                    console.log(item, '0000000000000000')
                }
            });
            this.getDay = day
        },
        clickImg(type) {
            this.imgType = type
            console.log(this.imgType)
            this.picVisible = true
            console.log('00000000000')
        },
        cancelGood(){
            this.file = null
            this.picVisible = false
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.visible = false
                // 
                let data = new FormData
                data.append('file', this.file)
                data.append('className', 'initiate')
                this.request('uploadImg', data, true).then(res => {
                    if (res.code == 1) {
                        if (this.imgType == 1) {
                            this.imgUrl1 = res.data.htmlOssAddress
                            this.getOssUrl1 = res.data.ossAddress
                        } else {
                            this.imgUrl2 = res.data.htmlOssAddress
                            this.getOssUrl2 = res.data.ossAddress
                        }
                        this.picVisible = false
                        this.file = null
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        },
        //上传之前img
        handleUpload(file) {
            if (!/\.jpg|.png|.jpeg|.JPG|.PNG|.JPEG/.test(file.name)) {
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
                console.log(this.imgType)

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
        submitForm() {
            if(this.getOssUrl1== ''&&this.getOssUrl2 == ''){
                this.$message.error('至少上传一张设计师需求样品图')
            }else{
                this.$refs['ruleForm'].validate((valid) => {
                        console.log(valid)
                if (valid) { //新增保存
                let data = Util.deepClone(this.addformdata);
                if(this.addformdata.specialCategory == 0){
                    data.fabricDevelopCycleSpecialDay = ''
                    data.specialProcessCategory = ''
                }else{
                    data.fabricDevelopCycleSpecialDay = this.getDay
                }
                console.log(this.addformdata.specialCategory,'11111111111',this.getDay)
                    data.initiateUserId = this.userInfo.userId
                    data.initiateUserName = this.userInfo.userName
                    data.initiateDepartmentId = this.department.departmentId
                    data.initiateDepartmentName = this.department.departmentName
                    data.requireDate = Util.dateFormat(this.addformdata.requireDate, 'yyyy-MM-dd')
                    data.fabricDevelopCycleId = this.getObj.id
                    data.fabricDevelopCycleDay = this.getObj.cycleDay
                    data.styleImg = this.getOssUrl1
                    data.styleImg2 = this.getOssUrl2
                    data.developerId = this.developId
                    this.request('add_fabric', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('新增成功')
                            this.getData()
                            this.visible = false
                            this.addformdata = {
                                specialProcessCategory:'',
                                kinds:'',
                                specialCategory:''
                            }
                            this.$refs['ruleForm'].resetFields();
                            this.imgUrl1 = ''
                            this.imgUrl2 = ''
                            this.getOssUrl1 = ''
                            this.getOssUrl2 = ''
                            this.typeList = []
                            this.kindsList = []
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
            }
        },
        //取消
        cancel(){
            this.visible = false
                            this.addformdata = {
                                specialProcessCategory:'',
                                kinds:'',
                                specialCategory:''
                            }
                            this.$refs['ruleForm'].resetFields();
                            this.imgUrl1 = ''
                            this.imgUrl2 = ''
                            this.getOssUrl1 = ''
                            this.getOssUrl2 = ''
                            this.typeList = []
                            this.kindsList = []
        },
        //发起流程
        onStart() {
            this.visible = true
            let data = {}
            this.request('queryNextId', data, true).then((res) => {
                if (res.code == 1) {
                    // this.queryNextId = 
                    this.getPersonList(res.data)
                    // this.personList = res.data
                }
            })
        },
        selection(selection, row) {
            console.log('当用户手动勾选数据行的 Checkbox 时触发的事件', selection, row)
            // 选择项大于1时
            if (selection.length > 1) {
                let del_row = selection.shift();
                this.$refs.multipleTable.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
            }
            this.rowId = row.taskNo
        },
        selectionAll(selection) {
            if (selection.length > 1) {
                selection.length = 1;
            }
        },
        //取消流程
        onEnd() {
            // let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.taskNo = this.rowId
            if (this.rowId) {
                this.request('cancelCheck_fabric', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$confirm(res.data, '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            // value
                        }) => {
                            this.request('cancel_fabric', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
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
                this.$message.error('请勾选取消流程数据')
            }
        },
        //获取人员下拉
        getPersonList(id) {
            let data = {}
            data.taskConfigurationId = id
            this.request('getListByTaskConfigurationId', data, true).then((res) => {
                if (res.code == 1) {
                    this.personList = res.data
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
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.taskNo = this.formData.taskCode
            data.processStatus = this.formData.processStatus
            this.request('queryProcess_page', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.list = []
                    this.total = '0'
                }
            })
        },
        getStatusList() {
            //masterData_company_selector
            let data = {}
            this.request('queryProcessStatus', data, true).then((res) => {
                if (res.code == 1) {
                    this.statusList = res.data
                }
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onSearch() {
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formData = {}
        },
        // getLoglist(billNo) {
        //     this.billNo = billNo
        //     this.currentPage = 1
        //     console.log(filters.getConstant('brand'), '000000000')
        //     let data = {}
        //     data.billNo = filters.getConstant('department') + this.billNo
        //     data.pageSize = 3
        //     data.currentPage = this.currentPage
        //     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
        //         if (res.code == 1) {
        //             if (res.data.length < data.pageSize) {
        //                 this.dataFlag = false
        //             } else {
        //                 this.dataFlag = true
        //             }
        //             if (this.currentPage == 1) {
        //                 this.logList = res.data
        //             } else {
        //                 this.logList = this.logList.concat(res.data)
        //             }
        //         }
        //     })

        // },
        // getMore() {
        //     this.currentPage++
        //     let data = {}
        //     data.billNo = filters.getConstant('brand') + this.billNo
        //     data.pageSize = 3
        //     data.currentPage = this.currentPage
        //     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
        //         if (res.code == 1) {
        //             if (res.data.length < data.pageSize) {
        //                 this.dataFlag = false
        //             } else {
        //                 this.dataFlag = true
        //             }
        //             if (this.currentPage == 1) {
        //                 this.logList = res.data
        //             } else {
        //                 this.logList = this.logList.concat(res.data)
        //             }
        //         }
        //     })
        // },

        // showLog(row) {
        //     this.getLoglist(row.id)
        // },

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
.el-icon-circle-close {
 color:white !important;
}
</style>

<style>
 .el-image-viewer__close{
        color:#fff!important;
    }
.el-image-viewer__prev,.el-image-viewer__next{
     display: none;
}
</style>

<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
            <div>
                <el-form-item size="small">
                    <el-button  v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                        <!--  -->
                        <el-button v-if="judgeMenu.indexOf('导入') !== -1"  size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <el-form-item size="small">
                            <!--  -->
                        <el-button  v-if="judgeMenu.indexOf('编辑') !== -1" size="small"  type="primary" @click="onEdit">编辑</el-button>
                </el-form-item>
                 <el-form-item size="small">
                            <!-- -->
                        <el-button  v-if="judgeMenu.indexOf('下载模板') !== -1"  size="small"  type="default" @click="downloadTemplate">下载模板</el-button>
                </el-form-item>
            </div>
            <el-form-item label="大类：" size="small">
                <el-select v-model="formSearch.majorClasses" placeholder="请选择" style="width:160px" filterable>
                     <el-option v-for="v in this.materialTypeList" :key="v.id"  :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
          <el-table @selection-change="selection" @select-all="selection" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="250" highlight-current-row @row-click="showLog">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="majorClasses" label="大类" min-width="120" align="center" show-overflow-tooltip>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="kinds" label="品类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="cycleDay" label="周期/天" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="specialProcessCategoryDay" label="特殊工艺加时/天" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <section class="footer" style="margin-bottom:0px">
        <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <!-- <section class="middle"> -->
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
    <!-- </section> -->
    </section>
      <!--新增弹框 -->
    <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" :title="dialogtitle" @on-cancel='cancel' :width="810"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="大类：" size="small" label-width="75px" >
                        <div    readonly  style="width:160px;" placeholder="请输入">{{this.formData.majorClasses}}</div>
                    </el-form-item>
                    <el-form-item label="品类：" size="small" label-width="75px" prop="warehouseName">
                         <div    readonly  style="width:150px;" placeholder="请输入">{{this.formData.kinds}}</div>
                    </el-form-item>
                    <el-form-item label="周期/天：" size="small" label-width="85px" prop="cycleDay">
                       <el-select v-model="formData.cycleDay" placeholder="请选择" style="width:160px">
                            <el-option
                            v-for="item in numberList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                      </el-select>
                    </el-form-item>
                </Col>
                <Col class="MB20">
                    <el-form-item label="特殊工艺加时/天：" size="small" label-width="145px" prop="specialProcessCategoryDay">
                       <el-select v-model="formData.specialProcessCategoryDay" placeholder="请选择" style="width:220px" @change="watchItem(formData.specialProcessCategoryDay,1)">
                            <el-option
                                 v-for="item in numberList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="特殊工艺类目：" size="small" label-width="140px" >
                        <el-input v-model="formData.specialProcessCategory" maxlength="20" placeholder="请输入" style="width:210px"  show-word-limit @blur="watchItem(formData.specialProcessCategory,2)"></el-input>
                    </el-form-item>
                </Col>
     
                <el-form-item style="padding-left:330px">
                    <Button type="primary" @click="dialogtitle=='新增'?submitForm('ruleForm'):submitForms('ruleForm')">确认</Button>
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
import filters from '../../filter/'
 import { commonMixins } from 'mixins/common';
 import {debounce} from 'mixins/debounce'
 import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [commonMixins,debounce,burypoint],
    data() {
        return {
            visible: false,
             file: null,
            numberList:[],
            staffList: [],
            dialogVisible: false,
            formSearch:{
                       majorClasses:''//大类
            },
            formData: {
                      cycle:'',
                      special:'',
                      leimu:'',
            },
            dialogtitle: '新增',
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            IDS: [],
            companyList: [],
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            total:0,
            judgeMenu: [],
            buttonList: [], //按钮权限
            rules: {
                cycleDay: [
                    { required: true, message: '请选择', trigger: 'change' },
                ],
                specialProcessCategoryDay: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                specialProcessCategory: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ]
           }
        }
    },
    mounted() {
        this.getMaterialType()
        this.getData()
        this.getButtonJurisdiction() //按钮权限
        for(let i=0;i<99;i++){
           
                  this.numberList.push(i)
            // }
           
        }
    },
    methods: {
        watchItem(v,level){
             if(level==1){
                   if(v==0){
                      this.formData.specialProcessCategory=''
                   }
             }else if(level==2){
                      if(v){
                        
                      }else{
                          this.formData.specialProcessCategoryDay='0'
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
        selection(selection) {
            this.IDS = selection
        },
        downloadTemplate(){
            this.setBuryPoint('下载模板')
                   location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/FabricDevelopCycleController/templateFile/开发周期-导入模板.xlsx"
        },
        onEdit() {
            this.setBuryPoint('编辑')
            if (this.IDS.length == 1) {
                this.dialogVisible = true
                this.dialogtitle = "编辑"
                this.resetForm('ruleForm')
                this.formData= Object.assign({}, this.formData, this.IDS[0])
                if(this.formData.specialProcessCategory){

                }else{
                    this.formData.specialProcessCategoryDay=0
                }
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择编辑的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能编辑一条数据!')
            }
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()

        },
        editSubmit(){
            this.setBuryPoint('编辑保存')
                 const {id,majorClasses,kinds,cycleDay,specialProcessCategoryDay,specialProcessCategory}=this.formData

                 if(specialProcessCategory&&specialProcessCategoryDay==0) return this.$message.error('特殊工艺类目不为空时，特殊工艺加时须大于0')
                 let data={}
                     data.id=id
                     data.majorClasses=majorClasses
                     data.kinds=kinds
                     data.cycleDay=cycleDay
                     data.specialProcessCategoryDay=specialProcessCategoryDay
                     data.specialProcessCategory=specialProcessCategory
                 this.request('fabric_developCycle_update',data,false).then(res=>{
                     if(res.code==1){
                         this.getData()
                         this.cancel()
                     }else{
                          this.$message.error(res.msg)
                     }
                 })
        },
        submitForms(formName) {
            this.dialogVisible = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editSubmit()
                } else {
                    return false;
                }
            });
        },
        getData() {
                this.logList = []
                let data = {}
                    data.currentPage  = this.page
                    data.pageSize     = this.pageSize
                    data.majorClasses = this.formSearch.majorClasses 
                    data.majorClasses?'':delete data. majorClasses
            this.request('fabric_developCycle_select', data, true).then((res) =>{
                if (res.code == 1) {
                     this.list = res.data
                } else {
                      this.list =[]
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        cancel() {
            this.resetForm('ruleForm')
            this.dialogVisible = false;
            for(let i in this.formData){
                this.formData[i]=''
            }
         },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'develop_cycle_' + this.billNo
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
            data.billNo = 'master_data_warehouse_' + this.billNo
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
            this.getLoglist(row.id)
        },
        onImport() {
            this.setBuryPoint('导入')
            this.visible = true
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.$refs['upload'].post(this.file);
                let data = new FormData
                data.append('file', this.file)
                this.request('fabric_developCycle_uploadAsync', data, true).then((res) => {
                    if (res.code == 1) {
                        this.getKeyD(res.data)
                    }
                })
                this.file=null
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
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        cancelImport() {
            this.file = null
            this.visible = false
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

.MB20{
    margin-bottom: 20px
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

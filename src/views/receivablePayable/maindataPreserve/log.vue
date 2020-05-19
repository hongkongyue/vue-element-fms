<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                <!-- -->
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!--  -->
                <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button  v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDel">删除</el-button>
            </el-form-item>
            </div>
            <!-- <el-form-item label="岗位编码："   size="small">
                              <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.code" :label="item.code" :value="item.code"></el-option>
                              </el-select>
                          </el-form-item> -->
            <el-form-item label="版本号：" size="small">
                <el-input style="width:140px" v-model="formSearch.version" placeholder="请输入版本号"></el-input>
                <!-- <el-select v-model="formSearch.basicStationName" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.basicStationName" :label="item.basicStationName" :value="item.basicStationName"></el-option>
                              </el-select> -->
            </el-form-item>
            
        </el-form>
    </header>
    <section class="middle"  :style="{minHeight:showBink?'680px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" border tooltip-effect="dark" max-height="550" @selection-change="selection">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="order" width="55" label="序号" align="center"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="scope">

                    <el-form label-position="left" inline class="demo-table-expand">
                        <Col>
                        <el-form-item label="版本代号 :">
                            <span>{{ scope.row.code }}</span>
                        </el-form-item>
                        </Col>
                        <Col>
                        <el-form-item label="版本号 :">
                            <span>{{scope.row.versionNo }}</span>
                        </el-form-item>
                        </Col>
                        <Col>
                        <el-form-item label="是否当前版本 :">
                            <span>{{scope.row.currentVersion == 1 ? '是' : '否' }}</span>
                        </el-form-item>
                        </Col>
                        <Col>
                        <el-form-item label="发版内容:">
                            <span v-html="scope.row.releaseContent"></span>
                        </el-form-item>
                        </Col>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="摘要" align="center" show-overflow-tooltip prop="summary">
            </el-table-column>
            <el-table-column label="发版时间" align="center" show-overflow-tooltip prop="releaseTime">
            </el-table-column>
        </el-table>
    </section>

    <!-- 新增弹框 -->
    <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" :title="title" :width="910" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForms" :model="addFormSearch" class="demo-form-inline demo-ruleForm" :label-position="left" :rules="rules">
                <Col>
                <el-form-item label="版本代号：" prop="code" label-width="120px" size="small">
                    <el-input v-model="addFormSearch.code" style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="版本号：" prop="versionNo" label-width="120px" size="small">
                    <el-input v-model="addFormSearch.versionNo" style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="发布时间：" prop="releaseTime" label-width="120px" size="small">
                    <el-date-picker style="width:190px" v-model="addFormSearch.releaseTime" type="datetime" placeholder="发布时间">
                    </el-date-picker>
                </el-form-item>
                </Col>
                <Col>
                 <el-form-item  v-if ="addFormSearch.versionNo" label="是否当前版本：" prop="summary" label-width="120px" size="small">
                                        <el-radio v-model="addFormSearch.currentVersion" label="1">是</el-radio>
                                        <el-radio v-model="addFormSearch.currentVersion" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="摘要：" prop="summary" label-width="120px" size="small">
                    <el-input v-model="addFormSearch.summary" type="textarea" placeholder="请输入摘要" style="width:130px"></el-input>
                </el-form-item>
                
                </Col>
                <Col>
                <el-form-item><span style="color:red">*</span></el-form-item>
                <el-form-item label="发版内容：" label-width="90px" size="sDmall" style="margin-right:0px">
                    <div id="editorElem" style="text-align:left"></div>
                </el-form-item>
                <!-- <el-form-item label="摘要：" prop="summary"  label-width="120px" size="small">
                            <el-input v-model="addFormSearch.summary"  type="textarea"
                                     placeholder="请输入摘要" style="width:130px"></el-input>
                        </el-form-item> -->
                </Col>
                <Col>
                <el-form-item style="padding-left:330px">
                    <Button type="primary"   v-if="this.title=='新增'" @click="submitForm('ruleForms')">确认</Button>
                    <Button type="primary"   v-if="this.title=='编辑'" @click="submitForms('ruleForms')">确认</Button>
                    <Button type="default" @click="changeCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>

        </Row>
        <div slot="footer"></div>
    </Modal>

</div>
</template>

<script>
import filters from '../../../filter/'
import E from 'wangeditor'
import {debounce} from 'mixins/debounce'
export default {
    mixins:[debounce],
    data() {
        return {
            changeVisible: false, //编辑
            title:'新增',
            formSearch: {
                version: '',
            },
            addFormSearch: {
                code: '',
                versionNo: '',
                releaseTime: '',
                releaseContent: '',
                summary: '',
                currentVersion:'',
                id            :''
            },
            rules: {
                versionNo: [{
                        required: true,
                        message: '请输入版本号',
                        trigger: 'blur'
                    },

                ],
                releaseTime: [{
                    required: true,
                    message: '请选择输入时间',
                    trigger: 'change'
                }],
                releaseContent: [{
                    required: true,
                    message: '请输入发版内容',
                    trigger: 'blur'
                }],
                summary: [{
                    required: true,
                    message: '请输入摘要',
                    trigger: 'blur'
                }, ]
            },
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [],
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            judgeMenu: [],
            buttonList: [], //按钮权限
            editor: '', // 存放实例化的wangEditor对象，在多个方法中使用
            IDS: [],
        }
    },
    mounted() {
        this.getData()
        this.getButtonJurisdiction() //按钮权限
        this.$nextTick(() => {
                this.editor = null;
                this.editor = new E('#editorElem')
                this.editor.customConfig.onchange = (html) => {
                    this.addFormSearch.releaseContent = this.editor.txt.text()
            };
                this.editor.create();
                this.$refs['ruleForms'].resetFields();
                this.editor.txt.clear();
        })
    },
    methods: {
        onEdit() {
            this.title='编辑'
            if (this.IDS.length == 1) {
                this.clear()
                 this.changeVisible=true
                 this.addFormSearch.code=this.IDS[0].code
                 this.addFormSearch.versionNo=this.IDS[0].versionNo
                 this.addFormSearch.releaseTime=new Date(this.IDS[0].releaseTime)
                 this.addFormSearch.currentVersion=(this.IDS[0].currentVersion).toString()
                 this.addFormSearch.releaseContent=this.IDS[0].releaseContent
                 this.editor.txt.html(this.IDS[0].releaseContent)
                 this.addFormSearch.summary=this.IDS[0].summary.indexOf('(')?(this.IDS[0].summary).split('(')[0]:this.IDS[0].summary
                 this.addFormSearch.id=this.IDS[0].id
            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择编辑的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能修改一条数据!')
            }
        },
        clear(){
              this.addFormSearch.versionNo=''
              this.addFormSearch.code='';
              this.addFormSearch.versionNo=''
              this.addFormSearch.releaseTime=''
              this.addFormSearch.releaseContent=''
              this.addFormSearch.summary=''
              this.addFormSearch.currentVersion=''
              this.addFormSearch.id=''
            //   this.addFormSearch.code= {
            //     code: '',
            //     versionNo: '',
            //     releaseTime: '',
            //     releaseContent: '',
            //     summary: '',
            //     currentVersion:'',
            //     id            :''
            // },
        },
        onDel(id) {
            if (this.IDS.length == 1) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.id = this.IDS[0].id
                    this.request('masterData_versionLog_delete', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            } else if (this.IDS.length == 0) {
                this.$message.error('请先选择编辑的数据!')
            } else if (this.IDS.length > 1) {
                this.$message.error('一次只能删除一条数据!')
            }

        },
        selection(selection) {
            this.IDS = selection
        },
        HTMLDecode(text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        changeCancel() {
             this.title='新增'
             this.clear()
             this.changeVisible = false
             this.editor.txt.clear();
             this.resetForm('ruleForms')
        },
        resetForm(formName) {
            this.editformdata = {}
            this.$refs[formName].resetFields();
        },
        edit(){
            let data = {}
                data.code = this.addFormSearch.code
                data.versionNo = this.addFormSearch.versionNo
                data.releaseTime = filters.normalTime(this.addFormSearch.releaseTime)
                data.releaseContent = this.HTMLDecode(this.addFormSearch.releaseContent)
                data.summary = this.addFormSearch.summary.indexOf('(')?(this.addFormSearch.summary).split('(')[0]:this.addFormSearch.summary
                data.currentVersion=this.addFormSearch.currentVersion
                data.id            =this.addFormSearch.id
            if (!this.addFormSearch.releaseContent) return this.$message.error('请输入发版内容')
            this.request('masterData_versionLog_update', data, true).then(res => {
                if (res.code == 1) {
                    this.editor.txt.clear();
                    this.changeCancel()
                    this.getData()
                    this.clear()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        addLog() {
            let data = {}
            data.code = this.addFormSearch.code
            data.versionNo = this.addFormSearch.versionNo
            data.releaseTime = filters.normalTime(this.addFormSearch.releaseTime)
            data.releaseContent = this.HTMLDecode(this.addFormSearch.releaseContent)
            data.summary = this.addFormSearch.summary
            if (!this.addFormSearch.releaseContent) return this.$message.error('请输入发版内容')
            this.request('masterData_versionLog_add', data, true).then(res => {
                if (res.code == 1) {
                    this.editor.txt.clear();
                    this.changeCancel()
                    this.getData()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addLog()
                } else {
                    return false;
                }
            });
        },
        submitForms(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.edit()
                } else {
                    return false;
                }
            });
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
        onReset() {
            this.formSearch = {}
            this.onSearch()
        },
        onAdd() {
            this.title='新增'
            this.changeVisible = true
        },
        getData() {
            let data = {}
            data.versionNo = this.formSearch.version
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('masterData_versionLog_page', data, true).then(res => {
                if (res.code == 1) {
                    this.title='新增'
                    this.total = res.data.total;
                    let number = (this.currentPage - 1) * this.pagesize
                    res.data.records.forEach(item => {
                        number++
                        item.order = number
                    });
                    this.tableData = res.data.records;
                }
            })
        },
        onSearch() {
            this.currentPage = 1
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

 <template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                          <el-form-item label="岗位编码："   size="small">
                              <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in selectorOptions" :key="item.code" :label="item.code" :value="item.code"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="岗位名称："   size="small">
                              <el-select v-model="formSearch.name" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in selectorOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="状态："   size="small">
                              <el-select v-model="formSearch.enable" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in statusQptions" :key="item.name" :label="item.name" :value="item.value"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button  size="small" type="primary" @click="onSearch"  v-if="judgeMenu.indexOf('查询') !== -1">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                                <el-button size="small" type="primary" @click="onAdd"  v-if="judgeMenu.indexOf('新增') !== -1">新增</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button size="small" type="primary" @click="clickTable"  v-if="judgeMenu.indexOf('编辑') !== -1">编辑</el-button>
                          </el-form-item>
                </el-form>
          </header>
          <section class="middle" :style="{minHeight:showBink?'750px':'530px'}">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
           <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" max-height="250" @selection-change="handleSelectionChange">
             <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column type="index"width="55"label="序号"align="center"></el-table-column>
                <el-table-column prop="positionCode"label="岗位编码"min-width="120"align="center">
                </el-table-column>
                <el-table-column
                  prop="positionName"
                  label="岗位名称"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="enable"
                  label="状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.enable == 1 ? '启用' : '停用' }}</template>
                </el-table-column>
         </el-table>

         <section class="footer" style="margin-bottom:0px">
           <div style="width:100%;font-size:20px;">操作日志</div>
        </section>
        <!-- <section class="middle"> -->
                <el-table
                 :data="logList"
                 style="width: 100%"
                 border
                 tooltip-effect="dark"
                 max-height="250"
                 >
                <el-table-column
                  prop="operator"
                  label="操作员"
                  min-width="120"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="operateTime"
                  label="操作时间"
                  align="center"
                  min-width="120">
                    <template slot-scope="scope">{{scope.row.operateTime}}</template>
                </el-table-column>
                <el-table-column
                  prop="logContent"
                  label="操作记录"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
          </el-table-column>
         </el-table>  
         <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div> 
         <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>   
       <!-- </section> -->
        </section>
        

         <!-- 新增弹框 -->
         <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增"  :width="70"
                class-name="customize-modal-center">
             <Row class="margin-bottom-10 background-color-white exhibition">
                 <el-form :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm " :label-position="left">
                     <Col span="8">
                         <el-form-item label="岗位编码："prop="code" label-width="120px" size="small">
                             <el-input v-model="ruleForm.code" :disabled="true" style="width:150px" placeholder="自动生成"></el-input>
                         </el-form-item>
                     </Col>
                     <Col span="8">
                         <el-form-item label="岗位名称："prop="name" label-width="120px" size="small">
                             <el-input v-model="ruleForm.name" style="width:150px"></el-input>
                         </el-form-item>
                     </Col>
                     <Col span="8">
                         <el-form-item label="启用状态：" prop="enable" label-width="120px" size="small">
                             <el-select v-model="ruleForm.enable" filterable placeholder="请选择" style="width:150px">
                                 <el-option label="启用" value=1></el-option>
                                 <el-option label="停用" value=0></el-option>
                             </el-select>
                         </el-form-item>
                     </Col>
                     <Col span="24">
                         <el-form-item style="text-align:center">
                             <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                             <Button type="default" @click="addCancel">取消</Button>
                         </el-form-item>
                     </Col>

                 </el-form>

             </Row>
             <div slot="footer"></div>
         </Modal>
       
          

        <!-- 编辑弹框 -->
          <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="修改"  :width="70" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form  ref="formChange" :model="formChange" class="demo-ruleForm " :label-position="left">
                <Col span="8">
                  <el-form-item label="岗位编码："prop="positionCode" label-width="120px" size="small">
                    <el-input v-model="formChange.code" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="岗位名称："prop="positionName" label-width="120px" size="small">
                    <el-input v-model="formChange.name" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="状态："prop="status" label-width="120px" size="small">
                    <el-select v-model="formChange.enable" placeholder="请选择" style="width:150px">
                            <el-option v-for="item in statusQptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col span="24">
                  <el-form-item style="text-align:center">
                      <Button type="primary" @click="changeSave">确认</Button>
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
import filters from './position_list'
  import {debounce} from 'mixins/debounce'
  import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
      return {
        newCodePrefix: "spos", //岗位编码前缀
        newCodeLength: 5, //岗位流水号最大长度
        logList:[],//日志
        billNo:'',
        dialogVisible:false,//新增
        changeVisible:false,//编辑
        statusQptions:[
          {value:1,name:'启用'},
          {value:0,name:'禁用'}
        ],
        formSearch: {
             code:'',
             name:'',
             enable:'',
        },
        formChange:{
            code:'',
            name: '',
            enable:'',
        },
        ruleForm:{
            code:'',
            name: '',
            enable:'',
        },
        rules:{
          //   code: [
          //   { required: true, message: '请输入岗位编码', trigger: 'blur' },
          //   { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          // ],
          name: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          enable: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
        },
        total:0,
        pagesize:10,
        currentPage:1,
        tableData:[],
        rowLenght:0,//选择几条数据
        rowObj:{},//选择的数据对象
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted() {
            this.getData()
            this.getPositionSelector()
            this.getButtonJurisdiction()//按钮权限
        },
    methods: {
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
      handleSelectionChange(row){
        console.log(row)
        this.rowLenght = row.length
        this.rowObj = row[0]
        console.log(this.rowObj)
      },
      //获取下拉列表   /basicsupplierposition/basic-supplier-position/selector
      getPositionSelector(){
         let data = {}
        this.request('basic_supplier_position_selector', data, true).then(res => {
          if (res.code==1) {
            this.selectorOptions = res.data
            console.log(this.companyCodeOptions,'////')
            }
          })
      },
       onReset(){
             this.formSearch = {}
         },
      getData(){
        this.logList=[]
        let data = {}
        data.positionCode = this.formSearch.code
        data.positionName = this.formSearch.name
        data.enable = this.formSearch.enable
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('basic_supplier_position_page_query', data, true).then(res => {
          if (res.code==1) {
            this.total = res.data.count;
            this.tableData = res.data.records;
            }
          })
      },
       getLoglist(billNo){
                     this.billNo=billNo
                     this.currentPage=1
                    let data={}
                        data.billNo     ="master_data_supplier_position"+ this.billNo
                        data.pageSize   = 3 
                        data.currentPage=this.currentPage
                     this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                            if (res.code == 1) {
                                   if (res.data.length < data.pageSize) {
                                        this.dataFlag = false
                                      } else {
                                        this.dataFlag = true
                                      }
                                  if (this.currentPage== 1) {
                                       this.logList=res.data 
                                  } else {
                                    this.logList=this.logList.concat(res.data) 
                                  }   
                             }
                       }) 
        },
        getMore(){
                  this.currentPage++
                  let data={}
                      data.billNo     ="master_data_supplier_position"+ this.billNo
                      data.pageSize   = 3
                      data.currentPage=this.currentPage
                      this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                              if (res.code == 1) {
                                    if (res.data.length < data.pageSize) {
                                          this.dataFlag = false
                                        } else {
                                          this.dataFlag = true
                                        }
                                    if (this.currentPage== 1) {
                                        this.logList=res.data 
                                    } else {
                                      this.logList=this.logList.concat(res.data) 
                                    }   
                              }
                        }) 
          },
          showLog(row){
             this. getLoglist(row.id)  
          },
      onSearch(){
        this.setBuryPoint('查询')
         this.currentPage = 1
         this.getData()
       
      },
        addSave(){
            this.$refs['ruleForm'].validate((valid) => {
                console.log(valid)
                if (valid) { //新增保存
                    //自动获取编码
                    let autoCodeParam = {prefix:this.newCodePrefix, numLength:this.newCodeLength}
                    this.request('auto_create_biz_code', autoCodeParam, true).then(res => {
                        let data = {}
                        data.positionName = this.ruleForm.name
                        data.enable = this.ruleForm.enable
                        data.positionCode = res.data
                        this.request('basic_supplier_position_add', data, true).then(res => {
                            if (res.code == 1) {
                                this.$message.success('新增成功')
                                this.getData()
                                this.getPositionSelector()
                                this.dialogVisible = false
                                this.ruleForm = {}
                                this.$refs['ruleForm'].resetFields();
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel(){
            this.dialogVisible = false
            this.ruleForm = {}
            this.$refs['ruleForm'].resetFields();
        },
        //编辑
        clickTable(row){
          this.setBuryPoint('编辑')
          if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            this.changeVisible = true
            this.formChange.code = this.rowObj.positionCode //岗位编码
            this.formChange.name = this.rowObj.positionName //岗位名称
            this.formChange.enable = this.rowObj.enable //状态
            this.rowId = this.rowObj.id
          }
        },
        //编辑保存
        changeSave(){
          let data = {}
          data.id = this.rowId
          data.positionCode = this.formChange.code
          data.positionName = this.formChange.name
          data.enable = this.formChange.enable
            this.request('basic_supplier_position_update', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('修改岗位成功')
                this.getData()
                this.changeVisible=false
                
              }else{
                this.$message.error(res.msg)
              }
            })
        },
        //编辑取消
        changeCancel(){
            this.changeVisible = false
        },
          handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
                this.pagesize = val
               this.getData()
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.currentPage = val
              this.getData()
          },
        onAdd(){
          this.setBuryPoint('新增')
            this.dialogVisible=true
        }
    }
  }
</script>
<style scoped="scoped" lang="less">
    .headerstyle,.main,.middle,.footer{
      width:99%;margin:0 auto;background:#fff;
      padding: 20px 20px 10px 20px;
      margin-bottom:10px;
    }
    .getmore{
          padding-top: 6px;
          width:100%;
          height:40px;
          line-height:40px;
          text-align: center;
          font-size:12px;
          cursor:pointer;
    }
    .pointer{
        cursor:pointer;
    }
    .pl20{
      padding-left: 20px
    }
</style>
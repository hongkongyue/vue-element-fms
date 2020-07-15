 <template>
     <div>
          <header class="headerstyle" >
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                  <div>
                     <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="onAdd">同步</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="clickTable">编辑</el-button>
                          </el-form-item>
                  </div>
                          <!-- <el-form-item label="岗位编码："   size="small">
                              <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.code" :label="item.code" :value="item.code"></el-option>
                              </el-select>
                          </el-form-item> -->
                          <el-form-item label="岗位名称："   size="small">
                              <el-select v-model="formSearch.basicStationName" filterable placeholder="请选择" style="width:220px">
                                  <el-option v-for="item in companyCodeOptions" :key="item.basicStationName" :label="item.basicStationName" :value="item.basicStationName"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="所属公司："   size="small">
                              <el-select v-model="formSearch.person" @change="changeCode(formSearch.person)" filterable placeholder="请选择" style="width:220px">
                                  <el-option v-for="item in companyNameOptions" :key="item" :label="item.name" :value="item.name"></el-option>
                              </el-select>
                          </el-form-item>
                         
                </el-form>
          </header>
          <section class="middle" :style="{minHeight:showBink?'680px':'480px'}" style="padding-top:10px">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
           <el-table ref="multipleTable" :data="tableData" style="width: 100%" @row-click="showLog" border tooltip-effect="dark" :maxHeight="tableHieght" @selection-change="handleSelectionChange">
             <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="basicStationCode" label="岗位编码" min-width="120" align="center">
                </el-table-column>
                <el-table-column
                  prop="basicStationName"
                  label="岗位名称"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="basicStationCompanyName"
                  label="所属公司"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
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
                <section class="footer" style="margin-bottom:0px;margin-top:0px">
                  <div style="width:100%;font-size:20px;">操作日志</div>
                </section>
                <section class="log">
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
              </section>
        </section>
       
       
          

        <!-- 编辑弹框 -->
          <Modal v-model="changeVisible" @on-cancel="changeCancel" :styles="mystyle" title="修改"  :width="70" 
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
              <el-form  ref="formChange" :model="formChange" class="demo-ruleForm " :label-position="left">
                <Col span="8">
                  <el-form-item label="岗位编码："prop="code" label-width="120px" size="small">
                    <el-input v-model="formChange.code" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                  <el-form-item label="岗位名称："prop="name" label-width="120px" size="small"> 
                    <el-input v-model="formChange.name" :disabled="true" style="width:150px"></el-input>
                  </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="所属公司："   size="small">
                              <el-select v-model="formChange.officialLeader" @change="changeCodeA(formChange.officialLeader)" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in companyNameOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                              </el-select>
                          </el-form-item>
                </Col>
                <Col span="8">
                    <el-form-item label="状态："prop="status" label-width="120px" size="small">
                    <el-select v-model="formChange.status" placeholder="请选择" style="width:150px">
                            <el-option v-for="item in statusQptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
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
import filters from '../../../filter/'
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
  export default {
    mixins:[debounce,burypoint],
    data() {
      return {
        logList:[],//日志
        billNo:'',
        AAAA:'',
        BBBB:'',
        companyNameOptions:[],
        companyCodeOptions:[],
        dialogVisible:false,//新增
        changeVisible:false,//编辑
        statusQptions:[
          {value:1,name:'是'},
          {value:0,name:'否'}
        ],
        formSearch: {
             code:'',
             name:'',
             person:'',
        },
        formChange:{
            code:'',
            name: '',
            shortName:'',
            abbrName:'',
            address:'',
            officialLeader:'',
            orgLegal:'',
            enable:'',
            status:'',
        },
        ruleForm:{
            code:'',
            name: '',
            shortName:'',
            abbrName:'',
            address:'',
            officialLeader:'',
            orgLegal:'',
            enable:'',
            status:'',
        },
        rules:{
            code: [
            { required: true, message: '请输入公司编码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '请输入公司简称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          abbrName: [
            { required: true, message: '请输入公司缩写', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          officialLeader:[
              { required: true, message: '请选择', trigger: 'change' },
          ],
          orgLegal: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
          enable: [
            {  required: true, message: '请选择', trigger: 'change' }
          ],
          status: [
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
            this.getCompanyName()
            this.getmasterData()
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
      changeCode(code){
        console.log(code)
        let AAAA = ''
        this.companyNameOptions.map(function (item) {
              if(code == item.name){
                AAAA = item.id
        }else{
          console.log('111')
        }
      })
      this.AAAA = AAAA
      console.log(this.AAAA,this.BBBB,'00900')
      },

      changeCodeA(code){
        console.log(code)
        let BBBB = ''
        this.companyNameOptions.map(function (item) {
              if(code == item.name){
                BBBB = item.id
        }else{
          console.log('111')
        }
      })
      this.BBBB = BBBB
      },
      //获取下拉列表   selectorCompany   masterData_staff_selector
      getCompanyName(){
         let data = {}
        this.request('basic_station_commonQuery', data, true).then(res => {
          if (res.code==1) {
            this.companyCodeOptions = res.data
            console.log(this.companyCodeOptions,'////')
            // this.tableData = res.data.records;
            }
          })
      },
      getmasterData(){
         let data = {}
        this.request('selectorCompany', data, true).then(res => {
          if (res.code==1) {
            this.companyNameOptions = res.data
            }
          })
          console.log(this.companyNameOptions,'popopopo')
      },
       onReset(){
             this.formSearch = {}
             this.AAAA = ''
         },
      getData(){
        this.logList=[]
        let data = {}
        data.basicStationName = this.formSearch.basicStationName
        data.basicStationCompanyId = this.AAAA
        data.pageSize = this.pagesize
        data.currentPage = this.currentPage
        this.request('getCommonQuery', data, true).then(res => {
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
                        data.billNo     ="master_data_station_"+ this.billNo
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
                      data.billNo     ="master_data_station_"+ this.billNo
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
        //编辑
        clickTable(row){
            this.setBuryPoint('编辑')
          if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            this.changeVisible = true
            this.formChange.code = this.rowObj.basicStationCode //岗位编码
            this.formChange.name = this.rowObj.basicStationName //岗位名称
            this.formChange.officialLeader = this.rowObj.basicStationCompanyName //公司
            this.formChange.status = this.rowObj.enable //状态
            this.rowId = this.rowObj.id
            this.BBBB = this.rowObj.basicStationCompanyId
          }
        },
        //编辑保存
        changeSave(){
             this.setBuryPoint('编辑确认')
            console.log(this.formChange.officialLeader,';p;;;ppp;;',this.BBBB)
            if(this.formChange.officialLeader == undefined){
               this.$message.warning('所属公司不能为空！')
            }else{

                 let data = {}
          data.id = this.rowId
          data.basicStationCode = this.formChange.code
          data.basicStationName = this.formChange.name
          data.basicStationCompanyId = this.BBBB
          data.enable = this.formChange.status
            this.request('updateCommonQuery', data, true).then(res => {
              if (res.code==1) {
                this.$message.success('修改岗位成功')
                this.BBBB = ''
                this.getData()
                this.changeVisible=false
                
              }else{
                this.$message.error(res.msg)
              }
            })

          }
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

    }
  }
</script>
<style scoped="scoped" lang="less">
    .headerstyle,.main,.middle,.footer{
      width:99%;margin:0 auto;background:#fff;
      padding: 20px 20px 10px 20px;
      margin-bottom:10px;
    }
    .middle{
     width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 0px 10px 10px 10px;
    margin-top: 0px;
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
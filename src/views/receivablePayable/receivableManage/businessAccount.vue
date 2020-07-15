<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline " >
                          <el-form-item><span style="color:red">*</span></el-form-item>
                          <el-form-item label="公司" size="small">
                                <el-select v-model="formSearch.basicCompanyId" placeholder="请选择公司" style="width:220px" filterable>
                                    <el-option v-for="v in companyList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                               </el-select>
                          </el-form-item>
                           <el-form-item><span style="color:red">*</span></el-form-item> 
                          <el-form-item label="账务类型" size="small">
                              <el-select v-model="formSearch.type" placeholder="请选择" style="width:100px" filterable>
                                  <el-option label="应收" value="0"></el-option>
                                  <el-option label="应付" value="1"></el-option>
                                  <el-option label="库存" value="2"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                               <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                </el-form>
          </header>
          <el-row style="background:#fff;width:99%;margin:0 auto; padding-top:10px" :style="{minHeight:showBink?'720px':'500px'}">
            <el-col :span="4" >
                <div class="grid-content bg-purple"  style="background:#fff!important">
                      <el-col style="text-align:center;height:40px;line-height:40px">
                           <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="mini" type="primary" @click="onAdd">新增</el-button>
                           <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="mini" type="primary" @click="delChecked">删除</el-button>
                      </el-col>
                      <el-col  style="text-align:center;height:40px;line-height:40px;font-size:20px">
                            期间方案
                      </el-col>
                </div>
                <div v-if="Alist.length>0" class="grid-content bg-purple" style="background:#fff;margin-left:3%;width:94%;padding:2% 2%;padding-left:1%;height:310px; overflow-y: scroll;">
                      <el-col style="padding-left:20%;padding-top:15%">
                          <Timeline>
                            <TimelineItem   v-for="v in Alist" :key="v">
                                <Icon type="ios-trophy" slot="dot" v-if="v.sign"></Icon>
                                <p class="time pointer" @click="selected(v)"  :class="{active: active == v}">{{v.name}}</p>
                            </TimelineItem>
                          </Timeline>
                      </el-col>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                       <section class="middle">
                               <!-- 编辑赋值 -->
                             <el-form :inline="true" :model="editformdata" class="demo-form-inline " v-if="add==false" >
                                 <el-row>
                                      <el-form-item label="公司" size="small" label-width="95px">
                                          <el-select :disabled="!add" v-model="editformdata.company" placeholder="公司" style="width:140px" filterable	>
                                            <el-option label="区域一" value="shanghai"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="账务类型" size="small" label-width="95px">
                                          <el-select :disabled="!add" v-model="editformdata.type" placeholder="账务类型" style="width:140px" filterable>
                                              <el-option label="应收" value="0"></el-option>
                                              <el-option label="应付" value="1"></el-option>
                                              <el-option label="库存" value="2"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="账务年度" size="small" label-width="95px" >
                                         <el-input :disabled="!add" style="width:140px" v-model="editformdata.selectedYears" placeholder="账务年度"></el-input>
                                      </el-form-item>
                                    </el-row>
                                    <el-row>
                                      <el-form-item label="起始日期" size="small" label-width="95px"> 
                                           <el-date-picker :disabled="!add" style="width:140px" @change="compareTime('',1)"
                                                v-model="editformdata.startTime"
                                                type="date"
                                                placeholder="选择日期">
                                          </el-date-picker>
                                      </el-form-item>
                                      <el-form-item label="终止日期" size="small" label-width="95px">
                                          <el-date-picker :disabled="!add" style="width:140px" @change="compareTime('', 1)"
                                                v-model="editformdata.endTime"
                                                 type="date"
                                                placeholder="选择日期">
                                          </el-date-picker>
                                      </el-form-item>
                                      <el-form-item label="期间个数" size="small" label-width="95px">
                                          <el-select :disabled="!add" v-model="editformdata.number" placeholder="请选择" style="width:140px" @change="choiceMonth(formData.number)">
                                            <el-option v-for="v in monthList" :key="v" :label="v" :value="v"></el-option>
                                          </el-select>
                                      </el-form-item>
                                  </el-row>
                                  <el-row v-if="add">
                                            <el-form-item  size="small" label-width="95px" style="padding-left:30px">
                                               <el-button  size="small"  type="default" @click="cancelSave">取消</el-button> 
                                               <el-button  size="small" type="primary">保存账期</el-button>
                                            </el-form-item>
                                  </el-row>
                             </el-form>

                             <!-- 新增部分表单 -->
                            <el-form :inline="true" :model="formData" class="demo-form-inline " v-if="add===true">
                                 <el-row>
                                      <el-form-item label="公司" size="small" label-width="95px">
                                          <!-- <el-select :disabled="!add" v-model="formData.company" placeholder="请选择" style="width:140px" filterable	>
                                            <el-option label="区域一" value="shanghai"></el-option>
                                          </el-select> -->
                                           <el-select v-model="formData.basicCompanyId" placeholder="请选择公司" style="width:100px" filterable>
                                                  <el-option v-for="v in companyList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="账务类型" size="small" label-width="95px">
                                          <el-select :disabled="!add" v-model="formData.type" placeholder="请选择" style="width:140px" filterable>
                                              <el-option label="应收" value="0"></el-option>
                                              <el-option label="应付" value="1"></el-option>
                                              <el-option label="库存" value="2"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="账务年度" size="small" label-width="95px" >
                                          <el-date-picker :disabled="!add"  style="width:140px"
                                                v-model="selectedYears"
                                                align="right"
                                                type="year"
                                                placeholder="选择年">
                                           </el-date-picker>
                                      </el-form-item>
                                    </el-row>
                                    <el-row>
                                      <el-form-item label="起始日期" size="small" label-width="95px"> 
                                           <el-date-picker :disabled="!add" style="width:140px" @change="compareTime('',1)"
                                                v-model="startTime"
                                                type="date"
                                                placeholder="选择日期">
                                          </el-date-picker>
                                      </el-form-item>
                                      <el-form-item label="终止日期" size="small" label-width="95px">
                                          <el-date-picker :disabled="!add" style="width:140px" @change="compareTime('', 1)"
                                                v-model="endTime"
                                                 type="date"
                                                placeholder="选择日期">
                                          </el-date-picker>
                                      </el-form-item>
                                      <el-form-item label="期间个数" size="small" label-width="95px">
                                          <el-select :disabled="!add" v-model="formData.number" placeholder="请选择" style="width:140px" @change="choiceMonth(formData.number)">
                                            <el-option v-for="v in monthList" :key="v" :label="v" :value="v"></el-option>
                                          </el-select>
                                          <span style="color:red">*期间个数请选择12</span>
                                      </el-form-item>
                                  </el-row>
                                  <el-row v-if="add">
                                            <el-form-item  size="small" label-width="95px" style="padding-left:30px">
                                               <el-button  size="small"  type="default" @click="cancelSave">取消</el-button> 
                                               <el-button  size="small" type="primary"  @click="addConfirmSave">保存账期</el-button>
                                            </el-form-item>
                                  </el-row>
                             </el-form>
                             <span v-if="add==false">
                             <el-table 
                                    ref="multipleTabless"
                                    :data="list"
                                    style="width: 100%"
                                    class="pointer"
                                    border
                                    tooltip-effect="dark"
                                    max-height="250"
                                    header-row-style="height:25px"
                                    row-style="height:25px"
                                     @row-click="showLog"
                                     highlight-current-row 
                                      >
                                    <el-table-column
                                      prop="period"
                                      label="期间"
                                      min-width="120"
                                      align="center"
                                    >
                                    <template slot-scope="scope">{{scope.row.period}}</template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="startDate"
                                      label="开始日期"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                       <template slot-scope="scope">{{scope.row.startDate|Y_M_D}}</template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="endDate"
                                      label="结束日期"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                       <template slot-scope="scope">{{scope.row.endDate|Y_M_D}}</template>
                                    </el-table-column>
                                    <el-table-column 
                                      prop="enable"
                                      label="开启状态"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                     <template slot-scope="scope">
                                         <el-switch  :disabled="scope.row.startDate>new Date().getTime()"   v-model="scope.row.tag" @change="switchStatus(scope.row.tag,scope.row.id,scope.row.startDate)"
                                              active-color="#13ce66"
                                              inactive-color="#ccc"
                                          >
                                        </el-switch>
                                     </template>
                                    </el-table-column>
                          </el-table>
                          </span>
                          <!-- 新增表格 -->
                          <el-table  v-if="add===true"
                                    ref="multipleTable"
                                    :data="addList"
                                    style="width: 100%"
                                    class="pointer  elTable"
                                    border
                                    tooltip-effect="dark"
                                    max-height="250"
                                    header-row-style="height:25px"
                                    row-style="height:25px"
                                      >
                                    <el-table-column
                                      prop="number"
                                      label="期间"
                                      min-width="120"
                                      align="center"
                                     >
                                     <template slot-scope="scope">{{scope.row.number}}</template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="startTime"
                                      label="开始日期"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                          <template slot-scope="scope">
                                            <el-date-picker :disabled="scope.row.startTime==startTime"  size="small" style="width:130px"
                                                  v-model="scope.row.startTime"
                                                  @change="compareTime(scope.row,2)"
                                                  type="date"
                                                  placeholder="选择日期">
                                            </el-date-picker>
                                           </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="endTime"
                                      label="结束日期"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                         <template slot-scope="scope">
                                            <el-date-picker disabled size="small" style="width:130px" @change="compareTime(scope.row,2)"
                                                  v-model="scope.row.endTime"
                                                  type="date"
                                                  placeholder="选择日期">
                                            </el-date-picker>
                                           </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="status"
                                      label="状态"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                     <template slot-scope="scope">
                                         <el-switch v-if="scope.row.status==1"
                                          v-model="value"
                                          active-color="#13ce66"
                                          active-value="开启"
                                          inactive-color="#ff4949">
                                        </el-switch>
                                        <el-switch v-if="scope.row.status==2"
                                          v-model="value"
                                          active-color="#13ce66"
                                          active-value="关闭"
                                          inactive-color="#ff4949">
                                        </el-switch>
                                     </template>
                                    </el-table-column>
                          </el-table>
                          </section>
                          <section class="footer" style="margin-bottom:0px" v-if="!add">
                              <div style="width:100%;font-size:20px;">操作日志</div>
                          </section>
                           <section class="middle">
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
                </div>
            </el-col>
          </el-row>
          <!-- 新增 -->
          <Modal v-model="dialogVisible" :styles="mystyle" :rules="rules" title="新建期间方案"  @on-cancel='cancelAdd' :width="470" @on-ok="editSubmit"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">   
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules"  @submit.native.prevent>
                         <Col>
                                <el-form-item label="账期名称"   size="small" label-width="95px"  prop="platform">
                                      <el-input v-model="addformdata.billName" maxlength="30" style="width:190px" ></el-input>
                                </el-form-item>
                          </Col>
                          <Col>
                               <el-form-item label=""   size="small" label-width="125px">
                                      <span style="color:red">请先创建账期,对应公司等其余信息在明细表中添加</span>
                                </el-form-item>
                          </Col>
                          <el-form-item style="padding-left:150px">
                                    <Button type="primary" @click="confirm">确认</Button>
                                    <Button type="default" @click="cancelAdd">取消</Button>
                          </el-form-item>
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
        add:false,
        dialogVisible:false,
        addformdata     :{},
        editformdata    :{},
        canSelectedMonth:'',
        page            : 1,
        pageSize        :10,
        delArray        :[],  //删除用数组
        addList         :[],  //增加列表
        selectedYears   :'',
        startTime       :'',
        endTime         :'',
        mystyle:{
                        top:'150px',
                },
        formData: { 
              type:'',
              name:'',
              basicCompanyId:'',
        },
        formSearch: { 
                    type:'',
                    name:'',
                    basicCompanyId:'',
        },  //搜索的条件
        monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
        Alist:[],
        logList: [], //日志列表
        list   : [],
        active : '',
    
        companyList:[],//公司新增
        billList   :[],//账期名称列表
          // 日志相关
        dataFlag:true,
        logList:[], //日志列表
        billNo:'',
        currentPage:1,
        // 日志相关
        judgeMenu:[],
        buttonList:[],//按钮权限
      }
    },
    mounted(){
          // this.getData()
          this.getCompany()
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
          switchStatus(p,n,start){
             console.log(p,n)
             if(start>new Date().getTime()){
                    this.$message.error('不能修改状态')
             }else{
                let  data={}
                    data.id=n
                    data.enable=p?1:0
                    this.request('sys_accountPeriod_update', data, false).then((res) => {
                            if(res.code == 1) {
                                  this.$message.success('修改状态成功')
                            }else{
                                  this.$message.error(res.msg)
                                  this.getData()
                            }
                        }) 
              }
               
          },
          selected(name) {
                    this.formSearch.name=name.name
                    this.active= name;
                    this.add=false;
                    console.log(this.active)
                     this.getData()
           },
          choiceMonth(v){
                      this.addList=[]
                      console.log(v)
                      if(this.canSelectedMonth){
                         if(this.canSelectedMonth>v||this.canSelectedMonth==v){
                              for(let i=0;i<v;i++){
                                this.addList.push({
                                        number   :i+1,
                                        startTime:'',
                                        endTime  :'',
                                        status   :'',
                                    })  
                              }
                              this.addList[0].startTime=this.startTime
                              this.addList[Number(v)-1].endTime=this.endTime
                         }else{
                                this.formData.number='';
                                this.$message({
                                            message: '间隔天数大于等于期间个数，请重新选择期间个数',
                                            type: 'error'
                                })
                         }
                      }    
                      console.log(this.addList,'新增的数据')     
                      console.log(this.add,'显示条件')
          },
          //判断时间有误交叉
          judgeTimeRepeat(scope){
               if(this.addList.length>1){
                          for(let i=0,len=this.addList.length;i<len;i++){
                              if(this.addList[i]==scope){
                                  return this.addList[i-1]
                              }
                          }
                      }
                
          },
          compareTime(scope,type){
              if(type==1){
                     this.formData.number=''
                     this.addList=[]
                   if(new Date(this.startTime)>new Date(this.endTime)||new Date(this.startTime).getTime()==new Date(this.endTime).getTime()){
                    this.$message({
                                            message: '起始时间须小于终止时间，请重新选择',
                                            type: 'error'
                              });
                          this.endTime  =''
                          this.startTime=''
                          return false
                          
                 }else{
                      if(new Date(this.startTime).getTime()==NaN||new Date(this.endTime).getTime()==NaN) return 
                            this.canSelectedMonth=filters.getCountDayNumber(new Date(this.endTime).getTime()-new Date(this.startTime).getTime())
                            console.log('可选择的期间个数为:'+this.canSelectedMonth)
                 }
                    //  return true
              }else{
                     //列表选择判断
                  if(new Date(scope.startTime)>new Date(this.startTime)&&new Date(scope.startTime)<new Date(this.endTime)){ 
                         // 选择的当前行时间在起始时间和终止时间正常的区间之内
                          if(new Date(this.judgeTimeRepeat(scope).startTime).getTime()>new Date(scope.startTime).getTime()||new Date(this.judgeTimeRepeat(scope).startTime).getTime()==new Date(scope.startTime).getTime()){
                                this.$message({
                                                  message:'不能小于已选择过的开始时间',
                                                  type: 'error'
                                    });
                                  scope.startTime=''
                          }else{
                                 this.judgeTimeRepeat(scope).endTime=new Date(new Date(scope.startTime).getTime()-24*60*60*1000)
                          }
                         
                    }else{
                         // 选择的当前行时间不在起始时间和终止时间正常的区间之内
                                this.$message({
                                                message: '开始时间不能小于起始时间，不能大于等于终止日期',
                                                type: 'error'
                                          });
                                scope.startTime=''
                              return 
                    }
                  return 
              }
               
          },
          //公司下拉
           getCompany(){
                  //masterData_company_selector
                   let data={}
                    this.request('masterData_company_selector', data, false).then((res) => {
                            if(res.code == 1) {
                                         this.companyList=res.data
                            }
                        }) 
          },
          //业务账期列表
          getBillList(){
                        let data={}
                            if(!this.formSearch.basicCompanyId)return this.$message.error('公司不能为空!')
                            if(!this.formSearch.type) return this.$message.error('账务类型不能为空!')
                            data.basicCompanyId= this.formSearch.basicCompanyId
                            data.type          = Number(this.formSearch.type)
                            data.periodYear       =new Date().getFullYear()
                       this.request('sys_accountPeriod_names',data,false).then(res=>{
                                    if(res.code==1){
                                                  this.billList=res.data
                                                  this.Alist= this.billList
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
          onAdd(){
                    this.setBuryPoint('新增')
                    this.dialogtitle="新增"
                    this.dialogVisible=true    
          },
          onSearch(){
                     this.setBuryPoint('查询')
                     this.logList=[]
                     this.resetEdit()
                     this.getBillList()
                    //  console.log(filters.get_year_month_day(this.startTime),filters.get_year_month_day(this.endTime))
                    //  console.log(filters.get_unix_only(this.selectedYears))
          },
          onReset(){
                    this.logList=[]
                    this.formSearch={}
                    this.Alist=[]
                    this.active=''
                    console.log(this.active,'00000')
                    // this.page=1;
                    // this.getData()
                      this.list=[]
                      this.editformdata={}
                      // this.editformdata.company='res.data.basicCompanyName'
                      //                 this.editformdata.type=(res.data.type).toString()
                      //                 this.editformdata.endTime=new Date(new Date(res.data.periodEndDate).getTime())
                      //                 this.editformdata.startTime=new Date(new Date(res.data.periodStartDate).getTime())
                      //                 this.editformdata.selectedYears=res.data.periodYear
                      //                 this.editformdata.number=res.data.periodNum

          },
          onEdit(row){
                    this.dialogtitle="编辑"
                    this.dialogVisible=true
                    console.log(row,'999999')
          },
          resetEdit(){
                                      // this.editformdata.company=''
                                      // this.editformdata.type=''
                                      // this.editformdata.endTime=''
                                      // this.editformdata.startTime=''
                                      // this.editformdata.selectedYears=''
                                      // this.editformdata.number=''
                                      this.editformdata={}
                                      this.list=[]
          },
          getData(){
                  this.add=false
                  this.logList=[]
                  let data={}
                      // data.page=this.page
                      // data.pageSize=this.pageSize
                      data.basicCompanyId=this.formSearch.basicCompanyId
                      data.type          =Number(this.formSearch.type)
                      data.name          =this.formSearch.name
                      data.pageSize = 30
                      data.currentPage = 1
                      this.request('sys_accountPeriod_page', data, true).then((res) => {
                              if (res.code == 1) {
                                if(res.data.hasOwnProperty('records')){
                                       for(let i=0;i<res.data.records.length;i++){
                                        if(res.data.records[i].enable==1){
                                            res.data.records[i].tag = true
                                        }else{
                                            res.data.records[i].tag = false
                                        }
                                      }
                                      this.list=res.data.records
                                      this.editformdata.company=res.data.basicCompanyName
                                      this.editformdata.type=(res.data.type).toString()
                                      this.editformdata.endTime=new Date(new Date(res.data.periodEndDate).getTime())
                                      this.editformdata.startTime=new Date(new Date(res.data.periodStartDate).getTime())
                                      this.editformdata.selectedYears=res.data.periodYear
                                      this.editformdata.number=res.data.periodNum
                                }else{
                                      this.$message.error('您查询的账期为空')
                                }
                                  // this.
                                 

                              }else{
                                  this.list      = []
                              }
                          })
          },
             getLoglist(billNo){
                     this.billNo=billNo
                     this.currentPage=1
                      console.log(filters.getConstant('brand'),'000000000')
                    let data={}
                        data.billNo     =filters.getConstant('account')+ this.billNo
                        data.pageSize   =3
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
                      data.billNo     =filters.getConstant('account')+ this.billNo
                      data.pageSize   =3
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
          delChecked(){
                      this.setBuryPoint('删除') 
                      if(!this.formSearch.basicCompanyId)return this.$message.error('公司不能为空!')
                      if(!this.formSearch.type) return this.$message.error('账务类型不能为空!')
                      if(!this.formSearch.name) return this.$message.error('要删除的账期名称不能为空!')
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                       this.delBillList()
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });          
                  });
          },
          delBillList(){//sys_accountPeriod_delete
                           
                     let    data={}
                            data.basicCompanyId=this.formSearch.basicCompanyId
                            data.type          =Number(this.formSearch.type)
                            data.name          =this.formSearch.name
                      if(!data.basicCompanyId)return this.$message.error('公司不能为空!')
                      if(!this.formSearch.type) return this.$message.error('账务类型不能为空!')
                      if(!data.name) return this.$message.error('要删除的账期名称不能为空!')
                    this.request('sys_accountPeriod_delete', data, true).then((res) => {
                              if (res.code == 1) {
                                     this.$message({
                                                  message: '删除成功',
                                                  type: 'success'
                                    });
                                    this.onSearch()
                              }else{
                                     this.$message({
                                                  message: res.msg,
                                                  type: 'error'
                                    });
                              }
                        })    
          },
          cancel(){
                    this.editformdata={}
                    this.resetForm('ruleForm')
                    this.dialogVisible=false;
          },
          cancelAdd(){
                    this.addformdata={}
                    this.dialogVisible=false
          },
          confirm(){
                    this.setBuryPoint('新增确认')
                   if(!this.addformdata.billName) return this.$message.error('账期名单不能为空')
                    this.add=true
                    this.dialogVisible=false;
                    this.Alist.push(this.addformdata.billName)
                    this.addformdata.billName=''
                    console.log(this.add,'显示条件')

          },
          getName(id){
             for(let i=0;i<this.companyList.length;i++){
                 if(this.companyList[i].id==id){
                    return this.companyList[i].name
                 }
             }
        },
        getCode(id){
              for(let i=0;i<this.companyList.length;i++){
                 if(this.companyList[i].id==id){
                    return this.companyList[i].code
                 }
             }
        },
          addConfirmSave(){
                     let data={};
                         data.periodYear=filters.get_unix_only(this.selectedYears)
                         data.basicCompanyId=this.formData.basicCompanyId
                         data.basicCompanyName=this.getName(this.formData.basicCompanyId)
                         data.basicCompanyCode=this.getCode(this.formData.basicCompanyId)
                         data.name=this.addformdata.billName
                         data.periodStartDate=filters.get_year_month_day(this.startTime)
                         data.periodEndDate=filters.get_year_month_day(this.endTime)
                         data.type=this.formData.type
                         data.periodNum=this.formData.number
                         data.deleted=0;
                         data.periodInfoFoList=[]//时间的日期
                         for(let i=0;i<this.addList.length;i++){
                           if(this.addList[i].number<10){
                              data.periodInfoFoList.push({
                               period   :filters.get_unix_only(this.selectedYears)+'0'+this.addList[i].number,
                               startDate:filters.get_year_month_day(this.addList[i].startTime),
                               endDate  :filters.get_year_month_day(this.addList[i].endTime),
                            }) 
                           }else{
                              data.periodInfoFoList.push({
                                period   :filters.get_unix_only(this.selectedYears)+(this.addList[i].number).toString(),
                                startDate:filters.get_year_month_day(this.addList[i].startTime),
                                endDate  :filters.get_year_month_day(this.addList[i].endTime),
                            }) 
                           }
                            
                         }
                      if(!data.basicCompanyId)  return this.$message.error('公司不能为空！')
                      if(!data.type)            return this.$message.error('账务类型不能为空！')
                      if(!data.periodYear)      return this.$message.error('账务年度不能为空!')
                      if(!data.periodStartDate) return this.$message.error('起始日期不能为空!')
                      if(!data.periodEndDate)   return this.$message.error('终止日期不能为空!')
                      if(!data.periodNum)       return this.$message.error('期间个数不能为空!')
                      for(let i=0,len=data.periodInfoFoList.length;i<len;i++){
                           if(!data.periodInfoFoList[i].startDate) return this.$message.error('列表日期不能为空！')
                        }
                     this.request('sys_accountPeriod_add', data, true).then((res) => {
                              if (res.code == 1) {
                                        this.$message.success('新增成功') 
                                        this.formData={} 
                                        this.addList=[]
                                        this.add=false;
                                        this.addformdata={}
                                        this.selectedYears=''
                                        this.startTime=''
                                        this.endTime=''
                                        // this.onSearch()
                                  }else{
                                        this.$message.error(res.msg)   
                                  }
                        })      
          },
          cancelSave(){
                    this.addList=[]
                    this.formData={}
                    this.add=false
                    this.selectedYears=''
                    this.startTime=''
                    this.endTime=''
                    this.addformdata={}
          },
           showLog(row){
                     this.getLoglist(row.id)
          },

    }
  }
</script>
<style scoped="scoped"  lang="less">
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
    .active {
        color:#409EFF;
        font-size:12px;
    }
</style>
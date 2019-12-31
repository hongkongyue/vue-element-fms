<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                          <el-form-item><span style="color:red">*</span></el-form-item>
                          <el-form-item label="平台："   size="small">
                              <el-select v-model="formSearch.plathFormId" @change="changebasicPlatformId(formSearch.plathFormId)" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in platformOptions" :key="item.name" :label="item.name"  :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                           <el-form-item><span style="color:red">*</span></el-form-item>
                          <el-form-item label="公司："   size="small">
                              <el-select v-model="formSearch.companyId" filterable placeholder="请选择" style="width:150px"  @change="changeCode(formSearch.companyId)">
                                  <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                           <el-form-item><span style="color:red">*</span></el-form-item>
                          <el-form-item label="店铺："   size="small">
                              <el-select v-model="formSearch.merchantStoreId" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in shopList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item v-if="show == true&&timeList.length>0"><span style="color:red">*</span></el-form-item>
                          <el-form-item v-if="show == true&&timeList.length>0" label="期间："   size="small">
                              <el-select v-model="formSearch.period" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in timeList" :key="item" :label="item.name" :value="item.period"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item v-if="show == true&&timeList.length==0"><span style="color:red">*</span></el-form-item>
                          <el-form-item v-if="show == true&&timeList.length==0" label="期间："   size="small">
                              <el-select v-model="formSearch.periodss" filterable placeholder="请选择" style="width:150px">
                                  <el-option v-for="item in timeLists" :key="item" :label="item" :value="item"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item    size="small">
                              <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
                          </el-form-item>
                          <el-form-item    size="small">
                             <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
                          </el-form-item>
                          <el-form-item    size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1"  size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('导出') !== -1"  size="small" type="primary" @click="onImport">导出</el-button>
                          </el-form-item>
                </el-form>
          </header>
          <section class="middle">
          <!-- 筛选列选项 -->
          <el-popover style="margin-top:0px;float:left"  placement="right" title="列筛选" trigger="click">
            <el-checkbox-group  v-model="titleArray" ref="currentRow">
                        <el-checkbox  v-for="(item,index) in  col"   :value="item.label"  :label="item.label" :key="index" @change="handleCheckedCitiesChange(item)">{{item.label}}</el-checkbox>
            </el-checkbox-group>
              <el-button size="small" slot="reference"><i class="el-icon-arrow-down el-icon-menu"></i></el-button>
          </el-popover>  
        <!-- 表格信息 -->
        <el-table :data="tableData"  border row-key="id" 
                  align="left"
                  size="mini" 
                  max-height="250"
                  ref="multipleTable"
                  style="width: 100%"
                  class="pointer"
                  tooltip-effect="dark"
                  @row-dblclick="onEdit"
                  @row-click="showLog"
                  highlight-current-row
                 >
                 <el-table-column v-for="(item, index) in formThead" v-if="item.tag"  :prop="item.prop" :key="index" :label="item.label"  align="center" min-width="120"show-overflow-tooltip>
                </el-table-column>
        </el-table>
        </section>
     </div>
</template>


<script>
   import filters from '../../../filter/'
   import instance from '../../../filter/downLoad.js'
   console.log(instance)
  export default {
    data() {
      return {
        show    : false,
        zhan    : false,
        timeList: [],//期间
        timeLists:[],
        col: [ 
                   {
                       label: '摘要',
                        prop: 'desc'
                    },
                    {
                        label: '科目',
                        prop: 'subject'
                    },
                    {
                        label: '借方',
                        prop: 'debtor'
                    },
                    {
                        label: '贷方',
                        prop: 'lender'
                    },
                ], 
                tableData: [ 
                ],
                formThead: [],
                file:null,
                visible:false,
                brandList:[],
                shopList:[],
                companyCodeOptions:[],
                dialogVisible:false,//新增
                statusQptions:[
                  {value:1,name:'是'},
                  {value:0,name:'否'}
                ],
                formSearch: {
                            code  :'',
                            name  :'',
                            person:'',
                            period:'',
                            merchantStoreId:''
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
                titleArray:[],
                total:0,
                pagesize:10,
                currentPage:1,
                 // 日志相关
                dataFlag:true,
                logList:[], //日志列表
                billNo:'',
                currentPage:1,
                // 日志相关
                judgeMenu:[],
                buttonList:[],//按钮权限
                platformOptions:[]
      }
    },
    mounted() {
                this.getplatformOptions()
                this.headTable()
               
                this.getCompany()
                // this.getShop()
                this.getTitle()
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
       onImport(){
             let data                = {}
                  // data.pageSize       = this.pagesize
                  // data.currentPage    = this.currentPage
                  data.plathFormId    = this.formSearch.plathFormId
                  data.companyId      = this.formSearch.companyId
                  data.merchantStoreId= this.formSearch.merchantStoreId
                  data.period         = this.formSearch.period
                  instance.instance({
                      url   :'/eop-boot/acc/acc-amount/downloadCsvFile',
                      method:'post',
                      data:data,
                }).then(res=>{
                            console.log(res)
                            let filename = res.headers['content-disposition']?res.headers["content-disposition"].split(";")[1].split("=")[1]:false
                               if(!filename) return this.$message.error('导出失败!')
                                            const blob = new Blob([res.data]);
                                            const blobUrl = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.style.display = 'none';
                                            a.download = decodeURIComponent(escape(filename))
                                            a.href = blobUrl;
                                            a.click();
                                            a.remove();
                  })
       },
       onReset(){
                this.formSearch={}
                this.tableData=[]
       },
       changeCode(code){
          this.timeList=[]
          this.formSearch.period=''
          if(!code) return 
          let data = {}
          data.basicCompanyId = code
          data.type = 0
          this.request('accountPeriod_selector', data, true).then(res => {
              if (res.code==1) {
                    this.timeList = res.data
                }
              })
        },
        handleCheckedCitiesChange(){
                let str='';
                let store='';
                setTimeout(() => {
                        for( let i in this.$refs.currentRow.$children){
                            if(this.$refs.currentRow.$children[i].isChecked){
                                     str+=this.$refs.currentRow.$children[i].label
                                   setTimeout(() => {
                                           for(let j=0;j<this.formThead.length;j++){
                                            if(str.includes(this.formThead[j].label)){
                                               this.formThead[j].tag=true
                                            }else{
                                               this.formThead[j].tag=false
                                            }
                                        }
                                   }, 10);
                            }else{
                                store+=this.$refs.currentRow.$children[i].label;
                                 setTimeout(() => {
                                           for(let j=0;j<this.formThead.length;j++){
                                            if(store.includes(this.formThead[j].label)){
                                               this.formThead[j].tag=false
                                            }else{
                                               this.formThead[j].tag=true
                                            }
                                        }
                                   }, 10); 
                            }
                      } 
                }, 100);
        },
        //获取头部标题
        getTitle(){
                this.titleArray=[]
                for(let i=0;i<this.col.length;i++){
                      this.titleArray.push(this.col[i].label)
                }
         },
        getplatformOptions(){
              this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code==1) {
                      this.platformOptions = res.data;
                  }
                })
            },
        getCompany(){
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
              if (res.code==1) {
                      this.companyCodeOptions = res.data
                }
              })
         },
         changebasicPlatformId(id){
             this.formSearch.merchantStoreId = ''
          console.log(id,'3456789')
          let data = {}
          data.platformId = id
          this.request('getBindingByPlatformId', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.shopList=res.data
                            }
                        }) 
        },
        // getShop(){
        //           let data={}
        //               this.request('merchantstore_basic_commonQuery', data, true).then(res => {
        //                       if (res.code == 1) {
        //                             this.shopList=res.data
        //                       }
        //                   }) 
        //   },
        //表头处理
        headTable(){
                for(let i=0;i<this.col.length;i++){
                      this.formThead.push({
                          label:this.col[i].label,
                          prop:this.col[i].prop,
                          tag:true
                      });
                  
                }
            },
            getData(){
              let data                = {}
                  // data.pageSize       = this.pagesize
                  // data.currentPage    = this.currentPage
                  data.plathFormId    = this.formSearch.plathFormId
                  data.companyId      = this.formSearch.companyId
                  data.merchantStoreId= this.formSearch.merchantStoreId
                  data.period         = this.formSearch.period
              this.request('acc_acc_amount_query_01', data, true).then(res => {
                  if (res.code==1) {
                          this.tableData = res.data; 
                    }else{
                          this.tableData=[];
                          this.$message.error(res.msg)
                    }
                })
          },
          onSearch(){
              this.getData()
          },
          changeRadio(i){
               console.log(this.ruleForm.resource)
          },
          changeShow(){
                this.show = true
          },
          changeHidden(){
                this.show = false
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
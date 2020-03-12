<template>
    <div class="layout "  style="min-height:630px;padding-left:0px">
         <!-- <Content> -->
             <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange">
                    </Page>
                    <div style="margin-bottom:10px" v-for="v in list " :key="v.taskNo" @click="goDetail(v)">
                          <Layout>
                                <Row style="height:80px;line-height:80px;margin-top:10px;">
                                    <Col span="2">
                                            <Icon type="md-notifications"  class="f16 pl20"/>
                                    </Col> 
                                    <Col span="15" class="f1 f61">
                                               {{v.taskNo}}{{'-你的'}}{{v.taskConfigurationName}}{{'已送达，马上去完成吧！'}}
                                                <span style="float:right;margin-right:50px">{{v.userName}}</span>
                                    </Col>  
                                    <Col span="2"  class="f14 f61"> 
                                                 <div style="width:140px">{{v.created}}</div>
                                    </Col>   
                                    <Col span="5" style="position:relative"  class="f14 f61"> 
                                                <!-- {{v.created}} -->
                                            <i class="iconfont icondian  red absolute"></i>
                                    </Col>   
                                </Row>
                         </Layout>
                    </div>
                    
       
    </div>
</template>
<script>
    export default {
            name:'aa',
            data(){
                 return{
                        userInfo:'',
                        list:[],
                        task:[],
                        page:1,
                        total: 0,
                        pageSize:10,
                 }
            },
            beforeMount(){
                  
            },
            mounted(){
                       this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                       this.clickSearch()
            },
            methods:{
                  clickSearch(){
                             this.getTaskId();
                        setTimeout(()=>{
                               this.initdata()
                        },1000)
                  },
                  search() {
                            this.page =1
                            this.initdata()
                    }, 
                   getTaskId(){
                        let data={}
                        this.request('fabricDevelop_taskConfiguration_getTaskConfigurationList',data,false).then(res=>{
                                   if(res.code==1){
                                         this.task=res.data;
                                   }      
                        })
                    }, 
                  getID(){
                         for(let i=0,len=this.task.length;i<len;i++){
                             if(this.task[i].taskName.indexOf('录入采购信息')>-1){
                                 return this.task[i].id
                             }
                         }     
                  },
                initdata(){
                           let data={};
                               data.currentPage           = this.page;
                               data.pageSize              = this.pageSize
                               data.status                = 0
                               data.taskConfigurationId   = this.getID()
                            this.request('fabric_fabricTaskDetail_dingding', data, false).then((res) => {
                            if(res.code==1){
                                   this.list =res.data.records
                                   this.total=res.data.count
                            }else{
                                   this.$message.error(res.msg)
                            }
                        })    
                    },
                  currentChange(page) {
                            this.page = page
                            this.initdata()
                    },
                   sizeChange(pageSize) {
                            this.pageSize = pageSize
                            this.initdata()
                    },    
                  changestatus(obj){//productlaunch_editDevelopTaskStatus
                                let {taskNo,taskDetailId,taskConfigurationId,taskConfigurationName}=obj
                                let data={};
                                    data.taskNo=taskNo
                                    data.taskDetailId=taskDetailId
                                    data.taskConfigurationId=taskConfigurationId
                                    data.taskConfigurationName=taskConfigurationName
                             this.request('fabric_developMaterialEnter_inProgress', data, false).then((res) => {
                            if(res.code==1){
                                             this.$router.push({
                                                name:'purchasingdetail',
                                                query: {   
                                                        taskNo: taskNo,
                                                        taskDetailId:taskDetailId,
                                                        taskConfigurationId:taskConfigurationId,
                                                        taskConfigurationName:taskConfigurationName,
                                                        }
                                            }) 
                            }else{
                                      this.$message.error(res.msg)
                            }
                        })     
                    },
                    goDetail(v){
                               this.changestatus(v)
                    }
                    // goDetail(v){
                    //          let {taskCode} = v
                    //           this.$router.push({
                    //               name:'purchasingdetail',
                    //               query: {   
                    //                       taskCode: taskCode
                    //                       }
                    //           }) 
                    //            this.changestatus(v)
                    // }
            }
    }
</script>
<style>
   .f16{
       font-size:26px!important
   }
   .f17{
       font-size:17px!important 
   }
    .f61{
       font-size:16px!important
   }
   .f14{
       font-size:14px!important
   }
   .pl20{
       padding-left: 20px
   }
   .red{
       color:red
   }
   .absolute{
      position: absolute;
      top:-30px;
      right: 10px;
      font-size:16px;
   }
</style>
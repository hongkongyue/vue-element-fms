<template>
    <div class="layout "  style="padding-left:0px">
         <!-- <Content> -->
                    <Page style="margin-top:5px;margin-bottom:10px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange">
                    </Page>
                    <div style="margin-bottom:10px" v-for="v in list " :key="v.taskNo" @click="goDetail(v)">
                          <Layout>
                                <Row style="height:40px;line-height:40px;margin-top:10px;">
                                    <Col span="2">
                                            <Icon type="md-notifications"  class="f16 pl20"/>
                                    </Col> 
                                    <Col span="15" class="f1 f61">
                                               {{v.message}}
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
                //   }
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
                             if(this.task[i].taskName.indexOf('录入面料信息')>-1){
                                 return this.task[i].id
                             }
                         }     
                  },
                initdata(){
                           let data={};
                               data.currentPage           = this.page;
                               data.pageSize              = this.pageSize
                               data.status                = 0
                            //    data.taskConfigurationId   =this.getID()
                            this.request('page_query_task_message', data, false).then((res) => {
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
                                let data={};
                                data.messageUserMappingId = obj.messageUserMappingId
                              this.request('update_task_message_status', data, false).then((res) => {
                            if(res.code==1){
                                             this.$router.push({
                                                name:'planningMessageDetail',
                                                query: {   
                                                        id: obj.id,
                                                        // taskDetailId:taskDetailId,
                                                        // taskConfigurationId:taskConfigurationId,
                                                        // taskConfigurationName:taskConfigurationName,
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
       font-size:13px!important
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
      top:-10px;
      right: 10px;
      font-size:16px;
   }
</style>
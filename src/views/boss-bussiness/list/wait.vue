<template>
    <div class="layout "  style="padding-left:0px">
         <!-- <Content> -->
                    <Page style="margin-top:5px;margin-bottom:10px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange">
                    </Page>
                    <div style="margin-bottom:10px" v-for="v in list " :key="v.taskNo" @click="goDetail(v)">
                          <Layout>
                                <Row style="height:80px;line-height:80px;margin-top:10px;">
                                    <Col span="2">
                                            <Icon type="md-notifications"  class="f16 pl20"/>
                                    </Col> 
                                    <Col span="15" class="f1 f61">
                                               {{v.taskNo}}{{'-你的'}}{{v.taskType+'任务'}}{{'已送达，马上去查看吧！'}}
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
                       this.initdata()
                //   }
            },
            methods:{
                search() {
                            this.page =1
                            this.initdata()
                }, 
                initdata(){
                            let data={};
                                data.currentPage=this.page
                                data.pageSize   =this.pageSize
                                data.taskType   = '企划调整审核'
                                data.taskStatus = 100
                                this.request('boss_boss_adjust_task_page_query_adjust_task', data, false).then((res) => {
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
                               let {id,taskType,taskNo,taskDetailId}=obj
                                let data={};
                                    data.id=id
                                    data.taskType=taskType
                                    data.taskDetailId=taskDetailId
                              this.request('boss_boss_adjust_task_update_adjust_task_status', data, false).then((res) => {
                            if(res.code==1){
                                             this.$router.push({
                                                name:'planningAdjustmentAuditDetail',
                                                query: {   
                                                         taskNo: taskNo,
                                                         id:id,
                                                         taskDetailId:taskDetailId
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
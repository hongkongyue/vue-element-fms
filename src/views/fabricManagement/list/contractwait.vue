<template>
    <div class="layout "  style="min-height:630px;padding-left:0px">
         <!-- <Content> -->
             <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange">
                    </Page>
                    <div style="margin-bottom:10px" v-for="v in list " :key="v.taskCode" @click="goDetail(v)">
                          <Layout>
                                <Row style="height:80px;line-height:80px;margin-top:10px;">
                                    <Col span="2">
                                            <Icon type="md-notifications"  class="f16 pl20"/>
                                    </Col> 
                                    <Col span="15" class="f1 f61">
                                               {{v.taskCode}}{{'-你的'}}{{v.taskTypeName}}{{'已送达，马上去完成吧！'}}
                                                <span style="float:right;margin-right:50px">{{v.createUser}}</span>
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
            data(){
                 return{
                        userInfo:'',
                        list:[],
                        page:1,
                        total: 0,
                        pageSize:10,
                 }
            },
            mounted(){
                  this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                  this.initdata()
            },
            methods:{
                  search() {
                            this.page =1
                            this.initdata()
                    },  
                  currentChange(page) {
                            this.page = page
                            this.initdata()
                    },
                  sizeChange(pageSize) {
                            this.pageSize = pageSize
                            this.initdata()
                    },
                    initdata(){
                           let data={};
                               data.length         =  this.pageSize;
                               data.start          = (this.page - 1) * this.pageSize
                               data.taskStatus     = 100
                               data.taskTypeCode   ='ContractDateCheck'
                               data.userId      = this.userInfo.userId
                            this.request('eom_reorder_get_reorder_task_list', {data:data}, false).then((res) => {
                            if(res.code==1){
                                   this.list=res.data.taskList
                                   this.total=res.data.count
                            }
                        })    
                    },
                    changestatus(obj){//productlaunch_editDevelopTaskStatus
                                let {id}=obj
                                let data={};
                                //   data.taskCode=taskCode;
                                  data.lastUpdateUserId=this.userInfo.userId;
                                  data.id=id;
                              this.request('eom_reorder_start_reorder_task', {data:data}, false).then((res) => {
                            if(res.code==1){
                                      this.initdata()
                            }
                        })     
                    },
                    goDetail(v){
                             let {taskCode} = v
                              this.$router.push({
                                  name:'contractdetail',
                                  query: {   
                                          taskCode: taskCode
                                          }
                              }) 
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
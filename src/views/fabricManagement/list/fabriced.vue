<template>
    <div>
        <!-- 数据列表 -->
        <Row class="background-color-white exhibition" style="padding-left:0px">
            
            <Page style="margin-top:5px;text-align:right" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
                <Table  :columns="columns" size="small" highlight-row :data="list"></Table>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                red_packet_table_row_index:-1,
                list:[],
                columns: [
                     {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 70,

                    },
                     {
                        title: '任务编号',
                        key: 'taskNo',
                        align: 'center',
                        minWidth: 190,
                    },
                    {
                        title: '任务名称',
                        key: 'taskConfigurationName',
                        align: 'center',
                        minWidth: 120,
                    },
                    {
                        title: '发起人',
                        key: 'promoter',
                        align: 'center',
                        minWidth: 120,
                    },
                     {
                        title: '发起部门',
                        key: 'initiatingDepartment',
                        align: 'center',
                        minWidth: 120,
                    },
                    {
                        title: '到达时间',
                        key: 'arriveTime',
                        align: 'center',
                        minWidth: 160,
                    },
                    {
                        title: '共计时长',
                        key  : 'usedTime',
                        align: 'center',
                        minWidth: 140,
                        // render: (h, params) => {
                        //         return h('span', filter.FreshTime(params.row.countDownDate/1000))
                        // },
                    },
                     {
                        title: '操作',
                        key: 'lastUpdateUser',
                        align: 'center',
                        width: 220,
                        fixed :'right',
                        render: (h, params) => {
                            // if(params.row.lastUpdateUser){
                            //   return h('div', [
                               
                            //    ]);
                            // }else{
                                return h('div', [
                                      h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        width:'50px'
                                    },
                                    on: {
                                        click: () => {
                                               this.$router.push({
                                                          name:'fabriccomplated',
                                                          query: { 
                                                                 taskNo: params.row.taskNo,
                                                                 taskDetailId:params.row.id,
                                                                 taskConfigurationId:params.row.taskConfigurationId
                                                         }
                                                 })
                                        }
                                    }
                                }, '查看'),
                                //  h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px',
                                //         width:'50px'
                                //     },
                                //     on: {
                                //         click: (e) => {
                                //             const {taskConfigurationId,id,taskNo}=params.row
                                //             this.backTask(taskConfigurationId,id,taskNo)
                                //         }
                                //     }
                                // }, '撤回'),
                               ]);  
                            }
                             
                        },
                    // },
                ],
                userInfo: {},
                total: 0,
                page: 1,
                pageSize: 10,
            }
        },
        mounted() {
                this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                //  this.getTaskId();
                //           setTimeout(()=>{
                //                  this.initdata()
                //         },1000)
        },
        activated() {

        },
        methods: {
                clickSearch(){
                             this.getTaskId();
                        setTimeout(()=>{
                               this.initdata()
                        },1000)
                  },
                // 撤回任务号
                backTask(taskConfigurationId,id,taskNo){
                            let data={}
                                // data.id=id
                                data.taskConfigurationId=taskConfigurationId
                                // data.taskConfigurationName=taskConfigurationName
                                data.taskDetailId=id
                                data.taskNo=taskNo
                            this.request('fabric_developMaterialEnter_revokeTask', data, false).then((res) => {
                                if(res.code==1){
                                        this.$message.success('撤回成功')
                                        this.initdata()
                                    }else{
                                        this.$message.error(res.msg)
                                    }
                        })
                },
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
                //初始化第一个列表数据
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
                               data.status                = 2
                               data.taskConfigurationId   = this.getID()
                            this.request('fabric_fabricTaskDetail_page', data, false).then((res) => {
                            if(res.code==1){
                                   this.list =res.data.records
                                   this.total=res.data.count
                            }else{
                                   this.$message.error(res.msg)
                            }
                        })    
                    },
        }       
    }
</script>

<style>
    .ivu-modal-footer{
        border-top:0;
    }
        .demo-upload-list{
            display: inline-block;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            margin-right: 4px;
        }
        .demo-upload-list img{
            width: 100%;
            height: 100%;
        }
        .demo-upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        .demo-upload-list:hover .demo-upload-list-cover{
            display: block;
        }
        .demo-upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
</style>

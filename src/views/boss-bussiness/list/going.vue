<template>
    <div>
        <!-- 数据列表 -->
        <Row class="background-color-white exhibition" style="padding-left:0px">
            <!--  -->
            <!-- <Table  ref="currentRowTable"  @on-row-dblclick="showChakan"	@on-row-click="selectRow" @on-select-cancel="choiceId" @on-select-all-cancel="choiceId"  @on-select="choiceId" @on-select-all="choiceId"	:columns="columns" size="small" highlight-row :data="list"></Table> -->
            
            <Page style="margin-top:5px;text-align:right;margin-bottom:10px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
             <Table  :columns="columns" size="small" highlight-row :data="list" @on-row-click="showLog"></Table>
              <section class="footer" style="margin-bottom:0px">
        <!-- <span class="pl20"><i class="el-icon-arrow-up pointer "></i></span> -->
                <div style="width:100%;font-size:14px;">操作日志</div>
            </section>
            <section class="log">
                    <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="230">
                        <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                            <template slot-scope="scope">{{scope.row.operateTime}}</template>
                        </el-table-column>
                        <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                    <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
                </section>
        </Row>
    </div>
</template>

<script>
    import Util from 'libs/util';
    import filter from  '../../../filter'
    function formSearch() { 
        return {
            search: ''
        }
    }
    export default {
        data() {
            return {
                visible: false,
                red_packet_table_row_index:-1,
                list:[],
                logList:[],
                columns: [
                        {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        minWidth: 70,

                    },
                     {
                        title: '任务编号',
                        key: 'taskNo',
                        align: 'center',
                        minWidth: 190,
                    },
                    {
                        title: '任务类型',
                        key: 'taskType',
                        align: 'center',
                        minWidth: 120,
                    },
                    {
                        title: '发起人',
                        key: 'createUser',
                        align: 'center',
                        minWidth: 120,
                    },
                     {
                        title: '发起部门',
                        key: 'createUserDepartmentName',
                        align: 'center',
                        minWidth: 120,
                    },
                    {
                        title: '到达时间',
                        key: 'created',
                        align: 'center',
                        minWidth: 160,
                    },
                    {
                        title: '已用时间',
                        key: 'sumTime',
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
                         minWidth: 220,
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
                                        width:'100px'
                                    },
                                    on: {
                                        click: () => {
                                                this.$router.push({
                                                    name:'planningAdjustmentAuditDetail',
                                                    query: {   
                                                            taskNo: params.row.taskNo,
                                                            id:params.row.id,
                                                            taskDetailId:params.row.taskDetailId
                                                         }
                                                })
                                        }
                                    }
                                }, '进入'),
                               ]);  
                            // }
                             
                        },
                    },
                ],
                userInfo: {},
                total   : 0,
                page    : 1,
                logPage : 1,
                pageSize: 10,
                logList : [],
                formSearch: {
                },
                dataFlag:true,
                brandList:[],          //品牌列表
                modal_visible:false,   // 编 
            }
        },
        mounted() {
                 
        },
        activated() {

        },
        methods: {
                search() {
                               this.page =1
                               this.initdata()
                },  
                currentChange(page) {
                              this.page=page
                              this.initdata()
                },
                sizeChange(pageSize) {
                              this.pageSize = pageSize
                              this.initdata()
                },
               initdata(){
                            this.logList=[]
                            this.logPage=1;
                            let data={};
                                data.currentPage=this.page
                                data.pageSize   =this.pageSize
                                data.taskType   = '企划调整审核'
                                data.taskStatus = 400
                                this.request('boss_boss_adjust_task_page_query_adjust_task', data, false).then((res) => {
                                if(res.code==1){
                                     this.list =res.data.records
                                     this.total=res.data.count
                                }else{
                                     this.$message.error(res.msg)
                                }
                            })    
                    },
               getLoglist(){
                        let data={}
                            data.billNo     ='boss_task_message_prefix_'+ this.billNo
                            data.pageSize   =3
                            data.currentPage=this.logPage
                        this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                                if (res.code == 1) {
                                    if (res.data.length < data.pageSize) {
                                            this.dataFlag = false
                                        } else {
                                            this.dataFlag = true
                                        }
                                    if (this.logPage== 1) {
                                           this.logList=res.data 
                                    } else {
                                           this.logList=this.logList.concat(res.data) 
                                    }   
                                }
                        }) 

            },
            getMore(){
                    this.logPage++
                    this.getLoglist()
            },
            showLog(row){
                    this.billNo=row.id
                    this.logPage=1;
                    this.getLoglist()  
            },  
        }       
    }
</script>

<style  lang="less" scoped>
    .ivu-modal-footer{
        border-top:0;
    }
    .ivu-table-header{
        background: #909399;
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

        .el-table__row td {
            padding: 0;
        }

        /* 用来设置当前页面element全局table 选中某行时的背景色*/
        .el-table__body tr.current-row>td {
            background-color: #f19944 !important;
            /* color: #f19944; */
            /* 设置文字颜色，可以选择不设置 */
        }

        /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
        .el-table--enable-row-hover .el-table__body tr:hover>td {
            background-color: #f19944;
            /* color: #f19944; */
            /* 设置文字颜色，可以选择不设置 */
        }
</style>

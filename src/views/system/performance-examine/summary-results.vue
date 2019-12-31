<template>
      <div>
          <Row class="margin-bottom-10 background-color-white exhibition">   
            <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline
                label-position="right" style="100px">
                <Col span="24" style="padding-left:7px">
                <Form-item label="员工:"  :label-width="50" v-if="changeType!='department'">
                    <Input v-model="formSearch.employee_name" placeholder="请输入员工姓名" style="width: 110px"
                 ></Input>
                </Form-item>
                <Form-item label="部门:"  :label-width="50">
                       <div class="tree">
                        <treeselect
                                style="width:220px;"
                                placeholder="请选择"
                                :multiple="false"
                                value-format="object"
                                :options="departmentListChose"
                                v-model="formSearch.departmentObj"
                        />
                    </div>
                </Form-item>  
                <Form-item label="员工类型:" v-if="changeType!='department'">
                      <Select v-model="formSearch.employee_type" style="width:120px">
                              <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                </Form-item>
                <Form-item label="考核周期:">
                      <Select v-model="formSearch.cycle" style="width:120px">
                              <Option v-for="item in reviewPeriodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary"  @click="search" >查询</Button>
                    <Button type="default"  @click="reset" >重置</Button>
                    <Button type="primary"  @click="exportEmployee">导出</Button>
                </Form-item>
                </Col>
            </Form>
        </Row>
        <Row class="margin-bottom-10 background-color-white exhibition">
            <Tabs value="department" type="card" @on-click="TabPane">
                    <TabPane label="部门考核" name="department">
                        <Row class="background-color-white">
                                <Table :columns="columns" highlight-row size="small" :data="initlist"></Table>
                                <Page style="margin-top:5px;" :total="inittotal" :page-size="initpageSize" :current="initpage" show-sizer show-total
                                    show-elevator @on-change="initcurrentChange" @on-page-size-change="initsizeChange">
                                </Page>
                        </Row>
                    </TabPane>
                    <TabPane label="个人考核" name="person">
                                    <Table :columns="columns2" highlight-row border size="small"  :data="list"></Table>
                                    <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                                        show-elevator @on-change="currentChange" @on-page-size-change="sizeChange">
                                    </Page>
                    </TabPane>
            </Tabs>
        </Row>
      </div>
</template>
<script>
      import Util from 'libs/util';
     export default{
            data(){
                return {
                       formSearch:{},
                       changeType:'department',//切换类型
                       page:1,                 //第一页
                       pageSize :10,            //长度
                       initpage:1,              //第一页
                       initpageSize :10,       //长度
                       total    :'',            //总的条数
                       inittotal:'',           //第一个表的总数
                       list     :[], 
                       initlist :[],            
                       departmentListChose:[], //部门列表
                       secondTitleHeader  :[], //二级标题
                       employeeTypeList   :[   //员工类型列表
                            {
                                label:'基层',
                                value:'基层'
                            },
                            {
                                label:'中层',
                                value:'中层'
                            },
                            {
                                label:'班长',
                                value:'班长'
                            }
                        ],
                       reviewPeriodList: [{ //考核周期
                                label: '2019年上半年',
                                value: '2019年上半年'
                            },
                            {
                                label: '2019年下半年',
                                value: '2019年下半年'
                            },
                            {
                                label: '2020年上半年',
                                value: '2020年上半年'
                            }, {
                                label: '2020年下半年',
                                value: '2020年下半年'
                            }
                        ],
                     columns: [{
                        title: '部门',
                        key: 'department_name',
                        align: 'center',
                        width: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].department_name
                            )
                        }
                    },
                    {
                        title: '考核周期',
                        key: 'cycle',
                        align: 'center',
                        width: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].cycle
                            )
                        }
                    },
                    {
                        title: '总分',
                        key: 'total_score',
                        align: 'center',
                        width: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].total_score
                            )
                        }
                    }, {
                        title: 'CEO',
                        key: 'ceo',
                        align: 'center',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].ceo ? this.initlist[params.index].ceo : '未参与评分'
                            )
                        }
                    }, {
                        title: '内部客户',
                        key: 'inter_customer',
                        align: 'center',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].inter_customer ? this.initlist[params.index].inter_customer : '未参与评分'
                            )
                        }
                    }, {
                        title: 'HRBP',
                        key: 'hrbp',
                        align: 'center',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].hrbp ? this.initlist[params.index].hrbp : '未参与评分'
                            )
                        }
                    }, {
                        title: '财务中心',
                        key: 'finance_center',
                        align: 'center',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].finance_center ? this.initlist[params.index].finance_center :'未参与评分'
                            )
                        }
                    }, {
                        title: '人力资本中心',
                        key: 'hr_center',
                        align: 'center',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('span',{},
                            this.initlist[params.index].hr_center ? this.initlist[params.index].hr_center : '未参与评分'
                            )
                        }
                    }
                ],
                 columns2: [{
                        title: '员工',
                        key: 'employee_name',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].EMPLOYEE_NAME); 
                        }
                    },
                    {
                        title: '考核周期',
                        key: 'cycle',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].CYCLE); 
                        }
                    },
                    {
                        title: '部门',
                        key: 'org_department_name',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].ORG_DEPARTMENT_NAME); 
                        }
                    }, {
                        title: '所属部门',
                        key: 'org_department_root_name',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].ORG_DEPARTMENT_ROOT_NAME); 
                        }
                    }, {
                        title: '岗位',
                        key: 'org_post_name',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].ORG_POST_NAME); 
                        }
                    }, {
                        title: '职级',
                        key: 'level_name',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].LEVEL_NAME); 
                        }
                    }, {
                        title: '总分',
                        key: 'total_score',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            return h('span', {
                                        }, this.list[params.index].TOTAL_SCORE); 
                        }
                    }, {
                        title: '基层考核',
                        key: 'department_header',
                        align: 'center',
                        minWidth: 220,
                        children:[
                                    {
                                    title: '部门负责人',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                          return h('span', {
                                                    }, this.list[params.index].部门负责人?this.list[params.index].部门负责人:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }  
                                    }
                                    },
                                    {
                                    title: '直接上级',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                         if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                          return h('span', {
                                                    }, this.list[params.index].直接上级?this.list[params.index].直接上级:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    },
                                    },
                                    {
                                    title: '内部客户',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                        if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                          return h('span', {
                                                    }, this.list[params.index].内部客户?this.list[params.index].内部客户:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                     }
                                    },
                                    {
                                    title: 'HRBP',
                                    key: 'HRBP',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                          return h('span', {
                                                    }, this.list[params.index].HRBP?this.list[params.index].HRBP:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    // {
                                    // title: '人力资本中心',
                                    // key: '人力资本中心负责人',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].人力资本中心负责人?this.list[params.index].人力资本中心负责人:'未参与评分'); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // }
                                    // },
                                    // {
                                    // title: 'CEO',
                                    // key: 'CEO',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].CEO?this.list[params.index].CEO:'未参与评分'); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // }
                                    // },
                                    // {
                                    // title: '财务中心',
                                    // key: '财务中心负责人',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='基层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].财务中心负责人?this.list[params.index].财务中心负责人:'未参与评分'); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // }
                                    // },

                        ]
                    },
                     {
                        title: '中层考核',
                        key: 'immediate_superior',
                        align: 'center',
                        minWidth: 220,
                        children:[
                                    // {
                                    // title: '部门负责人',
                                    // key: 'total_score',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].部门负责人); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }  
                                    // }
                                    // },

                                    //this.list[params.index].HRBP?this.list[params.index].HRBP:'未参与评分'
                                    {
                                    title: '直接上级',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                         if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                          return h('span', {
                                                    }, this.list[params.index].直接上级?this.list[params.index].直接上级:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    },
                                    },
                                    {
                                    title: '内部客户',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                        if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                          return h('span', {
                                                    }, this.list[params.index].内部客户?this.list[params.index].内部客户:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                     }
                                    },
                                    {
                                    title: 'HRBP',
                                    key: 'HRBP',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                          return h('span', {
                                                    }, this.list[params.index].HRBP?this.list[params.index].HRBP:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    {
                                    title: '人力资本中心',
                                    key: '人力资本中心',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                          return h('span', {
                                                    }, this.list[params.index].人力资本中心负责人?this.list[params.index].人力资本中心负责人:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    // {
                                    // title: 'CEO',
                                    // key: 'CEO',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].CEO); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // }
                                    // },
                                    // {
                                    // title: '财务中心',
                                    // key: '人力资本中心',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='中层'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].财务中心负责人); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // }
                                    // },

                        ]
                    },
                     {
                        title: '班长考核',
                        key: 'inter_customer',
                        align: 'center',
                        minWidth: 220,
                        children:[
                                    // {
                                    // title: '部门负责人',
                                    // key: 'total_score',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //    if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].部门负责人); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }  
                                    // }
                                    // },
                                    // {
                                    // title: '直接上级',
                                    // key: 'total_score',
                                    // align: 'center',
                                    // minWidth: 120,
                                    // render: (h, params) => {
                                    //      if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                    //       return h('span', {
                                    //                 }, this.list[params.index].直接上级); 
                                    //    }else{
                                    //        return h('span', {
                                    //                 }, '');  
                                    //    }   
                                    // },
                                    // },
                                    {
                                    title: '内部客户',
                                    key: 'total_score',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                        if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                          return h('span', {
                                                    }, this.list[params.index].内部客户?this.list[params.index].内部客户:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                     }
                                    },
                                    {
                                    title: 'HRBP',
                                    key: 'HRBP',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                          return h('span', {
                                                    }, this.list[params.index].HRBP?this.list[params.index].HRBP:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    {
                                    title: '人力资本中心',
                                    key: '人力资本中心',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                          return h('span', {
                                                    }, this.list[params.index].人力资本中心负责人?this.list[params.index].人力资本中心负责人:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    {
                                    title: 'CEO',
                                    key: 'CEO',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                          return h('span', {
                                                    }, this.list[params.index].CEO?this.list[params.index].CEO:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },
                                    {
                                    title: '财务中心',
                                    key: '人力资本中心',
                                    align: 'center',
                                    minWidth: 120,
                                    render: (h, params) => {
                                       if(this.list[params.index].EMPLOYEE_TYPE=='班长'){
                                          return h('span', {
                                                    }, this.list[params.index].财务中心负责人?this.list[params.index].财务中心负责人:'未参与评分'); 
                                       }else{
                                           return h('span', {
                                                    }, '');  
                                       }   
                                    }
                                    },

                        ]
                     },
                     {
                        title: '整体评价',
                        key: 'OVERALL_EVALUATION',
                        align: 'center',
                        minWidth: 250,
                        render: (h, params) => {
                                          return h('p', {
                                                         style: {
                                                                    display: 'inline-block',
                                                                    width: '100%',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap'
                                                            },
                                                         domProps:{
                                                                  title:this.ClearBr(this.list[params.index].OVERALL_EVALUATION)
                                                                  }
                                                    }, this.ClearBr(this.list[params.index].OVERALL_EVALUATION)); 
                        }
                                    },
                ],
                }
            },
            mounted(){
                        this.getDepartmentTreeData()
                        this.getData()
                        this.init()
                         
            },
            methods:{
                ClearBr(key) { 
                        var str =''
                            str = key.replace(/\\n/g,'\n')
                    return str
                 },
               //重置表单
               resetFormdata(){
                       this.formSearch={}
               },
               //重置搜索
               reset(){
                       this.resetFormdata()
                       this.search()

               },
               //切换表单
               TabPane(params){
                    switch(params){
                        case 'department':
                        this.changeType='department'
                        break;
                        case 'person':
                        this.changeType='person'
                        break;
                    }  
                     this.search()  
                    //  this.reset()       
               },
                //搜索
                search() {
                    if(this.changeType=='department'){
                       this.initpage=1
                       this.init()
                    }else if(this.changeType=='person'){
                       this.page =1
                       this.getData()
                    }  
                },
                initcurrentChange(page) {
                      this.initpage = page
                      this.init()
                },
                initsizeChange(pageSize) {
                      this.initpageSize = pageSize
                      this.init()
                },
                currentChange(page) {
                      this.page = page
                      this.getData()
                },
                sizeChange(pageSize) {
                      this.pageSize = pageSize
                      this.getData()
                },
                initDepartmentTree(){
                       this.departmentList = Util.deepClone(this.departmentListChose)
                       this.submit_data.department = this.submit_data.org_department_id
                       //处理部门权限选择
                       let departData = Util.deepClone(this.departmentListArray)
                        for (let item of departData) {
                            item.checked = false
                            if (item.unit_path.length == 8) {
                                item.expand = true
                            }
                            if (this.submit_data.department_power_config && this.submit_data.department_power_config.toString().indexOf(item.id) >= 0) {
                                item.checked = true
                            }else if(this.submit_data.department_power_config=='all'){
                                item.checked = true
                            }
                        }
                        this.departmentPowerList = Util.arrayToDepartmentTree(departData)
                },
                //初始化部门
                getDepartmentTreeData(){
                        this.request('get_department_tree_list', {}, false).then((res) => {
                            if (res.errno == 0) {
                            this.departmentListArray = res.data
                            this.departmentListChose = Util.arrayToDepartmentTree(Util.deepClone(res.data))
                            }
                        })
                },
                 //初始化table1列表数据
                 init() {
                    let data                 =  {}
                        data.length          =  this.initpageSize
                        data.start           =  (this.initpage - 1) * this.initpageSize
                        
                        data.cycle           =  this.formSearch.cycle
                        this.formSearch.departmentObj? data.department_id   =  this.formSearch.departmentObj.id:delete  data.department_id
                        this.formSearch.departmentObj?data.department_path  =  this.formSearch.departmentObj.unit_path:delete data.department_path 
                    this.request('get_department_total_list', {data:data}, true).then((res) => {
                        if (res.code == 1) {
                            this.initlist    =  res.data.departmentList
                            this.inittotal   =  res.data.count     
                        }else{
                            this.initlist = []
                            this.inittotal = '0' 
                        }
                    })

                },
                //初始化table2列表数据
                getData() {
                    let data                                   =  {}
                        data.length                            =  this.pageSize
                        data.start                             =  (this.page - 1) * this.pageSize
                        data.employee_name                     =  this.formSearch.employee_name
                        data.cycle                             =  this.formSearch.cycle
                        data.employee_type                     =  this.formSearch.employee_type
                        this.formSearch.departmentObj? data.department_id   =  this.formSearch.departmentObj.id:delete  data.department_id
                        this.formSearch.departmentObj?data.department_path  =  this.formSearch.departmentObj.unit_path:delete data.department_path 
                    this.request('get_employee_total_list', {data:data}, true).then((res) => {
                        if (res.code   == 1) {
                            this.list  = res.data.employeeList
                            this.total = res.data.count
                        }else{
                            this.list = []
                            this.total = '0' 
                        }
                    })

                },
                //导出
                formatParams(data) {
                    var arr = [];
                    for (var name in data) {
                    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
                    }
                    return arr.join("&");
                },
                //导出提交
                exportEmployee(){
                    let data = {}
                         this.formSearch.departmentObj? data.department_id   =  this.formSearch.departmentObj.id:delete  data.department_id
                         this.formSearch.departmentObj? data.department_path  =  this.formSearch.departmentObj.unit_path:delete data.department_path 
                         this.formSearch.cycle? data.cycle =  this.formSearch.cycle:delete data.cycle
                         this.formSearch.employee_name?data.employee_name=this.formSearch.employee_name:delete data.employee_name
                         this.formSearch.employee_type?data.employee_type=this.formSearch.employee_type:delete data.employee_type
                         let params=this.formatParams(data)
                         
                        if(this.changeType=='department'){
                               console.log(`/eop/sys/export_department_total_list?${params}`)
                              location.href=(`/eop/sys/export_department_total_list?${params}`)//部门
                        }else{
                                console.log(`/eop/sys/export_employee_total_list?${params}`)
                              location.href=(`/eop/sys/export_employee_total_list?${params}`)//个人  
                        }  
                        
                },
            }
              
     }
</script>
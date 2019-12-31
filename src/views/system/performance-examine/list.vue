<template>
<div id="performance-examine" class="background-color-white exhibition">
    <Row >
        
        <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="50" inline
            label-position="right">
            <Col >
            <Form-item label="员工:" :label-width="50">
                <Input v-model="formSearch.employee_name" placeholder="请输入员工姓名" style="width: 110px"
                 ></Input>
            </Form-item>
           
             <Form-item label="部门:"  :label-width="50">
                    <div class="tree">
                        <treeselect
                                style="width:250px;"
                                placeholder="请选择"
                                :multiple="false"
                                value-format="object"
                                :options="departmentList"
                                v-model="formSearch.departmentObj"
                        />
                    </div>
                </Form-item>
                  <Form-item label="记录人:" :label-width="60">
                <Input v-model="formSearch.record_user" placeholder="请输入记录人" style="width: 130px"
                 ></Input>
            </Form-item>
                <Form-item label="在职:">
                                　 <RadioGroup v-model="formSearch.work_status">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                </Form-item>
                <Form-item label="记录:">
                                　 <RadioGroup v-model="formSearch.is_record">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                </Form-item>
                
                </Col>
                <Col> 
                
           <Form-item label="记录时间:" :label-width="70">
                    <DatePicker type="daterange" size="small" v-model="formSearch.created"  placeholder="请选择创建时间" style="width: 200px">
                    </DatePicker>
                </Form-item>
            <Form-item :label-width="1">
                <Button type="primary" @click="search">查询</Button>
                <Button type="default" @click="handleReset">重置</Button>
                <Button type="primary" v-if="btnList.export" @click="exportData">导出</Button>
                <Button type="primary"  @click="newAdd">添加</Button>
            </Form-item>
            </Col>
        </Form>
        
    </Row>
    <Row class="background-color-white exhibition">
        <Table :columns="columns" size="small" highlight-row :data="list"></Table>
        <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
            show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
    </Row>
    <Modal v-model="modal_visible" :title="modal_title" @on-cancel='cancel' :width="750" class-name="customize-modal-center">
        <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="rules">
            <Row>
                <Col span='12'>
                <Form-item label="员工姓名:">
                    <Select placeholder="输入员工姓名，模糊搜索" @on-change="onEmployeeChange" v-model="submit_data.employee_name"
                        filterable >
                        <Option v-for="(option, index) in employeeList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <Form-item label="员工:">
                    　　 　<Input disabled style="width: 150px" v-model="submit_data.employee_name"></Input>
                    　</Form-item>
                </Col>
                <Col span="12">
                <Form-item label="年份:">
                    <DatePicker type="year" placeholder="选择年份" v-model="submit_data.date_year" style="width: 150px"></DatePicker>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <Form-item label="部门:">
                    　　<Input disabled style="width: 150px" v-model="submit_data.department_name"></Input>
                </Form-item>
                </Col>
                　
                <Col span='12'>
                <Form-item label="所属部门:">
                    　　<Input disabled style="width: 150px" v-model="submit_data.root_department_name"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <Form-item label="岗位:">
                    　　<Input disabled style="width: 150px" v-model="submit_data.post_name"></Input>
                </Form-item>
                </Col>

                <Col span='12'>
                <Form-item label="职级:">
                    　　<Input disabled style="width: 150px" v-model="submit_data.level_name"></Input>
                </Form-item>
                </Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button type="default" @click="cancel">取消</Button>
            <Button type="primary" @click="save">保存</Button>
        </div>
    </Modal>
    <!-- 新增模块 -->
    <Modal title="新增模块" v-model="add_visible" :width="1100" @on-ok="storeSubmit"  @on-cancel="resetModal" class-name="customize-modal-center">
     <Row>
        <Form :model="formSearchs"  ref="formSearchs" :label-width="65" inline
            label-position="right">
            <Col>
                <Form-item label="直接下级:">
                                <RadioGroup v-model="formSearchsIs_selected" @on-change="watchchange2">
                                        <Radio label="1">是</Radio>
                                        <Radio label="0">否</Radio>
                                </RadioGroup>
                </Form-item>
                <Form-item label="所属部门:" >
                               <Select v-model="formSearchs.optionsBm" style="width:100px" @on-change="watchChange(formSearchs.optionsBm)">
                                    <Option v-for="item in departmentName" :value="item.org_department_id" :key="item.org_department_id">{{ item.org_department_name }}</Option>
                                </Select>
               </Form-item>
                 <!-- 新增 -->
                <Form-item label="员工选择:" >
                               <Select v-model="formSearchs.staff" style="width:100px" >
                                    <Option v-for="item in newstafflist" :value="item.main_id" :key="item.main_id">{{ item.name }}</Option>
                                </Select>
                </Form-item>
                <Button type="primary"  @click="selectType('more')">添加</Button>

                <!-- <Button type="primary"  @click="selectType('one')">添加</Button> -->
                <Button type="primary"  @click="pardenset">重置</Button>
            </Col>
        </Form> 
    </Row>
    <Row class="background-color-white exhibition" style="height:300px;overflow:auto">
       <Table :columns="columns2" size="small" highlight-row :data="listtable"></Table>
    </Row>
   </Modal>
</div>
</template>

<script>
    import {
         mapState
    } from 'vuex'
    import Util from 'libs/util';
    import {
        LOAD_CHILDREN_OPTIONS
    } from '@riophae/vue-treeselect'
import { setTimeout } from 'timers';

    export default {
        name: 'performance-examine',
        data() {
            return {
                formSearch: {
                    work_status: '1'
                },
                formSearchs: {
                     optionsBm : '', 
                     staff     : '',
                     department:'',
                     main_id   :'',
                },
                formSearchsIs_selected:'',
                resetType:false,
                btnList:{
                  export:false
                },
                columns: [{
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '年份',
                        key: 'date_year',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '员工',
                        key: 'employee_name',
                        align: 'center',
                        width: 100
                    }, {
                        title: '部门',
                        key: 'department_name',
                        align: 'center',
                        minWidth: 120
                    }, {
                        title: '所属部门',
                        key: 'root_department_name',
                        align: 'center',
                        minWidth: 120
                    }, {
                        title: '岗位',
                        key: 'post_name',
                        align: 'center',
                        minWidth: 120
                    }, {
                        title: '岗位职级',
                        key: 'org_level_name',
                        align: 'center',
                        minWidth: 100
                    }, {
                        title: '职级',
                        key: 'level_name',
                        align: 'center',
                        minWidth: 100
                    }, {
                        title: '记录时间',
                        key: 'record_time',
                        align: 'center',
                        width: 150
                    }, {
                        title: '记录人',
                        key: 'record_user',
                        align: 'center',
                        width: 100
                    }, {
                        title: '操作',
                        key: 'operate',
                        width: 100,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.viewDetail(params.row.id);
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                columns2: [{
                        title: '员工',
                        key: 'member',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                                 if(this.addType=='one'){
                                      return h('Select', {
                                        props:{
                                            value: this.listtable[params.index].member,
                                            size: 'small'
                                        },
                                        on: {
                                            'on-change':(value) => {
                                                // this.listtable[params.index].member =value;
                                                this.staffList.map((x,index)=>{
                                                    if(x.name== value){
                                                        this.listtable[params.index].member=x.name;
                                                        this.listtable[params.index].main_id=x.main_id;
                                                        this.listtable[params.index].department= this.staffList[index].org_department_name; 
                                                    }
                                                    console.log(this.listtable,'123456')
                                                })
                                            }
                                        },
                                    },
                                    this.staffList.map(function(item){
                                        return h('Option', {
                                            props: {value: item.name}
                                        }, item.name);
                                    }));
                                 }else if(this.addType=='more'){
                                     return h('span', {
                                        }, this.listtable[params.index].member); 
                                 
                                 }
                                 
                        }
                    },
                    {
                        title: '部门',
                        key: 'department',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            //    return h('span', params.row.department)
                               return h('span', this.listtable[params.index].department)
                         }
                    },
                    {
                        title: '日期',
                        key: 'timeDate',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                                return h('DatePicker', {
                                    props: {
                                        value: this.listtable[params.index].timeDate,
                                        size: 'samll',
                                        type: 'datetime',
                                        format:'yyyy-MM-dd'
                                    },
                                    on: {
                                        'on-change': (event) => {  
                                            this.listtable[params.index].timeDate =event
                                        }
                                    }
                                }) 
                        }
                    }, {
                        title: '指标',
                        key: 'index',
                        align: 'center',
                        minWidth: 120,
                                 render: (h, params) => {
                                   return h('Select', {
                                        props:{
                                            value: this.listtable[params.index].index?this.listtable[params.index].index:'',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-change':(value) => {
                                                this.listtable[params.index].index = value;
                                                this.targetList.map(x=>{
                                                    if(x.value == value){
                                                        this.listtable[params.index].index = x.value;
                                                    }
                                                })
                                            }
                                        },
                                    },
                                    this.targetList.map(function(item){
                                        return h('Option', {
                                            props: {value: item.label}
                                        }, item.value);
                                    }));
                        }
                    }, {
                        title: '案例类型',
                        key: 'case',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                                   return h('Select', {
                                        props:{
                                            value: this.listtable[params.index].case?this.listtable[params.index].case:'',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-change':(value) => {
                                                 this.listtable[params.index].case = value;
                                                 this.caseTypeList.map(x=>{
                                                        if(x.value == value){
                                                            this.listtable[params.index].case = x.value;
                                                        }
                                                    })
                                            }
                                        },
                                    },
                                    this.caseTypeList.map(function(item){
                                        return h('Option', {
                                            props: {value: item.value}
                                        }, item.value);
                                    }));
                        }
                    }, {
                        title: '事件描述',
                        key: 'describle',
                        align: 'center',
                        minWidth: 200,
                        render: (h, params) => {
                                 return h('Input', {
                                    props: {
                                        type: 'textarea',
                                        value: this.listtable[params.index].describle?this.listtable[params.index].describle:'',
                                        size: 'small'
                                    },
                                    on: {
                                        'on-blur': (event) => {
                                            this.listtable[params.index].describle =event.target.value;
                                    
                                        }
                                    }
                                })
                        }
                    },  {
                        title: '操作',
                        key: 'operate',
                        width: 100,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.dellisttable(params.index);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                list: [],
                listtable:[],//弹框表格渲染
                caseTypeList:[
                   {id:1,value:'正面案例'},
                   {id:0,value:'反面案例'},
                ],
                targetList: [{
                        value: '计划控制能力',
                        label: '计划控制能力'
                    },
                    {
                        value: '学习与创新能力',
                        label: '学习与创新能力'
                    },
                    {
                        value: '执行力',
                        label: '执行力'
                    },
                    {
                        value: '复盘能力',
                        label: '复盘能力'
                    },
                    {
                        value: '培育下属能力',
                        label: '培育下属能力'
                    },
                    {
                        value: '系统思考能力',
                        label: '系统思考能力'
                    },
                    {
                        value: '客户第一',
                        label: '客户第一'
                    },
                    {
                        value: '拥抱变化',
                        label: '拥抱变化'
                    },
                    {
                        value: '诚信',
                        label: '诚信'
                    },
                    {
                        value: '团队合作',
                        label: '团队合作'
                    },
                    {
                        value: '激情',
                        label: '激情'
                    },
                    {
                        value: '敬业',
                        label: '敬业'
                    }
                ],
                modal_visible: false,
                add_visible:false,//新增弹框的显示与否
                addType:'more',
                staffList:[],//员工列表
                departmentName:[],//部门，
                newstafflist:[], //新员工列表 、、xin
                submit_data: {
                    level_name: '',
                    post_name: '',
                    department_name: '',
                    root_department_name: '',
                    date_year: new Date()
                },
                loading: false,
                total: 0,
                page: 1,
                pageSize: 10,
                employeeList: [],
                departmentList: []
            }
        },
        mounted() {

            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.getData()
            this.getDepartmentTree()
            this.btnList.add = false
            Util.getButtonPermission('performance-examine').then((res) => {
                for (let item of res.data.data) {
                  if (item.code == 'export' && item.available == 1) {
                    this.btnList.export = true
                  }
                }
              })
            this.initTable('one')
            // this.initStafflist('','')
            this.initDepartment()
        },
        activated() {

        },
        methods: {
            //新增的方法汇总
            newAdd(){
                this.formSearchs.optionsBm='';
                this.add_visible=true;
            },
            //批量添加还是逐个添加
            selectType(type){
                switch(type){
                     case'more':
                     this.addType='more'
                    //  this.initStafflist(this.formSearchsIs_selected,this.formSearchs.optionsBm);
                    if(this.formSearchs.optionsBm&&this.formSearchs.staff){
                        // alert(this.getStaffName(this.formSearchs.staff))
                        this.listtable.push({
                             member:this.getStaffName(this.formSearchs.staff),
                             main_id:this.formSearchs.staff,
                             created_user:this.userInfo.userName,
                             timeDate:this.unix_fulla(),
                             department:this.getStaffdepartment(this.formSearchs.staff),
                             index:'',
                             case:'',
                             describle:'',
                        })
                    }else{
                        for(let i=0;i<this.newstafflist.length;i++){
                               this.listtable.push({     
                                   member:this.newstafflist[i].name,
                                   main_id:this.newstafflist[i].main_id,
                                   department:this.newstafflist[i].org_department_name,
                                   created_user:this.userInfo.userName,
                                   timeDate:this.unix_fulla(),
                                   index:this.newstafflist[i].target,
                                   case:this.newstafflist[i].case_type,
                                   describle:this.newstafflist[i].event_desc,
                               })  
                        }
                    }
                     
                     break;
                     case'one':
                     this.addType='one' 
                    //  this.initStafflist(this.formSearchsIs_selected,this.formSearchs.optionsBm); 
                    //  this.listtable=JSON.parse(localStorage.getItem('listtable'))?JSON.parse(localStorage.getItem('listtable')):[];
                     this.listtable.push({member:'',department:'',timeDate:this.unix_fulla(),index:'',case:'',describle:'',created_user:this.userInfo.userName})
                    
                     break;
                }
            },
            openAddDialog() {
                this.modal_visible = true
                this.submit_data = {
                    date_year: new Date()
                }
                if (this.employeeList.length <= 0) {
                    this.getEmployeeListData('all')
                }
                //this.employeeList = []
            },
            handleReset() {
                this.page = 1
                this.pageSzie = 10
                this.formSearch = {
                    work_status: '1'
                }
                this.getData()
            },
            //重置按钮
            pardenset(){
                this.addType='more';
                this.formSearchsIs_selected='';
                this.formSearchs.optionsBm='';
                this.formSearchs.staff='';
                let personId = JSON.parse(window.sessionStorage.getItem('userinfo'));
                let personIdName = personId.userName;
                   this.request('get_examine_employee_list', {
                       data:{
                            user_id:this.userInfo.userId,
                            underling:'',
                            org_department_id:'',
                       }
                   }, false).then((res) => {       
                     setTimeout(()=>{
                         this.newstafflist=[]
                     },500)
                        
                   })
            },
            cancel() {
                this.modal_visible = false;
            },
            search() {
                this.page =1
                this.getData()
            },
            //根据员工姓名模糊查询当前用户下属数据
            getEmployeeListData(query) {
                if (query !== '') {
                    this.loading = true;
                    this.request('get_employee_list', {
                        name: query
                    }, false).then((res) => {
                        this.loading = false;
                        if (res.errno == 0) {
                            let data = res.data
                            data.forEach((item) => {
                                item.value = item.name
                                item.label = item.name
                            })
                            this.employeeList = data
                        } else {
                            this.$Message.error(res.errmsg);
                        }
                    })
                } else {
                    //this.employeeList = [];
                }
            },
            onEmployeeChange(value) {
                for (let item of this.employeeList) {
                    if (item.name == value) {
                        this.submit_data.employee_name = item.name
                        this.submit_data.post_name = item.post_name
                        this.submit_data.level_name = item.level_name
                        this.submit_data.department_name = item.unit_name
                        this.submit_data.root_department_name = item.root_department_name
                    }
                }
            },
            save() {
                let data = Util.deepClone(this.submit_data)
                if (!data.employee_name) {
                    this.$Message.warning('请选择员工');
                    return;
                }
                if (!data.date_year) {
                    this.$Message.warning('请选择年份');
                    return;
                }
                this.request('save_performance_examine_data', data, '正在保存数据...').then((res) => {
                    if (res.errno == 0) {
                        this.cancel()
                        this.search()
                    } else {
                     
                    }
                })
            },
            //重置表格第二个；
            resetModal(){
                this.addType='more'
                this.formSearchsIs_selected=''
                this.formSearchs.optionsBm=''
                this.listtable=[]
                this.formSearchs.staff=''
                this.newstafflist=[]
            },
            //初始化第二个表格
            initTable(type){
                  switch(type){
                      case'one':
                      this.listtable=[]//初始值的默认一项值
                      break;
                  }
            },
            watchChange(params){
                console.log('是你的额原因')
                this.resetType=false;
                if(this.formSearchs.optionsBm){
                    this.initStafflist(this.formSearchsIs_selected,params);
                }
                
            },
            //初始化员工列表
            initStafflist(underling,org_department_id){
                let personId = JSON.parse(window.sessionStorage.getItem('userinfo'));
                let personIdName = personId.userName;
                   this.request('get_examine_employee_list', {
                       data:{
                            user_id:this.userInfo.userId,
                            underling:underling,
                            org_department_id:org_department_id,
                       }
                   }, false).then((res) => {       
                       if(this.addType=='one'){                  
                           this.staffList=[];
                       }else if(this.addType=='more'){
                              this.newstafflist=[];
                              this.newstafflist=res.data;
                       }
                        
                   })
            },
            //根据员工id找员工姓名：
            getStaffName(id){
              if(this.newstafflist.length>0){
                  for(let i=0;i<this.newstafflist.length;i++){
                      if(id==this.newstafflist[i].main_id){
                          return this.newstafflist[i].name
                      }
                  }
              }  
            },
            //根据员工id找员工姓名：
            getStaffdepartment(id){
              if(this.newstafflist.length>0){
                  for(let i=0;i<this.newstafflist.length;i++){
                      if(id==this.newstafflist[i].main_id){
                          return this.newstafflist[i].org_department_name
                      }
                  }
              }  
            },
            //根据员工id查部门；
            initDepartment(){
                  this.request('get_examine_org_list', {
                       data:{
                           user_id:this.userInfo.userId,
                       }
                   }, false).then((res) => {
                         this.departmentName=res.data
                   })
            },
            unix_fulla(){
                            var newDate = new Date();
                                newDate.setTime(new Date().getTime());
                            var Y = newDate.getFullYear(),
                                M = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
                                D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate();
                            return  Y + '-' + M + '-' + D 
            },
            //删除某一项
            dellisttable(index){
              this.listtable.splice(index,1)
            },
            //保存所选
            storeSubmit(){
              let params=[];
              console.log(this.listtable,'popopop')
              console.log(this.listtable)
              for(let i=0;i<this.listtable.length;i++){
                 if(this.listtable[i].case&&this.listtable[i].index&&this.listtable[i].describle){
                      params.push({
                        main_id:this.listtable[i].main_id,
                        date_time:this.listtable[i].timeDate,
                        target:this.listtable[i].index,
                        case_type:this.listtable[i].case,
                        event_desc:this.listtable[i].describle,
                        created_user:this.listtable[i].created_user
                        })
                  }
                }  
               this.request('save_examine_detail', {
                       data:params
                   }, false).then((res) => {
                          this.initTable('one')
                          this.getData();
                          this.formSearchsIs_selected='';
                          this.formSearchs.staff='';
                          this.newstafflist=[];
                          this.formSearchs.optionsBm='';
                   })           
            },
            getData() {
                let data = {}
                data.employee_name = this.formSearch.employee_name
                if (this.formSearch.departmentObj) {
                    data.departmentPath = this.formSearch.departmentObj.unit_path
                }
                data.page = this.page
                data.work_status = this.formSearch.work_status
                data.is_record = this.formSearch.is_record
                data.record_user = this.formSearch.record_user
                if (this.formSearch.created&&this.formSearch.created[0]) {
                    data.startTime = Util.dateFormat(this.formSearch.created[0], 'yyyy-MM-dd')
                    data.endTime = Util.dateFormat(this.formSearch.created[1], 'yyyy-MM-dd')
                }
                data.pageSize = this.pageSize
                this.request('get_performance_examine_list_data', data, true).then((res) => {
                    if (res.errno == 0) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        for (let item of res.data.data) {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                        }
                        this.list = res.data.data
                        this.total = res.data.count
                    }else{
                        this.$Message.warning(res.errmsg)
                    }
                })
            },
            //查看详情
            viewDetail(id) {
                this.$router.push({
                    name: 'performance-examine-detail',
                    params: {
                        id: id,
                    }
                });

            },
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
            delete(id) {
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要删除当前记录？',
                    loading: true,
                    onOk: () => {
                        this.request('delete_performance_examine_data', {
                            main_id: id
                        }, true).then((res) => {
                            if (res.errno == 0) {
                                this.$Modal.remove();
                                this.$Message.info('删除成功');
                                this.search()
                            }
                        })
                    }
                });
            },
             getDepartmentTree(){
                this.request('get_department_tree_list', {}, false).then((res) => {
                    if (res.errno == 0) {
                        this.departmentList = Util.arrayToDepartmentTree(Util.deepClone(res.data))
                    }
                })
            },
              //导出数据
            exportData(){
                window.open('/WebReport/ReportServer?reportlet=RealFile%2Fjx%2Fjx_examine.cpt&op=view')
            },
            watchchange2(){
               this.newstafflist=[];
               this.initStafflist(this.formSearchsIs_selected,this.formSearchs.optionsBm)  
            }
        },
        //监听
        watch:{
            //   formSearchsIs_selected(val){
            //      this.newstafflist=[];
            //      this.formSearchs.staff='';
            //      this.formSearchs.optionsBm='';
            //      this.formSearchsIs_selected=val;
            //      if(this.resetType){
            //         this.newstafflist=[];
            //      }else{
            //         this.initStafflist(this.formSearchsIs_selected,this.formSearchs.optionsBm)
            //      }
                 
            //   }
        }
    }
</script>

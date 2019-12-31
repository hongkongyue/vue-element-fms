<template>
    <div id="employee">
        <Row class="margin-bottom-10 background-color-white exhibition">
           
            <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline
                label-position="right">
                <Col span="24" style="padding-left:7px">
                <Form-item label="姓名:" :label-width="60">
                    <Input v-model="formSearch.employee_name" placeholder="请输入员工姓名" style="width: 150px"></Input>
                </Form-item>
                <Form-item label="部门:"  :label-width="50">
                    <div class="tree">
                        <treeselect
                                style="width:250px;"
                                placeholder="请选择"
                                :multiple="false"
                                value-format="object"
                                :options="departmentListChose"
                                v-model="formSearch.departmentObj"
                        />
                    </div>
                </Form-item>
                <Form-item label="职级:">
                                　<Select v-model="formSearch.id" style="width:90px">
                                    <Option v-for="item in is_rank" :value="item.value" :key="item.value">
                                        {{ item.label }}</Option>
                                </Select>
                </Form-item>
             
                </Col>
                <Col span="24">
                <Form-item label="员工类型:">
                                　<Select v-model="formSearch.employee_type" style="width:90px;padding-left:0px">
                                    <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">
                                        {{ item.label }}</Option>
                                </Select>
                </Form-item>
                <Form-item label="在职:">
                                <!-- 　<Select v-model="formSearch.is_incumbency" style="width:250px">
                                    <Option v-for="item in is_incumbency" :value="item.value" :key="item.value">
                                        {{ item.label }}</Option>
                                </Select> -->
                                <RadioGroup v-model="formSearch.is_incumbency">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                </Form-item>
                <Form-item label="是否班委:">
                                <!-- 　<Select v-model="formSearch.is_classcommittee" style="width:250px">
                                    <Option v-for="item in is_classcommittee" :value="item.value" :key="item.value">
                                        {{ item.label }}</Option>
                                </Select> -->
                                 <RadioGroup v-model="formSearch.is_classcommittee">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                </Form-item>
                 
                <Form-item :label-width="1">
                    <Button type="primary" @click="search">查询</Button>
                    <Button type="default" @click="handleReset">重置</Button>
                    <Button type="primary" @click="syncEmployeeFromOa">同步</Button>
                    <Button type="primary" @click="exportEmployee">导出</Button>

                </Form-item>
                </Col>
            </Form>
            
        </Row>
        <Row class="background-color-white exhibition">
            <Table :columns="columns" size="small" highlight-row :data="list"></Table>
            <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
        </Row>
        <Modal v-model="modal_visible" title="编辑员工档案" @on-cancel='cancel' :width="850"
            class-name="customize-modal-center">
            <Tabs value="name1">
                <TabPane style="height:100%" label="基本信息" name="name1">
                   <div style="height:330px;overflow-y:auto;">
                         <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="rules">
                        <Row>
                            <Col span="12">
                            <Form-item label="员工姓名:">
                                　　 　<Input disabled style="width: 250px" v-model="submit_data.name"></Input>
                                　</Form-item>
                            </Col>
                            <Col span="12">
                            <Form-item label="工号:">
                                　<Input disabled style="width: 150px" v-model="submit_data.code"></Input>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="部门:">
                                <div class="tree">
                                    <treeselect style="width:250px" @select="departmentSelected" placeholder="请选择" :multiple="false"
                                        value-format="id" max-height="200" :options="departmentList" @input="searchInput"
                                        v-model="submit_data.department"  />
                                </div>
                            </Form-item>
                            </Col>
                            <Col span='12'>
                            <Form-item label="所属部门:">
                                　　<Input disabled style="width: 150px"
                                    v-model="submit_data.org_department_root_name"></Input>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="岗位:">
                                　　<Input style="width: 250px" v-model="submit_data.org_post_name"></Input>
                            </Form-item>
                            </Col>

                            <Col span='12'>
                            <Form-item label="职级:">
                                <Select v-model="submit_data.org_level_id" style="width:150px">
                                    <Option v-for="item in levelList" :value="item.level_id" :key="item.level_id">
                                        {{ item.name }}</Option>
                                </Select>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="手机号码:">
                                　<Input style="width: 250px" v-model="submit_data.phone_no"></Input>
                            </Form-item>
                            </Col>

                            <Col span='12'>
                            <Form-item label="是否在职:">
                                　 <RadioGroup v-model="submit_data.work_status">
                                    <Radio label="1">在职</Radio>
                                    <Radio label="0">离职</Radio>
                                </RadioGroup>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="员工类型:">
                                　<Select v-model="submit_data.employee_type" style="width:250px">
                                    <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">
                                        {{ item.label }}</Option>
                                </Select>
                            </Form-item>
                            </Col>

                            <Col span='12'>
                            <Form-item label="是否班委:">
                                　 <RadioGroup v-model="submit_data.is_leader">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form>
                   </div>
                </TabPane>

                <TabPane label="可查看部门" name="name2">
                    <div style="max-height:400px;overflow-y:auto">
                        <Tree ref="departmentPowerTree" :data="departmentPowerList" show-checkbox multiple></Tree>
                    </div>
                </TabPane>
            </Tabs>

            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Util from 'libs/util';

    function formSearch() {
        return {
            search: ''
        }
    }
    export default {
        name: 'employee',
        data() {
            return {
                columns: [{
                        title: '员工姓名',
                        key: 'name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '工号',
                        key: 'code',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '部门',
                        key: 'org_department_name',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '所属部门',
                        key: 'org_department_root_name',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '岗位',
                        key: 'org_post_name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '职级',
                        key: 'level_name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '岗位职级',
                        key: 'org_level_name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '直接上级',
                        key: 'superior_name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: 'HRBP',
                        key: 'hrbp_name',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            if(params.row.gender==0){
                                return h('span','女')
                            }else{
                                return h('span','男')
                            }
                        }
                    },
                    {
                        title: '学校',
                        key: 'school',
                        align: 'center',
                        width: 120, 
                    },
                    {
                        title: '专业',
                        key: 'major',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '入职时间',
                        key: 'entry_date',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '转正时间',
                        key: 'positive_date',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '合同时间',
                        key: 'contract_date',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '保险',
                        key: 'insurance',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '员工类型',
                        key: 'employee_type',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '是否班委',
                        key: 'name',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.is_leader==1){
                                return h('span','是')
                            }else{
                                return h('span','否')
                            }
                        }
                    },
                    {
                        title: '手机号码',
                        key: 'phone_no',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '是否离职',
                        key: 'work_status',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            if(params.row.work_status==1){
                                return h('span','在职')
                            }else{
                                return h('span','离职')
                            }
                        }
                    }, {
                        title: '操作',
                        key: 'operate',
                        minWidth: 150,
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
                                            this.edit(params.row);
                                        }
                                    }
                                }, '编辑'),
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
                                            this.delete(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                userInfo: {},
                rules: { //表单规则
                    orgId: [{
                        required: true,
                        type: 'number',
                        message: '请填写部门编码！',
                        trigger: 'blur'
                    }],
                    label: [{
                        required: true,
                        message: '请填写部门名称！',
                        trigger: 'blur'
                    }],
                    upOrgId: [{
                        required: true,
                        type: 'number',
                        message: '',
                        trigger: 'change'
                    }],
                },
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
                formSearch: {
                    is_incumbency:'1'
                },
                modal_visible:false,
                submit_data:{},
                departmentList:[],
                departmentListArray:[],
                departmentListChose:[],
                is_incumbency:[       //是否在职
                    {
                        label:'在职',
                        value:'1'
                    },
                    {
                        label:'离职',
                        value:'0'
                    }, 
                ],
                is_classcommittee:[ //是否班委
                    {
                        label:'是',
                        value:'1'
                    },
                    {
                        label:'否',
                        value:'0'
                    },  
                ],
                is_rank:[      
                     {
                        label:'M1',
                        value:'M1'
                    },
                     {
                        label:'M2',
                        value:'M2'
                    },
                    {
                        label:'M3',
                        value:'M3'
                    },
                    {
                        label:'M4',
                        value:'M4'
                    },
                    {
                        label:'M5',
                        value:'M5'
                    },
                    {
                        label:'M6',
                        value:'M6'
                    },
                    {
                        label:'M7',
                        value:'M7'
                    },
                    {
                        label:'P1',
                        value:'P1'
                    },
                    {
                        label:'P2',
                        value:'P2'
                    },
                    {
                        label:'P3',
                        value:'P3'
                    },
                    {
                        label:'P4',
                        value:'P4'
                    },
                     {
                        label:'P5',
                        value:'P5'
                    },
                     {
                        label:'P6',
                        value:'P6'
                    },
                     {
                        label:'P7',
                        value:'P7'
                    },
                ],
                employeeTypeList:[
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
                departmentPowerList:[],
                levelList:[]
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.getDepartmentTreeData()
            this.getData()
            this.getLevelListData()
        },
        activated() {

        },
        methods: {
            handleReset(){
                this.page = 1
                this.pageSzie = 10
                this.formSearch = {}
                this.formSearch.is_incumbency='1'
                this.getData()
            },
            search() {
                this.page =1
                this.getData()
            },
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
             exportEmployee(){
                let data = {}
                data.page = this.page
                data.pageSize = this.pageSize
                data.employee_name = this.formSearch.employee_name
                data.employee_type = this.formSearch.employee_type
                data.level_name    = this.formSearch.id
                data.work_status   = this.formSearch.is_incumbency?this.formSearch.is_incumbency:'1'
                data.is_leader     = this.formSearch.is_classcommittee
                if (this.formSearch.departmentObj) {
                    data.departmentPath = this.formSearch.departmentObj.unit_path
                }
                var formData=new FormData();
                for(var key in data){
                    formData[key] = data[key];
                }
                this.$Spin.show();
                axios.get(`/eop/sys/export_sys_employee?data=${encodeURIComponent(JSON.stringify(formData))}`,{

                },true).then(res=>{
                    if(res.status == 200 && !!res.data ){
                        window.open( `/eop/sys/export_sys_employee?data=${encodeURIComponent(JSON.stringify(formData))}`);
                        this.$Spin.hide();
                    }else{
                        this.$Message.warning('无数据可导出！');
                        this.$Spin.hide();
                    }
                })
            },
            getData() {
                let data = {}
                data.page = this.page
                data.pageSize = this.pageSize
                data.employee_name = this.formSearch.employee_name
                data.employee_type = this.formSearch.employee_type
                data.level_name    = this.formSearch.id
                data.work_status   = this.formSearch.is_incumbency?this.formSearch.is_incumbency:'1'
                data.is_leader     = this.formSearch.is_classcommittee
                if (this.formSearch.departmentObj) {
                    data.departmentPath = this.formSearch.departmentObj.unit_path
                }
                this.request('get_sys_employee_list', data, true).then((res) => {
                    if (res.errno == 0) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        for (let item of res.data.data) {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                        }
                        this.list = res.data.data
                        this.total = res.data.count
                    }
                })

            },
            edit(row) {
                this.submit_data = Util.deepClone(row)
                this.submit_data.is_leader = this.submit_data.is_leader.toString()
                this.submit_data.work_status = this.submit_data.work_status.toString()
                this.departmentPowerList=[]
                this.initDepartmentTree()
                this.modal_visible = true
            },
            delete() {

            },
            cancel(){
                this.modal_visible = false
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
            getDepartmentTreeData(){
                this.request('get_department_tree_list', {}, false).then((res) => {
                    if (res.errno == 0) {
                       this.departmentListArray = res.data
                       this.departmentListChose = Util.arrayToDepartmentTree(Util.deepClone(res.data))
                    }
                })
            },
            save(){
                let selectedDepart =  this.$refs["departmentPowerTree"].getCheckedNodes()
                let departIds = []
                let isAll = false
                for(let item of selectedDepart){
                    if(item.id=='670869647114347'){
                         isAll = true
                    }
                    departIds.push(item.id)
                }
                let data = Util.deepClone(this.submit_data)
                for(let item of this.levelList){
                   if(item.level_id == data.org_level_id){
                       data.org_level_name = item.name
                       break;
                   }
                }
                data.department_power_config = departIds.join(',')
                if(isAll){
                    data.department_power_config = 'all'
                }
                this.request('update_employee_data',data,'正在保存数据').then((res)=>{
                    if(res.errno==0){
                       this.cancel()
                       this.getData()
                    }
                })
            },
            departmentSelected(item){
                this.submit_data.org_department_id = item.id
                this.submit_data.org_department_name = item.title
            },
            getLevelListData(){
                this.request('get_level_list_data',{},'').then((res)=>{
                     if(res.errno==0){
                        this.levelList = res.data
                        console.log(this.levelList)
                     }
                })
            },
            /**
             * 从oa同步员工数据到eop
             */
            syncEmployeeFromOa(){

                this.request('sync_employee_from_oa',{},'正在从oa同步员工数据...').then((res)=>{
                      if(res.errno==0){
                          this.$Message.success(res.data);
                      }else{

                      }
                })
            }
        }
    }
</script>

<style>

</style>

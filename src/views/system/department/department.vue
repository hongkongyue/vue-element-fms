<template>
    <div class="background-color-white exhibition" id="department">
        <Row class="margin-bottom-10">
            <Col span="24">
                <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline label-position="right">
                    <Form-item label="" :label-width="1">
                        <Input 
                            v-model="formSearch.search"
                            icon="ios-search"
                            placeholder="输入关键字，模糊搜索"
                            style="width: 200px"
                        >
                        </Input>
                    </Form-item>
                    <Form-item :label-width="1">
                        <Button type="primary" @click="search">查询</Button>
                        <Button type="default" @click="handleReset">重置</Button>
                    </Form-item>
                </Form>
            </Col>

            <Col span="24" class="margin-bottom-10">
                <Button type="primary" @click='openModal("新增部门信息")'>新增</Button>                        
            </Col>
            
            <Col span="24">
                <zk-table
                        ref="table"
                        sum-text="sum"
                        index-text="#"
                        :data="orgList"
                        :columns="columns"
                        :expand-type="expandType"
                        :selection-type="expandType"
                        children-prop="children">
                    <template slot="enable" slot-scope="scope">
                        <Checkbox v-model="scope.row.isDelete" :disabled='true'></Checkbox>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <Button size="small" type="primary" @click='openModal("查看部门信息",scope)'>查看</Button>                        
                        <Button size="small" type="warning" @click='openModal("编辑部门信息",scope)'>编辑</Button>
                        <Button size="small" type="error" @click="del(scope)">删除</Button>
                    </template>
                </zk-table>
            </Col>
        </Row>

        <div class="modal">
            <Modal v-model="modal_visible" :title="modal_title" @on-cancel='cancel' :width="750" class-name="customize-modal-center">
                <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="rules">
                    <Row>
                        <Col span='12'>
                            <Form-item label="部门编码:" prop="orgId">
                                <span v-if="modal_title == '查看部门信息'">{{submit_data.orgId}}</span>
                                <Input v-if="modal_title != '查看部门信息'" @on-blur='check_org_unique("orgId")' v-model.number="submit_data.orgId" placeholder="请输入部门编码" style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="部门名称:" prop="label">
                                <span v-if="modal_title == '查看部门信息'">{{submit_data.label}}</span>
                                <Input v-if="modal_title != '查看部门信息'" @on-blur='check_org_unique("orgName")' v-model="submit_data.label" placeholder="请输入部门名称" style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="上级部门:" prop="upOrgId">
                                <div class="tree">
                                    <treeselect
                                        placeholder="请选择上级部门"
                                        :disabled="modal_title == '查看部门信息'"
                                        :style="{height:modal_title == '查看部门信息' ? '32px' : '32.9px',width:'250px'}"
                                        :options="orgList"
                                        :value-consists-of="valueConsistsOf"
                                        @select="searchInput"
                                        v-model="submit_data.upOrgId"
                                        :load-options="loadOptions"
                                    />
                                </div>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="部门负责人:">
                                <span v-if="modal_title == '查看部门信息'">{{submit_data.leaderName}}</span>
                                <Select v-if="modal_title != '查看部门信息'" filterable placeholder="请选择部门负责人" @on-change='changeLeader' v-model="submit_data.leaderId" style="width:250px">
                                    <Option v-for="item in userList" :value="item.user_id" :key="item.user_id">{{ item.user_name }}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="分管领导:">
                                <span v-if="modal_title == '查看部门信息'">{{submit_data.managerName}}</span>
                                <Select v-if="modal_title != '查看部门信息'" filterable placeholder="请选择部门负责人" @on-change='changeManager' v-model="submit_data.managerId" style="width:250px">
                                    <Option v-for="item in userList" :value="item.user_id" :key="item.user_id">{{ item.user_name }}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="是否启用:">
                                <Checkbox v-model="submit_data.isDelete" :disabled="modal_title == '查看部门信息'"></Checkbox>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" v-if="modal_title != '查看部门信息'">
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="save">保存</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Util from 'libs/util';

    function formSearch(){
        return {
            search:''
        }
    }
    export default {
        name:'department',
        data(){
            return {
                formSearch:formSearch(),
                orgList:[],
                temp_orgList:[],                
                expandType: false,
                columns: [
                    {
                        label: '部门编码',
                        prop: 'orgId',
                        width: '250px',
                        align: 'left',
                        headerAlign: 'center',
                    },
                    {
                        label: '所属部门',
                        prop: 'label',
                        width: '200px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '部门负责人',
                        prop: 'leaderName',
                        width: '150px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '分管领导',
                        prop: 'managerName',
                        width: '80px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '是否启用',
                        prop: 'enable',
                        width: '80px',
                        type: 'template',
                        align: 'center',
                        headerAlign: 'center',
                        template: 'enable'
                    },
                    {
                        label: '修改日期',
                        prop: 'created',
                        width: '80px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '操作',
                        prop: 'operate',
                        width: '200px',
                        type: 'template',
                        align: 'center',
                        headerAlign: 'center',
                        template: 'operate'
                    }
                ],
                is_enable:false,
                userInfo:{},
                modal_title:'新增岗位',
                modal_visible:false,
                submit_data:{},
                temp_submit_data:{},
                valueConsistsOf: 'BRANCH_PRIORITY',
                rules: {                                //表单规则
                    orgId: [
                        {required: true,type:'number',message: '请填写部门编码！', trigger: 'blur'}
                    ],
                    label: [
                        {required: true, message: '请填写部门名称！', trigger: 'blur'}
                    ],
                    upOrgId: [
                        {required: true,type:'number' ,message: '', trigger: 'change'}
                    ],
                },
                userList:[],
                filter_orgList:[]
            }
        },
        mounted(){
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        activated(){
            this.get_orgList();
        },
        watch:{
            filter_orgList:{
                handler(newVal,oldVal){
                    let data = Util.deepClone(newVal);
                    let newData = [];
                    data = data.sort((x,y)=>{
                        return x.orgLevel - y.orgLevel;
                    })
                    data.map(x=>{
                        x._isHide = false;
                        x._isFold = false;
                        delete x.children;
                    })
                    data.map((x,y)=>{
                        if(x.orgLevel == 0){
                            newData.push(x);
                            data.splice(y,1); 
                        }
                    })
                    
                    function filterData(arr){
                        let flag = false;
                        for(let x of arr){
                            for(let y of data){
                                if(x.orgId == y.upOrgId){
                                    if(x.hasOwnProperty('children') && x.children.length > 0){
                                        let flag = false;
                                        x.children.map(z=>{
                                            if(z.orgId == y.orgId){
                                                flag = true;
                                            }
                                        })
                                        if(!flag) x.children.push(y);
                                    }else{
                                        x.children = [];
                                        x.children.push(y);
                                    }
                                    continue;
                                }else{
                                    if(x.hasOwnProperty('children') && x.children.length > 0){
                                        filterData(x.children);
                                    }
                                }
                            }
                        }
                        return newData;
                    }
                    this.orgList = filterData(newData);
                },
                deep:true
            }
        },
        methods:{
            search(){
                if(!this.formSearch.search){
                    this.orgList = this.temp_orgList;
                }else{
                    this.filter_orgList = [];
                    this.filterOrgList(this.temp_orgList);
                }
            },
            filterOrgList(data){
                let that = this;
                data.map(x=>{
                    if(x.label.indexOf(this.formSearch.search) != -1){
                        let flag = false;
                        that.filter_orgList.map(v=>{
                            if(v.orgId == x.orgId){
                                flag = true;
                            }
                        })
                        if(!flag) that.filter_orgList.push(x);
                        // function down(data){
                        //     data.map(y=>{
                        //         if(x.upOrgId == y.orgId){
                        //             let flag = false;
                        //             that.filter_orgList.map(f=>{
                        //                 if(f.orgId == y.orgId){
                        //                     flag = true;
                        //                 }
                        //             })
                        //             if(!flag) that.filter_orgList.push(y);
                                    if(x.orgLevel > 0){
                                        function up(_data,__data){
                                            _data.map(k=>{
                                                if(__data.upOrgId == k.orgId){
                                                    let flag = false;
                                                    that.filter_orgList.map(z=>{
                                                        if(z.orgId == k.orgId){
                                                            flag = true;
                                                        }
                                                    })
                                                    if(!flag) that.filter_orgList.push(k);
                                                    if(k.orgLevel > 0){
                                                        up(that.temp_orgList,k)
                                                    }
                                                }
                                                if(k.hasOwnProperty('children') && k.children.length > 0){
                                                    up(k.children,__data);
                                                }
                                            })
                                        }
                                        up(that.temp_orgList,x);
                                    }
                                // }
                                // if(y.hasOwnProperty('children') && y.children.length > 0){
                                //     down(y.children);
                                // }
                            // })
                        // }
                        // down(this.temp_orgList);
                    }
                    if(x.hasOwnProperty('children') && x.children.length > 0){
                        this.filterOrgList(x.children);
                    }
                })
            },
            get_orgList(){
                var that = this;
                this.request('get_orgList',{
                    data:{
                        user_id: this.userInfo.userId
                    }
                },true).then(res=>{
                    if(res.code == 1){
                        function filterData(data){
                            return new Promise((resolve,reject)=>{
                                for(let x of data){
                                    x.isDelete = x.isDelete == 0 ? true : false;
                                    x._isHide = x.orgLevel == 1 || x.orgLevel == 0 ?  false : true;
                                    x._isFold = x.orgLevel == 0 ?  false : true;
                                    if(x.hasOwnProperty('children') && x.children.length > 0){
                                        filterData(x.children);
                                    }
                                }
                                resolve();
                            })
                        }
                        filterData(res.data).then(()=>{
                            this.orgList = res.data;
                            this.temp_orgList = Util.deepClone(res.data);
                            if(JSON.stringify(that.temp_submit_data) != "{}"){
                                this.filter_Hide_Fold(this.orgList,this.temp_submit_data);
                            }
                        })
                    }
                })
            },
            filter_Hide_Fold(data,obj){
                var that = this;
                data.map(x=>{
                    if(x.upOrgId == obj.upOrgId){
                        x._isHide = false;
                        if(x.orgLevel > 1){
                            function next(orgList){
                                orgList.map(y=>{
                                    if(y.orgId == x.upOrgId){
                                        y._isHide =false;
                                        y._isFold = false;
                                        if(y.orgLevel > 1){
                                            that.filter_Hide_Fold(that.orgList,y);
                                        }
                                    }else{
                                        if(y.hasOwnProperty('children') && y.children.length > 0){
                                            next(y.children);
                                        }
                                    }
                                })
                            }
                            next(that.orgList)
                        }
                    }else{
                        if(x.hasOwnProperty('children') && x.children.length > 0){
                            this.filter_Hide_Fold(x.children,obj);
                        }
                    }
                })
            },
            handleReset(){
                this.formSearch = formSearch();
                this.search();
            },
            get_user_all(){
                this.request('get_user_all', {}, true).then(res => {
                    if (res.code == 1) {
                        this.userList = res.data;
                    }
                })
            },
            openModal(title,params){
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.modal_visible = true;
                this.get_user_all();
                if (title == '新增部门信息') {
                    this.submit_data = {};
                } else {
                    this.temp_submit_data = Util.deepClone(params.row);
                    this.submit_data = Util.deepClone(params.row);
                }
            },
            searchInput(val) {
                this.submit_data.orgLevel = parseInt(val.orgLevel) + 1;
            },
            changeLeader(val){
                this.userList.map(x=>{
                    if(val == x.user_id){
                        this.submit_data.leaderName = x.user_name;
                    }
                })
            },
            changeManager(val){
                this.userList.map(x=>{
                    if(val == x.user_id){
                        this.submit_data.managerName = x.user_name;
                    }
                })
            },
            cancel(){
                this.modal_visible = false;
            },
            save(){
                if(!this.submit_data.upOrgId){
                    this.$Notice.warning({
                        title: '提示',
                        desc: '请核对表单信息!'
                    });
                    return false;
                }
                let url = 'add_org';
                let data = Util.deepClone(this.submit_data);
                delete data.label;
                data.isDelete = data.isDelete == true ? 0 : 1;
                data.orgName = this.submit_data.label;                
                if(this.modal_title == '新增部门信息'){
                    data.createUser = this.userInfo.userName;
                }else if(this.modal_title == '编辑部门信息'){
                    url = 'edit_org';
                    for(let x in data){
                        if(x.indexOf('_') != -1 || x == 'children'){
                            delete data[x]
                        }
                    }
                    data.lastUpdateUser = this.userInfo.userName;
                }
                this.$refs['submitForm'].validate((valid) => {
                    if (valid) {
                        this.request(url,{
                            data:data
                        },true).then(res=>{
                            if(res.code == 1){
                                this.$Message.success(res.msg);                        
                                this.get_orgList();
                                this.modal_visible = false;
                            }
                        })
                    }
                })
                
            },
            del(params){
                this.$Modal.confirm({
                    title: '提示',
                    content: '该行将会删除，请确认！',
                    onOk: () => {
                        this.request('delete_org',{
                            data:{
                                orgId:params.row.orgId
                            }
                        },true).then(res=>{
                            if(res.code == 1){
                                this.get_orgList();
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.warning('已取消删除');
                    }
                })
            },
            loadOptions({action, parentNode, callback}) {
                if (action === treeselect) {
                    switch (parentNode.id) {
                        case 'success': {
                            setTimeout(() => {
                                parentNode.children = [{
                                    id: 'child',
                                    label: 'Child option',
                                }]
                                callback()
                            }, 2000)
                            break
                        }
                        case 'no-children': {
                            setTimeout(() => {
                                parentNode.children = []
                                callback()
                            }, 2000)
                            break
                        }
                        case 'failure': {
                            setTimeout(() => {
                                callback(new Error('Failed to load options: network error.'))
                            }, 2000)
                            break
                        }
                        default: /* empty */
                    }
                }
            },
            check_org_unique(type){
                let data = {};                
                if(type == 'orgId'){
                    if(this.temp_submit_data.orgId == this.submit_data.orgId){
                        return false;
                    }
                    data.orgId = this.submit_data.orgId;
                }else {
                    if(this.temp_submit_data.label == this.submit_data.label){
                        return false;
                    }
                    data.orgName = this.submit_data.label;
                }
                this.request('check_org_unique',{
                    data:data
                },true).then(res=>{
                    if(res.code == 0){
                        type == 'orgId' ? this.submit_data.orgId = '' : this.submit_data.label = '';
                    }
                })
            }
        }
    }
</script>

<style>

</style>

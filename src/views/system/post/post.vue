<template>
    <div  id="post">
        <Row class="margin-bottom-10 background-color-white exhibition">
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
            <Col span="24">
                <Button type="primary" @click='openModal("新增岗位信息")'>新增</Button>  
                <Dropdown style="margin-left: 20px" @on-click='operation_dropdown'>
                    <Button type="primary">
                        岗位说明书
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="upload">上传</DropdownItem>
                        <DropdownItem name="download">下载</DropdownItem>
                    </DropdownMenu>
                </Dropdown>                    
            </Col>
        </Row>
        <Row class="background-color-white exhibition">
            <Col span='6' >
                <Tree @on-select-change="selectTree" :data="orgList"></Tree>
            </Col>
            <Col span='18'>
                <Table :columns="columns" @on-current-change='currentChange' size="small" highlight-row :data="postList"></Table>
            </Col>
        </Row>
        <div class="modal">
            <Modal v-model="modal_visible" :title="modal_title" @on-cancel='cancel' :width="750" class-name="customize-modal-center">
                <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="rules">
                    <Row>
                        <Col span='12'>
                            <Form-item label="岗位编码:">
                                <span v-if="modal_title == '查看岗位信息'">{{submit_data.id}}</span>
                                <Input v-if="modal_title != '查看岗位信息'" v-model="submit_data.id" disabled style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="岗位名称:" prop="label">
                                <span v-if="modal_title == '查看岗位信息'">{{submit_data.label}}</span>
                                <Input v-if="modal_title != '查看岗位信息'" v-model="submit_data.label" placeholder="请输入岗位名称" style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="所属部门:" prop='org_id'>
                                <div class="tree">
                                    <treeselect
                                        placeholder="请选择所属部门"
                                        :disabled="modal_title == '查看岗位信息'"
                                        :style="{height:'32px',width:'250px'}"
                                        :options="orgList"
                                        :value-consists-of="valueConsistsOf"
                                        @select="searchInput"
                                        v-model="submit_data.org_id"
                                        :load-options="loadOptions"
                                    />
                                </div>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="上级部门:" prop='up_org_name'>
                                <span>{{submit_data.up_org_name}}</span>
                            </Form-item>
                        </Col>
                        <Col span='12'>
                            <Form-item label="是否启用:">
                                <Checkbox v-model="submit_data.is_deleted" :disabled="modal_title == '查看岗位信息'"></Checkbox>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" v-if="modal_title != '查看岗位信息'">
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="save">保存</Button>
                </div>
            </Modal>
            <!-- 导入弹窗 -->
            <Modal v-model="importModal" title="批量导入">
                <div>
                    <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError"
                        type="drag" action="/eop/sys/upload_doc_file" :data="{postId:currentRow.id,fileName:file.name}">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到此处</p>
                        </div>
                    </Upload>
                    <div v-if="file !== null">{{ file.name }}
                        <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                        </Button>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="uploadFile">导入</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Util from 'libs/util';
    
    let fileTypeComponent = Vue.extend({
        props: ['params'],
        data(){
            return {

            }
        },
        template:`
            <div v-if='!!params.row.fileType'  style="cursor:pointer" @click='preview'>
                <icon :name='params.row.fileType' scale='2' ></icon>
            </div>
        `,
        methods:{
            preview() {
                let fileType = this.params.row.fileType;
                if (!fileType) {
                    this.$Message.warning('该岗位目前没有岗位说明书！');
                    return false;
                }
                if (fileType == 'word') {
                    if (location.host == 'eop.quanshangtech.com:888') {
                        window.open(`https://docview.mingdao.com/op/view.aspx?src=http://eop.quanshangtech.com:888/eop/${this.params.row.post_doc_url}`);
                    } else if (location.host.indexOf('eptison') >= 0) {
                        window.open(`/eop-node/api/file/preview?src=${window.location.origin}/eop/${this.params.row.post_doc_url}`)
                    } else {
                        window.open(`/eop-node/api/file/preview?src=http://eopsit.eptison.com/eop/${this.params.row.post_doc_url}`)
                    }
                } else {
                    window.open(`${window.location.origin}/eop/${this.params.row.post_doc_url}`);
                }
            }
        }
    })

    function formSearch(){
        return {
            search:''
        }
    }
    
    export default {
        name:'post',
        data(){
            return {
                formSearch:formSearch(),
                userInfo:{},
                orgList:[],
                postList:[],
                columns:[
                    {
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '岗位编码',
                        key: 'id',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '岗位名称',
                        key: 'label',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '是否启用',
                        key: 'is_deleted',
                        align: 'center',
                        minWidth: 100,
                        render:(h,params)=>{
                            return h('Checkbox',{
                                props:{
                                    value:this.postList[params.index].is_deleted,
                                    disabled:true
                                }
                            })
                        }
                    },
                    {
                        title: '文件类型',
                        key: 'fileType',
                        align: 'center',
                        minWidth: 100,
                        render:(h,params)=>{
                            return h(fileTypeComponent, {
                                props: {
                                    params: params
                                }
                            })
                        }
                    },
                    {
                        title: '修改日期',
                        key: 'modified',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        minWidth: 200,
                        render:(h,params)=>{
                            return h('div',[
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
                                            this.openModal('查看岗位信息',params);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal('编辑岗位信息',params);
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
                                            this.$Modal.confirm({
                                                title: '提示',
                                                content: '该行将会删除，请确认！',
                                                onOk: () => {
                                                    this.request('delete_post',{
                                                        data:{
                                                            postId:params.row.id
                                                        }
                                                    },true).then(res=>{
                                                        if(this.visible && this.org_list_row.length > 0){
                                                            this.get_postList(this.org_list_row[0].orgId);
                                                        }else{
                                                            this.search();
                                                        }
                                                    })
                                                },
                                                onCancel: () => {
                                                    this.$Message.warning('已取消删除');
                                                }
                                            })
                                        }
                                    }
                                }, '删除'),
                            ])
                        }
                    },
                ],
                valueConsistsOf: 'BRANCH_PRIORITY',
                rules: {                                //表单规则
                    label: [
                        {required: true, message: '请填写岗位名称', trigger: 'blur'}
                    ],
                    org_id:[
                        {required: true, type:'number', message: '请选择所属部门', trigger: 'change'}
                    ]
                },
                modal_visible:false,
                modal_title:'',
                submit_data:{},
                org_list_row:{},
                currentRow:{},
                importModal:false,
                file:{},
                loadingStatus:false,
                visible:true
            }
        },
        mounted(){
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        activated(){
            this.get_orgList();
        },
        methods:{
            search(){
                this.currentRow = {};                
                if(!this.formSearch.search){
                    this.postList = [];
                }else{
                    this.request('get_post_fuzzy',{
                        data:{
                            post_name:this.formSearch.search
                        }
                    },true).then(res=>{
                        if(res.code == 1){
                            res.data.forEach((item,index) => {
                                let fileType = !!item.fileType ? item.fileType.split('.')[1].toLocaleLowerCase() : item.fileType;
                                if(fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg'){
                                    item.fileType = 'file_img';
                                }else if(fileType == 'pdf'){
                                    item.fileType = 'pdf'
                                }else if(fileType == 'doc' || fileType == 'docx'){
                                    item.fileType = 'word'
                                }
                                let post_list = item.label.split('-');
                                item.label = post_list[post_list.length - 1];
                                item.serialNo = index + 1;
                                item.is_deleted = item.is_deleted == 0 ? true : false;
                            })
                            this.postList = res.data;
                            this.visible = false;
                        }
                    })
                }
            },
            handleReset(){
                this.formSearch = formSearch();
                this.postList = [];
                this.currentRow = {};
            },
            get_orgList(){
                this.request('get_orgList',{
                    data:{
                        user_id: this.userInfo.userId
                    }
                },true).then(res=>{
                    if(res.code == 1){
                        function filterData(data){
                            data.map(x=>{
                                x.is_deleted = x.is_deleted == 0 ? true : false;
                                x.title = x.label;
                                if(x.hasOwnProperty('children') && x.children.length > 0){
                                    if(x.orgLevel == 0){
                                        x.expand = true;
                                    }else{
                                        x.expand = false;
                                    }
                                    filterData(x.children);
                                }
                            })
                        }
                        filterData(res.data);
                        this.orgList = res.data;
                    }
                })
            },
            get_postList(orgId){
                this.currentRow = {};
                this.request('get_postList',{
                    data:{
                        org_id:[orgId]
                    }
                },true).then(res=>{
                    if(res.code == 1){
                        res.data.forEach((item,index) => {
                            let fileType = !!item.fileType ? item.fileType.split('.')[1].toLocaleLowerCase() : item.fileType;
                            if(fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg'){
                                item.fileType = 'file_img';
                            }else if(fileType == 'pdf'){
                                item.fileType = 'pdf'
                            }else if(fileType == 'doc' || fileType == 'docx'){
                                item.fileType = 'word'
                            }
                            let post_list = item.label.split('-');
                            item.label = post_list[post_list.length - 1];
                            item.serialNo = index + 1;
                            item.is_deleted = item.is_deleted == 0 ? true : false;
                        })
                        this.postList = res.data;
                    }
                })
            },
            selectTree(data){
                this.org_list_row = data;
                this.visible = true;
                if(!!data && data.length > 0){
                    this.get_postList(data[0].orgId);
                }else{
                    this.postList = [];
                }
            },
            currentChange(currentRow,oldCurrentRow){
                this.currentRow = currentRow;
            },
            openModal(title,params){
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.modal_visible = true;
                if (title == '新增岗位信息') {
                    this.submit_data = {};
                } else {
                    this.temp_submit_data = Util.deepClone(params.row);
                    this.submit_data = Util.deepClone(params.row);
                    this.get_up_org_id(this.orgList,params.row.up_org_id);                    
                }
            },
            searchInput(val) {
                this.submit_data.up_org_id = val.upOrgId;
                this.get_up_org_id(this.orgList,val.upOrgId);
            },
            get_up_org_id(arr,upOrgId){
                for(let x of arr){
                    if(x.orgId == upOrgId){
                        this.submit_data.up_org_name = x.label;
                        break;
                    }else{
                        if(x.hasOwnProperty('children') && x.children.length > 0){
                            this.get_up_org_id(x.children,upOrgId);
                        }
                    }
                }
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
            cancel(){
                this.modal_visible = false;
                this.importModal = false;
            },
            check_post_unique(){
                if(this.temp_submit_data.label == this.submit_data.label) return false;
                this.request('check_post_unique',{
                    data:{
                        post_name:this.submit_data.label
                    }
                },true).then(res=>{
                    if(res.code == 0){
                        this.submit_data.label = '';
                    }
                })
            },
            save(){
                if(!this.submit_data.org_id){
                    this.$Notice.warning({
                        title: '提示',
                        desc: '请核对表单信息!'
                    });
                    return false;
                }
                let url = 'add_post';
                let data = Util.deepClone(this.submit_data);
                delete data.label;
                delete data.up_org_name;
                data.is_deleted = data.is_deleted == true ? 0 : 1;
                data.post_name = this.submit_data.label;
                if(this.modal_title == '新增岗位信息'){
                    data.create_user = this.userInfo.userName;
                }else if(this.modal_title == '编辑岗位信息'){
                    url = 'edit_post';
                    data = {};
                    data.post_name = this.submit_data.label;
                    data.post_id = this.submit_data.id;
                    data.org_id = this.submit_data.org_id;
                    data.up_org_id = this.submit_data.up_org_id;
                    data.is_deleted = this.submit_data.is_deleted == true ? 0 : 1;
                    data.last_update_user = this.userInfo.userName;
                }

                this.$refs['submitForm'].validate((valid) => {
                    if (valid) {
                        this.request(url,{
                            data:data
                        },true).then(res=>{
                            if(res.code == 1){
                                this.$Message.success(res.msg);
                                if(this.visible && this.org_list_row.length > 0){
                                    this.get_postList(this.org_list_row[0].orgId);
                                }else{
                                    this.search();
                                }
                                this.modal_visible = false;
                            }
                        })
                    }
                })
                
            },
            operation_dropdown(type){
                if(JSON.stringify(this.currentRow) == "{}"){
                    this.$Message.warning('请先选择岗位！');
                    return false;
                }
                switch(type){
                    case 'upload':
                        this.file = {};
                        this.importModal = true;
                        break;
                    case 'download':
                        !!this.currentRow.post_doc_url ? window.location = `${window.location.origin}/eop/${this.currentRow.post_doc_url}` : this.$Message.warning('该岗位目前没有岗位说明书！')
                        break;
                    default:
                        break;
                }
            },
            uploadFile(){
                this.loadingStatus = true;
                this.$refs.upload.post(this.file);
            },
            handleUpload(file) {
                if (!/\.png$|.jpeg$|.jpg$|.doc$|.docx$|.pdf$/.test(file.name.toLocaleLowerCase())) {
                    this.$Message.warning('文件类型不符,请重新选择文件');
                    return false
                } else {
                    this.file = file;
                    return false;
                }
            },
            uploadSuccess(res, file) {
                Vue.prototype.$loading.close();
                if (res.code == 1) {
                    this.loadingStatus = false;
                    this.file = {};
                    this.$Message.success(res.msg);
                    this.importModal = false;
                    if(this.visible && this.org_list_row.length > 0){
                        this.get_postList(this.org_list_row[0].orgId);
                    }else{
                        this.search();
                    }
                } else {
                    this.loadingStatus = false;
                    this.$Message.error({
                        content: res.msg,
                        duration: 3
                    });
                }
            },
            uploadError(res, file) {
                this.$Message.error(res.msg);
            }
        }
    }
</script>

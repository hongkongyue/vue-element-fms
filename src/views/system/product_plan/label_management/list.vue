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
                <Button type="primary" @click='openModal("新增标签")'>新增</Button> 
                <Button type="primary" @click='downTemplate'>下载模板</Button>
                <Button type="primary" icon="arrow-up-a" @click="openModal('导入')">
                    导入
                </Button>    
            </Col>
        </Row>
        <Row class="background-color-white exhibition">
            <Col span='4' >
                <Tree @on-select-change="selectTree" :data="good_peoperty_list"></Tree>
            </Col>
            <Col span='20'>
                <Table :columns="columns" @on-current-change='currentChange' size="small" highlight-row :data="label_list"></Table>
            </Col>
        </Row>
        <div class="modal">
            <Modal v-model="modal_visible" draggable :title="modal_title" @on-cancel='cancel' :width="380" class-name="customize-modal-center">
                <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="rules">
                    <Row>
                        <!-- <Col span='24'>
                            <Form-item label="标签编码:" prop='labelCode'>
                                <Input v-model="submit_data.labelCode" placeholder="请输入标签编码" style="width: 250px"></Input>
                            </Form-item>
                        </Col> -->
                        <Col span='24'>
                            <Form-item label="标签名称:" prop="labelName">
                                <Input v-model="submit_data.labelName" placeholder="请输入标签名称" style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='24'>
                            <Form-item label="备注:">
                                <Input v-model="submit_data.remark" type="textarea" style="width: 250px" maxlength='100' placeholder="注：最长输入100字" />
                            </Form-item>
                        </Col>
                        <Col span='24'>
                            <Form-item label="是否启用:">
                                <Checkbox v-model="submit_data.isDelete"></Checkbox>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="save('保存')">保存</Button>                                        
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="save('保存新增')">保存并新增</Button>                                        
                </div>
            </Modal>

            <!-- 导入弹窗 -->
            <Modal
                    v-model="importModal"
                    title="批量导入">
                <div>
                    <Upload
                            ref="upload"
                            name="file"
                            :show-upload-list="false"
                            :before-upload="handleUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            type="drag"
                            action="/eop-node/api/product_plan/import_label_management"
                            :data="{account:userInfo.userAccount,userId:userInfo.userId}"
                    >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到此处</p>
                        </div>
                    </Upload>
                    <div v-if="file !== null">{{ file.name }}
                        <Button type="text"
                                :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                        </Button>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="importData">导入</Button>
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
    
    function submit_data(){
        return {
            isDelete:true,
            labelName:'',
            remark:'',
            // labelCode:''
        }
    }

    export default {
        name:'label_management',
        data(){
            // const validatePass = (rule, value, callback) => {
            //     if (!!value) {
            //         var reg = (/^([\d\,\d\.\d])+$/);
            //         if(reg.test(value)){
            //             let newValue = '';
            //             let arr = value.split(',');
            //             arr.map(x=>{
            //                 newValue += x;
            //             })
            //             if (isNaN(Number(newValue))) {
            //                 // 对第二个密码框单独验证
            //                 callback(new Error('请输入数字'));
            //             }else{
            //                 callback();
            //             }
            //         }else{
            //             callback(new Error('输入有误，请重新输入'));
            //         }
                    
            //     }
            // };
            return {
                formSearch:formSearch(),
                label_list:[],
                userInfo:{},
                columns:[
                    {
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        minWidth: 60
                    },
                    // {
                    //     title: '标签编码',
                    //     key: 'labelCode',
                    //     align: 'center',
                    //     minWidth: 100
                    // },
                    {
                        title: '标签名称',
                        key: 'labelName',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '所属标签分类',
                        key: 'propertyName',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '维护人',
                        key: 'createUser',
                        align: 'center',
                        minWidth: 100                        
                    },
                    {
                        title: '维护时间',
                        key: 'created',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '修改日期',
                        key: 'lastUpdated',
                        minWidth: 150,
                        align: 'center',
                    },
                    {
                        title: '是否启用',
                        key: 'isDelete',
                        align: 'center',
                        minWidth: 100,
                        render:(h,params)=>{
                            return h('Checkbox',{
                                props:{
                                    value:this.label_list[params.index].isDelete,
                                    disabled:true
                                }
                            })
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        minWidth: 150,
                        render:(h,params)=>{
                            return h('div',[
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
                                            this.openModal('编辑标签',params);
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
                                                    this.request('delete_good_label',{
                                                        data:{
                                                            labelId:params.row.labelId,
                                                            labelCode:params.row.labelCode
                                                        }
                                                    },true).then(res=>{
                                                        if(this.visible && this.good_peoperty_list_row.length > 0){
                                                            this.get_label_list({
                                                                propertyCode:params.row.propertyCode
                                                            });
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
                    // labelCode: [
                    //     {required: true, message: '请填写标签编码', trigger: 'blur'},
                    //     { validator: validatePass, trigger: 'blur' }
                    // ],
                    labelName:[
                        {required: true, message: '请填写标签名称', trigger: 'blur'}
                    ]
                },
                modal_visible:false,
                modal_title:'',
                submit_data:submit_data(),
                good_peoperty_list:[],
                good_peoperty_list_row:[],
                visible:true,
                importModal:false,
                loadingStatus:false,
                file:null
            }
        },
        mounted(){
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        activated(){
            this.get_good_peoperty_list();
        },
        methods:{
            search(){
                this.visible = false;
                this.get_label_list({
                    labelName:this.formSearch.search
                })
            },
            handleReset(){
                this.formSearch = formSearch();
                this.label_list = [];
            },
            get_good_peoperty_list(){
                var that = this;
                this.request('get_good_peoperty_list',{
                    data:{
                        propertyName: this.formSearch.search
                    }
                },true).then(res=>{
                    if(res.code == 1){
                        function filterData(data){
                            data.map(x=>{
                                x.isDelete = x.isDelete == 0 ? true : false;
                                x.title = x.propertyName;
                                if(x.hasOwnProperty('children') && x.children.length > 0){
                                    if(!x.upPropertyCode){
                                        x.expand = true;
                                    }else{
                                        x.expand = false;
                                    }
                                    filterData(x.children);
                                }
                            })
                        }
                        filterData(res.data);
                        this.good_peoperty_list = res.data;
                    }
                })
            },
            get_label_list(data){
                this.request('get_label_list',{
                    data:data
                },true).then(res=>{
                    if(res.code == 1){
                        res.data.forEach((item,index) => {
                            item.serialNo = index + 1;
                            item.isDelete = item.isDelete == 0 ? true : false;
                        })
                        this.label_list = res.data;
                    }
                })
            },
            selectTree(data){
                this.good_peoperty_list_row = data;
                this.visible = true;
                if(!!data && data.length > 0){
                    this.get_label_list({
                        propertyCode:data[0].propertyCode
                    });
                }else{
                    this.label_list = [];
                }
            },
            currentChange(currentRow,oldCurrentRow){
                this.currentRow = currentRow;
            },
            openModal(title,params){
                if(title == '导入'){
                    this.importModal = true;
                    return false;
                }
                if (title == '新增标签') {
                    if(!this.good_peoperty_list_row.length > 0){
                        this.$Message.warning('请先选择标签分类！')
                        return false;
                    }
                    this.submit_data = submit_data();
                } else {
                    this.submit_data = Util.deepClone(params.row);
                }
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.modal_visible = true;                
            },
            cancel(){
                this.modal_visible = false;
                this.importModal = false;
                this.file = null; 
            },
            save(type){
                let url = 'add_good_label';
                let data = Util.deepClone(this.submit_data);
                data.isDelete = data.isDelete == true ? 0 : 1;
                if(this.modal_title == '新增标签'){
                    data.propertyCode = this.good_peoperty_list_row[0].propertyCode;
                    data.propertyName = this.good_peoperty_list_row[0].propertyName;
                    data.createUser = this.userInfo.userName;
                }else if(this.modal_title == '编辑标签'){
                    url = 'edit_good_label';
                    data = {};
                    data.labelId = this.submit_data.labelId;
                    data.labelCode = this.submit_data.labelCode;
                    data.labelName = this.submit_data.labelName;
                    data.propertyCode = this.submit_data.propertyCode;
                    data.isDelete = this.submit_data.isDelete == true ? 0 : 1;
                    data.lastUpdateUser = this.userInfo.userName;
                }

                this.$refs['submitForm'].validate((valid) => {
                    if (valid) {
                        this.request(url,{
                            data:data
                        },true).then(res=>{
                            if(res.code == 1){
                                this.$Message.success(res.msg);
                                if(type == '保存新增'){
                                    // let oldLength = this.submit_data.labelCode.length;
                                    // this.submit_data.labelCode = Number(this.submit_data.labelCode) + 1;
                                    // let newLength = String(this.submit_data.labelCode).length;
                                    // if(newLength < oldLength){
                                    //     let gap = oldLength - newLength;
                                    //     for(let i = 1;i<=gap;i++){
                                    //         this.submit_data.labelCode = '0' + this.submit_data.labelCode;
                                    //     }
                                    // }
                                    this.submit_data = submit_data();
                                }else{
                                    this.modal_visible = false;
                                }
                                
                                if(this.visible && this.good_peoperty_list_row.length > 0){
                                    this.get_label_list({
                                       propertyCode:this.good_peoperty_list_row[0].propertyCode 
                                    });
                                }else{
                                    this.search();
                                }
                            }
                        })
                    }
                })
            },
            downTemplate(){
                window.location = ('/excel/标签导入模板.xlsx');
            },
            handleUpload(file) {
                if (!/\.xls$|.xlsx$/.test(file.name)) {
                    this.$Message.warning('文件类型不符,请重新选择文件');
                    return false
                } else {
                    this.file = file;
                    return false;
                }
            },
            uploadSuccess(res, file) {
                Vue.prototype.$loading.close();
                if (res.code == '1') {
                    this.loadingStatus = false;
                    this.file = null;
                    this.$Message.success(res.message);
                    this.importModal = false;
                    this.search();
                } else {
                    this.loadingStatus = false;
                    this.$Message.error({
                        content: res.message,
                        duration: 3
                    });
                }
            },
            uploadError(res, file) {
                this.$Message.error(res.msg);
            },
            importData(){
                this.loadingStatus = true;
                Vue.prototype.$loading('正在导入数据...');
                this.$refs.upload.post(this.file);
            }
        }
    }
</script>

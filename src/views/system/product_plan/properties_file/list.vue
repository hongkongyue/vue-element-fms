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
                <Button type="primary" @click='openModal("新增标签分类")'>新增</Button>
                <Button type="primary" @click='downTemplate'>下载模板</Button>
                <Button type="primary" icon="arrow-up-a" @click="openModal('导入')">
                    导入
                </Button>                  
            </Col>
            
            <Col span="24">
                <zk-table
                        ref="table"
                        sum-text="sum"
                        index-text="#"
                        :data="List"
                        :columns="columns"
                        :expand-type="expandType"
                        :selection-type="expandType"
                        children-prop="children">
                    <template slot="enable" slot-scope="scope">
                        <Checkbox v-model="scope.row.isDelete" :disabled='true'></Checkbox>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <Button size="small" type="warning" @click='openModal("编辑标签分类",scope)'>编辑</Button>
                        <Button size="small" type="error" @click="del(scope)">删除</Button>
                    </template>
                </zk-table>
            </Col>
        </Row>

        <div class="modal">
            <Modal v-model="modal_visible" draggable :title="modal_title" @on-cancel='cancel' :width="400" class-name="customize-modal-center">
                <Form ref="submitForm" :model="submit_data" :label-width="100" :rules="rules">
                    <Row>
                        <!-- <Col span='24'>
                            <Form-item label="标签分类编码:" prop='propertyCode'>
                                <Input v-model="submit_data.propertyCode" placeholder="请输入标签分类编码" style="width: 250px"></Input>
                            </Form-item>
                        </Col> -->
                        <Col span='24'>
                            <Form-item label="标签分类名称:" prop='propertyName'>
                                <Input v-model="submit_data.propertyName" placeholder="请输入标签分类名称" style="width: 250px"></Input>
                            </Form-item>
                        </Col>
                        <Col span='24'>
                            <Form-item label="所属上级:">
                                <div class="tree">
                                    <treeselect
                                        placeholder="请选择所属上级"
                                        :style="{height:modal_title == '查看标签分类编码' ? '32px' : '32.9px',width:'250px'}"
                                        :options="List"
                                        :value-consists-of="valueConsistsOf"
                                        @select="searchInput"
                                        v-model="submit_data.upPropertyCode"
                                        :load-options="loadOptions"
                                    />
                                </div>
                                <span style='color:red'>注：所属上级为空时为最顶级！</span>
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
                            action="/eop-node/api/product_plan/import_properties_file"
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
            propertyName:'',
            isDelete:true,
            remark:''
        }
    }

    export default {
        name:'properties_file',
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
                List:[],
                formSearch:formSearch(),
                expandType: false,
                columns: [
                    // {
                    //     label: '标签分类编码',
                    //     prop: 'propertyCode',
                    //     width: '250px',
                    //     align: 'left',
                    //     headerAlign: 'center',
                    // },
                    {
                        label: '标签分类名称',
                        prop: 'propertyName',
                        width: '150px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '维护人',
                        prop: 'createUser',
                        width: '150px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '维护时间',
                        prop: 'created',
                        width: '150px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '修改日期',
                        prop: 'lastUpdated',
                        width: '150px',
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
                        label: '操作',
                        prop: 'operate',
                        width: '150px',
                        type: 'template',
                        align: 'center',
                        headerAlign: 'center',
                        template: 'operate'
                    }
                ],
                userInfo:{},
                modal_title:'新增标签分类',
                modal_visible:false,
                submit_data:submit_data(),
                temp_submit_data:{},
                valueConsistsOf: 'BRANCH_PRIORITY',
                rules: {                                //表单规则
                    // propertyCode: [
                    //     {required: true,message: '请填写标签分类编码！', trigger: 'blur'},
                    //     { validator: validatePass, trigger: 'blur' }
                    // ],
                    propertyName: [
                        {required: true, message: '请填写标签分类名称！', trigger: 'blur'}
                    ]
                },
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
                this.get_good_peoperty_list();
            },
            handleReset(){
                this.formSearch = formSearch();
                this.search();
            },
            get_good_peoperty_list(){
                var that = this;
                this.request('get_good_peoperty_list',{
                    data:{
                        propertyName: this.formSearch.search
                    }
                },true).then(res=>{
                    if(res.code == 1){
                        this.List = res.data;
                        this.filterList(this.List);
                        if(JSON.stringify(that.temp_submit_data) != "{}"){
                            this.filter_Hide_Fold(this.List,this.temp_submit_data);
                        }
                    }
                })
            },
            filterList(data){
                data.map(x=>{
                    x.isDelete = x.isDelete == 0 ? true : false;
                    // x._isHide = x.upPropertyCode == '00' || x.propertyCode == '00' ?  false : true;
                    // x._isFold = x.upPropertyCode == '00' ?  true : false;
                    x.id = x.propertyCode;
                    x.label = x.propertyName;
                    if(x.hasOwnProperty('children') && x.children.length > 0){
                        this.filterList(x.children);
                    }
                })
            },
            filter_Hide_Fold(data,obj){
                var that = this;
                data.map(x=>{
                    if(x.upPropertyCode == obj.upPropertyCode){
                        x._isHide = false;
                        if(!!x.upPropertyCode){
                            function next(_data){
                                _data.map(y=>{
                                    if(y.propertyCode == x.upPropertyCode){
                                        y._isHide = false;
                                        y._isFold = false;
                                        if(!!x.upPropertyCode){
                                            that.filter_Hide_Fold(that.List,y);
                                        }
                                    }else{
                                        if(y.hasOwnProperty('children') && y.children.length > 0){
                                            next(y.children);
                                        }
                                    }
                                })
                            }
                            next(that.List)
                        }
                    }else{
                        if(x.hasOwnProperty('children') && x.children.length > 0){
                            this.filter_Hide_Fold(x.children,obj);
                        }
                    }
                })
            },
            openModal(title,params){
                if(title == '导入'){
                    this.importModal = true;
                    return false;
                }
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.modal_visible = true;
                if (title == '新增标签分类') {
                    this.submit_data = submit_data();
                } else if(title == '编辑标签分类') {
                    this.submit_data = Util.deepClone(params.row);
                    this.temp_submit_data = Util.deepClone(params.row);
                }
            },
            searchInput(val) {

            },
            cancel(){
                this.modal_visible = false;
                this.importModal = false;
                this.file = null;                
            },
            save(type){
                // if(!this.submit_data.upPropertyCode && this.submit_data.upPropertyCode !== 0){
                //     this.$Notice.warning({
                //         title: '提示',
                //         desc: '请核对表单信息!'
                //     });
                //     return false;
                // }
                let url = 'add_good_property';
                let data = Util.deepClone(this.submit_data);
                data.isDelete = data.isDelete == true ? 0 : 1;
                if(this.modal_title == '新增标签分类'){
                    data.createUser = this.userInfo.userName;
                }else if(this.modal_title == '编辑标签分类'){
                    url = 'edit_good_property';
                    for(let x in data){
                        if(x.indexOf('_') != -1 || x == 'children'){
                            delete data[x]
                        }
                    }
                    data.lastUpdateUser = this.userInfo.userName;
                }
                this.temp_submit_data = data;
                this.$refs['submitForm'].validate((valid) => {
                    if (valid) {
                        this.request(url,{
                            data:data
                        },true).then(res=>{
                            if(res.code == 1){
                                this.$Message.success(res.msg);
                                if(type == '保存新增'){
                                    // let oldLength = this.submit_data.propertyCode.length;
                                    // this.submit_data.propertyCode = Number(this.submit_data.propertyCode) + 1;
                                    // let newLength = String(this.submit_data.propertyCode).length;
                                    // if(newLength < oldLength){
                                    //     let gap = oldLength - newLength;
                                    //     for(let i = 1;i<=gap;i++){
                                    //         this.submit_data.propertyCode = '0' + this.submit_data.propertyCode;
                                    //     }
                                    // }
                                    this.submit_data = submit_data();
                                }else{
                                    this.modal_visible = false;
                                }
                                this.search();      
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
                        this.request('delete_good_property',{
                            data:{
                                propertyId:params.row.propertyId,
                                propertyCode:params.row.propertyCode
                            }
                        },true).then(res=>{
                            if(res.code == 1){
                                this.temp_submit_data = params.row;
                                this.search();
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
            downTemplate(){
                window.location = ('/excel/标签分类导入模板.xlsx');
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

<style>

</style>

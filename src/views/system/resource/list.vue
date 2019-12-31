<style lang="less">
    #resource_list {

    }
</style>

<template>
    <div class="background-color-white exhibition" id="resource_list">
        <Row>
            <Col class="margin-bottom-10">
            <Button type="primary" @click="openModal('新增资源')">新增</Button>
            </Col>
            <Col span="20">
            <zk-table
                    ref="table"
                    sum-text="sum"
                    index-text="#"
                    :data="data"
                    :columns="columns"
                    :expand-type="expandType"
                    :selection-type="expandType"
                    children-prop="sysResourceList">
                <template slot="operate" slot-scope="scope">
                    <Button size="small" type="success" v-if="scope.row.isLeaf == 1"
                            @click="openUploadModal(scope.row)">上传图片
                    </Button>
                    <Button size="small" type="default" v-if="scope.row.isLeaf == 1"
                            @click="openButtonModal(scope.row)">按钮
                    </Button>
                    <Button size="small" type="primary" @click="openModal('编辑资源',scope.row)">编辑</Button>
                    <Button size="small" type="error" @click="del_res(scope.row)">删除</Button>
                </template>
            </zk-table>
            </Col>
        </Row>
        <Modal v-model="modal_visible" :mask-closable="false" :title="modal_title" :width="750"
               class-name="customize-modal-center">
            <Form class="addForm" ref="submit_data" :model="submit_data" :label-width="80" inline label-position="right"
                  :rules="rules">
                <Row>
                    <Col span="12">
                    <Form-item label="菜单节点:" prop="isLeaf">
                        <Select v-model="submit_data.isLeaf" style="width:250px">
                            <Option v-for="item in ModalSelectDatas.isLeaf" :value="item.id" :key="item.id">
                                {{item.id}}
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="上级菜单:" prop="parentId">
                        <div class="tree">
                            <treeselect
                                    placeholder="请选择"
                                    style="width:250px;"
                                    :options="treeData"
                                    :value-consists-of="valueConsistsOf"
                                    v-model="submit_data.parentId"
                                    :load-options="loadOptions"
                            />
                        </div>
                    </Form-item>
                    <Form-item label="菜单序号:" prop="menuOrder">
                        <InputNumber :min="1" :step="1" style="width: 250px"
                                     v-model="submit_data.menuOrder"></InputNumber>
                        <!-- <Input v-model="submit_data.menuOrder" type="number" placeholder="请输入菜单序号" style="width: 250px"></Input> -->
                    </Form-item>
                    <Form-item label="资源名称:" prop="resourceName">
                        <Input v-model="submit_data.resourceName" placeholder="请输入资源名称" style="width: 250px"></Input>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="菜单等级:" prop="menuLevel">
                        <Select v-model="submit_data.menuLevel" style="width:250px">
                            <Option v-for="item in ModalSelectDatas.menuLevel" :value="item.id" :key="item.id">
                                {{item.id}}
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="菜单图标:" prop="menuIcon">
                        <Input v-model="submit_data.menuIcon" placeholder="请输入图标" style="width: 250px"></Input>
                    </Form-item>
                    <Form-item label="菜单路径:" prop="menuUrl">
                        <Input v-model="submit_data.menuUrl" placeholder="请输入菜单Path" style="width: 250px"></Input>
                    </Form-item>
                    <Form-item label="资源类型:" prop="resourceType">
                        <Select v-model="submit_data.resourceType" style="width:250px">
                            <Option v-for="item in ModalSelectDatas.resourceTypeList" :value="item.value"
                                    :key="item.value">
                                {{item.name}}
                            </Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add_res">确 定</Button>
                <Button type="default" @click="close_modal">取消</Button>
            </div>
        </Modal>
        <Modal v-model="upload_modal_visible" :mask-closable="false" title="上传资源图片" :width="500"
               class-name="customize-modal-center">
            <Row  style="text-align: center">
                <Upload
                        ref="uploadPicRef"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :multiple="false"
                        :before-upload="handleUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        type="drag"
                        :data="uploadPicData"
                        action="/eop/sys/urpr/upload_resource_image"
                        style="display: inline-block;">
                    <div>
                        <div v-if="!row.resourcePicurl" style="width:58px;height:58px;line-height: 58px">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                        <div class="demo-upload-list" v-else>
                            <img :src="img_src">
                        </div>
                    </div>
                </Upload>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="uploadPic">确 定</Button>
                <Button type="default" @click="upload_modal_visible = false">取消</Button>
            </div>
        </Modal>

        <Modal v-model="button_modal_visible" :mask-closable="false" title="设置按钮" :width="700"
               class-name="customize-modal-center">
            <Row>
                 <Button size="small" type="primary" @click="addButton()">新增</Button>
            </Row>
            <Row  style="text-align: center;margin-top:5px;">
                <Table size="small" :columns="BtnColumns" :data="BtnData"></Table>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="saveBtnData()">保存</Button>
                <Button type="default" @click="button_modal_visible = false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import Util from 'libs/util';

    function submit_data() {
        return {
            isLeaf: '',
            menuIcon: '',
            menuLevel: '',
            menuOrder: '',
            menuUrl: '',
            parentId: '',
            resourceName: '',
            resourceType: ''
        }
    }

    function ModalSelectDatas() {
        return {
            isLeaf: [],
            menuLevel: [],
            parentId: [],
            resourceTypeList: [{
                name: '菜单',
                value: 'MENU'
            }]
        }
    }

    function uploadPicData() {
        return {
            imageName: '',       //图片名称	string
            menuUrl: '',         //资源路径	string
        }
    }

    export default {
        name: "resource_list",
        data() {
            return {
                expandType: false,
                ResourceLists: [],
                ResourceList: [],
                modal_visible: false,
                modal_title: '新增资源',
                submit_data: submit_data(),
                ModalSelectDatas: ModalSelectDatas(),
                uploadPicData: uploadPicData(),
                defaultList: [],
                valueConsistsOf: 'BRANCH_PRIORITY',
                rules: {
                    isLeaf: [
                        {required: true, message: '', trigger: 'change'}
                    ],
                    parentId: [
                        {required: true, message: '', trigger: 'change', type: 'number'}
                    ],
                    menuOrder: [
                        {required: true, message: '', trigger: 'blur', type: 'number'}
                    ],
                    resourceName: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    menuLevel: [
                        {required: true, message: '', trigger: 'change', type: 'number'}
                    ],
                    menuIcon: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    menuUrl: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    resourceType: [
                        {required: true, message: '', trigger: 'blur'}
                    ]
                },
                data: [],
                treeData: [],
                columns: [
                    {
                        label: '资源名称',
                        prop: 'resourceName',
                        width: '250px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '资源类型',
                        prop: 'resourceType',
                        width: '100px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '菜单图标',
                        prop: 'menuIcon',
                        width: '100px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '菜单路径',
                        prop: 'menuUrl',
                        width: '150px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '菜单等级',
                        prop: 'menuLevel',
                        width: '80px',
                        align: 'center',
                        headerAlign: 'center',
                    },
                    {
                        label: '创建时间',
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
                upload_modal_visible: false,
                uploadList: [],
                row: {},
                img_src:'',
                button_modal_visible:false,
                current_button_resource_id:0,
                BtnColumns:[
                    {
                        title: '按钮名称',
                        key: 'name',
                        align: 'center',
                        render: (h, params) => {
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: this.BtnData[params.index].name
                                },
                                on: {
                                    'on-blur': (event) => {
                                        this.BtnData[params.index].name = event.target.value;
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '按钮编码',
                        key: 'code',
                        align: 'center',
                        render: (h, params) => {
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: this.BtnData[params.index].code
                                },
                                on: {
                                    'on-blur': (event) => {
                                        this.BtnData[params.index].code = event.target.value;
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '排序号',
                        key: 'orderno',
                        align: 'center',
                        render: (h, params) => {
                        return h('InputNumber', {
                            props: {
                                value: params.row.orderno,
                                min:0
                            },
                            on: {
                                'on-change': (value) => {
                                    params.row.orderno = value
                                    this.BtnData[params.index] = params.row
                                },
                                'on-blur':()=>{
                                
                                }
                            }
                        })
                       }
                    },
                    {
                      title:'操作',
                      key:'operate',
                       render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px',
                            },
                            on: {
                                click: () => {
                                    this.removeButton(params);
                                }
                            }
                        }, '删除')
                    ])
                }
                    }
                ],
                BtnData:[
                    {
                        name:'新增',
                        code:'add',
                        orderno:1
                    }
                ]
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.get_urpr();
            this.GetResourceList();
            this.uploadList = this.$refs.uploadPicRef.fileList;
        },
        computed: {},
        methods: {
            get_urpr() {
                this.request('get_urpr', {
                    data: {
                        role: parseInt(this.userInfo.role[0].roleId),
                        type: 4,
                        min: 0,
                        max: 0
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        this.data = res.data.res.sysResourceList;
                        this.treeData = JSON.parse(JSON.stringify([res.data.res]));
                        this.filterData(this.treeData[0]);
                    }
                })
            },
            filterData(data) {
                this.$set(data, 'children', data.sysResourceList);
                this.$set(data, 'id', data.resourceId);
                this.$set(data, 'label', data.resourceName);
                if (data.children.length > 0) {
                    data.children.map(x => {
                        this.filterData(x);
                    })
                } else {
                    delete data.children
                }
            },
            GetResourceList() {
                this.request('get_urpr_by_type', {data: {type: 4}}, true).then(res => {
                    this.ResourceList = res.data.res;
                    if(this.row.resourceId){
                        this.ResourceList.map(x=>{
                            if(x.resourceId == this.row.resourceId){
                                this.row = x;
                                this.img_src = window.location.origin + '/eop/' + this.row.resourcePicurl;
                            }
                        })
                    }
                    this.jointResourceList();
                })
            },
            jointResourceList() {
                var data = this.ModalSelectDatas;
                this.ResourceList.forEach(x => {
                    if (JSON.stringify(data.isLeaf).indexOf(JSON.stringify(x.isLeaf)) == -1
                    ) {
                        data.isLeaf.push({id: x.isLeaf})
                    }
                    if (JSON.stringify(data.menuLevel).indexOf(JSON.stringify(x.menuLevel)) == -1) {
                        data.menuLevel.push({id: x.menuLevel})
                    }
                    if (JSON.stringify(data.parentId).indexOf(JSON.stringify(x.resourceId)) == -1) {
                        var obj = {};
                        obj.resourceName = x.resourceName;
                        obj.resourceId = x.resourceId;
                        data.parentId.push(obj)
                    }
                })
            },
            openModal(type, row) {
                this.$refs['submit_data'].resetFields();
                if (type == '编辑资源') {
                    this.submit_data.isLeaf = row.isLeaf;
                    this.submit_data.menuLevel = row.menuLevel;
                    this.submit_data.menuIcon = row.menuIcon;
                    this.submit_data.menuOrder = Number(row.menuOrder);
                    this.submit_data.menuUrl = row.menuUrl;
                    this.submit_data.parentId = row.parentId;
                    this.submit_data.resourceName = row.resourceName;
                    this.submit_data.resourceType = row.resourceType;
                    this.submit_data.resourceId = row.resourceId;
                    this.modal_title = type;
                } else {
                    this.submit_data = submit_data();
                }
                this.modal_visible = true;
            },
            openUploadModal(row) {
                this.defaultList = [];
                this.upload_modal_visible = true;
                this.uploadPicData.menuUrl = row.menuUrl;
                this.row = row;
                this.img_src = window.location.origin + '/eop/' + row.resourcePicurl +"?t="+Math.random();
                if(!!row.resourcePicurl){
                    this.defaultList.push(row);
                }
            },
            uploadPic() {
                this.upload_modal_visible = false;
            },
            handleUpload(file) {
                let filename = file.name.toLocaleLowerCase();
                this.uploadPicData.imageName = file.name;
                if (!/\.jpg$|.png$/.test(filename)) {
                    this.$Message.warning('文件类型不符,请重新选择文件');
                    return false
                } else {
                    if (this.defaultList.length >= 1) {
                        this.$Modal.confirm({
                            title: '提示',
                            content: '选中图片是否替换',
                            onOk: () => {
                                this.defaultList.splice(0, 1, file);
                                this.$refs.uploadPicRef.post(this.defaultList[0]);
                            },
                            onCancel: () => {
                                this.$Message.warning('已取消替换');
                            }
                        })
                    } else {
                        this.defaultList.push(file);
                        this.$nextTick(() => {
                            this.$refs.uploadPicRef.post(this.defaultList[0]);
                        })
                    }
                    return false;
                }
            },
            uploadSuccess(res, file) {
                if (res.code == '1') {
                    this.file = null;
                    this.$Message.success(res.msg);
                    this.upload_modal_visible = false;
                    this.get_urpr();
                    this.GetResourceList();
                } else {
                    this.$Message.error({
                        content: res.message,
                        duration: 3
                    });
                }
            },
            uploadError(res, file) {
                this.$Message.error(res.msg + res.data);
            },
            handleRemove(item) {

            },
            close_modal() {
                this.modal_visible = false;
                this.$refs['submit_data'].resetFields();
            },
            res_aud(type, row) {
                var data;
                if (type == 3) {
                    data = {
                        obj: {
                            resourceId: row.resourceId
                        },
                        type: type
                    }
                } else {
                    data = {
                        obj: this.submit_data,
                        type: type
                    }
                }
                this.request('res_aud', {
                    data: data
                }).then(res => {
                    if (res.code == 1) {
                        this.$Message.success(res.msg);
                        this.modal_visible = false;
                        this.get_urpr();
                        this.GetResourceList();
                    }
                })
            },
            add_res() {
                this.$refs["submit_data"].validate((valid) => {
                    if (valid) {
                        var type = '';
                        if (this.modal_title == '新增资源') {
                            type = 1;
                        } else if (this.modal_title == '编辑资源') {
                            type = 2;
                        }
                        this.res_aud(type);
                    } else {
                        this.$Message.warning('请核对表单信息');
                        return false;
                    }
                })
            },
            del_res(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除当前记录？',
                    onOk: () => {
                        this.res_aud(3, row)
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
            //设置按钮
            openButtonModal(row){
                 this.BtnData=[]
                 this.current_button_resource_id = row.resourceId
                 this.getBtnList()
                 this.button_modal_visible = true
            },
            addButton(row){
              this.BtnData.push({
                  name:'',
                  code:'',
                  orderno:null
              })
            },
            removeButton(params){

            let item = params.row
            let index = params.index
            if(item.id){//数据库有记录　需要调用删除接口
             this.$Modal.confirm({
                title: '删除提示',
                content: '确定要删除当前记录？',
                loading: true,
                onOk: () => {
                    this.request('delete_btn_data', {
                        buttonId:item.id
                    }, true).then((res) => {
                        if (res.errno == 0) {
                            this.$Modal.remove();
                            this.$Message.info('删除成功');
                            this.BtnData.splice(index, 1);
                        }
                    })
                }
            });

            }else{
                this.BtnData.splice(index, 1);
            }

            },
            saveBtnData(){
                let data = Util.deepClone(this.BtnData)
                for(let item of data){
                    item.menuid = this.current_button_resource_id
                }

                this.request('update_btn_data',data,'正在保存...').then((res)=>{
                     if(res.errno==0){
                         this.$Message.success(res.data);
                         this.button_modal_visible = false
                     }
                })
            },
            getBtnList(){

                this.request('get_btn_list',{
                    menuId:this.current_button_resource_id
                },false).then((res)=>{
                    this.BtnData = res.data
                })
            }
        }
    }
</script>


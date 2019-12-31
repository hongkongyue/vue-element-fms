<style lang="less">
    #resource_list {

    }
</style>

<template>
    <div class="background-color-white exhibition" id="resource_list">
        <Row>
            <Col class="margin-bottom-10">
            <Button type="primary" @click="openModal('新增')">新增</Button>
            </Col>
            <Col span="24">
            <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    size='mini'
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="text"
      label="资源名称"
      align="left"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="resourceType"
      label="资源类型"
      align="center"
      min-width="100">
      <template slot-scope="scope">
        <span>{{scope.row.resourceType == 0 ? '菜单' : (scope.row.resourceType == 1 ? '按钮' : '列' ) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="icon"
      label="菜单图标"
      align="center"
      min-width="80">
    </el-table-column>
    <el-table-column
      prop="url"
      label="菜单路径"
      align="center"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="resourceLevel"
      label="菜单等级"
      align="center"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="created"
      label="创建时间"
      align="center"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="lastedUpdated"
      label="修改时间"
      align="center"
      min-width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      min-width="250">
      <template slot-scope="scope">
        <el-button @click="openModal('编辑',scope.row)" type="primary" size="small">编辑</el-button>
        <el-button v-if="scope.row.menuLeaf == true" @click="openButtonModal(scope.row)"  size="small">按钮权限</el-button>
        <!-- <el-button v-if="scope.row.menuLeaf == true" @click="openClumnsModal(scope.row)" type="primary" size="small">列权限</el-button> -->
        <el-button @click="deleteTree(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
            </Col>
        </Row>
        <Modal v-model="modal_visible" :mask-closable="false" :title="modal_title" :width="750"
               class-name="customize-modal-center">
            <Form class="addForm" ref="addMenu" :model="submit_data" :label-width="80" inline label-position="right"
                  :rules="rules">
                <Row>
                    <Col span="12">
                    <Form-item label="菜单等级:" prop="menuLevel">
                        <Select v-model="addMenu.menuLevel" :disabled= disabled style="width:250px">
                            <Option v-for="item in newMenuLevel" :value="item" :key="item">
                                {{item}}
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="菜单图标:" prop="menuIcon">
                        <Input v-model="addMenu.menuIcon" placeholder="请输入图标" style="width: 250px"></Input>
                    </Form-item>
                     <Form-item label="资源名称:" prop="resourceName">
                        <Input v-model="addMenu.resourceName" placeholder="请输入资源名称" style="width: 250px"></Input>
                    </Form-item>
                    <Form-item label="菜单属性:" prop="resourceStatus">
                        <Input v-model="addMenu.resourceStatus" placeholder="请输入菜单属性" style="width: 250px"></Input>
                    </Form-item>
                    <!-- <Form-item label="菜单节点:" prop="isLeaf">
                        <Select v-model="submit_data.isLeaf" style="width:250px">
                            <Option v-for="item in ModalSelectDatas.isLeaf" :value="item.id" :key="item.id">
                                {{item.id}}
                            </Option>
                        </Select>
                    </Form-item> -->
                    
                    </Col>
                    <Col span="12">
                    <Form-item  label="上级菜单:" prop="parentId">
                        <div class="tree">
                            <treeselect
                                    placeholder=""
                                    style="width:250px;"
                                    :options="treeData"
                                    :disabled= disabled
                                    :load-options="loadOptions"
                                    v-model="addMenu.parentId"
                                    :normalizer="normalizer"
                            />
                        </div>
                    </Form-item>
                    <Form-item label="菜单路径:" prop="menuUrl">
                        <Input v-model="addMenu.menuUrl" placeholder="请输入菜单Path" style="width: 250px"></Input>
                    </Form-item>
                    <Form-item label="资源类型:" prop="resourceType">
                        <Select v-model="addMenu.resourceType" style="width:250px">
                            <Option v-for="item in newMenuTypeList" :value="item.value"
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
                <Button type="default" @click="close_modal">取 消</Button>
            </div>
        </Modal>
       
        <Modal v-model="addMenuVisible" :mask-closable="false" @on-cancel="closeAddMenu" title="设置按钮" :width="700"
               class-name="customize-modal-center">
            <Row>
                {{'按钮名称：'}}
                <Input v-model="addBtnData" placeholder="请输入按钮名称" style="width: 150px;margin-right:20px"></Input>
                    
                 <Button type="primary" @click="addButton()">新增</Button>
            </Row>
            <Row  style="text-align: center;margin-top:5px;">
                <!-- <Table size="small" :columns="BtnColumns" :data="BtnData"></Table> -->
                <el-table
      :data="AddtableData"
      size='mini'
      style="width: 100%">
      <el-table-column
        prop="resourceName"
        label="按钮名称"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="resourceCode"
        label="按钮编码"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        min-width="180">
        <template slot-scope="scope">
        <el-button @click="deleteMenu(scope.row)" type="danger" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
            </Row>
            <div slot="footer">
                <Button type="default" @click="closeAddMenu">关闭</Button>
            </div>
        </Modal>

        <Modal v-model="addClumnsVisible" :mask-closable="false" @on-cancel="closeClumns" title="设置列表" :width="700"
               class-name="customize-modal-center">
            <Row>
                {{'列表名称：'}}
                <Input v-model="Clumnsname" placeholder="请输入列表名称" style="width: 150px;margin-right:20px"></Input>
                    
                 <Button type="primary" @click="addClumns()">新增</Button>
            </Row>
            <Row  style="text-align: center;margin-top:5px;">
                <!-- <Table size="small" :columns="BtnColumns" :data="BtnData"></Table> -->
                <el-table
      :data="AddClumnsData"
      size='mini'
      style="width: 100%">
      <el-table-column
        prop="resourceName"
        label="列表名称"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="resourceCode"
        label="列表编码"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        min-width="180">
      </el-table-column>
    </el-table>
            </Row>
            <div slot="footer">
                <Button type="default" @click="closeClumns">关闭</Button>
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
                disabled:false,
                addClumnsVisible:false,
                Clumnsname:'',
                ClumnsnameData:{},
                AddClumnsData:[],
                addMenuVisible:false,
                addBtnData:'',
                menuRow:{},
                clumnsRow:{},
                AddtableData: [],
                addMenu:{},//新增
                newMenuLevel:[1,2,3,4,5],
                newMenuTypeList:[{value:0,name:'菜单'}],
              tableData: [],
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
                    resourceStatus:[
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
                normalizer(node) {
                    return {
                    label: node.text,
                    id:node.code
                }
            },
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
          this.getTableData() //获取主数据
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.get_urpr();
            this.GetResourceList();
        },
        computed: {},
        methods: {
            //删除按钮
            deleteMenu(row){
                console.log(row,'76890')
                this.$confirm('该条数据将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let data = {}
            data.codeList = [row.resourceCode]
            this.request('resource_removeBatchId', data, true).then(res => {
          if (res.code==1) {
            this.getBTNData()
           
               this.$message({
            type: 'success',
            message: '删除成功!'
          });
            }else{
                this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        deleteTree(row){
                console.log(row,'76890')
                this.$confirm('该条数据将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let data = {}
            data.codeList = [row.code]
            this.request('resource_removeBatchId', data, true).then(res => {
          if (res.code==1) {
            this.getTableData()
             this.tokenDirectLogin()
               this.$message({
            type: 'success',
            message: '删除成功!'
          });
            }else{
                this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
            },
            closeAddMenu(){
                this.addMenuVisible = false
                this.addBtnData = ''
            },
            closeClumns(){
                this.addClumnsVisible = false
                this.clumnsRow = {}
            },
          getTableData(){ //
          let data = {}
          this.request('menuResource', data, true).then(res => {
          if (res.code==1) {
            this.tableData = res.data
            }
          })
          },
          handleClick(row){
            console.log(row,'098765354668790-')
          },
            get_urpr() {
                // this.request('get_urpr', {
                //     data: {
                //         role: parseInt(this.userInfo.role[0].roleId),
                //         type: 4,
                //         min: 0,
                //         max: 0
                //     }
                // }, true).then(res => {
                //     if (res.code == 1) {
                //         this.data = res.data.res.sysResourceList;
                //         this.treeData = JSON.parse(JSON.stringify([res.data.res]));
                //         this.filterData(this.treeData[0]);
                //     }
                // })
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
                // this.request('get_urpr_by_type', {data: {type: 4}}, true).then(res => {
                //     this.ResourceList = res.data.res;
                //     if(this.row.resourceId){
                //         this.ResourceList.map(x=>{
                //             if(x.resourceId == this.row.resourceId){
                //                 this.row = x;
                //                 this.img_src = window.location.origin + '/eop/' + this.row.resourcePicurl;
                //             }
                //         })
                //     }
                //     this.jointResourceList();
                // })
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
                console.log(type, row)
                this.$refs['addMenu'].resetFields();
                if (type == '编辑') {
                    this.modal_title = '修改资源',
                    this.disabled = true
                    this.addMenu.menuLevel = row.resourceLevel
                    this.addMenu.menuIcon = row.icon
                    this.addMenu.resourceName = row.text
                    this.addMenu.resourceStatus = row.resourceFrontPath
                    this.addMenu.parentId = row.parentCode
                    this.addMenu.menuUrl = row.url
                    this.addMenu.resourceType = row.resourceType
                    this.addMenu.id = row.id
                } else {
                    this.modal_title = '新增资源',
                    this.disabled = false
                    this.addMenu = {}
                }
                let data = {}
                this.request('previousMenus', data, true).then(res => { 
                if (res.code==1) {
                    console.log(res.data,'987543434567890')
                    this.treeData = [res.data]
                  }
              })
                this.modal_visible = true;
            },
            
            handleRemove(item) {

            },
            close_modal() {
                this.modal_visible = false;
                this.$refs['addMenu'].resetFields();
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
                console.log(this.disabled,this.modal_title,'567890')
                console.log(this.addMenu,'567890-')
                let data = {}
                data.resourceName = this.addMenu.resourceName //资源名称
                data.resourceLevel = this.addMenu.menuLevel //资源级别
                data.resourceType = this.addMenu.resourceType //资源类型
                data.resourceUrlPath = this.addMenu.menuUrl //资源URl
                data.parentResourceCode = this.addMenu.parentId //父类资源节点
                data.resourceFrontPath = this.addMenu.resourceStatus//菜单属性
                data.resourceIcon = this.addMenu.menuIcon //资源icon
                //resource_add
                if(this.modal_title == '新增资源'){ //新增
                    this.request('resource_add', data, true).then(res => {
                    if (res.code==1) {
                        this.modal_visible = false;
                        this.$message.success(res.msg)
                        this.getTableData()
                        this.tokenDirectLogin()
                        // setTimeout(()=>{
                        //     location.reload()
                        // },1500)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                }else{ //修改
                    data.id = this.addMenu.id
                    this.request('resource_update', data, true).then(res => {
                    if (res.code==1) {
                        this.modal_visible = false;
                        this.$message.success(res.msg)
                        this.getTableData()
                        this.tokenDirectLogin()
                        // setTimeout(()=>{
                        //     location.reload()
                        // },1500)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                }
                // this.$refs["submit_data"].validate((valid) => {
                //     if (valid) {
                //         var type = '';
                //         if (this.modal_title == '新增资源') {
                //             type = 1;
                //         } else if (this.modal_title == '编辑资源') {
                //             type = 2;
                //         }
                //         this.res_aud(type);
                //     } else {
                //         this.$Message.warning('请核对表单信息');
                //         return false;
                //     }
                // })
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
                console.log(row,'we6rtyui')
                this.menuRow = row
                //获取按钮列表
                this.getBTNData()
                 this.addMenuVisible = true
            },
            getBTNData(){
                console.log(this.menuRow)
                let data = {}
                data.parentResourceCode = this.menuRow.code //菜单code
                data.resourceType = 1
                this.request('resource_difference', data, true).then(res => {
                    if (res.code==1) {
                        this.AddtableData = res.data
                    }
                })
            },
            //设置列
            openClumnsModal(row){
                console.log(row,'we6rtyui')
                this.clumnsRow = row
                //获取按钮列表
                this.getClumsData()
                 this.addClumnsVisible = true
            },
            getClumsData(){
                let data = {}
                data.parentResourceCode = this.clumnsRow.code //菜单code
                data.resourceType = 2
                this.request('resource_difference', data, true).then(res => {
                    if (res.code==1) {
                        this.AddClumnsData = res.data
                    }
                })
            },
            addButton(){
                if(this.addBtnData.length == 0){
                    this.$message.error('请先输入按钮名称再新增！')
                }else{
                    let data = {}
              console.log(this.menuRow,'4356890')
              data.resourceName = this.addBtnData //资源名称
              data.resourceLevel = this.menuRow.resourceLevel + 1 //等级
              data.resourceType = 1
              data.parentResourceCode = this.menuRow.code //
              this.request('resource_add', data, true).then(res => {
                    if (res.code==1) {
                        this.$message.success(res.msg)
                        this.getBTNData()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                }
            },
            addClumns(){
                if(this.Clumnsname.length == 0){
                    this.$message.error('请先输入列表名称再新增！')
                }else{
                    let data = {}
              data.resourceName = this.Clumnsname //资源名称
              data.resourceLevel = this.clumnsRow.resourceLevel + 1 //等级
              data.resourceType = 2
              data.parentResourceCode = this.clumnsRow.code //
              this.request('resource_add', data, true).then(res => {
                    if (res.code==1) {
                        this.$message.success(res.msg)
                        this.getClumsData()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                }
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
            },
            //
             tokenDirectLogin(){
                      this.request('sys_user_loginByToken', {
                      }, false).then((res) => {
                        if (res.code !=1) {
                            this.$Message.error(res.msg);
                        } else {
                            window.sessionStorage.setItem('userAccount', res.data.userName);
                            window.sessionStorage.setItem('token', res.data.token);
                            window.sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                            window.localStorage.setItem('userinfo', JSON.stringify(res.data));
                            this.$store.commit('initMenuList');
                        }
                    });
        },
        }
    }
</script>


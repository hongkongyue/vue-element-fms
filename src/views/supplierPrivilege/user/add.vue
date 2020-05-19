<template>
    <div>
        <header class="headerstyle">
            <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
                <el-form-item label="账号：" size="small">
                    <el-input v-model="formSearch.code" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="人员名称：" size="small">
                    <!-- <el-input  v-model="formSearch.name"></el-input> -->
                    <el-select v-model="formSearch.userName" placeholder="请选择" style="width:150px" filterable>
                        <el-option v-for="v in staffSelectList" :disabled="v.used == 0" :key="v.id" :label="v.name"
                                   :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="部门：" size="small">
                    <el-input v-model="formSearch.bm"></el-input>
                </el-form-item>
                <el-form-item label="岗位：" size="small">
                    <el-input v-model="formSearch.gw"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" size="small">
                    <el-input v-model="formSearch.phone"></el-input>
                </el-form-item>
                <el-form-item label="绑定邮箱：" size="small">
                    <el-input v-model="formSearch.email"></el-input>
                </el-form-item> -->
                <el-form-item label="状态：" size="small">
                    <el-select v-model="formSearch.status" placeholder="请选择" style="width:100px" filterable>
                        <el-option label="锁定" value="2"></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="onSave">保存</el-button>
                </el-form-item>
                <!-- <el-form-item   size="small">
                   <el-button   size="small" type="primary" @click="onReset">重置密码</el-button>
               </el-form-item>
               <el-form-item   size="small">
                   <el-button   size="small" type="default" @click="unLock">解锁</el-button>
               </el-form-item>
                <el-form-item   size="small">
                   <el-button   size="small" type="primary" @click="weChat">微信解绑</el-button>
               </el-form-item> -->
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="goBlack">返回上一页</el-button>
                </el-form-item>
            </el-form>
        </header>
        <section class="middle" :style="{minHeight:showBink?'740px':'530px'}">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
                <el-tab-pane label="分配角色" name="first">
                    <el-form :inline="true" :model="formAdd" class="demo-form-inline ">
                        <el-form-item label="角色名称：" size="small">
                            <el-select v-model="formAdd.userName" placeholder="请选择" style="width:150px" filterable>
                                <el-option v-for="v in userNameList" :disabled="v.used == 0" :key="v.id" :label="v.name"
                                           :value="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item size="small">
                            <el-button size="small" type="primary" @click="addUserName">添加角色</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                            ref="multipleTable"
                            :data="userList"
                            style="width: 100%"
                            class="pointer"
                            border
                            tooltip-effect="dark"
                            max-height="650"
                            highlight-current-row
                            @row-dblclick="onEdit"
                    >
                        <el-table-column
                                type="index"
                                width="55"
                                label="序号"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="角色编码"
                                min-width="120"
                                align="center"
                        >
                            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="角色名称"
                                min-width="120"
                                align="center"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注"
                                min-width="120"
                                align="center"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                align="center"
                                label="操作"
                                min-width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClickDelete(scope.$index)" type="primary" size="small">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="角色包含权限" name="second">
                    <el-tree :data="dataUser" :props="defaultPropsQ" @node-click="handleNodeClick"></el-tree>
                </el-tab-pane>
                <!-- <el-tab-pane label="分配公司" name="third">
                     <div style="text-align: center">
                      <el-transfer
                        style="text-align: left; display: inline-block"
                        v-model="valueCompany"
                        :props="{
                          key: 'id',
                          label: 'name'
                        }"
                        filterable
                        :render-content="renderFunc"
                        :titles="['待分配公司', '已分配公司']"
                        :button-texts="['撤销分配', '分配']"
                        :format="{
                          noChecked: '${total}',
                          hasChecked: '${checked}/${total}'
                        }"
                        @change="handleChangeCompany"
                        :data="datags">
                      </el-transfer>
                    </div>
                </el-tab-pane> -->
                <!--
                                    <el-tab-pane label="分配品牌" name="fourth">
                                        <div style="text-align: center">
                                          <el-transfer
                                            style="text-align: left; display: inline-block"
                                            v-model="valueBrand"
                                            :props="{
                                              key: 'id',
                                              label: 'name'
                                            }"
                                            filterable
                                            :render-content="renderFunc"
                                            :titles="['待分配品牌', '已分配品牌']"
                                            :button-texts="['撤销分配', '分配']"
                                            :format="{
                                              noChecked: '${total}',
                                              hasChecked: '${checked}/${total}'
                                            }"
                                            @change="handleChangeBrand"
                                            :data="dataPP">
                                          </el-transfer>
                                        </div>
                                    </el-tab-pane> -->
                <!-- <el-tab-pane label="分配店铺" name="five">
                    <tree-transfer :title="titleDP" :from_data='fromData' :button_text='["分配 ","撤销分配"]' :to_data='toData' :defaultProps="defaultPropsDp" @addBtn='addStore'
                        @removeBtn='removeStore' :mode='mode' height='540px' filter openAll>
                    </tree-transfer>
                </el-tab-pane> -->
            </el-tabs>
        </section>
        <Modal v-model="visible" @on-cancel="cancelvisible" :width="250" class-name="customize-modal-center"
               title="当前用户密码">
            <div>{{this.Password}}</div>
            <div slot="footer">
                <Button type="default" @click="cancelvisible">取消</Button>
                <Button type="primary" @click="cancelvisible">确定</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
    import filters from '../../../filter/'
    import treeTransfer from 'el-tree-transfer' // 引入

    import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce],
        data() {
            return {
                idString: '',
                userList: [],
                userNameList: [],
                dataUser: [],//角色包含权限
                dataPP: [],
                datags: [],
                valueBrand: [],
                valueCompany: [],
                valueStore: [],
                activeName: 'first',
                staffSelectList: [],
                Password: null,//密码
                visible: false,
                formAdd: {},
                formSearch: {
                    id: this.$route.query.id,
                    code: '',
                    name: '',
                    status: '',
                },
                platformList: [],//工号
                statusList: [
                    {value: '0', name: '禁用'},
                    {value: '1', name: '启用'},
                    {value: '2', name: '锁定'},
                ],//用户名
                brandList: [],//部门
                shopList: [],//岗位
                list: [],//列表数组
                data: [{   //角色包含权限
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultPropsQ: {
                    children: 'children',
                    label: 'text'
                },
                defaultPropsDp: {
                    label: 'text',
                },

                mode: "transfer", // transfer addressList
                fromData: [
                    {
                        id: "1",
                        pid: 0,
                        label: "一级 1",
                        children: [
                            {
                                id: "1-1",
                                pid: "1",
                                label: "二级 1-1",
                                disabled: true,
                                children: []
                            },
                            {
                                id: "1-2",
                                pid: "1",
                                label: "二级 1-2",
                                children: [
                                    {
                                        id: "1-2-1",
                                        pid: "1-2",
                                        children: [],
                                        label: "二级 1-2-1"
                                    },
                                    {
                                        id: "1-2-2",
                                        pid: "1-2",
                                        children: [],
                                        label: "二级 1-2-2"
                                    }
                                ]
                            }
                        ]
                    },
                ],
                toData: [],
                titleGS: ['待分配公司', '已分配公司'],
                titlePP: ['待分配品牌', '已分配品牌'],
                titleDP: ['待分配店铺', '已分配店铺'],
                newCodePrefix: "suser", //用户编码前缀
                newCodeLength: 5, //用户流水号最大长度
            }
        },
        mounted() {
            //   this.getAllValueList()//获取所有分配权限
            this.getStaff()
            // this.getDataUser()//获取角色包含权限
            this.getUserName()//角色下拉列表
            this.getUserCode()//获得系统后台生成的用户编码
            //   this.getAllUserList()

        },
        methods: {  //userMapping_allocation
            getUserCode(){
                let data = {}
                let autoCodeParam = {prefix:this.newCodePrefix, numLength:this.newCodeLength}
                this.request('auto_create_biz_code', autoCodeParam, true).then(res => {
                    if (res.code == 1) {
                        this.formSearch.code = res.data
                    }
                })
            },
            getStaff() {
                this.request('basic_supplier_staff_selector', {}, false).then(res => {
                    if (res.code == 1) {
                        this.staffSelectList = res.data
                    }
                })
            },
            handleClick(a) {
                if (a == 'second') {
                    this.getDataUser()
                } else if (a == 'third') {
                    this.getCompanyName()
                } else if (a == 'fourth') {
                    this.getBrandList()//获取所有品牌
                } else if (a == 'five') {
                    this.getGroupByPlatform()//获取所有店铺
                }
            },
            getGroupByPlatform() {
                let data = {}
                this.request('getGroupByPlatform', data, true).then(res => {
                    if (res.code == 1) {
                        this.fromData = res.data
                    }
                })
            },
            addStore(fromData, toData, obj) {
                console.log(fromData, toData, obj)
                let Liat = []
                toData.map(function (item) {
                    item.children.map(function (i) {
                        Liat.push(i.id)
                    })
                })
                let data = {}
                data.userId = this.$route.query.id
                data.allocationType = 'store'
                data.allocationIds = Liat
                this.request('userMapping_allocation', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            removeStore(fromData, toData, obj) {
                console.log(obj.keys)
                let Liat = []
                toData.map(function (item) {
                    item.children.map(function (i) {
                        Liat.push(i.id)
                    })
                })
                let data = {}
                data.userId = this.$route.query.id
                data.allocationType = 'store'
                data.allocationIds = Liat
                this.request('userMapping_allocation', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //删除
            handleClickDelete(index) {
                this.userList.splice(index, 1)
            },
            //角色包含权限
            getDataUser() {
                let vars = {}
                vars.id = this.$route.query.id
                this.requestWithUriVars('basicsupplieruser_basic_supplier_user_getPermissionByCurrentUser', vars, null, false).then(res => {
                    if (res.code == 1) {
                        this.dataUser = res.data.children
                    }
                })
            },
            getCompanyName() {
                let data = {}
                this.request('masterData_company_all', data, true).then(res => {
                    if (res.code == 1) {
                        this.datags = res.data
                    }
                })
            },
            getBrandList() {
                let data = {}
                this.request('masterData_brand_all', data, true).then((res) => {
                    if (res.code == 1) {
                        this.dataPP = res.data
                    }
                })
            },
            getAllValueList() {
                let data = {}
                data.userId = this.$route.query.id
                this.request('userMapping_getAllocation', data, true).then(res => {
                    if (res.code == 1) {
                        let company = []
                        let Brand = []
                        res.data.companyList.map(function (item) {
                            company.push(item.id)
                        })
                        res.data.brandList.map(function (item) {
                            Brand.push(item.id)
                        })
                        this.valueCompany = company
                        this.valueBrand = Brand
                        this.toData = res.data.storeList
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //获取公司分配权限
            handleChangeCompany(value, direction, movedKeys) {
                let data = {}
                data.userId = this.$route.query.id
                data.allocationType = 'company'
                data.allocationIds = value
                this.request('userMapping_allocation', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //获取品牌分配权限
            handleChangeBrand(value, direction, movedKeys) {
                let data = {}
                data.userId = this.$route.query.id
                data.allocationType = 'brand'
                data.allocationIds = value
                this.request('userMapping_allocation', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //获取用户所有列表
            getAllUserList() {
                let vars = {}
                vars.id = this.$route.query.id
                this.requestWithUriVars('basicsupplieruser_basic_supplier_user_getRoleByCurrentUser', vars, null, true).then(res => {
                    if (res.code == 1) {
                        this.userList = res.data
                        let IDlist = []
                        let idString = ''
                        this.userList.map(function (item) {
                            IDlist.push(item.id)
                        })
                        idString = IDlist.join(",");
                        console.log(IDlist, 'dsfkl;kjhgfytu65342567897563244567', idString)
                        this.idString = idString
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //添加角色  basic_role_add
            getObj(id) {
                for (let i = 0, len = this.userNameList.length; i < len; i++) {
                    if (this.userNameList[i].id == id) {
                        return this.userNameList[i]
                    }
                }
            },
            addUserName() {
                for (let i = 0, len = this.userList.length; i < len; i++) {
                    if (this.userList[i].id == this.formAdd.userName) return this.$message.error('人员重复')
                }
                this.userList.push(this.getObj(this.formAdd.userName))
                console.log(this.userList)
            },
            //获取分配角色下拉列表
            getUserName() {
                let data = {}
                this.request('basicsupplierrole_basic_supplier_rol_selector', data, true).then(res => {
                    if (res.code == 1) {
                        this.userNameList = res.data
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            //保存
            getName(id) {
                for (let i = 0, len = this.staffSelectList.length; i < len; i++) {
                    if (this.staffSelectList[i].id == id) {
                        return this.staffSelectList[i].name
                    }
                }
            },
            onSave() {
                let arr = [];
                for (let i = 0, len = this.userList.length; i < len; i++) {
                    arr.push(this.userList[i].id)
                }
                let data = {}
                data.userCode = this.formSearch.code
                data.supplierStaffId = this.formSearch.userName
                data.supplierStaffName = this.getName(this.formSearch.userName)
                data.status = this.formSearch.status
                data.roleIds = arr
                if(!data.supplierStaffId)return this.$message.error('人员不能为空')
                this.request('basicsupplieruser_basic_supplier_user_add', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.visible = true
                        this.Password = res.data
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            cancelvisible() {
                this.Password = null
                this.visible = false
                this.$router.push({
                    name: 'supply_user_list'
                })
            },
            //重置密码
            onReset() {
                let vars = {}
                vars.id = this.$route.query.id
                this.requestWithUriVars('basicsupplieruser_basic_supplier_user_reBuildPwd', vars, null, false).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.visible = true
                        this.Password = res.data
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            goBlack() {
                this.$router.push({
                    name: 'supply_user_list',
                })
            },
            //解锁
            unLock() {
                let vars = {}
                vars.id = this.$route.query.id
                this.requestWithUriVars('basicsupplieruser_basic_supplier_user_unLock', vars, null, false).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.formSearch.status = '1'
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            weChat() {
                let vars = {}
                vars.id = this.$route.query.id
                this.requestWithUriVars('basicsupplieruser_basic_supplier_user_unBindWx', vars, null, false).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        // this.formSearch.status = '1'
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            getData() {

            },

            // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
            changeMode() {
                if (this.mode == "transfer") {
                    this.mode = "addressList";
                } else {
                    this.mode = "transfer";
                }
            },
            // 监听穿梭框组件添加
            add(fromData, toData, obj) {
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            },
            // 监听穿梭框组件移除
            remove(fromData, toData, obj) {
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                console.log("fromData:", fromData);
                console.log("toData:", toData);
                console.log("obj:", obj);
            }
        },
        components: {treeTransfer} // 注册
    }
</script>
<style scoped="scoped" lang="less">
    .headerstyle, .main, .middle, .footer {
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
    .el-table__body tr.current-row > td {
        background-color: #f19944 !important;
        /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
    }

    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #f19944;
        /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
    }


</style>
<style>
    .el-transfer-panel {
        width: 350px;
        height: 500px;
    }

    .el-transfer-panel__list.is-filterable {
        height: 400px;
    }
</style>
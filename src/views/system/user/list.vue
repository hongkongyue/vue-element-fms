<style lang="less">
    @import './list.less';

    #user_list .vue-treeselect__menu {
        z-index: 999;
    }
</style>

<template>
    <div class="background-color-white exhibition" id="user_list">
        <Row class="margin-bottom-10">
            <Col span="24" class="search">
            <Form :model="formSearch" ref="submit_data" :label-width="80" inline label-position="right"
                  @keydown.native.enter.prevent="search(formSearch)">
                <Form-item label="用户:" :label-width="50">
                    <Input v-model="formSearch.user_account" placeholder="请输入用户" style="width: 150px"></Input>
                </Form-item>
                <Form-item label="手机号:">
                    <Input v-model="formSearch.phone_no" placeholder="请输入手机号"></Input>
                </Form-item>
                <Form-item label="邮箱">
                    <Input v-model="formSearch.mail" placeholder="请输入邮箱地址"></Input>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search(formSearch)" icon="ios-search">搜索</Button>
                    <Button type="primary" @click="handleReset(formSearch)">重置</Button>
                </Form-item>
                <Form-item label="部门:" style="display: block" :label-width="50">
                    <div class="tree">
                        <treeselect
                                style="width:750px;"
                                placeholder="请选择"
                                :multiple="true"
                                :options="orgList"
                                :value-consists-of="valueConsistsOf"
                                @input="searchInput"
                                v-model="formSearch.org_list"
                                :load-options="loadOptions"
                        />
                    </div>
                </Form-item>
                <Form-item label="岗位:" :label-width="50">
                    <Select multiple v-model="formSearch.post_list" style="width:750px">
                        <Option v-for="item in postList" :value="item.id" :key="item.id">
                            {{item.label}}
                        </Option>
                    </Select>
                </Form-item>
            </Form>
            </Col>
            <Col span="24">
            <Button type="primary" @click="open_modal('新增用户')">新增</Button>
            <Button type="primary" @click="resetpwd">重置密码</Button>
            </Col>
        </Row>
        <Row>
            <Col class="margin-bottom-10">
            <Table size="small" highlight-row :columns="userList_columns" :data="userList"
                   @on-current-change="userListRowClick"></Table>
            </Col>
            <Col>
            <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator
                  @on-change="CurrentChange" @on-page-size-change="SizeChange"></Page>
            </Col>
        </Row>
        <Modal v-model="modal_visible" :mask-closable="false" :title="modal_title" :width="750"
               class-name="customize-modal-center">
            <Form class="addForm" ref="submit_data" :model="submit_data" :label-width="80" inline label-position="right"
                  :rules="rules">
                <Row>
                    <div v-if="modal_title == '查看用户'">
                        <Col span="12">
                        <Form-item label="账户:" style="display: block">
                            {{submit_data.user_account}}
                        </Form-item>
                        <Form-item label="部门:" style="display: block">
                            {{submit_data.org_name}}
                        </Form-item>
                        <Form-item label="邮箱:" style="display: block">
                            {{submit_data.mail}}
                        </Form-item>
                        <Form-item label="备注:" style="display: block">
                            {{submit_data.remark}}
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item label="用户名:" style="display: block">
                            {{submit_data.user_name}}
                        </Form-item>
                        <Form-item label="岗位:" style="display: block">
                            {{submit_data.post_name}}
                        </Form-item>
                        <Form-item label="手机号:" style="display: block">
                            {{submit_data.mail}}
                        </Form-item>
                         <Form-item label="是否启用:">
                                　 <RadioGroup v-model="submit_data.is_active">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                        </Form-item>
                        </Col>
                    </div>
                    <div v-else>
                        <Col span="12">
                        <Form-item label="账户:" prop="user_account">
                            <div v-if="modal_title == '编辑用户'">
                                {{submit_data.user_account}}
                            </div>
                            <div v-else>
                                <Input v-model="submit_data.user_account" placeholder="请输入账号"
                                       style="width: 250px"></Input>
                            </div>
                        </Form-item>
                        <Form-item label="密码:" prop="pwd" v-if="modal_title == '新增用户'">
                            <Input v-model="submit_data.pwd" type="password" placeholder="请输入密码."
                                   style="width: 250px"></Input>
                        </Form-item>
                        <Form-item label="部门:" prop="org_list">
                            <div class="tree">
                                <treeselect
                                        placeholder="请选择"
                                        style="width:250px;"
                                        :multiple="true"
                                        :options="orgList"
                                        :value-consists-of="valueConsistsOf"
                                        @input="searchInput"
                                        v-model="submit_data.org_list"
                                        :load-options="loadOptions"
                                />
                            </div>
                        </Form-item>
                        <Form-item label="邮箱:" prop="mail">
                            <Input v-model="submit_data.mail" placeholder="请输入邮箱地址" style="width: 250px"></Input>
                        </Form-item>
                        <Form-item label="备注:">
                            <Input v-model="submit_data.remark" placeholder="请输入备注" style="width: 250px"></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item label="用户名:" prop="user_name">
                            <Input v-model="submit_data.user_name" placeholder="请输入用户名" style="width: 250px"></Input>
                        </Form-item>
                        <Form-item label="再次确认:" prop="checkPwd" v-if="modal_title == '新增用户'">
                            <Input v-model="submit_data.checkPwd" style="width: 250px" type="password"
                                   placeholder="请再次输入密码"></Input>
                        </Form-item>
                        <Form-item label="岗位:" prop="post_list">
                            <Select v-model="submit_data.post_list" multiple style="width:250px">
                                <Option v-for="item in postList" :value="item.post_id" :key="item.post_id">
                                    {{item.label}}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="手机号:" prop="phone_no">
                            <Input v-model="submit_data.phone_no" placeholder="请输入手机号码" style="width: 250px"></Input>
                        </Form-item>
                         <Form-item label="是否启用:">
                                　 <RadioGroup v-model="submit_data.is_active">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                        </Form-item>
                        </Col>
                    </div>
                </Row>
            </Form>
            <Row class="margin-bottom-10" v-if="modal_title != '查看用户'">
                <Button type="primary" @click="addRole">新增角色</Button>
            </Row>
            <Row>
                <div v-if="modal_title=='查看用户'">
                    <Table size="small" :columns="role_columns_view" :data="submit_data.role_list"></Table>
                </div>
                <div v-else>
                    <Table size="small" :columns="role_columns" :data="submit_data.role_list"></Table>
                </div>
            </Row>
            <div slot="footer" v-if="modal_title != '查看用户'">
                <Button type="primary" @click="add_user">确 定</Button>
                <Button type="default" @click="close_modal">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // import the component
    import treeselect from '@riophae/vue-treeselect'
    // import the styles
    import Util from 'libs/util'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import Vue from 'vue'

    var org_name = Vue.extend({
        props: ['params'],
        template: `
        <div v-if="!!params.row.org_name">
          <Tooltip placement="right">
            <div style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{params.row.org_name}}</div>
            <div slot="content" style="white-space: normal">
                <span>{{params.row.org_name}}</span>
            </div>
          </Tooltip>
        </div>
    `
    })

    var post_name = Vue.extend({
        props: ['params'],
        template: `
      <div v-if="!!params.row.post_name">
        <Tooltip placement="right">
          <div style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{params.row.post_name}}</div>
          <div slot="content" style="white-space: normal">
              <span>{{params.row.post_name}}</span>
          </div>
        </Tooltip>
      </div>
    `
    })

    var role_name = Vue.extend({
        props: ['params'],
        template: `
      <div v-if="!!params.row.org_name">
        <Tooltip placement="right">
          <div style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{params.row.role_name}}</div>
          <div slot="content" style="white-space: normal">
              <span>{{params.row.role_name}}</span>
          </div>
        </Tooltip>
      </div>
    `
    })


    function formSearch() {
        return {
            mail: '',
            user_account: '',
            org_list: [],
            post_list: [],
            phone_no: ''
        }
    }

    function submit_data() {
        return {
            mail: '',          //邮箱,
            org_list: [],      //部门ID列表
            phone_no: '',      //电话号码
            post_list: [],     //岗位列表
            pwd: '',           //密码
            checkPwd: '',      //再次验证密码
            user_account: '',  //账号
            user_name: '',     //用户名
            remark: '',   //备注
            is_active:'1',      //是否启用
            role_list: [
                {
                    roleId: '',
                    roleName: ''
                }
            ],     //角色ID列表
        }
    }

    export default {
        name: 'user_list',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.submit_data.checkPwd !== '') {
                        this.$refs.submit_data.validateField('checkPwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.submit_data.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userList_columns: [
                    {
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '帐号',
                        key: 'user_account',
                        minWidth: 200,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'user_name',
                        minWidth: 100,
                        align: 'center'
                    },
                    {
                        title: '部门',
                        key: 'org_name',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h(org_name, {
                                props: {
                                    params: params,
                                }
                            })
                        }
                    },
                    {
                        title: '岗位',
                        key: 'post_name',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h(post_name, {
                                props: {
                                    params: params,
                                }
                            })
                        }
                    },
                    {
                        title: '角色',
                        key: 'role_name',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h(role_name, {
                                props: {
                                    params: params,
                                }
                            })
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        minWidth: 200,
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
                                            this.open_modal('查看用户', params);
                                        }
                                    }
                                }, '查看'),
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
                                            this.open_modal('编辑用户', params);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete_user();
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                //列表数据
                userList: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 10,
                //当前页码
                page: 1,
                //搜索表单
                formSearch: formSearch(),
                valueConsistsOf: 'BRANCH_PRIORITY',
                modal_title: '',
                modal_visible: false,
                submit_data: submit_data(),       //新增用户
                rules: {                                //表单规则
                    user_account: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    org_list: [
                        {required: true, message: '', trigger: 'change', type: 'array'}
                    ],
                    user_name: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    post_list: [
                        {required: true, message: '', trigger: 'change', type: 'array'}
                    ],
                    pwd: [
                        {required: true, message: '', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPwd: [
                        {required: true, message: '', trigger: 'blur'},
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    mail: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    phone_no: [
                        {required: true, message: '', trigger: 'blur'},
                        {min: 11, max: 11, message: '', trigger: 'blur'}
                    ]
                },
                role_columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色',
                        key: 'roleId',
                        width: 250,
                        align: "center",
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: this.submit_data.role_list[params.index].roleId
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            var selected = this.roleList.filter(x => {
                                                if (x.roleId == value) {
                                                    return x
                                                }
                                            })
                                            this.submit_data.role_list[params.index].roleName = selected[0].remark;
                                            this.submit_data.role_list[params.index].roleId = value;
                                        }
                                    }
                                },
                                this.roleList.map(function (item) {
                                    return h('Option', {
                                        props: {value: item.roleId, disabled: item.disabled}
                                    }, item.roleName);
                                })
                            )
                        }
                    },
                    {
                        title: '备注',
                        key: 'roleName',
                        width: 250,
                        align: "center",
                        render: (h, params) => {
                            return h('span', this.submit_data.role_list[params.index].roleName)
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.submit_data.role_list.splice(params.index, 1)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                role_columns_view: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色',
                        key: 'roleId',
                        width: 250,
                        align: "center",
                        render: (h, params) => {
                            return h('span', this.submit_data.role_list[params.index].roleName)
                        }
                    },
                    {
                        title: '备注',
                        key: 'roleName',
                        align: "center",
                        render: (h, params) => {
                            return h('span', this.submit_data.role_list[params.index].roleName)
                        }
                    }
                ],
                userListRow: {}
            };
        },
        watch: {
            "submit_data.role_list": {
                handler(newVal, oldVal) {
                    if (this.modal_title != '查看用户' && newVal.length > 0) {
                        this.roleList.forEach((k, j) => {
                            k.disabled = false
                        })
                        newVal.forEach(x => {
                            this.roleList.forEach((k, j) => {
                                if (x.roleId == k.roleId) {
                                    k.disabled = true;
                                }
                            })
                        })
                    }
                },
                deep: true
            }
        },
        computed: {
            ...mapState({
                orgList: state => state.common.orgList,
                postList: state => state.common.postList,
                roleList: state => state.common.roleList
            })
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        activated() {
            this.$store.dispatch('get_orgList', {data: {user_id: this.userInfo.userId}});
            this.$store.dispatch('get_urpr_by_type', {data: {type: 2}});
            this.getData(this.formSearch);
        },
        methods: {
            getData(formSearch) {
                var data = JSON.parse(JSON.stringify(formSearch));
                data = Object.assign(data, {
                    start: this.pageSize * (this.page - 1),
                    length: this.pageSize
                })
                this.request('get_userList', {
                    data: data
                }, true).then(res => {
                    if (res.code == 1) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        res.data.user_list.forEach((item) => {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                            if (!!item.org_id) {
                                item.org_list = item.org_id.split(',');
                            }
                            if (!!item.post_id) {
                                item.post_list = item.post_id.split(',');
                            }
                        });
                        this.userList = res.data.user_list;
                        this.total = res.data.counts;
                    }
                })
            },
            search(formSearch) {
                this.page = 1;
                this.$nextTick(() => {
                    this.getData(formSearch);
                })
            },
            handleReset() {
                this.formSearch = formSearch();
                this.search(this.formSearch)
            },
            searchInput(val) {
                if (this.modal_visible) {
                    if (this.submit_data.post_list.length > 0) {
                        for (var i = 0; i < this.postList.length; i++) {
                            if (val.indexOf(this.postList[i].org_id) == -1) {
                                this.submit_data.post_list.forEach((x, y) => {
                                    if (x == this.postList[i].id) {
                                        this.submit_data.post_list.splice(y, 1);
                                    }
                                })
                            }
                        }
                    }
                } else {
                    if (this.formSearch.post_list.length > 0) {
                        for (var i = 0; i < this.postList.length; i++) {
                            if (val.indexOf(this.postList[i].org_id) == -1) {
                                this.formSearch.post_list.forEach((x, y) => {
                                    if (x == this.postList[i].id) {
                                        this.formSearch.post_list.splice(y, 1);
                                    }
                                })
                            }
                        }
                    }
                }
                this.$store.dispatch('get_postList', {data: {org_id: val}});
            },
            resetpwd() {
                if (!this.userListRow.user_id) {
                    this.$Message.warning('请选择要重置的用户!');
                    return false;
                }
                this.request('reset_password', {
                    data: {
                        last_update_user: this.userInfo.userId,
                        user_id: this.userListRow.user_id
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        var password = Util.JSEncrypt('decrypt', res.data);
                        this.$Notice.success({
                            title: '密码重置成功',
                            desc: '新密码:' + password,
                            duration: 0
                        });
                    }
                })
            },
            delete_user() {
                this.$Modal.confirm({
                    title: '提示',
                    content: '该行将会删除，请确认！',
                    onOk: () => {
                        this.request('delete_user', {
                            data: {
                                last_update_user: this.userInfo.userId,
                                user_id: this.userListRow.user_id
                            }
                        }, true).then(res => {
                            if (res.code == 1) {
                                this.$Message.success(res.msg);
                                this.search(this.formSearch);
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.warning('已取消删除');
                    }
                })
            },
            userListRowClick(val) {
                this.userListRow = val;
            },
            open_modal(type, params) {
                this.modal_title = type;
                this.modal_visible = true;
                if (type == '新增用户') {
                    this.submit_data = submit_data();
                } else {
                    this.submit_data = JSON.parse(JSON.stringify(params.row));
                    this.submit_data.is_active = this.submit_data.is_active.toString();
                    for (let i = 0; i < this.submit_data.post_list.length; i++) {
                        this.submit_data.post_list[i] = Number(this.submit_data.post_list[i])
                    }
                }
            },
            close_modal() {
                this.modal_visible = false;
                this.$refs['submit_data'].resetFields();
            },
            addRole() {
                let len = this.submit_data.role_list.length;
                if (len > 0) {
                    if (!this.submit_data.role_list[len - 1].roleId) {
                        this.$Notice.warning({
                            title: '提示',
                            desc: '请完善后当前行后再添加!'
                        });
                        return
                    }
                }
                this.submit_data.role_list.push({
                    roleId: '',
                    roleName: ''
                })
            },
            add_user() {
                if (this.modal_title == '查看用户') {
                    this.modal_visible = false;
                    this.submit_data = submit_data();
                } else if (this.modal_title == '新增用户') {
                    let data = JSON.parse(JSON.stringify(this.submit_data));
                    if (!data.role_list[0].roleId) {
                        this.$Notice.warning({
                            title: '提示',
                            desc: '至少添加一个角色!'
                        });
                        return
                    }
                    data.created_by = this.userInfo.userAccount;
                    this.$refs["submit_data"].validate((valid) => {
                        if (valid) {
                            data.pwd = Util.JSEncrypt('encrypt', data.pwd);
                            delete data.checkPwd
                            this.request('add_user', {
                                data: data
                            }, true).then(res => {
                                if (res.code == 1) {
                                    this.$Message.success(res.msg);
                                    this.modal_visible = false;
                                    this.submit_data = submit_data();
                                    this.search(this.formSearch);
                                }
                            })
                        } else {
                            this.$Notice.warning({
                                title: '提示',
                                desc: '请核对表单信息!'
                            });
                            return false;
                        }
                    })
                } else {
                    let data = this.submit_data;
                    if (!data.role_list[0].roleId) {
                        this.$Notice.warning({
                            title: '提示',
                            desc: '至少添加一个角色!'
                        });
                        return
                    }
                    data.update_user = this.userInfo.userAccount;
                    delete data._index
                    delete data._rowKey
                    delete data.serialNo
                    this.$refs["submit_data"].validate((valid) => {
                        if (valid) {
                            this.request('edit_user', {
                                data: data
                            }).then(res => {
                                if (res.code == 1) {
                                    this.$Message.success(res.msg);
                                    this.modal_visible = false;
                                    this.submit_data = submit_data();
                                    this.search(this.formSearch);
                                }
                            })
                        } else {
                            this.$Notice.warning({
                                title: '提示',
                                desc: '请核对表单信息!'
                            });
                            return false;
                        }
                    })
                }
            },
            SizeChange(val) {
                this.pageSize = val;
                this.getData(this.formSearch)
            },
            CurrentChange(val) {
                this.page = val;
                this.getData(this.formSearch);
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
            }
        }
    };
</script>

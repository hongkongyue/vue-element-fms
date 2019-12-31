<style lang="less">
  @import "./list.less";
</style>

<template>
  <div class="background-color-white exhibition">
    <Row class="margin-bottom-10">
      <Col span="24" class="search">
      <Form :model="formSearch" :label-width="80" inline label-position="right" @keydown.native.enter.prevent="search(formSearch)">
        <Form-item label="角色名:" :label-width="60">
          <Input v-model="formSearch.roleName" placeholder="请输入角色名" style="width: 150px"
                 ></Input>
        </Form-item>
        <Form-item :label-width="1">
          <Button type="primary" @click="search" icon="ios-search">搜索</Button>
          <Button type="primary" @click="handleReset">重置</Button>
        </Form-item>
      </Form>
      </Col>
      <Col span="24">
      <Button type="primary" @click="open_modal('新增角色')">新增</Button>
      </Col>
    </Row>
    <Row>
      <Col class="margin-bottom-10">
      <Table highlight-row :columns="roleList_columns" :data="roleList"></Table>
      </Col>
      <Col>
      <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator
            @on-change="CurrentChange" @on-page-size-change="SizeChange"></Page>
      </Col>
    </Row>
    <Modal v-model="modal_visible" :mask-closable="false" :title="modal_title" :width="600"
           class-name="customize-modal-center">
      <Form class="addForm" ref="submit_data" :model="submit_data" :label-width="50" inline label-position="right"
            :rules="rules">
        <div v-if="modal_title != '查看角色'">
          <Form-item label="角色:" prop="roleName">
            <Input v-model="submit_data.roleName" size="small" placeholder="请再次输入角色名"></Input>
          </Form-item>
          <br>
          <Form-item label="备注:">
            <Input v-model="submit_data.remark" size="small" placeholder="请再次输入备注"></Input>
          </Form-item>
        </div>
        <div v-else>
          <Form-item label="角色:">
            {{submit_data.roleName}}
          </Form-item>
          <br>
          <Form-item label="备注:">
            {{submit_data.remark}}
          </Form-item>
        </div>
      </Form>
      <Row class="margin-bottom-10" v-if="modal_title != '查看角色'">
        <Button type="primary" @click="addPriv">新增权限</Button>
      </Row>
      <Row>
        <div v-if="modal_title=='查看角色'">
          <Table size="small" :columns="priv_view_columns" :data="submit_data.priv_list"></Table>
        </div>
        <div v-else>
          <Table size="small" :columns="priv_columns" :data="submit_data.priv_list"></Table>
        </div>
      </Row>
      <div slot="footer" v-if="modal_title != '查看角色'">
        <Button type="primary" @click="addRole">确 定</Button>
        <Button type="default" @click="modal_visible = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  function formSearch() {
    return {
      roleName: ''
    }
  }

  function submit_data() {
    return {
      roleName: '',
      remark: '',
      priv_list: [],
    }
  }

  export default {
    name: "role_list",
    data() {
      return {
        formSearch: formSearch(),
        page: 1,
        pageSize: 10,
        total: 0,
        modal_title: '',
        modal_visible: false,
        roleList: [],
        roleList_columns: [
          {
            title: '序号',
            key: 'serialNo',
            align: 'center',
            width: 60
          },
          {
            title: '角色',
            key: 'roleName',
            width: 200,
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            width: 200,
            align: 'center',
          },
          {
            title: '操作',
            key: 'operation',
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
                      this.open_modal('查看角色', params);
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
                      this.open_modal('编辑角色', params);
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
                      this.delRole(params.row);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        rules: {
          roleName: [{required: true, message: '请输入角色名!', trigger: 'blur'}]
        },
        submit_data: submit_data(),
        priv_view_columns:[
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '权限名',
            key: 'privilegeId',
            width: 200,
            align: "center",
            render: (h, params) => {
              return h('span', this.tempPrivList[params.index].privilegeName)
            }
          },
          {
            title: '备注',
            key: 'privName',
            align: "center",
            render: (h, params) => {
              return h('span', this.tempPrivList[params.index].remark)
            }
          }
        ],
        priv_columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '权限名',
            key: 'privilegeId',
            width: 200,
            align: "center",
            render: (h, params) => {
              return h('Select', {
                  props: {
                    value: this.submit_data.priv_list[params.index].privilegeId
                  },
                  on: {
                    'on-change': (value) => {
                      var selected = this.privList.filter(x => {
                        if (x.privilegeId == value) {
                          return x
                        }
                      })
                      this.submit_data.priv_list[params.index].privName = selected[0].remark;
                      this.submit_data.priv_list[params.index].privilegeId = value;
                    }
                  }
                },
                this.privList.map(function (item) {
                  return h('Option', {
                    props: {value: item.privilegeId, disabled: item.disabled}
                  }, item.privilegeName);
                })
              )
            }
          },
          {
            title: '备注',
            key: 'privName',
            width: 200,
            align: "center",
            render: (h, params) => {
              return h('span', this.submit_data.priv_list[params.index].privName)
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
                      this.delPriv(params);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tempRoldId:'',              //临时的RoleId
        tempPrivList:[],            //临时的当前角色下的RoleId
      };
    },
    mounted() {
    },
    activated(){
      this.$store.dispatch('get_urpr_by_type', {data: {type: 3}});
      this.getData();
    },
    watch: {
      "submit_data.priv_list": {
        handler(newVal, oldVal) {
          if (this.modal_title != '查看角色' && newVal.length > 0) {
            this.privList.forEach((k, j) => {
              k.disabled = false
            })
            newVal.forEach(x => {
              this.privList.forEach((k, j) => {
                if (x.privilegeId == k.privilegeId) {
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
        privList: state => state.common.privList
      })
    },
    methods: {
      getData() {
        let start = (this.page - 1) * this.pageSize;
        let end = this.pageSize;
        this.request('get_urpr', {
          data: {
            type: 2,
            min: start,
            max: end,
            role: Number(JSON.parse(window.sessionStorage.getItem('userinfo')).role[0].roleId),
          }
        }, true).then(res => {
          if (res.code == 1) {
            let serialNoBegain = this.pageSize * (this.page - 1);
            res.data.role.forEach((item) => {
              serialNoBegain++;
              item.serialNo = serialNoBegain;
            })
            this.roleList = res.data.role;
            this.total = res.data.total;
          }
        })
      },
      search(){
        this.page = 1;
        this.getData();
      },
      handleReset() {
        this.formSearch = formSearch();
        this.search(this.formSearch);
      },
      open_modal(type,params) {
        this.modal_title = type;
        this.modal_visible = true;
        if(type != '查看角色'){
          this.$refs['submit_data'].resetFields();
        }
        if (type == '新增角色') {
          this.submit_data = submit_data();
          this.submit_data.priv_list.push({
            privilegeId: '',
            privName: ''
          })
        } else {
          this.submit_data.roleName = params.row.roleName;
          this.submit_data.remark = params.row.remark;
          this.get_urpr_param(params.row.roleId);
          this.tempRoldId = params.row.roleId;
        }
      },
      get_urpr_param(roleId){
        this.request('get_urpr_param',{
          data:{
            param:roleId,
            type:3,
            min:0,
            max:10
          }
        },true).then(res=>{
          if(res.code == 1){
            this.submit_data.priv_list = res.data.priv.map(x=>{
              return {
                privilegeId:x.privilegeId,
                privName:x.remark
              }
            })
            this.tempPrivList = JSON.parse(JSON.stringify(res.data.priv));
          }
        })
      },
      addPriv() {
        let len = this.submit_data.priv_list.length;
        if (len > 0) {
          if (!this.submit_data.priv_list[len - 1].privilegeId) {
            this.$Notice.warning({
              title: '提示',
              desc: '请完善后当前行后再添加!'
            });
            return
          }
        }
        this.submit_data.priv_list.push({
          privilegeId: '',
          privName: ''
        })
      },
      delPriv(params){
        this.submit_data.priv_list.splice(params.index,1);
      },
      add_del_role(type, obj) {
        if (type == 1 || type == 2) {
          var privList = [];
          for(let x of this.submit_data.priv_list){
            if(!!x.privilegeId){
              privList.push(x.privilegeId)
            }
          }
          if (privList.length < 1) {
            this.$Notice.warning({
              title: '提示',
              desc: '必须添加一个权限!'
            });
            return false;
          }
          this.$refs['submit_data'].validate((valid) => {
            if (valid) {
              var roleList = {};
              roleList.roleName = obj.roleName;
              roleList.remark = obj.remark;
              if(type == 2){
                roleList.roleId = this.tempRoldId;
              }
              this.request('role_aud', {
                data: {
                  obj: roleList,
                  type: type
                }
              }).then(res => {
                if (res.code == 1) {
                  if(type == 1){
                    this.tempRoldId = res.data.roleId;
                  }
                  this.addRole_Priv(this.tempRoldId,privList,type);
                }
              })
            } else {
              this.$Message.warning('请核对表单信息!');
              return false;
            }
          })
        } else {
          this.$Modal.confirm({
              title: '提示',
              content: '该角色将会删除，请确认！',
              onOk: () => {
              this.request('role_aud', {
                data: {
                  obj: {
                    roleId:obj.roleId
                  },
                  type: type
                }
              }).then(res => {
                if (res.code == 1) {
                  if(this.roleList.length <= 1){
                    this.page = this.page - 1;
                  }
                  this.$Message.success(res.msg);
                  this.search();
                }
              })
            },
            onCancel: () => {
              this.$Message.warning('已取消删除!')
            }
          })
        }
      },
      addRole() {
        if(this.modal_title == '新增角色'){
          this.add_del_role(1, this.submit_data);
        }else{
          this.add_del_role(2, this.submit_data);
        }
      },
      addRole_Priv(roldId,privList,type) {
        this.request('rp_link', {
          data: {
            obj:{
              privList: privList,
              roleId:roldId
            },
            type:type
          }
        }, true).then(res => {
          if(res.code == 1){
            if(type != 3){
              this.modal_visible = false;
              this.$Message.success(res.msg);
              this.search();
            }
          }
        })
      },
      delRole(row) {
        this.add_del_role(3, row);
      },
      SizeChange(val) {
        this.pageSize = val;
        this.getData()
      },
      CurrentChange(val) {
        this.page = val;
        this.getData();
      },
    }
  };
</script>

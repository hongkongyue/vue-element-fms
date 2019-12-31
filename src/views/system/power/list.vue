<style lang="less">
  @import "./list.less";
</style>

<template>
<div class="background-color-white exhibition">
  <Row class="margin-bottom-10">
    <Col span="24" class="search">
    <Form :model="formSearch" :label-width="80" inline label-position="right" @keydown.native.enter.prevent="search(formSearch)">
      <Form-item label="权限名:" :label-width="60">
        <Input v-model="formSearch.privName" placeholder="请输入权限名" style="width: 150px"></Input>
      </Form-item>
      <Form-item :label-width="1">
        <Button type="primary" @click="search()" icon="ios-search">搜索</Button>
        <Button type="primary" @click="handleReset()">重置</Button>
      </Form-item>
    </Form>
    </Col>
    <Col span="24">
    <Button type="primary" @click="open_modal('新增权限')">新增</Button>
    </Col>
  </Row>
  <Row>
    <Col class="margin-bottom-10">
    <Table highlight-row :columns="privList_columns" :data="privList"></Table>
    </Col>
    <Col>
    <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="CurrentChange"
      @on-page-size-change="SizeChange"></Page>
    </Col>
  </Row>
  <Modal height="300" v-model="modal_visible" :mask-closable="false" :title="modal_title" :width="600" class-name="customize-modal-center">
    <Row>
      <Col span="12">
      <Form class="addForm" ref="submit_data" :model="submit_data" :label-width="65" inline label-position="right"
        :rules="rules">
        <div v-if="modal_title != '查看权限'">
          <Form-item label="权限名:" prop="privilegeName">
            <Input v-model="submit_data.privilegeName" size="small" placeholder="请再次输入权限名"></Input>
          </Form-item>
          <br>
          <Form-item label="备注:">
            <Input v-model="submit_data.remark" size="small" placeholder="请再次输入备注"></Input>
          </Form-item>
        </div>
        <div v-else>
          <Form-item label="权限名:">
            {{submit_data.privilegeName}}
          </Form-item>
          <br>
          <Form-item label="备注:">
            {{submit_data.remark}}
          </Form-item>
        </div>
      </Form>
      </Col>
      <Col span="12" style="height:200px;overflow-y:auto">
      <Tree :data="ResourceLists" ref="tree" children-key="sysResourceList" :render="renderContent" show-checkbox></Tree>
      </Col>
    </Row>

    <div slot="footer" v-if="modal_title != '查看权限'">
      <Button type="primary" @click="submit">确 定</Button>
      <Button type="default" @click="modal_visible = false">取消</Button>
    </div>
  </Modal>
  <Modal v-model="permissionEditModal" :mask-closable="false" :title="编辑权限" 　:width="800" 　 class-name="customize-modal-center">

    <div>
      <Tabs v-model="currentTabName" @on-click="changeTabName">
        <TabPane label="按钮权限" name="button">
          <Row type="flex" justify="left">
            <Col span="6">
            <div style="max-height:300px;overflow-y:auto;">
              <Tree ref="btnTree" :data="ButtonData" @on-select-change="onSelectChange"></Tree>
            </div>
            </Col>
            <Col span="10" offset="1">
            <div>
              <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
              </div>
              <CheckboxGroup v-model="checkAllBtn" @on-change="checkAllBtnChange">
                <template v-for="btn in buttonList">
                  <Checkbox :label="btn.id" :key="btn.id">{{btn.name}}</Checkbox>
                </template>
              </CheckboxGroup>
            </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="物流公司" name="logistic">
          <div>

             <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
              <Checkbox
            :indeterminate="indeterminateLogistic"
            :value="checkAllLogistic"
            @click.prevent.native="handleCheckAllLogistic">全选</Checkbox>
             </div>

            <template v-for="logistic in logisticList">
              <Checkbox  v-model="logistic.available" :key="logistic.id">{{logistic.logistic_type}}</Checkbox>
            </template>

          </div>
        </TabPane>
        　　　　
      </Tabs>
    </div>
    <div slot="footer">
      <Button type="primary" @click="savePriv">保存</Button>
      <Button type="default" @click="permissionEditModal = false">取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
  // import the component
  import treeselect from '@riophae/vue-treeselect'
  // import the styles
  import Vue from 'vue'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {
    mapState
  } from 'vuex'
  import Util from 'libs/util';

  function formSearch() {
    return {
      privName: ''
    }
  }

  function submit_data() {
    return {
      privilegeName: '',
      remark: '',
      resList: []
    }
  }

  export default {
    name: "power_list",
    data() {
      return {
        formSearch: formSearch(),
        submit_data: submit_data(),
        modal_title: '',
        modal_visible: false,
        valueConsistsOf: 'BRANCH_PRIORITY',
        privList: [],
        ResourceLists: [],
        privList_columns: [{
            title: '序号',
            key: 'serialNo',
            align: 'center',
            width: 60
          },
          {
            title: '权限',
            key: 'privilegeName',
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
                // h('Button', {
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px'
                //   },
                //   on: {
                //     click: () => {
                //       this.open_modal('查看权限', params);
                //     }
                //   }
                // }, '查看'),
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
                      this.open_modal('编辑权限', params);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.openPermissionEditModal(params);
                    }
                  }
                }, '设置权限'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delPriv(params.row);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        page: 1,
        pageSize: 10,
        total: 25,
        rules: {
          privilegeName: [{
            required: true,
            message: '请输入权限名!',
            trigger: 'blur'
          }]
        },
        tempPrivilegeId: '',
        priv_res_list: [],
        permissionEditModal: false,
        ButtonData: [],
        buttonList: [],
        checkAllBtnList: [],
        checkAllBtn: [],
        checkAll: false,
        indeterminate: true,
        currentTabName: 'button',
        logisticList: [],
        checkAllLogistic: false,
        indeterminateLogistic: false,
      };
    },
    computed: {
      ...mapState({
        Resource: state => state.common.Resource
      }),
    },
    methods: {
      getData() {
        let start = (this.page - 1) * this.pageSize;
        let end = this.pageSize;
        this.request('get_urpr', {
          data: {
            type: 3,
            min: start,
            max: end,
            role: Number(JSON.parse(window.sessionStorage.getItem('userinfo')).role[0].roleId),
          }
        }, true).then(res => {
          if (res.code == 1) {
            let serialNoBegain = this.pageSize * (this.page - 1);
            res.data.priv.forEach((item) => {
              serialNoBegain++;
              item.serialNo = serialNoBegain;
            })
            this.privList = res.data.priv;
            this.total = res.data.total;
          }
        })
      },
      search() {
        this.page = 1;
        this.getData();
      },
      handleReset() {
        this.formSearch = formSearch();
        this.search();
      },
      get_urpr(params) {
        this.request('get_urpr', {
          data: {
            role: parseInt(JSON.parse(window.sessionStorage.getItem('userinfo')).role[0].roleId),
            type: 4,
            min: 0,
            max: 0
          }
        }, true).then(res => {
          if (res.code == 1) {
            this.ResourceLists = [res.data.res];
            this.addExpand(this.ResourceLists[0], params);
          }
        })
      },
      addExpand(val, params) {
        val.expand = true;
        if (val.sysResourceList.length > 0) {
          if (this.modal_title == '编辑权限') {
            this.request('priv_res', {
              data: {
                param: params.row.privilegeId,
                type: 4
              }
            }, true).then(res => {
              if (res.code == 1) {
                this.priv_res_list = res.data.res.filter(x => {
                  return x.menuLevel != 1
                })
                this.priv_res_list.forEach(x => {
                  if (x.menuLevel == 3) {
                    this.priv_res_list.forEach((k, j) => {
                      if (x.parentId == k.resourceId) {
                        this.priv_res_list.splice(j, 1)
                      }
                    })
                  }
                })
                this.setCheckNode(this.priv_res_list, val.sysResourceList);
              }
            })
          }
          // val.sysResourceList.forEach(y=>{
          //   this.addExpand(y);
          // })
        }
      },
      setCheckNode(priv_res_list, ResourceLists) {
        for (let [k, x] of priv_res_list.entries()) {
          for (let [j, y] of ResourceLists.entries()) {
            if (x.resourceId == y.resourceId) {
              this.$set(ResourceLists[j], 1, x)
              y.checked = true;
            } else {
              if (y.sysResourceList.length > 0) {
                this.setCheckNode([x], y.sysResourceList);
              }
            }
          }
        }
      },
      open_modal(type, params) {
        this.modal_title = type;
        this.modal_visible = true;
        if (type != '查看权限') {
          this.$refs['submit_data'].resetFields();
        }
        this.$refs['submit_data'].resetFields();
        this.get_urpr(params);
        if (this.modal_title == '新增权限') {
          this.submit_data = submit_data();
        } else {
          this.submit_data.privilegeName = params.row.privilegeName;
          this.submit_data.remark = params.row.privilegeName;
          this.tempPrivilegeId = params.row.privilegeId;
        }
      },
      add_del_Priv(type, obj) {
        var list = this.$refs.tree.getCheckedNodes();
        list = list.map(x => {
          return x.resourceId
        })
        outer:
          for (let i = 0; i < list.length; i++) {
            inner: for (let j = 0; j < this.Resource.length; j++) {
              if (list[i] == this.Resource[j].resourceId) {
                if (list.indexOf(this.Resource[j].parentId) == -1) {
                  list.push(this.Resource[j].parentId)
                }
              }
            }
          }
        if (list.indexOf(0) != -1) {
          list.splice(list.indexOf(0), 1);
        }
        if (list.indexOf(1) != -1) {
          list.splice(list.indexOf(1), 1);
        }
        this.submit_data.resList = list;

        if (type == 1 || type == 2) {
          if (this.submit_data.resList.length == 0) {
            this.$Notice.warning({
              title: '提示',
              desc: '至少添加一个资源!'
            });
            return false;
          }

          this.$refs['submit_data'].validate((valid) => {
            if (valid) {
              let data = {};
              if (this.modal_title == '新增权限') {
                data.privilegeName = obj.privilegeName;
                data.remark = obj.remark;
              } else {
                data.privilegeId = this.tempPrivilegeId;
                data.privilegeName = obj.privilegeName;
                data.remark = obj.remark;
              }
              this.request('priv_aud', {
                data: {
                  obj: data,
                  type: type
                }
              }, true).then(res => {
                if (res.code == 1) {
                  if (type == 1) {
                    this.tempPrivilegeId = res.data.privilegeId;
                  }
                  this.add_priv_res(this.tempPrivilegeId, list);
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
            content: '该权限将会删除，请确认！',
            onOk: () => {
              this.request('priv_aud', {
                data: {
                  obj: {
                    privilegeId: obj.privilegeId
                  },
                  type: type
                }
              }).then(res => {
                if (res.code == 1) {
                  if (this.privList.length <= 1) {
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
      add_priv_res(privId, resList) {
        this.request('pr_link', {
          data: {
            obj: {
              privilegeId: privId,
              resList: resList
            },
            type: 1
          }
        }, true).then(res => {
          if (res.code == 1) {
            this.$Message.success(res.msg);
            this.modal_visible = false;
            this.search();
          }
        })
      },
      delPriv(row) {
        this.add_del_Priv(3, row);
      },
      submit() {
        if (this.modal_title == '新增权限') {
          this.add_del_Priv(1, this.submit_data);
        } else {
          this.add_del_Priv(2, this.submit_data);
        }
      },
      renderContent(h, {
        root,
        node,
        data
      }) {
        return h('span', data.resourceName)
      },
      CurrentChange(val) {
        this.page = val;
        this.getData();
      },
      SizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      openPermissionEditModal(params) {
        this.currentTabName = 'button'
        this.buttonList = []
        this.checkAllBtn = []
        this.indeterminate = false
        this.checkAll = false
        this.tempPrivilegeId = params.row.privilegeId;
        this.request('priv_res', {
          data: {
            param: params.row.privilegeId,
            type: 4
          }
        }, true).then((res) => {

          let resourceListData = Util.deepClone(res.data.res)
          for (let item of resourceListData) {
            item.id = item.resourceId
            item.pid = item.parentId
            item.title = item.resourceName
            item.expand = false
          }
          this.ButtonData = Util.arrayToTree(resourceListData, 'resourceId', 'parentId')
        })
        this.permissionEditModal = true
      },
      checkAllBtnChange(data) {

        if (data.length === this.checkAllBtnList.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }

      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllBtn = this.checkAllBtnList;
        } else {
          this.checkAllBtn = [];
        }
      },
      onSelectChange(item) {
        let obj = item[0]
        if (obj.isLeaf == 1) {
          this.getBtnList(obj.resourceId)
        }
      },
      getBtnList(resource_id) {
        this.request('get_btn_list', {
          menuId: resource_id,
          privilegeId: this.tempPrivilegeId
        }, false).then((res) => {
          this.buttonList = res.data
          this.checkAllBtn = []
          this.indeterminate = true
          for (let item of this.buttonList) {
            this.checkAllBtnList.push(item.id)
            if (item.available == 1) {
              this.checkAllBtn.push(item.id)
            }
          }
          if (this.checkAllBtnList.length == this.checkAllBtn.length) {
            this.checkAll = true
            this.indeterminate = false
          }
        })
      },
      /**
       * 保存权限设置
       */
      savePriv() {
        if (this.currentTabName == 'button') {
          let treeRow = this.$refs.btnTree.getSelectedNodes()
          let data = Util.deepClone(this.buttonList)
          for (let item of data) {
            item.privilege_id = this.tempPrivilegeId
            item.available = 0
            if (this.checkAllBtn.join(',').indexOf(item.id) >= 0) {
              item.available = 1
            }
          }

          if(data.length==0){
              this.$Message.warning('没有需要保存的数据,请检查');
　　　　　　　　　return;
          }
          
          this.request('update_priv_btn_data', data, '正在保存按钮权限...').then((res) => {
            if (res.errno == 0) {
              this.$Message.success(res.data);
              this.permissionEditModal = false
            }
          })
        } else if (this.currentTabName == 'logistic') {
          let selectIdArray = []
          for (let item of this.logisticList) {
            if (item.available) {
              selectIdArray.push(item.id)
            }
          }

          this.request('update_priv_other_data', {
            privilege_id: this.tempPrivilegeId,
            module_type: 'logistics',
            relation_ids: selectIdArray.join(',')
          }, '正在保存物流公司权限...').then((res) => {
            if (res.errno == 0) {
              this.$Message.success(res.data);
              this.permissionEditModal = false
            }
          })
        }
      },
      changeTabName() {
        console.log(this.currentTabName)
        if (this.currentTabName == 'logistic') {
          this.getLogisticList()
        }
      },
      getLogisticList() {
        this.request('getLogisticListNode', {
          privilegeId: this.tempPrivilegeId
        }, '').then((res) => {
          this.indeterminateLogistic = false
          this.checkAllLogistic = true
          this.logisticList = res.data
          let length = this.logisticList.filter(item=>item.available==false).length
          if(length>0&&length<this.logisticList.length){
             this.indeterminateLogistic = true
             this.checkAllLogistic = false
          }else if(length==this.logisticList.length){
             this.checkAllLogistic = false
          }
        })
      },
      //物流公司全选
      handleCheckAllLogistic(){
        if (this.indeterminateLogistic) {
          this.checkAllLogistic = false;
        } else {
          this.checkAllLogistic = !this.checkAllLogistic;
        }
        this.indeterminateLogistic = false;
　　　　　this.logisticList.forEach((item)=>{
               item.available = this.checkAllLogistic
        })
      }
    },

    activated() {
      this.getData();
      this.$store.dispatch('get_urpr_by_type', {
        data: {
          type: 4
        }
      });
    },
  };
</script>

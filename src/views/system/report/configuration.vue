<style>
  #config_report .ivu-form-item {
    margin-bottom: 12px !important;
  }

  #config_report .ivu-select-dropdown {
    z-index: 99999 !important;
  }
</style>

<template>
  <div class="background-color-white exhibition" id="config_report">
    <Row>
      <Col span="24">
      <Button type="primary" @click="openModal('新增报表')">新增</Button>
      </Col>
      <Col span="24" class="margin-top-10">
      <Table size="small" :columns="columns" :data="list" border></Table>
      </Col>
    </Row>
    <Row class-name="margin-top-10">
      <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator
            @on-change="CurrentChange" @on-page-size-change="SizeChange"></Page>
    </Row>


    <Modal v-model="modal_visible" :transfer="false" :mask-closable="false" :title="modal_title" :width="750"
           class-name="customize-modal-center modal">
      <Form ref="submit_data" :model="submit_data" :label-width="80" inline label-position="right" :rules="rules">
        <Row v-if="modal_title != '查看报表'">
          <Row>
            <Col span="16">
            <Form-item label="资源名称:" prop="resourceIds">
              <treeselect maxHeight="150" :flat="true"  placeholder="请选择资源" v-model="submit_data.resourceIds" :multiple="true" :options="options" />
              <!-- <Select v-model="submit_data.resourceIds" multiple style="width:150px;z-index:9999999" multiple placeholder='请选择' size="small">
                <Option v-for="item in report_resource_list" :value="item.resourceId" :key="item.resourceId">
                  {{item.resourceName}}
                </Option>
              </Select> -->
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="16">
            <Form-item label="报表名称:" prop="reportName">
              <Input v-model="submit_data.reportName" size="small" placeholder="请输入报表名称" style="width: 388px"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <Form-item label="类别名称:" prop="reportType">
              <Select v-model="submit_data.reportType" size="small" style="width:150px" placeholder='请选择'
                      @on-change="changeReportType">
                <Option v-for="item in report_type_list" :value="item.reportType" :key="item.reportType">
                  {{item.reportType}}
                </Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="报表序号:" prop="rptSequence">
              <InputNumber :step="1" size="small" style="width:150px;" v-model="submit_data.rptSequence"
                           placeholder="报表序号"></InputNumber>
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="是否启用:">
              <Checkbox v-model="submit_data.isDelete"></Checkbox>
            </Form-item>
            </Col>
          </Row>

          <Col span="24">
          <Form-item label="报表URL:" style="width:inherit" prop="reportUrl">
            <Input v-model="submit_data.reportUrl" placeholder="请输入报表URL" size="small"></Input>
          </Form-item>
          </Col>
          <Col span="24" style="margin-top:15px">
          <Form-item label="报表说明:" style="width:inherit；">
            <div id="editorElem" style="text-align:left"></div>
          </Form-item>
          </Col>
        </Row>
        <Row v-else>
          <Row>
            <Col span="8">
            <Form-item label="资源名称:">
              {{submit_data.resourceName}}
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="报表名称:">
              {{submit_data.reportName}}
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <Form-item label="类别名称:">
              {{submit_data.reportType}}
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="报表序号:">
              {{submit_data.rptSequence}}
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="是否启用:">
              {{submit_data.isDelete == true ? '启用' : '未启用'}}
            </Form-item>
            </Col>
          </Row>

          <Col span="24">
          <Form-item label="报表URL:" style="width:inherit">
            {{ submit_data.reportUrl }}
          </Form-item>
          </Col>
          <Col span="24">
          <Form-item label="报表说明:" style="width:inherit">
            <span v-html="submit_data.reportDesc"></span>
          </Form-item>
          </Col>
        </Row>
      </Form>

      <div slot="footer" v-if="modal_title != '查看报表'">
        <Button type="primary" @click="submit">确 定</Button>
        <Button type="default" @click="modal_visible = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  function submit_data() {
    return {
      createUser: '',        //	创建人	string	当前用户名
      isDelete: false,      //	是否启用	number	0：启用，1：不启用
      reportDesc: '',        //	报表说明	string
      reportName: '',        //	报表名	string
      reportType: '',        //	报表类型	string
      reportTypeCode: '',    //	报表类型代码	string
      reportUrl: '',         //	报表url	string
      resourceIds: null,       //	资源ID	number
      rptSequence: 0,        //	报表序号	number
      typeSequence: '',      //	类型序号
    }
  }

  import Util from 'libs/util'
  import E from 'wangeditor'
  import Vue from 'vue'

  let reportUrl = Vue.extend({
    props: ['params'],
    template: `
        <div v-if="!!params.row.reportUrl">
          <Tooltip placement="right">
            <div style="width:130px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{params.row.reportUrl}}</div>
            <div slot="content" style="white-space: normal">
                <span>{{params.row.reportUrl}}</span>
            </div>
          </Tooltip>
        </div>
    `
  })

  export default {
    name: "config_report",
    data() {
      return {
        modal_visible: false,
        modal_title: '',
        submit_data: submit_data(),
        valueConsistsOf: 'LEAF_PRIORITY',
        rules: {
          resourceIds: [{required: true, type: 'array', message: '请选择资源!', trigger: 'change'}],
          reportName: [{required: true, message: '请输入报表名称!', trigger: 'blur'}],
          reportType: [{required: true, message: '请选择类别名称!', trigger: 'change'}],
          rptSequence: [{required: true, message: '请输入报表序号!', trigger: 'blur', type: 'number'}],
          reportUrl: [{required: true, message: '请输入报表URL!', trigger: 'blur'}],
        },
        list: [],
        columns: [
          {
            title: '序号',
            key: 'serialNo',
            align: 'center',
            width: 65
          },
          {
            title: '报表名称',
            key: 'reportName',
            align: 'center',
            width: 230
          },
          {
            title: '报表类别',
            key: 'reportType',
            align: 'center',
            width: 200
          },
          {
            title: '报表url',
            key: 'reportUrl',
            align: 'left',
            width: 150,
            render: (h, params) => {
              return h(reportUrl, {
                props: {
                  params: params,
                }
              })
            }
          },
          {
            title: '创建时间',
            key: 'created',
            align: 'center',
            width: 150
          },
          {
            title: '创建人',
            key: 'createUser',
            align: 'center',
            width: 80
          },
          {
            title: '是否启用',
            key: 'isDelete',
            align: 'center',
            width: 90,
            render: (h, params) => {
              return h('Span', params.row.isDelete == 0 ? '启用' : '不启用')
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 130,
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
                      this.openModal('查看报表', params);
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
                      this.openModal('编辑报表', params);
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        report_type_list: [],
        report_resource_list: [],
        page: 1,
        pageSize: 10,
        total: 0,
        index: 0,
        editor: '',  // 存放实例化的wangEditor对象，在多个方法中使用
        options: [],
      }
    },
    mounted() { 
       
    },
    computed: {
       
    },
    activated() {
      let resourceTreeData =  JSON.parse(sessionStorage.getItem('resourceListData')).map(org => Util.mapTree(org));
      this.options = resourceTreeData
      this.get_report_list_all();
      this.get_report_type_list();
      this.get_report_resource();
    },
    methods: {
      openModal(type, params) {
        this.modal_visible = true;
        this.modal_title = type;

        if (type == '编辑报表') {
          this.$nextTick(() => {
            this.editor = null;
            this.editor = new E('#editorElem')
            this.editor.customConfig.onchange = (html) => {
              this.submit_data.reportDesc = html
            };
            this.editor.create();
            this.submit_data = submit_data();
            this.$refs['submit_data'].resetFields();

            this.editor.txt.clear();
            this.submit_data = Util.deepClone(params.row);
            this.submit_data.isDelete = this.submit_data.isDelete == 0 ? true : false;
            this.editor.txt.html(this.submit_data.reportDesc);
          })
        } else if (type == '新增报表') {
          this.$nextTick(() => {
            this.editor = new E('#editorElem')
            this.editor.customConfig.onchange = (html) => {
              this.submit_data.reportDesc = html
            };
            this.editor.create();
            this.editor.txt.clear();
            this.submit_data = submit_data();
            this.$refs['submit_data'].resetFields();

          })
        } else {
          this.submit_data = Util.deepClone(params.row);
          this.submit_data.isDelete = this.submit_data.isDelete == 0 ? true : false;
        }
      },
      get_report_type_list() {
        this.request('get_report_type_list', {
          data: {}
        }).then(res => {
          if (res.code == 1) {
            this.report_type_list = res.data;
          }
        })
      },
      get_report_list_all() {
        this.request('get_report_list_all', {
          data: {
            userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId,
            start: (this.page - 1) * this.pageSize,
            length: this.pageSize
          }
        }, true).then(res => {
          if (res.code == 1) {
            let serialNoBegain = this.pageSize * (this.page - 1);
            res.data.configList.forEach((item) => {
              serialNoBegain++;
              item.serialNo = serialNoBegain;
            })
            this.list = res.data.configList;
            this.total = res.data.counts;
          }
        })
      },
      get_report_resource() {
        this.request('get_report_resource', {
          data: {
            userId: JSON.parse(window.sessionStorage.getItem('userinfo')).userId
          }
        }).then(res => {
          if (res.code == 1) {
            this.report_resource_list = res.data;
            // this.$nextTick(()=>{
            //   this.filterData(this.report_resource_list[0]);
            // })
          }
        })
      },
      // filterData(data) {
      //   if (!!data.childrenResource) {
      //     this.$set(data,'children',data.childrenResource);
      //     this.$set(data,'id',data.resourceId);
      //     this.$set(data,'label',data.resourceName);
      //     delete data.childrenResource;
      //     delete data.resourceId;
      //     delete data.resourceName;
      //     data.children.map(x => {
      //       this.filterData(x);
      //     })
      //   }
      // },
      changeReportType(val) {
        this.report_type_list.map(y => {
          if (val == y.reportType) {
            this.submit_data.reportTypeCode = y.reportTypeCode;
          }
        })
      },
      submit() {
        let data = Util.deepClone(this.submit_data);
        data.createUser = JSON.parse(window.sessionStorage.getItem('userinfo')).userName;
        if (this.submit_data.isDelete) {
          data.isDelete = 0;
        } else {
          data.isDelete = 1;
        }

        if (!data.reportDesc) {
          this.$Message.error('请填写报表说明!');
          return false;
        }
        if (this.modal_title == '新增报表') {
          this.$refs['submit_data'].validate((valid) => {
            if (valid) {
              this.request('add_report_config', {
                data: {
                  obj: data
                }
              }, true).then(res => {
                if (res.code == 1) {
                  this.modal_visible = false;
                  this.$Message.success(res.msg);
                  this.get_report_list_all();
                }
              })
            } else {
              this.$Message.error('请核对表单信息!');
              return false;
            }
          })
        } else {
          delete data.serialNo;
          delete data._index;
          delete data._rowKey;
          this.$refs['submit_data'].validate((valid) => {
            if (valid) {
              this.request('update_report_config', {
                data: {
                  obj: data
                }
              }, true).then(res => {
                if (res.code == 1) {
                  this.modal_visible = false;
                  this.$Message.success(res.msg);
                  this.get_report_list_all();
                }
              })
            } else {
              this.$Message.error('请核对表单信息!');
              return false;
            }
          })
        }
      },
      SizeChange(val) {
        this.pageSize = val;
        this.get_report_list_all()
      },
      CurrentChange(val) {
        this.page = val;
        this.get_report_list_all();
      },
    }
  }
</script>


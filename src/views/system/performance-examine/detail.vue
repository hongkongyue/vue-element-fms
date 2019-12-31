<template>
<div class="background-color-white exhibition" id="performance-examine-detail">

    <Row class-name="margin-bottom-10 padding-bottom-10 divide-line">
        <i-col span="24">
            <span class="card-form-title">员工信息</span>
        </i-col>
    </Row>
    <Row>
        　　<Form ref="performmanceExamineDetail" class="detailForm" :model="performmanceExamine" :label-width="88" inline label-position="right">
            <Row>
                <Col span="6">
                <Form-item label="员工姓名：">
                    {{performmanceExamine.employee_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="部门：">
                    {{performmanceExamine.department_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="所属部门：">
                    {{performmanceExamine.root_department_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="岗位：">
                    {{performmanceExamine.post_name}}
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <Form-item label="职级：">
                    {{performmanceExamine.level_name}}
                </Form-item>
                </Col>

                  <Col span="6">
                <Form-item label="员工类型：">
                    {{performmanceExamine.employee_type}}
                </Form-item>
                </Col>
                　
                <Col span="6">
                <Form-item label="考核年份：">
                    {{performmanceExamine.date_year}}
                </Form-item>
                </Col>

            </Row>
        </Form>
    </Row>

    <Row class-name="margin-bottom-10 padding-bottom-10 divide-line">
        <i-col span="24">
            <span class="card-form-title">考核详情</span>
        </i-col>
    </Row>

    <Row class-name="margin-top-10">
        <Button type="primary" size="small" @click='openModal("新增考核信息")'>
            <Icon type="md-add"></Icon>&nbsp;添加
        </Button>
    </Row>
    <Row class-name="margin-top-10">
        <Table :columns="columns" :border="true" :data="list" size="small"></Table>
        <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
            show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
    </Row>

    <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="绩效考核记录" :width="750" class-name="customize-modal-center">
        <div>
            <Form ref="submitForm" :rules="ruleValidate" :model="submit_data" :label-width="80">
                <Row>
                    <Form-item label="日期:" prop="date_time">
                        <DatePicker type="date" :options="optionsDatetime" v-model="submit_data.date_time" placeholder="请选择日期"
                            style="width: 200px"></DatePicker>
                    </Form-item>
                </Row>

                <Row>
                    <Form-item label="指标:" prop="target">
                        <Select v-model="submit_data.target" style="width:200px">
                            <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    　　　　　
                </Row>

                <Row>
                    <Form-item label="案例类型:" prop="case_type">
                        <Select v-model="submit_data.case_type" style="width:200px">
                            <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>　　
                </Row>
                <Row>
                    <Form-item label="事件描述:" prop="event_desc">
                        <Input v-model="submit_data.event_desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                            placeholder="请输入具体描述..."></Input>
                    </Form-item>　　
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancel">取消</Button>
            <Button type="primary" @click="confirmSave()" style="margin-left: 8px">保存</Button>
        </div>
    </Modal>
</div>
</template>

<script>
    import Util from 'libs/util';
    
    export default {
        name: 'performance-examine-Detail',
        props: {
            orderType: String //订单类型
        },
        
        data() {
            return {
                
                columns: [{
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '日期',
                        key: 'date_time',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '指标',
                        key: 'target',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '案例类型',
                        key: 'case_type',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '事件描述',
                        key: 'event_desc',
                        align: 'center',
                        minWidth: 150
                    },
                     {
                        title: '记录人',
                        key: 'created_user',
                        align: 'center',
                        width: 80
                    },
                     {
                        title: '记录时间',
                        key: 'created',
                        align: 'center',
                        width: 160
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: (params.row.created_user == this.userInfo.userName ) ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal('编辑考核记录',params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: (params.row.created_user == this.userInfo.userName ) ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                list: [], //表格数据源
                addModal: false,
                submit_data: {
                    date_time:new Date()
                },
                targetList: [{
                        value: '计划控制能力',
                        label: '计划控制能力'
                    },
                    {
                        value: '学习与创新能力',
                        label: '学习与创新能力'
                    },
                    {
                        value: '执行力',
                        label: '执行力'
                    },
                    {
                        value: '复盘能力',
                        label: '复盘能力'
                    },
                    {
                        value: '培育下属能力',
                        label: '培育下属能力'
                    },
                    {
                        value: '系统思考能力',
                        label: '系统思考能力'
                    },
                    {
                        value: '客户第一',
                        label: '客户第一'
                    },
                    {
                        value: '拥抱变化',
                        label: '拥抱变化'
                    },
                    {
                        value: '诚信',
                        label: '诚信'
                    },
                    {
                        value: '团队合作',
                        label: '团队合作'
                    },
                    {
                        value: '激情',
                        label: '激情'
                    },
                    {
                        value: '敬业',
                        label: '敬业'
                    }
                ],
                caseTypeList: [{
                        value: '正面案例',
                        label: '正面案例'
                    },
                    {
                        value: '反面案例',
                        label: '反面案例'
                    }
                ],
                total: 0,
                pageSize: 10,
                page: 1,
                performmanceExamine: {},
                optionsDatetime: {
                    disabledDate: (function (date) {
                        return false
                    }).bind(this)
                },
                ruleValidate: {
                    date_time: [{
                        required: true,
                        type: 'date',
                        message: '日期不能为空',
                        trigger: 'blur'
                    }],
                    target: [{
                        required: true,
                        message: '指标不能为空',
                        trigger: 'change'
                    }],
                    case_type: [{
                        required: true,
                        message: '案例类型不能为空',
                        trigger: 'change'
                    }],
                    event_desc: [{
                        required: true,
                        message: '事件描述不能为空',
                        trigger: 'blur'
                    }]
                }

            }
        },

        methods: {
            getLogisticList() {
                this.request('GetLogisticListNew', {
                    ver: '1',
                    ts: Date.parse(new Date()),
                    sign: '',
                    data: {
                        order_type: "NG"
                    }
                }).then((res) => {
                    if (res.code == '1') {
                        this.logisticsList = res.data;
                    }
                })
            },
            // add() {
            //     this.addModal = true
            //     this.submit_data={
            //         date_time:new Date()
            //     }
            // },
            openModal(title,params){
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.addModal = true;
                if (title == '新增考核信息') {
                    this.submit_data={
                    date_time:new Date(),
                    id:''
                }
                } else {
                    this.submit_data = Util.deepClone(params);
                                  
                }
            },
            cancel() {
                this.addModal = false
            },
            //保存
            confirmSave() {
                this.$refs["submitForm"].validate((valid) => {
                    if (valid) {

                        let data = Util.deepClone(this.submit_data)
                        data.main_id = this.mainId
                        this.request('save_performance_examine_detail_data', data, '正在保存数据...').then((res) => {
                            if (res.errno == 0) {
                                this.getData()
                                this.$Message.success(res.data);
                                this.submit_data = {}
                                this.cancel()
                            } else {
                                this.$Message.error(res.errmsg);
                            }
                        })

                    } else {
                        return;
                    }
                })

            },
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
            getData() {
                let data = {}
                data.page = this.page
                data.pageSize = this.pageSize
                data.id = this.mainId
                this.request('get_performance_examine_detail_data', data, true).then((res) => {
                    if (res.errno == 0) {
                        if (data.page == 1) {
                            let main = Util.deepClone(res.data)
                            delete main.detail
                            this.performmanceExamine = main
                            this.optionsDatetime.disabledDate = function (date) {
                                if (date && new Date(date).getFullYear() == main.date_year) {
                                    return false
                                } else {
                                    return true
                                }
                            }
                        }
                        let detail = res.data.detail
                        this.list = detail.data
                        this.total = detail.count
                    } else {
                        this.$Message.error(res.errmsg);
                    }
                })
            },
            delete(id) {
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要删除当前记录？',
                    loading: true,
                    onOk: () => {
                        this.request('delete_performance_examine_data', {
                            id: id
                        }, true).then((res) => {
                            if (res.errno == 0) {
                                this.$Modal.remove();
                                this.$Message.info('删除成功');
                                this.getData()
                            }
                        })
                    }
                });
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
            this.mainId = this.$route.params.id
            this.getData()
            this.list = []
        },
    }
</script>

<style>
   
</style>


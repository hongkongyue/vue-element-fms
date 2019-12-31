<template>
    <div id="performance-target">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <Col span="24">
            <Form :model="formSearch" @keydown.native.enter.prevent="search" ref="formSearch" :label-width="90" inline
                label-position="right">
                <Form-item v-if="currentTabName=='department'" label="部门:" :label-width="50">
                    <Select v-model="formSearch.department_id" style="width:250px">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item v-if="currentTabName=='employee'" label="员工类型:" :label-width="80">
                    <Select v-model="formSearch.employee_type" style="width:150px">
                        <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item v-if="currentTabName=='scoreStandard'" label="考核类型:" :label-width="80">
                    <Select v-model="formSearch.type" style="width:150px">
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item v-if="currentTabName=='scoreStandard'" label="员工类型:" :label-width="80">
                    <Select v-model="formSearch.employee_type" style="width:150px">
                        <Option v-for="item in employeeTypeList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" size="small" @click="search">查询</Button>
                    <Button type="default" size="small" @click="handleReset">重置</Button>
                    <Button type="primary" size="small" @click="add()">新增</Button>
                </Form-item>
            </Form>
            </Col>
        </Row>
        <Row class="background-color-white exhibition">
            <Tabs @on-click="tabChange" v-model="currentTabName">
                <TabPane label="部门指标" name="department"></TabPane>
                <TabPane label="员工指标" name="employee"></TabPane>
                <TabPane label="评分标准" name="scoreStandard"></TabPane>
            </Tabs>
            <Table :columns="columnsFilter" size="small" highlight-row :data="list"></Table>
            <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
        </Row>
        <Modal v-model="scoreStandardModal" title="评分标准" width="800" :closable="false">
            <score_standard_add :row="submit_data"  ref="scoreStandard"></score_standard_add>
            <div slot="footer">
                <Button type="primary" @click="addScoreStandard">确定</Button>
                <Button type="default" @click="closeScoreStandardModal">取消</Button>
            </div>
        </Modal>

          <Modal v-model="addModal" title="部门指标" width="800" :closable="false">
            <target_add :department-list="departmentList" :type="currentTabName"  ref="targetAdd"></target_add>
            <div slot="footer">
                <Button type="primary" @click="addTargetAdd">确定</Button>
                <Button type="default" @click="closeTargetAddModal">取消</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import Util from "libs/util";
    import score_standard_add from './score-standard.vue'
    import target_add from './target-add.vue'

    export default {
        name: "performance-target",
        data() {
            return {
                formSearch: {
                    org_list_name: []
                },
                columns: [{
                        title: "序号",
                        key: "serialNo",
                        align: "center",
                        width: 80
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        align: "center",
                        width: 180
                    },
                    {
                        title: "员工类型",
                        key: "employee_type",
                        align: "center",
                        width: 120
                    },
                    {
                        title: "指标类型",
                        key: "target_type",
                        align: "center",
                        width: 120
                    },
                    {
                        title: "指标",
                        key: "title",
                        align: "center",
                        minWidth: 150
                    },
                    {
                        title: "过程分值",
                        key: "process_score",
                        align: "center",
                        minWidth: 120
                    },
                    {
                        title: "结果分值",
                        key: "result_score",
                        align: "center",
                        minWidth: 120
                    },
                    {
                        title: "创建时间",
                        key: "created",
                        align: "center",
                        minWidth: 150
                    },
                    {
                        title: "创建人",
                        key: "created_user",
                        align: "center",
                        minWidth: 100
                    },
                    {
                        title: "更新时间",
                        key: "updated",
                        align: "center",
                        width: 150
                    },
                    {
                        title: "更新人",
                        key: "updated_user",
                        align: "center",
                        width: 100
                    },
                    {
                        title: "操作",
                        key: "operate",
                        width: 150,
                        fixed: "right",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.add(params.row);
                                            }
                                        }
                                    },
                                    "查看"
                                )
                            ]);
                        }
                    }
                ],
                list: [],
                pageSize: 10,
                page: 1,
                total: 0,
                departmentList: [],
                employeeTypeList: [{
                        label: "基层",
                        value: "基层"
                    },
                    {
                        label: "中层",
                        value: "中层"
                    },
                    {
                        label: "班长",
                        value: "班长"
                    }
                ],
                targetTypeList: [{
                        value: "能力考核",
                        label: "能力考核"
                    },
                    {
                        value: "价值观考核",
                        label: "价值观考核"
                    }
                ],
                addModal: false,
                scoreStandardModal: false,
                submit_data: {
                    id: 0,
                    title: "",
                    process_score: 10,
                    result_score: 90
                },
                currentTabName: "department",
                addTitle: "添加部门考核目标",
                typeList: [{
                        label: '部门考核',
                        value: 'department'
                    },
                    {
                        label: '员工考核',
                        value: 'employee'
                    }
                ],
                scoreStandardColumns:[
                    {
                        title: "序号",
                        key: "serialNo",
                        align: "center",
                        width: 80
                    },
                    {
                        title: "考核类型",
                        key: "type",
                        align: "center",
                        width: 150,
                        render: (h, params) => {
                            if(params.row.type=='department'){
                                  return h('span','部门考核')
                            }else{
                                  return h('span','员工考核')
                            }
                        }
                    },
                    {
                        title: "员工类型",
                        key: "employee_type",
                        align: "center",
                        minWidth: 150
                    },
                    {
                        title: "评委类型",
                        key: "review_type",
                        align: "center",
                        minWidth: 150
                    },
                    {
                        title: "评分比重(%)",
                        key: "weight",
                        align: "center",
                        minWidth: 120
                    },
                     {
                        title: "操作",
                        key: "operate",
                        minWidth: 150,
                        fixed: "right",
                        align: "center",
                           render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.add(params.row);
                                            }
                                        }
                                    },
                                    "查看"
                                ),
                            ]);
                        }
                    }
                ]
            };
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
            this.getData();
            this.getDepartmentList();
        },
        activated() {},
        computed: {
            columnsFilter: function () {
                if (this.currentTabName == "department") {
                    return this.columns.filter(item => {
                        if (item.key == "employee_type" || item.key == "target_type") {
                            return false;
                        } else {
                            return true;
                        }
                    });
                } else if (this.currentTabName == "employee") {
                    return this.columns.filter(item => {
                        if (item.key == "department_name") {
                            return false;
                        } else {
                            return true;
                        }
                    });
                } else if(this.currentTabName=='scoreStandard'){
                   return this.scoreStandardColumns
                }
                return this.columns;
            }
        },
        methods: {
            currentChange(page) {
                this.page = page
                this.getData()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getData()
            },
            search() {
                this.page = 1;
                this.getData();
            },
            handleReset(){
               this.formSearch={}
               this.search()
            },
            getData() {
                let data = Util.deepClone(this.formSearch)
                data.pageSize = this.pageSize
                data.page = this.page
                data.from ='list'
                let url ='get_performance_target_list_data'
                if(this.currentTabName=='scoreStandard'){
                    url='get_performance_score_standard_list_data'
                }else{
                    data.type = this.currentTabName;
                }
                this.request(url, data, true).then(res => {
                    if (res.errno == 0) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        for (let item of res.data.data) {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                        }
                        this.list = res.data.data;
                        this.total = res.data.count;
                    }
                });
            },
            add(row) {
                if (row) {
                    this.submit_data = {
                        id: row.id,
                        process_score: row.process_score,
                        result_score: row.result_score,
                        title: row.title,
                        department_name: row.department_name,
                        department_id:row.department_id,
                        employee_type: row.employee_type,
                        target_type: row.target_type
                    }

                } else {
                    this.submit_data = {
                        id: 0,
                        process_score:null,
                        result_score:null,
                    };
                }

                if (this.currentTabName == "department") {
                    this.addModal = true;
                    if(row){
                      this.$refs.targetAdd.getData(row);
                    }
                } else if (this.currentTabName == "employee") {
                    this.addModal = true;
                    if(row){
                      this.$refs.targetAdd.getData(row);
                    }
                } else if (this.currentTabName == 'scoreStandard') {
                    this.scoreStandardModal = true
                    if(row){
                      this.$refs.scoreStandard.getData(row);
                    }
                }
            },
            cancel() {
                this.addModal = false;
            },
            getDepartmentList() {
                this.request(
                    "get_department_tree_list", {
                        unitLength: 12
                    },
                    false
                ).then(res => {
                    if (res.errno == 0) {
                        for (let item of res.data) {
                            if (
                                item.id != "-3526866562888413976" &&
                                item.id != "-1469857595728901833" &&
                                item.id != "600241176408378089" &&
                                item.id != "1482119411653692692" &&
                                item.id != "-5996058726624443501" &&
                                item.id != "1092180931861759584" &&
                                item.id != "9035733417452260193" &&
                                item.id != "5710398152837906847" &&
                                item.id != "600241176408378089" &&
                                item.id != "6207590821524490798"
                            ) {
                                this.departmentList.push(item);
                            }
                        }
                    }
                });
            },
            delete(id) {
                this.$Modal.confirm({
                    title: "删除提示",
                    content: "确定要删除当前记录？",
                    loading: true,
                    onOk: () => {
                        this.request(
                            "delete_performance_target_data", {
                                id: id
                            },
                            true
                        ).then(res => {
                            if (res.errno == 0) {
                                this.$Modal.remove();
                                this.$Message.info("删除成功");
                                this.search();
                            }
                        });
                    }
                });
            },
            tabChange() {
                this.search();
                this.$refs.targetAdd.changeTab(this.currentTabName)
            },
            closeScoreStandardModal() {
                this.scoreStandardModal = false
                this.$refs.scoreStandard.clear();
            },
            addScoreStandard() {
                this.$refs.scoreStandard.save().then((res)=>{
                    if(res.errno==0){
                       this.closeScoreStandardModal()
                       this.getData()
                    }else{
                       this.$Message.warning(res.errmsg);
                    }
                });
            },
            closeTargetAddModal(){
                this.addModal = false
                this.$refs.targetAdd.clear();
            },
            addTargetAdd(){
                 this.$refs.targetAdd.save().then((res)=>{
                     if(res.errno==0){
                          this.$Message.success(res.data);
                          this.closeTargetAddModal()
                          this.getData()
                     }else{
                          this.$Message.warning(res.errmsg);
                     }
                 })
            }
        },
        components: {
            score_standard_add,
            target_add
        }
    };
</script>
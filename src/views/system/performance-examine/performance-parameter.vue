<template>
    <div class="background-color-white exhibition" id="performance-parameter" >
             <Row>
            <Form :model="formSearch" :label-width="50" inline label-position="right">
                <Col>
                <Form-item label="部门:"  :label-width="50">
                    <div class="tree">
                        <treeselect
                                style="width:250px;"
                                placeholder="请选择"
                                :multiple="false"
                                value-format="object"
                                :options="departmentList"
                                v-model="formSearch.departmentObj"
                        />
                    </div>
                </Form-item>

                <Form-item label="月份:" :label-width="100">
                    <DatePicker type="month" v-model="formSearch.startDate" placeholder="选择开始月份" style="width: 150px"></DatePicker>
                    <DatePicker type="month" v-model="formSearch.endDate" placeholder="选择结束月份" style="width: 150px"></DatePicker>
        
                </Form-item>

                   <Form-item>
                        
                    <Button type="primary" icon="ios-search" size="small" @click="search">查询</Button>
                    <Button type="primary" size="small" @click="reset">重置</Button>
                    <Button type="primary" size="small" @click="downTemplate">下载模板</Button>
                    <Button type="primary" size="small" @click="importData">导入</Button>
                    <Button type="primary" size="small" @click="openModal('新增绩效参数')">新增</Button>
                    <!-- <Button type="primary" size="small" @click="exportData">导出</Button> -->
                      </Form-item>
                </Col>
            </Form>
        </Row>
       <Row class-name="margin-top-10">
            <Col>
            <Table
                    ref="importDataTable"
                    size="small"
                    :loading="loading"
                    :columns="columns"
                    :data="list"
            >
            </Table>
            <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
                show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
            </Col>
        </Row>
          <Modal
                v-model="importModal"
                title="导入绩效参数">
                <div>
                    <Upload
                        ref="upload"
                        name="file"
                        :show-upload-list="false"
                        :before-upload="handleUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        type="drag"
                        action="/eop/sys/import_performance_parameter"
                        :data="{userCode:userInfo.userAccount}"
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
                    <Button type="primary" @click="importOrderSave">导入</Button>
                </div>
            </Modal>

            <Modal v-model="modal_visible"  :title="modal_title"  :width="850"
                    class-name="customize-modal-center">
                    <div style="height:330px;overflow-y:auto;">
                         <Form ref="submitForm" :model="submit_data" :label-width="80" :rules="ruleValidate">
                       
                        <Row>
                            <Col span='12'>
                            <Form-item label="部门:">
                               <!-- <Input disabled style="width: 250px" v-model="submit_data.departmentName"></Input> -->
                                 <div class="tree">
                                    <treeselect :disabled='modal_title != "新增绩效参数"' style="width:250px" @select="departmentSelected" placeholder="请选择" :multiple="false"
                                        value-format="id" max-height="200" :options="departmentList" @input="searchInput"
                                        v-model="submit_data.departmentId"  />
                                </div>
                            </Form-item>
                            </Col>
                            <Col span='12'>
                            <Form-item label="月份:">
                                <!-- 　　<Input :disabled='modal_title != "新增绩效参数"' style="width: 150px"
                                    v-model="submit_data.dateTime"></Input> -->
                                    <DatePicker type="month" :disabled='modal_title != "新增绩效参数"' v-model="submit_data.dateTime"  placeholder="请选择创建时间" style="width: 180px">
                                    </DatePicker>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="销售额:">
                                　　<Input style="width: 250px" v-model="submit_data.saleAmount"></Input>
                            </Form-item>
                            </Col>

                           <Col span='12'>
                            <Form-item label="询单转化率(%):">
                                　<Input style="width: 250px" v-model="submit_data.conversionRate"></Input>
                            </Form-item>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col span='12'>
                            <Form-item label="复购率(%):">
                                <Input style="width: 250px" v-model="submit_data.rePurchaseRate"></Input>
                            </Form-item>
                            </Col>
                            <Col span='12'>
                            <Form-item label="拒退率(%):">
                                　<Input style="width: 250px" v-model="submit_data.refundRate"></Input>
                            </Form-item>
                            </Col>
                        </Row>
                        
                    </Form>
                   </div>

            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="confirmSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import Util from 'libs/util';
    import {
        LOAD_CHILDREN_OPTIONS
    } from '@riophae/vue-treeselect'
     function submit_data(){
        return {
            departmentId:'', 	        //  部门id	        string	
            departmentName:'',           //	部门名称	    string	
            createUser:'',          //	创建人	        string	当前用户账号
            dateTime:'',               //	月份	        string	格式：yyyy-mm
            saleAmount:'',        //	销售额	 number	
            rePurchaseRate:'',        //	复购率	    number	
            remark:'',              //	备注	        string
            conversionRate:'',        //  转化率
            refundRate:'',
        }
    }
   
    export default {
        name: 'performance-parameter',
        desc: '绩效参数',
        // components: {YImage},
        data() {
            return {
                formSearch: {
                   
                },
                importModal: false,
                modal_visible:false,
                loadingStatus: false,
                loading: false, //表格数据加载开关
                columns: [{
                    title: '序号',
                    key: 'serialNo',
                    align: 'center',
                    width: 60
                },{
                    title: '部门',
                    key: 'departmentName',
                    align: 'center',
                    width: 100,
                },{
                    title: '月份',
                    key: 'dateTime',
                    align: 'center',
                    width: 100,
                },{
                    title:'销售额',
                    key:'saleAmount',
                    align:'center',
                    width:100
                },
                {
                    title: '复购率(%)',
                    key: 'rePurchaseRate',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '询单转化率(%)',
                    key: 'conversionRate',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '拒退率(%)',
                    key: 'refundRate',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '创建人',
                    key: 'createUser',
                    align: 'center',
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'created',
                    align: 'center',
                    width: 150
                },
                {
                    title: '更新人',
                    key: 'lastUpdateUser',
                    align: 'center',
                    width: 100
                },
                {
                    title: '更新时间',
                    key: 'lastUpdated',
                    align: 'center',
                    width: 150,
                },{
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
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal('编辑绩效参数',params.row);
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
                list: [],
                file: null,
                page: 1,
                modal_visible: false,
                pageSize: 10,
                ruleValidate:{},
                total: 0,
                userInfo:{},
                submit_data:{},
                departmentList: []
            }
        },
        computed: {

        },
        mounted() {
            this.userInfo=JSON.parse(window.sessionStorage.getItem('userinfo'));    
            this.getData()
            this.getDepartmentTree()
        },
        methods: {
            departmentSelected(item){
                this.submit_data.departmentId = item.id
                this.submit_data.departmentName = item.title
            },
            search() {
                this.page =1;
                this.getData()
            },
            reset() {
                this.formSearch = {}
                this.search();
            },
            openModal(title,params){
                this.modal_title = title;
                this.$refs['submitForm'].resetFields();
                this.modal_visible = true;
                if(title == '编辑绩效参数'){
                    this.submit_data = Util.deepClone(params);
                }else{
                    this.submit_data.dateTime=new Date();
                }
                
            },
            cancel() {
                this.modal_visible = false
            },
            //保存
            confirmSave() {
                let data = Util.deepClone(this.submit_data)
                let url = '';
                if(this.modal_title == '新增绩效参数'){
                    data.createUser = this.userInfo.userName;
                    url = 'add_performance_parameter';
                }else if(this.modal_title == '编辑绩效参数'){
                    url='edit_performance_parameter';
                    delete data.serialNo
                    delete data._index
                    delete data._rowKey
                    data.lastUpdateUser = this.userInfo.userAccount
                }
                data.dateTime = Util.dateFormat(data.dateTime,'yyyy-MM');
                if(data.conversionRate>100){
                    this.$Message.warning('询单转化率不能大于100%');
                    return false;
                }
                this.request(url, {data:data}, '正在保存数据...').then((res) => {
                    if (res.code == 1) {
                        this.getData()
                        this.$Message.success(res.msg)
                        this.submit_data = {}
                        this.cancel()
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            

            },
            currentChange(val) {
                this.page = val;
                this.getData();
            },
            sizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            downTemplate() {
                window.location = ('/excel/绩效参数导入模板.xlsx');
            },
            importData() {
                this.importModal = true;
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
                    this.$Message.success(res.msg);
                    this.importModal = false;
                    this.search();
                } else {
                    this.loadingStatus = false;
                    this.$Message.error({
                        content: res.msg,
                        duration: 3
                    });
                }
            },
            uploadError(res, file) {
                this.$Message.error(res.msg + res.data);
            },
            importOrderSave() {
                this.loadingStatus = true;
                Vue.prototype.$loading('正在导入数据...');
                this.$refs.upload.post(this.file);
            },
            delete(id) {
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要删除当前记录？',
                    loading: true,
                    onOk: () => {
                        this.request('delete_performance_parameter', {
                            data:{
                                id: id
                            }
                        }, true).then((res) => {
                            if (res.code == '1') {
                                this.$Modal.remove();
                                this.$Message.info('删除成功');
                                this.getData()
                            }
                        })
                    }
                });
            },
            getData() {
                let data = Util.deepClone(this.formSearch);
                if (data.dateTime) {
                    data.startDate = Util.dateFormat(data.startDate, 'yyyy-MM')
                }
                if (data.endDate) {
                    data.endDate = Util.dateFormat(data.endDate, 'yyyy-MM')
                }
                if (this.formSearch.departmentObj) {
                    data.departmentId = this.formSearch.departmentObj.id
                    delete data.departmentObj
                }
                delete data.dateTime
                data.length = this.pageSize;
                data.start = (this.page - 1) * this.pageSize;
                this.request('get_performance_parameter_list', {
                    data: data
                }, true).then((res) => {
                    let serialNoBegain = this.pageSize * (this.page - 1);
                    res.data.PerformanceParameterList.map(x => {
                        serialNoBegain++;
                        x.serialNo = serialNoBegain;
                    })
                    this.total = res.data.count;
                    this.list = res.data.PerformanceParameterList
                    console.log(res)
                })
            },
            exportData(){
                let data = Util.deepClone(this.formSearch);
                if (data.dateTime&&data.dateTime[0]) {
                    data.startTime = Util.dateFormat(data.dateTime[0], 'yyyy-MM-dd')
                    data.endTime = Util.dateFormat(data.dateTime[1], 'yyyy-MM-dd')
                }
                for(let x in data){
                    if(!data[x]){
                        delete data[x]
                    }
                }
                var formData=new FormData();
                for(var key in data){
                    formData[key] = data[key];
                }
                this.$Spin.show();
                axios.get(`/eop/eom/vip/export_vip_goods_list?data=${encodeURIComponent(JSON.stringify(formData))}`,{

                },true).then(res=>{
                    if(res.status == 200 && !!res.data ){
                        window.open( `/eop/eom/vip/export_vip_goods_list?data=${encodeURIComponent(JSON.stringify(formData))}`);
                        this.$Spin.hide();
                    }else{
                        this.$Message.warning('无数据可导出！');
                        this.$Spin.hide();
                    }
                })
            },
            getDepartmentTree(){
                this.request('get_department_tree_list', {}, false).then((res) => {
                    if (res.errno == 0) {
                        this.departmentList = Util.arrayToDepartmentTree(Util.deepClone(res.data))
                    }
                })
            }
        }
    }
</script>

<style lang="css">
  
</style>

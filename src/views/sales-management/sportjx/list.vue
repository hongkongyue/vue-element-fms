<style>
</style>
<template>
    <div class="background-color-white exhibition">
        <Form :model="formSearch" class="search" ref="formSearch" :label-width="90" inline label-position="right"
              @keydown.native.enter="search">
            <Form-item label="订单状态：">
                <Select style="width:160px" v-model="formSearch.orderStatus" placeholder="请选择">
                    <Option v-for="item in orderStatusList" :value="item.statusCode" :key="item.statusCode">
                        {{ item.statusName }}
                    </Option>
                </Select>
            </Form-item>
            </Col>
            <Form-item label="店铺：">
                <Select style="width:160px" v-model="formSearch.shopId" placeholder="请选择" @on-change="changeShop">
                    <Option v-for="item in shopList" :value="item.shop_id" :key="item.shop_id">{{ item.remark }}
                    </Option>
                </Select>
            </Form-item>
            <Form-item label="原始单号：">
                <Input v-model="formSearch.sourceOrderCode" placeholder="请输入原始单号" style="width:160px"></Input>
            </Form-item>
            <Form-item label="订单编号：">
                <Input v-model="formSearch.orderId" placeholder="请输入订单编号" style="width:160px"></Input>
            </Form-item>
            <br>
            <Form-item label="收件人手机：">
                <Input v-model="formSearch.phoneNo" placeholder="请输入收件人手机" style="width:160px"></Input>
            </Form-item>
            <Form-item label="活动名称：">
                <Select style="width:160px" v-model="formSearch.liveName" placeholder="请选择">
                    <Option v-for="item in liveList" :value="item.liveName" :key="item.liveName">{{ item.liveName }}
                    </Option>
                </Select>
            </Form-item>
            <Form-item label="支付时间：">
                <DatePicker v-model="formSearch.payStartDate" type="date" placeholder="请输入起始时间"
                            style="width:210px"></DatePicker>
                <DatePicker v-model="formSearch.payEndDate" type="date" placeholder="请输入结束时间"
                            style="width:210px"></DatePicker>
            </Form-item>
            <br>
            <Form-item label="创建时间：">
                <DatePicker v-model="formSearch.createStartDate" type="date" placeholder="请输入起始时间"
                            style="width:210px"></DatePicker>
                <DatePicker v-model="formSearch.createEndDate" type="date" placeholder="请输入结束时间"
                            style="width:210px"></DatePicker>
            </Form-item>
            
            <Form-item :label-width="20">
                <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                <Button type="default" @click="handleReset('formSearch')">重置</Button>
            </Form-item>
        </Form>
        <Row class-name="margin-bottom-10">
            <Col span="24" class="">
            <Button type="primary" icon="arrow-down-a" @click="downTemplate()">
                下载模板
            </Button>
            <Button type="primary" icon="arrow-up-a" @click="importSalesOrder">
                批量导入
            </Button>
            </Col>
        </Row>
        <!-- 表格 -->
        <Row class="margin-bottom-10">
            <Table size="small" ref="orderList" :columns="columns" :data="list"></Table>
        </Row>
        <Row>
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-sizer show-total show-elevator
                  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </Row>

        <Modal
                v-model="importModal"
                title="批量导入">
            <div>
                <Upload
                        ref="upload"
                        name="file"
                        :show-upload-list="false"
                        :before-upload="handleUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        type="drag"
                        action="/eop/eom/spl/importExcelOrder"
                        :data="{account:userInfo.userAccount,userId:userInfo.userId,importType:'THMS'}"
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
                <Button type="primary" @click="importSalesOrderSave">导入</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

    import {mapState} from 'vuex'
    import Util from 'libs/util'

    function formSearch() {
        return {
            createStartDate: '', //创建起始日期
            createEndDate: '',   //创建结束日期
            payStartDate: '',    //支付起始日期
            payEndDate: '',      //支付结束日期
            orderStatus: '',     //订单状态,
            liveName: '',          //活动ID
            phoneNo: '',         //收件人手机
            shopId: '',          //店铺ID
            sourceOrderCode: '', //原始订单号
            orderId:''
        }
    }

    export default {
        name: "sportjx_list",
        desc: '原始订单列表页面',
        data() {
            return {
                formSearch: formSearch(),
                columns: [
                    {
                        type: 'selection',
                        minWidth: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '平台',
                        key: 'orderPlatfrom',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '店铺',
                        key: 'shopName',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '订单编号',
                        key: 'orderId',
                        align: 'center',
                        minWidth: 220,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'salesorder_detail',
                                            params: {orderId: params.row.orderId, row: params.row}
                                        })
                                    }
                                }
                            }, params.row.orderId);
                        }
                    },
                    {
                        title: '原始单号',
                        key: 'sourceOrderCode',
                        align: 'center',
                        minWidth: 200
                    },
                    {
                        title: '活动名称',
                        key: 'liveName',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align: 'center',
                        minWidth: 85,
                        render: (h, params) => {
                            return h('span', {}, Util.formatOrderStatus(params.row.orderStatus));
                        }
                    },
                    {
                        title: '承运商',
                        key: 'logisticsCompany',
                        align: 'center',
                        minWidth: 85
                    },
                    {
                        title: '物流单号',
                        key: 'logisticsNo',
                        align: 'center',
                        minWidth: 110
                    },
                    {
                        title: '订单金额',
                        key: 'totalMoney',
                        align: 'center',
                        minWidth: 85
                    },
                    {
                        title: '商品总数',
                        key: 'totalQty',
                        align: 'center',
                        minWidth: 85
                    },
                    {
                        title: '下单时间',
                        key: 'orderTime',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '支付时间',
                        key: 'payTime',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '创建时间',
                        key: 'created',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '推送时间',
                        key: 'lastUpdated',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        fixed: 'right',
                        width: 100,
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
                                            this.$router.push({
                                                name: 'salesorder_detail',
                                                params: {orderId: params.row.orderId, row: params.row}
                                            })
                                        }
                                    }
                                }, '查看'),
                            ])
                        }
                    }
                ],
                //列表数据
                list: [],
                //总共数据多少条
                total: 25,
                //每页多少条数据
                pageSize: 10,
                //当前页码
                pageNumber: 1,
                shopList: [],
                liveList: [],
                importModal: false,
                file: null,
                loadingStatus: false,
                userInfo: {}
            }
        },
        mounted() {
            this.$store.dispatch('get_order_status_list', {});
            this.get_shop_list();
            this.get_lives_list();
        },
        activated() {
            this.get_order_list();
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        computed: {
            ...mapState({
                orderStatusList: state => state.common.orderStatusList
            })
        },
        methods: {
            //重置表单数据
            handleReset() {
                this.formSearch = {};
                this.search();
            },
            //表单搜索
            search() {
                let page = 1;
                this.pageNumber = page;
                this.get_order_list();
            },
            get_order_list() {
                let dataMap = this.formSearch;
                dataMap.start_num = (this.pageNumber - 1) * this.pageSize;
                dataMap.length = this.pageSize;
                if (!!dataMap.createStartDate) {
                    dataMap.createStartDate = Util.dateFormat(dataMap.createStartDate, 'yyyy-MM-dd');
                }
                if (!!dataMap.createEndDate) {
                    dataMap.createEndDate = Util.dateFormat(dataMap.createEndDate, 'yyyy-MM-dd');
                }
                if (!!dataMap.payStartDate) {
                    dataMap.payStartDate = Util.dateFormat(dataMap.payStartDate, 'yyyy-MM-dd');
                }
                if (!!dataMap.payEndDate) {
                    dataMap.payEndDate = Util.dateFormat(dataMap.payEndDate, 'yyyy-MM-dd');
                }
                this.request('get_sportjx_order_list', {
                    data: dataMap
                }, true).then(res => {
                    if (res.code == 1) {
                        let serialNoBegain = this.pageSize * (this.pageNumber - 1);
                        res.data.orderList.forEach((item) => {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                        })
                        this.list = res.data.orderList;
                        this.total = res.data.orderCount;
                    }
                })
            },
            get_shop_list() {
                this.request('get_sportjx_shop_list', {
                    data:{
                        orderType:'THMS'
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        this.shopList = res.data;
                    }
                })
            },
            changeShop(shopId) {
                this.get_lives_list(shopId);
            },
            get_lives_list(shopId) {
                this.request('get_sportjx_lives_list', {
                    data:{
                        shopId:shopId
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        this.liveList = res.data;
                        this.liveList = this.liveList.filter(x => {
                            if (x != null) {
                                return x;
                            }
                        })
                    }
                })
            },
            changePage(val) {
                this.pageNumber = val;
                this.get_order_list();
            },
            changePageSize(val) {
                this.pageSize = val;
                this.get_order_list();
            },

            //下载模板
            downTemplate() {
                window.location = ('/excel/订单批量导入模板.xlsx')
            },
            //批量导入弹窗
            importSalesOrder() {
                this.file = null;
                this.$refs.upload.clearFiles();
                this.importModal = true;
            },
            cancel() {
                this.importModal = false;
            },
            importSalesOrderSave() {
                this.loadingStatus = true;
                this.$refs.upload.post(this.file);
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
                if (res.code == 1) {
                    this.loadingStatus = false;
                    this.$Message.success(res.msg);
                    this.importModal = false;
                    this.search();
                } else {
                    this.loadingStatus = false;
                    this.$Message.error(res.msg + res.data);
                }
            },
            uploadError(res, file) {
                this.$Message.error(res.msg + res.data);
            },
        }
    }
</script>


<style lang="less">

</style>

<template>
    <div class="background-color-white exhibition">
        <Row class="margin-bottom-10">
            <Col span="24" class="search">
            <Form :model="formSearch" :label-width="100" inline label-position="right">
                <Row>
                    <Form-item label="登陆时间:">
                        <DatePicker type="daterange" v-model="formSearch.created" :options="pickerOptions" split-panels placeholder="请选择登陆时间" style="width: 200px"></DatePicker>
                    </Form-item>
                    <Form-item :label-width="1">
                        <Button type="primary" @click="search" icon="ios-search">查询</Button>
                        <Button type="primary" @click="handleReset">重置</Button>
                    </Form-item>
                </Row>

            </Form>
            </Col>
            <Col span="24">
            <Table size="small" :columns="columns" :data="list" border highlight-row></Table>
            </Col>
        </Row>
        <Row>
            <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </Row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Util from 'libs/util'

    function formSearch() {
        return {
            created:[],
        }
    }

    export default {
        name: "login_log",
        data() {
            return {
                formSearch: formSearch(),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
                list: [],
                columns: [
                    {
                        title: '序号',
                        key:'serialNo',
                        align: 'center',
                        minWidth: 65
                    },
                    {
                        title: '账号',
                        key: 'userAccount',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '用户id',
                        key: 'userId',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '用户名',
                        key: 'userName',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '浏览器',
                        key: 'browserName',
                        align: 'center',
                        minWidth: 85,
                    },
                    {
                        title: '浏览器版本',
                        key: 'browserVersion',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '时间',
                        key: 'created',
                        align: 'center',
                        minWidth: 180,
                    },
                    {
                        title: 'ip地址',
                        key: 'loginIp',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '登录结果',
                        key: 'loginResult',
                        align: 'center',
                        minWidth:130,
                    },
                    {
                        title: '操作系统',
                        key: 'osName',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '说明',
                        key: 'remark',
                        align: 'center',
                        minWidth: 100,
                    }
                ],
                pageSize:10,
                page:1,
                total:0,
            };
        },
        computed: {},
        methods: {
            get_login_log_list() {
                let data = Util.deepClone(this.formSearch);
                data.start = (this.page -1) * this.pageSize ;
                data.length = this.pageSize;
                data.userId = JSON.parse(window.sessionStorage.getItem('userinfo')).userId;
                if(data.created.length == 2 && !!data.created[0] && !!data.created[1]){
                    data.startDate = Util.dateFormat(data.created[0], 'yyyy-MM-dd');
                    data.endDate = Util.dateFormat(data.created[1], 'yyyy-MM-dd');
                }else{
                    data.startDate = '';
                    data.endDate = '';
                }
                delete data.created;
                this.request('get_login_log_list', {
                    data:data
                }, true).then(res => {
                    if (res.code == 1) {
                        let serialNoBegain = this.pageSize * (this.page - 1);
                        res.data.loginList.map(x => {
                            serialNoBegain++;
                            x.serialNo = serialNoBegain;
                        })
                        this.total = res.data.counts;
                        this.list = res.data.loginList;
                    }
                })
            },
            search() {
                this.page = 1;
                this.get_login_log_list();
            },
            handleReset() {
                this.formSearch = formSearch();
                this.search();
            },
            changePage(page) {
                this.page = page;
                //获取最新数据
                this.get_login_log_list();
            },
            //分页切换每页记录数
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                //获取最新数据
                this.get_login_log_list();
            },
        },
        activated() {
            this.get_login_log_list();
        }
    };
</script>

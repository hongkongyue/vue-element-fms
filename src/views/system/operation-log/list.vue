<style lang="less">

</style>

<template>
<div class="background-color-white exhibition">
  <Row class="margin-bottom-10">
    <Col span="24" class="search">
    <Form :model="formSearch" :label-width="100" inline label-position="right">
      <Row>
        <Form-item label="操作时间:">
          <DatePicker type="daterange" v-model="formSearch.created" :options="pickerOptions" split-panels placeholder="请选择操作时间"
            style="width: 200px"></DatePicker>
        </Form-item>
        <Form-item label="操作人:">
          <Input style="width:250px" v-model="formSearch.userName" placeholder="请输入操作人姓名"></Input>
        </Form-item>
        <Form-item label="操作描述:">
          <Select filterable=true v-model="formSearch.desc" style="width:200px">
            <Option v-for="item in resourceList" :value="item.resource_name" :key="item.resource_name">{{
              item.resource_name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label-width="1">
          <Button type="primary" @click="search" icon="ios-search">查询</Button>
          <Button type="primary" @click="handleReset">重置</Button>
        </Form-item>
      </Row>
    </Form>
    </Col>
  </Row>
  <Tabs value="">
    <TabPane label="列表" name="name1">

      <Row class="margin-bottom-10">
        <Col span="24">
        <Table size="small" :columns="columns" :data="list" border highlight-row></Table>
        </Col>
      </Row>
      <Row>
        <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="changePage"
          @on-page-size-change="changePageSize"></Page>
      </Row>
    </TabPane>
    <TabPane label="汇总" name="name2">
      <div style="overflow: hidden;overflow-x: auto;" id="opeartion_log_summary_by_desc"></div>
    </TabPane>
  </Tabs>
</div>
</template>

<script>
  import Vue from 'vue'
  import Util from 'libs/util'

  function formSearch() {
    return {
      created: [new Date(), new Date()],
      userName: ''
    }
  }

  export default {
    name: "operation_log_list",
    data() {
      return {
        formSearch: formSearch(),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        list: [],
        columns: [{
            title: '序号',
            key: 'serialNo',
            align: 'center',
            width: 60
          },
          {
            title: '操作类型',
            key: 'type',
            align: 'center',
            width: 85,
          },
          {
            title: '操作描述',
            key: 'desc',
            align: 'left',
            minWidth: 300,
            render: (h, params) => {
              if (params.row.resource_name) {
                //   return h('div',[h('span',params.row.description),h('span','  '),h('Tag',{
                //   props:{
                //     color:'#5cadff'
                //   }
                // },params.row.resource_name)])
                return h('span', params.row.resource_name)
              } else {
                return h('span', params.row.description)
              }
            }
          },
          {
            title: '操作人',
            key: 'user_name',
            align: 'center',
            width: 75,
          },
          {
            title: '设备类型',
            key: 'device_type',
            align: 'center',
            width: 85
          },
          {
            title: '客户端IP',
            key: 'login_ip',
            align: 'left',
            width: 130,
          },
          {
            title: '客户端系统',
            key: 'os_name',
            align: 'center',
            width: 120
          },
          {
            title: '浏览器',
            key: 'browser_name',
            align: 'center',
            width: 100,
          },
          {
            title: '浏览器版本',
            key: 'browser_version',
            align: 'center',
            width: 120
          },
          {
            title: '操作时间',
            key: 'created',
            align: 'center',
            width: 150
          },

        ],
        pageSize: 10,
        page: 1,
        total: 0,
        chartObj: null,
        resourceList: []
      };
    },
    computed: {},
    methods: {
      get_operation_log_list() {
        let data = Util.deepClone(this.formSearch);
        data.pageNum = this.page;
        data.pageSize = this.pageSize;

        for (let [x, y] of data.created.entries()) {
          if (!!y) {
            data.created[x] = Util.dateFormat(y, 'yyyy-MM-dd')
          }
        }

        this.request('get_operation_log_list', data, true).then(res => {
          if (res.status == 'success') {
            let serialNoBegain = this.pageSize * (this.page - 1);
            res.data.data.map(x => {
              serialNoBegain++;
              x.serialNo = serialNoBegain;
              if (x.resource_name) {
                x.desc = x.description + '[' + x.resource_name + ']'
              }
            })
            this.total = res.data.count;
            this.list = res.data.data;
          }
        })
      },
      search() {
        this.page = 1;
        this.get_operation_log_list();
        this.get_operation_log_summary()
      },
      handleReset() {
        this.formSearch = formSearch();
        this.search();
      },
      changePage(page) {
        this.page = page;
        //获取最新数据
        this.get_operation_log_list();
      },
      //分页切换每页记录数
      changePageSize(pageSize) {
        this.pageSize = pageSize;
        //获取最新数据
        this.get_operation_log_list();
      },
      get_operation_log_summary() {
        let data = Util.deepClone(this.formSearch);
        for (let [x, y] of data.created.entries()) {
          if (!!y) {
            data.created[x] = Util.dateFormat(y, 'yyyy-MM-dd')
          }
        }
        this.request('get_opeartion_log_summary', data, false).then((res) => {
          let data = res.data
          this.refreshReport(data)
        })
      },
      refreshReport(data) {
        if (this.chartObj) {
          this.chartObj.changeData(data)
          if (data.length * 25 <= 500) {
            this.chartObj.changeWidth(500)
          } else {
            this.chartObj.changeWidth(data.length * 25)
          }
          return;
        }
        var chart = new G2.Chart({
          container: 'opeartion_log_summary_by_desc',
          // forceFit: true,
          height: screen.height / 2,
          padding: 'auto',
          width: data.length * 25 > 500 ? data.length * 25 : 500
        });
        chart.source(data, {
          total: {
            alias: '访问数'
          },
        });
        chart.axis('resource_name', {
          label: {
            autoRotate: false,
            textStyle: {
              rotate: 20 * Math.PI / 180,
              textAlign: 'start'
            },
            subTickCount: 2
          }
        });
        chart.interval().position('resource_name*total')
        chart.render();
        this.chartObj = chart
      },
      getResourceList() {
        this.request('get_sysresource_list').then((res) => {
          this.resourceList = res.data
        })
      },
    },
    mounted() {
      this.getResourceList()
      this.get_operation_log_list();
      this.get_operation_log_summary()
    }
  };
</script>

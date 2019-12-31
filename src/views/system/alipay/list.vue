<style lang="less">

</style>

<template>
  <div class="background-color-white exhibition">
    <Row class="margin-bottom-10">
      <Col span="24" class="search">
      <Form :model="formSearch" :label-width="100" inline label-position="right">
        <Row>
        <Form-item label="下单时间:" :label-width="70">
          <DatePicker type="daterange" v-model="formSearch.gmt_create" :options="pickerOptions" split-panels
                      placeholder="请选择下单时间" style="width: 200px"></DatePicker>
        </Form-item>
        <Form-item label="支付时间:">
          <DatePicker type="daterange" v-model="formSearch.gmt_payment" :options="pickerOptions" split-panels
                      placeholder="请选择支付时间" style="width: 200px"></DatePicker>
        </Form-item>
        <Form-item  label="支付宝交易号:">
          <Input style="width:250px" v-model="formSearch.trade_no" placeholder="请输入支付宝交易号"></Input>
        </Form-item>
        </Row>
         <Row>
            <Form-item label="商户订单号:">
          <Input v-model="formSearch.out_trade_no" placeholder="请输入内购单号"></Input>
        </Form-item>
         <Form-item label="收款账号:">
          <Input style="width:200px;" v-model="formSearch.alipay_account" placeholder="请输入收款支付宝账号"></Input>
        </Form-item>
          <Form-item label="通知类型:">
          <Select style="width:162px" v-model="formSearch.notify_type" placeholder="请选择">
            <Option v-for="item in notify_type_list" :value="item.code" :key="item.code">{{ item.name}}
            </Option>
          </Select>
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
      <Page :total="total" :page-size="pageSize" :current="page" show-sizer show-total show-elevator
            @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </Row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Util from 'libs/util'

  var subject = Vue.extend({
    props: ['params'],
    data() {
      return {
        Data: [],
        readMore_visible:[]
      }
    },
    template: `
      <div>
        <p v-for="(item,index) in Data">
          {{ item }}
        </p>
        <span style="color:#2d8cf0;cursor: pointer"
         v-if="params.row.subjectList.length > 1 && !readMore_visible[params.index]"
         @click="readMore(params.index)"
        >
          查看更多
        </span>
        <span style="color:#2d8cf0;cursor: pointer"
        v-if="params.row.subjectList.length > 1 && readMore_visible[params.index]"
          @click="readSome(params.index)"
        >收起</span>
      </div>
    `,
    mounted(){
      this.Data = this.params.row.subjectList.slice(0,1);
      this.readMore_visible = [];
      this.readMore_visible.push(false);
    },
    methods: {
      readMore(index) {
        this.readMore_visible[index] = true;
        this.Data = [];
        this.$set(this.Data,0,this.params.row.subjectList);
        this.Data = this.Data[0];
      },
      readSome(index){
        this.readMore_visible[index] = false;
        this.Data = [];
        this.$set(this.Data,0,this.params.row.subjectList.slice(0,1));
        this.Data = this.Data[0];
      }
    }
  })

   var refund = Vue.extend({
    props: ['params'],
    data() {
      return {
        data: [],
        hasFefund:false,//是否有退款
      }
    },
    template: `
     <div>
      <Tooltip v-if="hasFefund"  placement="right">
      　<span　class="orange">有退款</span>
        <div slot="content">
            <p>退款金额：{{data.refund_fee}}</p>
            <p>退款流水号:</p>
            <span>{{data.out_biz_no}}</span>
            <p>退款时间:{{data.gmt_refund}}</p>
        </div>
      </Tooltip>
      <span v-if="!hasFefund">无退款</span>
    </div>
    `,
    mounted(){
      this.data = this.params.row;
      if(this.data.refund_fee){
        this.hasFefund = true;
      }
    }
  })

  function formSearch() {
    return {
      gmt_create:[],
      gmt_payment:[],
      trade_no: ''
    }
  }

  export default {
    name: "alipay_list",
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
            width: 60
          },
           {
            title: '通知类型',
            key: 'notify_type',
            align: 'center',
            width: 85,
            render: (h, params) => {
              let showColor='green';
              if(params.row.notify_type=='trade_refund'){
                showColor='red';
              }
              return h('Tag',{
                props:{
                  color:showColor
                }
              },params.row.notify_type == 'trade_refund' ? '退款' : '付款')
            }
          },
          {
            title: '通知时间',
            key: 'notify_time',
            align: 'center',
            width: 150
          },
          {
            title: '商户订单号(内购单号)',
            key: 'out_trade_no',
            align: 'center',
            width: 180,
            render:(h,params) => {
              return h('a',{
              on: {
                 click: () => {
                      this.viewStaffSalesOrder(params.row.out_trade_no);
                 }
              }
              },params.row.out_trade_no);
            }
          },
          {
            title: '支付宝交易号',
            key: 'trade_no',
            align: 'center',
            width: 230
          },
          {
            title: '订单信息',
            key: 'subject',
            align: 'left',
            minWidth:200,
            render: (h, params) => {
              return h(subject, {
                props: {
                  params: params,
                }
              })
            }
          },
          {
            title: '订单金额',
            key: 'total_amount',
            align: 'center',
            width: 85
          },
          {
            title: '退款信息',
            key: 'refund_fee',
            align: 'center',
            width: 85,
            render: (h, params) => {
              return h(refund, {
                props: {
                  params: params
                }
              },'有')
            }
          },
          {
            title: '支付状态',
            key: 'total_amount',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('Span',params.row.trade_status == 'TRADE_SUCCESS' ? '支付成功' : '')
            }
          },
          {
            title: '收款账号',
            key: 'alipay_account',
            align: 'center',
            width: 200
          },
          {
            title: '下单时间',
            key: 'gmt_create',
            align: 'center',
            width: 150
          },
          {
            title: '支付时间',
            key: 'gmt_payment',
            align: 'center',
            width: 150
          },

        ],
        pageSize:10,
        page:1,
        total:0,
        notify_type_list:[
          {
            code:'trade_status_sync',
            name:'付款'
          },
            {
            code:'trade_refund',
            name:'退款'
          }
        ]
      };
    },
    computed: {},
    methods: {
      get_alipay_order_list() {
        let data = Util.deepClone(this.formSearch);
        data.pageNum = this.page;
        data.pageSize = this.pageSize;
        data.gmt_create.forEach(x=>{
          if(!!x){
            Util.dateFormat(x, 'yyyy-MM-dd')
          }
        })
        for(let [x,y] of data.gmt_create.entries()){
          if(!!y){
            data.gmt_create[x] = Util.dateFormat(y, 'yyyy-MM-dd')
          }
        }
        for(let [x,y] of data.gmt_payment.entries()){
          if(!!y){
            data.gmt_payment[x] = Util.dateFormat(y, 'yyyy-MM-dd')
          }
        }

        this.$nextTick(()=>{
          console.log(data);

        })
        this.request('get_alipay_order_list', data, true).then(res => {
          if (res.status == 'success') {
            let serialNoBegain = this.pageSize * (this.page - 1);
            res.data.data.map(x => {
              serialNoBegain++;
              x.serialNo = serialNoBegain;
              x.subjectList = x.subject.split(';');
            })
            this.total = res.data.count;
            this.list = res.data.data;
          }
        })
      },
      search() {
        this.page = 1;
        this.get_alipay_order_list();
      },
      handleReset() {
        this.formSearch = formSearch();
        this.search();
      },
      changePage(page) {
        this.page = page;
        //获取最新数据
        this.get_alipay_order_list();
      },
      //分页切换每页记录数
      changePageSize(pageSize) {
        this.pageSize = pageSize;
        //获取最新数据
        this.get_alipay_order_list();
      },
       viewStaffSalesOrder(orderId) {
        this.$router.push({
          name: 'staffsalesorder_detail',
          params: {
            orderId: orderId,
            pageType: 'check'
          }
        });
      },
    },
    activated() {
      this.get_alipay_order_list();
    },
  };
</script>

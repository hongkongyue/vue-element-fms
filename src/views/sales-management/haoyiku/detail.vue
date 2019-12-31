<style>

</style>

<template>
  <div class="background-color-white" id="salesorder_detail">
    <Card dis-hover>
      <Form ref="salesorderDetail" class="detailForm" :model="$route.params.row" :label-width="88" inline label-position="right">
        <Row class-name="margin-bottom-10 divide-line">
          <i-col span="22">
            <b>当前状态：</b><span style="color:#ed3f14" class="card-form-title">{{salesorderDetail.orderStatusShow}}</span>
          </i-col>
        </Row>
        <Row class-name="margin-bottom-10  divide-line">
          <i-col span="24">
            <span class="card-form-title"><b>单据信息</b></span>
          </i-col>
        </Row>
        <Row>
          <Col span="6">
          <Form-item label="原始单号：">
            {{salesorderDetail.sourceOrderCode}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="订单编号：">
            {{salesorderDetail.orderId}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="店铺：">
            {{salesorderDetail.shopName}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="平台：">
            {{salesorderDetail.orderPlatfrom}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="订单时间：">
            {{salesorderDetail.orderTime}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="支付时间：">
            {{salesorderDetail.payTime}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="创建时间：">
            {{salesorderDetail.created}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="推送时间：">
            {{salesorderDetail.lastUpdated}}
          </Form-item>
          </Col>
        </Row>
        <Row class-name="margin-bottom-10 padding-bottom-10 divide-line">
          <i-col span="24">
            <span class="card-form-title"><b>承运信息</b></span>
          </i-col>
        </Row>
        <Row>
          <Col span="6">
          <Form-item label="物流公司：">
            {{salesorderDetail.logisticsCompany}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="物流单号：">
            {{salesorderDetail.logisticsNo}}
          </Form-item>
          </Col>
          <Col span="24">
          <Form-item label="收件信息：">
            <span class="margin-right-10">{{salesorderDetail.consigne}}</span>
            <span class="margin-right-10">{{salesorderDetail.phoneNo}}</span>
            <span class="margin-right-10">{{salesorderDetail.address}}</span>
          </Form-item>
          </Col>
          <Col span="24">
          <Form-item label="发件信息：">
            <span class="margin-right-10">{{salesorderDetail.sender}}</span>
            <span class="margin-right-10">{{salesorderDetail.sendTel}}</span>
            <span class="margin-right-10">{{salesorderDetail.sendAddress}}</span>
          </Form-item>
          </Col>
          <Col span="24">
          <Form-item label="备注：">
            {{salesorderDetail.remark}}
          </Form-item>
          </Col>
        </Row>
      </Form>
      <Row class-name="margin-bottom-10 padding-bottom-10 divide-line">
        <i-col span="24">
          <span class="card-form-title"><b>商品信息</b></span>
        </i-col>
      </Row>
      <Row class-name="margin-bottom-10 padding-bottom-10 divide-line">
        <Col span="24">
        <Table size="small" :columns="columns" :border="true" :data="salesorderDetail.staffOrderDetailList"></Table>
        </Col>
      </Row>
      <Row class-name="margin-bottom-10 padding-bottom-10 text-align-right">
        <i-col span="24">
          <span style="color:#F60" class="card-form-title"><b>订单总金额：</b>{{salesorderDetail.totalMoney}}</span>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import Util from '../../../libs/util';

  export default {
    name: "haoyiku_detail",
    data() {
      return {
        salesorderDetail: {},
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 70
          },
          {
            title: '品牌',
            key: 'brands',
            align: 'center',
          },
          {
            title: '款号',
            key: 'sectionNo',
            align: 'center',
          },
          {
              title: '规格名称',
              key: 'norms',
              align: 'center',
          },
          {
            title: '商品条码',
            key: 'commodityCode',
            align: 'center',
          },
          {
            title: '单价',
            key: 'price',
            align: 'center',
            minWidth: 65
          },
          {
            title: '数量',
            key: 'count',
            align: 'center',
          },
          {
            title: '支付金额',
            key: 'sum',
            align: 'center',
          },
        ]
      }
    },
    activated() {
      this.get_order_detail();
    },
    methods: {
      get_order_detail() {
        this.request('get_hyc_order_detail', {
          data: {
            orderId: this.$route.params.orderId
          }
        }, true).then(res => {
          if (res.code == 1) {
            this.salesorderDetail = res.data;
            this.salesorderDetail.orderStatusShow = Util.formatOrderStatus(this.salesorderDetail.orderStatus);
          }
        })
      }
    }
  }
</script>


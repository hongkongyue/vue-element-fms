<style>

</style>

<template>
    <div class="background-color-white exhibition">
        <Row class="margin-bottom-10">
            <Col span="24">
            <Alert>订单推送OMS开关</Alert>
            <Input v-model="orderPushSwitch.staffReason" placeholder="请输入开关理由" style="width: 300px"></Input>
            <i-switch v-model="orderPushSwitch.orderSwitch" @on-change="orderSwitchChange"></i-switch>
            </Col>
        </Row>
        <!-- <Row class="margin-bottom-10">
            <Col span="12">
            <Alert>商品同步</Alert>
            <Button @click="syncGoods" type="primary">同步商品</Button>
            <span style="margin-left:10px;">最后同步时间{{lastSyncGoodsTime}}</span>
            </Col>
            <Col span="12">
            <Alert>SKU同步</Alert>
            <Button @click="syncSkus" type="primary">同步SKU</Button>
            <span style="margin-left:10px;">最后同步时间:{{lastSyncSkusTime}}</span>
            </Col>
        </Row> -->
    </div>
</template>

<script>
    function orderPushSwitch() {
        return {
            orderSwitch: false,
            staffReason: ''
        }
    }

    export default {
        name: "controller",
        data() {
            return {
                orderPushSwitch: orderPushSwitch(),
                lastSyncGoodsTime: '',
                lastSyncSkusTime: '',
            }
        },
        mounted() {
            this.get_config();
            // this.getLastSyncTime();
        },
        methods: {
            get_config() {
                this.request('get_config', {
                    data: {}
                }, true).then(res => {
                    if (res.code == 1) {
                        this.orderPushSwitch.orderSwitch = res.data.orderSwitch;
                        this.orderPushSwitch.staffReason = res.data.remark;
                    }
                })
            },
            orderSwitchChange(val) {
                this.request('config', {
                    data: {
                        map: this.orderPushSwitch
                    }
                }).then(res => {
                    if (res.code == 1) {
                        this.get_config();
                        this.$Message.success(res.msg);
                    }
                })
            },
            //同步旺店通商品到eop
            syncGoods() {
                this.request('sync_goods', {}, '正在从旺店通同步商品数据').then((res) => {
                    if (res.status == 'success') {
                        this.getLastSyncTime();
                        this.$Message.success('成功同步' + res.data + "条商品记录");
                    }
                })
            },
            //同步旺店通sku到eop
            syncSkus() {
                this.request('sync_skus', {}, '正在从旺店通同步sku数据').then((res) => {
                    if (res.status == 'success') {
                        this.getLastSyncTime();
                        this.$Message.success('成功同步' + res.data + "条sku记录");
                    }
                })
            },
            getLastSyncTime() {
                this.request('get_last_sync_time', {}, false).then((res) => {
                    if (res.status = 'success') {
                        res.data.forEach((item) => {
                            if (item.key == 'lastSyncGoodsTime') {
                                this.lastSyncGoodsTime = item.value;
                            } else if (item.key == 'lastSyncSkusTime') {
                                this.lastSyncSkusTime = item.value;
                            }
                        })
                    }
                })
            }
        }
    }
</script>

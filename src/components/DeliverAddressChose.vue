<template type="x/template">
    <div>
        <Row>
            <Col span="16">
            <Form-item label="收货信息：" prop="address">
                <Select style="width:500px" 　v-model="choseId" placeholder="请选择收货信息" @on-change="deliverAddressChoseChange">
                                    <Option v-for="item in deliverAddressList" :value="item.id" :key="item.id">{{ item.content }}</Option>
                   </Select>
                <span @click="editDeliverAddress" style="color:#57a3f3;cursor:pointer;margin-left:15px;">管理常用地址</span>
            </Form-item>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        desc: '收货信息选择组件',
        data() {
            return {　　
                choseId: 0,
                deliverAddressList: []
            }
        },
        created() {},
        computed: {},
        methods: {
            editDeliverAddress() {
                this.$router.push({
                    name: 'deliveraddress_list'
                });
            },
            getDeliverListData() {
                let that = this;
                let space = ' ';
                this.request('get_address_list', {}, true).then((res) => {
                    if (res.code == 1) {
                        that.deliverAddressList = res.data;
                        that.deliverAddressList.forEach((item,index) => {
                            if(index==0){
                              that.choseId = item.id;
                              that.deliverAddressChoseChange();
                            }
                            if(item.isDefault==1){
                              that.choseId = item.id;
                              that.deliverAddressChoseChange();
                            }
                            item.content = item.consigne + space + item.phoneNo + space + item.province + item.city + item.county + item.address;
                        })
                    }
                })
            },
            deliverAddressChoseChange() {
                let data={};
                this.deliverAddressList.some((item)=>{
                    if(item.id == this.choseId){
                       data = item;
                       return true;
                    }
                })
                this.$emit('delivery-address-change', data)
            }
        },
        mounted() {
            this.getDeliverListData();
            this.$root.eventHub.$on('refreshDeliveryAddressListData',()=>{
                this.getDeliverListData();
            });//监听刷新收货信息选择列表的数据事件
            this.$root.eventHub.$on('edit_staff_sample_order_address',(data)=>{
                let space = ' ';
                data.content = data.consigne + space + data.phoneNo + space + data.province + data.city + data.county + data.address;
                data.id = 10000;
                this.deliverAddressList.unshift(data);
                this.choseId = data.id;
            });
        }
    }
</script>

<style lang="css" scoped>
    
</style>
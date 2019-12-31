<style lang="less">
    .deliverAddressForm .ivu-form-item {
        margin-bottom: 18px;
    }
</style>

<template>
    <div>
        <Card>
            <Form ref="deliverAddressForm" 　class="deliverAddressForm" :model="deliverAddressForm" :rules="rules" :label-width="100">
                <Row>
                    <i-col span="6">
                    <FormItem label="收件人姓名：" prop="consigne">
                        <Input v-model="deliverAddressForm.consigne" placeholder="请输入收件人姓名"></Input>
                    </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="收件人电话：" prop="phoneNo">
                        <Input v-model="deliverAddressForm.phoneNo" placeholder="请输入收件人电话"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <Form-item label="收件人地址：" prop="provinceCityArea">
                        <Cascader :data="addressChoseData" placeholder="请选择所在地区" v-model="deliverAddressForm.provinceCityArea"></Cascader>
                    </Form-item>
                    </Col>
                    <Col span="6">
                    <Form-item label="" prop="address">
                        <Input v-model="deliverAddressForm.address" placeholder="详细地址"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <Form-item label=''>
                        <Checkbox v-model="deliverAddressForm.isDefault">设置为默认收货地址</Checkbox>
                    </Form-item>
                    </Col>
                    <Col span="6">
                    <Form-item label="">
                        <Button size="small" type="primary" @click="save"> 保存</Button>
                        <Button size="small" type="default" @click="reset"> 重置</Button>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card>
            <p slot="title">
                常用地址
            </p>
            <Row>
                <Col span="20">
                <Table :columns="columns" size="small" :border="true" :data="list"></Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import cityData from 'libs/city';
    import Util from 'libs/util';
    export default {
        name: "deliveraddress_list",
        data() {
            const validatePhoneNo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入联系方式'));
                } else if (Util.isMobile(value)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的手机号码格式'));
                }
            }
            return {
                deliverAddressForm: {
                    phoneNo: ''
                },
                addressChoseData: [],
                columns: [{
                        title: '姓名',
                        key: 'consigne',
                        width: 120,
                        align: 'center',
                    },
    
                    {
                        title: '所在地区',
                        key: 'area',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {}, params.row.province + ' ' + params.row.city + ' ' + params.row.county);
                        }
                    },
                    {
                        title: '详细地址',
                        key: 'address',
                        align: 'left',
                        minWidth: 200
                    },
                    {
                        title: '电话/手机',
                        key: 'phoneNo',
                        width: 150,
                        align: 'center',
                    },
                    {
                        title: '是否默认',
                        key: 'isDefault',
                        width: 90,
                        align: 'center',
                        render: (h, params) => {
                            let title = '是';
                            if (params.row.isDefault == 1) {
                                return h('Tag', {
                                    props:{
                                      color:'orange'
                                    },
                                }, '是')
                            } else {
                                return h('Tag', {
                                }, '否')
                            }
                        }
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                list: [],
                rules: {
                    consigne: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    phoneNo: [{
                        required: true,
                        validator: validatePhoneNo,
                        trigger: 'blur'
                    }],
                    provinceCityArea: [{
                        type: 'array',
                        required: true,
                        message: '请输入省市区',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            changeProvinceCityArea() {
    
            },
            reset() {
                this.deliverAddressForm = {
                    phoneNo: ''
                };
                this.$refs['deliverAddressForm'].resetFields();
            },
            //保存
            save() {
                let saveUrl = 'add_address';
                if (this.deliverAddressForm.id) {
                    saveUrl = 'edit_address';
                }
                this.$refs['deliverAddressForm'].validate((valid) => {
                    if (valid) {
                        let data = Util.deepClone(this.deliverAddressForm);
                        //处理地址
                        data.province = data.provinceCityArea[0];　　　
                        data.city = data.provinceCityArea[1];　　　
                        data.county = data.provinceCityArea[2];　
                        delete data.provinceCityArea;
                        data.isDefault = data.isDefault == true ? 1 : 0;
                        data.zipCode = '';
                        data.telNo = '';
                        data.remark = '';
                        this.request(saveUrl, {
                            data: {
                                obj: data,
                            }
                        }, true).then((res) => {
                            this.reset();
                            this.getList();
                            this.$root.eventHub.$emit('refreshDeliveryAddressListData');//刷新收货信息选择列表的数据
                        })
                    }
                })
            },
            getList() {
                this.request('get_address_list', {}, true).then((res) => {
                    if (res.code == 1) {
                        this.list = res.data;
                    }
                })
            },
            edit(index) {
                this.reset();
                let data = Util.deepClone(this.list[index]);
                data.isDefault = data.isDefault == 1 ? true : false;
                data.provinceCityArea = [];
                data.provinceCityArea[0] = data.province;
                data.provinceCityArea[1] = data.city;
                data.provinceCityArea[2] = data.county;
                this.deliverAddressForm = data;
            },
            delete(id) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '该行将会删除，请确认！',
                    onOk: () => {
                        this.request('delete_address', {
                               data:{
                                    id: id
                               }
                        }, true).then(res => {
                            if (res.code == 1) {
                                this.$Message.success(res.msg);
                                this.getList();
                            }
                        })
                    },
                    onCancel: () => {
    
                    }
                })
            }
        },
        mounted() {
            this.addressChoseData = cityData.data;
            this.getList();
        }
    }
</script>


<template>
    <div id='custom_table_model'>
        <Modal v-model="model_visible" title="自定义列表" @on-cancel='cancel' :width="400" class-name="customize-modal-center">
            <Form ref="custom_column" :model="custom_column_status" :label-width="80">
                <Row>
                    <Col span='12' v-for="(item,index) in Form" :key="index">
                        <Checkbox :label="item.key" v-model="custom_column_status[item.key]">
                            <span>{{item.title}}</span  >
                        </Checkbox>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Util from 'libs/util';
    export default {
        name:'custom_table_model',
        data(){
            return {
                model_visible:false,
                Form:[],
                columns:{},
                userInfo:{},
                tableName:'',
                tempTitle:'',
                ref:'',
                flag:false,
                data_view_direction:''
            }
        },
        computed:{
            ...mapState({
                custom_table_list:state => state.common.custom_table_list,
                custom_column_status:state => state.common.custom_column_status,
                tempColumns:state => state.common.tempColumns
            })
        },
        mounted(){
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        },
        methods:{
            recursive(data){
                for(let x of data){
                    for(let k in this.custom_column_status){
                        if(this.data_view_direction == 'down'){
                            if(x.hasOwnProperty('children')){
                                this.recursive(x.children);
                                break;
                            }
                            if(x.key == k){
                                this.Form.push({
                                    title:x.title,
                                    key:x.key
                                })
                            }
                        }else if(this.data_view_direction == 'up'){
                            if(x.hasOwnProperty('children')){
                                if(x.children.length <= 1){
                                    this.tempTitle = x.title;
                                    this.flag = true;
                                }
                                this.recursive(x.children);
                                break;
                            }
                            if(x.key == k){
                                if(this.flag){
                                    this.Form.push({
                                        title:this.tempTitle,
                                        key:x.key
                                    })
                                    this.flag = false;
                                }else{
                                    this.Form.push({
                                        title:x.title,
                                        key:x.key
                                    })
                                }
                            }
                        }
                    }
                }
            },
            openModel(options){
                this.model_visible = true;
                this.temp_custom_column_status = Util.deepClone(this.custom_column_status);
                this.Form = [];
                this.columns = options.columns;
                this.tableName = options.tableName;
                this.data_view_direction = options.data_view_direction;
                this.ref = options.ref;
                this.recursive(options.columns);
            },
            cancel(){
                this.model_visible = false;
                this.$store.dispatch('save_custom_column_status',this.temp_custom_column_status);
            },
            save(){
                let data = {};
                data.userId = this.userInfo.userId;
                data.columnsStatus = JSON.stringify(this.custom_column_status);
                data.tableName = this.tableName;
                if(this.custom_table_list.hasOwnProperty('uuid')){
                    data.uuid = this.custom_table_list.uuid;
                    data.lastUpdateUser = this.userInfo.userName;
                }else{
                    data.createUser = this.userInfo.userName;                   
                }
                this.request('save_table_custom',{
                    data:data
                },'保存中').then(res=>{
                    if(res.code == 1){
                        this.model_visible = false;
                        this.$store.dispatch('get_table_custom_list',{
                            tableName:this.tableName,
                            columns:this.columns
                        }).then(res=>{
                            let data = res;
                            this.$store.dispatch('update_columns',res);
                        })
                    }
                })
            }
        }
    }
</script>


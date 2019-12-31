<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="messageCount" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>


<script>
import util from '@/libs/util.js';
import Vue from 'vue';
import {
  router
} from '@/router/index';

// import {store} from '@/store/index'

export default {
    name: 'messageTip',
    data(){
      return{
          messageCount:0
      }
    },
    methods: {
        initWebSocket(options){
            let that = this;
            return new Promise((resolve,reject)=>{
                let userId = JSON.parse(window.sessionStorage.getItem("userinfo")).userId;
                let socketHost = window.location.host
                if(location.host=='localhost:8090'||location.host=='127.0.0.1:8090'){
                   socketHost ='eopsit.eptison.com'
                }
                let ws = new WebSocket(`ws://${socketHost}/eopwebsocket/eop/websocket/${userId}`);

                ws.onopen = function(evt) {
                    console.log("Connection open ...");
                    if(!!options && options.type){
                        ws.send(JSON.stringify(options));
                    }
                };

                ws.onmessage = function(evt) {
                    let data = JSON.parse(evt.data);
                    resolve(data);
                    let message;
                    if(data.type == 'message'){
                        message = `您有${parseInt(data.message)}条通知，请查收！`;
                    }else if(data.type == 'updateBoard'){
                        resolve(data);
                        message = data.message;
                        that.$store.dispatch('save_update_btn_status',{
                            type:'broad',
                            status:data.status
                        });
                    }else if(data.type == 'updatevip'){
                        resolve(data);
                        message = data.message;
                        that.$store.dispatch('save_update_btn_status',{
                            type:'vip',
                            status:data.status
                        });
                    }else if(data.type == 'updateBaseKpi'){
                        resolve(data);
                        message = data.message;
                        that.$store.dispatch('save_update_btn_status',{
                            type:'kpi',
                            status:data.status
                        });
                    }else if(data.type == 'refresh_final_broad'){
                        resolve(data);
                        message = data.message;
                        that.$store.dispatch('save_update_btn_status',{
                            type:'refresh_final_broad',
                            status:data.status
                        });
                    }else if(data.type=='refresh_sale_OMS'){
                        resolve(data);
                        message = data.message;
                    }else if(data.type=='syn_scm_order'){
                        resolve(data);
                        message = data.message;
                    }else if(data.type=='syn_vip_goods_detail'){
                        resolve(data);
                        message = data.message;
                    }
                
                    that.$Notice.info({
                        title: '提示',
                        desc: 'The desc will hide when you set render.',
                        duration:0,
                        render: h => {
                            return h('span', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            if(data.type == 'message'){
                                                router.push('/Message');
                                            }else if(data.type == 'updateBoard'){

                                            }
                                        }
                                    }
                                },message)
                            ])
                        }
                    });
                };
                //
                // ws.onclose = function(evt) {
                //     console.log("Connection closed.");
                // };
            })
        },
        showMessage () {
            util.openNewPage(this, 'message_index');
            router.push({
                name: 'message_index'
            });
        }
    },
    created(){
    }
};
</script>

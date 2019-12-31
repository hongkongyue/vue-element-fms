import Vue from 'vue';
import MessageTipVue from '../views/main-components/message-tip.vue';
import store from '../store'

const MessageTipConstructor  = Vue.extend(MessageTipVue);
let instance;

const MessageTip = function(options){
    if(!instance){
        instance = new MessageTipConstructor({
            el:document.createElement('div'),
            store:store
        });
        document.body.appendChild(instance.$el)
    }
    return new Promise((resolve,reject)=>{
        instance.initWebSocket(options).then(res=>{
            resolve(res);
        });
    })
}

export default MessageTip;
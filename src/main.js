// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'default-passive-events'
import 'babel-polyfill'
import Vue from 'vue'
import iview from 'iview';
import Treeselect from '@riophae/vue-treeselect'
import ZkTable from './components/TreeGrid'
import App from './App'
Vue.config.devtools = false
import {
  router
} from './router/index';
import {appRouter} from './router/router';
import Util from './libs/util';
import store from './store';
import './styles/common.css';

import Toast from './libs/toast/';
import Http from './libs/http';
// import 'iview/dist/styles/iview.css';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Viser from 'viser-vue'
import socket from '@/libs/socket'
import jsonp from 'jsonp';


//导入所有的过滤器变量
import * as custom from './libs/filters/'
import { Socket } from 'dgram';

iview.Message.config({
  top:50,
  duration:3
})

//导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.config.productionTip = false
Vue.use(Toast);
Vue.use(Http);
Vue.use(iview);
Vue.use(ZkTable);
Vue.use(Viser);

Vue.component('treeselect', Treeselect)
Vue.filter("toThousands", function(value) {   
  return Util.toThousands(value)
});
Vue.prototype.jsonp = jsonp;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
      currentPageName: '',
      eventHub: new Vue()
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    // this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');

  },
  created() {
    Vue.nextTick(()=>{
      if(location.pathname != '/login' && location.pathname !='/register' && location.pathname != '/resetPwd'){
        socket();
      }
    })
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children); 
      }
    });
    this.$store.commit('setTagsList', tagsList);
  }
})

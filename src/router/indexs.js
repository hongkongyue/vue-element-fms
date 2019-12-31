import Vue from 'vue'
import iView from 'iview';
import VueRouter from 'vue-router'
import Cookies from 'js-cookie';
import { routers, otherRouter, appRouter,registerRouter } from './router';
import login from '@/views/login'
import Util from '@/libs/util';
import socket from '@/libs/socket'
import {checkDirectLogin} from './directLogin'
import { getParams} from './directLogin'
import axios from 'axios';
Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

// window.onbeforeunload = function(evt){
//     return ''
// }
window.sessionStorage.setItem('password', getParams().pas);
window.sessionStorage.setItem('userAccount', getParams().account)
window.sessionStorage.setItem('share', getParams().share)
//    localStorage.setItem('password', getParams().pas)
//    localStorage.setItem('userAccount',  getParams().account)
//    localStorage.setItem('share', getParams().share)
// router.beforeEach((to, from, next) => {
//     if(to.query.share==1){
//         window.sessionStorage.setItem('path', to.name)
//     }
//     let userInfo=JSON.parse(window.sessionStorage.getItem('userinfo'));
//     let token = window.sessionStorage.getItem('token');
//     Util.title(to.meta.title);
//     if(to.name=='register'||to.name=='resetPwd'||to.name=='error-403'||to.name=='platformAuth'||to.name=='refresh'){
//         next();
//     }
//     else if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
//         next({
//             replace: true,
//             name: 'locking'
//         });
//     } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
//         next(false);
//     } else {
//         if (!userInfo && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
//                 next({
//                     name: 'login'
//                 });
//         } else if (userInfo && to.name === 'login') { // 判断是否已经登录且前往的是登录页
//             Util.title();
//             next({
//                 name: 'home_index'
//             });
//         } else {
//             const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
//             //权限处理
//             // let menuPowerList = [];
//             // if(userInfo&&curRouterObj&&!curRouterObj.hidden&&curRouterObj.title!='首页'){
//             //     userInfo.res.sysResourceList.forEach(function(item){
//             //         menuPowerList.push(item.menuUrl);
//             //     });
//             //     if(Util.oneOf(curRouterObj.name,menuPowerList)){

//             //     }else{
//             //         next({
//             //             replace: true,
//             //             name: 'error-403'
//             //         });
//             //     }
//             // }
            
//             if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
//                 if (curRouterObj.access === parseInt(Cookies.get('access'))) {
//                     Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
//                 } else {
//                     next({
//                         replace: true,
//                         name: 'error-403'
//                     });
//                 }
//             } else { // 没有配置权限的路由, 直接通过
//                 Util.toDefaultPage([...routers], to.name, router, next);
//             }
//         }
//         if (!!userInfo && to.name !== 'login' && to.name !== 'register') { // 判断是否已经登录且前往的页面不是登录页
              
//             // console.log(data.resolve());
//             // socket();
//             // console.log('您正在刷新网页');
//         }
//         if(to.matched.length==0){
//             next({
//                 replace: true,
//                 name: 'home_index'
//             }); 
//           }
//     }
// });
router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    window.scrollTo(0, 0);
});

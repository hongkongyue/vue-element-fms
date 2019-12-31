
import VueRouter from 'vue-router'
import { routers, otherRouter, appRouter,registerRouter } from './router';
import login from '@/views/login'
import axios from 'axios';
Vue.use(VueRouter)
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
export const router = new VueRouter(RouterConfig)
router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem('token')){
      next();
    }
    else{
      if(to.path=='/resetPwd'){
        next()
      }else if(to.path=='/platformAuth'){
        next()
      }else{
            if(to.path === '/login'){
         next();
      }else {
        next({
          path:'/login'
        });
      }
      }
    }
    if(to){
         document.title=to.meta.label?to.meta.label:'云系统管理平台'
         localStorage.setItem('title',to.meta.title)
    }
});
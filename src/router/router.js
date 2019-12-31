import Main from '@/views/main.vue';

//不作为main组件的子页面展示的页面单独写
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'FMS 财务管理系统 - 登录'
  },
  component: () => import('@/views/login.vue')
}
//注册
export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: 'EOP管理平台 - 用户注册'
  },
  component: () => import('@/views/register.vue')
}
//重置密码
export const resetPwdRouter = {
  path: '/resetPwd',
  name: 'resetPwd',
  meta: {
    title: 'EOP管理平台 - 重置密码'
  },
  component: () => import ('@/views/resetPwd.vue')
}

//账号绑定
export const platformAuthRouter = {
  path: '/platformAuth',
  name: 'platformAuth',
  meta: {
    title: 'EOP管理平台 - 账号绑定'
  },
  component: () => import ('@/views/platformAuth.vue')
}



export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import ('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import ('@/views/error-page/403.vue')
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import ('@/views/error-page/500.vue')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

export const refresh = {
  path: '/refresh',
  name: 'refresh',
  component: () => import ('@/views/refresh.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
    path: 'home',
    title: '首页',
    name: 'home_index',
    component: () =>
    import ('@/views/home/home.vue')
  },
    {
      path: 'ownspace',
      title: '个人中心',
      name: 'ownspace_index',
      hidden:true,
      component: () =>
      import ('@/views/own-space/own-space.vue')
    },
    {
      path: 'deliveraddress',
      title: '常用地址管理',
      name: 'deliveraddress_list',
      hidden:true,
      component: () =>
      import ('@/views/deliver-address/list.vue')
    },
    {
      path: 'message',
      title: '消息中心',
      name: 'message_index',
      hidden:true,
      component: () =>
      import ('@/views/message/message.vue')
    },
    {
      path: 'print/:orderId',
      name: 'print',
      hidden:true,
      title: '打印',
      component: () =>
      import ('@/views/common-page/print.vue')
    },
    {
      path: 'salesorder/:orderId',
      name: 'salesorder_detail',
      hidden:true,
      title: '查看原始订单',
      component: () =>
      import ('@/views/sales-management/sales-order/detail.vue')
    }
  ]
};


//作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

import allRouter from './allRouter'
export  const appRouter = allRouter;
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
        registerRouter,
        refresh,
        loginRouter,
        resetPwdRouter,
        platformAuthRouter,
        otherRouter,
        locking,
        ...appRouter,
        page500,
        page403,
        page404,
        {path:'*',redirect:'/home'},//路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页
];

import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import setdetail from './modules/setdetail';
import checkBill from './modules/checkBill';
import deduction from './modules/deduction';
import customs from './modules/customs';
import outStock from './modules/outStock';
import inStock from './modules/inStock';
import noSingerReturn from './modules/noSingerReturn';
import inStockOrder from './modules/inStockOrder';
import user from './modules/user';
import common from './modules/common'
import order from './modules/order'
import quickRepeatOrder from './modules/quickRepeatOrder'
import costReduction from './modules/costReduction'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    setdetail, //应付管理结算明细模块
    checkBill, //对账单模块
    deduction, //扣款单
    customs,
    app,
    user,
    outStock,
    inStock,
    noSingerReturn,
    inStockOrder,
    common,
    order,
    quickRepeatOrder,
    costReduction
  }
});

export default store;

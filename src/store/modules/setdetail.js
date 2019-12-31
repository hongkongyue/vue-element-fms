import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
//结算明细的state
const setdetail = {
    state: {
            setdetailId     :  '',//存储的id
            goodsList       :  [],//货品列表
            setDetaillogList:  [],//日志列表
            deductionList   :  [],//扣款明细

    },
    mutations: {
        initGoodsList(state,list){
                        state.goodsList=[];
                        state.goodsList=list
        },
        getSetdetailId(state,id){
                        state.setdetailId=id
        },
        cleardetailId(state){
                        state.setdetailId=''
        },
        clearGoodsList(state){
                        state.goodsList=[] 
        },
        initsetlogList(state,list){
                        state.logList=[];
                        state.setDetaillogList=list
        },
        clearsetlogList(state){
                        state.setDetaillogList=[];
        },
        initSetdetailList(state,list){
                        state.deductionList=[];
                        state.deductionList=list
        },
        clearSetdetailList(state){
                        state.deductionList=[];
        },
       
    },
};

export default setdetail;
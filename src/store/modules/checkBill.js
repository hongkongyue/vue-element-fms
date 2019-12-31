import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
//结算明细的state
const setdetail = {
    state: {
            checkBillId  : '',
            goodsList    : [],//货品列表
            logList      : [],//日志列表
            deductionList: [],//扣款明细
            checkObj     : {},
            No           : '',

    },
    mutations: {
        getCheckBillIdNo(state,id){
                        state.No='';
                        state.No=id
        },
        clearCheckBillIdNo(state){
                           state.No='';
        },
        checkBillGoodsList(state,list){
                       state.goodsList=[];
                       state.goodsList=list
        },
        clearCheckBillGoodsList(state){
                       state.goodsList=[];
        },
        getCheckBillId(state,id){
                        state.checkBillId=id
        },
        clearCheckBillId(state){
                        state.checkBillId=''
        },
        checkBilllogList(state,list){
                       state.logList=[];
                       state.logList=list
        },
        clearcheckBilllogList(state){
                       state.logList=[];
        },
        checkBilldeductionList(state,list){
                       state.deductionList=[];
                       state.deductionList=list
        },
        clearcheckBilldeductionList(state){
                       state.deductionList=[];
        },
        getcheckObj(state,obj){
                        state.checkObj={};
                        state.checkObj=obj   
        },
        clearcheckObj(state){
                        state.checkObj={};
        }
    },
};

export default setdetail;
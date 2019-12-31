import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        delayAllocationList:[],
        onedelayAllocationList:[],
        scmOrderList:[],
        onescmOrderList:[],
        otherInStockList:[],
        inventoryLossesList:[],
        inventorySurplusList:[],
        purchaseList:[],
        otherOutStockList:[],
        adjustStockLogList:[],
        adjustStockList:[],
        costAdjustmentList:[],
        costAdjustLogList:[],//日志
        salesOutList:[],
        billImportList:[],
        revisionList:[],
        oneverificationList:[],
        verificationList   :[],
        receivablesList    :[], //应收单
        receiptList:[],
        mode       :  localStorage.getItem('mode')?localStorage.getItem('mode'):1,//默认窗口内浏览  1 单页面跳转  2多页面跳转
        menuNewList:JSON.parse(localStorage.getItem('userinfo'))?JSON.parse(localStorage.getItem('userinfo')).menuTreeDataBind:[],  //菜单列表
        shouldGetList:[],//应收单货品列表
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        getMode(state){
                console.log('当前的浏览模式是:',state.mode)
                return state.mode
        },
        initMenuList(state){
             return state.menuNewList=JSON.parse(localStorage.getItem('userinfo')).menuTreeDataBind
        },
        increment(state,list){
            console.log('gagagg')
            state.shouldGetList=[]
            state.shouldGetList=list;   
            console.log( state.shouldGetList,'90909')
        },
        clearShouldGetList(state){
            state.shouldGetList=[]
        },
        //账单导入与查询
        billImport(state,list){
            state.billImportList=[]
            state.billImportList=list; 
        },
       
        clearBillImport(state){
            state.billImportList=[]
        },

        //改标记录
        revision(state,list){
            state.revisionList=[]
            state.revisionList=list; 
        },
       
        clearrevision(state){
            state.revisionList=[]
        },

        //采购入库
        purchase(state,list){
            state.purchaseList=[]
            state.purchaseList=list; 
        },
       
        clearpurchase(state){
            state.purchaseList=[]
        },
        //盘盈入库
        inventorySurplus(state,list){
            state.inventorySurplusList=[]
            state.inventorySurplusList=list; 
        },
       
        clearinventorySurplus(state){
            state.inventorySurplusList=[]
        },
         //盘亏出库
         inventoryLosses(state,list){
            state.inventoryLossesList=[]
            state.inventoryLossesList=list; 
        },
       
        clearinventoryLosses(state){
            state.inventoryLossesList=[]
        },
         //其它出库
         otherOutStock(state,list){
            state.otherOutStockList=[]
            state.otherOutStockList=list; 
        },
       
        clearotherOutStock(state){
            state.otherOutStockList=[]
        },
        //其它入库
        otherInStock(state,list){
            state.otherInStockList=[]
            state.otherInStockList=list; 
        },
       
        clearotherInStock(state){
            state.otherInStockList=[]
        },
        //销售出库
        salesOut(state,list){
            state.salesOutList = []
            state.salesOutList = list
        },
        clearSalesOut(state){
            state.salesOutList = []
        },
        //应收核销
        verification(state,list){
            state.verificationList=[]
            state.verificationList=list;
        },
        Oneverification(state,list){
            state.oneverificationList=[]
            state.oneverificationList=list
        },
        clearverification(state){
            state.verificationList=[]
            state.oneverificationList=[]
        },
        //scm采购单
        scmOrder(state,list){
            state.scmOrderList=[]
            state.scmOrderList=list;
        },
        OnescmOrder(state,list){
            state.onescmOrderList=[]
            state.onescmOrderList=list
        },
        clearscmOrder(state){
            state.scmOrderList=[]
            state.onescmOrderList=[]
        },
        //扣款建议
        delayAllocation(state,list){
            state.delayAllocationList=[]
            state.delayAllocationList=list;
        },
        OnedelayAllocation(state,list){
            state.onedelayAllocationList=[]
            state.onedelayAllocationList=list
        },
        cleardelayAllocation(state){
            state.delayAllocationList=[]
            state.onedelayAllocationList=[]
        },
        //成本调整单
        costAdjustLog(state,list){
            state.costAdjustLogList=[]
            state.costAdjustLogList=list;
        },

        costAdjustMent(state,list){
            state.costAdjustmentList=[]
            state.costAdjustmentList=list
        },

        clearcostAdjustMent(state){
            state.costAdjustLogList=[]
            state.costAdjustmentList=[]
        },
        //库存盘点单
        adjustStockLog(state,list){ //日志
            state.adjustStockLogList=[]
            state.adjustStockLogList=list;
        },
        adjustStock(state,list){ //明细
            state.adjustStockList=[]
            state.adjustStockList=list
        },
        clearadjustStock(state){
            state.adjustStockLogList=[]
            state.adjustStockList=[]
        },
       // 应收单
        initReceivables(state,list){
             state.receivablesList=[];
             state.receivablesList=list;
        },
        clearReceivables(state){
            state.receivablesList=[] 
        },
        //收款单
        receipt(state,list){
            state.receiptList=[]
            state.receiptList=list;
        },
        clearreceipt(state){
            state.receiptList=[]
        },
        becomeSingle(state){
            localStorage.setItem('mode',1)
            state.mode= localStorage.getItem('mode')
        },
        becomeMore(state){
            localStorage.setItem('mode',2)
            state.mode= localStorage.getItem('mode')
        },
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist (state, list) {
            if(list){
                state.menuList = list;
            }
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    },
    actions: {
        updateMenuList ({ commit }) {
            return new Promise((resolve, reject) => {
                let userinfo =  JSON.parse(window.sessionStorage.getItem('userinfo'));
                Vue.prototype.request('get_resource_list',{
                    data:{
                        userId:userinfo.userId
                    }
                },false).then((res)=>{
                    let list = res.data;
                    sessionStorage.setItem('resourceListData',JSON.stringify(res.data))
                    commit('updateMenulist',list)
                    resolve();
                })
            })
          }
    }
};

export default app;

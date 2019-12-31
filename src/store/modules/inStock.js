//结算明细的state
const inStock = {
    state: {
               id                  : '',
               logList             :  [],//日志列表
               goodsList           :  [], //货品明细

       },
   mutations: {
       getinStockList(state,list){
                         state.goodsList=[];
                         state.goodsList=list
       },
       clearinStockList(state){
                         state.goodsList=[]
       },
       getinStocklogList(state,list){
        state.logList=[];
        state.logList=list
        },
        clearinStocklogList(state){
                state.logList=[]
        },

   },
};

export default inStock;
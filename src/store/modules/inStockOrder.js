//结算明细的state
const inStockOrder = {
    state: {
               logList             :  [],//日志列表
               goodsList           :  [], //货品明细

       },
   mutations: {
       getinStockOrderList(state,list){
                         state.goodsList=[];
                         state.goodsList=list
       },
       clearinStockOrderList(state){
                         state.goodsList=[]
       },

   },
};

export default inStockOrder;
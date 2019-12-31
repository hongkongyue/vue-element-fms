//结算明细的state
const outStock = {
    state: {
               goodsList           :  [], //货品明细

       },
   mutations: {
       getoutStockList(state,list){
                         state.goodsList=[];
                         state.goodsList=list
                         console.log( state.goodsList)
       },
       clearoutStockList(state){
                         state.goodsList=[]
       },
   },
};

export default outStock;
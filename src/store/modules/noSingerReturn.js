//结算明细的state
const noSingerReturn = {
    state: {
               id                  : '',
               logList             :  [],//日志列表
               goodsList           :  [], //货品明细

       },
   mutations: {
       getnoSingerReturnList(state,list){
                         state.goodsList=[];
                         state.goodsList=list
       },
       clearnoSingerReturnList(state){
                         state.goodsList=[]
       },

   },
};

export default noSingerReturn;
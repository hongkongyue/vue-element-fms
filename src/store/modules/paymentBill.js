//结算明细的state
const paymentBill = {
            state: {
                            id          :  '', //存储的id
                    deductionList       :  [], //货品明细
                    deductionLogList    :  [], //日志列表
                    activeName          : 'first'

            },
   mutations: {
    //    getinvoiceregister(state,list){
    //                      state.deductionList=[];
    //                      state.deductionList=list
    //    },
    //    clearinvoiceregister(state){
    //                      state.deductionList=[]
    //    },
       getpaymentBillId(state,id){
                         state.id=id
       },
       clearpaymentBillId(state){
                         state.id=''
       },
       clearpaymentBillLogList(state){
                         state.deductionLogList=[] 
       },
       initpaymentBillLogList(state,list){
                         state.deductionLogList=[];
                         state.deductionLogList=list
       },
    //    initactiveName(state,str){
    //                      state.activeName=str
    //    },
    //    clearactiveName(state){
    //                      state.activeName='first'
    //    }
      },
};

export default paymentBill;
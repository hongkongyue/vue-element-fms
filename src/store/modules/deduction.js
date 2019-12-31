//结算明细的state
const deduction = {
     state: {
                        id          :  '', //存储的id
                deductionList       :  [], //货品明细
                deductionLogList    :  [], //日志列表

        },
    mutations: {
        getDeductionList(state,list){
                          state.deductionList=[];
                          state.deductionList=list
        },
        cleardeductionList(state){
                          state.deductionList=[]
        },
        getdeductionId(state,id){
                          state.id=id
        },
        cleardeductionId(state){
                          state.id=''
        },
        cleardeductionLogList(state){
                          state.deductionLogList=[] 
        },
        initdeductionLogList(state,list){
                          state.deductionLogList=[];
                          state.deductionLogList=list
        },
    },
};

export default deduction;
const costReduction={
            state:{
                   logList:[]
            },
            mutations:{
                     initCostReductionlogList(state,list){
                           state.logList=list
                     },
                     clearCostReductionlogList(state){
                          state.logList=[]
                     }
            }

}
export default costReduction
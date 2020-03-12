//结算明细的state
const customs = {
    state: {
                       id          :  '', //存储的id
                 customsList       :  [], //货品明细
                 customsLogList    :  [], //日志列表
                 recordHttpList    :  [],// 数据列表

       },
   mutations: {
       initRecordHttpList(state,list){
                        state.recordHttpList=[];
                        state.recordHttpList=list     
       },
       clearinitRecordHttpList(state){
                        state.recordHttpList=[]; 
       },
       getcustomsList(state,list){
                         state.customsList=[];
                         state.customsList=list
       },
       clearcustomsList(state){
                         state.customsList=[]
       },
       getcustomsId(state,id){
                          state.id=id
                          console.log(state.id)
       },
       clearcustomsId(state){
                         state.id=''
       },
       clearcustomsLogList(state){
                         state.customsLogList=[] 
       },
       initcustomsLogList(state,list){
                         state.customsLogList=[];
                         state.customsLogList=list
       },
   },
};

export default customs;
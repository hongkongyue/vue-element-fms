//结算明细的state
const invoiceregister = {
    state: {
                       id          :  '', //存储的id
               deductionList       :  [], //货品明细
               deductionLogList    :  [], //日志列表
               activeName          : 'first',
               dataFlag            : true,

       },
   mutations: {
       getinvoiceregister(state,list){
                         state.deductionList=[];
                         state.deductionList=list
       },
       clearinvoiceregister(state){
                         state.deductionList=[]
       },
       getinvoiceregisterId(state,id){
                         state.id=id
       },
       clearinvoiceregisterId(state){
                         state.id=''
       },
       clearinvoiceregisterLogList(state){
                         state.deductionLogList=[] 
       },
       initinvoiceregisterLogList(state,list){
                         state.deductionLogList=[];
                         state.deductionLogList=list
       },
       setdataFlagtrue(state){
                        state.dataFlag=true
       },
       setdataFlagfalse(state){
                        state.dataFlag=false
       },
   },
};

export default invoiceregister;
export default({
  state:{
    returnModal:false,      //归回Modal显示开关
    setStaffSampleCoatRow:{},    //普通样衣行数据
    staffSampleCoatDetail_ActiveTable:'apply',      //内部样衣详细页面当前tab页名
  },
  mutations:{
    setReturnModal(state,data){
      state.returnModal = data;
    },
    setStaffSampleCoatRow(state,data){
      state.setStaffSampleCoatRow = data;
    },
    setStaffSampleCoatDetail_ActiveTable(state,data){
      state.staffSampleCoatDetail_ActiveTable = data;
    },
  },
  getters:{

  },
  actions:{
    setReturnModal({commit},data){
      commit('setReturnModal',data)
    },
    setStaffSampleCoatRow({commit},data){
      commit('setStaffSampleCoatRow',data)
    },
    setStaffSampleCoatDetail_ActiveTable({commit},data){
      commit('setStaffSampleCoatDetail_ActiveTable',data)
    },
  }
})

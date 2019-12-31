import apiMap from 'libs/apiMap'
import http from 'libs/axios'

export default ({
  state: {
    brands_by_userId: []
  },
  mutations: {
    get_brands_by_userId(state, obj) {
      return new Promise((resolve, reject) => {
        http.post(apiMap.get_brands_by_userId.url, obj).then(res => {
          if (res.data.code == 1) {
            state.brands_by_userId = res.data.data;
          } else {
            if (obj.callbak) {
              obj.callback();
            }
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  getters: {},
  actions: {
    get_brands_by_userId({commit}, obj) {
      commit('get_brands_by_userId', obj);
    }
  }
})

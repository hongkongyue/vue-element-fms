import apiMap from 'libs/apiMap'
import http from 'libs/axios'
export default ({
  state:{
    brandList:[],
    orgList:[],
    postList:[],
    userList:[],
    roleList:[],
    privList:[],
    Resource:[],
    orderStatusList:[],
    logisticList:[],
    board_update_btn_status:1,
    vip_update_btn_status:1,
    kpi_update_btn_status:1,
    final_broad_update_btn_status:1,
    _list:[],
    custom_table_list:{},
    custom_column_status:{},
    tempColumns:[],
    custom_table_modal_visible:false,
    _columns:[],
  },
  mutations:{
    getBrandList(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.GetBrandList.url,obj).then(res=>{
          if(res.data.code == 1){
            state.brandList = res.data.data;
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    get_orgList(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.get_orgList.url,obj).then(res=>{
          if(res.data.code == 1){
            function filterData(data){
              data.map(x=>{
                x.isDelete = x.isDelete == 0 ? true : false
                if(x.hasOwnProperty('children') && x.children.length > 0){
                  filterData(x.children);
                }
              })
            }
            filterData(res.data.data);
            state.orgList = res.data.data;
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    get_postList(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.get_postList.url,obj).then(res=>{
          if(res.data.code == 1){
            state.postList = res.data.data;
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    get_urpr_by_type(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.get_urpr_by_type.url,obj).then(res=>{
          if(res.data.code == 1){
            switch (obj.data.type){
              case 1:
                state.userList = res.data.data.user;
                break;
              case 2:
                state.roleList = res.data.data.role;
                break;
              case 3:
                state.privList = res.data.data.priv;
                break;
              case 4:
                state.Resource = res.data.data.res;
                break;
              default:
                break;
            }
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    get_order_status_list(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.GetOrderStatusList.url,obj).then((res)=>{
          if(res.data.code == 1){
              state.orderStatusList = res.data.data;
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      });
    },
    GetLogisticListNew(state,obj){
      return new Promise((resolve,reject)=>{
        http.post(apiMap.GetLogisticListNew.url,{data:obj.data}).then(res=>{
          if(res.data.code == 1){
            state.logisticList = res.data.data.filter(x=>{
              return x.logistic_code != 'YPKD'
            })
          }else{
            if(obj.callbak){
              obj.callback();
            }
          }
        }).catch(err=>{
          reject(err)
        })
      })
    },
    save_update_btn_status(state,obj){
      switch(obj.type){
        case 'broad':
          state.board_update_btn_status = obj.status;
          break;
        case 'vip':
          state.vip_update_btn_status = obj.status;
          break;
        case 'kpi':
          state.kpi_update_btn_status = obj.status;
          break;
        case 'refresh_final_broad':
          state.final_broad_update_btn_status = obj.status;
      }
    },
    presale_parameters_list(state,data){
      state._list = data;
    },
    save_temp_columns(state,data){
      state.tempColumns = data;
    },
    get_table_custom_list(state,data){
      
    },
    save_custom_column_status(state,data){
      state.custom_column_status = data;
    },
    save_custom_table_modal_visible(state,data){
      state.custom_table_modal_visible = data;
    },
    update_columns(state,data){
      state._columns = data;
    }
  },
  getters:{

  },
  actions:{
    getBrandList({commit},obj){
      commit('getBrandList',obj)
    },
    get_orgList({commit},obj){
      commit('get_orgList',obj)
    },
    get_postList({commit},obj){
      commit('get_postList',obj)
    },
    get_urpr_by_type({commit},obj){
      commit('get_urpr_by_type',obj)
    },
    get_order_status_list({commit},obj){
      commit('get_order_status_list',obj)
    },
    GetLogisticListNew({commit},obj){
      commit('GetLogisticListNew',obj)
    },
    save_update_btn_status({commit},obj){
      commit('save_update_btn_status',obj)
    },
    presale_parameters_list({commit},data){
      commit('presale_parameters_list',data)
    },
    save_custom_column_status({commit},data){
      commit('save_custom_column_status',data)
    },
    save_temp_columns({commit},data){
      commit('save_temp_columns',data)
    },
    get_table_custom_list({commit,state},data){
      var that = this;
      state.custom_column_status = {};
      return new Promise((resolve,reject)=>{
          http.post(apiMap.get_table_custom_list.url,{
              data:{
                  userId:JSON.parse(window.sessionStorage.getItem('userinfo')).userId,
                  tableName:data.tableName
              }
          },true).then(res=>{
              if(res.data.code == 1){
                if(res.data.data.columnsStatus == null){
                  state.custom_table_list = {};
                    let columns = data.columns;
                    function getColumns_status(data){
                        data.map(x=>{
                            if(x.hasOwnProperty('children')){
                                getColumns_status(x.children);
                            }else{
                                if(x.hasOwnProperty('hidden')){
                                    state.custom_column_status[x.key] = true;
                                }
                            }
                        })
                    }
                    getColumns_status(columns);
                  }else{
                    state.custom_table_list = res.data.data;
                    state.custom_column_status = JSON.parse(res.data.data.columnsStatus);
                  }
                  state.tempColumns.map((x,y)=>{
                    for(let k in state.custom_column_status){
                        if(x.key == k){
                            state.tempColumns[y].hidden = !state.custom_column_status[k];
                        }
                    }
                    if(!!x.children){
                        for(let k of x.children){
                            for(let z in state.custom_column_status){
                                if(k.key == z){
                                    state.tempColumns[y].hidden = !state.custom_column_status[z];
                                }
                            }
                        }
                    }
                  })
                  
                  let columns = state.tempColumns.filter(x=>{
                    if(x.hasOwnProperty('hidden')){
                      return !x.hidden
                    }else{
                      return x
                    }
                  })
                  commit('get_table_custom_list',data)        
                  
                  resolve(columns)
              }
          })
      })
    },
    save_custom_table_modal_visible({commit},data){
      commit('save_custom_table_modal_visible',data)
    },
    update_columns({commit},data){
      commit('update_columns',data)
    }
  }
})

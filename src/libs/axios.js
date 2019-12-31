
import Axios from 'axios';
import Qs from 'qs';
import {router} from '../router';
import {Message} from 'iview';
import getParams from '../router/directLogin.js'
const config = {
  baseURL: '',
  timeout: 600000, 
  withCredentials: true, //是否允许跨域
  headers: {'Content-Type': 'application/json;charset=UTF-8','X-AUTH-TOKEN':sessionStorage.getItem('token'), 'X-Requested-With': 'XMLHttpRequest',},
  //返回数据类型
  responseType: 'json'
};
const AsInst = Axios.create(config);
// AsInst.defaults.timeout = 300000;
//请求拦截器
AsInst.interceptors.request.use((config) => {
  //若是有做鉴权token , 就给头部带上token
  if (window.localStorage.getItem('loginToken')) {
    config.headers.Authorization = `${window.localStorage.getItem('loginToken')}`;
  }
  if (window.sessionStorage.getItem('token')) {
       config.headers['X-AUTH-TOKEN']= window.sessionStorage.getItem('token')
  }
  if(getParams().token){//token直接登录
      config.headers['X-AUTH-TOKEN']= getParams().token
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});
//响应拦截器
AsInst.interceptors.response.use(response => {
  //检查数据是否返回NULL
  if (response.data === null) {
    return Promise.reject(response);
  }
  //检查是否有错误
  if(response.data.code==0){
    return Promise.reject(response);
  }
  //检查是否有权限
  if (response.data.code === 2000 && response.data.status === false) {
    return Promise.reject(response);
  }
  //检查登陆信息是否还存在
  if (response.data.code === 2001 && response.data.status === false) {
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('loginToken');
    router.push({
      path: '/passport/login'
    });
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
  if (error.response.status === 404) {
      Message.error('后端服务请求404错误');
  }
  //请求错误时做些事
  return Promise.reject(error);
});
export default AsInst;

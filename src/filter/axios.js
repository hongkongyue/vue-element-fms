import Axios from 'axios';
import Qs from 'qs';
var instance = axios.create({
    baseURL: '',
    timeout: 1000000000,
    headers: {'Content-Type':'application/json;charset=utf-8','X-AUTH-TOKEN':'04601:85c6985fdcec4c26b3bc45565182904e','X-Requested-With':'XMLHttpRequest'},
    //返回数据类型
    responseType: 'json'

  });
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
//   const  fetchData=(data,url)=>{
//               instance({ url:url, method:'post', data:data,}).then(res=>{
              
//               }).catch(error=>{

//               })
//     }
  export default instance
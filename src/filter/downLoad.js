
import Axios from 'axios';
import Qs from 'qs';
const instance = axios.create({
    baseURL: '',
    timeout: 1000000000,
    headers: {'Content-Type':'application/json;charset=utf-8','X-AUTH-TOKEN':sessionStorage.getItem('token'),'X-Requested-With':'XMLHttpRequest'},
    //返回数据类型
    responseType: 'blob'

  });
  instance.interceptors.request.use(function (config) {
     //若是有做鉴权token , 就给头部带上token
    if (window.localStorage.getItem('loginToken')) {
      config.headers.Authorization = `${window.localStorage.getItem('loginToken')}`;
    }
    if (window.sessionStorage.getItem('token')) {
      config.headers['X-AUTH-TOKEN']= window.sessionStorage.getItem('token')
    }
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
  
  const  downLoad=(data,url)=>{
        instance({
                      url:url,
                      method:'post',
                      data:data,
                }).then(res=>{
                            
                              let filename = res.headers['content-disposition']?res.headers["content-disposition"].split(";")[1].split("=")[1]:'导出表.csv'
                                      const blob = new Blob([res.data]);
                                      const blobUrl = window.URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.style.display = 'none';
                                      a.download = decodeURIComponent(escape(filename))
                                      a.href = blobUrl;
                                      a.click();
                                      a.remove();
                      
                })
}
  export default {
               downLoad,
               instance
  }
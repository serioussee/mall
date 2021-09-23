import axios from 'axios'
export function request(config) {
  //1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
    })
  //2.axios拦截器
    instance.interceptors.request.use(config => {
      //比如说config中有一些信息不符合服务器的要求
      //比如说发生请求时，希望在界面中显示一个请求的图标（在这里显示，在响应那里隐藏）
      //比如说某些网络请求（登录（token））必须携带一些特殊的信息
      return config;
    },err => {
      console.log('请求拦截失败')
    })
    instance.interceptors.response.use(res => {
      console.log('响应拦截成功');
      return res.data
    },err => {
      console.log('响应拦截失败');
    })
  //3.发送真正的网络请求
    return instance(config)
}


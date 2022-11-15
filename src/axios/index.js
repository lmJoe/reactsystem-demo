import { notification } from "antd";
import axios from "axios";
import Config from '@/setting'
import { getToken } from "../utils/auth";
//创建axios实例
const service = axios.create({
  timeout:Config.timeout,// 请求超时时间
})
/**取消请求操作 */
const allPendingRequestsRecord = [];
const pending = {};
const removeAllPendingRequestsRecord = () => {
  allPendingRequestsRecord && allPendingRequestsRecord.forEach((func) => {
    //取消请求 （调用函数就是取消函数）
    func('路由跳转取消了所有请求');
  })
  allPendingRequestsRecord.splice(0);
}
//取消同一个重复的ajax请求
const removePending = (key,isRequest = false) => {
  if(pending[key] && isRequest){
    pending[key]('取消重复请求');
  }
  delete pending[key];
}
//取消所有请求的函数
export const getConfirmation = (mes = '',callback = () => {}) => {
  removeAllPendingRequestsRecord()
  callback();
}
// request拦截器
service.interceptors.request.use(
  config => {
    if(getToken()){
      config.headers['Authorization'] = getToken();
    }
    config.headers['Content-Type'] = 'application/json';
    //在请求发送前执行一下取消操作，防止连续点击重复发送请求
    let reqData = '';
    //处理如url相同请求参数不同时上一个请求被屏蔽的情况
    if(config.method === 'get'){
      reqData = config.url + config.method + JSON.stringify(config.params);
    }else{
      reqData = config.url + config.method + JSON.stringify(config.data);
    }
    //如果用户连续点击某个按钮会发起多个相同的请求，可以在这里进行拦截请求并取消上一个重复的请求
    removePending(reqData,true);
    //设置请求的cancelToken(设置后就能中途控制取消了)
    config.cancelToken = new axios.CancelToken((c) => {
      pending[reqData] = c;
      allPendingRequestsRecord.push(c)
    })
    return config;

  },
  error => {
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300){
      notification.error({
        message:response.message,
        placement:'bottomRight',
        className:'notifi-error',
      })
      return Promise.reject('error')
    } else {
      // 接口请求更新界面操作的时间
      return response.data
    }
  },
  error => {
    // 终结由于取消重复请求而引发的报错提示
    if (axios.isCancel(error)) {
      return new Promise(() => {});
    }
    // 请求取消时，也会进入error，根据axios.isCancel()：true--请求取消  false--请求失败
    // 仅在请求失败时做后续处理
    if (!axios.isCancel(error)) {
      notification.error({
        message: '接口请求失败',
        placement: 'bottomRight',
        className:'notifi-error',
      })
    }
    return Promise.reject(error)
  }
)
export default service;
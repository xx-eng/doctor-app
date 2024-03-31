import axios from 'axios'
// import store from '@/store'
// import storage from 'store'
// import notification from 'ant-design-vue/es/notification'
// import Modal from 'ant-design-vue/es/modal'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/storev/mutation-types'
import user from "@/storev/module/user.js";
// import Qs from 'qs'

axios.defaults.withCredentials = true;// 允许跨域携带cookie
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: 'http://121.40.235.133:8181',
    timeout: 60000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    xhrFields: {
        withCredentials : true
    },
    crossDomain: true,
    transformRequest: [
        function (data) {
            // 在请求之前对data传参进行格式转换
            // return Qs.stringify(data)
            // return Qs.parse(data)
            return JSON.stringify(data)
        }
    ]
})

// 异常拦截处理器
const errorHandler = (error) => {
    console.log(error) // for debug

    // notification.error({
    //     message: 'ERROR',
    //     description: '无法连接服务'
    // })
	uni.showToast({
		title: error,
		// icon: cancel
	})
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    // console.log('request-config', config)
    const token = user.state.userId
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers[ACCESS_TOKEN] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    // console.log('request-response', response)
    const res = response.data
    // notification.info({
    //     message: 'Success',
    //     description: res.resultDesc
    // })
	uni.showToast({
		title: res.resultDesc,
		icon: 'success'
	})
    return res
    // if (res.resultCode !== "1000" && res.resultCode !== "2002" && res.resultCode !== "2001" && res.resultCode !== "2003" && res.resultCode !== "2003") {
    //     notification.info({
    //         message: 'Success',
    //         description: res.resultDesc
    //     })
    //     return res
    // } else {
    //     return res
    // }
}, errorHandler)

// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                console.log("执行完成：", response)
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}


const installer = {
    vm: {},
    install (Vue) {
        Vue.use(VueAxios, request)
    }
}

export default request

export {
    installer as VueAxios,
    request as axios
}

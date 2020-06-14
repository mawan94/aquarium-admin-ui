import axios from 'axios'
import {message, Spin} from 'antd';

import storage from './storage';
import ERROR_CODE from './errorCode';
import React from 'react'
import ReactDOM from 'react-dom';

const http = axios.create({
    timeout: 50000
});

// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.put['Content-Type'] = 'application/json';

// request interceptor 请求拦截(请求发出前处理请求)
http.interceptors.request.use(
    config => {
        // do something before request is sent
        config.headers.token = storage.get('token');
        return config
    },
    error => {
        // do something with request
        // for debug
        return Promise.reject(error)
    }
)

// response interceptor 响应拦截器（处理响应数据）
http.interceptors.response.use(
    function (response) { // 这里可以获取的
        // const status = response.status;
        // 对响应数据做点什么
        return response;
    }, function (error) {
        if (error.response.data && !error.response.data.success && error.response.data.msg) {
            message.error(error.response.data.msg);
            let code = error.response.data.code
            if (code == ERROR_CODE.INVALID_TOKEN || code == ERROR_CODE.EMPTY_TOKEN) {
                message.error('点击上方logo重新登录');
                // window.location.href = constant.loginRouter
            }
        }
        return Promise.reject(error);
    }
    // response => {
    //     return response;
    // }
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
);

// 封装get方法
export function get({url, params}) {
    showLoading()
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: params
        }).then(res => {
            hideLoading()
            resolve(res.data)
        }).catch(err => {
            hideLoading()
            reject(err.data)
        })
    })
}

// 封装post方法
export function post({url, data}) {
    showLoading()
    return new Promise((resolve, reject) => {
        http.post(url, JSON.stringify(data)).then(res => {
            hideLoading()
            resolve(res.data)
        }).catch(err => {
            hideLoading()
            reject(err.data)
        })
    })
}

// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading() {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="Loading..." size="large"/>, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading() {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}


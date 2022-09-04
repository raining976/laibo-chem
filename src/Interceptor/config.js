import { ElLoading } from 'element-plus'
import axios from 'axios';
let Base64 = require('js-base64').Base64;

//无感刷新token

// 判断token是否过期, 如果过期(即将过期) 返回 true
const isTokenExpired = () => {
    let expiredTime = localStorage.getItem("token_exp")
    // console.log('expiredTime',expiredTime)
    if (expiredTime) {
        let nowTime = parseInt(new Date().getTime() / 1000)
        let willExpired = (expiredTime - nowTime) < 10
        return willExpired
    }
    return false
}

// 是否正在刷新的标记  -- 防止重复刷新,节流阀
let isRefreshing = false
// 失效后同时发送请求的容器 --- 缓存接口
let subscribers = []
// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
    subscribers.forEach((callback) => {
        callback(newToken)
    })
    // 清空缓存接口
    subscribers = []
}
// 添加缓存接口的方法
function addSubscriber(callback) {
    subscribers.push(callback)
}


// 请求 拦截器
axios.interceptors.request.use(config => {
    let url = config.url
    if(url == '/search'||url.includes('/detail')||url.includes('/banner')||url.includes('/hotProducts')||url.includes('/news')||url.includes('/article')||url.includes('/banner')){
        return config
    }
    ElLoading.service({ fullscreen: true })
    // if (config.url.includes('/login')) {
    //     // localStorage.removeItem("token_exp")
    //     // localStorage.removeItem("refresh_exp")
    //     // localStorage.removeItem("token")
    //     // localStorage.removeItem("refresh")
    //     return config
    // }
    let token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    if (isTokenExpired() && !config.url.includes('/refresh')) {
        let formData = {}
        if (!isRefreshing) {
            isRefreshing = true
            formData = {
                'refresh': localStorage.getItem("refresh")
            }
            axios.post('/refresh/', formData)
                .then(res => {
                    isRefreshing = false
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.data.access) // 存储token
                        // 解密 token
                        let token = res.data.data.access
                        let token_object = Base64.decode(token.split(".")[1])
                        let token_exp = JSON.parse(token_object).exp
                        localStorage.setItem("token_exp", token_exp)
                        // 更新new_token的过期信息
                        onAccessTokenFetched(res.data.data.access)
                        localStorage.setItem("refresh",res.data.data.refresh)
                    }
                }).catch(() => {
                    // 唤起登录页面
                })
        }
        // 将其他接口缓存起来
        const retryRequest = new Promise((resolve) => {
            addSubscriber((newToken) => {
                // 新token替换原来的token
                config.headers.Authorization = "Bearer " + newToken
                // 替换掉url,baseURL会扩展请求url
                config.url = config.url.replace(config.baseURL, "") // 不清楚具体效果在哪
                // 返回重新配置的config,以便再次发起请求
                resolve(config)
            })
        })
        return retryRequest
    }
    return config
}),
    error => {
        console.error(error);
        return Promise.reject(error)
    }



// 响应拦截器
axios.interceptors.response.use(response => {
    ElLoading.service({ fullscreen: true }).close()
    if ('40002' === response.data.code) {
        router.replace({
            path: '/mainPage',
            query: { redirect: router.currentRoute.fullPath }
        })
    }
    return response
})

// 路由拦截器
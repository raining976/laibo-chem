import { ElLoading } from 'element-plus'
import axios from 'axios';


// 请求 拦截器
axios.interceptors.request.use(config => {
    ElLoading.service({ fullscreen: true })
    let token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = token
    }
    console.log('config', config)
    return config
})


// 响应拦截器
axios.interceptors.response.use(response => {
    console.log('response',response)
    ElLoading.service({ fullscreen: true }).close()
    // 未登录或会话已过期
    // 解密access expire过期时间

    //获取当前时间戳 小于==可用  大于就用refresh刷新

    // 判断refresh过期

    if ('401' === response.data.code) {
        router.replace({
            path: '/logIn',
            query: { redirect: router.currentRoute.fullPath }
        })
    }
    return response
})

// 路由拦截器
import axios from 'axios';
import Cookies from 'js-cookie'
import router from '@/router/router';

const axiosInstance = axios.create({
  
  baseURL: import.meta.env.VITE_BASE_Url, // 设置基础路径  
  timeout: 5000, // 设置超时时间  
  // ...其他配置  
});

// 添加请求拦截器  
axiosInstance.interceptors.request.use(
  config => {
    // 在这里可以添加请求头、身份验证等  
    if (config.url.indexOf('/auth/login') == -1) {
      const token = Cookies.get('access_token')

      if (!token) {
        // 如果用户未登录且试图访问非登录页面，重定向到登录页面  
        router.push('/login')
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    debugger
    return Promise.reject(error);
  }
);

// 添加响应拦截器  
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做处理  
    if (response.status == '401') {
      router.push('/login')
    } else if (response.status == "200" && response.config.url.indexOf('/auth/login') != -1) {
      Cookies.set('access_token', response.data.access_token)
      router.push('/home')
    }
    return response;
  },
  error => {
    // 对响应错误做处理 
    if(error.response.status&&error.response&&error.response.data){
      error.message = error.response.data.msg
    }
    if (error.response.status == '401') {
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
package com.example.utils;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;  
  
@Configuration  
public class WebConfig implements WebMvcConfigurer {  
  
    @Autowired  
    private JwtInterceptor jwtInterceptor;  
  
    @Override  
    public void addInterceptors(InterceptorRegistry registry) {  
        // 添加拦截器并设置拦截规则  
        registry.addInterceptor(jwtInterceptor)  
                .addPathPatterns("/**") // 拦截所有请求  
                .excludePathPatterns("/api/login"); // 排除登录接口  
    }  
}
package com.example.utils;

import org.springframework.stereotype.Component;  
import org.springframework.web.servlet.HandlerInterceptor;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
@Component  
public class JwtInterceptor implements HandlerInterceptor {  
  
    @SuppressWarnings("null")
    @Override  
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {  
        // 从请求头中获取Authorization字段  
       
        String authHeader = request.getHeader("Authorization");  
  
        // 验证Authorization字段是否为空  
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {  
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing or invalid");  
            return false;  
        }  
  
        // 提取JWT  
        String jwt = authHeader.substring(7);  
  
        // 验证JWT，这里可以调用之前定义的JwtUtil工具类的方法  
        if (!JwtUtil.validateToken(jwt)) {  
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");  
            return false;  
        }  
  
        // 如果验证通过，将用户名放入请求属性中，供后续处理使用  
        String username = JwtUtil.getUsernameFromToken(jwt);  
        request.setAttribute("username", username);  
  
        return true;  
    }  
}
package com.example.utils;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component  
public class CorsFilter extends OncePerRequestFilter {  
  
    @Override  
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain chain)  
            throws ServletException, IOException {  
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");  
        response.setHeader("Access-Control-Allow-Credentials", "true");  
        response.setHeader("Access-Control-Allow-Methods", "*");  
        response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");  
          
        if ("OPTIONS".equals(request.getMethod())) {  
            response.setStatus(HttpServletResponse.SC_OK);  
        } else {  
            chain.doFilter(request, response);  
        }  
    }  
}
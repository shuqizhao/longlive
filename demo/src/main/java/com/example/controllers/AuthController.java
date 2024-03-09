package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;  
import org.springframework.web.bind.annotation.*;

import com.example.dto.user.UserLoginDto;
import com.example.utils.JwtUtil;
import com.example.utils.ReturnResult;
@RestController  
@RequestMapping("/auth")  
public class AuthController {  
  
    @PostMapping("/login")  
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto) {  
        // 模拟验证用户名和密码  
        if ("test".equals(userLoginDto.getUsername()) && "test".equals(userLoginDto.getPassword())) {  
            String token = JwtUtil.generateToken(userLoginDto.getUsername()); 
            return ResponseEntity.ok(new ReturnResult<String>("登录成功","200","",token));  
        }  
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ReturnResult<String>("用户名或密码错误","500",""));  
    }  
  
    @GetMapping("/protected")  
    public ResponseEntity<?> protectedEndpoint(@RequestHeader("Authorization") String authToken) {  
        String username = JwtUtil.getUsernameFromToken(authToken);  
        if (JwtUtil.validateToken(authToken) && username != null && username.equals("user")) {  
            return ResponseEntity.ok("Access granted");  
        }  
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");  
    }  
}
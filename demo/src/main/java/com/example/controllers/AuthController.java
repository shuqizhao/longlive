package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;  
import org.springframework.web.bind.annotation.*;

import com.example.utils.JwtUtil;  
  
@RestController  
@RequestMapping("/api")  
public class AuthController {  
  
    @PostMapping("/login")  
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {  
        // 模拟验证用户名和密码  
        if ("test".equals(username) && "test".equals(password)) {  
            String token = JwtUtil.generateToken(username);  
            return ResponseEntity.ok(token);  
        }  
        return ResponseEntity.badRequest().body("Invalid username or password");  
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
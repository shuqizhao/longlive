package com.example.utils;

import io.jsonwebtoken.Jwts;  
import io.jsonwebtoken.SignatureAlgorithm;  
import java.util.Date;  
  
public class JwtUtil {  
  
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds  
    private static final String SECRET_KEY = "yourSecretKey"; // Replace with your secret key  
  
    public static String generateToken(String username) {  
        return Jwts.builder()  
                .setSubject(username)  
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)  
                .compact();  
    }  
  
    public static String getUsernameFromToken(String token) {  
        return Jwts.parser()  
                .setSigningKey(SECRET_KEY)  
                .parseClaimsJws(token)  
                .getBody()  
                .getSubject();  
    }  
  
    public static boolean validateToken(String token) {  
        try {  
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);  
            return true;  
        } catch (Exception e) {  
            return false;  
        }  
    }  
}
package com.example.utils;

import lombok.Data;

@Data
public class ReturnResult<T> {
    private String msg;
    private String status; // 通常使用code而不是status，以避免与HTTP状态码混淆
    private T data;
    private String access_token;

    // 构造函数
    public ReturnResult(String msg, String status, T data) {
        this.msg = msg;
        this.status = status;
        this.data = data;
    }

    // 构造函数
    public ReturnResult(String msg, String status, T data, String access_token) {
        this.msg = msg;
        this.status = status;
        this.data = data;
        this.access_token = access_token;
    }
}
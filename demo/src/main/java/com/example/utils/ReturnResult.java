package com.example.utils;

import lombok.Data;

@Data
public class ReturnResult<T> {
    private String msg;
    private String code; // 通常使用code而不是status，以避免与HTTP状态码混淆
    private T data;
    private String access_token;

    // 构造函数
    public ReturnResult(String msg, String code, T data) {
        this.msg = msg;
        this.code = code;
        this.data = data;
    }

    // 构造函数
    public ReturnResult(String msg, String code, T data, String access_token) {
        this.msg = msg;
        this.code = code;
        this.data = data;
        this.access_token = access_token;
    }
}
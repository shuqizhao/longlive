package com.example.dto.user;

import lombok.Data;

@Data
public class UserListSearchDto {
    private String user_name;
    private Integer page;
    private Integer perPage;
}

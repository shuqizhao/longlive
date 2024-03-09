package com.example.dto.user;

import java.util.List;

import lombok.Data;

@Data
public class UserListDto {
    private Integer count;
    private List<UserDto> rows;
}

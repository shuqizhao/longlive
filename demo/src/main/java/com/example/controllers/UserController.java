package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.blogic.MyBlogic;
import com.example.dto.user.UserDto;
import com.example.dto.user.UserListDto;
import com.example.dto.user.UserListSearchDto;
import com.example.dto.user.UserLoginDto;
import com.example.utils.ReturnResult;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
@RequestMapping("/user")  
public class UserController {

    @Autowired
    MyBlogic myBlogic;
    /**
     *
     * @param name the name to greet
     * @return greeting text
     */
    @GetMapping("/list")
    public ResponseEntity<?> list(@RequestParam UserListSearchDto userListSearchDto) {
        List<UserDto> userDtos = myBlogic.getUsersByCondition(userListSearchDto);
        List<Integer> counts = myBlogic.getUsersByConditionCount(userListSearchDto);
        UserListDto userListDto = new UserListDto();
        userListDto.setCount(counts.get(0));
        userListDto.setRows(userDtos);
        return  ResponseEntity.ok(new ReturnResult<UserListDto>("","200",userListDto));  
    }
}

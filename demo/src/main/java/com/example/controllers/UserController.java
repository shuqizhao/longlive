package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blogic.MyBlogic;
import com.example.dto.user.UserDto;
import com.example.dto.user.UserListDto;
import com.example.dto.user.UserListSearchDto;
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
    public ResponseEntity<?> list(@RequestParam(required = false) String user_name,@RequestParam Integer page,@RequestParam Integer perPage) {
        UserListSearchDto userListSearchDto = new UserListSearchDto();
        if(user_name==null){
            user_name="";
        }
        userListSearchDto.setUser_name(user_name);
        userListSearchDto.setPage((page-1)*perPage);
        userListSearchDto.setPerPage(perPage);
        List<UserDto> userDtos = myBlogic.getUsersByCondition(userListSearchDto);
        List<Integer> counts = myBlogic.getUsersByConditionCount(userListSearchDto);
        UserListDto userListDto = new UserListDto();
        userListDto.setCount(counts.get(0));
        userListDto.setRows(userDtos);
        return  ResponseEntity.ok(new ReturnResult<UserListDto>("","0",userListDto));  
    }
}

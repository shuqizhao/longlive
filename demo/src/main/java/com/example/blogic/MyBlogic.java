package com.example.blogic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Service;

import com.example.dto.user.UserDto;
import com.example.dto.user.UserListSearchDto;
import com.example.utils.MyBatisHelper;  
  
@Service  
public class MyBlogic {  
  
    @Autowired  
    private MyBatisHelper myBatisHelper;  
  
    public List<UserDto> getUsersByCondition(UserListSearchDto userListSearchDto) {  
        return myBatisHelper.selectList("selectUsersByCondition", userListSearchDto);  
    }

    
    public List<Integer> getUsersByConditionCount(UserListSearchDto userListSearchDto) {  
        return myBatisHelper.selectList("selectUsersByConditionCount", userListSearchDto);  
    }
}
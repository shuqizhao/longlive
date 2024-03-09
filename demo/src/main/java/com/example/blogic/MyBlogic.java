package com.example.blogic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Service;

import com.example.dto.user.User;
import com.example.utils.MyBatisHelper;  
  
@Service  
public class MyBlogic {  
  
    @Autowired  
    private MyBatisHelper myBatisHelper;  
  
    public List<User> getUsersByCondition(String condition) {  
        // 假设你有一个UserMapper接口和一个selectUsersByCondition方法  
        User insql = new User();
        insql.setName(condition);
        insql.setUid(condition);
        return myBatisHelper.selectList("selectUsersByCondition", insql);  
    }
}
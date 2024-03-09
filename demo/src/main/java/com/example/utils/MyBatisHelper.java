package com.example.utils;

import org.mybatis.spring.SqlSessionTemplate;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

import java.util.List;  
  
@Component
@Slf4j
public class MyBatisHelper {  
  
    private final SqlSessionTemplate sqlSessionTemplate;  
  
    @Autowired  
    public MyBatisHelper(SqlSessionTemplate sqlSessionTemplate) {  
        this.sqlSessionTemplate = sqlSessionTemplate;  
    }  
  
    /**  
     * 执行查询，返回结果列表  
     * @param methodName 映射器中的方法名  
     * @param params 方法参数  
     * @param resultType 结果类型  
     * @return 结果列表  
     */  
    public <T> List<T> selectList(String methodName, Object params) {  
        List<T> results = sqlSessionTemplate.selectList(methodName, params); 
        log.info(results.toString());
        return results; 
    }  
  
    /**  
     * 执行更新，返回更新影响的行数  
     * @param methodName 映射器中的方法名  
     * @param params 方法参数  
     * @param status 
     * @return 更新影响的行数  
     */  
    public int update(String methodName, Object params, String status) {  
        return sqlSessionTemplate.update(methodName, params);  
    }  
  
    /**  
     * 执行任意SQL，返回结果映射到指定类型  
     * @param sql SQL语句  
     * @param resultType 结果类型  
     * @param params SQL参数  
     * @return 结果列表  
     */  
    public <T> List<T> executeQuery(String sql,Object params) {  
        return sqlSessionTemplate.selectList(sql, params);  
    }  
  
    /**  
     * 执行任意SQL更新，返回更新影响的行数  
     * @param sql SQL语句  
     * @param params SQL参数  
     * @return 更新影响的行数  
     */  
    public int executeUpdate(String sql, Object params) {  
        return sqlSessionTemplate.update(sql, params);  
    }  
}
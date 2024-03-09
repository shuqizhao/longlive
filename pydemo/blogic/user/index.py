#coding=utf-8

from util import mysqlDBUtil

def getAllUsers(inputStr):
    users = mysqlDBUtil.executeSQL('select_all_users',inputStr)
    return users

def getAllUsersCount(inputStr):
    results = mysqlDBUtil.executeSQL('select_all_users_count',inputStr)
    if len(results)==0:
        return 0
    else:
        return results[0]['usersCount']
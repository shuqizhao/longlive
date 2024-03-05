#coding=utf-8
from util import DBUtil,ConfigUtil

MAPPER_FILE='mapper/test.xml'
MYAPP_FILE='myapp.conf'

cu = ConfigUtil(MYAPP_FILE)

pgsqlUrl = cu.get("pgsqlUrl")
pgDBUtil = DBUtil(pgsqlUrl,MAPPER_FILE)
rows = pgDBUtil.executeSQL('select_by_name',{'name':U'测试'})
for row in rows:
    print row
pgDBUtil.close()

mysqlUrl = cu.get("mysqlUrl")
mysqlDBUtil = DBUtil(mysqlUrl,MAPPER_FILE)
mysqlDBUtil.executeSQL('updatetest',{'id':1,'name':U'中国航哥'})

mssqlUrl = cu.get("mssqlUrl")
mssqlDBUtil = DBUtil(mssqlUrl,MAPPER_FILE)
mssqlDBUtil.executeSQL('inserttest',{'id':1,'name':U'中国航哥'})
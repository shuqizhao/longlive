#coding=utf-8
from sqlalchemy import create_engine,text
from configparser import ConfigParser
import xml.dom.minidom

class DBUtil():
    def __init__(self,uri,mapper):
        self.engine = create_engine(uri)
        self.conn = self.engine.connect()
        self.sqlDic={}
        self.dom = xml.dom.minidom.parse(mapper)
        root = self.dom.documentElement
        itemlist = root.getElementsByTagName('select')
        inserts = root.getElementsByTagName('insert')
        if len(inserts)!=0:
            itemlist.append(inserts)
        updates = root.getElementsByTagName('update')
        if len(updates)!=0:
            itemlist.append(updates)
        for item in itemlist:
            self.sqlDic[item.getAttribute("id")]=item.firstChild.data
    def close(self):
        self.conn.close()
    def executeSQL(self,sqlId,args={}):
        if sqlId in self.sqlDic:
            sqlText = self.sqlDic[sqlId]
            result = self.conn.execute(text(sqlText),args)
            rows = []
            for row in result:
                rows.append({col[0]: col[1] for col in zip(result.keys(), row)})
            return rows
        else:
            raise Exception("no sql id named "+sqlId)

class ConfigUtil():
    def __init__(self,configFile):
        self.cp = ConfigParser()
        self.cp.read(configFile)
        self.runmode=self.cp.get('default','runmode')
    def get(self,key):
        return self.cp.get(self.runmode,key)
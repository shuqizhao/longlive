#coding=utf-8
from flask import Flask
from flask_cors import CORS  
from flask_jwt_extended import JWTManager
from controller.auth import auths_blueprint
from controller.user import user_blueprint

from util import ConfigUtil,DBUtil


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

# 注册蓝图
app.register_blueprint(auths_blueprint, url_prefix='/auth')
app.register_blueprint(user_blueprint, url_prefix='/user')

cors = CORS(app,supports_credentials=True)  

if __name__ == '__main__':  
    app.run(debug=True)
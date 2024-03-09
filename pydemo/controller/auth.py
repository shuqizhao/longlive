from flask import jsonify, request,Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity  

auths_blueprint = Blueprint('auth', __name__)

# 假设有一个用户验证函数  
@auths_blueprint.route('/login', methods=['POST'])  
def login():  
    username = request.json.get('username', None)  
    password = request.json.get('password', None)
    if username != 'test' or password != 'test':  
        return jsonify({"msg": "用户名或密码错误！","code":"401"}), 401 
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token,msg="",code=200), 200
  
# 受保护的路由，需要 JWT 验证  
@auths_blueprint.route('/protected', methods=['GET'])
@jwt_required  
def protected():
    current_user = get_jwt_identity()  
    return jsonify(logged_in_as=current_user), 200
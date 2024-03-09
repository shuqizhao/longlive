from flask import jsonify, request,Blueprint
from flask_jwt_extended import jwt_required 
from blogic.user.index import getAllUsers,getAllUsersCount

user_blueprint = Blueprint('user', __name__)

# 假设有一个用户验证函数  
@user_blueprint.route('/list', methods=['GET'])  
# @jwt_required()
def list():  
    user_name = request.args.get('user_name', None)
    if user_name is None:
        user_name=''
    page = request.args.get('page', None)  
    perPage = request.args.get('perPage', None)  
    inputStr = {"name":user_name,"page":(int(page)-1)*int(perPage),"perPage":int(perPage)}
    users = getAllUsers(inputStr)
    count = getAllUsersCount(inputStr)
    result ={
        "count":count,
        "rows":users
    }
    return jsonify(data=result,msg="ok",status=0), 200
  

from functools import wraps
from flask import make_response,jsonify,request
from models import User
import jwt

JWT_SECRET = 'secret'

def client_endpoint(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not request.is_json:
            return make_response(jsonify({"msg": "Missing JSON in request", "status": "error"}), 400)
        if 'Authorization' not in request.headers:
            return make_response(jsonify({"msg": "Missing Authorization header", "status": "error"}), 400)
        token = request.headers['Authorization'].split(" ")[1]
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms='HS256')
            user_id = data['user_id']
            user = User.query.filter_by(id=user_id).first()
            if not user:
                return make_response(jsonify({"msg": "Invalid token", "status": "error"}), 401)
        except:
            return make_response(jsonify({"msg": "Invalid token", "status": "error"}), 401)
        return func(*args, **kwargs)
    return wrapper
    
def admin_endpoint(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not request.is_json:
            return make_response(jsonify({"msg": "Missing JSON in request", "status": "error"}), 400)
        if 'Authorization' not in request.headers:
            return make_response(jsonify({"msg": "Missing Authorization header", "status": "error"}), 400)
        token = request.headers['Authorization'].split(" ")[1]
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms='HS256')
            print(data)
            user_id = data['user_id']
            user = User.query.filter_by(id=user_id).first()
            if not user:
                return make_response(jsonify({"msg": "Invalid token", "status": "error"}), 401)
            if user.role != 'admin':
                return make_response(jsonify({"msg": "This is an admin only endpoint", "status": "error"}), 401)
        except:
            return make_response(jsonify({"msg": "Invalid token", "status": "error"}), 401)
        return func(*args, **kwargs)
    return wrapper
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    
    app.config.from_pyfile('config.py')

    jwt = JWTManager(app)

    from app.features.auth.routes import auth_bp
    from app.features.admin.routes import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app

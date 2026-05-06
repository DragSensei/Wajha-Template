from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    set_access_cookies, set_refresh_cookies,
    jwt_required, get_jwt_identity, unset_jwt_cookies
)
from app.utils.security import hash_password, verify_password, get_db_connection
from psycopg2.extras import RealDictCursor
import re

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email format"}), 400

    hashed_pw = hash_password(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({"error": "Email already exists"}), 400

        cur.execute(
            "INSERT INTO users (email, password_hash, role) VALUES (%s, %s, 'CLIENT') RETURNING id, email, role",
            (email, hashed_pw)
        )
        user = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        access_token = create_access_token(identity=user['id'])
        refresh_token = create_refresh_token(identity=user['id'])

        resp = jsonify({"message": "User registered successfully", "user": {"id": user['id'], "email": user['email'], "role": user['role']}})
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp, 201

    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({"error": "Database error"}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, email, password_hash, role FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if user and verify_password(password, user['password_hash']):
            access_token = create_access_token(identity=user['id'])
            refresh_token = create_refresh_token(identity=user['id'])

            resp = jsonify({"message": "Login successful", "user": {"id": user['id'], "email": user['email'], "role": user['role']}})
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)
            return resp, 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({"error": "Database error"}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    resp = jsonify({'message': 'Token refreshed'})
    set_access_cookies(resp, access_token)
    return resp, 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'message': 'Logged out'})
    unset_jwt_cookies(resp)
    return resp, 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required(optional=True)
def me():
    current_user_id = get_jwt_identity()
    
    if not current_user_id:
        return jsonify({"user": None}), 200

    conn = get_db_connection()
    if conn is None:
        # Mock user for template development if no DB is connected
        return jsonify({"user": {"id": 1, "email": "mock@example.com", "role": "ADMIN"}}), 200

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, email, role FROM users WHERE id = %s", (current_user_id,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if user:
            return jsonify({"user": user}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        print(f"Me error: {e}")
        return jsonify({"error": "Database error"}), 500

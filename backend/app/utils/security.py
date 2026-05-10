import bcrypt
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import jsonify
import os

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_db_connection():
    conn_string = os.environ.get('DATABASE_URL')
    if not conn_string:
        print("WARNING: DATABASE_URL not set. Using mock connection.")
        return None # In a real scenario, raise an error. Here we return None to let the mock routes handle it.
    try:
        return psycopg2.connect(conn_string)
    except psycopg2.Error as e:
        print(f"ERROR: Database connection failed: {e}")
        return None

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            try:
                conn = get_db_connection()
                cur = conn.cursor(cursor_factory=RealDictCursor)
                cur.execute("SELECT role FROM users WHERE id = %s", (current_user_id,))
                user = cur.fetchone()
                cur.close()
                conn.close()
                
                if not user or user['role'] != 'ADMIN':
                    return jsonify(error="Admin access required"), 403
                return fn(*args, **kwargs)
            except Exception as e:
                print(f"Admin check error: {e}")
                return jsonify(error="Database error"), 500
        return decorator
    return wrapper

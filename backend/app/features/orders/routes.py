from flask import Blueprint, jsonify, request
from app.utils.security import get_db_connection
from psycopg2.extras import RealDictCursor

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email', 'Not provided')
    items = data.get('items')
    total = data.get('total')
    
    if not name or not items:
        return jsonify({"error": "Missing required order fields"}), 400

    # In a real app: Insert into orders table via psycopg2
    # INSERT INTO orders (customer_name, customer_email, items, total_amount) VALUES (...)
    
    print(f"New Order: {name} - Total: ${total} - Items: {items}")
    return jsonify({"message": "Order synced successfully"}), 201

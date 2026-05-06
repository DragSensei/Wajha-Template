from flask import Blueprint, request, jsonify
from app.utils.security import admin_required, get_db_connection
from psycopg2.extras import RealDictCursor
import os

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET'])
@admin_required()
def dashboard():
    # Mock data for dashboard, matching Movano's logic
    data = {
        "ytd_sales": 15000.0,
        "sales_growth": 12.5,
        "recent_orders": [
            {"id": 101, "customer_name": "John Doe", "total_amount": 250.0, "status": "pending"},
            {"id": 102, "customer_name": "Jane Smith", "total_amount": 900.0, "status": "completed"}
        ]
    }
    return jsonify(data), 200

@admin_bp.route('/products', methods=['GET', 'POST'])
@admin_required()
def products():
    if request.method == 'GET':
        # Mock product list
        products = [
            {"id": 1, "name": "Modern Sofa", "price": 499.99, "category": "sofa"},
            {"id": 2, "name": "Dining Table", "price": 799.99, "category": "dining"}
        ]
        return jsonify(products), 200
    
    if request.method == 'POST':
        data = request.get_json()
        # In a real app, insert into DB here
        return jsonify({"message": "Product saved successfully", "product": data}), 201

@admin_bp.route('/products/<int:id>', methods=['DELETE'])
@admin_required()
def delete_product(id):
    # In a real app, delete from DB here
    return jsonify({"message": f"Product {id} deleted successfully"}), 200

@admin_bp.route('/orders', methods=['GET'])
@admin_required()
def orders():
    # Mock orders list
    orders = [
        {"id": 101, "customer_name": "John Doe", "customer_email": "john@example.com", "total_amount": 250.0, "status": "pending"},
        {"id": 102, "customer_name": "Jane Smith", "customer_email": "jane@example.com", "total_amount": 900.0, "status": "completed"}
    ]
    return jsonify(orders), 200

@admin_bp.route('/orders/<int:id>/complete', methods=['PUT'])
@admin_required()
def complete_order(id):
    # In a real app, update status in DB here
    return jsonify({"message": f"Order #{id} marked as completed"}), 200

@admin_bp.route('/promo', methods=['GET', 'POST'])
@admin_required()
def promo():
    if request.method == 'GET':
        # Mock promo settings
        settings = {
            "discount_active": True,
            "discount_percent": 15,
            "custom_sale_text": "Summer Sale",
            "discount_categories": ["sofa", "dining"],
            "discount_product_ids": []
        }
        return jsonify(settings), 200

    if request.method == 'POST':
        data = request.get_json()
        # In a real app, save settings to DB here
        return jsonify({"message": "Promo settings updated successfully"}), 200

@admin_bp.route('/settings', methods=['GET', 'POST'])
@admin_required()
def settings():
    if request.method == 'GET':
        return jsonify({"whatsapp_number": "1234567890"}), 200

    if request.method == 'POST':
        data = request.get_json()
        return jsonify({"message": "Settings updated successfully"}), 200

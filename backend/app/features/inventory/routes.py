from flask import Blueprint, jsonify, request
from app.utils.security import get_db_connection
from psycopg2.extras import RealDictCursor

inventory_bp = Blueprint('inventory', __name__)

LUMINA_MOCK_PRODUCTS = [
    { "id": 1, "name": "LUMINA OLED 8K", "category": "TV", "price": 3499.00, "image_filename": "https://lh3.googleusercontent.com/aida-public/AB6AXuDJOYpxDwCM2BVspbQfFCed0oSxBHC1UBqTTGJsN6U3YH2JoWYM9uK_0wSlQDljML9shdMyrH6Lcn2h8CNGpw2yTyJVp1-pS0qcuu308k9uPSQn-ng3MdNIcIUQp1hHSaUX9EiPrHNlQEwZ7HSDA2dkO3tWg46GtutaQCZbHx3nyqXJmJJq0cy8bVo9YgREB-pos_WATX84M-ol3e9-tqZcLAC4AHvsW7ln_QLJ6T5wYbGz31Qk1AmNIlzRR_bl6ld25Q4Ac7rg0W2q" },
    { "id": 2, "name": "Sonic Pro Wireless", "category": "HP", "price": 449.00, "image_filename": "https://lh3.googleusercontent.com/aida-public/AB6AXuCY4UZzRcjBiMpbflOuX1V77zRuE60VVT1My9sJZ2A6Y2xz6UekTuZbUalHmK5pwo8Q3DQZ_zxA7g3fKssWRfECvv4o4ONxwtb6jWlKHbNaUnYyZr_qAP4gYH5CHiV794bnPN3cchSPzm98S3_aDSkgKOLcUHujPc2C3t45ftWKN9IE3F97LtqKBkjfoFEzTuUqPg4yWAfrFVek2YPEsx5F34h8gdLuQv-UUol9gHnC7NZjcEIUSqN1nWajMpOtvgkmRivDWbuVpmf9" },
    { "id": 3, "name": "LUMINA Prime X", "category": "PHONES", "price": 1199.00, "image_filename": "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZyTDQATP0AolG_aG4WBTtDYGDw3KL9TjpLhSvTD1buj97fPdaR8U8zWUSPA5lFacyNbpy0RFzwSLOmBuwWP8-9c8Q9l460kKkwJ8Uq_pZ9jHK5CuEHK2xZ39Dira3pDU0jRtqZoqr9fM90NX4Mau5zE2vRTWgQDJX62OYrKMFDDWaCNQRbd_Kv5ZmKwUc0hNzHrIZUU9QBOprCaIGBfQit1OVRWLwSDDM4T9rtbxPh0RnevAqUOC87Ey3YeHYJnm4Me91jEVh8IX" },
    { "id": 4, "name": "Studio Tab 12", "category": "IPADS", "price": 899.00, "image_filename": "https://lh3.googleusercontent.com/aida-public/AB6AXuCxRi8Jj1v0wb9fM7PAKpNRF59O8jtBdTDTyqT00TxaTQb6ybu62d2SjtWtyebsYMYtk9qQSvr2uVENWFzQU1EBg0FphKqmXkpaFhbukXzKaDzLqEDuchMEof9NGADWdBro0mLPBmcTXlR3iJoBFM8Tw_l8qdiPsbNAUgaOCCKW5nyhuwL6wrIkXPuLuuQq7ie1OjnKtn98qC8RDP2C4K6x7DXTSc2_gs2g8wFYucVNTxUZUUMW9tC3pBaII9Eky_9POITTtDPk7Old" }
]

@inventory_bp.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM products")
                db_products = cur.fetchall()
                if db_products:
                    return jsonify(db_products), 200
        except Exception as e:
            pass
        finally:
            conn.close()
    
    return jsonify(LUMINA_MOCK_PRODUCTS), 200

@inventory_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
                product = cur.fetchone()
                if product:
                    return jsonify(product), 200
        except Exception as e:
            pass
        finally:
            conn.close()

    mock_product = next((p for p in LUMINA_MOCK_PRODUCTS if p["id"] == product_id), None)
    if mock_product:
        return jsonify(mock_product), 200

    return jsonify({"error": "Product not found"}), 404

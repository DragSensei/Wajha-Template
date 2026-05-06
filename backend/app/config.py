import os

SECRET_KEY = os.environ.get('SECRET_KEY', 'dev')
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'super-secret')
JWT_TOKEN_LOCATION = ['cookies']
JWT_COOKIE_SECURE = os.environ.get('JWT_COOKIE_SECURE', 'False').lower() in ('true', '1', 't')
JWT_COOKIE_CSRF_PROTECT = os.environ.get('JWT_COOKIE_CSRF_PROTECT', 'True').lower() in ('true', '1', 't')

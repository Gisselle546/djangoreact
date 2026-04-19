from .base import *
from urllib.parse import urlparse
import dj_database_url
import os

DEBUG = False

ALLOWED_HOSTS = ['*']

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())


CORS_ALLOWED_ORIGINS = ['https://djangoreact.vercel.app', 'https://ecommersefifa.netlify.app']
CSRF_TRUSTED_ORIGINS = ['https://djangoreact.vercel.app', 'https://ecommersefifa.netlify.app']

DATABASE_URL = os.getenv('DATABASE_URL')
db_info = urlparse(DATABASE_URL)
DATABASES = {
    'default': dj_database_url.config(conn_max_age=600),
}

DATABASES['default']['DISABLE_SERVER_SIDE_CURSORS'] = True




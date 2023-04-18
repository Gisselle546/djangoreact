from .base import *
from urllib.parse import urlparse
import dj_database_url
import os

DEBUG = False

ALLOWED_HOSTS = ['*']

DEVELOPMENT_MODE = os.getenv("DEVELOPMENT_MODE", False)

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())


CORS_ALLOWED_ORIGINS = ['djangoreact-mbovb3a1y-gissellerodriguez431-gmailcom.vercel.app', 'https://djangoreact.vercel.app']
CSRF_TRUSTED_ORIGINS = ['djangoreact-mbovb3a1y-gissellerodriguez431-gmailcom.vercel.app', 'https://djangoreact.vercel.app']

DATABASE_URL = os.getenv('DATABASE_URL')
db_info = urlparse(DATABASE_URL)
DATABASES = {
    'default': dj_database_url.config(conn_max_age=600),
}

DATABASES['default']['DISABLE_SERVER_SIDE_CURSORS'] = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
       'file': {
           'level': 'DEBUG',
           'class': 'logging.FileHandler',
           'filename': 'log.django',
       },
    },
    'loggers': {
        'django': {
            'handlers': ['console','file'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
    },
}


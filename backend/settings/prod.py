from .base import *
import os

DEBUG = False

ALLOWED_HOSTS = ['*']

DEVELOPMENT_MODE = os.getenv("DEVELOPMENT_MODE", False)

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())


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


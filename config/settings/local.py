#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Local settings
- Run in Debug mode
- Use console backend for emails
- Add Django Debug Toolbar
- Add django-extensions as app
"""

from .base import *  # noqa

import os
import openpay
import dj_database_url
import sys

reload(sys)
sys.setdefaultencoding('utf8')


# DEBUG
# -----------------------------------------------------------------------------
DEBUG = env.bool('DJANGO_DEBUG', default=True)
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# CACHING
# -----------------------------------------------------------------------------
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': ''
    }
}

# DATABASE
# -----------------------------------------------------------------------------
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(str(ROOT_DIR), 'db.sqlite3'),
#     }
# }


# DATABASE
DATABASES = {
    'default': dj_database_url.config()
}


# -----------------------------------------------------------------------------
# DATABASES = {
#      'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'miemma',
#         'USER': 'miemma',
#         'PASSWORD': 'hola',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# django-debug-toolbar
# -----------------------------------------------------------------------------
MIDDLEWARE_CLASSES += ('debug_toolbar.middleware.DebugToolbarMiddleware',)
INSTALLED_APPS += ('debug_toolbar', )

INTERNAL_IPS = ('localhost','127.0.0.1', '10.0.2.2',)

DEBUG_TOOLBAR_CONFIG = {
    'DISABLE_PANELS': [
        'debug_toolbar.panels.redirects.RedirectsPanel',
    ],
    'SHOW_TEMPLATE_CONTEXT': True,
}

# django-extensions
# -----------------------------------------------------------------------------
INSTALLED_APPS += ('django_extensions', )

# TESTING
# -----------------------------------------------------------------------------
TEST_RUNNER = 'django.test.runner.DiscoverRunner'

# STATIC FILE CONFIGURATION
# -----------------------------------------------------------------------------
STATIC_URL = '/static/'

# MEDIA CONFIGURATION
# -----------------------------------------------------------------------------
MEDIA_ROOT = str(PROJECT_DIR('media'))

MEDIA_URL = '/media/'

# EMAIL CONFIGURATION
# -----------------------------------------------------------------------------
DEFAULT_EMAIL_TO = "devsemma@gmail.com"
DEFAULT_JOIN_EMAIL_TO = "devsemma@gmail.com"

# OPENPAY DEV CONFIGURATION
# -----------------------------------------------------------------------------
openpay.api_key = "sk_2ed3e30960384907a0c73444ce6ea1a4"
openpay.verify_ssl_certs = False
openpay.merchant_id = "mg0kzdwsiduimlfaudun"
openpay.production = False
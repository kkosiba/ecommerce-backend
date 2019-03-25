# Production settings

from .base import *

import django_heroku

SECRET_KEY = os.environ.get("SECRET_KEY", "")

DEBUG = os.environ.get("DEBUG", "")

ALLOWED_HOSTS = ["https://ecommerce-backend-django.herokuapp.com/", ]

STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_PUBLISHABLE_KEY = os.environ.get("STRIPE_PUBLISHABLE_KEY", "")

# Activate Django-Heroku.
django_heroku.settings(locals())

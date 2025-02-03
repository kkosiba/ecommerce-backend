from pathlib import Path

from decouple import config

BASE_DIR = Path(__file__).parents[1]

PROJECT_ENVIRONMENT = config("PROJECT_ENVIRONMENT")

SECRET_KEY = config("DJANGO_SECRET_KEY")

DEBUG = PROJECT_ENVIRONMENT == "development"

ALLOWED_HOSTS = (
    ["0.0.0.0", "localhost"]
    if PROJECT_ENVIRONMENT == "development"
    else config("ALLOWED_HOSTS", cast=lambda v: [s.strip() for s in v.split(",")])
)

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "taggit",
    "rest_framework",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    "src.apps.accounts",
    "src.apps.payments",
    "src.apps.newsletter",
    "src.apps.products",
]

SITE_ID = 1

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "src.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                # `allauth` needs this from django
                "django.template.context_processors.request",
            ],
        },
    },
]

WSGI_APPLICATION = "src.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRES_DB"),
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": config("POSTGRES_HOST"),
        "PORT": config("POSTGRES_PORT"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-gb"

TIME_ZONE = "Europe/London"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# CUSTOM SETTINGS

TAGGIT_CASE_INSENSITIVE = True

CORS_ORIGIN_ALLOW_ALL = True

# authentication related stuff
AUTH_USER_MODEL = "accounts.CustomUser"

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
)

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        # 'rest_framework.permissions.IsAuthenticated',
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
}
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_VERIFICATION = "none"

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "accounts.api.serializers.CustomUserDetailsSerializer",
    "LOGIN_SERIALIZER": "accounts.api.serializers.CustomLoginSerializer",
}

REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "accounts.api.serializers.CustomRegisterSerializer",
}

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "ecommerce-backend",
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

STRIPE_SECRET_KEY = config("STRIPE_SECRET_KEY")
STRIPE_PUBLISHABLE_KEY = config("STRIPE_PUBLISHABLE_KEY")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

if PROJECT_ENVIRONMENT != "production":
    STATIC_URL = "/static/"
    STATIC_ROOT = BASE_DIR / "static"

    # Media files
    MEDIA_URL = "/media/"
    MEDIA_ROOT = BASE_DIR / "media"


if PROJECT_ENVIRONMENT == "production":
    INSTALLED_APPS += ["storages"]

    STATICFILES_DIRS = [
        BASE_DIR / "static",
    ]
    STATICFILES_STORAGE = "src.storage_backends.StaticStorage"
    DEFAULT_FILE_STORAGE = "src.storage_backends.MediaStorage"

    AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {
        "CacheControl": "max-age=86400",
    }
    AWS_PRELOAD_METADATA = True
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/"
    ADMIN_MEDIA_PREFIX = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/admin/"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"

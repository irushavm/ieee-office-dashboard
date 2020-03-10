from .common import *
import dj_database_url
import django_heroku


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
DEBUG_PROPAGATE_EXCEPTIONS = True

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
BACKEND_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))
STATICFILES_DIRS = [
    os.path.join(BACKEND_DIR, 'frontend', 'static'),
    os.path.join(BACKEND_DIR, 'pages', 'static'),
]
STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')
STATIC_ROOT = os.path.join(BACKEND_DIR, 'static')
STATIC_URL = '/static/'  # already declared in the default settings
WHITENOISE_ROOT = os.path.join(BACKEND_DIR, 'frontend')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BACKEND_DIR, 'pages/templates'),
            os.path.join(BACKEND_DIR, 'frontend')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Activate Django-Heroku.
# django_heroku.settings(locals())


DATABASES = {
    'default': {
    }
}

# Activate PostgresQL
DATABASE_URL = os.environ.get('DATABASE_URL')
db_from_env = dj_database_url.config(default=DATABASE_URL, conn_max_age=500, ssl_require=True)
DATABASES['default'].update(db_from_env)

release: python manage.py migrate --settings=src.settings.production
web: gunicorn src.wsgi --log-file -
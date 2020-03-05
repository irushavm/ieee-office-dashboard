install:
	scripts/install.sh

create-local-admin:
	python3 manage.py createsuperuser --settings=dashyserver.settings.dev

db-flush:
	python3 manage.py flush --settings=dashyserver.settings.dev

db-populate:
	python3 manage.py makemigrations --settings=dashyserver.settings.dev
	python3 manage.py migrate --settings=dashyserver.settings.dev
	python3 manage.py loaddata fixtures/credentials --settings=dashyserver.settings.dev


run-dev:
	python3 manage.py makemigrations --settings=dashyserver.settings.dev
	python3 manage.py migrate --settings=dashyserver.settings.dev
	python3 manage.py runserver --settings=dashyserver.settings.dev 127.0.0.1:8000

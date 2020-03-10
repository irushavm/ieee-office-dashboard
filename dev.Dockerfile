# pull official base image
FROM python:3.5-alpine

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# install psycopg2
RUN apk update 
RUN apk add --virtual build-deps gcc python3-dev musl-dev
RUN apk add postgresql-dev
RUN pip install psycopg2 pipenv
RUN apk del build-deps

# copy project
ADD backend /app

# set work directory
WORKDIR /app

# install dependencies
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

ARG django_settings_module
ENV DJANGO_SECRET_KEY $(python -c 'from django.core.management import utils; print(utils.get_random_secret_key())')
ENV DJANGO_SETTINGS_MODULE ${django_settings_module}

# add and run as non-root user
RUN adduser -D webuser
RUN mkdir /app/static
RUN chown webuser:webuser /app/static
RUN chown webuser:webuser /app/api/migrations
VOLUME /app/static
VOLUME /app/api/migrations
USER webuser

# run gunicorn
CMD gunicorn dashyserver.wsgi --log-file=- --bind 0.0.0.0
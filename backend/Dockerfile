FROM python:3.7.5-alpine3.10

RUN mkdir /config
ADD requirements.txt /config/
RUN pip install -r /config/requirements.txt

WORKDIR /app

CMD python manage.py runserver 0.0.0.0:8000


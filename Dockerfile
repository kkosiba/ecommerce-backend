FROM python:3.10

WORKDIR /usr/ecommerce/backend

COPY . /usr/ecommerce/backend

RUN pip install --no-cache-dir -r requirements/base.txt

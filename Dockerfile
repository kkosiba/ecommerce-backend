FROM python:3.10
WORKDIR /usr/ecommerce/backend
ADD . /usr/ecommerce/backend
RUN pip install -r requirements/base.txt

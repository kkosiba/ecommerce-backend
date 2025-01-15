# ecommerce-backend

Django backend for eCommerce project

This project is built using Django REST Framework to provide the backend API
for the eCommerce project. The frontend is available
[here](https://github.com/kkosiba/ecommerce-frontend).

## Features

1. Products API endpoint available at `/api/products/`.
2. Custom user authentication using JSON Web Tokens. The API is available
   at `/api/accounts/`.
2. Simple newsletter functionality: superuser can view the list of all
   subscribers in Django admin panel; any visitor can subscribe. The relevant
   API endpoint is available at `/api/newsletter/`.
3. [Stripe](https://stripe.com/) payments API endpoint available
   at `/api/payments/`.

## Dependencies

1. `python` >=3.13,<3.14
2. `Django` >=5.1,<5.2
3. `PostgreSQL` 16+

This project also uses other packages (see `requirements/base.txt` file for
details). For instance, tag support is provided by
[django-taggit](https://github.com/alex/django-taggit) and image processing is
thanks to [Pillow](https://github.com/python-pillow/Pillow).

## Getting started

The easiest way to get backend up and running is via
[Docker](https://www.docker.com/). See
[docs](https://docs.docker.com/get-started/) to get started. Once set up run
the following command:

`docker-compose up`

This command takes care of populating products list with the sample data.

It may take a while for the process to complete, as Docker needs to pull
required dependencies. Once it is done, the application should be available
at `http://localhost:8000`.

In order to use [Stripe payments](https://stripe.com/) one needs to create an
account and obtain a pair of keys (available in the dashboard after signing in).
These keys should replace `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
values in `src/settings/defaults.py`.

# ecommerce-backend
Django backend for eCommerce project

This project is built using Django REST Framework to provide the backend API for eCommerce project. The deployed API is available on [Heroku](https://ecommerce-backend-django.herokuapp.com/). The frontend is available [here](https://github.com/ncunx/ecommerce-frontend). 

Features
--------
1. Products API endpoint available at `/api/products/`.
2. Custom user authentication using JSON Web Tokens. The API is available at `/api/accounts/`.
2. Simple newsletter functionality: superuser can view the list of all subscribers in Django admin panel; any visitor can subscribe. The relevant API endpoint is available at `/api/newsletter/`.
3. [Stripe](https://stripe.com/) payments API endpoint available at `/api/payments/`.

Main requirements
------------

1. `python` 3.5, 3.6, 3.7
2. `Django` 2.1.7
3. `PostgreSQL` 11.1

This project also uses other packages (see `requirements.txt` file for details).
For instance, tag support is provided by [django-taggit](https://github.com/alex/django-taggit) and image processing is thanks to [Pillow](https://github.com/python-pillow/Pillow).

## How to set up

Firstly, create a new directory and change to it:

`mkdir ecommerce-backend && cd ecommerce-backend`

Then, clone this repository to the current directory:

`git clone https://github.com/ncunx/ecommerce-backend.git .`


For the backend to work, one needs to setup database like SQLite or PostgreSQL on a local machine. This project uses PostgreSQL by default (see [Django documentation](https://docs.djangoproject.com/en/2.1/ref/settings/#databases) for different setup). This process may vary from one OS to another, eg. on Arch Linux one can follow a straightforward guide [here](https://wiki.archlinux.org/index.php/PostgreSQL).

The database settings are specified in `src/settings/local.py`. In particular the default database name is `eCommerceDjango`, which can be created from the PostgreSQL shell by running `createdb eCommerceDjango`.

Next, set up a virtual environment and activate it:

`python3 -m venv env && source env/bin/activate`

Install required packages:

`pip3 install -r requirements.txt`

Next, perform migration:

`python3 manage.py migrate --settings=src.settings.local`

At this point, one may want to create a superuser account and create some products. One can also use sample data provided in `products/fixtures.json` by running:

`python3 manage.py loaddata products/fixtures.json --settings=src.settings.local`

The backend is now ready. Run a local server with

`python3 manage.py runserver --settings=src.settings.local`

The backend should be available at `localhost:8000`.

In order to use [Stripe payments](https://stripe.com/) one needs to create an account and obtain a pair of keys (available in the dashboard after signing in). These keys should replace `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` values in `src/settings/local.py`.

## To do

1. Implement an API endpoint at `/api/orders/` to accept POST request with order JSON from authenticated user, and GET requests from superuser (for further processing).
2. Implement password recovery.

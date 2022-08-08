# ecommerce-backend
Django backend for eCommerce project

This project is built using Django REST Framework to provide the backend API for eCommerce project. The frontend is available [here](https://github.com/kkosiba/ecommerce-frontend). 

Features
--------
1. Products API endpoint available at `/api/products/`.
2. Custom user authentication using JSON Web Tokens. The API is available at `/api/accounts/`.
2. Simple newsletter functionality: superuser can view the list of all subscribers in Django admin panel; any visitor can subscribe. The relevant API endpoint is available at `/api/newsletter/`.
3. [Stripe](https://stripe.com/) payments API endpoint available at `/api/payments/`.

Main requirements
------------

1. `python` 3.7, 3.8, 3.9, 3.10
2. `Django` >=3.2,<4
3. `PostgreSQL` 11.1

This project also uses other packages (see `requirements.txt` file for details).
For instance, tag support is provided by [django-taggit](https://github.com/alex/django-taggit) and image processing is thanks to [Pillow](https://github.com/python-pillow/Pillow).

## How to set up

### Setup using Docker

The easiest way to get backend up and running is via [Docker](https://www.docker.com/). See [docs](https://docs.docker.com/get-started/) to get started. Once set up run the following command:

`docker-compose up`

This command takes care of populating products list with sample data.

It may take a while for the process to complete, as Docker needs to pull required dependencies. Once it is done, the application should be accessible at `0.0.0.0:8000`.

### Manual setup

Firstly, create a new directory and change to it:

`mkdir ecommerce-backend && cd ecommerce-backend`

Then, clone this repository to the current directory:

`git clone https://github.com/kkosiba/ecommerce-backend.git .`

For the backend to work, one needs to setup database like SQLite or PostgreSQL on a local machine. This project uses PostgreSQL by default (see [Django documentation](https://docs.djangoproject.com/en/3.2/ref/settings/#databases) for different setup). This process may vary from one OS to another, eg. on Arch Linux one can follow a straightforward guide [here](https://wiki.archlinux.org/index.php/PostgreSQL).

The database settings are specified in `src/settings/local.py`. In particular the default database name is `eCommerceDjango`, which can be created from the PostgreSQL shell by running `createdb eCommerceDjango`.

Next, set up a virtual environment and activate it:

`python3 -m venv env && source env/bin/activate`

Install required packages:

`pip3 install -r requirements.txt`

Next, perform migration:

`python3 manage.py migrate --settings=src.settings.local`

At this point, one may want to create a superuser account and create some products. One can also use sample data provided in `products/fixtures.json` by running:

`python3 manage.py loaddata products/fixture.json --settings=src.settings.local`

The backend is now ready. Run a local server with

`python3 manage.py runserver --settings=src.settings.local`

The backend should be available at `localhost:8000`.

In order to use [Stripe payments](https://stripe.com/) one needs to create an account and obtain a pair of keys (available in the dashboard after signing in). These keys should replace `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` values in `src/settings/local.py`.

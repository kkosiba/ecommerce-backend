# eCommerce-django
eCommerce Project in Django with REST Framework and React+Redux.

This project is built using Django REST Framework to provide the backend API, which is consumed by the React frontend. All API calls are made via [axios](https://github.com/axios/axios).

The deployed version is available at ....

Features
--------
1. Products are fetched from the products API endpoint available at `/api/products/`.
2. Simple newsletter functionality: superuser can view the list of all subscribers in Django admin panel; any visitor can subscribe. The relevant API endpoint is available at `/api/newsletter/`.
3. Fully operational shopping cart: adding & removing products, incrementing/decrementing quantity of an item in cart (limited by stock availibility), clearing cart.
4. Four-step checkout process: selection of shipping addresses, delivery method, payment method (currently only PayPal supported via [PayPal's sandbox](https://developer.paypal.com/developer/accounts/)), finalizing order.

Dummy buyer account for testing has credentials: 

`(login, password): (ecommerce.paypal.test1@gmail.com, ecommercetest)`

Once the payment goes through it is being POSTed to `localhost:8000/api/orders/` API endpoint for further processing. At the same time, cart is cleared and invoice is displayed.


Main requirements
------------

1. `python` 3.5, 3.6, 3.7
2. `Django` 2.1.5
3. `PostgreSQL` 11.1

This project also uses a few external packages (see `requirements.txt` file for details).
For instance, tag support is provided by [django-taggit](https://github.com/alex/django-taggit),
image processing if thanks to [Pillow](https://github.com/python-pillow/Pillow).

How to set up
-----

Firstly, create a new directory and change to it:

`mkdir eCommerce-django && cd eCommerce-django`

Then, clone this repository to the current directory:

`git clone https://github.com/ncunx/eCommerce-django.git .`

### Setting up backend

For the backend to work, one needs to setup PostgreSQL on a local machine. This process may vary from one OS to another, eg. on Arch Linux one can follow a straightforward guide [here](https://wiki.archlinux.org/index.php/PostgreSQL).

The database settings are specified in `backend/src/src/settings.py`. In particular the default database name is `eCommerceDjango`, which can be created from the PostgreSQL shell by running `createdb eCommerceDjango`.

Next, in the `backend` directory set up a virtual environment and activate it:

`python3 -m venv env && source env/bin/activate`

Install required packages (from the `backend/src/` directory):

`pip3 install -r requirements.txt`

Next, in `backend/src/` run:

`python3 manage.py migrate`

to apply migrations. One may want to create a superuser account and create some products from Django admin panel. One can also use data provided in `products/fixtures.json` by running:

`python3 manage.py loaddata products/fixtures.json`

The backend is set up. Run a local server with

`python3 manage.py runserver`

The backend API should be available at `localhost:8000/api/`.

### Setting up frontend

For the frontend it is enough to navigate to `frontend` directory (`eCommerce-django/frontend`) and run

`npm install`

If everything goes well, it will pull essential packages. Then, one can run frontend on `localhost:3000` by issuing

`npm start`

For PayPal to work, one needs to provide `REACT_APP_PAYPAL_SANDBOX_ID` environment variable in `frontend/.env.development`. The ID can be obtained [here](https://developer.paypal.com/developer/accounts/).


## To do
1. Implement API endpoint to accept POST request with order JSON.
2. Implement password recovery.

## Known issues
1. Succesful login/registration does not redirect user to the previously visited page.
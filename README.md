# eCommerce-django
eCommerce Project in Django with REST Framework API and React+Redux frontend.


Main requirements
------------

1. `python` 3.5, 3.6, 3.7
2. `Django` 2.1.5
3. `PostgreSQL` 11.1

This project also uses a few external packages (see `requirements.txt` file for details).
For instance, tag support is provided by [django-taggit](https://github.com/alex/django-taggit),
image processing if thanks to [Pillow](https://github.com/python-pillow/Pillow).

How to use
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

...todo

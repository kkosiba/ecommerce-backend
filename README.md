# eCommerce-django
eCommerce Project in Django


Main requirements
------------

1. `python` 3.5, 3.6, 3.7
2. `Django` 2.1.4
3. `PostgreSQL` 11.1

This project also uses a few external packages (see `requirements.txt` file for details).
For instance, tag support is provided by [django-taggit](https://github.com/alex/django-taggit),
image processing if thanks to [Pillow](https://github.com/python-pillow/Pillow).

Usage
-----

0. Firstly, one needs to setup PostgreSQL on a local machine. This process may be vary from one OS to another, eg. on Arch Linux one can follow the straightforward guide [here](https://wiki.archlinux.org/index.php/PostgreSQL).

Note: The database name specified in `ecommerce\settings.py` is `eCommerceDjango`.

1. Once PostgresSQL is installed and configured, create a new directory and change to it:

`mkdir eCommerce-django && cd eCommerce-django`

2. Clone the repository:

`git clone https://github.com/ncunx/eCommerce-django.git .`

3. Set up a virtual environment and activate it:

`python3 -m venv <preferred_name> && source <preferred_name>/bin/activate`

4. Install required packages:

`pip3 install -r requirements.txt`

The project is all set up. Run a local server with

`python3 manage.py runserver`

The blog should be available at `localhost:8000`.

# Some requirements (psycopg2 in particular) require system-level dependencies
# to build their wheel. We don't want to ship such dev dependencies in the final
# image, so we build the virtualenv separately.
FROM python:3.13-slim as venv-builder

WORKDIR /opt/project/backend

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtualenv the Docker-way
RUN python -m venv /opt/project/backend/venv
ENV PATH="/opt/project/backend/venv/bin:$PATH"

# Copy and install requirements
COPY requirements/production.txt .
RUN python -m pip install --upgrade pip \
    && python -m pip install --no-cache-dir -r production.txt

# Intermediate step to select only project files and directories that should be shipped
FROM alpine:latest AS tarball-creator

WORKDIR /opt/project

COPY . ./

RUN tar -czf \
    build.tar.gz \
    src gunicorn.conf.py

# Prepare underlying system
FROM python:3.13-slim AS app-system

RUN useradd --create-home appuser

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends locales libpq5 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up locale
RUN sed -i -e 's/# en_GB.UTF-8 UTF-8/en_GB.UTF-8 UTF-8/' /etc/locale.gen \
    && dpkg-reconfigure --frontend=noninteractive locales \
    && update-locale LANG=en_GB.UTF-8

FROM app-system AS app-final

WORKDIR /opt/project/backend

COPY --from=tarball-creator /opt/project/build.tar.gz ./
RUN tar -xzf build.tar.gz \
    && rm build.tar.gz

# Expose gunicorn's port
EXPOSE 8000

# Copy virtualenv created in the venv-builder and activate it
COPY --from=venv-builder /opt/project/backend/venv /opt/project/backend/venv
ENV PATH="/opt/project/backend/venv/bin:$PATH"

# Set the environment
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_SETTINGS_MODULE src.settings.defaults

# Set the user
USER appuser

# Run the app
CMD ["python", "-m", "gunicorn", "--conf", "gunicorn.conf.py", "src.wsgi:application", "--bind", "0.0.0.0:8000"]

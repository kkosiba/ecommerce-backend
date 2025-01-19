FROM python:3.13-slim

WORKDIR /opt/project/backend

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install requirements
COPY requirements/development.txt .
RUN python -m pip install --upgrade pip \
    && python -m pip install --no-cache-dir -r development.txt

COPY . ./

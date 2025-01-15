#!/usr/bin/env bash

# This script updates requirements *.txt files in requirements directory
# based on the dependency definitions in the pyproject.toml file. It needs
# to be executed from the repository root.

function cleanup() {
  rm -rf *.egg-info
}

trap cleanup EXIT

# Layered dependencies
python -m piptools compile \
  --upgrade \
  --resolver backtracking \
  --extra base \
  --output-file requirements/base.txt \
  pyproject.toml

python -m piptools compile \
  --upgrade \
  --resolver backtracking \
  --extra base \
  --extra development \
  --output-file requirements/development.txt \
  pyproject.toml

python -m piptools compile \
  --upgrade \
  --resolver backtracking \
  --extra base \
  --extra production \
  --output-file requirements/production.txt \
  pyproject.toml

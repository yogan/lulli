#!/bin/bash

if [[ "$1" == "--skip-npm" ]] ; then
  echo "Skipping npm ci, docker image will be built with current node_modules."
else
  (cd backend  && npm ci && tar cf node_modules.tar node_modules) && \
  (cd frontend && npm ci && npm run build)
fi

docker build -t lulli .

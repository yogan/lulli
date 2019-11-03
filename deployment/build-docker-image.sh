#!/bin/bash

if [[ "$1" == "--skip-npm" ]] ; then
  echo "Skipping npm ci, docker image will be built with current node_modules."
else
  (cd backend  && npm ci && tar cf node_modules.tar node_modules) && \
  (cd frontend && npm ci)
fi

(cd frontend && npm run build)

VERSION_FILE="frontend/build/version.txt"
GIT_SHA1=$(git rev-parse HEAD)
echo "Version: $GIT_SHA1"                                       > $VERSION_FILE
echo "GitHub: https://github.com/yogan/lulli/commit/$GIT_SHA1" >> $VERSION_FILE

docker build -t yogan/lulli .

echo "Docker image built."
echo
echo "Run it with:"
echo "    ./deployment/run-docker-container.sh"
echo
echo "When everything is fine, push it with:"
echo "    docker push yogan/lulli"
#!/bin/bash
if [[ $(hostname) == "donnergurgler" ]] ; then
    docker-compose up -d
    exit
fi

# TODO: stuff below untested after production change docker-compose
# maybe docker-compose makes sense for local dev as well (but w/o watchtower)

DATA_DIR="$(readlink -f ./frontend/public/data)"

if [[ ! -d "$DATA_DIR" ]] ; then
    echo "No data directory not found."
    echo "Please create $DATA_DIR and put in some images."
    echo "A symlink is fine, too."
    exit 1
fi

if [[ $(docker version --format '{{.Client.Os}}') == "windows" ]] ; then
    if [[ $DATA_DIR =~ ^/mnt/ ]] ; then
        DATA_DIR=$(echo $DATA_DIR | sed -e 's,/mnt/\(\w\)/,\1:/,')
    else
        echo "WARNING: detected Docker for Windows, but $DATA_DIR does not look like"
        echo "a path to a Windows directory. Docker run will probably fail."
    fi
fi

DOCKER_DATA_DIR="/usr/src/lulli/frontend/public/data"

docker run \
    -d --rm \
    --name lulli \
    -p 9001:9001 \
    -v ${DATA_DIR}:${DOCKER_DATA_DIR}:ro \
    yogan/lulli

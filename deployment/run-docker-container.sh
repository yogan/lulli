#!/bin/bash

if [[ $(docker version --format '{{.Client.Os}}') == "windows" ]] ; then
    # FIXME: this only works when:
    #   - using WSL, and Docker for Windows
    #   - $USER in WSL is the same as the Windows user name
    LULLI_BASE="c:/Users/$USER/.lulli"
    CHECK_CONFIG_FILE="/mnt/c/Users/$USER/.lulli/config/default.json"
    CHECK_DATA_DIR="/mnt/c/Users/$USER/.lulli/data"
else
    LULLI_BASE="$HOME/.lulli"
    CHECK_CONFIG_FILE="$LULLI_BASE/config/default.json"
    CHECK_DATA_DIR="$LULLI_BASE/data"
fi

if [[ ! -e "$CHECK_CONFIG_FILE" ]] ; then
    echo "No configuration file found."
    echo "Copy deployment/config/default.json to $CHECK_CONFIG_FILE and try again."
    exit 1
fi

if [[ ! -d "$CHECK_DATA_DIR" ]] ; then
    echo "Data directory not found."
    echo "Make sure that $CHECK_DATA_DIR exists and contains your images."
    exit 2
fi

# those should hopefully work for both Docker for Windows and Linux
CONFIG_DIR="${LULLI_BASE}/config"
DATA_DIR="${LULLI_BASE}/data"
DOCKER_BASE_DIR="/usr/src/lulli"

docker run \
    -d --rm \
    --name lulli \
    -p 9001:9001 \
    -v ${CONFIG_DIR}:${DOCKER_BASE_DIR}/server/config:ro \
    -v ${DATA_DIR}:${DOCKER_BASE_DIR}/data:ro \
    lulli

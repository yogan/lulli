# lulli™

**( ͡° ͜ʖ ͡°)**

A web thingy to search for images and videos (filename based).

## Setup

### Development

After cloning, make sure to create a directory `./frontend/public/data/`.
Within that directory, create subdirectories (a typical pattern is years),
and places some images and/or video in them.

### Production

For production, a Docker image is built and pushed to Docker hub. The latest
version of that image automatically pulled and the container restarted via
[watchtower](https://containrrr.github.io/watchtower/).

To build a new image, use the script `deployment/build-docker-image.sh`.

To run a built image, use the script `deployment/run-docker-container.sh`.  
Note that there are some crazy shenanigans when running the image with
Docker for Windows from a WSL shell. The script tries its best, don't judge it.

FROM node:12-alpine

WORKDIR /usr/src/lulli

COPY backend/package.json  .
COPY backend/src/          ./src/
COPY frontend/build        ./frontend/

# node_modules has symlinks, which COPY from Windows breaks :-(
COPY backend/node_modules.tar .
RUN tar xf node_modules.tar

# FIXME: should be a docker-compose.yml with:
#          ports:
#              - "127.0.0.1:9001:80"
# to not expose :9001 publically (see BSL)
EXPOSE 9001

CMD ["npm", "run", "start-prod"]

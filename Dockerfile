FROM node:12-alpine

WORKDIR /usr/src/lulli

COPY backend/package.json  .
COPY backend/src/          ./src/
COPY frontend/build        ./frontend/

# node_modules has symlinks, which COPY from Windows breaks :-(
COPY backend/node_modules.tar .
RUN tar xf node_modules.tar

EXPOSE 9001

CMD ["npm", "run", "start-prod"]

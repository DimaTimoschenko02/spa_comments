FROM node:18.10.0

WORKDIR /base

RUN chmod -R 755 ./

COPY ../../tsconfig.json ./
COPY ../../tsconfig.build.json ./
COPY ../../package.json ./
COPY ../../src ./src/

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

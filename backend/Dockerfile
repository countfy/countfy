FROM node:20-alpine3.17 as development

WORKDIR /home/node/app

COPY --chown=node:node package.json ./

COPY --chown=node:node package-lock.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
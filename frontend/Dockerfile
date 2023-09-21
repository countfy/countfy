FROM node:20-alpine3.17

WORKDIR /var/www/html

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "run", "dev"]
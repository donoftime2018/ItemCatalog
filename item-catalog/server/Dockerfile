FROM node:18

WORKDIR /item-catalog/server/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 4000

CMD ["npm","start"]
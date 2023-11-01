FROM node:18

WORKDIR /item-catalog/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]
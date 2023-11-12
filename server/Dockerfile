FROM node:21

WORKDIR /usr/app

COPY package*.json ./

RUN ls -a
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]
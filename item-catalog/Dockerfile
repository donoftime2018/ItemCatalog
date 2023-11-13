FROM node:21

WORKDIR $.

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["ls"]
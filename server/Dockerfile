FROM node:21

WORKDIR $.

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["ls"]
FROM node:21.1.0-alpine
COPY . ./app
WORKDIR /app
RUN npm install
EXPOSE 4000
CMD ["nodemon", "server.js"]
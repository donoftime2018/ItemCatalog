FROM node:21.1.0-alpine
COPY . ./app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
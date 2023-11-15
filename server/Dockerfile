FROM node:21.1.0-alpine
RUN mkdir -p /app
COPY . ./app
WORKDIR /app
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]
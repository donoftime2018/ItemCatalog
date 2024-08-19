FROM node:latest
RUN mkdir -p /app
COPY . ./app
WORKDIR /app
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]
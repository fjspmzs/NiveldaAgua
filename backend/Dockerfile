# backend/Dockerfile
FROM node:18
WORKDIR /App
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
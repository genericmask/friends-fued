FROM node:lts-alpine
WORKDIR /usr
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]

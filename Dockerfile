FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm config set strict-ssl false
RUN npm config set registry "https://registry.npmjs.org/"
RUN npm config set proxy http://proxy-web.micron.com:80
RUN npm config set https-proxy http://proxy-web.micron.com:80
RUN npm install
COPY . .
CMD ["npm", "start"]


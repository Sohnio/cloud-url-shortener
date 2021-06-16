FROM node:12.13.0 as base

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

CMD ["npm", "start"]
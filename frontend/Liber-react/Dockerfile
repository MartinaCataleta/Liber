FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]

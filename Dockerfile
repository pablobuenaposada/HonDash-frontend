FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY src/ /usr/share/nginx/html
COPY --from=build /app/node_modules /usr/share/nginx/html/node_modules
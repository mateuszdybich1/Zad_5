FROM node:23.11.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=${REACT_APP_API_HOST}

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
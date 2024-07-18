### BUILD STAGE ###
FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URI=http://127.0.0.1:5113/api

RUN npm run build

### RUN STAGE ###

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
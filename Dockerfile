FROM node:22-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html

# COPY --from=build /nginx.conf /etc/nginx/nginx.conf
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 6666

CMD ["nginx", "-g", "daemon off;"]

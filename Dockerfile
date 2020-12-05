FROM node:12.18.3-alpine
LABEL author="Olufisayo Bamidele"

WORKDIR /var/www
COPY . /var/www

RUN cd lls-frontend && npm install || npm run build 


WORKDIR /var/www
COPY . /var/www

RUN cd lls-backend && npm install || true

WORKDIR /var/www/lls-backend

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]

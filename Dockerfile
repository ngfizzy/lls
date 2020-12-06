FROM node:12.18.3-alpine AS frontendbuild
LABEL author="Olufisayo Bamidele"

WORKDIR /var/www
COPY . .

RUN cd lls-frontend && npm install || true && npm run build

FROM node:12.18.3-alpine
WORKDIR /var/www
COPY --from=frontendbuild /var/www /var/www

RUN cd lls-frontend && npm install || true


EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]

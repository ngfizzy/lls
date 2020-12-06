FROM node:12.20-alpine
LABEL author="Olufisayo Bamidele"

WORKDIR /var/www
COPY . .
RUN cd lls-frontend && npm install || true && npm run build

FROM node:12.20-alpine
WORKDIR /var/www
COPY --from=0 /var/www /var/www

RUN cd lls-backend && npm install || true \
&& npm uninstall bcrypt && npm install bcrypt


WORKDIR /var/www/lls-backend


EXPOSE 8080

CMD [ "npm", "start" ]
 
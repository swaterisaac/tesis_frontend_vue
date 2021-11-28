FROM node:16-alpine

WORKDIR /vue_app
RUN export NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 8080

CMD [ "npm", "run", "serve" ]

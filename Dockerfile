FROM hivesolutions/alpine_dev:latest

LABEL version="1.0"
LABEL maintainer="Hive Solutions <development@hive.pt>"

EXPOSE 8080

ENV HOST 0.0.0.0
ENV PORT 8080
ENV NODE_ENV production

ADD app.js /app/
ADD package.json /app/
ADD lib /app/lib

WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y bzip2 fontconfig nodejs
RUN apt-get install -y nodejs
RUN npm install

CMD ["/usr/bin/node", "/app/app.js"]

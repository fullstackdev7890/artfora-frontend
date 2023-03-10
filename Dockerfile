FROM node:15

WORKDIR /app

USER root

RUN apt-get update && \
    apt-get install -y nano iputils-ping nginx
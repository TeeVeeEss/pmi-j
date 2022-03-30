# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:8-alpine also works here for a smaller image
FROM node:17.8.0-bullseye-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
#ARG NODE_ENV=production
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
# 9999 for app pmi-j, 9876 for DEV, 9875 for proxy, 14265 for IRI
#ARG PORT=3000
#ENV PORT $PORT
#EXPOSE $PORT 9229 9230 9999 9876 9875 14265

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
#RUN npm i npm@latest -g
#RUN apk add --no-cache --virtual .gyp python make g++ curl libc6-compat && npm install npm@latest -g && npm i -g neon-cli
RUN apt install -y python curl git make gcc g++ openssl libssl-dev && wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add - && apt update && apt install -y libclang-dev && npm install npm@latest -g && npm i -g neon-cli
# && apk del .gyp

# install pm2 for DEV-version
#RUN npm i pm2@latest -g

# Install DEV-packages
#RUN npm install webpack webpack-cli style-loader file-loader csv-loader html-webpack-plugin clean-webpack-plugin eslint eslint-loader -g

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/node_app \
  && mkdir /opt/node_app/node_modules \
  && mkdir /opt/node_app/node_modules/.bin \
  && mkdir /opt/node_app/node_modules/@iota \
  && mkdir /opt/node_app/node_modules/@iota/client \
  && mkdir /opt/node_app/node_modules/iota-core \
  && mkdir /usr/local/lib/node_modules/@iota \
  && chown -R node:node /opt/node_app \
  && chown -R node:node /usr/local/lib/node_modules/@iota
WORKDIR /opt/node_app


# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

# Install Rust and Cargo
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable
# RUN source $HOME/.cargo/env
ENV PATH /home/node/.cargo/bin:/opt/node_app/node_modules/.bin:$PATH 
RUN env && ls /opt/node_app/node_modules/.bin && rustup install stable


#COPY package.json and snyk
COPY docker-package.json ./package.json
COPY .snyk ./

# Install DEV-packages
#RUN npm install webpack webpack-dev-server webpack-cli style-loader file-loader csv-loader html-webpack-plugin clean-webpack-plugin eslint eslint-loader --save-dev

# Fetch wallet.rs for nodejs-binding and prepare for using @iota/wallet
RUN git clone https://github.com/iotaledger/wallet.rs.git
WORKDIR /opt/node_app/wallet.rs/bindings/nodejs
RUN npm i && npm run build:neon && npm ln

# Fetch iota.rs for nodejs-binding and prepare for using @iota/client
WORKDIR /opt/node_app
RUN git clone https://github.com/iotaledger/iota.rs.git
WORKDIR /opt/node_app/iota.rs/bindings/nodejs
RUN npm i && npm run build:neon && npm ln

# Run normal install, link @iota/client first
WORKDIR /opt/node_app
RUN npm ln @iota/client && npm install && npm ls
#RUN npm install --no-optional && npm cache clean --force && npm ls
#RUN npm install && npm cache clean --force && npm ls

# check every 30s to ensure this service returns HTTP 200
#HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
# WORKDIR /opt/node_app
# COPY . .

# Copy webpack config files
COPY webpack.config.cjs .eslintrc.cjs ./

# Copy env files
COPY .env pmij.env pmij.env.defaults ./

# Create webpack
# PROD:
#RUN npm run buildprod
# DEV: started with ENTRYPPOINT en CMD


# Copy pmi-j.conf 
#COPY ~/pmij.conf /home/node
#VOLUME /~/pmij.conf /home/pmij.conf 

# Entrypoint used atm...
#COPY docker-entrypoint.sh /usr/local/bin/
#ENTRYPOINT ["docker-entrypoint.sh"]
# DEV-version pm2 (docker-version), production probably node
#ENTRYPOINT ["npm"]
# PROD_entrypoint
ENTRYPOINT ["node"]


# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
# CMD used atm...
#CMD ["index.js", "-i", "http://192.168.178.12:14265", "-p", "192.168.178.22:9999"]
# DEV-version:
CMD ["run", "run-dev"]
CMD ["--trace-deprecation", "node_modules/webpack/bin/webpack.js", "serve", "--config", "webpack.config.cjs"]
# PROD-version:
#CMD ["index.js"]

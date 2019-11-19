FROM node:8-alpine

RUN apk add --update --no-cache \
                            git \
                            libzmq \
                            zeromq-dev \
                            python \
                            make \
                            g++

WORKDIR /insight

# Copy lifetioncore-node
RUN git clone --branch master --single-branch --depth 1 https://github.com/cointobanks/lifetioncore-node.git .

# Copy config file
COPY lifetioncore-node.json .

ARG VERSION

# Install npm packages
RUN npm ci

# Install Insight API module
RUN bin/lifetioncore-node install lifetioncore-api@${VERSION}

FROM node:8-alpine

LABEL maintainer="LifetionCoin Developers <support@cointobanks.com>"
LABEL description="Dockerised Insight API"

WORKDIR /insight

# Copy project files
COPY --from=0 /insight/ .

EXPOSE 3001

CMD ["bin/lifetioncore-node", "start"]

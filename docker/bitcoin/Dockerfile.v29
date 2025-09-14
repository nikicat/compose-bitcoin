FROM alpine AS builder

RUN apk add --no-cache \
        git \
	cmake \
        boost-dev \
        sqlite-dev \
        build-base \
        chrpath \
        file \
        libevent-dev \
        libressl \
        libtool \
        linux-headers \
        zeromq-dev

ARG GIT_URL
ARG GIT_BRANCH

WORKDIR /src
RUN git clone -b "${GIT_BRANCH:-main}" --depth=1 "${GIT_URL:-https://github.com/bitcoin/bitcoin.git}"

WORKDIR /src/bitcoin
RUN cmake -B build -LH
ARG NJOBS
RUN cmake -B build -DENABLE_WALLET=OFF && cmake --build build -j ${NJOBS}

FROM alpine

RUN apk add --no-cache \
        libevent \
        libsodium \
        libstdc++ \
        libzmq \
        sqlite-libs

COPY  --from=builder /src/bitcoin/build/bin/bitcoin* /usr/local/bin/

CMD ["bitcoind"]

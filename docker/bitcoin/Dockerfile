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
        capnproto-dev \
        zeromq-dev

ARG GIT_URL
ARG GIT_BRANCH

WORKDIR /src
RUN git clone -b "${GIT_BRANCH:-main}" --depth=1 "${GIT_URL:-https://github.com/bitcoin/bitcoin.git}"

WORKDIR /src/bitcoin
COPY patches /patches
RUN find /patches -type f -print0 | xargs -t -0 -n1 patch -p1
RUN --mount=type=cache,target=/src/bitcoin/build cmake -B build -LH
ARG NJOBS
RUN --mount=type=cache,target=/src/bitcoin/build \
  cmake -B build -DENABLE_WALLET=OFF && \
  cmake --build build -j ${NJOBS} && \
  cp -a /src/bitcoin/build/bin /out

FROM alpine

RUN apk add --no-cache \
        libevent \
        libsodium \
        libstdc++ \
        libzmq \
        sqlite-libs

COPY --from=builder /out/bitcoin* /usr/local/bin/

CMD ["bitcoind"]

FROM alpine AS builder

RUN apk add --no-cache \
        git \
        autoconf \
        automake \
        boost-dev \
        sqlite-dev \
        build-base \
        chrpath \
        file \
        libevent-dev \
        libressl \
        libtool \
        linux-headers \
        zeromq-dev \
	libnatpmp-dev \
	miniupnpc-dev

# Fix for alpine libnatpmp-dev package bug
COPY ./natpmp_declspec.h /usr/include/

ARG GIT_URL
ARG GIT_BRANCH

WORKDIR /src
RUN git clone -b "${GIT_BRANCH:-main}" --depth=1 "${GIT_URL:-https://github.com/bitcoin/bitcoin.git}"

WORKDIR /src/bitcoin
RUN ./autogen.sh

RUN ./configure \
    CXXFLAGS="-O2" \
    --prefix="/app" \
    --disable-man \
    --disable-shared \
    --disable-ccache \
    --disable-tests \
    --disable-bench \
    --disable-gui-tests \
    --disable-fuzz-binary \
    --enable-static \
    --enable-reduce-exports \
    --enable-util-cli \
    --enable-util-tx \
    --enable-util-wallet \
    --enable-util-util \
    --enable-year2038 \
    --without-gui \
    --without-libs \
    --without-bdb \
    --with-utils \
    --with-sqlite=yes \
    --with-daemon \
    --with-miniupnpc \
    --with-upnp \
    --with-natpmp

ARG NJOBS
RUN make -j "${NJOBS}"
RUN make install

FROM alpine

RUN apk add --no-cache \
        libevent \
        libsodium \
        libstdc++ \
        libzmq \
        sqlite-libs \
	libnatpmp-dev \
	miniupnpc-dev

COPY  --from=builder /app/bin/bitcoin* /usr/local/bin/

CMD ["bitcoind"]

ARG RUST_VERSION=latest
FROM rust:${RUST_VERSION} AS builder

RUN apt-get update && apt-get install -y clang && rm -rf /var/lib/apt/lists/*

ARG GIT_URL
ARG GIT_BRANCH
ARG GIT_TAG
ARG GIT_REV
ARG FEATURES
ARG NJOBS

WORKDIR /src
RUN cargo install --locked --git "${GIT_URL:-https://github.com/romanz/electrs.git}" ${GIT_BRANCH:+--branch $GIT_BRANCH} ${GIT_TAG:+--tag $GIT_TAG} ${GIT_REV:+--rev $GIT_REV} --bin electrs ${NJOBS:+-j $NJOBS} ${FEATURES:+--features $FEATURES} --root /app

FROM debian:trixie

COPY --from=builder /app/bin/electrs /usr/local/bin/
VOLUME /data/electrs

CMD ["electrs"]

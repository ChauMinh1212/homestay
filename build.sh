#!/bin/sh

VERSION="0.0.99"

docker build --platform linux/amd64  -t chauminh1212/sirena:${VERSION} .
docker push chauminh1212/sirena:${VERSION} 
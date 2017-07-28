#! /bin/bash

PACKAGE_NAME=$(node -p -e "require('./package.json').name")
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
FILENAME=$PACKAGE_NAME-$PACKAGE_VERSION

echo Deploying $FILENAME to GCE...

gsutil cp ./target/$FILENAME.tar.gz gs://joola-echo/$CIRCLE_PROJECT_REPONAME-$PACKAGE_VERSION-dev.tar.gz
gsutil cp ./target/$FILENAME.tar.gz gs://joola-echo/$CIRCLE_PROJECT_REPONAME-dev.tar.gz

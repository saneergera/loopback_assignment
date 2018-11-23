#!/bin/bash

set -e

timestamp=$(date +"%Y%m%d%H%M%S")

identityKeyPath="/home/ec2-user/key/lawzodev.pem" # location of api instance key in team city aws instance  

remotePath="/home/ec2-user/deployed"

function runOnRemote {
	ssh -i $identityKeyPath -o StrictHostKeyChecking=no ec2-user@ec2-dev.servzo.com $1
}

echo "zipping sources..."
zip -qq -r $timestamp.zip node_modules common helpers logs package.json server ssl-config.js

#deploy to staging area
runOnRemote "mkdir $remotePath/staging"
scp -i $identityKeyPath $timestamp.zip ec2-user@ec2-dev.servzo.com:$remotePath/staging/

runOnRemote "rm -rf $remotePath/previous"

runOnRemote "forever stopall"

#backup current build
runOnRemote "mv $remotePath/current $remotePath/previous"

#move staged build to current
runOnRemote "mv $remotePath/staging $remotePath/current"

echo "unzipping sources..."
runOnRemote "unzip -qq $remotePath/current/$timestamp.zip -d $remotePath/current/$timestamp"

runOnRemote "cd $remotePath/current/$timestamp; forever start server/server.js"

rm -rf $timestamp.zip

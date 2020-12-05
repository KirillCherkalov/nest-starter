#!/bin/bash
sudo apt-get update 
sudo apt-get upgrade -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
npm -v
npm install pm2@latest -g
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
sudo apt-get install jq -y

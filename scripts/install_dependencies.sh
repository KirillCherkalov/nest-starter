#!/bin/bash
sudo apt-get update 
sudo apt-get upgrade -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
npm -v
npm install pm2@latest -g

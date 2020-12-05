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


environmentVariables=$(aws ssm get-parameters-by-path --path /nest-server/development --query "Parameters[*].{Name:Name,Value:Value}")

#remove temp file for storing json if it exist
[ -e env.json ] && rm env.json

echo $environmentVariables >> env.json

jq -c '.[]' env.json | while read i; do
    varName=$(echo $i | jq -r '.Name')
    varName=${varName##*/}  # retain the part after the last slash

    varValue=$(echo $i | jq -r '.Value')
    
    echo $varName
    echo $varValue

    echo $varName=$varValue>> /var/www/nest-starter/dist/src/.env
done

rm env.json

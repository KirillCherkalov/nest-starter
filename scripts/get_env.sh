#!/bin/bash

environmentVariables=$(aws ssm get-parameters-by-path --path /nest-server/development --with-decryption --query "Parameters[*].{Name:Name,Value:Value}")

#remove temp file for storing json if it exist
[ -e env.json ] && rm env.json

echo $environmentVariables >> env.json

jq -c '.[]' env.json | while read i; do
    varName=$(echo $i | jq -r '.Name')
    varValue=$(echo $i | jq -r '.Value')
    varName=${varName##*/}  # retain the part after the last slash

    echo $varName=$varValue >> /var/www/nest-starter/dist/src/.env
done

rm env.json

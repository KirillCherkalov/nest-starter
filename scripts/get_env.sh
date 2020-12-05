#!/bin/bash

environmentVariables=$(aws ssm get-parameters-by-path --path /nest-server/development --with-decryption --query "Parameters[*].{Name:Name,Value:Value}")

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

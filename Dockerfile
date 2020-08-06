FROM node:12.16-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY . .

CMD ["node", "dist/src/main.js"]

FROM node:20-alpine

WORKDIR /usr/app

COPY package.json  ./

RUN yarn --verbose

RUN sudo apt install postgresql

RUN chmod +x /usr/local/bin/check-database-status.sh 

RUN yarn check-db

COPY . .

CMD [ "yarn", "start" ]
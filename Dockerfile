FROM node:20-alpine

WORKDIR /usr/app

COPY package.json  ./

RUN yarn --verbose

RUN apk update && apk add postgresql

COPY . .

RUN chmod +x check-database-status.sh 

ENTRYPOINT [ "./check-database-status.sh" ]

CMD [ "yarn", "run","start" ]
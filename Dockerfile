FROM node


WORKDIR /usr/app

COPY package.json  ./

RUN npm install

RUN sudo apt install postgresql

RUN chmod +x /usr/local/bin/check-database-status.sh 

RUN npm run check-db

COPY . .

CMD [ "npm", "run", "start" ]
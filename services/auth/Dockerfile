FROM node:alpine 

WORKDIR /app 

COPY package*.json .

RUN npm install --only-production

COPY . . 

RUN npm install -g ts-node

RUN npm install -g nodemon

CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/index.ts"]

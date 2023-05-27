FROM node:16-alpine AS build

WORKDIR /app/services/auth 

COPY ./package.json /app/services/auth/

RUN npm install --only-production

COPY . . 

RUN npm run build

# prod

FROM node:16-alpine

WORKDIR /app/services/auth 

COPY ./package.json /app/services/auth/

RUN npm install --only-production

COPY --from=build /app/services/auth .

EXPOSE 8000

CMD ["npm", "run", "start"]

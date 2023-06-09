FROM node:16-alpine AS build

WORKDIR /app/backend

COPY ./package.json /app/backend/

RUN npm install --only-production

COPY . . 

RUN npm run build

# prod

FROM node:16-alpine

WORKDIR /app/backend 

COPY ./package.json /app/backend/

RUN npm install --only-production

COPY --from=build /app/backend .

EXPOSE 8000

CMD ["npm", "run", "start"]

FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn --only=prod

COPY ./ ./

ENV PORT=8080

EXPOSE 8080

# start app
CMD ["yarn", "dev"]

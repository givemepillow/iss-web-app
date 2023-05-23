FROM node:18.13-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .
RUN npm install
CMD ["npm", "run", "build"]

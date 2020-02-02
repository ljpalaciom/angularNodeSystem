FROM node:slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --no-optional && npm cache clean --force

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start" ]

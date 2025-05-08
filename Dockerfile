FROM node:22

RUN npm install -g meteor

WORKDIR /usr/src/app

COPY . .

RUN meteor npm install

EXPOSE 3000

CMD ["meteor"]
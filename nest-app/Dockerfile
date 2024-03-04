FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

COPY migrate.sh /usr/src/app/migrate.sh
RUN chmod +x /usr/src/app/migrate.sh

EXPOSE 8000

CMD ["./migrate.sh"]

CMD ["node", "dist/main"]
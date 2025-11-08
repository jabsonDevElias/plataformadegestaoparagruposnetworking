
FROM node:20

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./

RUN npm install
RUN npm install -g nodemon  # Instala o nodemon globalmente

COPY ./backend ./

EXPOSE 5000

CMD ["nodemon", "src/server.js"]

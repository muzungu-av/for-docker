# Используем базовый образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию в /app
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json .
COPY yarn.lock .

# Устанавливаем зависимости
RUN yarn install

# Копируем остальной код
COPY . .

# Указываем порт, который будет прослушивать Express.js
EXPOSE 8080

# Команда для запуска сервера
CMD ["node", "server.js"]

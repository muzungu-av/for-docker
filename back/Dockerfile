# Используем базовый образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию в /app
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json .
COPY yarn.lock .

# Устанавливаем зависимости
RUN yarn install

# Копируем остальной код
COPY . .

# Указываем порт, который будет прослушивать сервер
EXPOSE 3000

# Команда для запуска сервера
CMD ["node", "server.js"]

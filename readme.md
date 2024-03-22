# DOCKER

docker build -t front .

## docker run: Запуск контейнера

Флаги:
       -d - Запустить контейнер в фоновом режиме.
       -p - Проброс портов.
       -v - Проброс томов.

docker run -d -p 8080:8080 --name front_container front

## docker ps: Показать запущенные контейнеры

Флаги:
     -a - Показать все контейнеры, включая остановленные.
Пример:

   docker ps

## docker stop: Остановить контейнер

Пример:

   docker stop <container_id>

## docker start: Запустить остановленный контейнер

    docker start <container_id>

## docker restart: Перезапустить контейнер

Пример:

    docker restart <container_id>

## vdocker pull: Загрузить образ из репозитория Docker Hub

Пример:

    docker pull nginx

## docker images: Показать список загруженных образов

Пример:

    docker images

## docker rm: Удалить контейнер

    Флаги:
        -f - Принудительно удалить контейнер.
Пример:

    docker rm <container_id>
    docker rm -f <container_id>  - удаляет даже запущеный

## docker rmi: Удалить образ

    Флаги:
        -f - Принудительно удалить образ.
Пример:

    docker rmi <image_id>

## docker exec: Запустить команду внутри контейнера

Использование -it в команде docker exec позволяет нам войти в контейнер и взаимодействовать с его командной строкой в интерактивном режиме через терминал.

Пример:

docker exec -it <container_id> bash

## DOCKERFILE

### FROM

FROM: Указывает базовый образ, который будет использоваться в качестве основы для создания нового образа.

FROM ubuntu:latest

### RUN: Выполняет команды внутри образа во время его СБОРКИ

RUN apt-get update && apt-get install -y nginx

### COPY: Копирует файлы или директории из хост-системы в файловую систему образа

COPY ./app /app

### ADD: Аналогично COPY, но позволяет копировать файлы и скачивать URL

ADD http://example.com/file.tar.gz /path/in/container/

### WORKDIR: Устанавливает рабочую директорию для последующих инструкций

WORKDIR /app

### CMD: Устанавливает команду, которая будет выполняться по умолчанию при ЗАПУСКЕ контейнера

Если в Dockerfile присутствует несколько инструкций CMD, будет использована только последняя.

CMD ["node", "server.js"]

### EXPOSE: Объявляет порт, который контейнер будет слушать во время его выполнения

EXPOSE 80

### ENV: Устанавливает переменные среды

ENV NODE_ENV production

### ENTRYPOINT: Устанавливает точку входа для контейнера, определяющую исполняемую команду

несколько инструкций ENTRYPOINT, все будут выполнены последовательно.

ENTRYPOINT ["nginx", "-g", "daemon off;"]

### CMD or ENTRYPOINT

CMD подходит для определения команды, которая должна быть выполнена по умолчанию
при запуске контейнера, но при этом она может быть переопределена при запуске контейнера
с использованием дополнительных аргументов командной строки

ENTRYPOINT подходит, когда вы хотите определить фиксированную основную команду для выполнения,
которая должна быть запущена при запуске контейнера, и при этом добавлять или изменять
только дополнительные аргументы, когда запускаете контейнер


## DOCKER-COMPOSER

Основные понятия структуры файла docker-compose.yml:

    services (сервисы): Определяет сервисы, которые составляют ваше приложение. Каждый сервис описывается как отдельный блок с настройками.

    image (образ): Указывает Docker образ, который должен быть использован для создания контейнера для данного сервиса.

    ports (порты): Определяет порты, которые должны быть открыты на контейнере и перенаправлены на хост-систему.

    volumes (тома): Позволяет монтировать тома из хост-системы в контейнер, что позволяет сохранять данные даже после остановки контейнера.

    environment (переменные окружения): Позволяет задавать переменные окружения для контейнера.

    depends_on (зависимости): Определяет зависимости между сервисами, указывая, что один сервис зависит от другого.

Пример простого docker-compose файла

version: "3.9"

services:
  mongodb:
    container_name: mongodb
    image: paint-mongo
    restart: unless-stopped
    ports:
      - 27017:27017
    build:
      context: .
      dockerfile: ./mongo/Dockerfile
    volumes:
      - paint_mongo_data:/var/lib/mongodb
      - ./mongo/mongod_log:/var/log/mongodb/
    command: mongod --logpath /var/log/mongodb/mongod.log --config /etc/mongod.conf --keyFile /var/lib/mongodb/mongodb-keyfile
    networks:
      pic_network:
        ipv4_address: 172.18.0.103

  paint-front:
    image: paint-front-img
    container_name: "paint-front"
    restart: unless-stopped
    depends_on:
      - mongodb
      - paint-back-api
    env_file:
      - ./frontend/.env.$ENVIRONMENT
    ports:
      - 8080:8080
    build:
      context: .
      dockerfile: ./frontend/Dockerfile
    networks:
      pic_network:
        ipv4_address: 172.18.0.101

## команды COMPOSER

docker-compose up: Запускает приложение на основе файла docker-compose.yml. Если файла нет, Docker Compose создаст контейнеры на основе указанных образов.

Флаги:
       -d - Запустить контейнер в фоновом режиме.
       -f - указать расположение yml-файла
       --build принудительная пересборка образов (исх код)

Пример:

 docker compose up -d

 docker compose -f docker-compose-prod.yml up -d --build

docker-compose down: Останавливает и удаляет контейнеры, созданные с помощью docker-compose up.

docker-compose build: Пересобирает образы сервисов. Используется, когда внесены изменения в Dockerfile или другие файлы, влияющие на образы.

docker-compose restart: Перезапускает сервисы.

docker-compose logs: Показывает логи всех сервисов.

docker-compose exec: Позволяет выполнить команду внутри контейнера, например:

ПРИМЕР

docker-compose exec front bash  - front  это имя сервиса

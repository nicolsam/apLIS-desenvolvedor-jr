FROM php:8.3-fpm

RUN apt-get update && apt-get install -y git unzip libzip-dev && rm -rf /var/lib/apt/list/*

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY composer.json ./
RUN composer install --no-interaction

COPY config config
COPY src src
COPY public public
COPY tests tests
COPY phpunit.xml .

EXPOSE 9000

CMD ["php-fpm"]
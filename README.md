<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Prerequisites

You need composer (>=2) and php (>=8.1)

# Installation

## Vendor installation :

```bash
composer install
```

## nodes_modules installation :

```bash
npm install
npm run build
```

# Configuration :

## Integrate .env file

```bash
cp .env.example .env
```

## Configure .env file

Configure the .env file to be able to connect to the database

Ex:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cofina_cof_credit
DB_USERNAME=cofina_cof_credit_user
DB_PASSWORD=root
```

## Application key generation

Generate laravel application key

```bash
php artisan key:generate
```

# Migrations and seed:

```bash
php artisan migrate --seed
```

# Lauch

```bash
php artisan serve
```

Your application is now available on http://localhost:8000

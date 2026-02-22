# cosycreator.online

WordPress site running on Docker with Traefik reverse proxy, MySQL 8, and phpMyAdmin.

## Stack

- **WordPress** 6.7.1 on Docker
- **MySQL** 8.4
- **phpMyAdmin** for database management
- **Traefik v2** for SSL termination and routing
- **Let's Encrypt** for automatic HTTPS

## Setup

### 1. Prerequisites

- Docker and Docker Compose installed
- Traefik running with the `web` network: `docker network create web`
- Domain pointing to your server

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
WORDPRESS_DOMAIN=yourdomain.com
MYSQL_ROOT_PASSWORD=secure_root_password
MYSQL_USER=wordpress
MYSQL_PASSWORD=secure_password
MYSQL_DATABASE=wordpress
```

### 3. Start

```bash
docker compose up -d
```

WordPress will be available at `https://yourdomain.com`.
phpMyAdmin at `https://phpmyadmin.yourdomain.com`.

## wp-content

The `wp-content/` directory (themes, plugins, uploads) is gitignored. Manage via the WordPress admin or deploy separately.

## Roadmap

This site is planned for migration to **Drupal**. The Docker infrastructure pattern will carry over - the Traefik labels and compose structure remain the same, with the application layer replaced by a Composer-managed Drupal project.

See [drupal.madsnorgaard.net](https://github.com/madsnorgaard/drupal.madsnorgaard.net) for the target architecture.

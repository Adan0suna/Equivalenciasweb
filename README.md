# Catálogo Técnico Victorino

Sistema web de catálogo técnico de refacciones, verificación física en almacén y portal de autofacturación (CFDI 4.0) para Refacciones Victorino.

Proyecto de estadía profesional · Ingeniería en Software · UPD 2026.

## Estructura

```
backend/            API REST en Laravel
frontend-interno/   React + Vite + Tailwind (mostrador, almacén, catálogo, administración)
frontend-portal/    React + Vite + Tailwind (portal de autofacturación)
etl/                Scripts de Python/Pandas para limpiar catálogos
docs/               ERS, diseño y evidencias
```

## Requisitos

- PHP 8.3 o superior con `pdo_mysql`, `mbstring`, `intl`, `zip`, `bcmath`
- Composer 2
- Node.js LTS
- MySQL 8
- Git

## Instalación

**1. Base de datos**, propia del sistema y separada de la del POS:

```sql
CREATE DATABASE catalogo_victorino CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**2. Backend**

```bash
cd backend
composer install
cp .env.example .env        # en Windows: copy
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve           # http://localhost:8000
```

Variables principales del `.env`:

```dotenv
APP_TIMEZONE=America/Mexico_City
DB_DATABASE=catalogo_victorino
DB_USERNAME=
DB_PASSWORD=
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:5174
POS_DRIVER=simulado           # simulado | api
FACTURACION_DRIVER=simulado   # simulado | api
```

**3. Frontend interno**

```bash
cd frontend-interno
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:8000
npm run dev                 # http://localhost:5173
```

El portal se levanta igual desde `frontend-portal/`, en el puerto 5174.

## Usuarios de prueba

Los crea el seeder y solo sirven para desarrollo.

| Usuario | Rol | Sucursal |
| --- | --- | --- |
| `admin` | ADMIN | Todas |
| `catalogo` | CATALOGO | Matriz |
| `mostrador.matriz` | MOSTRADOR | Matriz |
| `almacen.factor` | ALMACEN | Factor |
| `inactivo` | MOSTRADOR | Desactivado |

Las contraseñas están en `database/seeders/UsuarioSeeder.php`.

## Pruebas

```bash
cd backend && php artisan test
cd frontend-interno && npm run lint
```

## Git

- `main`: versión estable
- `develop`: sprint en curso
- `feature/HU-xx-descripcion`: una rama por historia

Cada commit lleva el ID de su historia, por ejemplo `HU-04: login con Sanctum y roles`.

## Zona horaria

El sistema operativo, MySQL (`-06:00`) y Laravel deben estar en America/Mexico_City. Si las horas salen desfasadas, alguna de las tres capas sigue en UTC.

## Problemas comunes

- **419 CSRF token mismatch**: falta pedir `/sanctum/csrf-cookie` antes del login, o el frontend no está en `SANCTUM_STATEFUL_DOMAINS`. Después de cambiarlo, ejecuta `php artisan config:clear`.
- **`/api/me` responde 401 después del login**: el cliente no envía cookies (`withCredentials: true`), o estás mezclando `localhost` con `127.0.0.1`.
- **`could not find driver`**: activa `pdo_mysql` en `php.ini`.
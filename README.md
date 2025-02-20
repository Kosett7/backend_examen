# Backend Examen NestJS

Backend desarrollado con NestJS y PostgreSQL, dockerizado para fácil despliegue.

## Requisitos Previos

- Docker
- Docker Compose
- Node.js (para desarrollo)

## Tecnologías Utilizadas

- NestJS
- PostgreSQL
- TypeORM
- Docker

## Configuración

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd backend_examen
```

2. Crear archivo .env en la raíz del proyecto:
```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=examen_db
```

## Ejecución con Docker

1. Construir y levantar los contenedores:
```bash
docker-compose up --build
```

2. Solo levantar los contenedores:
```bash
docker-compose up
```

3. Detener los contenedores:
```bash
docker-compose down
```

## Desarrollo Local

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run start:dev
```

## Endpoints API

### Autenticación
- POST /auth/login
  - Login de usuario
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```

### Usuarios
- GET /users - Listar usuarios
- POST /users - Crear usuario
- GET /users/:id - Obtener usuario
- PATCH /users/:id - Actualizar usuario
- DELETE /users/:id - Eliminar usuario

## Imágenes Docker

Las imágenes están disponibles en Docker Hub:
- Backend: `kosett7/backend_app:latest`
- Base de datos: `postgres:15`

## Estructura del Proyecto

```
backend_examen/
├── src/
│   ├── auth/
│   ├── users/
│   ├── config/
│   └── app.module.ts
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Autor

- [Tu Nombre]

## Licencia

Este proyecto está bajo la Licencia [Nombre de la Licencia].

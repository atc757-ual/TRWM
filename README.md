# TRWM - Loc8r (Node.js + Express + MongoDB)

Aplicación web/API basada en Express, Pug y MongoDB para gestionar locations y reviews.

## Stack

- Node.js
- Express
- MongoDB + Mongoose
- Pug
- Bootstrap + Font Awesome
- Jest

## Estructura

- `app.js`: bootstrap de Express
- `bin/www`: arranque del servidor HTTP
- `app_api/`: API REST (locations/reviews)
- `app_server/`: capa server-rendered (vistas Pug + controladores)
- `public/`: assets estáticos
- `docker-compose.yml`: MongoDB local

## Requisitos

- Node.js 18+
- Docker (recomendado para MongoDB local)

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Levantar MongoDB (opción recomendada):

```bash
docker compose up -d mongodb
```

3. Arrancar la app en desarrollo:

```bash
npm run start:dev
```

La app queda en:

- http://127.0.0.1:3000

## Scripts

- `npm run start:dev` -> nodemon `./bin/www`
- `npm start` -> node `./bin/www`
- `npm test` -> jest

## Funcionalidad implementada

### Locations

- Listado de locations (home)
- Crear location desde formulario (`/location/new`)
- Editar location desde listado (`/location/:locationid/edit`)
- Eliminar location desde listado
- Distancia visible en listado (fallback `N/A` si no existe)

### Reviews

- Crear review
- Editar review
- Eliminar review
- Confirmación en borrado desde UI

## API (resumen)

### Locations

- `GET /api/locations`
- `GET /api/locations/:locationid`
- `POST /api/locations`
- `PUT /api/locations/:locationid`
- `PATCH /api/locations/:locationid`
- `DELETE /api/locations/:locationid`

### Reviews

- `GET /api/locations/:locationid/reviews/:reviewid`
- `POST /api/locations/:locationid/reviews`
- `PUT /api/locations/:locationid/reviews/:reviewid`
- `PATCH /api/locations/:locationid/reviews/:reviewid`
- `DELETE /api/locations/:locationid/reviews/:reviewid`

## Notas útiles

- Si aparece `Port 3000 is already in use`, cierra el proceso que ocupa el puerto o usa otro `PORT`.
- Si MongoDB no está activo, la app no podrá conectar y fallará al iniciar.

## Estado actual

- CRUD de reviews desde UI integrado.
- CRUD de locations desde UI integrado.
- Rating visual calculado en base a reviews para reflejar mejor la puntuación mostrada.

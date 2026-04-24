# 🚩 TRWM - Loc8r

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/tests-Jest-blue)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Aplicación web/API para gestionar **locations** y **reviews** usando Node.js, Express, MongoDB, Pug y Bootstrap.

---

## 📦 Stack Tecnológico

- **Back-end:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Base de datos:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Front-end:** [Pug](https://pugjs.org/), [Bootstrap](https://getbootstrap.com/), [Font Awesome](https://fontawesome.com/)
- **Testing:** [Jest](https://jestjs.io/)

<br>

## 📁 Estructura del Proyecto

| Carpeta/Archivo         | Descripción                                                      |
|-------------------------|-------------------------------------------------------------------|
| `app.js`                | Bootstrap principal de Express                                    |
| `bin/www`               | Arranque del servidor HTTP                                        |
| `app_api/`              | API REST para locations y reviews                                 |
| `app_server/`           | Vistas Pug + controladores (renderizado del lado del servidor)    |
| `public/`               | Archivos estáticos (CSS, JS, imágenes)                            |
| `docker-compose.yml`    | MongoDB local vía Docker                                          |

<br>

## 🛠 Requisitos Previos

- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) _(opcional, recomendado para MongoDB local)_

---

## 🚀 Instalación Rápida

1. **Clona el proyecto:**

    ```bash
    git clone https://github.com/atc757-ual/TRWM.git
    cd TRWM
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Levanta MongoDB en Docker (opcional pero recomendado):**

    ```bash
    docker compose up -d mongodb
    ```

4. **Inicia la app en desarrollo:**

    ```bash
    npm run start:dev
    ```

> La aplicación estará disponible en: [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## 📜 Scripts Disponibles

| Comando              | Descripción                         |
|----------------------|-------------------------------------|
| `npm run start:dev`  | Arranca con **Nodemon** para desarrollo |
| `npm start`          | Arranque estándar (Node.js)         |
| `npm test`           | Ejecuta los tests (Jest)            |

---

## 🏗️ Funcionalidades

### Locations 🗺️

- [x] Listado general (página principal)
- [x] Crear location (`/location/new`)
- [x] Editar location (`/location/:locationid/edit`)
- [x] Eliminar location
- [x] Distancia visible en el listado (fallback a `N/A`)

### Reviews ⭐

- [x] Crear review
- [x] Editar review
- [x] Eliminar review
- [x] Confirmar antes de eliminar desde la UI
- [x] Rating visual calculado por reviews

---

## 🔌 Resumen de la API

### Endpoints de Locations

| Método  | Endpoint                             | Descripción                |
|---------|--------------------------------------|----------------------------|
| GET     | `/api/locations`                     | Lista todas las locations  |
| GET     | `/api/locations/:locationid`         | Info de una location       |
| POST    | `/api/locations`                     | Crea una location          |
| PUT     | `/api/locations/:locationid`         | Reemplaza location         |
| PATCH   | `/api/locations/:locationid`         | Edita location parcialmente|
| DELETE  | `/api/locations/:locationid`         | Elimina location           |

### Endpoints de Reviews

| Método  | Endpoint                                                | Descripción                |
|---------|--------------------------------------------------------|----------------------------|
| GET     | `/api/locations/:locationid/reviews/:reviewid`          | Info de un review          |
| POST    | `/api/locations/:locationid/reviews`                   | Crea un review             |
| PUT     | `/api/locations/:locationid/reviews/:reviewid`         | Edita review (full)        |
| PATCH   | `/api/locations/:locationid/reviews/:reviewid`         | Edita review (parcial)     |
| DELETE  | `/api/locations/:locationid/reviews/:reviewid`         | Elimina review             |

---

## ℹ️ Notas Útiles

- Si ves el mensaje `Port 3000 is already in use`, cierra el proceso ocupando el puerto o cambia la variable `PORT`.
- Si MongoDB **no** está activo, la app **no podrá conectar** y fallará al iniciar.
- Se recomienda mantener MongoDB en Docker para desarrollo local sencillo.

---

## 📈 Estado Actual

- CRUD integral de **reviews** y **locations** desde la UI integrado.
- Rating visual calculado mediante reviews.
- Proyecto listo para nuevas features, feedback y colaboraciones.

---

## 🤝 Contribuciones

Pull Requests y sugerencias son bienvenidas.

---

## 📬 Contacto

- **Autor:** atc757-ual
- **Email:** atc757@inlumine.ual.es

## 📝 Licencia

Este proyecto está publicado bajo la licencia MIT. Es gratuita, muy permisiva y permite uso comercial, distribución, modificación y uso privado.

Para más detalles, revisa el archivo [LICENSE](LICENSE).
# NØVA 2040 — Ecommerce Frontend

Tienda online de moda futurista desarrollada como proyecto Full Stack para el bootcamp de The Bridge.

## Tecnologías

- React y Vite
- JavaScript
- Redux Toolkit
- React Router
- Axios
- CSS
- Node.js y Express (backend)
- Prisma, PostgreSQL y MongoDB

## Funcionalidades

- Catálogo de productos
- Página de detalle de producto
- Registro e inicio de sesión
- Autenticación mediante cookies HTTP-only
- Rutas privadas y control de acceso por roles
- Carrito de compra
- Lista de favoritos
- Perfil de usuario
- Panel de administración
- Creación, edición y eliminación de productos (ADMIN)
- Integración con API REST

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias:

   npm install

3. Crear un archivo `.env` con:

   VITE_API_URL=http://localhost:3000

4. Iniciar el frontend:

   npm run dev

5. Abrir la dirección que muestra Vite.

## Compilación

npm run build

## Despliegue

Frontend preparado para Netlify mediante `netlify.toml`.

La variable `VITE_API_URL` debe apuntar a la URL pública del backend.

## Enlaces

**Frontend GitHub:**  
https://github.com/eluentorres/ecommerce-frontend

**Backend GitHub:**  
https://github.com/eluentorres/ecommerce-backend

**Backend publicado en Render:**  
https://nova2040-backend.onrender.com

**Frontend Netlify:**  
Pendiente de publicar.

## Estado del proyecto

Catálogo, autenticación, favoritos, carrito y panel de administración implementados.

La integración de pagos con Stripe está pendiente de completar y verificar.

## Autor

Proyecto desarrollado para el bootcamp Full Stack de The Bridge.

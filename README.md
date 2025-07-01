# CreaTuLanding1DiFabio

Aplicación web construida con React, TypeScript y Vite para la gestión de productos, carrito de compras y contacto vía WhatsApp o Email. Utiliza Firebase como backend y permite la personalización de variables de entorno para su correcto funcionamiento.

## Requisitos previos

- Node.js >= 16.x
- npm >= 8.x

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repo>
cd CreaTuLanding1DiFabio
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_WHATSAPP_PHONE=549XXXXXXXXX # Número en formato internacional, sin + ni espacios
VITE_EMAIL=micorreo@ejemplo.com
VITE_INSTAGRAM_NAME=nombreInstagram
VITE_INSTAGRAM_URL=https://www.instagram.com/tuusuario/
VITE_EXCHANGE_RATE_API_URL=https://api.exchangerate-api.com/v4/latest/USD
```

> **Nota:** Puedes obtener los valores de Firebase desde la consola de Firebase en la configuración de tu proyecto.

## Scripts disponibles

- `npm run dev`: Inicia la app en modo desarrollo con Vite.
- `npm run build`: Compila la app para producción.
- `npm run preview`: Sirve la app ya compilada para previsualización.
- `npm run lint`: Ejecuta ESLint para analizar el código.

## Uso de variables de entorno

- **Firebase**: Todas las variables `VITE_FIREBASE_*` son necesarias para inicializar la app y acceder a la base de datos y autenticación.
- **WhatsApp**: `VITE_WHATSAPP_PHONE` define el número al que se enviarán los mensajes desde el formulario de contacto y el carrito.
- **Email**: `VITE_EMAIL` es el correo de destino para el formulario de contacto.
- **Instagram**: `VITE_INSTAGRAM_NAME` y `VITE_INSTAGRAM_URL` se usan para mostrar enlaces y nombre de Instagram en la app.
- **Tipo de cambio**: `VITE_EXCHANGE_RATE_API_URL` debería ser la URL de la API para obtener el tipo de cambio USD/ARS. Actualmente, la app usa una URL fija, pero puedes modificar el servicio para usar esta variable.

## Personalización

Puedes modificar los estilos, componentes y servicios según tus necesidades en la carpeta `src/`.

## Soporte

Para dudas o problemas, abre un issue en el repositorio o contacta al autor.

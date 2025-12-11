# IFacturación - Landing Page

Esta es una landing page moderna y futurista para una plataforma de facturación electrónica impulsada por IA (IFacturación), diseñada específicamente para el mercado mexicano.

El proyecto está construido utilizando **React**, **TypeScript**, **Vite** y estilizado con **Tailwind CSS**.

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior) en tu computadora.

## Instalación

1. Clona este repositorio o descarga los archivos en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

Esto instalará `react`, `react-dom`, `lucide-react`, `vite`, y otras herramientas de desarrollo definidas en el `package.json`.

## Ejecución Local

Para iniciar el servidor de desarrollo localmente:

```bash
npm run dev
```

Una vez que el servidor arranque, verás una URL en la terminal (generalmente `http://localhost:5173/`). Abre ese enlace en tu navegador para ver la aplicación.

## Construcción para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

Los archivos generados se encontrarán en la carpeta `dist`.

## Estructura del Proyecto

*   **index.html**: Punto de entrada de la aplicación. Contiene la configuración de Tailwind CSS vía CDN.
*   **index.tsx**: Punto de entrada de React.
*   **App.tsx**: Componente principal que orquesta las secciones de la landing page.
*   **components/**: Contiene todos los componentes modulares de la interfaz (Hero, Navbar, Secciones, Elementos de UI).

## Tecnologías Utilizadas

*   **React 18**: Librería de UI.
*   **Vite**: Bundler y servidor de desarrollo rápido.
*   **TypeScript**: Tipado estático para JavaScript.
*   **Tailwind CSS**: Framework de utilidades CSS (Configurado vía CDN para prototipado rápido y animaciones personalizadas).
*   **Lucide React**: Librería de iconos.

## Características Principales

*   **Diseño Responsivo**: Adaptado a móviles y escritorio.
*   **Animaciones**: Uso de animaciones CSS personalizadas (float, pulse) y efectos de Parallax.
*   **Interactividad**: Menú móvil, pestañas de validación, efectos hover.
*   **Estética Dark Mode**: Tema oscuro profesional con acentos en naranja y azul tecnológico.

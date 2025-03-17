<<<<<<< HEAD
# BlockChain - Plataforma de Cursos Interactivos

Plataforma educativa para aprendizaje estructurado con seguimiento de progreso y contenido interactivo.

## ✨ Características Principales

- Reproductor de video con controles interactivos
- Sistema de seguimiento de progreso
- Navegación por módulos en acordeón
- Sincronización con localStorage
- Diseño responsive y accesible

## 🚀 Demo

Accede a la versión en vivo:  
[https://test-fronted-dev.vercel.app/](https://test-fronted-dev.vercel.app/)

## 🛠 Instalación

1. Clonar repositorio:

```bash
git clone https://github.com/tu-usuario/learnpath.git
```
=======
# API para Gestión de Módulos de Cursos
## Realiza un fork de este repositorio y al culminar presenta un Pull request, si tienes alguna duda o consulta puedes enviarla por medio de un draft

Este es un API RESTful que proporciona información sobre módulos de cursos y sus clases asociadas. El API también utiliza **JWT** para proteger rutas sensibles.

La API está desplegada y disponible en la siguiente URL:

**[https://test-frontend-dev.onrender.com](https://test-frontend-dev.onrender.com)**

## Endpoints

## La primera parte de la prueba consiste en crear un Login basico que permita obtener un JWT:

1. **Login para obtener JWT**
**Método**: `POST`  
**URL**: `/login`

Este endpoint permite autenticar al usuario y obtener un **JSON Web Token (JWT)** que debe incluirse en las cabeceras de las solicitudes siguientes para acceder a las rutas protegidas.

#### Request Body (JSON):

*json*
```
{
  "username": "usuario",
  "password": "contraseña"
}
```

*Response*
```
{
  "access_token": "your_jwt_token_here"
}
```

con este token podrás acceder al siguiente endpoint:
**[https://test-frontend-dev.onrender.com/api/modulos](https://test-frontend-dev.onrender.com/api/modulos)**

no olvides hacer uso de tu token: 
```
  headers: {
    'Authorization': 'Bearer your_jwt_token_here'
  }
```
donde obtendras una respuesta como esta: 

```
[
  {
    "titulo": "Módulo 1: Introducción al Desarrollo Web",
    "descripcion": "Este módulo cubre los fundamentos del desarrollo web, desde HTML hasta CSS.",
    "clases": [
      {
        "titulo": "Introducción a HTML",
        "video": "https://www.example.com/video_html.mp4",
        "descripcion": "Aprende los fundamentos de HTML.",
        "duracion": "30 minutos",
        "completado": false
      },
      {
        "titulo": "CSS Básico",
        "video": "https://www.example.com/video_css.mp4",
        "descripcion": "Introducción al diseño web con CSS.",
        "duracion": "45 minutos",
        "completado": true
      }
    ]
  }
]
```

## La segunda parte del Test consiste en mostrar los datos de un curso.

Puedes utilizar Js Vanilla, React o Next para consumir dicha API; en cuanto a tecnolgías derivadas de CSS tienes libre eleccion. 
Usa como referencia el siguiente ejemplo; finalmente tienes libertad de diseño.
![Referencia de diseño](ref/diseño.png)
Puntos a valorar:
  - Conocimientos en diseño responsivo
  - Conocimientos en UI/UX
  - Calidad de código
  - Rendimiento de componentes

## La ultima parte del test consiste en hacer un deploy en el host que más se acomode a tus conocimientos al hacer el pull request, adjunta el link de tu test
  
*Esta prueba busca evaluar el expertise del postulante; no necesitas presentarlo en tiempo record. Rindelo con traquilidad y disfruta del Test*
>>>>>>> upstream/main

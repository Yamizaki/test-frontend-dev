from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Configuración de JWT
app.config["JWT_SECRET_KEY"] = (
    "mi_clave_secreta"  # Cambia esta clave por una más segura
)
jwt = JWTManager(app)

# Datos de ejemplo para la API
modulos_data = [
    {
        "titulo": "Módulo 1: Introducción al Desarrollo Web",
        "descripcion": "Este módulo cubre los fundamentos del desarrollo web, desde HTML hasta CSS.",
        "clases": [
            {
                "titulo": "Introducción a HTML",
                "video": "https://www.youtube.com/watch?v=qTol0C1Vy6Y",
                "descripcion": "Aprende los fundamentos de HTML.",
                "duracion": "30 minutos",
                "completado": True,
            },
            {
                "titulo": "CSS Básico",
                "video": "https://www.youtube.com/watch?v=0t-kuWmBcM4",
                "descripcion": "Introducción al diseño web con CSS.",
                "duracion": "45 minutos",
                "completado": True,
            },
        ],
    },
    {
        "titulo": "Módulo 2: JavaScript para Principiantes",
        "descripcion": "Este módulo te introduce al mundo de JavaScript y la programación web interactiva.",
        "clases": [
            {
                "titulo": "Sintaxis Básica de JavaScript",
                "video": "https://www.youtube.com/watch?v=Op5LkZiAn2E",
                "descripcion": "Aprende las bases de la sintaxis de JavaScript.",
                "duracion": "1 hora",
                "completado": False,
            },
            {
                "titulo": "Manipulación del DOM",
                "video": "https://www.youtube.com/watch?v=i8yxx6V9UdM",
                "descripcion": "Cómo interactuar con el DOM utilizando JavaScript.",
                "duracion": "1 hora",
                "completado": True,
            },
        ],
    },
    {
        "titulo": "Módulo 3: Frameworks de JavaScript",
        "descripcion": "Este módulo cubre los fundamentos de los frameworks más populares de JavaScript como React y Vue.",
        "clases": [
            {
                "titulo": "Introducción a React",
                "video": "https://www.youtube.com/watch?v=Op5LkZiAn2E",
                "descripcion": "Aprende los fundamentos de React, un framework para desarrollar aplicaciones web interactivas.",
                "duracion": "1 hora",
                "completado": False,
            },
            {
                "titulo": "Introducción a Vue",
                "video": "https://www.youtube.com/watch?v=i8yxx6V9UdM",
                "descripcion": "Conoce Vue.js, un framework progresivo para construir interfaces de usuario.",
                "duracion": "1 hora",
                "completado": False,
            },
        ],
    },
]


# Ruta para login y obtener el JWT
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if username != "usuario" or password != "contraseña":
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    access_token = create_access_token(
        identity=username, expires_delta=datetime.timedelta(hours=1)
    )
    return jsonify(access_token=access_token)


# Ruta protegida por JWT para obtener los módulos y clases
@app.route("/api/modulos", methods=["GET"])
@jwt_required()  # Requiere un JWT válido
def obtener_modulos():
    return jsonify(modulos_data)


if __name__ == "__main__":
    app.run(debug=True)

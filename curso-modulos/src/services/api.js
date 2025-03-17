import axios from "axios";

const API_URL = "https://test-frontend-dev.onrender.com";

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener módulos (requiere token)
export const getModulos = async (token) => {
  try {
    const response = await api.get("/api/modulos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

export async function fetchModules(token) {
  try {
    const response = await fetch(
      "https://test-frontend-dev.onrender.com/api/modulos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error("Error al obtener módulos:", error);
    throw error;
  }
}
export const getToken = async (body) => {
  try {
    const response = await fetch('api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Usuario o contraseña incorrecta");
    }
    const token = await response.json();
    return token.access_token;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};
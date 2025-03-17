export const fetchModules = async (token) => {
  const response = await fetch("https://test-frontend-dev.onrender.com/api/modulos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los módulos");
  }

  const data = await response.json();
  return data;
};

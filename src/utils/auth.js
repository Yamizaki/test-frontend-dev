export const login = async () => {
  const response = await fetch("https://test-frontend-dev.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "usuario",
      password: "contraseña",
    }),
  });

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  const data = await response.json();
  return data.access_token;
};

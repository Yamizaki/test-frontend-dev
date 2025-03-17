import { setCookie, getCookie, deleteCookie } from "cookies-next";

// Duración de la cookie de token - 1 hora en segundos
const TOKEN_DURATION = 60 * 60;

export const setAuthToken = (token) => {
  // Guardar token en cookie
  setCookie("auth_token", token, {
    maxAge: TOKEN_DURATION,
    path: "/",
  });
};

export const getAuthToken = () => {
  return getCookie("auth_token");
};

export const removeAuthToken = () => {
  deleteCookie("auth_token");
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

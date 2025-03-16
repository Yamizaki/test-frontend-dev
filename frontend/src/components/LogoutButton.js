"use client";
import { LogOutSvg } from "./ui/LogOutSvg";
import Cookies from "js-cookie";
const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload();
  };
  return (
    <button onClick={handleLogout} aria-label="Cerrar Sesión" className="fixed top-0 right-0 z-40 mx-4 my-3">
      <LogOutSvg className="size-6 stroke-white cursor-pointer" />
    </button>
  );
};
export default LogoutButton
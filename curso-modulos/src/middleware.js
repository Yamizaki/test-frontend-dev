import { NextResponse } from "next/server";

export function middleware(request) {
  // Obtener la cookie de autenticación
  const token = request.cookies.get("auth_token")?.value;

  // Obtener la ruta actual
  const { pathname } = request.nextUrl;

  // Si el usuario está en la página de login pero ya tiene token, redirigir a home
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si el usuario trata de acceder a cualquier ruta protegida sin token, redirigir a login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permitir la solicitud para continuar
  return NextResponse.next();
}

// Configurar rutas donde se aplica el middleware
export const config = {
  // Aplicar a todas las rutas excepto a archivos estáticos, favicon, etc.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

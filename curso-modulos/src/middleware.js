import { NextResponse } from "next/server";
import { getAuthToken } from "@/utils/auth";

// Configuración para determinar qué rutas procesará este middleware
export const config = {
  matcher: [
    /*
     * Excluir las siguientes rutas:
     * - Archivos en /_next (recursos estáticos de Next.js)
     * - /_next/static (recursos estáticos generados)
     * - /_next/image (optimización de imágenes de Next.js)
     * - /favicon.ico (favicon)
     * - /api (API routes se gestionan diferente, y tienen su propia lógica)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};

/**
 * Middleware de Next.js para gestionar autenticación y configurar caché
 * @param {Request} request - La solicitud entrante
 * @returns {NextResponse} - La respuesta modificada
 */
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
  const response = NextResponse.next();

  // Añadir headers específicos de caché según la ruta

  // Para recursos estáticos que raramente cambian (imágenes, etc.)
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js)$/)) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Para recursos de interfaz de usuario compartidos
  if (pathname.match(/\/(components|layouts|modules)/)) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    return response;
  }

  // Para datos personalizados del usuario
  if (pathname.match(/\/(dashboard|profile|settings)/)) {
    // Datos personalizados del usuario nunca deben ser cacheados por CDNs
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  // Para páginas HTML (estrategia adaptativa)
  // - no cachear en el navegador
  // - permitir caché en CDN por 60 segundos
  // - permitir servir contenido obsoleto por 5 minutos mientras se revalida
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );

  // Headers de seguridad básicos
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Detectar dispositivos para optimizaciones específicas (opcional)
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );

  // Añadir hint para cargar recursos específicos según dispositivo
  if (isMobile) {
    response.headers.set("Viewport-Width", "width=device-width");
    // Opcional: Precargar recursos específicos para móvil
    // response.headers.set('Link', '</mobile-assets/styles.css>; rel=preload; as=style');
  }

  return response;
}

// src/app/api/modulos/route.js
import { NextResponse } from "next/server";

/**
 * API route para obtener módulos con configuración avanzada de caché
 */
export async function GET(request) {
  // Verificar autenticación (ajusta según tu implementación)
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // En un caso real, aquí harías fetch a tu API externa
    const data = await fetch(
      "https://test-frontend-dev.onrender.com/api/modulos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Configuración de caché avanzada
        next: {
          // Revalidar cada 10 minutos (600 segundos)
          revalidate: 600,
          // Configurar tags para invalidación selectiva
          tags: ["modulos"],
        },
      }
    );

    if (!data.ok) {
      throw new Error(`Error en API externa: ${data.status}`);
    }

    const modulos = await data.json();

    // Enviar respuesta con cache-control específico
    const response = NextResponse.json(modulos);

    // Configurar headers de caché avanzados
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=86400"
    );

    return response;
  } catch (error) {
    console.error("Error al obtener módulos:", error);

    return NextResponse.json(
      { error: "Error al obtener módulos" },
      { status: 500 }
    );
  }
}

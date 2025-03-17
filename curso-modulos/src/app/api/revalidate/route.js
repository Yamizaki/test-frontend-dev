// src/app/api/revalidate/route.js
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Endpoint para invalidar manualmente la caché
 * Útil para webhooks o actualizaciones manuales
 */
export async function POST(request) {
  try {
    // Clave secreta para proteger este endpoint
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Verificar clave secreta (deberías usar variables de entorno)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener tag a invalidar del body
    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json(
        { error: "Se requiere tag para invalidar" },
        { status: 400 }
      );
    }

    // Invalidar caché para el tag especificado
    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al revalidar caché:", error);

    return NextResponse.json(
      { error: "Error al revalidar caché" },
      { status: 500 }
    );
  }
}

import { LOGIN_URL } from "@/app/constans";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // se creo un intemediario entre el BE y FE debido al error de CORS de la API
    const response = await fetch(`${LOGIN_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor", error }, { status: 500 });
  }
}

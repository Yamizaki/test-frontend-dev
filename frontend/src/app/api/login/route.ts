import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "";
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (username !== "usuario" || password !== "contraseña") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 401 });
    }
    const token = jwt.sign({ sub: username }, SECRET_KEY, { expiresIn: "1h" });
    const response = NextResponse.json({ access_token: token });
    response.cookies.set("access_token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}

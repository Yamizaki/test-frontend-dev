import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (!username || !password) {
    return redirect(302, "/login");
  }

  try {
    const response = await fetch("https://test-frontend-dev.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const returnedData = await response.json();

    if (!response.ok || !returnedData.access_token) {
      return redirect(302, "/login?error=invalid");
    }

    cookies.set("auth_token", returnedData.access_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });

    return redirect(302, "/");
  } catch (error) {
    console.error("Error durante el login:", error);
    return redirect(302, "/login");
  }
}

function redirect(status: number, location: string): Response {
  return new Response(null, {
    status: status,
    headers: {
      Location: location
    }
  });
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://test-frontend-dev.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "usuario", password: "contraseña" }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      router.push("/modules");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0F172A] text-white font-sans">
      <div className="bg-[#1E293B] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Usuario:</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-[#2D3748] border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Contraseña:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-[#2D3748] border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-2 p-2 bg-red-800 rounded-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-6 rounded-md transition-colors font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

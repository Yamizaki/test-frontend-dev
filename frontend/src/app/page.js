"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
        <Link href="/login" className="text-blue-600 underline">
          Ir a Login
        </Link>
      </div>
    </main>
  );
}

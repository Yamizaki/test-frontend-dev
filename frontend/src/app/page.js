"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0F172A] text-white font-sans">
      <div className="text-center p-8 rounded-lg shadow-lg bg-[#1E293B]">
        <h1 className="text-4xl font-bold mb-6">Bienvenido</h1>
        <Link
          href="/login"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-md text-lg transition-colors"
        >
          Ir a Login
        </Link>
      </div>
    </main>
  );
}

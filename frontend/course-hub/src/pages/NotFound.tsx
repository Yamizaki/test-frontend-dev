import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <main className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-screen">
            <picture>
                <img className="w-96" src="/webp/not-found/not-found.webp" alt="404" />
            </picture>
            <h1 className="text-3xl md:text-4xl text-center mt-10 mb-6">Lo lamentamos, esta pagina no existe</h1>
            <Button className="bg-emerald-700 hover:bg-emerald-800 font-semibold" asChild>
                <Link to="/home">Volver a un lugar seguro</Link>
            </Button>
        </div>
    </main>
  )
}

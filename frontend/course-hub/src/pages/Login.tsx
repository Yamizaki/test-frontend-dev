import { CarouselLogin } from "@/components/CarouselLogin"
import { FormLogin } from "@/components/FormLogin"

export const Login = () => {


  return (
    <main className="flex flex-col bg-m-purple-bg lg:grid lg:grid-rows-1 lg:grid-cols-2 h-screen gap-4 lg:gap-12 p-6 ">
        <CarouselLogin />
        <FormLogin />
    </main>
  )
}

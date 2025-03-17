import React from "react";
import ImageLogin from "../../../assets/login.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";
import { Button } from "../../core/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bounce, toast } from 'react-toastify';

const LoginSchema = z.object({
  username: z.string().nonempty('El campo es obligatorio'),
  password: z.string().nonempty('El campo es obligatorio'),
});

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(LoginSchema) })
  console.log(errors);

  const { setUserToken } = authStore()
  const navigate = useNavigate()


  const handleLogin = async (data) => {

    try {
      // se agrega el prefijo /api para que funcione el proxy de vite
      const response = await axios.post("/api/login", data)
      if (response.status === 200) {
        setUserToken(response.data.access_token)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }



  }

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="w-full h-full text-center">
          <img
            className="w-full h-full object-cover object-top"
            src={ImageLogin}
          />
        </div>
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label
                for="username"
                className="block text-sm font-medium text-gray-700"
              >
                usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                {...register("username")}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors && <small className="text-sm">{errors.username?.message}</small>}
            </div>


            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors && <small className="text-sm">{errors.password?.message}</small>}
            </div>
            <div>
              <Button disabled={isSubmitting} isLoading={isSubmitting}>Ingresar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

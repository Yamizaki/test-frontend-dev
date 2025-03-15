import React from "react";
import ImageLogin from "../../../assets/login.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { setUserToken } = authStore();
  const navigate = useNavigate()


  const handleLogin = async (data) => {
    console.log(data);
    try{
          // se agrega el prefijo /api para que funcione el proxy de vite
       const response = await axios.post("/api/login", data);
       if(response.status === 200){
          setUserToken(response.data.access_token);
          navigate("/");
       }
    }catch(error){
      console.log(error);
    }

   

  };

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
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

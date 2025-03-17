"use client";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button";
import { CredentialsLogin } from "@/types";
import { CredentialsLoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { useLoginStore } from "@/store/useLoginStore";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";




export const FormLogin = () => {

  const navigate = useNavigate();
  const isLogin = useLoginStore((state) => state.isLogin);
  const getToken = useLoginStore(state => state.getToken)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CredentialsLogin>({
    resolver: zodResolver(CredentialsLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  if (isLogin) {
    return <Navigate to="/home" replace />;
  }

  const onSubmit = async({username,password}: CredentialsLogin) => {
    setErrorMessage(null)
    setIsLoading(true)

    const usernameFormated = username.trim().toLowerCase();

    const success = await getToken({
      username: usernameFormated,
      password
    });

    if(!success){
      setErrorMessage("Usuario o contraseña incorrectos")
    }
    else if(success){
      navigate("/home");
    }

    setIsLoading(false)
  }


  return (
    <section className="flex flex-col  xl:w-3/4 justify-center items-start space-y-2">
        <h1 className="text-4xl text-white rounded-xl font-black py-4 px-2 inline-block">Courses Hub</h1>
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Ingresa a tu cuenta</CardTitle>
                <CardDescription>
                  <p>Olvidate tu contraseña? <span className="text-blue-600 underline cursor-pointer">Ingresa aqui</span></p>
                </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-2 md:flex gap-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({field}) =>(
                        <FormItem className="w-full md:w-1/2">
                          {/* <FormLabel>Usuario</FormLabel> */}
                          <FormControl>
                            <Input className="bg-white placeholder:text-m-purple-bg py-6 " placeholder="Ingresa tu usuario" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    > 
                    </FormField>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({field}) =>(
                        <FormItem className="w-full md:w-1/2">
                          {/* <FormLabel>Contraseña</FormLabel> */}
                          <FormControl>
                            <Input className="bg-white placeholder:text-m-purple-bg py-6 " type="password" placeholder="Ingresa tu contraseña" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    > 
                    </FormField>
                  </div>


                  <div className="pt-4 flex justify-center">
                    <Button className="cursor-pointer py-6 md:w-full bg-m-purple-bg-input-hover font-bold hover:bg-m-purple-bg">
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                  </div>

                </form>
              </Form>
              </CardContent>

        </Card>
    </section>
  )
}



'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { formLoginSchema } from '@/lib/zod/login'
import { Eye, EyeOff, Lock, User2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useLogin } from '@/hooks/auth'
import { LoginType } from '@/adapters/authAdapter'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Loader from '../loader/Loader'

const LoginForm = () => {
  const router = useRouter()
  const { mutateAsync: login, isPending: isLoading } = useLogin()
  const { setToken } = useAuthStore()

  const [viewPassword, setViewPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  const onSubmit = async (values: LoginType) => {
    await login(values, {
      onSuccess: (data) => {
        setToken(data.access_token)
        toast.success('Has iniciado sesión correctamente')
        startTransition(() => {
          router.push('/')
        })
      },
      onError: (error) => {
        toast.error(error.toString())
      }
    })
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen overflow-y-auto z-10'>
      <Card className='md:w-96 p-6'>
        <h3 className='text-center font-bold text-2xl'>Inicia Sesión</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario:</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User2 className='absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-primary' />
                      <Input
                        placeholder='Ingresa tu usuario'
                        {...field}
                        className='pl-8'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña:</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-primary' />
                      <Input
                        type={viewPassword ? 'text' : 'password'}
                        placeholder='Ingresa tu contraseña'
                        {...field}
                        className='px-8'
                      />
                      <div
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:cursor-pointer'
                        onClick={toggleViewPassword}
                      >
                        {viewPassword && <EyeOff className='w-4 h-4' />}
                        {!viewPassword && <Eye className='w-4 h-4' />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Ingresar
            </Button>
          </form>
        </Form>
      </Card>
      {(isPending || isLoading) && <Loader open={isPending || isLoading} />}
    </div>
  )
}

export default LoginForm

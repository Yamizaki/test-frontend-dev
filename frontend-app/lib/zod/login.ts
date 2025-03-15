import { z } from 'zod'

export const formLoginSchema = z.object({
  username: z
    .string({ required_error: 'El nombre de usuario es obligatorio' })
    .min(1, { message: 'El nombre de usuario es obligatorio' }),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(1, { message: 'La contraseña es obligatoria' })
    .max(32, { message: 'La contraseña no puede tener mas de 32 caracteres' })
})

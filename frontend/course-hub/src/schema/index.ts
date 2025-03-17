import {z} from 'zod';

export const CredentialsLoginSchema = z.object({
    username: z.string().min(1, 'El usuario es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
})
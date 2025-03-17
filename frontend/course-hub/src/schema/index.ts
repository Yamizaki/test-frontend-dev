import {z} from 'zod';

export const CredentialsLoginSchema = z.object({
    username: z.string().min(1, 'El usuario es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
})

export const ClaseSchema = z.object({
    titulo : z.string(),
    descripcion: z.string(),
    duracion: z.string(),
    video: z.string(),
    completado: z.boolean(),
})

export const ModuleSchema = z.object({
    titulo:  z.string(),
    descripcion: z.string(),
    clases : z.array(ClaseSchema),
})

export const ModulesSchema = z.array(ModuleSchema);
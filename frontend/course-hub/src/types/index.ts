import { CredentialsLoginSchema, ModuleSchema } from '@/schema';
import {z} from 'zod';


export type CredentialsLogin = z.infer<typeof CredentialsLoginSchema>
export type ModuleS = z.infer<typeof ModuleSchema>

export type DefaultContent = {
    titulo:string,
    video:string,
    indice:number
}
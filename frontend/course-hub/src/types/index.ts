import { CredentialsLoginSchema } from '@/schema';
import {z} from 'zod';


export type CredentialsLogin = z.infer<typeof CredentialsLoginSchema>
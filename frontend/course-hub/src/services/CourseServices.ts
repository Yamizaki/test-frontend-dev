import axios from 'axios';
import { CredentialsLogin } from "@/types";
import { ModulesSchema } from '@/schema';

export async function AuthenticateUser(credentials: CredentialsLogin) {
    const url = `https://test-frontend-dev.onrender.com/login`;

    try {
        const {data} = await axios.post(url, credentials);
        return data.access_token;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function getModules(token: string) {
    const url = `https://test-frontend-dev.onrender.com/api/modulos`;

    try {
        const {data} = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const result = ModulesSchema.safeParse(data);

        if(result.success){
            return result.data;
        }
        return result.error;
    }
    catch (error) {
        console.log(error);
        return null;
    }

}
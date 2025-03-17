import axios from 'axios';
import { CredentialsLogin } from "@/types";

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
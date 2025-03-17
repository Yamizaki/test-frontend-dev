import { AuthenticateUser, getModules } from '@/services/CourseServices'
import { CredentialsLogin } from '@/types'
import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'


type LoginState = {
    token: string | null
    isLogin: boolean
    login : () => void
    logout : () => void
    getToken: (credentials:CredentialsLogin) => Promise<boolean>
}

export const useLoginStore = create<LoginState>()(
    persist(
        devtools((set) => ({
            token: null,
            isLogin: false,
            login: () => set({isLogin: true}),
    
            logout: () => {
                set({token: null, isLogin: false})
                
            },
    
            getToken: async (credentials:CredentialsLogin) => {
                const token = await AuthenticateUser(credentials)
                const modules = await getModules(token)
                if(token){
                    set({token,isLogin: true})
                    console.log("token", token)
                    console.log("modules", {modules})
                    return true
                }
                return false
            },
    
        })),
        {
            name: "auth-storage"
        }
    )
    
)
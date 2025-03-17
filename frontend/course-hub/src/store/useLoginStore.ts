import { AuthenticateUser, getModules } from '@/services/CourseServices'
import { CredentialsLogin, ModuleS } from '@/types'
import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'


type LoginState = {
    modulos: ModuleS[] | null;
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
            modulos: null,
            login: () => set({isLogin: true}),
            
            logout: () => {
                set({token: null, isLogin: false, modulos: null})
            },
    
            getToken: async (credentials:CredentialsLogin) => {
                const token = await AuthenticateUser(credentials)       
                if (token) {
                    const modulos = await getModules(token)
                    if (modulos && !Array.isArray(modulos)) {
                      console.error('Error de validación:', modulos)
                      return false
                    }
                    set({ token, isLogin: true, modulos })
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
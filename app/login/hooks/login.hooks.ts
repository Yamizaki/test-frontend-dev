import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToggleState } from "@/hooks/useToogleState"
import { useRouter } from 'next/navigation';

export function useLogin () {
    const [userInfo, setUserInfo] = useState({
      username: "",
      password: "",
    })
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useToggleState()
    const [loading, setLoading] = useToggleState()
    const router = useRouter();
  
    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setLoading()
      const response = await login(userInfo.username, userInfo.password)
      if (response) {
        router.push("/modules")
      }
      setLoading()
    }

  return { handleSubmit, userInfo, setUserInfo, setShowPassword, showPassword, loading }
}
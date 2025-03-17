import { useLoginStore } from "@/store/useLoginStore"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export const Logout = () => {
    const navigate = useNavigate();
    const logout = useLoginStore(state => state.logout)


    useEffect(()=> {
        logout()
        navigate("/login", {replace: true})
    }, [logout, navigate])

  return null
}

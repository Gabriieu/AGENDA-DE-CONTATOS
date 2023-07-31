import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../providers/userProvider"


export const ProtectedRoutes = () => {
    const {loading} = useContext(UserContext)
    
    if(loading){
        return (
            <main>
                <div>Carregando...</div>
            </main>
        )
    }

    return <Outlet/>
}
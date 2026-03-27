import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register , login , getMe , logout } from "../services/auth.api";


export function useAuth() {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({username , email , password}) {
        setLoading(true)
        try {
            const data = await register({username , email , password})
            setUser(data.user)
            return data
        } catch (error) {
            console.error("Registration failed:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({email , password}) {
        setLoading(true)
        try {
            const data = await login({email , password})
            setUser(data.user)
            // console.log(data);
            return data
            
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.error("Failed to get user info:", error)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout, handleGetMe }

}
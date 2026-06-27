import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "../services/api";

const AuthContext = createContext(null); 

export function AuthProvider({ children }) { //lo dichiariamo...tutto cio che c'è all'interno deve essere posto "al di sotto"->children
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // controlla se l'utente ha precedentemente fatto il logout o se ci sono dati ad esso relativi nel localStorage
    useEffect(() => {
        // Al caricamento dell'app, recuperiamo solo le info pubbliche dell'utente
        const storedUser = localStorage.getItem("liber_user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); //non sto aspettando piu dati..rimpiazzo loading con altre componenti
    }, []);


    async function login(email, password) {
        
        const data = await apiLogin(email, password); //utilizza l'api di login

        // Noi salviamo nel frontend solo le info base dell'utente
        localStorage.setItem("liber_user", JSON.stringify(data.user));
        setUser(data.user);
    }
 
    async function register(username, email, password) {
        await apiRegister(username, email, password);  //chiamata api di registrazione
        await login(email, password); // Logghiamo automaticamente l'utente appena registrato
    }

    async function logout() {
        try {
            // Chiamiamo il backend per dirgli di distruggere i cookie HTTP-Only
            await apiLogout();
        } catch (error) {
            console.error("Errore durante la disconnessione", error);
        } finally {
            // Svuotiamo la memoria del frontend
            localStorage.removeItem("liber_user");
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
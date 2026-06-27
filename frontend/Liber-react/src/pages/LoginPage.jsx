import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import "../style/LoginPage.css"
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() { 
    const { login, register } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function submitHandler(e){
        e.preventDefault();
        try{
            if (isRegister){
                await register(username,email,password);
            }else{
                await login(email,password);
            }
            navigate("/HomePage")
        }
        catch (err) {
            setError(err.message);
        }
     } 
    

    return(
        <>
        <div className="sfondo-login-page">
            <header>
                <nav className="nav-login">
                    <div className="nav-sinistra">
                        <Logo/>
                        <span className="titolo-app">Liber</span>
                    </div>
                    <div className="nav-destra">
                        <Link className="btn-to-refresh link-to-refresh" to="/">Back</Link>
                    </div>
                </nav>
            </header>


            <div className="auth-box">
                    <h1>{isRegister? "Registrati" : "Accedi"}</h1>
                    {error && <p className ="auth-error">{error}</p>}

                        <form onSubmit={submitHandler}>
                            {isRegister && (
                                <div className="campo-form">
                                <label htmlFor="username">Username:</label>
                                <input id="username" value={username} onChange={e => setUsername(e.target.value)} required type= "text" name="username"></input>
                            </div>

                            )}
                            <div className="campo-form">
                                <label htmlFor="email">Email:</label>
                                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required name="email"></input>
                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required name="password"></input>
                            </div>
                            <button className="btn-accedi" type="submit">{isRegister? "Registrati": "Accedi"}</button>
                        </form>

                        <div className="link-al-register">
                            <p>{isRegister? "Hai già un account?": "Non hai un account?"}{" "}
                                <button onClick={
                                    ()=>{setIsRegister(!isRegister);
                                        setError(" ");
                                    }
                                    }>{isRegister?"Accedi":"Registrati"}</button>
                            </p>
                            
                        </div>
            
            </div> 

        </div>

        </>
    )
}
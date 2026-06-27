import Logo from "./Logo";
import "../App.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = async (e) => {
        e.preventDefault(); 
        try {
            await logout(); 
            navigate("/");
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    };

    return(

        <>

            <div className= "navbar-box">
                <nav>
                    <div className = "nav-sinistra">
                        <Logo/> 
                        <span className = "titolo-app">
                            Liber  
                        </span> 
                    </div>

                    <div className = "nav-destra">
                        <ul>
                            <li ><Link to = "/HomePage">Home</Link></li>
                            <li><Link to ="/ProfiloPage">Profilo</Link></li>
                            <li><Link to= "/BibliotecaPage">Biblioteca</Link></li>
                            <li>
                                <a href="/" onClick={handleLogoutClick} className="logout-link">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>    

                </nav>  

            </div>

        </>

    )
}
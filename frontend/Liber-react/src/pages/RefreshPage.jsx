import  '../style/RefreshPage.css'
import {Link} from "react-router-dom";
import Logo from "../components/Logo"



export default function RefreshPage(){
    return(
        <>
        <div className="sfondo-container">
        
            <header> 
                <nav className="nav-refresh">
                    <div className="nav-sinistra">
                        <Logo/>
                        <span className="titolo-app">Liber</span>
                    </div>
                    <div className="nav-destra">
                       <Link  className= "btn-refresh link-refresh" to="/LoginPage">Accedi</Link>
                    </div>
                </nav>
            </header>

            <main className='titoli-refresh'>
                <h1>Le storie uniscono,  Liber le connette</h1>
                <h3>Niente più letture solitarie. Scopri un sito unico in cui tracciare le tue tappe, 
                    scambiare opinioni autentiche e vivere ogni libro insieme ad una community che ama leggere quanto te!</h3>
            </main>

            <h3>
                 <Link className = 'refresh-call2action' to="/LoginPage"> Pronto a voltare pagina? Registrati ora. </Link>
            </h3>
            
            
            

        </div>
        
         </>

    )

}
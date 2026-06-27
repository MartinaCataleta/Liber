import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getInfoUser, modifyUser } from "../services/api"; 
import "../style/ProfiloPage.css";

const EMOJI_SET = ["👤", "🦊", "🦉", "🦁", "🦄", "👽", "🤖", "👻", "🤓", "🕵🏻‍♂️", "🧙🏼‍♂️", "👾"];

export default function ProfiloPage() {
    const [open, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(false); 


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("🐿️");
    const [preferenzaGenere, setPreferenzaGenere] = useState("Classici");
    const [bio, setBio] = useState("");

    //recupero dati utente reale
    useEffect(() => {
        const caricaDatiUtente = async () => {
            try {
                const datiUtente = await getInfoUser();
                if (datiUtente) {
                    setName(datiUtente.name || "");
                    setUsername(datiUtente.username || "");
                    setAvatar(datiUtente.avatar || "🐿️");
                    setPreferenzaGenere(datiUtente.preferenzaGenere || "Classici");
                    setBio(datiUtente.bio || "");
                }
            } catch (error) {
                console.error("Errore nel caricamento del profilo:", error);
            }
        };
        caricaDatiUtente();
    }, []);

    const choseAvatarHandler = (nuovoAvatar) => {
        setAvatar(nuovoAvatar);
    };
    const handleButtonClick = async (e) => {
        e.preventDefault();

        if (profile) {
            // Se eravamo in modalità modifica (profile === true), ora inviamo i dati al backend
            try {
                const payload = { name, username, avatar, preferenzaGenere, bio };
                const response = await modifyUser(payload);
                
                alert(response.message || "Profilo aggiornato con successo!");
                
                setIsOpen(false);
            } catch (error) {
                console.error("Errore durante il salvataggio del profilo:", error);
                alert("Impossibile salvare le modifiche.");
                return; // Interrompiamo senza uscire dalla modalità modifica in caso di errore
            }
        } else {
            // Se eravamo in modalità visualizzazione, apriamo anche la griglia delle emoji automaticamente
            setIsOpen(true);
        }

        // Cambiamo lo stato per alternare i box
        setProfile(!profile);
    };

    return (
        <>
            <div className="sfondo-home-page">
                <Navbar />
                <div className="profile-box" onClick={(e) => e.preventDefault()}>
                    <h2 className="title-profile-page">MyProfile</h2>

                    <div className="profile-content">
                        {/* Avatar Cliccabile (Apre/Chiude la griglia solo se siamo in modalità modifica) */}
                        <div 
                            className="icona-profilo" 
                            onClick={(e) => {
                                e.preventDefault();
                                if (profile) setIsOpen(!open);
                            }}
                            style={{ cursor: profile ? "pointer" : "default" }}
                            title={profile ? "Cambia immagine profilo" : ""}
                        >
                            <span className="icona-placeholder">{avatar}</span>
                        </div>

                        {/* Cambio Condizionale tra i Box */}
                        {!profile ? (
                            <div className="elementi-profilebox">
                                <span className="info-profile"><b>Nome:</b> {name || "Non inserito"}</span>
                                <span className="info-profile"><b>Username:</b> {username}</span>
                                <span className="info-profile"><b>Genere preferito:</b> {preferenzaGenere}</span>
                                <span className="info-profile"><b>Bio:</b> {bio || "Nessuna biografia inserita"}</span>
                            </div>
                        ) : (
                            <div className="elementi-profilebox">
                                <span className="modifica-profilo">
                                    Nome: 
                                    <input 
                                        type="text" 
                                        className="info-nome-profile" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="inserire nuovo nome"
                                    />
                                </span>
                                <span className="modifica-profilo">
                                    Username: 
                                    <input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        placeholder="inserire nuovo username"
                                    />
                                </span>
                                <span className="modifica-profilo">
                                    Genere preferito: 
                                    <select value={preferenzaGenere} onChange={(e) => setPreferenzaGenere(e.target.value)}>
                                        <option value="Classici">Classici</option>
                                        <option value="fantasy">fantasy</option>
                                        <option value="Gialli">Gialli</option>
                                        <option value="Sci-fi">Sci-fi</option>
                                        <option value="Romantici">Romantici</option>
                                        <option value="Storici">Storici</option>
                                        <option value="Psicologia">Psicologia</option>
                                        <option value="Biografico">Biografico</option>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Drammatici">Drammatici</option>
                                    </select>
                                </span>
                                <span className="modifica-profilo">
                                    Bio:
                                    <input 
                                        type="text" 
                                        value={bio} 
                                        onChange={(e) => setBio(e.target.value)} 
                                        placeholder="inserire bio"
                                    />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Griglia di selezione dell'Avatar */}
                    {open && profile && (
                        <div className="choose-profile-icon">
                            <p>Scegli il tuo nuovo avatar</p>
                            <div className="emoji-grid">
                                {EMOJI_SET.map((emoji, index) => (
                                    <button 
                                        key={index} 
                                        className="emoji-btn"
                                        onClick={() => choseAvatarHandler(emoji)}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}    

                    {/* Bottone Modifica / Salva */}
                    <div className="btn-modifica">
                        <button className="btn-modifica-btn" onClick={handleButtonClick}> 
                            {!profile ? "Modifica il profilo" : "Salva le modifiche"}
                        </button>
                    </div>   
                </div>
            </div>
        </>
    );
}
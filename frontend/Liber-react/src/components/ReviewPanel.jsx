import React, { useState } from "react";
import { createReviews } from "../services/api"; 

export default function ReviewPanel({ book }) {
    const [voto, setVoto] = useState(1);
    const [commento, setCommento] = useState("");

    const handleInvioRecensione = async (e) => {
        e.preventDefault();

        try {

            const currentId =  book._id;
            await createReviews(currentId, { voto, commento });
            
            alert("Recensione inviata con successo!");
            setCommento("");
            setVoto(1);
            
        } catch (error) {
            console.error("Errore durante la creazione della recensione:", error);
            alert("Si è verificato un errore durante l'invio della recensione.");
        }
    }

    return (
        <>
            <div className="review-panel">

                <form className="box-recensione" onSubmit={handleInvioRecensione}>

                    <h2 className="titolo-recensione">Scrivi una recensione🖋️</h2>

                    <div className="num-valutazione"> 
                        <span>Seleziona una valutazione da 1 a 5 ⭐  </span>
                        <select 
                            value={voto} 
                            onChange={(e) => setVoto(Number(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    
                    <textarea 
                        className="testo-recensione" 
                        placeholder="Cosa ne pensi di questo libro? Scrivi qui la tua recensione..."
                        value={commento}
                        onChange={(e) => setCommento(e.target.value)}
                    ></textarea>


                    <button type="submit" className="btn-invia-recensione">
                        Invia la recensione
                    </button>
                </form>
            </div>
        </>
    )
}
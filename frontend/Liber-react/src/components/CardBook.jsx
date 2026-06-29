import {useState} from "react"
import { Link } from "react-router-dom";
import {toggleFavorite} from "../services/api"

export default function CardBox({id, titolo, autore, author, genere, pagine, anno, copertinaURL, isFavorite, onFavoriteToggle}){
const [isOpen, setIsOpen] = useState(false);

const toggleFavoriteHandler= async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    try{
        await toggleFavorite(id);
        if (onFavoriteToggle) {
            onFavoriteToggle(id, !isFavorite);
        }
    }catch (error) {
      console.error("Impossibile salvare il preferito:", error);
      alert("Devi fare il login per salvare i libri ai preferiti!");
    }
   }



    return(
         <div className="card-box" onClick={(e)=>{
            setIsOpen(!isOpen)}}> 
            <img src={copertinaURL} alt={titolo} className="book-cover"/>
                <div className="book-card-overlay">
                    <h2 className="book-title">{titolo}</h2>
                    <p className="author">{autore || author}</p>
                </div>

               {isOpen && (
                <div className="opened-book-card" onClick={(e)=>{
                    e.stopPropagation()
                    setIsOpen(false)}}>
                    <ul>
                        <li><u>Genere:</u> {genere}</li>
                        <li><u>Pagine:</u>{pagine}</li>
                        <li><u>Anno:</u> {anno}</li>
                        <li><button className="button-favorite" onClick={toggleFavoriteHandler}>⭐️ {isFavorite?"Preferito":"NonPreferito"}</button></li>
                        <li><Link className="link-2-discussione" to="/BookPage" state={{ book: { _id: id, titolo: titolo, autore: autore || author, genere: genere, pagine: pagine, anno: anno, copertinaURL: copertinaURL } }}>Scopri di più</Link></li>
                        
                   </ul>
                </div>
               )}
        </div>
    )
}
import {useState} from "react"
import { Link } from "react-router-dom";
import {toggleFavorite} from "../services/api"

export default function CardBox(props){
const [isOpen, setIsOpen] = useState(false);

const toggleFavoriteHandler= async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    try{
        await toggleFavorite(props.id);
        if (props.onFavoriteToggle) {
            props.onFavoriteToggle(props.id, !props.isFavorite);
        }
    }catch (error) {
      console.error("Impossibile salvare il preferito:", error);
      alert("Devi fare il login per salvare i libri ai preferiti!");
    }
   }



    return(
         <>
         <div className="card-box" onClick={(e)=>{
            e.preventDefault();
            setIsOpen(!isOpen)}}> 
            <img src={props.copertinaURL} alt={props.titolo} className="book-cover"/>
                <div className="book-card-overlay">
                    <h2 className="book-title">{props.titolo}</h2>
                    <p className="author">{props.autore || props.author}</p>
                </div>

               {isOpen && (
                <div className="opened-book-card" onClick={()=>{setIsOpen(false)}}>
                    <ul>
                        <li><u>Genere:</u> {props.genere}</li>
                        <li><u>Pagine:</u>{ props.pagine}</li>
                        <li><u>Anno:</u> {props.anno}</li>
                        <li><button className="button-favorite" onClick={toggleFavoriteHandler}>⭐️ {props.isFavorite?"Preferito":"NonPreferito"}</button></li>
                        <li><Link className="link-2-discussione" to="/BookPage" state={{ book: { _id: props.id, titolo: props.titolo, autore: props.autore || props.author, genere: props.genere, pagine: props.pagine, anno: props.anno, copertinaURL: props.copertinaURL } }}>Scopri di più</Link></li>
                        
                   </ul>



                </div>


               )}
           

        </div>
        
        
        </>
    )

}
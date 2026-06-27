import { useEffect , useState } from "react";
import { deleteReviews, getReviews } from "../services/api";
import "../style/BookPage.css";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";


export default function ReviewVisualizer({book}){

    const [reviews , setReviews] = useState([]);
    const [inCaricamento, setInCaricamento] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
         getReviews(book._id)
          .then((data) =>{
            setReviews(data);
            setInCaricamento(false);
          })
          .catch((error) => {
                console.error("Errore:", error);
                setInCaricamento(false); 
            });

        // L'URL uguale a quello del backend
        const socket = io("http://localhost:3000");

        socket.on("new_review", (newReview) => {
            if (String(newReview.bookId) === String(book._id)) {
                setReviews((prevReviews) => [newReview, ...prevReviews]);
            }
        });

        socket.on("delete_review", (deletedReviewId) => {
            setReviews((prevReviews) => prevReviews.filter(r => r._id !== deletedReviewId));
        });
        return () => {
            socket.disconnect();
        };

      }, [book._id]);

      const deleteHandler = async (e, reviewId) => {
        e.preventDefault();

        try{
            await deleteReviews(book._id, reviewId );
            alert("Recensione eliminata con successo!");
            
        } catch (error) {
            console.error("Errore durante l'eliminazione della recensione:", error);
            alert("Si è verificato un errore durante l'eliminazione della recensione.");
        }
    }
    
 

    return(
    <>
        <div className="review-visualizer">
            <h2 className="titolo-recensioni">Recensioni della community</h2>
            
            <div className="review-list-container">
                {inCaricamento ? (
                    <p style={{ color: "white" }}>Caricamento recensioni...</p>
                ) : reviews.length === 0 ? (
                    <p style={{ color: "white", fontStyle: "italic" }}>Ancora nessuna recensione. Scrivi la prima!</p>
                ) : (
                    reviews.map((recensione) =>(
                        <div className="singola-recensione" key={recensione._id}>
                            <span className="info-recensione"><b>Username:</b> {recensione.author?.username || "Utente Sconosciuto"}</span>
                            <span className="info-recensione"><b>Valutazione:</b> {recensione.voto} / 5 ⭐</span>
                            <span className="info-recensione"><b>Commento:</b> {recensione.commento}</span>
                            {recensione.author.username === user.username && (
                                <button className = "cancella-recensione" onClick = { (e) => deleteHandler(e,recensione._id)} >Cancella</button>
                            )}
                        </div>
                    ))  
                )}
            </div>
        </div>
    </>
 )
}
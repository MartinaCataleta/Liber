import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardBook from "../components/CardBook";
import "../style/HomePage.css";

import { getBooks, getFavorites } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  
  const [libri, setLibri] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(true);
  const [testoRicerca, setTestoRicerca] = useState("");
  const [preferitiIds, setPreferitiIds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
     getBooks()
      .then((data) =>{
        setLibri(data);
        setInCaricamento(false);
      })
      .catch((error) => console.error("Errore:", error));
  }, []);

  useEffect(() => {
    if (user) {
      getFavorites()
        .then((data) => {
          setPreferitiIds(data.map((libro) => libro._id));
        })
        .catch((error) => console.error("Errore caricamento preferiti:", error));
    }
  }, [user]);

  const handleFavoriteToggle = (bookId, isFav) => {
    setPreferitiIds((prev) => {
      if (isFav) {
        return [...prev, bookId];
      } else {
        return prev.filter((id) => id !== bookId);
      }
    });
  };

  const libriFiltrati = libri.filter((libro) => 
    libro.titolo.toLowerCase().includes(testoRicerca.toLowerCase()) ||
    libro.autore.toLowerCase().includes(testoRicerca.toLowerCase())
  );
    
  
  return (
    <> 
    <div className="sfondo-home-page">
      <Navbar />
        <div className="search-bar">
          <input type="text" placeholder="cerca libro o autore..." value={testoRicerca} onChange={(e)=>{setTestoRicerca(e.target.value) }}></input>
        </div>
      <main className="home-page-content">
        {inCaricamento ? (
          <h2 style={{ color: "white", textAlign: "center" }}>Caricamento...</h2>
        ) : (
          <div className="books-containers">
            {libriFiltrati.map((libro) => (
              <CardBook
                key={libro._id}
                id={libro._id}
                copertinaURL={libro.copertinaURL}
                titolo={libro.titolo}
                autore={libro.autore}
                author={libro.autore}
                genere={libro.genere}
                pagine={libro.pagine}
                anno={libro.anno}
                isFavorite={preferitiIds.includes(libro._id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
    </>
  );
}
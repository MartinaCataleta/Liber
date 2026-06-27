export default function BookInfoPanel({ book }) {

 
  if (!book) return null;


  return (
    <>
    <div className="book-info-panel">
      
      <div className="book-info__left">
        <div className="book-info__cover-wrapper">
          <img 
            src={book.copertinaURL} 
            alt={book.titolo} 
            className="book-info__cover"
          />
        </div>
      </div>

      {/* COLONNA DESTRA: DETTAGLI E DESCRIZIONE */}
      <div className="book-info__right">
        <h1 className="book-info__title">{book.titolo}</h1>
        <h2 className="book-info__author">di {book.autore}</h2>

        <div className="book-info_aggiuntive">
          <span className="aggiuntive-tag bg-genre">{book.genere}</span>
          <span className="aggiuntive-tag bg-info">📄 {book.pagine} pagine</span>
          {book.anno && <span className="aggiuntive-tag bg-info">📅 Anno: {book.anno}</span>}
        </div>

        <hr className="book-info__divider" />

        <div className="book-info__section">
          <h3>Descrizione</h3>
          <p className="book-info__text">
            {book.descrizione || book.trama || 
              `"${book.titolo}" è un'opera straordinaria scritta da ${book.autore}. All'interno di Liber, questo volume della categoria ${book.genere} funge da punto d'incontro virtuale per lettori e appassionati. Usa lo spazio per le recensioni per commentare i capitoli con la community.`}
          </p>
        </div>

      </div>

    </div>
    </>
  );
}
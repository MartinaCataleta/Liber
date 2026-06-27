const mongoose= require('mongoose');
const Book= require('../models/Book');
const User = require('../models/User');

const getBooks= async (req,res)=>{
    try{
        const books= await Book.find();
        res.status(200).json(books);
    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Errore durante il recupero dei libri", error })
    }
}

const getFavorites= async (req,res)=>{
    try{
        const userId= req.user.id;
        //Uso populate per recuperare la copertina (avremmo solo gli Id dei libri)
        const user= await User.findById(userId).populate('preferiti');
         if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        const favorites= user.preferiti;
        res.status(200).json(favorites);
    }catch(error){
        res.status(500).json({ message: "Errore nel recupero dei preferiti"}) 
    }
}

const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        //Leggiamo il libro scelto (params perchè l'oggetto si prende dall'URL)
        const bookId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        //Controlliamo se l'ID del libro è già dentro l'array "preferiti"
        const alreadyFav = user.preferiti.includes(bookId);

        if (alreadyFav) {
            //Se il libro è gia preferito, lo tolgo dalla lista 
            user.preferiti = user.preferiti.filter((id) => id.toString() !== bookId.toString());
        } else {
            //Se il libro non c'è: Lo aggiungiamo alla lista
            user.preferiti.push(bookId);
        }
        await user.save();
        //Avvisi
        return res.status(200).json({ 
            message: alreadyFav ? "Libro rimosso" : "Libro aggiunto",
            preferiti: user.preferiti // Mandiamo indietro la lista aggiornata
        });

    } catch (error) {
        console.error("Errore nel controller:", error);
        return res.status(500).json({ message: "Errore interno del server" });
    }
};


module.exports={
    getBooks,
    toggleFavorite,
    getFavorites
}
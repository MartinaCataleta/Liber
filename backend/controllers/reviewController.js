const mongoose = require ('mongoose');
const Review= require('../models/Review');

const getReviews= async(req,res)=>{
    try{
        const idBook= req.params.id;
        const reviews= await Review.find({bookId:idBook})
        .populate('author','username')
        .sort({ createdAt: -1 });
    res.json(reviews);
    }
    catch (error){
        res.status(500).json({message: 'Errore nel recupero delle review'});
    }
}

const createReviews= async(req,res)=>{
    try{
        const {voto,commento}= req.body;
        const review= await Review.create({
        commento,voto,bookId: req.params.id, author: req.user.id
        });

        const populated = await review.populate('author', 'username');
        
        // Invia l'evento tramite Socket.io a tutti i client
        const io = req.app.get("io");
        if (io) {
            io.emit("new_review", populated);
        }
        
        res.status(201).json(populated);
    }
    catch(error){
        res.status(500).json({ message: 'Errore nella creazione della review'});
    }

}

const deleteReviews= async(req,res)=>{
    try{
      const review= await Review.findById(req.params.reviewId);
      if (!review){
        return res.status(404).json({ message: "Review non trovata" });
      }
      if (review.author.toString() !== req.user.id){
        return res.status(403).json({ message: "Non puoi cancellare la review" });
      }
      await Review.findByIdAndDelete(req.params.reviewId);

      // Invia l'evento tramite Socket.io a tutti i client
      const io = req.app.get("io");
      if (io) {
          io.emit("delete_review", req.params.reviewId);
      }

      res.json({ message: "Review eliminata" });
    }
    catch(error){
        res.status(500).json({ message: 'Errore nella cancellazione della review'});
    }
}


module.exports= {
    getReviews,
    createReviews,
    deleteReviews
}
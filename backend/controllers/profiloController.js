const mongoose= require('mongoose');
const User = require('../models/User');

const getInfoUser= async (req, res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message: "Errore nel recupero dello username"})
    }
}

const modifyUser= async (req, res)=>{
    try{
        const { name, username, avatar, preferenzaGenere, bio} = req.body;
        const userId = req.user.id;

        const modifiedUser = await User.findByIdAndUpdate(
            userId,
            { 
                $set: {name, username, avatar, preferenzaGenere, bio}
            },

            {
                returnDocument: 'after', 
                runValidators: true     
            }
        ).select("-password");

         res.status(200).json({
            message: "Profilo aggiornato con successo!",
            user: modifiedUser
         });
    } catch(error){
        res.status(500).json({ message: "Errore nella modifica dell'utente"})
    }
}

module.exports={
    getInfoUser,
    modifyUser
}
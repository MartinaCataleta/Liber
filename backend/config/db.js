const mongoose = require ("mongoose");

const connectDB= () =>{
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Connesso al Database'))
    .catch((error)=>console.error('Errore di connessione al Database:',error));
    };

module.exports= connectDB;




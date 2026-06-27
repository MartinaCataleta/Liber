const mongoose = require('mongoose');

const fs= require('fs');
const path= require('path');

require('dotenv').config();


const User = require('./models/User');
const Book = require('./models/Book');
const Chat = require('./models/Chat');
const Message = require('./models/Message');
const Review = require('./models/Review');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connesso');


        await User.deleteMany({});
        await Book.deleteMany({});
        await Chat.deleteMany({});
        await Message.deleteMany({});
        await Review.deleteMany({});
        console.log('Collezioni svuotate');

        const francesca = await User.create({
            name: 'Francesa',
            username: 'FraLoca',
            email: 'francesca@example.com',
            password: 'password123',
            avatar: '🐿️',
            prefererenzeGenere: 'Gialli',
            bio: 'Amo leggere e condividere le mie opinioni sui libri!',
        });
        
        console.log('Utente creato:', francesca.username);


        // Leggiamo il file JSON in modo sincrono e lo convertiamo in un array JS
        const pathFileLibri = path.join(__dirname, 'libri.json');
        const libriJson = JSON.parse(fs.readFileSync(pathFileLibri, 'utf-8'));
        
        // Inseriamo tutti i libri estratti dal JSON nel database
        const createdBooks = await Book.insertMany(libriJson);
        console.log(`Creati ${createdBooks.length} libri con successo dal file JSON`);

      console.log(`Database Completed`);
      await mongoose.connection.close();
       } catch (error) {
            console.error('Errore durante il seed:', error);
            process.exit(1);
       } 
}
seed();


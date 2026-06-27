const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    titolo: {
        type: String,
        required: true
    } ,
    autore: {
        type: String, 
        required: true
    },
    genere: {
        type: String,
        required: true
    },
    pagine: {
        type: Number,
        required: true
    },
    anno: {
        type: Number
    },

    copertinaURL: {
        type: String,
        default: ' '
    } 
},{
    timestamps: true
})

module.exports = mongoose.model("Book" , bookSchema)
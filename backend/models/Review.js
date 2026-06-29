const mongoose= require('mongoose')

const reviewModel= new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voto: {
        type: Number,
        required: true,
        min: 1,
        max:5
    },
    commento: {
        type: String,
        required: true,
        trim: true,
        maxlength: [1000, 'Il commento non può superare i 1000 caratteri']
    }
},
    {
    timestamps: true 
})

module.exports= mongoose.model('Review',reviewModel)
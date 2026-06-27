const mongoose= require ('mongoose');
const bcrypt= require ('bcrypt');

const userModel= new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        minlength: [2,'Il nome deve avere almeno due caratteri']
    },
    username:{
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true,'Inserire un\'email valida'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Inserire un\'email valida']
    },
    password:{
        type: String,
        required: [true,'Inserire una password'],
        minlength: [6,'La password deve contenere almeno 6 caratteri'],
        select: false 
    },
    preferiti:[{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'

    }],
    avatar: {
        type: String,
        default: '🐿️'
    },
    prefererenzaGenere: {
        type: String,
        enum: ['Classici','Fantasy','Gialli','Sci-fi','Romantici','Storici','Biografici','Psicologia','Thriller','Drammatici']
    },
    bio:{
        type: String,
        default: ' '
    }
    }, {
        timestamps: true 
    
});


//Hashing
userModel.pre("save", async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.passwordComparison= async function(inputPassword){
    let user= this;
    return await bcrypt.compare(inputPassword, this.password)
};

module.exports= mongoose.model('User',userModel) 
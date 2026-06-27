const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, '../.env') }); //avendo il .env nella cartella principale del progetto
const cors = require('cors');

const express = require("express");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const cookieParser= require ("cookie-parser");
const authRoutes= require("./routes/authRoutes");
const bookRoutes= require("./routes/bookRoutes");
const userRoutes= require("./routes/userRoutes");
const reviewRoutes= require("./routes/reviewRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Liber API",
            version: "1.0.0",
            description: "Documentazione delle API per la piattaforma Liber",
            contact: {
                name: "Francesca Teresa Rosa Augello, Martina Cataleta, Giuseppe Galetta"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Server di Liber"
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "accessToken"
                }
            }
        },
        security: [
            {
                cookieAuth: []
            }
        ]
    },
    apis: ["./routes/*.js"] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const port = process.env.PORT || 3000;


connectDB();

app.use(cors({
    origin: ["https://liber-1.onrender.com", 
        "http://localhost:5173",
        "http://172.27.48.1:5173"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); 
app.use(cookieParser()); 


//gestione rotte
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/books',bookRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/books',reviewRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const expressServer = app.listen(port, () => {
  console.log(`App in ascolto su porta ${port}`);
});


// Inizializziamo Socket.io usando direttamente il server avviato da Express
// Inizializziamo Socket.io
const io = new Server(expressServer, {
  cors: {
    origin: ["https://liber-1.onrender.com", "http://localhost:5173", "http://172.27.48.1:5173"], 
    methods: ["GET", "POST", "DELETE"],
    credentials: true // FONDAMENTALE se vuoi che il socket "erediti" il contesto dell'utente
  },
  transports: ['polling', 'websocket'] // Aggiungi questo per la stabilità su Render
});

// Salviamo l'istanza di io per usarla nei controller
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Un utente si è connesso a Socket.io");
  socket.on("disconnect", () => {
    console.log("Utente disconnesso");
  });
});

app.get('/', (req, res) => {
  res.send('API del progetto Liber in esecuzione correttamente! 🚀');
});
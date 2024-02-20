import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import eventsRouter from "./routes/events.js";
import authRouter from "./routes/auth.js";
import { requireAuth } from "./lib/authHelper.js";

const { EXPRESS_PORT, MONGODB_URI } = process.env; // Estrazione delle variabili d'ambiente

const app = express(); // Creazione di un'istanza di Express

app.use(morgan('dev')); // Utilizzo del middleware Morgan per la registrazione delle richieste HTTP in modalità 'dev'
app.use(cors()); // Utilizzo del middleware Cors per abilitare le richieste 
app.use(express.json()); // Utilizzo del middleware integrato di Express per l'interpretazione dei dati JSON nelle richieste HTTP

app.use('/events', eventsRouter); // Utilizzo del router degli eventi
app.use('/auth', authRouter); // Utilizzo del router di autenticazione 

app.use(requireAuth()); // Utilizzo della funzione requireAuth per richiedere l'autenticazione per tutte le altre rotte

// Connessione al database MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connessione a MongoDB effettuata con successo."); // Log di conferma della connessione riuscita a MongoDB
        // Avvio del server Express per ascoltare le richieste HTTP sulla porta specificata
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server ON e in ascolto su porta ${EXPRESS_PORT}.`); // Log di conferma dell'avvio del server
        });
    })
    .catch(err => console.error("Errore connessione a MongoDB:", err)); // Gestione degli errori durante la connessione a MongoDB

export default app;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventsRouter from "./routes/events.js";
dotenv.config();

const { EXPRESS_PORT, MONGODB_URI } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connessione a MongoDB effettuata con successo.");
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server ON e in ascolto su porta ${EXPRESS_PORT}.`);
        });
    })
    .catch(err => console.error("Errore connessione a MongoDB:", err));

export default app;

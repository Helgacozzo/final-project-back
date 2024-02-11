import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();
import eventsRouter from "./routes/events.js";
import authRouter from "./routes/auth.js";
import { requireAuth, requireOwner } from "./lib/authHelper.js";
const { EXPRESS_PORT, MONGODB_URI } = process.env;
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);

app.use(cookieParser());

app.use('/auth', authRouter);
app.use(requireAuth());
app.use(requireOwner());

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connessione a MongoDB effettuata con successo.");
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server ON e in ascolto su porta ${EXPRESS_PORT}.`);
        });
    })
    .catch(err => console.error("Errore connessione a MongoDB:", err));

export default app;

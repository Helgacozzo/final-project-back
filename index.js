import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();
import eventsRouter from "./routes/events.js";
import authRouter from "./routes/auth.js";
import organizersRouter from "./routes/organizers.js";
import participantsRouter from "./routes/participants.js";
import { requireAuth } from "./lib/authHelper.js";
const { EXPRESS_PORT, MONGODB_URI } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);

app.use('/auth', authRouter);

app.use(requireAuth());

app.use('/organizers', organizersRouter);
app.use('/participants', participantsRouter);


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connessione a MongoDB effettuata con successo.");
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server ON e in ascolto su porta ${EXPRESS_PORT}.`);
        });
    })
    .catch(err => console.error("Errore connessione a MongoDB:", err));

export default app;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventsRouter from "./routes/events.js";
import User from "./models/User.js";
dotenv.config();

const { EXPRESS_PORT, MONGODB_URI } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);

app.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send(`Tutti i campi devono essere riempiti!`)
    }
    try {
        const user = await User.signUp(email, password);
        return res.status(201).send(user);
    } catch (error) {
        console.error(error);
        const code = error.statusCode || 500;
        res.status(code).send(error.message);
    }
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send(`Tutti i campi devono essere riempiti!`)
    }
    try {
        const user = await User.logIn(email, password);
        return res.status(202).send(user);
    } catch (error) {
        console.error(error);
        const code = error.statusCode || 500;
        res.status(code).send(error.message);
    }
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connessione a MongoDB effettuata con successo.");
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server ON e in ascolto su porta ${EXPRESS_PORT}.`);
        });
    })
    .catch(err => console.error("Errore connessione a MongoDB:", err));

export default app;

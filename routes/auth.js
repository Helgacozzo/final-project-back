import express from "express";
import User from "../models/User.js";
import { generateToken } from "../lib/authHelper.js";

// Creazione di un router
const router = express.Router();

// Rotta per la registrazione di un nuovo utente
router.post('/signup', async (req, res) => {
    // Estrazione dei dati dalla richiesta
    const { email, password } = req.body;
    // Verifica se sono stati forniti entrambi l'email e la password
    if (!email || !password) {
        return res.status(400).send('Tutti i campi devono essere riempiti.');
    }

    try {
        // Registrazione del nuovo utente utilizzando il metodo signUp del modello User
        const user = await User.signUp(email, password);
        // Generazione del token JWT per l'utente registrato
        const token = generateToken(user._id);
        // Invio della risposta con lo stato 201 e i dati dell'utente con il relativo token
        return res.status(201).send({
            user: user.clean(), // Pulizia dei dati sensibili dell'utente prima di inviarli al client
            token, // Token JWT generato
        });
    } catch (error) {
        console.error(error.message);
        const code = error.statusCode || 500; // Ottenimento del codice di stato dell'errore
        res.status(code).send(error.message); // Invio della risposta con lo stato dell'errore e il messaggio appropriato
    }
});

// Rotta per l'accesso di un utente esistente
router.post('/login', async (req, res) => {
    // Estrazione dei dati dalla richiesta
    const { email, password } = req.body;
    // Verifica se sono stati forniti entrambi l'email e la password
    if (!email || !password) {
        return res.status(400).send('Tutti i campi devono essere riempiti.');
    }

    try {
        // Accesso dell'utente utilizzando il metodo logIn del modello User
        const user = await User.logIn(email, password);
        // Generazione del token JWT per l'utente loggato
        const token = generateToken(user._id);
        // Invio della risposta con lo stato 202 e i dati dell'utente con il relativo token
        return res.status(202).send({
            user: user.clean(), // Pulizia dei dati sensibili dell'utente prima di inviarli al client
            token, // Token JWT generato
        });
    } catch (error) {
        console.error(error.message);
        const code = error.statusCode || 500; // Ottenimento del codice di stato dell'errore
        res.status(code).send(error.message); // Invio della risposta con lo stato dell'errore
    }
});


export default router;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"; dotenv.config(); // Configurazione di dotenv per caricare le variabili d'ambiente

// Estrazione delle variabili d'ambiente
const { PEPPER_KEY, SECRET_KEY } = process.env;

// Funzione per l'hashing della password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generazione del sale per l'hashing
    const combined = password + PEPPER_KEY; // Concatenazione della password con il PEPPER_KEY
    const hashedPassword = bcrypt.hash(combined, salt); // Hashing della password combinata con il sale

    return hashedPassword; // Password hashata
}

// Funzione per la comparazione della password
export const comparePassword = async (password, hashedPassword) => {
    const combined = password + PEPPER_KEY; // Concatenazione della password con il PEPPER_KEY
    const match = await bcrypt.compare(combined, hashedPassword); // Confronto della password combinata con l'hash della password memorizzata

    return match; 
}

// Funzione per la generazione del token JWT
export const generateToken = (_id) => {
    const token = jwt.sign(
        { _id }, // Payload del token contenente l'ID dell'utente
        SECRET_KEY, // Chiave segreta utilizzata per la firma del token
        { expiresIn: '3d' } // Opzioni del token: scadenza dopo 3 giorni
    );
    return token;
}

// Funzione per la verifica del token JWT
export const verifyToken = (token) => {
    const { _id } = jwt.verify(token, SECRET_KEY); // Verifica e decodifica del token utilizzando la chiave segreta
    return _id; // Restituzione dell'ID dell'utente dal token decodificato
}

// Middleware per richiedere l'autenticazione
export const requireAuth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers; // Estrazione dell'intestazione Authorization dalla richiesta

            if (!authorization) {
                throw new Error(`Token richiesto.`); 
            }

            const token = authorization.split(' ')[1]; // Estrazione del token dalla stringa "Bearer <token>"
            if (!token) {
                throw new Error(`Token richiesto.`);
            }

            const _id = verifyToken(token); // Verifica del token e ottenimento dell'ID dell'utente

            const user = await User.findById(_id); // Ricerca dell'utente nel database utilizzando l'ID estratto dal token
            if (!user) {
                throw new Error('User non trovato'); 
            }

            req.user = user; // Aggiunta dell'oggetto utente alla richiesta

        } catch (error) {
            console.error(error.message); 
            return res.status(401).send(`Richiesta non autorizzata: ${error.message}`);
        }

        next();
    }
}

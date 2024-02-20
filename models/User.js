import mongoose from "mongoose";
import validator from "validator"; 
import { comparePassword, hashPassword } from "../lib/authHelper.js";
import { StatusError } from "../lib/errorHelper.js";
const { Schema, model } = mongoose; // Estrazione degli oggetti Schema e model dal modulo mongoose
const { isStrongPassword, isEmail } = validator; // Estrazione delle funzioni di validazione dall'oggetto validator

// Opzioni per la forza della password
const strongPasswordOptions = {
    minLength: 8,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1,
}

// Definizione dello schema per il documento "User"
const schema = new Schema({
    // Email dell'utente
    email: {
        type: String,
        required: true, // L'email è obbligatoria
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine dell'email
        index: true, // Creazione di un indice per il campo email
        unique: true, // Assicurazione dell'unicità dell'email
    },
    // Password dell'utente
    password: {
        type: String,
        required: true, // La password è obbligatoria
    }
});

// Metodo statico per trovare un utente per email
schema.statics.findByEmail = function (email) {
    return this.findOne({ email });
}

// Metodo statico per la registrazione di un nuovo utente
schema.statics.signUp = async function (email, password) {

    // Validazione dell'email
    if (!isEmail(email)) {
        throw StatusError(400, 'Dovresti inserire una email valida.')
    }

    // Validazione della forza della password
    if (!isStrongPassword(password, strongPasswordOptions)) {
        throw StatusError(400, 'Password non abbastanza sicura.')
    }

    // Verifica se l'email è già in uso
    const emailExists = await this.exists({ email });
    if (emailExists) {
        throw StatusError(400, 'Email già in uso.')
    }

    // Hashing della password
    const hashedPassword = await hashPassword(password);

    // Creazione di un nuovo utente
    const user = await this.create({ email, password: hashedPassword });

    return user;
}

// Metodo statico per l'accesso di un utente
schema.statics.logIn = async function (email, password) {

    // Trova l'utente con l'email fornita
    const user = await this.findByEmail(email);

    // Funzione di fallback per gestire il fallimento del login
    const fail = () => {
        throw StatusError(401, 'Email o password non corrette.');
    }

    // Se l'utente non esiste, gestisci il fallimento del login
    if (!user) {
        fail();
    }

    // Verifica se la password fornita corrisponde alla password dell'utente
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        fail();
    }

    return user;
}

// Metodo per pulire i dati sensibili prima di inviarli al client
schema.methods.clean = function () {
    const user = this.toObject(); // Converte il documento mongoose in un oggetto JavaScript
    delete user.password; // Rimuove la password dall'oggetto
    delete user.__v; // Rimuove il campo __v (versione)
    delete user._id; // Rimuove l'ID dell'utente
    return user;
}

// Creazione del modello "User" utilizzando lo schema definito sopra
const User = model('User', schema);

// Esportazione del modello "User" per renderlo disponibile ad altri moduli
export default User;

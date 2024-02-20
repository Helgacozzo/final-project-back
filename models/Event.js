import mongoose from "mongoose";

// Estrazione degli oggetti Schema e model
const { Schema, model } = mongoose;

// Definizione dello schema per il documento "Event"
const eventSchema = new Schema({

    title: {
        type: String,
        required: true, // Il titolo è obbligatorio
        minLength: 1, // Lunghezza minima del titolo
        maxLength: 50, // Lunghezza massima del titolo
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine del titolo
    },
    // Descrizione dell'evento
    description: {
        type: String,
        required: true, // La descrizione è obbligatoria
        minLength: 1, // Lunghezza minima della descrizione
        maxLength: 150, // Lunghezza massima della descrizione
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine della descrizione
    },
    // Ulteriori informazioni sull'evento
    more_info: {
        type: String,
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine delle informazioni aggiuntive
    },
    // Nome dell'organizzatore dell'evento
    organizer_name: {
        type: String,
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine del nome dell'organizzatore
    },
    // Data dell'evento
    date: {
        type: Date,
        required: true // La data dell'evento è obbligatoria
    },
    // Ora dell'evento
    time: {
        type: String,
        required: true // L'ora dell'evento è obbligatoria
    },
    // Luogo dell'evento
    location: {
        type: String,
        required: true, // Il luogo dell'evento è obbligatorio
        minLength: 1, // Lunghezza minima del luogo
        trim: true, // Rimozione degli spazi bianchi all'inizio e alla fine del luogo
    }
}, { timestamps: true }); // Aggiunta dei timestamp per il tracciamento automatico delle date di creazione e aggiornamento

// Creazione del modello "Event" utilizzando lo schema definito sopra
const Event = model('Event', eventSchema);

// Esportazione del modello "Event"
export default Event;

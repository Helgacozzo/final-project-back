import express from "express";
import Event from "../models/Event.js";

// Creazione di un router
const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Trova tutti gli eventi nel database
        return res.send(events); // Invia gli eventi trovati come risposta
    } catch (error) {
        return res.status(500).send({ message: error.message }); // Gestisce gli errori e invia una risposta con codice di stato 500 e il messaggio di errore
    }
});

// GET a single event
router.get('/:id', async (req, res) => {

    const { id } = req.params; // Estrae l'ID dell'evento dalla richiesta

    try {
        const event = await Event.findById(id); // Trova l'evento nel database utilizzando l'ID fornito
        if (!event) {
            return res.status(404).send(`L'evento con l'ID ${id} non è stato trovato.`); // Se l'evento non esiste, invia una risposta con codice di stato 404
        }
        return res.send(event); // Invia l'evento trovato come risposta
    } catch (error) {
        return res.status(500).send({ message: error.message }); // Gestisce gli errori e invia una risposta con codice di stato 500 e il messaggio di errore
    }
});

// ADD new event
router.post('/', async (req, res) => {
    try {
        const { title, description, more_info, organizer_name, date, time, location } = req.body; // Estrae i dati dell'evento dalla richiesta
        if (!title || !date) {
            return res.status(400).send('Titolo e data sono richiesti.'); // Se il titolo o la data non sono forniti, invia una risposta con codice di stato 400
        }
        const event = await Event.create({ // Crea un nuovo evento utilizzando i dati forniti
            title,
            description,
            more_info,
            organizer_name,
            date,
            time,
            location
        });
        return res.status(201).send(event); // Invia una risposta con codice di stato 201 e l'evento creato
    } catch (error) {
        return res.status(500).send({ message: error.message }); // Gestisce gli errori e invia una risposta con codice di stato 500 e il messaggio di errore
    }
});

// PATCH a single event
router.patch('/:id', async (req, res) => {

    const { id } = req.params; // Estrae l'ID dell'evento dalla richiesta
    const { body } = req; // Estrae i dati dell'aggiornamento dall'oggetto richiesta

    try {
        const event = await Event.findByIdAndUpdate(id, body, { new: true }); // Trova e aggiorna l'evento nel database utilizzando l'ID e i nuovi dati forniti
        if (!event) {
            return res.status(404).send(`L'evento con l'ID ${id} non è stato trovato.`); // Se l'evento non esiste, invia una risposta con codice di stato 404
        }
        return res.send(event); // Invia l'evento aggiornato come risposta
    } catch (error) {
        return res.status(500).send({ message: error.message }); // Gestisce gli errori e invia una risposta con codice di stato 500 e il messaggio di errore
    }
});

// DELETE a single event
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Estrae l'ID dell'evento dalla richiesta

    try {
        const event = await Event.findByIdAndDelete(id); // Trova e elimina l'evento nel database utilizzando l'ID fornito
        if (!event) {
            return res.status(404).send(`L'evento con l'ID ${id} non è stato trovato.`); // Se l'evento non esiste, invia una risposta con codice di stato 404
        }
        return res.send(`L'evento con l'ID ${id} è stato cancellato.`); // Invia una risposta confermando l'eliminazione dell'evento
    } catch (error) {
        return res.status(500).send({ message: error.message }); // Gestisce gli errori e invia una risposta con codice di stato 500 e il messaggio di errore
    }
});


export default router;

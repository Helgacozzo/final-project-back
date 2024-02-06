import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// POST add new event
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send('You must send an event.');
    }

    try {
        const event = await Event.create(req.body);
        return res.status(201).send(event);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// GET list all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        return res.send(events);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// GET single event
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send(`Event with ID ${id} not found.`);
        }
        return res.send(event);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// PATCH update single event
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const event = await Event.findByIdAndUpdate(id, body, { new: true });
        if (!event) {
            return res.status(404).send(`Event with ID ${id} not found.`);
        }
        return res.send(event);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// DELETE single event
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).send(`Event with ID ${id} not found.`);
        }
        return res.send(`Event with ID ${id} has been deleted.`);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;

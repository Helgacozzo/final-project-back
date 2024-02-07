import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// ADD new event
router.post('/', async (req, res) => {

    try {
        const { title, description, date } = req.body;
        if (!title || !date) {
            return res.status(400).send('Title and date are required.');
        }
        const event = await Event.create({
            title,
            description,
            date
        });
        return res.status(201).send(event);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        return res.send(events);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// GET a single event
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

// UPDATE a single event
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

// DELETE a single event
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

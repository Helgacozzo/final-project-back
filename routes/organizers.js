import express from 'express';
import Organizer from '../models/Organizer.js';

const router = express.Router();

router.post('/organizer', async (req, res) => {
  try {
    const { name, email } = req.body;
    const organizer = new Organizer({ name, last_name, email });
    await organizer.save();
    res.status(201).json(organizer);
  } catch (err) {
    console.error(`Errore durante la registrazione dell'organizzatore`, err);
    res.status(500).send(`Errore durante la registrazione dell'organizzatore`);
  }
});

export default router;

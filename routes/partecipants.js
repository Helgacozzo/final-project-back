import express from 'express';
import Participant from '../models/Partecipants.js.js';

const router = express.Router();

router.post('/participants', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const participant = new Participant({ name, email, age });
    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    console.error('Errore durante la registrazione del partecipante', err);
    res.status(500).send('Errore durante la registrazione del partecipante');
  }
});

export default router;
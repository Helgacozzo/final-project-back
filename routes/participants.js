import express from 'express';
import Participant from '../models/Participant.js';

const router = express.Router();

router.post('/participants', async (req, res) => {
  try {
    const { name, email } = req.body;
    const participant = new Participant({ name, last_name, email });
    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    console.error('Errore durante la registrazione del partecipante', err);
    res.status(500).send('Errore durante la registrazione del partecipante');
  }
});

export default router;

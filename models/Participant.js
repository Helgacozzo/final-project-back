import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const participantSchema = new Schema({
  name: {
    type: String,
    minLength: 1,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    minLength: 1,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { timestamps: true });

const Participant = model('Participant', participantSchema);

export default Participant;

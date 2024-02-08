import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const participantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Participant = model('Participant', participantSchema);

export default Participant;

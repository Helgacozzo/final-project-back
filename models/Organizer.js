import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const organizerSchema = new Schema({
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
  },
  is_admin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Organizer = model('Organizer', organizerSchema);

export default Organizer;
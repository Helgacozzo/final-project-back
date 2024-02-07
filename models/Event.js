import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        trim: true,
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    time: String, 
    location: String 
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;

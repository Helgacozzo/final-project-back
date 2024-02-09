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
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 250,
        trim: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
    }
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;

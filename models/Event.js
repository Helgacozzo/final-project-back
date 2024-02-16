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
    more_info: {
        type: String,
        minLength: 1,
        trim: true,
    },
    organizer_name: {
        type: String,
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
    location: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
    }
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;
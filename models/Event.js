import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 150,
        trim: true,
    },
    more_info: {
        type: String,
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
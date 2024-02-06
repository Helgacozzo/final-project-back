import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const schema = new Schema({
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
    }
}, { timestamps: true });

const Event = model('Event', schema);

export default Event;

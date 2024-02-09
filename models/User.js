import mongoose from "mongoose";

const Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

const User = model('User', Schema);

export default User;

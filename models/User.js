import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;
import validator from "validator";
import { comparePassword, hashPassword } from "../lib/authHelper.js";
import { StatusError } from "../lib/errorHelper.js";
const { isStrongPassword, isEmail } = validator;

const strongPasswordOptions = {
    minLength: 8,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1,
}

const schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

schema.statics.findByEmail = function(email){
    return this.findOne({email});
}

schema.statics.signUp = async function (email, password){

    if(!isEmail(email)){
        throw StatusError(400, 'You should send a real email.')
    }

    if(!isStrongPassword(password, strongPasswordOptions)){
        throw StatusError(400, 'Password not strong enough.')
    }

    const emailExists = await this.exists({email});
    if(emailExists){
        throw StatusError(400, 'Email already in use.')
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.create({email, password: hashedPassword});
    
    return user;
}

schema.statics.logIn = async function(email, password){

    const user = await this.findByEmail(email);

    const fail = () => {
        throw StatusError(401, 'Incorrect Email or Password.');
    }

    if(!user){
        fail();
    }

    const passwordMatch = await comparePassword(password, user.password);
    if(!passwordMatch){
        fail();
    }

    return user;

}

schema.methods.clean = function(){
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user._id;
    return user;
}

const User = model('User', schema);

export default User;
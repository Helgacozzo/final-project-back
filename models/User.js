import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
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

schema.statics.findByEmail = function(email){
    return this.findOne(email);
}

schema.statics.signUp = async function (email, password){

    if(!isEmail(email)){
        throw StatusError(400, `Dovresti inserire un email reale`)
    }

    if(!isStrongPassword(password, strongPasswordOptions)){
        throw StatusError(400, `La password non è abbastanza forte`)
    }

    const emailExists = await this.exists(email);
    if(emailExists){
        throw StatusError(400, `Questa email esiste già`)
    }

    const user = await this.create(email);
    
    return user;
}

schema.statics.logIn = async function(email, password){

    const user = await this.findByEmail(email);

    const fail = () => {
        throw StatusError(401, 'Email o Password non corretti');
    }

    if(!user){
        fail();
    }

    if(user.password !== password){
        fail();
    }

    return user;

}

const User = model('User', schema);

export default User;

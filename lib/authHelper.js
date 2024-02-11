import bcrypt from "bcrypt";
import dotenv from "dotenv"; dotenv.config();
const { PEPPER_KEY, SECRET_KEY } = process.env;
import jwt from "jsonwebtoken";


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const combined = password + PEPPER_KEY;
    const hashedPassword = bcrypt.hash(combined, salt);

    return hashedPassword;  
}

export const comparePassword = async (password, hashedPassword) => {
    const combined = password + PEPPER_KEY;
    const match = await bcrypt.compare(combined, hashedPassword);

    return match;
}



export const generateToken = (_id) => {
    const token = jwt.sign(
        { _id },
        SECRET_KEY,
        { expiresIn: '3d' }
    );
    return token;
}



export const verifyToken = (token) => {
    const verified = jwt.verify(token, SECRET_KEY);
    return verified;
}

export const requireAuth = () => {

        try{
    
            const { authorization }= req.headers;
    
            if(!authorization){
                throw new Error(`Token required.`);
            }

            const token = authorization.split(' ')[1];
            if(!token){
                throw new Error(`Token required.`);
            }

            verifyToken(token);

        }catch(error){
            console.error(error.message);
            return res.status(401).send(`Request is not authorized: ${error.message}`);
        }
    
        next();

    }
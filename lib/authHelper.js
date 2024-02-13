import bcrypt from "bcrypt";
import dotenv from "dotenv"; dotenv.config();
const { PEPPER_KEY, SECRET_KEY } = process.env;
import jwt from "jsonwebtoken";
import User from "../models/User.js";


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
    const { _id } = jwt.verify(token, SECRET_KEY);
    return _id;
}



export const requireAuth = () => {
    return async (req, res, next) => {
        try {

            const { authorization } = req.headers;

            if (!authorization) {
                throw new Error(`Token richiesto.`);
            }

            const token = authorization.split(' ')[1];
            if (!token) {
                throw new Error(`Token richiesto.`);
            }

            const _id = verifyToken(token);

            const user = await User.findById(_id);
            if (!user) {
                throw new Error('User non trovato');
            }

            req.user = user;

        } catch (error) {
            console.error(error.message);
            return res.status(401).send(`Richiesta non autorizzata: ${error.message}`);
        }

        next();
    }
}

export const requireAdmin = () => {
    return async (req, res, next) => {
        try {
            const { user } = req;

            if (!user.is_admin) {
                throw new Error('Autorizzazione negata');
            }

            next();
        } catch (error) {
            console.error(error.message);
            return res.status(401).send(`Richiesta non autorizzata: ${error.message}`);
        }
    }
}

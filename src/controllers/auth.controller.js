import User from '../models/user.model.js';

//Bcryptjs -> Sistema de cifrado de la contraseña
import bcrypt from 'bcryptjs';
//implementacion del Token
import {createAccessToken} from '../libs/jwt.js';

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res)=>{
    const { email, password, username} = req.body;
    try{
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(['The email already in use']);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: passwordHash,
            username
        });
        const userSaved = await newUser.save()    // Guardar el nuevo usuario en la base de datos 
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al registrar el usuario'});
    }

    
}
export const login = async (req, res)=>{
    const { email, password} = req.body;
    try{
        const userFound = await User.findOne({email})
        if(!userFound)return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({message: "Incorrect password"});
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}
    
export const logout = (req, res)=>{
    res.cookie('token',"", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const verifyToken = async (req, res)=>{
    const {token}=req.cookies

    if(!token)return res.status(401).json({message: "Unautorized"});
    jwt.verify(token, TOKEN_SECRET,async (err, user)=>{
        if(err) return res.status(401).json({message: 'Unauthorized'});
        
        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({ message: 'Unauthorized'});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}

export const profile = async (req, res)=>{
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json({
        message: "User not found"
    });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    res.send('Profile')
}
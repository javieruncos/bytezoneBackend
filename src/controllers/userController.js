import User from "../models/users.model.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    console.log(req.body)
    try {
        const {username, email, password,confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message:"Las contraseñas no coinciden"})
        }


        const userFound = await User.findOne({email});
        //verificamos si el usuario ya esta registrado
        if(userFound){
            return res.status(400).json({message:"El usuario ya esta registrado"})
        }
        
        //creamos el usuario
        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();

        res.status(201).json({message:"Usuario creado"})
    } catch (error) {
        res.status(500).json({message:"Error al crear el usuario", error})
    }
}
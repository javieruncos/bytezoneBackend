import nodemailer from 'nodemailer';

export const createTransporter = ()=>{
    return nodemailer.createTransport({
        auth:"mi email",
        pass:"mi contraseña"
    
    })
}
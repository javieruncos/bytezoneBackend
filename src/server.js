import * as dotenv from 'dotenv';
import {app} from './app.js';
import connectDb from './config/db.js';

dotenv.config();

//configuramos el puerto
const PORT = process.env.PORT || 4000;
//iniciamos el servidor
connectDb()

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
//creamos una instancia de mongoose
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        //creamos la conexion
        await mongoose.connect(process.env.MONGO_URI);
        //imprimimos en consola
        console.log('DB conectada');
    } catch (error) {
        //imprimimos en consola el error de la conexion
        console.log(error);
        //cerramos el proceso
        process.exit(1);
    
    }
}

export default connectDb
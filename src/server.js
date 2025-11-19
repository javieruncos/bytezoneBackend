import * as dotenv from 'dotenv';
import app from './app.js';
import connectDb from './config/db.js';

dotenv.config();

//configuramos el puerto
const PORT = process.env.PORT || 4000;
//iniciamos el servidor
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

startServer();
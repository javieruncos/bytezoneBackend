//creamos una instancia de mongoose
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    process.exit(1);
  }
};


export default connectDb
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRouter from './routes/products.routes.js';
import userRouter from './routes/userRoutes.js';
import contactRouter from './routes/contact.routes.js';



//creamos una instancia de express
 const app = express();

//middlewares
//cors para permitir peticiones de otros dominios
app.use(cors());
//morgan para ver las peticiones
app.use(morgan('dev'));
//express.json para recibir json
app.use(express.json());

app.use('/uploads', express.static('uploads'));

//configuramos las rutas
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/contact", contactRouter);

export default app;
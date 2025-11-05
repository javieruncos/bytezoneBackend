import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updatePriducts } from '../controllers/products.controllers.js';
//creamos una instancia de express
const router = express.Router();
//configuramos las rutas
router.get('/', getProducts);

router.post("/", createProduct);

router.get("/:id", getProductsById);

router.put("/:id", updatePriducts);

router.delete("/:id", deleteProduct);

export default router;

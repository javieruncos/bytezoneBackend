import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updatePriducts } from '../controllers/products.controllers.js';
import { createProductValidation } from '../validations/products.validation.js';
import { handleValidatorErrors } from '../middlewares/validationResult.js';
//creamos una instancia de express
const router = express.Router();
//configuramos las rutas
router.get('/', getProducts);

router.post("/", createProductValidation,handleValidatorErrors,createProduct);

router.get("/:id", getProductsById);

router.put("/:id", createProductValidation, handleValidatorErrors, updatePriducts);

router.delete("/:id", deleteProduct);

export default router;

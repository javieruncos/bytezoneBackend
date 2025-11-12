import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateProducts } from '../controllers/products.controllers.js';
import { createProductValidation } from '../validations/products.validation.js';
import { handleValidatorErrors } from '../middlewares/validationResult.js';
import  {upload}  from '../config/multer.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';
//creamos una instancia de express
const router = express.Router();
//configuramos las rutas
router.get('/', getProducts);

router.post("/",verifyAdmin,upload.array("images", 5), createProductValidation,handleValidatorErrors,createProduct);

router.get("/:id", getProductsById);

router.put("/:id",upload.array("images"),verifyAdmin, createProductValidation, handleValidatorErrors, updateProducts);

router.delete("/:id",verifyAdmin, deleteProduct);

export default router;

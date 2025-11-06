import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updatePriducts } from '../controllers/products.controllers.js';
import { createProductValidation } from '../validations/products.validation.js';
import { handleValidatorErrors } from '../middlewares/validationResult.js';
import  {upload}  from '../config/multer.js';
//creamos una instancia de express
const router = express.Router();
//configuramos las rutas
router.get('/', getProducts);

router.post("/",upload.single("image"), createProductValidation,handleValidatorErrors,createProduct);

router.get("/:id", getProductsById);

router.put("/:id",upload.array("images"), createProductValidation, handleValidatorErrors, updatePriducts);

router.delete("/:id", deleteProduct);

export default router;

import { body } from "express-validator";


export const createProductValidation = [
    body("name")
    .notEmpty().withMessage("El nombre es requerido") //valida que el nombre no este vacio
    .isString().withMessage("El nombre debe ser una cadena de texto"),

    body("price")
    .notEmpty().withMessage("El precio es requerido") //valida que el precio no este vacio
    .isNumeric().withMessage("El precio debe ser un número"), //valida que el precio sea un número
    
    body("type").notEmpty().withMessage("El tipo es requerido"), //valida que el tipo no este vacio

    //valida que el tipo no este vacio,es opcional y debe ser numerico
    body("discount").optional().isNumeric().withMessage("El descuento debe ser un número"),
    //rating es opcional y debe ser numerico
    body("rating").optional().isNumeric().withMessage("El rating debe ser un número"),

    body("color").optional().isString().withMessage("El color debe ser una cadena de texto"),

    body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto"),

    //valida que las imagenes sean un array
    body("images.*")
    .optional()
    .isURL().withMessage("Cada imagen debe ser una URL válida"),

    //valida que las imagenes sean un array
    body("images")
    .optional()
    .isArray().withMessage("Las imágenes deben ser un array"),

    //valida que specs sea un objeto
    body("specs")
    .optional()
    .isObject().withMessage("Specs debe ser un objeto"),

]
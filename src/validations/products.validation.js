import { body } from "express-validator";


export const createProductValidation = [
    body("name")
        .notEmpty().withMessage("El nombre es requerido")
        .isString().withMessage("El nombre debe ser una cadena de texto"),

    body("price")
        .notEmpty().withMessage("El precio es requerido")
        // Primero validamos que sea un string (así llega) y luego que contenga un número.
        .isString().withMessage("El precio debe ser un string")
        .isNumeric().withMessage("El precio debe ser un valor numérico"),

    body("type")
        .notEmpty().withMessage("El tipo es requerido")
        .isString().withMessage("El tipo debe ser una cadena de texto"),

    body("discount")
        .optional()
        .isString().withMessage("El descuento debe ser un string")
        .isNumeric().withMessage("El descuento debe ser un valor numérico"),

    body("rating")
        .optional()
        .isString().withMessage("El rating debe ser un string")
        // Usamos isFloat para permitir decimales como 4.7
        .isFloat({ min: 0, max: 5 }).withMessage("El rating debe ser un número entre 0 y 5"),

    body("color")
        .optional()
        .isString().withMessage("El color debe ser una cadena de texto"),

    body("description")
        .optional()
        .isString().withMessage("La descripción debe ser una cadena de texto"),

    // Las validaciones de 'images' se eliminan. Multer ya gestionó los archivos.
    // La validación de tipo de archivo/tamaño se hace en la configuración de Multer (fileFilter).

    body("specs")
        .optional()
        .isString().withMessage("El campo specs debe ser un string")
        // Validación personalizada para asegurar que el string es un JSON válido.
        .custom(value => {
            try {
                JSON.parse(value);
                return true; // El string es un JSON válido
            } catch (e) {
                // El string no se pudo parsear, por lo tanto no es un JSON válido.
                throw new Error("El campo specs debe ser un objeto con formato JSON válido");
            }
        }),
];
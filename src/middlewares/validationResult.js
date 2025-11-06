import { validationResult } from "express-validator";

export const handleValidatorErrors = (req,res,next) => {
    //obtenemos los errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
}
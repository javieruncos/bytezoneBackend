import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    //destino de las imagenes
    destination : (req,file,cb)=>{
        cb(null,"uploads");
    },
    //nombre de las imagenes con la extension
    filename : (req,file,cb)=>{
        //obtenemos la extension
        const ext = path.extname(file.originalname);
        //concatenamos la fecha y la extension para que no se repitan los nombres
        cb(null,`${Date.now()}${ext}`);
    }
})

export const upload = multer({storage});
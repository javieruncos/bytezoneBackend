import Product from "../models/products.models.js";


//funcion para obtener todos los productos
export const getProducts =async (req,res)=>{
   try {
    const ListProducts = await Product.find();    
    res.json(ListProducts);
   } catch (error) {
    res.status(500).json({
        message:"Error al obtener los productos",
        error
    })
   }
}

export const createProduct = async (req,res)=>{
   try {
     //obtenemos la url de la imagen y la guardamos
    const imageUrl = req.file? `/uploads/${req.file.filename}`: null;
    //creamos el producto con los datos del body
    const newProduct = new Product({
        ...req.body,
        images:imageUrl //agregamos la url de la imagen
    });
    //guardamos el producto en la base de datos
    const saveProduct = await newProduct.save();
    //enviamos la respuesta
    res.status(201).json(saveProduct);
   } catch (error) {
    res.status(500).json({
        message:error.message
    })
   }
}

export const getProductsById =async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message:'Producto no encontrado'
            })  
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message:"Error al obtener el producto",
            error
        })
    
    }
}


export const updatePriducts = async (req,res)=>{
    try {
        //buscamos el producto por id para actualizar
        const updatedProduct  = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        //si no se encuentra el producto retornamos un error
        if(!updatedProduct){
            return res.status(404).json({
                message:'Producto no encontrado'
            })  
        }
        //enviamos la respuesta
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message:"Error al obtener el producto",
            error
        })
    }
}


export const deleteProduct = async (req,res)=>{
    try {
        //buscamos el producto por id para eliminar
        const deletedProduct  = await Product.findByIdAndDelete(req.params.id);
        //si no se encuentra el producto retornamos un error
        if(!deletedProduct){
            return res.status(404).json({
                message:'Producto no encontrado'
            })  
        }
        res.json({
            message:"Producto eliminado",
            deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message:"Error al obtener el producto",
            error
        })
    }
}
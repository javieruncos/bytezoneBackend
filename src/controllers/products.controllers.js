import Product from "../models/products.models.js";
import { v2 as cloudinary } from "cloudinary";

//funcion para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const ListProducts = await Product.find();
    res.json(ListProducts);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message || error.toString(),
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);
    console.log("ARCHIVOS RECIBIDOS:", req.files);

    // 1. Extraer y procesar los campos del body
    const { name, price, type, discount, rating, color, description, specs } =
      req.body;

    // 2. Procesar las imágenes desde req.files (plural)
    // req.files es un array de archivos. Si no se sube ninguno, será undefined.
    const images =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    // 3. Parsear el string de 'specs' para convertirlo en un objeto
    let parsedSpecs = {};
    if (specs) {
      if (typeof specs === "string") {
        try {
          parsedSpecs = JSON.parse(specs);
        } catch (parseError) {
          return res.status(400).json({
            message: "El formato del campo 'specs' no es un JSON válido.",
          });
        }
      } else if (typeof specs === "object") {
        parsedSpecs = specs;
      }
    }

    // 4. Crear la nueva instancia del producto con los datos procesados
    const newProduct = new Product({
      name,
      price: Number(price), // Convertir a número
      type,
      discount: discount ? Number(discount) : undefined,
      rating: rating ? Number(rating) : undefined,
      color,
      description,
      images, // Guardar el array de URLs de las imágenes
      specs: parsedSpecs,
    });

    // 5. Guardar el producto en la base de datos
    const savedProduct = await newProduct.save();

    // 6. Enviar la respuesta con el producto creado
    res.status(201).json(savedProduct);
  } catch (error) {
    // Capturar cualquier otro error y enviarlo en la respuesta
    console.error("🔥 Error al crear el producto:", error);

    res.status(500).json({
      message: "Error interno del servidor al crear el producto.",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el producto",
      error,
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Buscar el producto para obtener la lista de imágenes antiguas
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // 2. Construir el objeto de actualización de forma segura
    const dataToUpdate = { ...req.body };

    // 3. Parsear 'specs' si llega como string JSON
    if (dataToUpdate.specs && typeof dataToUpdate.specs === "string") {
      dataToUpdate.specs = JSON.parse(dataToUpdate.specs);
    }

    // 4. Manejar las imágenes
    const deleted = Array.isArray(req.body.deletedImages)
      ? req.body.deletedImages
      : [req.body.deletedImages].filter(Boolean);

    for (const public_id of deleted) {
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (err) {
        console.error(`No se pudo borrar ${public_id}`, err);
      }
    }

    const remainingImages = product.images.filter(
      (img) => !deleted.includes(img.public_id)
    );

    const newImages =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    dataToUpdate.images = [...remainingImages, ...newImages];

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: dataToUpdate },
      { new: true, runValidators: true }
    );

    
    res.json(updatedProduct);
    
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //buscamos el producto por id para eliminar
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    //si no se encuentra el producto retornamos un error
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.json({
      message: "Producto eliminado",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el producto",
      error,
    });
  }
};

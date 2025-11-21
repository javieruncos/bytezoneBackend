import mongoose from "mongoose";
//creamos el esquema de specs para que sea un objeto flexible
const specsSchema = new mongoose.Schema(
  {
    type: { type: String },
    connection: { type: String },
    microphone: { type: Boolean },
    compatibility: { type: String },
    vibration: { type: Boolean },
    switchType: { type: String },
    backlight: { type: String },
    dpi: { type: Number },
    rgb: { type: Boolean },
    cpu: { type: String },
    gpu: { type: String },
    ram: { type: String },
    storage: { type: String },
    display: { type: String },
    size: { type: String },
    resolution: { type: String },
    refreshRate: { type: String },
    panel: { type: String },
  },
  { _id: false } // no genera un id interno por cada specs
);

//creamos el esquema de productos
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    color: {
      type: String,
      default: "Negro",
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    specs: specsSchema, // objeto con detalles específicos
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

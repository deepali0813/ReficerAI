import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    handlingInstructions: {
      type: String,
      required: true,
    },
    commonIssues: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    documentUrls: {
      type: [String],
      default: [],
    },
    mossIndexId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
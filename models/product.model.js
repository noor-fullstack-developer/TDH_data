const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },

    title: { type: String, required: true },

    category: [{ type: String }],

    topSellingScore: { type: Number, default: 0 },

    pricing: {
      mrp: { type: Number, required: true },
      salePrice: { type: Number, required: true },
      discountPercentage: { type: Number },
    },

    inventory: {
      stock: { type: Number, default: 0 },
      status: { type: String, enum: ["in-stock", "out-of-stock"], default: "in-stock" },
    },

    ratings: {
      average: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    variants: [
      {
        color: { type: String, required: true },
        images: [{ type: String }], 
      },
    ],

    description: [{ type: String }],

    specifications: [specificationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
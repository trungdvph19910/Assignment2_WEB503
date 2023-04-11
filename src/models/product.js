import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }


})
export default mongoose.model("Product", productSchema)

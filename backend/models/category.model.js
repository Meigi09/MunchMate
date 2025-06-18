import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,    
    enum: ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts", "Fastfood"],
  },  
  isActive: {
    type: Boolean,
    default: true,
  },
},
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;

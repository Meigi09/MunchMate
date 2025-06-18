import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menu: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "FoodItem",
    required: true,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  deliveries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }],  
  isActive: {
    type: Boolean,
    default: true,
  },
},
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

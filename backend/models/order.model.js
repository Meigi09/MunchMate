import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  orderItems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "OrderItem",
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled", "failed"],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash", "card", "upi", "cod"],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "paid", "failed", "refunded"],
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,    
  },  
},
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

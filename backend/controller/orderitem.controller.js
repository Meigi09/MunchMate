import OrderItem from "../models/order-item.model.js";
import mongoose from "mongoose";

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({})
      .populate('order', 'total status')
      .populate('foodItem', 'name price');
    res.status(200).json({ success: true, data: orderItems });
  } catch (error) {
    console.log("Error in retrieving order items:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getOrderItemById = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order Item ID" });
  }
  
  try {
    const orderItem = await OrderItem.findById(id)
      .populate('order', 'total status')
      .populate('foodItem', 'name price');
    if (!orderItem) {
      return res.status(404).json({ success: false, message: "Order item not found" });
    }
    res.status(200).json({ success: true, data: orderItem });
  } catch (error) {
    console.log("Error in retrieving order item:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createOrderItem = async (req, res) => {
  const { order, foodItem, quantity, price } = req.body; 

  if (!order || !foodItem || !quantity || !price) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const newOrderItem = new OrderItem({ order, foodItem, quantity, price }); 
    await newOrderItem.save();
    res.status(201).json({ success: true, data: newOrderItem });
  } catch (error) {
    console.log("Error creating Order Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrderItem = async (req, res) => {
  const {id} = req.params;
  const { order, foodItem, quantity, price } = req.body;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order Item ID" });
  }
  
  try {
    const orderItemUpdate = await OrderItem.findByIdAndUpdate(id, { order, foodItem, quantity, price }, { new: true });
    if (!orderItemUpdate) {
      return res.status(404).json({ success: false, message: "Order item not found" });
    }
    res.status(200).json({ success: true, data: orderItemUpdate });
  } catch (error) {
    console.log("Error updating Order Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteOrderItem = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order Item ID" });
  }
  
  try {
    const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
    if (!deletedOrderItem) {
      return res.status(404).json({ success: false, message: "Order item not found" });
    }
    res.status(200).json({ success: true, message: "Order item deleted successfully" });
  } catch (error) {
    console.log("Error deleting Order Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getOrderItemsByOrder = async (req, res) => {
  const {orderId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(orderId)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }
  
  try {
    const orderItems = await OrderItem.find({ order: orderId })
      .populate('order', 'total status')
      .populate('foodItem', 'name price');
    res.status(200).json({ success: true, data: orderItems });
  } catch (error) {
    console.log("Error in retrieving order items by order:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('orderItems');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in retrieving orders:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getOrderById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const order = await Order.findById(id)
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('orderItems');
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log("Error in retrieving order:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createOrder = async (req, res) => {
  const { customer, restaurant, orderItems, total, status, paymentMethod, paymentStatus, deliveryAddress } = req.body;

  if (!customer || !restaurant || !orderItems || !total || !status || !paymentMethod || !paymentStatus || !deliveryAddress) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const newOrder = new Order({
      customer,
      restaurant,
      orderItems,
      total,
      status,
      paymentMethod,
      paymentStatus,
      deliveryAddress
    });
    const savedOrder = await newOrder.save();

    // Add order to restaurant's orders array
    await Restaurant.findByIdAndUpdate(
      restaurant,
      { $addToSet: { orders: savedOrder._id } }
    );

    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.log("Error creating Order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrder = async (req, res) => {
  const {id} = req.params;
  const { customer, restaurant, orderItems, total, status, paymentMethod, paymentStatus, deliveryAddress } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const orderUpdate = await Order.findByIdAndUpdate(id, {
      customer,
      restaurant,
      orderItems,
      total,
      status,
      paymentMethod,
      paymentStatus,
      deliveryAddress
    }, { new: true });
    if (!orderUpdate) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: orderUpdate });
  } catch (error) {
    console.log("Error updating Order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrderStatus = async (req, res) => {
  const {id} = req.params;
  const { status } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  if (!status || !["pending", "confirmed", "delivered", "cancelled", "failed"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const orderUpdate = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!orderUpdate) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: orderUpdate });
  } catch (error) {
    console.log("Error updating Order status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteOrder = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Remove order from restaurant's orders array
    await Restaurant.findByIdAndUpdate(
      deletedOrder.restaurant,
      { $pull: { orders: deletedOrder._id } }
    );

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error deleting Order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getOrdersByCustomer = async (req, res) => {
  const {customerId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(customerId)){
    return res.status(404).json({ success: false, message: "Invalid Customer ID" });
  }

  try {
    const orders = await Order.find({ customer: customerId })
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('orderItems');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in retrieving orders by customer:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getOrdersByRestaurant = async (req, res) => {
  const {restaurantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const orders = await Order.find({ restaurant: restaurantId })
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('orderItems');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in retrieving orders by restaurant:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

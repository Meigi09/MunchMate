import Delivery from "../models/delivery.model.js";
import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({})
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.log("Error in retrieving deliveries:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getDeliveryById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Delivery ID" });
  }

  try {
    const delivery = await Delivery.findById(id)
      .populate('order', 'customer restaurant total status orderItems')
      .populate('deliveryPerson', 'name email phone');
    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }
    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    console.log("Error in retrieving delivery:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createDelivery = async (req, res) => {
  const { 
    order, 
    deliveryPerson, 
    status, 
    estimatedDeliveryTime, 
    deliveryAddress, 
    deliveryInstructions, 
    deliveryFee 
  } = req.body;

  if (!order || !deliveryAddress) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide all required fields (order, deliveryAddress)" 
    });
  }

  try {
    const newDelivery = new Delivery({
      order,
      deliveryPerson,
      status: status || "pending",
      estimatedDeliveryTime,
      deliveryAddress,
      deliveryInstructions,
      deliveryFee: deliveryFee || 0
    });
    
    const savedDelivery = await newDelivery.save();
    
    // Add delivery to restaurant's deliveries array
    if (savedDelivery.order) {
      const orderData = await mongoose.model('Order').findById(savedDelivery.order);
      if (orderData && orderData.restaurant) {
        await Restaurant.findByIdAndUpdate(
          orderData.restaurant,
          { $addToSet: { deliveries: savedDelivery._id } }
        );
      }
    }
    
    res.status(201).json({ success: true, data: savedDelivery });
  } catch (error) {
    console.log("Error creating Delivery:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateDelivery = async (req, res) => {
  const {id} = req.params;
  const { 
    order, 
    deliveryPerson, 
    status, 
    estimatedDeliveryTime, 
    actualDeliveryTime,
    deliveryAddress, 
    deliveryInstructions, 
    deliveryFee 
  } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Delivery ID" });
  }

  try {
    const deliveryUpdate = await Delivery.findByIdAndUpdate(id, {
      order,
      deliveryPerson,
      status,
      estimatedDeliveryTime,
      actualDeliveryTime,
      deliveryAddress,
      deliveryInstructions,
      deliveryFee
    }, { new: true })
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');

    if (!deliveryUpdate) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }
    res.status(200).json({ success: true, data: deliveryUpdate });
  } catch (error) {
    console.log("Error updating Delivery:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateDeliveryStatus = async (req, res) => {
  const {id} = req.params;
  const { status } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Delivery ID" });
  }

  const validStatuses = ["pending", "assigned", "picked_up", "in_transit", "delivered", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid status value. Must be one of: ${validStatuses.join(', ')}` 
    });
  }

  try {
    const deliveryUpdate = await Delivery.findByIdAndUpdate(id, {
      status,
      ...(status === "delivered" && { actualDeliveryTime: new Date() })
    }, { new: true })
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');

    if (!deliveryUpdate) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }
    res.status(200).json({ success: true, data: deliveryUpdate });
  } catch (error) {
    console.log("Error updating delivery status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteDelivery = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Delivery ID" });
  }

  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(id);
    if (!deletedDelivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }
    
    // Remove delivery from restaurant's deliveries array
    if (deletedDelivery.order) {
      const orderData = await mongoose.model('Order').findById(deletedDelivery.order);
      if (orderData && orderData.restaurant) {
        await Restaurant.findByIdAndUpdate(
          orderData.restaurant,
          { $pull: { deliveries: deletedDelivery._id } }
        );
      }
    }
    
    res.status(200).json({ success: true, message: "Delivery deleted successfully" });
  } catch (error) {
    console.log("Error deleting Delivery:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getDeliveriesByOrder = async (req, res) => {
  const {orderId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(orderId)){
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const deliveries = await Delivery.find({ order: orderId })
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.log("Error in retrieving deliveries by order:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getDeliveriesByDeliveryPerson = async (req, res) => {
  const {deliveryPersonId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(deliveryPersonId)){
    return res.status(404).json({ success: false, message: "Invalid Delivery Person ID" });
  }

  try {
    const deliveries = await Delivery.find({ deliveryPerson: deliveryPersonId })
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.log("Error in retrieving deliveries by delivery person:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getDeliveriesByRestaurant = async (req, res) => {
  const {restaurantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    // Find all orders for this restaurant first
    const orders = await mongoose.model('Order').find({ restaurant: restaurantId });
    const orderIds = orders.map(order => order._id);
    
    // Then find deliveries for those orders
    const deliveries = await Delivery.find({ order: { $in: orderIds } })
      .populate('order', 'customer restaurant total status')
      .populate('deliveryPerson', 'name email phone');
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.log("Error in retrieving deliveries by restaurant:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const assignDeliveryPerson = async (req, res) => {
  const {deliveryId} = req.params;
  const {deliveryPersonId} = req.body;

  if(!mongoose.Types.ObjectId.isValid(deliveryId) || !mongoose.Types.ObjectId.isValid(deliveryPersonId)){
    return res.status(404).json({ success: false, message: "Invalid Delivery or Delivery Person ID" });
  }

  try {
    const delivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { 
        deliveryPerson: deliveryPersonId,
        status: "assigned"
      },
      { new: true }
    ).populate('order', 'customer restaurant total status')
     .populate('deliveryPerson', 'name email phone');

    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }

    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    console.log("Error assigning delivery person:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

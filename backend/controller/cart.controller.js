import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const getCartByCustomer = async (req, res) => {
  const {customerId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(customerId)){
    return res.status(404).json({ success: false, message: "Invalid Customer ID" });
  }
  
  try {
    const cart = await Cart.findOne({ customer: customerId, isActive: true })
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('items.foodItem', 'name price image');
    
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log("Error in retrieving cart:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const addToCart = async (req, res) => {
  const { customer, restaurant, foodItem, quantity, price } = req.body; 

  if (!customer || !restaurant || !foodItem || !quantity || !price) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    // Check if cart exists for this customer and restaurant
    let cart = await Cart.findOne({ customer, restaurant, isActive: true });
    
    if (cart) {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(item => 
        item.foodItem.toString() === foodItem
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ foodItem, quantity, price });
      }
    } else {
      // Create new cart
      cart = new Cart({
        customer,
        restaurant,
        items: [{ foodItem, quantity, price }]
      });
    }
    
    await cart.save();
    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    console.log("Error adding to cart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateCartItem = async (req, res) => {
  const {cartId, itemId} = req.params;
  const { quantity } = req.body;
  
  if(!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(itemId)){
    return res.status(404).json({ success: false, message: "Invalid Cart or Item ID" });
  }
  
  if (!quantity || quantity < 1) {
    return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
  }
  
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log("Error updating cart item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeFromCart = async (req, res) => {
  const {cartId, itemId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(itemId)){
    return res.status(404).json({ success: false, message: "Invalid Cart or Item ID" });
  }
  
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log("Error removing from cart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const clearCart = async (req, res) => {
  const {customerId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(customerId)){
    return res.status(404).json({ success: false, message: "Invalid Customer ID" });
  }
  
  try {
    await Cart.updateMany({ customer: customerId }, { isActive: false });
    res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.log("Error clearing cart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

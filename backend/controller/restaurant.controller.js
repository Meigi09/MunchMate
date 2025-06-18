import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true })
      .populate('owner', 'name email')
      .populate('menu', 'name price isAvailable')
      .populate('orders', 'total status createdAt')
      .populate('deliveries', 'status estimatedDeliveryTime')
      .populate('reviews', 'rating comment customer');
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    console.log("Error in retrieving restaurants:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getRestaurantById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const restaurant = await Restaurant.findById(id)
      .populate('owner', 'name email')
      .populate('menu', 'name description price image isAvailable isVegetarian category')
      .populate('orders', 'customer total status paymentStatus createdAt')
      .populate('deliveries', 'deliveryPerson status estimatedDeliveryTime actualDeliveryTime')
      .populate('reviews', 'rating comment customer createdAt');
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error in retrieving restaurant:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createRestaurant = async (req, res) => {
  const { name, description, location, phone, email, image, owner, menu, isActive } = req.body;

  if (!name || !description || !location || !image || !owner) {
    return res.status(400).json({ success: false, message: "Please provide all required fields (name, description, location, image, owner)" });
  }

  // Validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address" });
  }

  try {
    const newRestaurant = new Restaurant({
      name,
      description,
      location,
      phone,
      email,
      image,
      owner,
      menu: menu || [], // Initialize with empty array if not provided
      orders: [],
      deliveries: [],
      reviews: [],
      isActive: isActive !== undefined ? isActive : true
    });
    await newRestaurant.save();
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    console.log("Error creating Restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateRestaurant = async (req, res) => {
  const {id} = req.params;
  const { name, description, location, phone, email, image, owner, isActive } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  // Validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address" });
  }

  try {
    const restaurantUpdate = await Restaurant.findByIdAndUpdate(id, {
      name,
      description,
      location,
      phone,
      email,
      image,
      owner,
      isActive
    }, { new: true })
      .populate('owner', 'name email')
      .populate('menu', 'name price isAvailable')
      .populate('orders', 'total status createdAt')
      .populate('deliveries', 'status estimatedDeliveryTime')
      .populate('reviews', 'rating comment customer');

    if (!restaurantUpdate) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurantUpdate });
  } catch (error) {
    console.log("Error updating Restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteRestaurant = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    // Soft delete by setting isActive to false instead of hard delete
    const deletedRestaurant = await Restaurant.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!deletedRestaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.log("Error deleting Restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRestaurantsByOwner = async (req, res) => {
  const {ownerId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(ownerId)){
    return res.status(404).json({ success: false, message: "Invalid Owner ID" });
  }

  try {
    const restaurants = await Restaurant.find({ owner: ownerId, isActive: true })
      .populate('owner', 'name email')
      .populate('menu', 'name price isAvailable')
      .populate('orders', 'total status createdAt')
      .populate('deliveries', 'status estimatedDeliveryTime')
      .populate('reviews', 'rating comment customer');
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    console.log("Error in retrieving restaurants by owner:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const addReviewToRestaurant = async (req, res) => {
  const {restaurantId, reviewId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(reviewId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Review ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $addToSet: { reviews: reviewId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('reviews', 'rating comment customer');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error adding review to restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeReviewFromRestaurant = async (req, res) => {
  const {restaurantId, reviewId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(reviewId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Review ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { reviews: reviewId } },
      { new: true }
    ).populate('reviews', 'rating comment customer');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error removing review from restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRestaurantStats = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const restaurant = await Restaurant.findById(id).populate('reviews', 'rating');
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    const totalReviews = restaurant.reviews.length;
    const averageRating = totalReviews > 0
      ? restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    const stats = {
      restaurantId: restaurant._id,
      name: restaurant.name,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      isActive: restaurant.isActive
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.log("Error getting restaurant stats:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Menu Management Functions
export const addMenuItemToRestaurant = async (req, res) => {
  const {restaurantId, foodItemId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(foodItemId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Food Item ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $addToSet: { menu: foodItemId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('menu', 'name price isAvailable');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error adding menu item to restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeMenuItemFromRestaurant = async (req, res) => {
  const {restaurantId, foodItemId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(foodItemId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Food Item ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { menu: foodItemId } },
      { new: true }
    ).populate('menu', 'name price isAvailable');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error removing menu item from restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRestaurantMenu = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const restaurant = await Restaurant.findById(id)
      .populate('menu', 'name description price image isAvailable isVegetarian category');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant.menu });
  } catch (error) {
    console.log("Error getting restaurant menu:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Order Management Functions
export const addOrderToRestaurant = async (req, res) => {
  const {restaurantId, orderId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(orderId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Order ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $addToSet: { orders: orderId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('orders', 'customer total status createdAt');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error adding order to restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRestaurantOrders = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const restaurant = await Restaurant.findById(id)
      .populate({
        path: 'orders',
        populate: {
          path: 'customer',
          select: 'name email'
        }
      });

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant.orders });
  } catch (error) {
    console.log("Error getting restaurant orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Delivery Management Functions
export const addDeliveryToRestaurant = async (req, res) => {
  const {restaurantId, deliveryId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId) || !mongoose.Types.ObjectId.isValid(deliveryId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant or Delivery ID" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $addToSet: { deliveries: deliveryId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('deliveries', 'deliveryPerson status estimatedDeliveryTime');

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error adding delivery to restaurant:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRestaurantDeliveries = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const restaurant = await Restaurant.findById(id)
      .populate({
        path: 'deliveries',
        populate: {
          path: 'deliveryPerson',
          select: 'name email phone'
        }
      });

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant.deliveries });
  } catch (error) {
    console.log("Error getting restaurant deliveries:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

import FoodItem from "../models/food-item.model.js";
import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ isAvailable: true })
      .populate('restaurant', 'name location')
      .populate('category', 'name');
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    console.log("Error in retrieving food items:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getFoodItemById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Food Item ID" });
  }

  try {
    const foodItem = await FoodItem.findById(id)
      .populate('restaurant', 'name location')
      .populate('category', 'name');
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, data: foodItem });
  } catch (error) {
    console.log("Error in retrieving food item:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createFoodItem = async (req, res) => {
  const { name, description, price, image, restaurant, category, isAvailable, isVegetarian } = req.body;

  if (!name || !description || !price || !image || !restaurant) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      image,
      restaurant,
      category,
      isAvailable,
      isVegetarian
    });
    const savedFoodItem = await newFoodItem.save();

    // Add food item to restaurant's menu array
    await Restaurant.findByIdAndUpdate(
      restaurant,
      { $addToSet: { menu: savedFoodItem._id } }
    );

    res.status(201).json({ success: true, data: savedFoodItem });
  } catch (error) {
    console.log("Error creating Food Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateFoodItem = async (req, res) => {
  const {id} = req.params;
  const { name, description, price, image, restaurant, category, isAvailable, isVegetarian } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Food Item ID" });
  }

  try {
    const foodItemUpdate = await FoodItem.findByIdAndUpdate(id, {
      name,
      description,
      price,
      image,
      restaurant,
      category,
      isAvailable,
      isVegetarian
    }, { new: true });
    if (!foodItemUpdate) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, data: foodItemUpdate });
  } catch (error) {
    console.log("Error updating Food Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteFoodItem = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Food Item ID" });
  }

  try {
    const deletedFoodItem = await FoodItem.findByIdAndDelete(id);
    if (!deletedFoodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Remove food item from restaurant's menu array
    await Restaurant.findByIdAndUpdate(
      deletedFoodItem.restaurant,
      { $pull: { menu: deletedFoodItem._id } }
    );

    res.status(200).json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.log("Error deleting Food Item:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getFoodItemsByRestaurant = async (req, res) => {
  const {restaurantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(restaurantId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }

  try {
    const foodItems = await FoodItem.find({ restaurant: restaurantId, isAvailable: true })
      .populate('restaurant', 'name location')
      .populate('category', 'name');
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    console.log("Error in retrieving food items by restaurant:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getFoodItemsByCategory = async (req, res) => {
  const {categoryId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(categoryId)){
    return res.status(404).json({ success: false, message: "Invalid Category ID" });
  }

  try {
    const foodItems = await FoodItem.find({ category: categoryId, isAvailable: true })
      .populate('restaurant', 'name location')
      .populate('category', 'name');
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    console.log("Error in retrieving food items by category:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getVegetarianFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ isVegetarian: true, isAvailable: true })
      .populate('restaurant', 'name location')
      .populate('category', 'name');
    res.status(200).json({ success: true, data: foodItems });
  } catch (error) {
    console.log("Error in retrieving vegetarian food items:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

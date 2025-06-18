import Category from "../models/category.model.js";
import mongoose from "mongoose";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.log("Error in retrieving categories:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getCategoryById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Category ID" });
  }

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log("Error in retrieving category:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createCategory = async (req, res) => {
  const { name, description, isActive } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Category name is required" });
  }

  // Validate category name against enum values
  const validCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts", "Fastfood"];
  if (!validCategories.includes(name)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category name. Must be one of: ${validCategories.join(', ')}`
    });
  }

  try {
    const newCategory = new Category({ name, description, isActive });
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.log("Error creating Category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateCategory = async (req, res) => {
  const {id} = req.params;
  const { name, description, isActive } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Category ID" });
  }

  // Validate category name against enum values if name is being updated
  if (name) {
    const validCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts", "Fastfood"];
    if (!validCategories.includes(name)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category name. Must be one of: ${validCategories.join(', ')}`
      });
    }
  }

  try {
    const categoryUpdate = await Category.findByIdAndUpdate(id, { name, description, isActive }, { new: true });
    if (!categoryUpdate) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: categoryUpdate });
  } catch (error) {
    console.log("Error updating Category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteCategory = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Category ID" });
  }

  try {
    // Soft delete by setting isActive to false
    const categoryUpdate = await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!categoryUpdate) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error deleting Category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getCategoryByName = async (req, res) => {
  const {name} = req.params;

  // Validate category name against enum values
  const validCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts", "Fastfood"];
  if (!validCategories.includes(name)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category name. Must be one of: ${validCategories.join(', ')}`
    });
  }

  try {
    const category = await Category.findOne({ name: name, isActive: true });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log("Error in retrieving category by name:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getAvailableCategories = async (req, res) => {
  try {
    const validCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts", "Fastfood"];
    res.status(200).json({
      success: true,
      data: validCategories,
      message: "Available category options"
    });
  } catch (error) {
    console.log("Error getting available categories:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

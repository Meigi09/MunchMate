import Review from "../models/review.model.js";
import mongoose from "mongoose";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('customer', 'name email')
      .populate('restaurant', 'name location');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log("Error in retrieving reviews:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getReviewById = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Review ID" });
  }
  
  try {
    const review = await Review.findById(id)
      .populate('customer', 'name email')
      .populate('restaurant', 'name location');
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.log("Error in retrieving review:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createReview = async (req, res) => {
  const { customer, restaurant, rating, comment } = req.body; 

  if (!customer || !restaurant || !rating) {
    return res.status(400).json({ success: false, message: "Please provide customer, restaurant, and rating" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }

  try {
    const newReview = new Review({ customer, restaurant, rating, comment }); 
    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.log("Error creating Review:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateReview = async (req, res) => {
  const {id} = req.params;
  const { customer, restaurant, rating, comment } = req.body;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Review ID" });
  }

  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }
  
  try {
    const reviewUpdate = await Review.findByIdAndUpdate(id, { customer, restaurant, rating, comment }, { new: true });
    if (!reviewUpdate) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.status(200).json({ success: true, data: reviewUpdate });
  } catch (error) {
    console.log("Error updating Review:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteReview = async (req, res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Review ID" });
  }
  
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error deleting Review:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getReviewsByRestaurant = async (req, res) => {
  const {restaurantId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(restaurantId)){
    return res.status(404).json({ success: false, message: "Invalid Restaurant ID" });
  }
  
  try {
    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('customer', 'name email')
      .populate('restaurant', 'name location');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log("Error in retrieving reviews by restaurant:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getReviewsByCustomer = async (req, res) => {
  const {customerId} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(customerId)){
    return res.status(404).json({ success: false, message: "Invalid Customer ID" });
  }
  
  try {
    const reviews = await Review.find({ customer: customerId })
      .populate('customer', 'name email')
      .populate('restaurant', 'name location');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log("Error in retrieving reviews by customer:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

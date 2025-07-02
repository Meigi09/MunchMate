import User from "../models/User.js";
import Address from "../models/address.model.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate('addresses', 'type street city isDefault isActive')
      .select('-password'); // Exclude password from response
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in retrieving users:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getUserById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(id)
      .populate('addresses', 'type street city isDefault isActive')
      .select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error in retrieving user:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (name, email, password, role)"
    });
  }

  // Validate role
  const validRoles = ["CUSTOMER", "VENDOR", "ADMIN"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
    });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
      addresses: [] // Initialize with empty addresses array
    });
    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    console.log("Error creating User:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}


export const updateUser = async (req, res) => {
  const {id} = req.params;
  const { name, email, password, role } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  // Validate role if provided
  if (role) {
    const validRoles = ["CUSTOMER", "VENDOR", "ADMIN"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
      });
    }
  }

  try {
    const userUpdate = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true })
      .populate('addresses', 'type street city isDefault isActive')
      .select('-password'); // Exclude password from response

    if (!userUpdate) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: userUpdate });
  } catch (error) {
    console.log("Error updating User:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Also delete all addresses associated with this user
    await Address.deleteMany({ user: id });

    res.status(200).json({ success: true, message: "User and associated addresses deleted successfully" });
  } catch (error) {
    console.log("Error deleting User:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Address Management Functions for Users
export const addAddressToUser = async (req, res) => {
  const {userId, addressId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(addressId)){
    return res.status(404).json({ success: false, message: "Invalid User or Address ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { addresses: addressId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate('addresses', 'type street city isDefault isActive')
     .select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error adding address to user:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeAddressFromUser = async (req, res) => {
  const {userId, addressId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(addressId)){
    return res.status(404).json({ success: false, message: "Invalid User or Address ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: addressId } },
      { new: true }
    ).populate('addresses', 'type street city isDefault isActive')
     .select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error removing address from user:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getUsersByRole = async (req, res) => {
  const {role} = req.params;

  const validRoles = ["CUSTOMER", "VENDOR", "ADMIN"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
    });
  }

  try {
    const users = await User.find({ role: role })
      .populate('addresses', 'type street city isDefault isActive')
      .select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in retrieving users by role:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

import Address from "../models/address.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ isActive: true })
      .populate('user', 'name email');
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.log("Error in retrieving addresses:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getAddressById = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Address ID" });
  }

  try {
    const address = await Address.findById(id)
      .populate('user', 'name email');
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.log("Error in retrieving address:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const createAddress = async (req, res) => {
  const { user, type, street, city, isDefault, isActive } = req.body;

  if (!user || !street || !city) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (user, street, city)"
    });
  }

  // Validate user ID
  if(!mongoose.Types.ObjectId.isValid(user)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  // Validate type if provided
  const validTypes = ["home", "work", "other"];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid address type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  try {
    const newAddress = new Address({
      user,
      type: type || "home",
      street,
      city,
      isDefault: isDefault || false,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedAddress = await newAddress.save();

    // Add address to user's addresses array
    await User.findByIdAndUpdate(
      user,
      { $addToSet: { addresses: savedAddress._id } }
    );

    res.status(201).json({ success: true, data: savedAddress });
  } catch (error) {
    console.log("Error creating Address:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateAddress = async (req, res) => {
  const {id} = req.params;
  const { user, type, street, city, isDefault, isActive } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Address ID" });
  }

  // Validate user ID if provided
  if(user && !mongoose.Types.ObjectId.isValid(user)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  // Validate type if provided
  const validTypes = ["home", "work", "other"];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid address type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  try {
    const addressUpdate = await Address.findByIdAndUpdate(id, {
      user,
      type,
      street,
      city,
      isDefault,
      isActive
    }, { new: true })
      .populate('user', 'name email');

    if (!addressUpdate) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, data: addressUpdate });
  } catch (error) {
    console.log("Error updating Address:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteAddress = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid Address ID" });
  }

  try {
    // Get the address first to know which user to update
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Soft delete by setting isActive to false
    const addressUpdate = await Address.findByIdAndUpdate(id, { isActive: false }, { new: true });

    // Remove address from user's addresses array
    await User.findByIdAndUpdate(
      address.user,
      { $pull: { addresses: id } }
    );

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log("Error deleting Address:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAddressesByUser = async (req, res) => {
  const {userId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const addresses = await Address.find({ user: userId, isActive: true })
      .populate('user', 'name email')
      .sort({ isDefault: -1, createdAt: -1 }); // Default addresses first, then by creation date
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.log("Error in retrieving addresses by user:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const getUserDefaultAddress = async (req, res) => {
  const {userId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const defaultAddress = await Address.findOne({
      user: userId,
      isDefault: true,
      isActive: true
    }).populate('user', 'name email');

    if (!defaultAddress) {
      return res.status(404).json({ success: false, message: "No default address found for this user" });
    }

    res.status(200).json({ success: true, data: defaultAddress });
  } catch (error) {
    console.log("Error in retrieving default address:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const setDefaultAddress = async (req, res) => {
  const {addressId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(addressId)){
    return res.status(404).json({ success: false, message: "Invalid Address ID" });
  }

  try {
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Remove default from all other addresses for this user
    await Address.updateMany(
      { user: address.user, _id: { $ne: addressId } },
      { isDefault: false }
    );

    // Set this address as default
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { isDefault: true },
      { new: true }
    ).populate('user', 'name email');

    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.log("Error setting default address:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAddressesByType = async (req, res) => {
  const {type} = req.params;

  const validTypes = ["home", "work", "other"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid address type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  try {
    const addresses = await Address.find({ type: type, isActive: true })
      .populate('user', 'name email')
      .sort({ isDefault: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.log("Error in retrieving addresses by type:", error.message);
    res.status(500).json({success: false, message: "Server Error"})
  }
}

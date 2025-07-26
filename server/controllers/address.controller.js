import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Get all addresses for a user
export async function getUserAddressesController(req, res) {
  try {
    const userId = req.userId; // From auth middleware

    const user = await UserModel.findById(userId).populate('address_details');
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Addresses retrieved successfully",
      error: false,
      success: true,
      data: user.address_details,
    });
  } catch (error) {
    console.error("Error in getUserAddressesController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get single address
export async function getAddressController(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const address = await AddressModel.findById(id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }

    // Check if this address belongs to the current user
    const user = await UserModel.findById(userId);
    if (!user.address_details.includes(address._id)) {
      return res.status(403).json({
        message: "Access denied",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Address retrieved successfully",
      error: false,
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Error in getAddressController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Create new address
export async function createAddressController(req, res) {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;

    // Validate required fields
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    // Create new address
    const newAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    });

    const savedAddress = await newAddress.save();

    // Add address to user's address_details array
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { address_details: savedAddress._id }
      }
    );

    return res.status(201).json({
      message: "Address created successfully",
      error: false,
      success: true,
      data: savedAddress,
    });
  } catch (error) {
    console.error("Error in createAddressController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Update address
export async function updateAddressController(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    // Check if address exists and belongs to user
    const user = await UserModel.findById(userId);
    if (!user.address_details.includes(id)) {
      return res.status(403).json({
        message: "Access denied",
        error: true,
        success: false,
      });
    }

    const updatedAddress = await AddressModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Address updated successfully",
      error: false,
      success: true,
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error in updateAddressController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Delete address
export async function deleteAddressController(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if address exists and belongs to user
    const user = await UserModel.findById(userId);
    if (!user.address_details.includes(id)) {
      return res.status(403).json({
        message: "Access denied",
        error: true,
        success: false,
      });
    }

    // Delete address
    const deletedAddress = await AddressModel.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }

    // Remove address from user's address_details array
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { address_details: id }
      }
    );

    return res.status(200).json({
      message: "Address deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteAddressController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

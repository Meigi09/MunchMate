import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Can be null if not assigned yet
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "assigned", "picked_up", "in_transit", "delivered", "cancelled"],
    default: "pending",
  },
  estimatedDeliveryTime: {
    type: Date,
    required: false,
  },
  actualDeliveryTime: {
    type: Date,
    required: false,
  },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    landmark: { type: String, required: false },
  },
  deliveryInstructions: {
    type: String,
    required: false,
  },
  deliveryFee: {
    type: Number,
    required: true,
    default: 0,
  },
  trackingUpdates: [{
    status: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    notes: {
      type: String,
      required: false,
    },
  }],
},
  {
    timestamps: true,
  }
);

// Add tracking update when status changes
deliverySchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.trackingUpdates.push({
      status: this.status,
      timestamp: new Date(),
    });
  }
  next();
});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;

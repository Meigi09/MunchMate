import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import foodItemRoutes from "./routes/fooditem.route.js";
import orderRoutes from "./routes/order.route.js";
import orderItemRoutes from "./routes/orderitem.route.js";
import reviewRoutes from "./routes/review.route.js";
import categoryRoutes from "./routes/category.route.js";
import cartRoutes from "./routes/cart.route.js";
import deliveryRoutes from "./routes/delivery.route.js";
import addressRoutes from "./routes/address.route.js";
import { swaggerDocs } from "./swaggerConfig.js"; // Changed to import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MunchMate API is running!",
    timestamp: new Date().toISOString(),
    endpoints: {
      users: "/api/users",
      restaurants: "/api/restaurants",
      fooditems: "/api/fooditems",
      orders: "/api/orders",
      orderitems: "/api/orderitems",
      reviews: "/api/reviews",
      categories: "/api/categories",
      cart: "/api/cart",
      deliveries: "/api/deliveries",
      addresses: "/api/addresses",
      swagger: "/api-docs"
    }
  });
});

// Register all routes
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/fooditems", foodItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderitems", orderItemRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/addresses", addressRoutes);

// Initialize Swagger
swaggerDocs(app, PORT);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
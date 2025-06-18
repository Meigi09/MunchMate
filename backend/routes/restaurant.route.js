import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsByOwner,
  addReviewToRestaurant,
  removeReviewFromRestaurant,
  getRestaurantStats,
  addMenuItemToRestaurant,
  removeMenuItemFromRestaurant,
  getRestaurantMenu,
  addOrderToRestaurant,
  getRestaurantOrders,
  addDeliveryToRestaurant,
  getRestaurantDeliveries
} from "../controller/restaurant.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: password123
 */

// Basic restaurant routes
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.get("/:id/stats", getRestaurantStats);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.get("/owner/:ownerId", getRestaurantsByOwner);

// Review management routes
router.put("/:restaurantId/reviews/:reviewId", addReviewToRestaurant);
router.delete("/:restaurantId/reviews/:reviewId", removeReviewFromRestaurant);

// Menu management routes
router.get("/:id/menu", getRestaurantMenu);
router.put("/:restaurantId/menu/:foodItemId", addMenuItemToRestaurant);
router.delete("/:restaurantId/menu/:foodItemId", removeMenuItemFromRestaurant);

// Order management routes
router.get("/:id/orders", getRestaurantOrders);
router.put("/:restaurantId/orders/:orderId", addOrderToRestaurant);

// Delivery management routes
router.get("/:id/deliveries", getRestaurantDeliveries);
router.put("/:restaurantId/deliveries/:deliveryId", addDeliveryToRestaurant);

export default router;

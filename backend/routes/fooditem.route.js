import express from "express";
import {
  getAllFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItemsByRestaurant,
  getFoodItemsByCategory,
  getVegetarianFoodItems
} from "../controller/fooditem.controller.js";

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

router.get("/", getAllFoodItems);
router.get("/vegetarian", getVegetarianFoodItems);
router.get("/:id", getFoodItemById);
router.post("/", createFoodItem);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);
router.get("/restaurant/:restaurantId", getFoodItemsByRestaurant);
router.get("/category/:categoryId", getFoodItemsByCategory);

export default router;

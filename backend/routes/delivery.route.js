import express from "express";
import {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  updateDeliveryStatus,
  deleteDelivery,
  getDeliveriesByOrder,
  getDeliveriesByDeliveryPerson,
  getDeliveriesByRestaurant,
  assignDeliveryPerson
} from "../controller/delivery.controller.js";

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

// Basic delivery routes
router.get("/", getAllDeliveries);
router.get("/:id", getDeliveryById);
router.post("/", createDelivery);
router.put("/:id", updateDelivery);
router.patch("/:id/status", updateDeliveryStatus);
router.delete("/:id", deleteDelivery);

// Delivery assignment routes
router.patch("/:deliveryId/assign", assignDeliveryPerson);

// Delivery filtering routes
router.get("/order/:orderId", getDeliveriesByOrder);
router.get("/delivery-person/:deliveryPersonId", getDeliveriesByDeliveryPerson);
router.get("/restaurant/:restaurantId", getDeliveriesByRestaurant);

export default router;

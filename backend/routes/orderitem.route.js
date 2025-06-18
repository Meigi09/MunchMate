import express from "express";
import { 
  getAllOrderItems, 
  getOrderItemById, 
  createOrderItem, 
  updateOrderItem, 
  deleteOrderItem, 
  getOrderItemsByOrder 
} from "../controller/orderitem.controller.js";

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

router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemById);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);
router.get("/order/:orderId", getOrderItemsByOrder);

export default router;

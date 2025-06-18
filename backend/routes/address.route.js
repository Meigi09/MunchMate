import express from "express";
import {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressesByUser,
  getUserDefaultAddress,
  setDefaultAddress,
  getAddressesByType
} from "../controller/address.controller.js";

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

// Basic address routes
router.get("/", getAllAddresses);
router.get("/:id", getAddressById);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

// User-specific address routes
router.get("/user/:userId", getAddressesByUser);
router.get("/user/:userId/default", getUserDefaultAddress);
router.patch("/:addressId/set-default", setDefaultAddress);

// Address filtering routes
router.get("/type/:type", getAddressesByType);

export default router;
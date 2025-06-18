# MunchMate Backend API

A comprehensive food delivery backend API built with Node.js, Express, and MongoDB.

## Features

- **User Management**: Customer, Vendor, and Admin roles
- **Restaurant Management**: CRUD operations for restaurants
- **Food Item Management**: Menu items with categories and availability
- **Order Management**: Complete order lifecycle
- **Cart Management**: Shopping cart functionality
- **Review System**: Customer reviews for restaurants
- **Category System**: Food categorization

## Models

### User
- Name, email, password (hashed with bcrypt)
- Role: CUSTOMER, VENDOR, ADMIN
- Timestamps

### Restaurant
- Name, description, location, image
- Owner reference (User)
- Timestamps

### FoodItem
- Name, description, price, image
- Restaurant reference
- Category reference (optional)
- isAvailable, isVegetarian flags
- Timestamps

### Order
- Customer, restaurant references
- Food items array
- Total amount, status, payment details
- Delivery address
- Timestamps

### OrderItem
- Order and food item references
- Quantity and price
- Timestamps

### Review
- Customer and restaurant references
- Rating (1-5), comment
- Timestamps

### Category
- Name, description, image
- isActive flag
- Timestamps

### Cart
- Customer and restaurant references
- Items array with food item, quantity, price
- Auto-calculated total amount
- Timestamps

### Address
- User reference
- Type: home, work, other
- Complete address details
- isDefault flag
- Timestamps

### Delivery
- Order reference
- Delivery person (optional)
- Status tracking
- Delivery address and instructions
- Tracking updates array
- Timestamps

## API Endpoints

### Health Check
- `GET /api/health` - API status and available endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant
- `GET /api/restaurants/owner/:ownerId` - Get restaurants by owner

### Food Items
- `GET /api/fooditems` - Get all available food items
- `GET /api/fooditems/vegetarian` - Get vegetarian food items
- `GET /api/fooditems/:id` - Get food item by ID
- `POST /api/fooditems` - Create new food item
- `PUT /api/fooditems/:id` - Update food item
- `DELETE /api/fooditems/:id` - Delete food item
- `GET /api/fooditems/restaurant/:restaurantId` - Get food items by restaurant
- `GET /api/fooditems/category/:categoryId` - Get food items by category

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/customer/:customerId` - Get orders by customer
- `GET /api/orders/restaurant/:restaurantId` - Get orders by restaurant

### Order Items
- `GET /api/orderitems` - Get all order items
- `GET /api/orderitems/:id` - Get order item by ID
- `POST /api/orderitems` - Create new order item
- `PUT /api/orderitems/:id` - Update order item
- `DELETE /api/orderitems/:id` - Delete order item
- `GET /api/orderitems/order/:orderId` - Get order items by order

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/restaurant/:restaurantId` - Get reviews by restaurant
- `GET /api/reviews/customer/:customerId` - Get reviews by customer

### Categories
- `GET /api/categories` - Get all active categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Soft delete category

### Cart
- `GET /api/cart/customer/:customerId` - Get cart by customer
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:cartId/item/:itemId` - Update cart item quantity
- `DELETE /api/cart/:cartId/item/:itemId` - Remove item from cart
- `DELETE /api/cart/customer/:customerId` - Clear customer cart

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with `MONGODB_URI`
3. Start server: `npm start` or `npm run dev`

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- dotenv for environment variables

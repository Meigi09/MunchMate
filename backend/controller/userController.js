import User from '../models/User.js';

/**
 * @desc    Register a new user
 * @route   POST /api/users/signup
 * @access  Public
 */
export const signup = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
    }

    // Create user
    const user = await User.create({
      username,
      name,
      email,
      password,
      role: role || 'customer', // Default role is customer if not specified
    });

    // Log the signup activity
    await user.logActivity('user_signup', {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Generate JWT token
    const token = user.getSignedJwtToken();

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

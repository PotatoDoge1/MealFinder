import { Router, Request, Response } from 'express';
import { User } from '../models/users.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Create a new router instance
const router = Router();

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;  // Extract username and password from request body
  
    // Find the user in the database by username
    const user = await User.findOne({
      where: { username },
    });
  
    // If user is not found, send an authentication failed response
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
  
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });  // Send the token as a JSON response
  };
  
  // POST /login - Login a user
  // localhost:3001/auth/login
  router.post('/login', login);  // Define the login route

  // POST /users - Create a new user
  // localhost:3001/auth/signup
  router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
  
  export default router;  // Export the router instance
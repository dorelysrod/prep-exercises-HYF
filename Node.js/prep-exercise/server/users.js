import dotenv from 'dotenv';
dotenv.config();
import newDatabase from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isPersistent = true;
const database = newDatabase({ isPersistent });

const SECRET_KEY = process.env.SECRET_KEY; 

const findUserByUsername = (username) => {
    const users = database.getAll(); 
    return users.find(user => user.username === username);
};

// Register Middleware
export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if username already exists
    const existingUser = findUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username is already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    const storedUser = database.create(newUser);
    return res.status(201).json({ id: storedUser.id, username: storedUser.username });
};

  // Login Middleware
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user by username
    const user = findUserByUsername(username);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials.' });
    }

    // Verify the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token });
};

// Protected Get Profile Middleware
export const getProfile = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = database.getById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ id: user.id, username: user.username });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Logout Middleware
export const logout = (req, res) => {
    return res.status(204).send();
};

 // Function to refresh token 
export const refreshToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }); 

        const newToken = jwt.sign({ id: decoded.id, username: decoded.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token: newToken });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
};

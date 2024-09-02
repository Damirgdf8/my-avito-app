const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getAvitoToken } = require('../services/avitoApi');
require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.addAvitoCredentials = async (req, res) => {
  const { clientId, clientSecret } = req.body;
  const { userId } = req.user;

  if (!clientId || !clientSecret) {
    return res.status(400).json({ message: 'ClientID and SecretID are required' });
  }

  try {
    const token = await getAvitoToken(clientId, clientSecret);
    if (!token) return res.status(400).json({ message: 'Invalid Avito credentials' });

    const user = await User.findByPk(userId);
    user.avitoClientID = clientId;
    user.avitoSecretID = clientSecret;
    await user.save();

    res.json({ message: 'Avito credentials added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Avito credentials', error: error.message });
  }
};

exports.protectedRoute = (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
};

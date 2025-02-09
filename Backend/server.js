const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); // For HTTP requests

const app = express();
const IP_ADDRESS = '35.173.124.16';
const PORT = 7000;

// Telegram Bot Token
const TELEGRAM_BOT_TOKEN = '7831591330:AAEwY4GlaMydwwfhDxAfULP2xbNRj1vU4S0';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Middleware
app.use(cors({
  origin: 'http://35.173.124.16:3000', // Replace with your frontend's IP and port
  credentials: true,
}));
app.use(bodyParser.json({ limit: '10mb' }));

// Connect to MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://sokchanear0:2NtjcG3hRPMTrYCz@cluster0.1nfjw.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));

// Define Invoice Schema
const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true }, // Base64 image string (uploaded image)
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      color: { type: String, required: true },
      productImage: { type: String, required: true }, // Store product image URL
    },
  ],
  date: { type: Date, default: Date.now },
});

// Create Invoice Model
const Invoice = mongoose.model('Invoice', invoiceSchema);

// POST endpoint to save invoice data
app.post('/api/invoice', async (req, res) => {
  const { name, address, phoneNumber, gender, image, subtotal, shipping, total, items } = req.body;

  // Validate required fields
  if (!name || !address || !phoneNumber || !gender || !image || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new invoice document
    const newInvoice = new Invoice({
      name,
      address,
      phoneNumber,
      gender,
      image, // Save the Base64 image string
      subtotal,
      shipping,
      total,
      items, // Save the list of items with size, quantity, and color
    });

    // Save the invoice to the database
    await newInvoice.save();

    // Send the invoice data to the Telegram bot with confirmation buttons
    const chatId = '5616996770'; // Replace with your chat ID
    const message = `
    New Invoice Created:
    Name: ${name}
    Address: ${address}
    Phone Number: ${phoneNumber}
    Gender: ${gender}
    Subtotal: $${subtotal.toFixed(2)}
    Shipping: $${shipping.toFixed(2)}
    Total: $${total.toFixed(2)}
    Items:
    ${items
      .map(
        (item) => `
      - ${item.name} (Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)})
      Product Image: ${item.productImage} // Include product image URL
    `
      )
      .join('')}
  `;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: 'Confirm', callback_data: `confirm_${newInvoice._id}` },
          { text: 'Cancel', callback_data: `cancel_${newInvoice._id}` },
        ],
      ],
    };

    bot.sendMessage(chatId, message, { reply_markup: inlineKeyboard });

    // Respond with success
    res.status(201).json({ message: 'Invoice saved successfully!', invoice: newInvoice });
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ error: 'Failed to save invoice', details: error.message });
  }
});

// Handle callback queries from the inline keyboard
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id; // Get the message ID
  const data = callbackQuery.data;
  const invoiceId = data.split('_')[1];

  if (data.startsWith('confirm')) {
    // Handle confirmation
    bot.sendMessage(chatId, `Invoice ${invoiceId} confirmed!`);

    // Edit the original message to show "Done" instead of "Confirm"
    const updatedMessage = `
      New Invoice Created:
      Name: ${callbackQuery.message.text.split('\n')[1].split(': ')[1]}
      Address: ${callbackQuery.message.text.split('\n')[2].split(': ')[1]}
      Phone Number: ${callbackQuery.message.text.split('\n')[3].split(': ')[1]}
      Gender: ${callbackQuery.message.text.split('\n')[4].split(': ')[1]}
      Subtotal: $${callbackQuery.message.text.split('\n')[5].split(': ')[1]}
      Shipping: $${callbackQuery.message.text.split('\n')[6].split(': ')[1]}
      Total: $${callbackQuery.message.text.split('\n')[7].split(': ')[1]}
      Items:
      ${callbackQuery.message.text.split('\n').slice(8).join('\n')}
    `;

    const updatedInlineKeyboard = {
      inline_keyboard: [
        [
          { text: 'Done✅', callback_data: `done_${invoiceId}` }, // Change "Confirm" to "Done"
          { text: 'Cancel', callback_data: `cancel_${invoiceId}` },
        ],
      ],
    };

    // Edit the original message with the updated keyboard
    bot.editMessageText(updatedMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: updatedInlineKeyboard,
    });

    // You can add additional logic here, such as updating the invoice status in the database
  } else if (data.startsWith('cancel')) {
    // Handle cancellation
    bot.sendMessage(chatId, `Invoice ${invoiceId} cancelled!`);
    // You can add additional logic here, such as deleting the invoice from the database
  }

  // Answer the callback query
  bot.answerCallbackQuery(callbackQuery.id);
});

// GET endpoint to fetch all invoices
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices', details: error.message });
  }
});

// GET endpoint to fetch a single invoice by ID
app.get('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id); // Fetch invoice by ID
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid invoice ID format' });
    }
    res.status(500).json({ error: 'Failed to fetch invoice', details: error.message });
  }
});

// GET endpoint to fetch the Base64 image by invoice ID
app.get('/api/invoices/image/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id); // Fetch invoice by ID
    if (!invoice) {
      console.error('Invoice not found:', req.params.id);
      return res.status(404).json({ error: 'Invoice not found' });
    }

    console.log('Fetched invoice:', invoice);
    // Return the Base64 image string
    res.status(200).json({ image: invoice.image });
  } catch (error) {
    console.error('Error fetching invoice image:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid invoice ID format' });
    }
    res.status(500).json({ error: 'Failed to fetch invoice image', details: error.message });
  }
});

// Start the server
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});

// Telegram Bot Command to Fetch and Send Image
bot.onText(/\/getimage (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const invoiceId = match[1]; // Get the invoice ID from the command

  try {
    // Fetch the Base64 image from the backend
    const response = await axios.get(`http://${IP_ADDRESS}:${PORT}/api/invoices/image/${invoiceId}`);
    const base64Image = response.data.image;

    // Decode the Base64 image and send it to the user
    const imageBuffer = Buffer.from(base64Image, 'base64');
    bot.sendPhoto(chatId, imageBuffer);
  } catch (error) {
    console.error('Error fetching or sending image:', error);
    bot.sendMessage(chatId, 'Failed to fetch or send the image. Please try again.');
  }
});

import logging
import requests
import base64
from io import BytesIO
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import traceback  # For detailed error logging

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Replace with your bot token
BOT_TOKEN = "7703588604:AAFSGwKQmlAc9ejt3iDboa70HdtlxBFnzvw"

# Replace with your backend server URL
BACKEND_URL = "http://192.168.56.1:7000/api/invoices/image"
# http://3.86.162.13:5000/api/invoice
# Define the start function
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a welcome message when the /start command is issued."""
    await update.message.reply_text(
        "Hello! Use the /getimage <invoice_id> command to fetch and send an image."
    )

# Define the get_image function
async def get_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Fetch the Base64 image from the backend and send it to the user."""
    try:
        # Get the invoice ID from the command
        if not context.args:
            await update.message.reply_text("Please provide an invoice ID. Usage: /getimage <invoice_id>")
            return

        invoice_id = context.args[0]  # This will be your invoice ID, e.g., 678562c537989eed37c51409

        # Fetch the Base64 image from the backend
        logger.info(f"Fetching image for invoice ID: {invoice_id}")
        response = requests.get(f"{BACKEND_URL}/{invoice_id}")
        
        # Check if the request was successful
        if response.status_code != 200:
            logger.error(f"Backend returned status code: {response.status_code}")
            await update.message.reply_text("Failed to fetch the image. Please check the invoice ID.")
            return

        # Extract the Base64 image string from the response
        response_json = response.json()
        logger.info(f"Backend response: {response_json}")
        base64_image = response_json.get("image")  # Extract the "image" field
        if not base64_image or not isinstance(base64_image, str):
            logger.error("No image found in the response or invalid image data.")
            await update.message.reply_text("No image found for the provided invoice ID or invalid image data.")
            return

        # Remove the Base64 data URL prefix (if present)
        if base64_image.startswith("data:image/"):
            base64_image = base64_image.split(",")[1]  # Extract the Base64 part after the comma

        # Ensure the Base64 string is properly padded
        if len(base64_image) % 4 != 0:
            base64_image += '=' * (4 - len(base64_image) % 4)

        # Decode the Base64 image into binary data
        logger.info("Decoding Base64 image...")
        try:
            image_data = BytesIO(base64.b64decode(base64_image))
            image_data.seek(0)  # Reset the stream position

        except Exception as e:
            logger.error(f"Failed to decode Base64 image: {e}")
            await update.message.reply_text("Failed to decode the image. Please check the image data.")
            return

        # Send the image to the user
        logger.info("Sending image to the user...")
        await update.message.reply_photo(photo=image_data)
        logger.info("Image sent successfully!")

    except requests.exceptions.RequestException as e:
        logger.error(f"HTTP request failed: {e}")
        await update.message.reply_text("Failed to connect to the backend. Please try again.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}\n{traceback.format_exc()}")  # Log the full traceback
        await update.message.reply_text("An error occurred. Please try again.")

# Main function to start the bot
if __name__ == "__main__":
    # Create the bot application
    application = ApplicationBuilder().token(BOT_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("getimage", get_image))

    # Start the bot
    logger.info("Bot is running...")
    application.run_polling()

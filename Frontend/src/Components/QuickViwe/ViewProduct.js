import React, { useState } from 'react';
import './Style.css'; // Import the CSS file for styling

function ViewProduct() {
  // Example product data (you can fetch this from an API or props)
  const product = {
    id: 1,
    name: 'Product Name',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 49.99,
    images: [
      'https://via.placeholder.com/600x600?text=Product+Image+1',
      
    ],
    sizes: ['S', 'M', 'L', 'XL'], // Available sizes
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]); // State for selected image
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size
  const [quantity, setQuantity] = useState(1); // State for quantity

  // Function to handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Function to handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Function to handle quantity increment
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Function to handle quantity decrement
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="view-product-page">
      {/* Product Images Section */}
      <div className="product-images">
        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>
        <div className="thumbnail-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={selectedImage === image ? 'active' : ''}
              onClick={() => handleImageSelect(image)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>

        {/* Size Selection */}
        <div className="size-selection">
          <h3>Select Size:</h3>
          <div className="size-options">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="quantity-selection">
          <h3>Quantity:</h3>
          <div className="quantity-control">
            <button className="quantity-button" onClick={decrementQuantity}>
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-button" onClick={incrementQuantity}>
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
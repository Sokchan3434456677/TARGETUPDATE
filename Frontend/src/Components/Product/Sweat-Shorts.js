import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Style/style.css';
import Section from '../Section';
import Newletter from '../Newletter';
import { CartContext } from '../Cart/CartContext';

function SweatShorts() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // Track the selected size for each product (_id as key)
  const [selectedColors, setSelectedColors] = useState({}); // Track the selected color for each product (_id as key)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/products/Sweat-Shorts');
        const response = await axios.get(`${process.env.REACT_APP_PRODUCT_API_BASE_URL}/api/products/Sweat-Shorts`);
        // Convert the "size" string into an array and ensure "color" is an array
        const productsWithSizesAndColors = response.data.map((product) => ({
          ...product,
          size: product.size ? product.size.split(', ') : [],
          color: product.color || ['Default'], // Ensure color is an array
        }));
        setProducts(productsWithSizesAndColors);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // if (loading) {
  //   return <div className="section">Loading products...</div>;
  // }

  // if (error) {
  //   return <div className="section">{error}</div>;
  // }

  // Handler to update the selected size for a product
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productId]: size,
    }));
  };

  // Handler to update the selected color for a product
  const handleColorSelect = (productId, color) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [productId]: color,
    }));
  };

  return (
    <div className="section">
      <Section />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">TARGET STORE</h3>
              <div className="section-nav">
                <ul className="section-tab-nav tab-nav">
                  <li><Link to="/hoodie">Hoodie</Link></li>
                  <li><Link to="/t-shirt">T-Shirt</Link></li>
                  <li><Link to="/stussy-cap">Stussy-Cap</Link></li>
                  <li className="active"><Link to="/sweat-shorts">Sweat-Shorts</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row product-grid">
              {products.map((product) => {
                const selectedSize = selectedSizes[product._id] || (product.size[0] || '');
                const selectedColor = selectedColors[product._id] || (product.color[0] || '');
                return (
                  <div key={product._id} className="col-md-4 col-sm-6 col-xs-12">
                    <div className="product">
                      <div className="product-img">
                        <img src={product.image} alt={product.name} />
                        {product.stock === 0 && (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                      <div className="product-body">
                        <p className="product-category">{product.category || 'Uncategorized'}</p>
                        <h3 className="product-name">
                          <a href="#">{product.name}</a>
                        </h3>
                        <h4 className="product-price">${product.price.toFixed(2)}</h4>
                        <div className="product-rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                        </div>

                        <div className="product-sizes">
                          <p>Sizes:</p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {product.size.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(product._id, size)}
                                style={{
                                  padding: '5px 10px',
                                  border: selectedSize === size ? '2px solid #D10024' : '1px solid #ccc',
                                  backgroundColor: selectedSize === size ? '#FDD' : '#FFF',
                                  cursor: 'pointer',
                                }}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="product-colors">
                          <p>Colors:</p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {product.color.map((color) => (
                              <button
                                key={color}
                                onClick={() => handleColorSelect(product._id, color)}
                                style={{
                                  padding: '10px',
                                  border: selectedColor === color ? '2px solid #D10024' : '1px solid #ccc',
                                  backgroundColor: color.toLowerCase(), // Set the button background to the selected color
                                  cursor: 'pointer',
                                  borderRadius: '50%', // Make the button circular
                                  width: '30px',
                                  height: '30px',
                                }}
                                title={color} // Show color name on hover
                              />
                            ))}
                          </div>
                        </div>

                        <div className="product-btns">
                          <button className="add-to-wishlist">
                            <i className="fa fa-heart-o" />
                            <span className="tooltipp">add to wishlist</span>
                          </button>
                          <button className="add-to-compare">
                            <i className="fa fa-exchange" />
                            <span className="tooltipp">add to compare</span>
                          </button>
                          <button className="quick-view">
                            <i className="fa fa-eye" />
                            <span className="tooltipp">quick view</span>
                          </button>
                        </div>
                      </div>
                      <div className="add-to-cart">
                        <button
                          className="add-to-cart-btn"
                          onClick={() => {
                            if (!selectedSize || !selectedColor) {
                              alert('Please select a size and color before adding to cart');
                              return;
                            }
                            addToCart(product, selectedSize, selectedColor, 1);
                          }}
                          disabled={product.stock === 0} // Disable if out of stock
                          style={{
                            backgroundColor: product.stock === 0 ? '#ccc' : '#D10024',
                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <i className="fa fa-shopping-cart" />
                          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Newletter />
    </div>
  );
}

export default SweatShorts;
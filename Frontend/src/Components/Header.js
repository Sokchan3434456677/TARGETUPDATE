

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './Cart/CartContext'; // Import CartContext

function Header() {
  const { cartItems } = useContext(CartContext); // Use CartContext

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <header>
        {/* TOP HEADER */}
        <div id="top-header">
          <div className="container">
            <ul className="header-links pull-left">
              <li>
                <a href="#">
                  <i className="fa fa-phone" /> +855-10-886-460
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope-o" /> hengsokthon00@email.com
                </a>
              </li>
              <li>
                <a href="#">
                  {/* <i className="fa fa-map-marker" /> 1019 SenSok PP */}
                </a>
              </li>
            </ul>
            <ul className="header-links pull-right">
              <li>
                <Link to="/account"> {/* Replace "/account" with your desired route */}
                  <i className="fa fa-dollar" /> ACCOUNT
                </Link>
              </li>
              <li>
                <a href="#">
                  <a href="https://t.me/Target_clothe" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-user-o" /> Customer Service
                  </a>

                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* /TOP HEADER */}
        {/* MAIN HEADER */}
        <div id="header">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* LOGO */}
              <div className="col-md-3">
                <div className="header-logo">
                  <a href="#" className="logo">
                    {/* <img src="./img/logo.png" alt="Logo" /> */}
                  </a>
                </div>
              </div>
              {/* /LOGO */}
              {/* SEARCH BAR */}
              <div className="col-md-6">
                <div className="header-search">
                  <form>
                    <select className="input-select">
                      {/* <option value={0}>All Categories</option>
                      <option value={1}>Category 01</option>
                      <option value={1}>Category 02</option> */}
                    </select>
                    <input className="input" placeholder="Search here" />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
              {/* /SEARCH BAR */}
              {/* ACCOUNT */}
              <div className="col-md-3 clearfix">
                <div className="header-ctn">
                  {/* Wishlist */}
                  <div>
                    {/* <a href="#">
                      <i className="fa fa-heart-o" />
                      <span>Your Wishlist</span>
                      <div className="qty">0</div>
                    </a> */}
                  </div>
                  {/* /Wishlist */}
                  {/* Cart */}
                  <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">

                      <Link to="/cart">
                      <span style={{ color: 'white' }}>Cart</span>
                        <i style={{ color: 'white' }} className="fa fa-shopping-cart" />

                      </Link>


                      <div className="qty">{totalItems}</div> {/* Display total items */}
                    </a>
                  </div>
                  {/* /Cart */}
                </div>
              </div>
              {/* /ACCOUNT */}
            </div>
            {/* row */}
          </div>
          {/* container */}
        </div>
        {/* /MAIN HEADER */}
      </header>

    </div>
  );
}

export default Header;
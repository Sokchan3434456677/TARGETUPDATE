

import React from 'react';
import { CartProvider } from './Components/Cart/CartContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import ProductAPI from './Components/ProductAPI'; // Hoodie Page
import TShirt from './Components/Product/T-Shirt'; // T-Shirt Page
import StussyCap from './Components/Product/Stussy-Cap';
import SweatShorts from './Components/Product/Sweat-Shorts';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterAccount from './Components/LoginForm/RegisterAccount';
// import ViewProduct from './Components/QuickViwe/ViewProduct';


function App() {
  return (
    <Router>
        <CartProvider>
        <ToastContainer />
      <div>
        <Header />
        <Navigation />
        <Routes>
          
          <Route path="/" element={<ProductAPI />} /> {/* Default route */}
          <Route path="/t-shirt" element={<TShirt />} />
          <Route path="/hoodie" element={<ProductAPI />} />
          <Route path="/stussy-cap" element={<StussyCap />} />
          <Route path="/sweat-shorts" element={<SweatShorts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<RegisterAccount />} /> {/* Register Account */}
          {/* <Route path="/quick-view" element={<ViewProduct />} /> */}
        </Routes>
        
        
      </div>
      <Footer />
      </CartProvider>
      
    </Router>
  );
}

export default App;
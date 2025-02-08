import React from 'react'

function Footer() {
  return (
<div>
  <footer id="footer">
    {/* top footer */}
    <div className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-3 col-xs-6">
            <div className="footer">
              <h3 className="footer-title">About Us</h3>
              <p>Sorry we don’t have low quality product ,
              we offer high quality with lowest price.</p>
              <ul className="footer-links">
                <li><a href="#"><i className="fa fa-map-marker" />1019 SenSok PP</a></li>
                <li><a href="#"><i className="fa fa-phone" />+855-10-886-460</a></li>
                <li><a href="#"><i className="fa fa-envelope-o" />hengsokthon00@email.com</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="footer">
              <h3 className="footer-title">Target-Store</h3>
              <ul className="footer-links">
                <li><a href="#">Hoodie</a></li>
                <li><a href="#">T-Shirt</a></li>
                <li><a href="#">Stussy-Cap</a></li>
                <li><a href="#">Sweat-Shorts</a></li>
                
              </ul>
            </div>
          </div>
          <div className="clearfix visible-xs" />
          <div className="col-md-3 col-xs-6">
            <div className="footer">
              <h3 className="footer-title">Information</h3>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Orders and Returns</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="footer">
              <h3 className="footer-title">Service</h3>
              <ul className="footer-links">
                <li><a href="#">My Account</a></li>
                <li><a href="#">View Cart</a></li>
                <li><a href="#">Wishlist</a></li>
                <li><a href="#">Track My Order</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
    {/* /top footer */}
    {/* bottom footer */}
    <div id="bottom-footer" className="section">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-12 text-center">
            <ul className="footer-payments">
              <li><a href="#"><i className="fa fa-cc-visa" /></a></li>
              <li><a href="#"><i className="fa fa-credit-card" /></a></li>
              <li><a href="#"><i className="fa fa-cc-paypal" /></a></li>
              <li><a href="#"><i className="fa fa-cc-mastercard" /></a></li>
              <li><a href="#"><i className="fa fa-cc-discover" /></a></li>
              <li><a href="#"><i className="fa fa-cc-amex" /></a></li>
            </ul>
            <span className="copyright">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              This WebSite Develop <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://www.facebook.com/profile.php?id=100054257799442" target="red">Ear Sokchan</a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </span>
          </div>
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
    {/* /bottom footer */}
  </footer>
</div>

  )
}

export default Footer;

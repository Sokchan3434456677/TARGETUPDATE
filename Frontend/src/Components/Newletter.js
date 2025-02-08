import React from 'react'

function Newletter() {
  return (
 <div>
  <div id="newsletter" className="section">
    {/* container */}
    <div className="container">
      {/* row */}
      <div className="row">
        <div className="col-md-12">
          <div className="newsletter">
            {/* <p>Sign Up for the <strong>NEWSLETTER</strong></p> */}
            <form>
              {/* <input className="input" type="email" placeholder="Enter Your Email" /> */}
              {/* <button className="newsletter-btn"><i className="fa fa-envelope" /> Subscribe</button> */}
            </form>
            <ul className="newsletter-follow">
  <li>
    <a 
      href="https://www.facebook.com/profile.php?id=100067992586051" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fa fa-facebook" />
    </a>
  </li>
  <li>
    <a 
      href="https://t.me/Target_clothe" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fa fa-telegram" />
    </a>
  </li>
  <li>
    <a 
      href="https://www.instagram.com/targetstorewithu?igsh=NGVhcnlwcnMzbDJv" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fa fa-instagram" />
    </a>
  </li>
  <li>
    <a 
      href="https://www.tiktok.com/@targetstorewithu?_t=ZS-8tIfsO3hDjM&_r=1" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fa fa-tiktok" />
    </a>
  </li>
</ul>

          </div>
        </div>
      </div>
      {/* /row */}
    </div>
    {/* /container */}
  </div>
</div>

  )
}

export default Newletter;

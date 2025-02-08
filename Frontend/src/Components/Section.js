import React from 'react'

function Section() {
  return (
<div>
  <div className="section">
    {/* container */}
    <div className="container">
      {/* row */}
      <div className="row">
        {/* shop */}
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="./img/shop01.png" alt />
            </div>
            <div className="shop-body">
              <h3>Boxy Fit<br />Best quality facbric.</h3>
              {/* <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a> */}
            </div>
          </div>
        </div>
        {/* /shop */}
        {/* shop */}
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="./img/shop02.png" alt />
            </div>
            <div className="shop-body">
              <h3>Stussy cap 🧢</h3>
              {/* <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a> */}
            </div>
          </div>
        </div>
        {/* /shop */}
        {/* shop */}
        <div className="col-md-4 col-xs-6">
          <div className="shop">
            <div className="shop-img">
              <img src="./img/shop03.png" alt />
            </div>
            <div className="shop-body">
              <h3>Stussy gang 🎱🎱<br />Stussy basic</h3>
              {/* <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a> */}
            </div>
          </div>
        </div>
        {/* /shop */}
      </div>
      {/* /row */}
    </div>
    {/* /container */}
  </div>
</div>

  )
}

export default Section;

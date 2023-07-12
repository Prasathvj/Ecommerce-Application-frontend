import React from 'react'
import { Link } from 'react-router-dom'
import img from "../../images/main-banner-1.jpg"
import img5 from "../../images/main-banner.jpg"
import img1 from "../../images/catbanner-01.jpg"
import img2 from "../../images/catbanner-02.jpg"
import img3 from "../../images/catbanner-03.jpg"
import img4 from "../../images/catbanner-04.jpg"
function Banner() {
  return (
    <>
    <section className="home-wrapper-1 py-5 home-banner">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
           <div id="carouselExampleFade" class="carousel slide carousel-fade big-banner" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={img} class="d-block w-100 rounded-2" style={{height:410}} alt="..."/>
                <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>Special Sale</h5>
                <h3 style={{fontSize:'1.3rem'}}>Wireless. Effortless. Magical.</h3>
                <p>From $160.00</p>
                <Link to={'/product/64aeb3f144d5f750e98a5104'} className='banner-button'>BUY NOW</Link>
              </div>
              </div>
              <div class="carousel-item">
                <img src={img5} class="d-block w-100 rounded-2" style={{height:410}} alt="..."/>
                <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>AirPods Max </h5>
                <h3 style={{fontSize:'1.5rem'}}>Bluetooth Headset</h3>
                <p>From $999.00 or $41.62/mo</p>
                <Link to={'/product/64a6cda9517cc35ea70a431b'} className='banner-button'>BUY NOW</Link>
              </div>
              </div>
              
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          <div className="col-6">
            <div className="row row-cols-2 small_banner">
                <div className="small-banner position-relative p-1">
                  <img src={img1} className='img-fluid rounded-3'
                  alt="main banner" 
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>Laptop Max</h5>
                    <p>From $1669.00 or $64.76/mo</p>
                  </div>
              </div>
              <div className="small-banner position-relative p-1">
                  <img src={img2} className='img-fluid rounded-3'
                  alt="main banner" 
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Buy Ipad Air</h5>
                    <p>From $599.00 or $49.62/mo</p>
                  </div>
              </div>
              <div className="small-banner position-relative p-1">
                  <img src={img3} className='img-fluid rounded-3'
                  alt="main banner" 
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% OFF</h4>
                    <h5>Smartwatch 7</h5>
                    <p>Shop the latest band </p>
                    <p>styles and colors</p>
                  </div>
              </div>
              <div className="small-banner position-relative p-1">
                  <img src={img4} className='img-fluid rounded-3'
                  alt="main banner" 
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>FREE ENGRAVING</h4>
                    <h5>AirPods Max</h5>
                    <p>High-fidelity plackback & </p>
                    <p>Ultra-low distortion</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Banner
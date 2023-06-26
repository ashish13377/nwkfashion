import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div>
      <div className="hero-section section">
        {/* Hero Slider Start */}
        <Carousel>
          {/* Slide 1 */}
          <div>
            <div
              className="hero-item"
              style={{
                backgroundImage: "url(assets/images/hero/hero-1.jpg)",
              }}
            >
              {/* Hero Content */}
              <div className="hero-content">
                <h1>lorem epsum</h1>
                <a href="#">SHOP NOW</a>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div>
            <div
              className="hero-item"
              style={{
                backgroundImage: "url(assets/images/hero/hero-2.jpg)",
              }}
            >
              {/* Hero Content */}
              <div className="hero-content">
                <h1>lorem epsum</h1>
                <a href="#">SHOP NOW</a>
              </div>
            </div>
          </div>
        </Carousel>
        {/* Hero Slider End */}
      </div>
    </div>
  );
};

export default Hero;

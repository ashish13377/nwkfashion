import React from 'react'

export default function footer() {
  return (
    <div>        <div>
    {/* Footer Top Section Start */}
    <div className="footer-top-section section bg-theme-two-light section-padding">
        <div className="container">
            <div className="row mbn-40">
                <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                    <h4 className="title">CONTACT US</h4>
                    <p>You address will be here<br /> Lorem Ipsum text</p>
                    <p><a href="tel:01234567890">01234 567 890</a><a href="tel:01234567891">01234 567 891</a></p>
                    <p><a href="mailto:info@example.com">info@example.com</a><a href="#">www.example.com</a></p>
                </div>
                <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                    <h4 className="title">PRODUCTS</h4>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Best Seller</a></li>
                        <li><a href="#">Trendy Items</a></li>
                        <li><a href="#">Best Deals</a></li>
                        <li><a href="#">On Sale Products</a></li>
                        <li><a href="#">Featured Products</a></li>
                    </ul>
                </div>
                <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                    <h4 className="title">INFORMATION</h4>
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                        <li><a href="#">Payment Method</a></li>
                        <li><a href="#">Product Warranty</a></li>
                        <li><a href="#">Return Process</a></li>
                        <li><a href="#">Payment Security</a></li>
                    </ul>
                </div>
                <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                    <h4 className="title">NEWSLETTER</h4>
                    <p>Subscribe our newsletter and get all update of our product</p>
                    <form id="mc-form" className="mc-form footer-subscribe-form">
                        <input id="mc-email" autoComplete="off" placeholder="Enter your email here" name="EMAIL" type="email" />
                        <button id="mc-submit"><i className="fa fa-paper-plane-o" /></button>
                    </form>
                    {/* mailchimp-alerts Start */}
                    <div className="mailchimp-alerts">
                        <div className="mailchimp-submitting" />{/* mailchimp-submitting end */}
                        <div className="mailchimp-success" />{/* mailchimp-success end */}
                        <div className="mailchimp-error" />{/* mailchimp-error end */}
                    </div>{/* mailchimp-alerts end */}
                    <h5>FOLLOW US</h5>
                    <p className="footer-social"><a href="#">Facebook</a> - <a href="#">Twitter</a> - <a href="#">Google+</a></p>
                </div>
            </div>
        </div>
    </div>{/* Footer Top Section End */}
    {/* Footer Bottom Section Start */}
    <div className="footer-bottom-section section bg-theme-two pt-15 pb-15">
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <p className="footer-copyright">© 2022 Jadusona. Made with <i className="fa fa-heart heart-icon" /> By <a target="_blank" href="https://hasthemes.com">Ashish & Aamaan</a></p>
                </div>
            </div>
        </div>
    </div>{/* Footer Bottom Section End */}
</div></div>
  )
}

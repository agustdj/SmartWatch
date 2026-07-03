import "./Contact.css";
import logo from "../../assets/images/sw-logo.webp";

export default function Footer() {
  return (
    <footer className="contact">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4 col-md-6">
            <a href="/" className="logo">
              <img loading="lazy" src={logo} alt="SmartWatch" />
            </a>
            <p className="contact-desc">
              Discover premium smart watches designed for modern lifestyles.
              Stay connected, healthy and productive every day.
            </p>
            <div className="contact-social">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Help & Info</h5>
            <ul>
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Contact Us</h5>
            <p className="text-muted mb-2">Do you have any questions?</p>
            <h6>support@smartwatchx1.com</h6>
            <p className="text-muted mt-4 mb-2">Call us anytime</p>
            <h6>+1 (800) 123-4567</h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

import "./Footer.css";

export default function footer() {
  return (
    <section className="footer-bottom">
      <div className="container">
        <div className="row align-items-center gy-3 justify-content-center">
          <div className="col-lg-4">
            © {new Date().getFullYear()} SmartWatch. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
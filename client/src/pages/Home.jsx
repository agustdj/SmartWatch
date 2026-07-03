import Banner from "../components/Banner/Banner";
import Navbar from "../components/Navbar/Navbar";
import Features from "../components/Feature/Features";
import Products from "../components/Products/Products";
import Blogs from "../components/Blog/Blog";
import Sale from "../components/Sale/Sale";
import Newsletter from "../components/Newsletter/Newsletter";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Chatbox from "../components/Chatbox/Chatbox";

export default function Home() {
  return (
    <>
      <Chatbox />
      <Navbar />
      <section id="home">
        <Banner />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="products">
        <Products />
      </section>
      <Sale />
      <Blogs />
      <Newsletter />
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}

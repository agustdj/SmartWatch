import { useEffect, useState } from "react";
import "./Banner.css";

import banner1 from "../../assets/images/banner01.webp";
import banner2 from "../../assets/images/banner02.webp";
import banner3 from "../../assets/images/banner03.webp";

const images = [banner1, banner2, banner3];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner">
      {images.map((image, index) => (
        <div
          key={index}
          className={`banner-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </section>
  );
}
import bgImage from "../../assets/images/banner03.webp";
import "./Sale.css";

export default function SaleBanner() {
  return (
    <div className="banner-sale">
      <div
        className="sale-banner"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
    </div>
  );
}

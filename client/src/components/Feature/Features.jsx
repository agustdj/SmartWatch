import "./Features.css";
import {
  FaHeartPulse,
  FaBatteryFull,
  FaBluetooth,
  FaShieldHeart,
} from "react-icons/fa6";

const features = [
  {
    icon: <FaHeartPulse />,
    title: "Health Monitoring",
    description:
      "Track your heart rate, blood oxygen, sleep quality and daily activity 24/7.",
  },
  {
    icon: <FaBatteryFull />,
    title: "Long Battery",
    description:
      "Up to 14 days of battery life on a single charge for uninterrupted use.",
  },
  {
    icon: <FaBluetooth />,
    title: "Smart Connectivity",
    description:
      "Receive calls, messages, and app notifications directly on your wrist.",
  },
  {
    icon: <FaShieldHeart />,
    title: "Water Resistant",
    description:
      "5ATM waterproof rating, perfect for swimming, workouts, and outdoor activities.",
  },
];

export default function Features() {
  return (
    <section className="features section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Why Choose SmartWatch X1?</h2>
          <p className="text-muted">
            Powerful features designed to improve your daily life.
          </p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { toast } from "react-toastify";
import "./Newsletter.css";

import { subscribe } from "../../services/newsletterService";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warning("Please enter your email.");
    }
    try {
      setLoading(true);
      const res = await subscribe(email);
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setEmail("");
      toast.error("Subscribe failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-content">
            <h2>SUBSCRIBE US NOW</h2>
            <p>
              Get latest news, updates and deals directly mailed to your inbox.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

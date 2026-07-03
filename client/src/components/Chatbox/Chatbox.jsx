import { useEffect, useRef, useState } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

import "./Chatbox.css";
import logo from "../../assets/images/sw-logo-mb.webp";

const BOT_REPLY = (message) => {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "👋 Hello! Welcome to SmartWatch. How can I help you today?";
  }

  if (text.includes("contact") || text.includes("support")) {
    return "📞 Hotline: +1 234 567 890\n📧 support@smartwatch.com";
  }

  if (text.includes("thank")) {
    return "😊 You're welcome! Have a wonderful day.";
  }

  return "🤖 Thank you for contacting SmartWatch. Our support team will get back to you soon.";
};

export default function ChatBox() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "bot",
      text: "👋 Hello! Welcome to SmartWatch. How can I help you today?",
      time: new Date(),
    },
  ]);

  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const value = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: value,
        time: new Date(),
      },
    ]);

    setInput("");

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: BOT_REPLY(value),
          time: new Date(),
        },
      ]);
    }, 1000);
  };

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-left">
              <img src={logo} alt="SmartWatch" />

              <div>
                <h6>SmartWatch</h6>
              </div>
            </div>

            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img src={logo} alt="bot" className="chat-avatar" />
                )}

                <div className="message-content">
                  <div className={`message-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>

                  <span className="message-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="message-row bot">
                <img src={logo} alt="bot" className="chat-avatar" />

                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      {!open && (
        <button
          className="chat-button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FaComments />
          <span className="badge">1</span>
        </button>
      )}
    </>
  );
}

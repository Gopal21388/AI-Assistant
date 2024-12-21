
import React, { useState } from "react";
import '../App.css'

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex items-center gap-4 px-4 py-3 bg-gray-800 rounded-lg shadow-inner"
  >
    <input
      type="text"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-grow px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="send-button"
    >
      Send
    </button>
  </form>
  

  );
};

export default ChatInput;


import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import ExcelUploader from "./components/ExcelUploader";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState("");

  // // Load chat history from localStorage on initial render
  // useEffect(() => {
  //   const savedChatHistory = localStorage.getItem("chatHistory");
  //   if (savedChatHistory) {
  //     setChatHistory(JSON.parse(savedChatHistory));
  //   }
  // }, []);

  // // Save chat history to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  // }, [chatHistory]);


  // Load chat history from localStorage on initial render
  useEffect(() => {
    const savedChatHistory = JSON.parse(localStorage.getItem("chatHistory"));
    if (savedChatHistory && Array.isArray(savedChatHistory)) {
      setChatHistory(savedChatHistory);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Send message to the API
  const sendMessage = async (userMessage) => {
    setError(""); // Reset error state
    try {
      const response = await axios.post("http://localhost:8000/api/chat/message", {
        userMessage,
        chatHistory,
      });

      const { aiMessage } = response.data;
      setChatHistory([
        ...chatHistory,
        { role: "user", text: userMessage },
        { role: "assistant", text: aiMessage },
      ]);
    } catch (error) {
      setError("Failed to fetch response. Please check your API key or network.");
    }
  };

  // Clear chat history
  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="chat-app-container">
      <h1>Friendly AI Assistant</h1>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        {/* Chat Section */}
        <div style={{ flex: 1 }}>
          {error && <p className="error">{error}</p>}
          <ChatHistory chatHistory={chatHistory} />
          <ChatInput onSendMessage={sendMessage} />
          <button className="clear-chat-button" onClick={clearChatHistory}>
            Clear Chat History
          </button>
        </div>

        {/* Excel Uploader Section */}
        <div style={{ flex: 1 }}>
          <ExcelUploader />
        </div>
      </div>
    </div>
  );
};

export default App;

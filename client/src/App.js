import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import ExcelUploader from "./components/ExcelUploader";
import './App.css';


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState("");

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
    <div className="app-container">
    {/* Header */}
    <header className="header">
      <h1>Friendly AI Assistant</h1>
    </header>
  
    {/* Main Content */}
    <main className="main-content">
      <div className="chat-section">
        <div className="chat-history">
          <ChatHistory chatHistory={chatHistory} />
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
  
      {/* Upload Section */}
      <aside className="upload-section">
        <h2>Upload Data</h2>
        <ExcelUploader />
        <button onClick={clearChatHistory} className="clear-button">
          Clear Chat History
        </button>
      </aside>
    </main>
  
    {/* Footer */}
    <footer className="footer">
      <p>Powered by AI | Built with ❤️ by You</p>
    </footer>
  </div>
  
  );
  
};

export default App;

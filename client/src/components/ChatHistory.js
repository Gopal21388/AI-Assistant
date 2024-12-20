// import React, { useEffect } from "react";
// import "../App.css";

// const ChatHistory = ({ chatHistory}) => {
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Message copied to clipboard!");
//   };

//   // Save chat history to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   return (
//     <div className="chats-container">
//       {chatHistory.map((chat, index) => (
//         <div
//           key={index}
//           className={chat.role === "user" ? "user-message" : "ai-message"}
//           onClick={() => handleCopy(chat.text)} // Copy on click
//           title="Click to copy"
//         >
//           <p>{chat.text}</p>
//           <span className="timestamp">
//             {new Date(chat.timestamp).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatHistory;

const ChatHistory = ({ chatHistory }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="space-y-4">
  {chatHistory.length > 0 ? (
    chatHistory.map((chat, index) => (
      <div
        key={index}
        className={`p-4 rounded-lg shadow-md max-w-[75%] ${
          chat.role === "user"
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-700 text-white self-start"
        }`}
      >
        <p className="text-sm">{chat.text}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center">No chat history available.</p>
  )}
</div>

    
  );
};

export default ChatHistory;




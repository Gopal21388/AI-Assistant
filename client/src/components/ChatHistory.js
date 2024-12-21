

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




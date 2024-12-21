
import React, { useState } from "react";
import '../App.css'
import axios from "axios";

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [showResponse, setShowResponse] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/chat/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setData(response.data);
      setShowResponse(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-2/3 mx-auto">
  <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
  <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
    <input
      type="file"
      accept=".xls,.xlsx"
      onChange={handleFileChange}
      className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg"
    />
    <button
      onClick={handleUpload}
      className="upload-button"
    >
      Upload
    </button>
  </div>
  {showResponse && (
    <div className="mt-4 max-h-80 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-inner response-container">
      <h3 className="text-lg font-semibold mb-2">Response Data</h3>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={() => setShowResponse(false)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Hide Response
      </button>
    </div>
  )}
</div>

  );
};

export default ExcelUploader;




import React, { useState } from "react";
import axios from "axios";

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [gptResponse, setGptResponse] = useState(""); // Store GPT response

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
      const response = await axios.post("http://localhost:8000/api/chat/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const jsonData = response.data;
      setData(jsonData); // Set the JSON data

      // Now send this JSON data to GPT for processing
      // const gptResponse = await axios.post("http://localhost:8000/api/chat/queryGPT", {
      //   data: jsonData, // Send the JSON data to the backend
      // });

      // console.log(gptResponse);

      // setGptResponse(gptResponse.data.message); // Store GPT's response
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const renderTable = () => {
    if (data && Array.isArray(data)) {
      return (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p>No data to display.</p>;
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Option 1: Display the data as a table */}
      {/* {renderTable()} */}

      {/* Option 2: Display the GPT response */}
      <h2>GPT Response:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExcelUploader;

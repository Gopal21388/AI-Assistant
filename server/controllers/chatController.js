import OpenAI from "openai";
import xlsx from "xlsx";
import path from "path";
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (req, res) => {
  const { userMessage, chatHistory } = req.body;
  console.log(userMessage, chatHistory);

  try {
    // Prepare messages
    const messages = chatHistory.map((chat) => ({
      role: chat.role,
      content: chat.text,
    }));

    
    messages.push({ role: "user", content: userMessage });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
    });

    // Extract AI response
    const aiMessage =
      completion.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ aiMessage });
  } catch (error) {
    console.error("Error with ChatGPT API:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
};

export const uploadCSV = (req, res) => {
  
  try {
    const filePath = req.file.path;

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet's data
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Respond with the JSON data
    res.json(sheetData);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
} 

export const queryGPT = async(req, res) => {
  
  const { data } = req.body;

  console.log(data);


  try {
    // Send the uploaded data as a prompt to GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Here is some data: ${JSON.stringify(data)}. Can you provide an analysis of this data?`,
        },
      ],
    });
    
    const aiMessage = completion.data.choices[0].message.content;
    res.json({ message: aiMessage }); // Send GPT's response back to frontend
  } catch (error) {
    console.error('Error with GPT API:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from GPT.' });
  }
}
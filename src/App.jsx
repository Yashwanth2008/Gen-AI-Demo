import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

function Gemini_API() {
  const [prompt, setPrompt] = useState();
  const [response, setResponse] = useState();

  const handleGenerate = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAAwRHDl2BodreDhIZmGGHAX4M1rrEHeKk"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("An error occurred while generating content.");
    }
  };
  return (
    <div className="overall-wrapper">
      <h2>Generative AI Demo</h2>
      <textarea
        className="Prompt-area"
        rows="4"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <button className="submit-btn" onClick={handleGenerate}>Generate</button>
      {/* <div>Response :</div> */}
      <p className="response-content">{response}</p>
    </div>
  );
}

export default Gemini_API;

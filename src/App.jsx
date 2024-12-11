import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import Button from "./components/Button";

function Gemini_API() {
  const [prompt, setPrompt] = useState();
  const [response, setResponse] = useState();

  const handleGenerate = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAAwRHDl2BodreDhIZmGGHAX4M1rrEHeKk"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent(`${prompt}`);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("An error occurred while generating content.");
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="overall-wrapper">
      <h2>Demo</h2>
      <textarea
        className="Prompt-area"
        rows="4"
        cols="50"
        value={prompt}
        placeholder="Enter the prompt...."
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <div className="buttons">
        <Button title="Generate" functionality={handleGenerate}/>
        <Button title="Clear" functionality={handleClear}/>
      </div>
      <div className="response-content">
        <p className="response-content">{response}</p>
      </div>
    </div>
  );
}

export default Gemini_API;

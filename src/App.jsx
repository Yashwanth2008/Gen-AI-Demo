import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import Button from "./components/Button";

function Gemini_API() {
  const [prompt, setPrompt] = useState();
  const [response, setResponse] = useState();

  const handleRephrase = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAAwRHDl2BodreDhIZmGGHAX4M1rrEHeKk"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const taskPrompt = `Please rephrase the following sentence professionally. Provide only the paraphrased sentence, no explanations or extra text:\n"${prompt}"`;
      const result = await model.generateContent(taskPrompt);
  
      setResponse(result.response.text); 
    } catch (error) {
      console.error("Error rephrasing content:", error);
      setResponse("An error occurred while rephrasing the sentence.");
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="overall-wrapper">
      <h1>Paraphrasing Tool</h1>
      <textarea
        className="Prompt-area"
        rows="4"
        cols="50"
        value={prompt}
        placeholder="To rewrite text, enter or paste it here and press &quot;Paraphrase&quot;."
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <div className="buttons">
        <Button title="Paraphrase" functionality={handleRephrase}/>
        <Button title="Clear" functionality={handleClear}/>
      </div>
      <div className="response-content-wrapper">
        <p className="response-content">{response}</p>
      </div>
    </div>
  );
}

export default Gemini_API;

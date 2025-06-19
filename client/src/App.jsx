import React, { useState } from "react";
import "./App.css";

function App() {
  const [callerId, setCallerId] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`https://ping-form-backend.onrender.com?caller_id=${callerId}`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>TrackDrive Ping Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Caller ID (10 digits):</label>
        <input
          type="text"
          value={callerId}
          onChange={(e) => setCallerId(e.target.value)}
          placeholder="e.g. 7194451111"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Pinging..." : "Ping"}
        </button>
      </form>

      <div className="response">
        <h3>Response</h3>
        <pre>{response ? JSON.stringify(response, null, 2) : "No response yet"}</pre>
      </div>
    </div>
  );
}

export default App;
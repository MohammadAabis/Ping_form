import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Ping() {
  const [callerId, setCallerId] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // For local host
      // const res = await fetch(
      //   `http://localhost:5000/api/pingform?callerId=${callerId}`
      // );
      // For production
      const res = await fetch(
        `https://ping-form-backend.onrender.com/api/pingform?callerId=${callerId}`
      ); 

      const data = await res.json();
      setResponse(data);
      
      if (data.status === "accepted" && data.try_all_buyers?.ping_id) {
        // Redirect to post form with ping_id and callerId
        const pingId = data.try_all_buyers.ping_id;
        navigate("/post", {
          state: {
            pingId,
            callerId,
          },
        });
      }
    } catch (error) {
      console.error("Ping error:", error);
      setResponse({ error: "Ping request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ping Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Caller ID:</label>
        <input
          type="text"
          value={callerId}
          onChange={(e) => setCallerId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Pinging..." : "Ping"}
        </button>
      </form>
      <div className="response">
        <h3>Response</h3>
        <pre>
          {response ? JSON.stringify(response, null, 2) : "No response yet"}
        </pre>
      </div>
    </div>
  );
}

export default Ping;

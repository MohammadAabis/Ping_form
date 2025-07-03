import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    callerId: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    state: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      console.log("Submitting form data:", formData);
      const res = await fetch("http://localhost:5000/api/postform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
      <h2>TrackDrive Post Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Caller ID (10 digits):</label>
        <input
          type="text"
          name="callerId"
          value={formData.callerId}
          onChange={handleChange}
          // placeholder="e.g. 7194451111"
          required
        />

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>ZIP Code:</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
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

export default App;

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("qs");

const app = express();
app.use(cors());
app.use(express.json());

const TRACKDRIVE_NUMBER = "+18445082029";
const TRAFFIC_SOURCE_ID = "1052";

app.get("/api/pingform", async (req, res) => {
  const { callerId } = req.query;
  if (!callerId) return res.status(400).json({ error: "callerId required" });

  const fullCallerId = `+1${callerId.replace(/\D/g, "")}`;
  const url = `https://synegence-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers_on_home_services?trackdrive_number=${encodeURIComponent(TRACKDRIVE_NUMBER)}&traffic_source_id=${TRAFFIC_SOURCE_ID}&caller_id=${encodeURIComponent(fullCallerId)}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Ping failed", details: err.response?.data });
  }
});


app.post("/api/postform", async (req, res) => {
  const { callerId, firstName, lastName, address, zipCode, state } = req.body;

  if (!callerId || !firstName || !lastName || !address || !zipCode || !state) {
    return res.status(400).json({ error: "All fields are requireded" });
  }

  const fullCallerId = `+1${callerId.replace(/\D/g, "")}`;
  console.log("Full Caller ID:", fullCallerId);

  const url = `https://synegence-llc.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_buyers_on_home_services?trackdrive_number=${encodeURIComponent(
    TRACKDRIVE_NUMBER
  )}&traffic_source_id=${TRAFFIC_SOURCE_ID}&caller_id=${encodeURIComponent(
    fullCallerId
  )}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(
    lastName
  )}&address=${encodeURIComponent(address)}&zip=${encodeURIComponent(
    zipCode
  )}&state=${encodeURIComponent(state)}`;

  const payload = qs.stringify({
    trackdrive_number: TRACKDRIVE_NUMBER,
    traffic_source_id: TRAFFIC_SOURCE_ID,
    caller_id: fullCallerId,
    first_name: firstName,
    last_name: lastName,
    address: address,
    zip: zipCode,
    state: state,
    ping_id: req.body.pingId,
  });
  console.log("Payload:", payload);
  
  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("TrackDrive Error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: "Failed to contact TrackDrive",
      details: err.response?.data || null,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

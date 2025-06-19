const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const TRACKDRIVE_NUMBER = "+18444412527";
const TRAFFIC_SOURCE_ID = "1070";

app.get("/api/ping", async (req, res) => {
  const { caller_id } = req.query;

  if (!caller_id) return res.status(400).json({ error: "caller_id is required" });

  const fullCallerId = `+1${caller_id.replace(/\D/g, "")}`;
  console.log("Full Caller ID:", fullCallerId);

  const url = `https://powerful-proximity-consulting-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers_on_auto_uninsured_transfer?trackdrive_number=${encodeURIComponent(
    TRACKDRIVE_NUMBER
  )}&traffic_source_id=${TRAFFIC_SOURCE_ID}&caller_id=${encodeURIComponent(fullCallerId)}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact TrackDrive" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
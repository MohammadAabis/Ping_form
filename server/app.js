const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const TRACKDRIVE_NUMBER = "+18444412527";
const TRAFFIC_SOURCE_ID = "1070";

// const url = `https://powerful-proximity-consulting-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_buyers_on_auto_uninsured_transfer?trackdrive_number=${encodeURIComponent(
//     TRACKDRIVE_NUMBER
//   )}&traffic_source_id=${TRAFFIC_SOURCE_ID}&caller_id=${encodeURIComponent(
//     fullCallerId
//   )}`;

app.post("/api/postform", async (req, res) => {
  const { callerId, firstName, lastName, address, zipCode, state } = req.body;

  if (!callerId || !firstName || !lastName || !address || !zipCode || !state) {
    return res.status(400).json({ error: "All fields are requireded" });
  }

  const fullCallerId = `+1${callerId.replace(/\D/g, "")}`;
  console.log("Full Caller ID:", fullCallerId);

  const url = `https://synegence-llc.trackdrive.com/api/v1/inbound_webhooks/post/check_for_available_buyers_on_auto_uninsured_transfer?trackdrive_number=${encodeURIComponent(
    TRACKDRIVE_NUMBER
  )}&traffic_source_id=${TRAFFIC_SOURCE_ID}&caller_id=${encodeURIComponent(
    fullCallerId
  )}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(
    lastName
  )}&address=${encodeURIComponent(address)}&zip_code=${encodeURIComponent(
    zipCode
  )}&state=${encodeURIComponent(state)}`;


  try {
    const response = await axios.post(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact TrackDrive" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

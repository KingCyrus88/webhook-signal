
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./firebase');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const data = req.body;
  console.log('Received webhook:', data);

  try {
    await db.collection('signals').add({
      ...data,
      timestamp: new Date(),
      status: "active"
    });
    res.status(200).send("Signal stored successfully");
  } catch (err) {
    console.error("Error saving to Firestore:", err);
    res.status(500).send("Error");
  }
});

app.get('/', (req, res) => {
  res.send('✅ Webhook receiver is online!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

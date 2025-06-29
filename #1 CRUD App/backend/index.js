const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve public folder as static files
app.use(express.static(path.join(__dirname, '../public')));

// ✅ In-memory data
let items = [];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  console.log('Received:', newItem); // Log to verify incoming data
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

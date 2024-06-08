const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});


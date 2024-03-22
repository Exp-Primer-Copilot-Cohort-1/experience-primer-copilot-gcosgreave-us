// Create web server with express
// Create a route that accepts GET requests to /comments
// The route should read the comments from the file comments.json
// The comments should be returned as JSON

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/comments', (req, res) => {
  const commentsPath = path.join(__dirname, 'comments.json');
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading the comments file.');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const fs      = require('fs');
const files   = require('./files');

files.cacheFiles();

const app = express();

app.get('/api/search', (req, res) => {
  const searchString = req.query.q;
  const searchTerms  = searchString.trim().split(/ +/);

  const results = files.search(searchTerms);

  res.send(results);
});

const port = 3001;
app.listen(port, () => console.log(`backend running on port ${port}`));

const express = require('express');
const files   = require('./files');

const app = express();

app.get('/api/search', (req, res) => {
  const searchString = req.query.q.trim();
  if (!searchString) {
    res.sendStatus(400);
    return;
  }

  const searchTerms = searchString.split(/ +/);

  if (searchTerms.count === 0) {
    res.sendStatus(400);
    return;
  }

  const results = files.search(searchTerms);
  res.send(results);
});

const port = 3001;
app.listen(port, () => console.log(`backend running on port ${port}`));

// @ts-check
const express = require('express');
const path    = require('path');

const { initializeCache } = require('./files');
const { search }          = require('./search');

initializeCache();

const app = express();

const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(frontendPath));

app.get('/', function (req, res) {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

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

  const results = search(searchTerms);
  res.send(results);
});

const port = 9001;
app.listen(port, () => console.log(`backend running on port ${port}`));

const express = require('express');
const app = express();

app.get('/api/search', (req, res) => {
  console.log('got req.query: ', req.query);
  res.send({ foo: 42 });
});

const port = 3001;
app.listen(port, () => console.log(`backend running on port ${port}`));

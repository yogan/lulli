const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello, this is backend.'));

const port = 3001;
app.listen(port, () => console.log(`backend running on port ${port}`));
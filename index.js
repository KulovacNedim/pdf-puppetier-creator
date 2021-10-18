const express = require('express');
const app = express();

const port = 4000;

app.listen(port, () => {
  console.log(`listening at the port ${port}`);
});

app.get('/foo', (req, res) => {
  res.json({ foo: 'bar' });
});

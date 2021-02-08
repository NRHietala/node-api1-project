const server = require('./api/server');
const PORT = 5555;
const express = require('express');
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
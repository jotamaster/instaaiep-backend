const express = require('express');

const app = express();
const port = 5000;
app.listen(3000);

app.get('/', (req, res) => res.send('Hola'));

app.listen(port, () => console.log(`API listening on port ${port}`));

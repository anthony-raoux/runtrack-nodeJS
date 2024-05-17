const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site web!');
});

app.listen(port, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${port}`);
});

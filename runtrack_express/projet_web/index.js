const express = require('express');
const app = express();

const port = 3000;

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil de mon site web!');
});

// Route pour la page "about"
app.get('/about', (req, res) => {
    res.send('Bienvenue sur la page "À propos".');
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Page non trouvée');
});

app.listen(port, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${port}`);
});

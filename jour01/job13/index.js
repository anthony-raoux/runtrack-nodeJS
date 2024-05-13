const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';

    // Déterminer le chemin du fichier en fonction de l'URL demandée
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/about' || req.url === '/about.html') {
        filePath = path.join(__dirname, 'about.html');
    } 
    // Lire le fichier correspondant et l'envoyer en réponse
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // En cas d'erreur lors de la lecture du fichier
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erreur interne du serveur');
        } else {
            // Envoyer le contenu du fichier en tant que réponse
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

const PORT = 8878;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});

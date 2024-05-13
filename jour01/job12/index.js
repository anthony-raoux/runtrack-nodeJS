const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8880;

const server = http.createServer((req, res) => {
    // Lire le fichier index.html
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
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

server.listen(PORT, () => {
    console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});

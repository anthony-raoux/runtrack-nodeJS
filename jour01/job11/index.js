const http = require('http');

// Fonction de callback pour gérer les requêtes entrantes
const requestHandler = (request, response) => {
  // Définir le code de statut de la réponse HTTP à 200 (OK)
  response.statusCode = 200;
  // Définir l'en-tête de contenu de la réponse HTTP à text/plain
  response.setHeader('Content-Type', 'text/plain');
  // Envoyer la réponse avec le contenu "Hello World!"
  response.end('Hello World!\n');
};

// Créer un serveur HTTP
const server = http.createServer(requestHandler);

// Écouter les connexions entrantes sur le port 8888
server.listen(8888, (err) => {
  if (err) {
    // En cas d'erreur lors de l'écoute du port
    console.error('Erreur lors de l\'écoute du port 8888 :', err);
    return;
  }
  // Une fois le serveur démarré avec succès
  console.log('Serveur en cours d\'écoute sur le port 8888...');
});

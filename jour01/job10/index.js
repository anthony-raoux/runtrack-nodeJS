const url = require('url');

// Constante contenant l'URL initiale
const URL = "https://www.google.com&search=nodejs";

// Analyser l'URL
const parsedURL = url.parse(URL, true); // Le deuxième argument à true permet de parser également les paramètres de l'URL

// Récupérer le protocole utilisé
const protocol = parsedURL.protocol;
console.log('Protocole utilisé :', protocol);

// Récupérer le nom d'hôte
const hostname = parsedURL.hostname;
console.log('Nom d\'hôte :', hostname);

// Récupérer les paramètres de l'URL
const searchParams = parsedURL.query;
console.log('Paramètres de l\'URL :', searchParams);

// Reformater l'URL en une nouvelle URL valide en modifiant le nom d'hôte
parsedURL.hostname = 'www.laplateforme.io';

// Ajouter un paramètre à cette nouvelle URL
parsedURL.query.lang = 'fr';

// Afficher la nouvelle URL dans le terminal
console.log('Nouvelle URL :', url.format(parsedURL));


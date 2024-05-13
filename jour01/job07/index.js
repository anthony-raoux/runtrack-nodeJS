const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Lecture asynchrone du contenu du fichier
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de la lecture du fichier :', err);
    return;
  }

  console.log('Contenu du fichier data.txt :', data);
});

const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Lecture asynchrone du contenu du fichier
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de la lecture du fichier :', err);
    return;
  }

  // Parcours du contenu et affichage des lettres sur deux
  let result = '';
  for (let i = 0; i < data.length; i += 2) {
    result += data[i];
  }

  console.log('Une Lettre sur deux du fichier data.txt :', result);
});

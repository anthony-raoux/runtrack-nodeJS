const fs = require('fs');

// Chemin vers le fichier
const filePath = 'data.txt';

// Lecture synchrone du contenu du fichier
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log('Contenu du fichier :', fileContent);
} catch (error) {
  console.error('Une erreur s\'est produite lors de la lecture du fichier :', error);
}

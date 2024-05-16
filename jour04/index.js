const mongoose = require('mongoose');
const readline = require('readline');

mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Définition du schéma pour les années
const yearSchema = new mongoose.Schema({
  name: String
});

// Modèle basé sur le schéma des années
const Year = mongoose.model('Year', yearSchema);

// Définition du schéma pour les étudiants
const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: String,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' } // Référence à l'année
});

// Modèle basé sur le schéma des étudiants
const Student = mongoose.model('Student', studentSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez un nom de famille : ', async (lastname) => {
  try {
    // Récupération des informations de l'étudiant avec le nom de famille saisi
    const student = await Student.findOne({ lastname: lastname }).populate('year_id');

    // Affichage du résultat dans la console
    if (student) {
      const cursus = student.year_id ? student.year_id.name : 'Cursus inconnu';
      console.log(`Informations de l'étudiant :`);
      console.log(`Nom: ${student.lastname}`);
      console.log(`Prénom: ${student.firstname}`);
      console.log(`Numéro d'étudiant: ${student.students_number}`);
      console.log(`Cursus: ${cursus}`);
    } else {
      console.log('Aucun étudiant trouvé avec ce nom de famille.');
    }
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    mongoose.connection.close();
    rl.close();
  }
});

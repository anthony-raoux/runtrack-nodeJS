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

rl.question('Entrez un numéro d\'étudiant : ', async (students_number) => {
  try {
    // Récupération des étudiants avec un numéro d'étudiant plus grand que celui saisi
    const students = await Student.find({ students_number: { $gt: students_number } }).populate('year_id');

    // Affichage des résultats dans la console
    console.log(`Liste des étudiants avec un numéro d'étudiant plus grand que ${students_number} :`);
    students.forEach(student => {
      const cursus = student.year_id ? student.year_id.name : 'Cursus inconnu';
      console.log(`- ${student.firstname} ${student.lastname} (${student.students_number}) - Cursus: ${cursus}`);
    });
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    mongoose.connection.close();
    rl.close();
  }
});

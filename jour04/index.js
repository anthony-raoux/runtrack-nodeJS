const mongoose = require('mongoose');

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

async function updateStudentCursus(studentId, newYearId) {
  try {
    // Mettre à jour le cursus de l'étudiant en fonction de son ID
    const result = await Student.updateOne({ _id: studentId }, { year_id: newYearId });

    console.log(`Nombre de documents mis à jour : ${result.nModified}`);
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    mongoose.connection.close();
  }
}

// Exemple d'utilisation
const studentIdToUpdate = '6645c7d887c60858428750ff';
const newYearId = '6645c58ba3fff839050b9932';

updateStudentCursus(studentIdToUpdate, newYearId);

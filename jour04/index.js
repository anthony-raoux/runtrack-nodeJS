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

async function deleteStudent(studentId) {
  try {
    // Supprimer l'étudiant en fonction de son ID
    const result = await Student.deleteOne({ _id: studentId });

    console.log(`Nombre de documents supprimés : ${result.deletedCount}`);
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    mongoose.connection.close();
  }
}

// Exemple d'utilisation
const studentIdToDelete = '6645c7d887c60858428750ff';

deleteStudent(studentIdToDelete);


const mongoose = require('mongoose');
const fs = require('fs');

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

async function exportStudentsToJSON() {
  try {
    // Récupération de tous les étudiants depuis la base de données
    const students = await Student.find().populate('year_id');

    // Convertir les données des étudiants en format JSON
    const jsonData = JSON.stringify(students, null, 2);

    // Écrire les données JSON dans un fichier
    fs.writeFileSync('students.json', jsonData, 'utf-8');

    console.log('Données des étudiants exportées avec succès dans students.json');
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    mongoose.connection.close();
  }
}

// Appel de la fonction pour exporter les étudiants vers un fichier JSON
exportStudentsToJSON();

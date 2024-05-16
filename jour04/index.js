const mongoose = require('mongoose');
const readline = require('readline');

mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Définition du schéma pour les années avec contraintes de validation
const yearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Le nom de l'année est requis
    unique: true, // Le nom de l'année doit être unique
    minlength: [2, 'Le nom de l\'année doit avoir au moins 2 caractères'], // Longueur minimale du nom de l'année
    maxlength: [20, 'Le nom de l\'année ne peut pas dépasser 20 caractères'] // Longueur maximale du nom de l'année
  }
});

// Modèle basé sur le schéma des années
const Year = mongoose.model('Year', yearSchema);

// Définition du schéma pour les étudiants avec contraintes de validation
const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, // L'ID de l'étudiant est requis
    unique: true, // L'ID de l'étudiant doit être unique
    min: [1, 'L\'ID de l\'étudiant doit être supérieur ou égal à 1'] // Valeur minimale de l'ID de l'étudiant
  },
  lastname: {
    type: String,
    required: true, // Le nom de famille de l'étudiant est requis
    minlength: [2, 'Le nom de famille de l\'étudiant doit avoir au moins 2 caractères'], // Longueur minimale du nom de famille de l'étudiant
    maxlength: [50, 'Le nom de famille de l\'étudiant ne peut pas dépasser 50 caractères'] // Longueur maximale du nom de famille de l'étudiant
  },
  firstname: {
    type: String,
    required: true, // Le prénom de l'étudiant est requis
    minlength: [2, 'Le prénom de l\'étudiant doit avoir au moins 2 caractères'], // Longueur minimale du prénom de l'étudiant
    maxlength: [50, 'Le prénom de l\'étudiant ne peut pas dépasser 50 caractères'] // Longueur maximale du prénom de l'étudiant
  },
  students_number: {
    type: String,
    required: true, // Le numéro d'étudiant est requis
    unique: true, // Le numéro d'étudiant doit être unique
    minlength: [5, 'Le numéro d\'étudiant doit avoir au moins 5 caractères'], // Longueur minimale du numéro d'étudiant
    maxlength: [10, 'Le numéro d\'étudiant ne peut pas dépasser 10 caractères'] // Longueur maximale du numéro d'étudiant
  },
  year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year', // Référence à l'année
    required: true // L'ID de l'année est requis
  }
});

// Modèle basé sur le schéma des étudiants
const Student = mongoose.model('Student', studentSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour ajouter un étudiant
async function addStudent() {
  const studentData = {
    id: 1, // Remplacez par l'ID de l'étudiant
    lastname: 'Doe', // Remplacez par le nom de famille de l'étudiant
    firstname: 'John', // Remplacez par le prénom de l'étudiant
    students_number: '12345', // Remplacez par le numéro d'étudiant de l'étudiant
    year_id: '6645c7d887c60858428750fb' // Remplacez par l'ID de l'année à laquelle l'étudiant est inscrit
  };

  try {
    const newStudent = new Student(studentData);
    await newStudent.save();
    console.log('Étudiant ajouté avec succès.');
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'ajout de l\'étudiant :', error);
  } finally {
    rl.close();
    mongoose.connection.close();
  }
}

// Appel de la fonction pour ajouter un étudiant
addStudent();

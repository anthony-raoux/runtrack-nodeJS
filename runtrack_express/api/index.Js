const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme', { useNewUrlParser: true, useUnifiedTopology: true });

// Définition du schéma et du modèle pour les étudiants
const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: String,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});
const Student = mongoose.model('Student', studentSchema);

// Route pour récupérer tous les étudiants
app.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des étudiants.', error: error.message });
  }
});

// Route pour récupérer un étudiant spécifique par son ID
app.get('/etudiant/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findOne({ id: studentId });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${studentId}.` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'étudiant.', error: error.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

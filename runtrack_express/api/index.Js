const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  students_number: { type: String, required: true },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});
const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

app.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des étudiants.', error: error.message });
  }
});

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

app.post('/etudiants', async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de l\'ajout de l\'étudiant.', error: error.message });
  }
});

app.delete('/etudiant/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: studentId });
    if (deletedStudent) {
      res.json({ message: `Étudiant avec l'ID ${studentId} supprimé avec succès.` });
    } else {
      res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${studentId}.` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'étudiant.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

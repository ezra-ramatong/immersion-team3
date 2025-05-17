import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_PATH = path.join(__dirname, 'src', 'data', 'questions.json');

app.get('/api/questions', (req, res) => {
  fs.readFile(QUESTIONS_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading questions.json:', err);
      return res.status(500).json({ error: 'Failed to read questions' });
    }
    res.json(JSON.parse(data));
  });
});

app.put('/api/questions', (req, res) => {
  const questions = req.body;
  fs.writeFile(QUESTIONS_PATH, JSON.stringify(questions, null, 2), (err) => {
    if (err) {
      console.error('Error writing questions.json:', err);
      return res.status(500).json({ error: 'Failed to save questions' });
    }
    res.json({ message: 'Questions updated successfully!' });
  });
});

app.use(express.static(path.join(__dirname, 'src', 'admin')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/dashboard.html`);
});

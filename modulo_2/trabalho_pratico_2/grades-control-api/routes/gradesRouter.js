import express from 'express';
import {
  atualizarGrade,
  buscaGrade,
  deletarGrade,
  inserirNovaGrade,
  buscaNotaAluno,
  buscaMediaSubjectType,
  top3Grades,
} from '../controllers/gradesController.js';

const gradesRouter = express.Router();

// gradesRouter.use((req, res, next) => {
//   console.log(`Access ${Date.now()}: ${req.method} ${req._parsedUrl.pathname}`);
//   next();
// });

gradesRouter.post('/', async (req, res) => {
  const { student, subject, type, value } = req.body;
  res.send(await inserirNovaGrade(student, subject, type, value));
});

gradesRouter.put('/:id', async (req, res) => {
  const { student, subject, type, value } = req.body;
  res.send(
    await atualizarGrade(parseInt(req.params.id), student, subject, type, value)
  );
});

gradesRouter.delete('/:id', async (req, res) => {
  res.send(await deletarGrade(parseInt(req.params.id)));
});

gradesRouter.get('/notaAluno', async (req, res) => {
  const { student, subject } = req.query;
  res.send(await buscaNotaAluno(student, subject));
});

gradesRouter.get('/mediaSubjectType', async (req, res) => {
  const { subject, type } = req.query;
  res.send(await buscaMediaSubjectType(subject, type));
});

gradesRouter.get('/top3Grades', async (req, res) => {
  const { subject, type } = req.query;
  res.send(await top3Grades(subject, type));
});

gradesRouter.get('/:id', async (req, res) => {
  res.send(await buscaGrade(parseInt(req.params.id)));
});

export default gradesRouter;

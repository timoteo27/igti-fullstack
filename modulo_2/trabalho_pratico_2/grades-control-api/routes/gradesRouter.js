import express from 'express';
import {
  atualizarGrade,
  buscaGrade,
  deletarGrade,
  inserirNovaGrade,
} from '../controllers/gradesController.js';

const gradesRouter = express.Router();

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

gradesRouter.get('/:id', async (req, res) => {
  res.send(await buscaGrade(parseInt(req.params.id)));
});

export default gradesRouter;

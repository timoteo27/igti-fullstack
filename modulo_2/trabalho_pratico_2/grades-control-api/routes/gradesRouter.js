import express from 'express';
import { promises as fs } from 'fs';

const gradesRouter = express.Router();

gradesRouter.put('/', async (req, res) => {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));

    const novaGrade = {
      id: jsonData.nextId++,
      ...req.body,
      timestamp: new Date(),
    };
    jsonData.grades.push(novaGrade);

    fs.writeFile(global.fileNameData, JSON.stringify(jsonData, null, 2));

    res.send(novaGrade);
  } catch (err) {
    res.send(err);
  }
});

gradesRouter.get('/:id', async (req, res) => {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const userFound = jsonData.grades.find(
      (g) => g.id === parseInt(req.params.id)
    );
    res.send(userFound);
  } catch (err) {
    res.send(err);
  }
});

export default gradesRouter;

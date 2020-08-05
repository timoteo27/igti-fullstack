import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import gradesRouter from './routes/gradesRouter.js';

global.fileNameData = path.resolve('data', 'grades.json');

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    const grades = JSON.parse(await fs.readFile(global.fileNameData));

    console.log(`NextId: ${grades.nextId}`);
    console.log('API Started!');
  } catch (err) {
    console.log(err);
  }
});

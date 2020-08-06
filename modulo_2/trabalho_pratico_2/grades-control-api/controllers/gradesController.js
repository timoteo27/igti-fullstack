import { promises as fs } from 'fs';

async function inserirNovaGrade(student, subject, type, value) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));

    const novaGrade = {
      id: jsonData.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: new Date(),
    };
    jsonData.grades.push(novaGrade);

    await fs.writeFile(global.fileNameData, JSON.stringify(jsonData, null, 2));

    return novaGrade;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

async function buscaGrade(idGrade) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const gradeFound = jsonData.grades.find((g) => g.id === idGrade);
    return gradeFound;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

async function atualizarGrade(idGrade, student, subject, type, value) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const gradeIndex = jsonData.grades.findIndex((g) => g.id === idGrade);
    if (gradeIndex < 0) {
      throw new Error('Grade não encontrada!');
    }
    jsonData.grades[gradeIndex] = {
      id: jsonData.grades[gradeIndex].id,
      student,
      subject,
      type,
      value,
    };

    await fs.writeFile(global.fileNameData, JSON.stringify(jsonData, null, 2));

    return jsonData.grades[gradeIndex];
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

async function deletarGrade(idGrade) {
  try {
    let jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const idExists = jsonData.grades.some((g) => g.id === idGrade);
    if (idExists) {
      jsonData.grades = jsonData.grades.filter((g) => g.id !== idGrade);
      await fs.writeFile(
        global.fileNameData,
        JSON.stringify(jsonData, null, 2)
      );
      return { message: `User id:${idGrade} deleted!` };
    } else {
      return { message: `User id:${idGrade} not found!` };
    }
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

export { inserirNovaGrade, buscaGrade, atualizarGrade, deletarGrade };

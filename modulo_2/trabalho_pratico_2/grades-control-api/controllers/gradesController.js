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

    if (student !== undefined) jsonData.grades[gradeIndex].student = student;
    if (subject !== undefined) jsonData.grades[gradeIndex].subject = subject;
    if (type !== undefined) jsonData.grades[gradeIndex].type = type;
    if (value !== undefined) jsonData.grades[gradeIndex].type = value;

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

async function buscaNotaAluno(student, subject) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const somaNota = jsonData.grades
      .filter((g) => g.subject === subject && g.student === student)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      );
    return {
      message: `A soma da nota do aluno ${student} na matéria ${subject} é: ${somaNota}`,
    };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

async function buscaMediaSubjectType(subject, type) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const filteredArray = jsonData.grades.filter((g) => {
      return g.subject === subject && g.type === type;
    });
    const sumValue = filteredArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    const average = sumValue / filteredArray.length;

    return {
      message: `A média da matéria ${subject} tipo ${type} é: ${average}`,
    };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

async function top3Grades(subject, type) {
  try {
    const jsonData = JSON.parse(await fs.readFile(global.fileNameData));
    const filteredArray = jsonData.grades.filter((g) => {
      return g.subject === subject && g.type === type;
    });
    const top3GradeValues = filteredArray
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    return top3GradeValues;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

export {
  inserirNovaGrade,
  buscaGrade,
  atualizarGrade,
  deletarGrade,
  buscaNotaAluno,
  buscaMediaSubjectType,
  top3Grades,
};

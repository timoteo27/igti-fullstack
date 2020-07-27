import * as questions from './library/questions.js';
import getProjectData from './library/project_data.js';

async function execute() {
  const {
    arrayEstados,
    arrayCidades,
    arrayCidadesEstados,
  } = await getProjectData();

  let returnQ1 = await questions.questao1(arrayCidadesEstados);
  console.log(`${returnQ1}`);

  let siglaUf = 'SC';
  let returnQ2 = await questions.questao2(siglaUf);
  console.log(`${returnQ2}`);

  let returnQ3 = await questions.questao3(arrayCidadesEstados);
  console.log(`${returnQ3}`);

  let returnQ4 = await questions.questao4(arrayCidadesEstados);
  console.log(`${returnQ4}`);

  let returnQ5 = await questions.questao5(arrayCidadesEstados);
  console.log(`${returnQ5}`);

  let returnQ6 = await questions.questao6(arrayCidadesEstados);
  console.log(`${returnQ6}`);

  let returnQ7 = await questions.questao7(arrayCidadesEstados);
  console.log(`${returnQ7}`);

  let returnQ8 = await questions.questao8(arrayCidadesEstados);
  console.log(`${returnQ8}`);
}

execute();

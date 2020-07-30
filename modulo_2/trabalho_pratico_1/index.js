import * as questions from './library/questions.js';
import getArrayCidadesEstados from './library/project_data.js';

async function execute() {
  try {
    const arrayCidadesEstados = await getArrayCidadesEstados();

    let returnQ1 = await questions.questao1(arrayCidadesEstados);
    console.log(`${returnQ1}`);

    let siglaUf = 'SC';
    let returnQ2 = await questions.questao2(siglaUf);
    console.log(`${returnQ2}`);

    let returnQ3 = questions.questao3(arrayCidadesEstados);
    console.log(`${returnQ3}`);

    let returnQ4 = questions.questao4(arrayCidadesEstados);
    console.log(`${returnQ4}`);

    let returnQ5 = questions.questao5(arrayCidadesEstados);
    console.log(`${returnQ5}`);

    let returnQ6 = questions.questao6(arrayCidadesEstados);
    console.log(`${returnQ6}`);

    let returnQ7 = questions.questao7(arrayCidadesEstados);
    console.log(`${returnQ7}`);

    let returnQ8 = questions.questao8(arrayCidadesEstados);
    console.log(`${returnQ8}`);
  } catch (err) {
    console.log(err);
  }
}

execute();

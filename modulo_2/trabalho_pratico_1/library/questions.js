import { promises as fs } from 'fs';

const filesDir = './output';

/*
Observações:
- Nos itens que tratam a respeito do tamanho do nome da cidade, em caso de
empate no tamanho entre várias cidades, você deve considerar a ordem alfabética para
ordenar as cidades pelo seu nome, e então retornar a primeira cidade.
- Você deve considerar os nomes das cidades da forma que estão no arquivo,
mesmo que tenha observações no nome entre parênteses. Exemplo: Cidade X (antiga
Cidade Y).
- Ao rodar o projeto, ele deve executar os métodos em sequência e depois finalizar
a execução.
*/

/**
 * 1. Criar uma função que irá criar um arquivo JSON para cada estado representado no
  arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
  aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
  o UF do estado, por exemplo: MG.json.
 */
export async function questao1(arrayCidadesEstados) {
  try {
    arrayCidadesEstados.forEach((cidadeEstado) => {
      fs.writeFile(
        `${filesDir}/${cidadeEstado.SiglaEstado}.json`,
        JSON.stringify(cidadeEstado.CidadesDoEstado)
      );
    });
    return 'questao1: Arquivos gerados.';
  } catch (err) {
    return `questao1: Arquivos não gerados. Error: ${err}`;
  }
}

/**
 * 2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
  arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/
export async function questao2(siglaEstado) {
  let filePath = `${filesDir}/${siglaEstado}.json`;
  let fileEstadoJSON = JSON.parse(await fs.readFile(filePath));
  return `questao2: estado '${siglaEstado}' possui ${
    Object.keys(fileEstadoJSON).length
  } cidade(s).'`;
}

/**
* 3. Criar um método que imprima no console um array com o UF dos cinco estados
  que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
  pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
  “UF - 74”, “UF - 72”, “UF - 65”]
*/
export function questao3(arrayCidadesEstados) {
  let arrayNumberOfCitiesByState = getNumberOfCitiesByState(
    arrayCidadesEstados
  );

  let top5Cities = arrayNumberOfCitiesByState
    .sort(
      (stateA, stateB) => stateB.QuantidadeCidades - stateA.QuantidadeCidades
    )
    .slice(0, 5)
    .map((state) => `${state.SiglaEstado} - ${state.QuantidadeCidades}`);

  return `questao3: ${JSON.stringify(top5Cities)}`;
}

/**
 * Function to get an array with the number of cities in each state.
 * @param {array} arrayCidadesEstados
 */
function getNumberOfCitiesByState(arrayCidadesEstados) {
  return arrayCidadesEstados.map((estado) => {
    let countCidades = estado.CidadesDoEstado.length;
    return {
      SiglaEstado: estado.SiglaEstado,
      QuantidadeCidades: countCidades,
    };
  });
}

/**
 * 4. Criar um método que imprima no console um array com o UF dos cinco estados
  que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
  Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
  - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
*/
export function questao4(arrayCidadesEstados) {
  let arrayNumberOfCitiesByState = getNumberOfCitiesByState(
    arrayCidadesEstados
  );

  let top5Cities = arrayNumberOfCitiesByState
    .sort(
      (stateA, stateB) => stateA.QuantidadeCidades - stateB.QuantidadeCidades
    )
    .slice(0, 5)
    .map((state) => `${state.SiglaEstado} - ${state.QuantidadeCidades}`);

  return `questao4: ${JSON.stringify(top5Cities)}`;
}

/**
 * Function for questions 5,6,7 and 8.
 * @param {array} arrayCidadesEstados
 * @param {function} filterCondition
 */
function getFilteredCitiesByNameLength(arrayCidadesEstados, filterCondition) {
  const arrayCitiesName = [];
  arrayCidadesEstados.forEach((estado) => {
    let cidade = estado.CidadesDoEstado.sort(filterCondition);
    arrayCitiesName.push(`${cidade[0].Nome} - ${estado.SiglaEstado}`);
  });
  return arrayCitiesName;
}

/**
 5. Criar um método que imprima no console um array com a cidade de maior nome de
  cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
  Cidade – UF”, ...].
*/
export function questao5(arrayCidadesEstados) {
  let arrayCitiesName = getFilteredCitiesByNameLength(
    arrayCidadesEstados,
    (cidadeA, cidadeB) => {
      return cidadeB.Nome.length - cidadeA.Nome.length;
    }
  );

  return `questao5: ${JSON.stringify(arrayCitiesName)}`;
}

/**
 6. Criar um método que imprima no console um array com a cidade de menor nome
  de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
  da Cidade – UF”, ...].
*/
export function questao6(arrayCidadesEstados) {
  let arrayCitiesName = getFilteredCitiesByNameLength(
    arrayCidadesEstados,
    (cidadeA, cidadeB) => {
      return cidadeA.Nome.length - cidadeB.Nome.length;
    }
  );
  return `questao6: ${JSON.stringify(arrayCitiesName)}`;
}

/**
 * 7. Criar um método que imprima no console a cidade de maior nome entre todos os
  estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
export function questao7(arrayCidadesEstados) {
  let arrayCitiesName = getFilteredCitiesByNameLength(
    arrayCidadesEstados,
    (cidadeA, cidadeB) => {
      return cidadeB.Nome.length - cidadeA.Nome.length;
    }
  );

  let biggestCityName = arrayCitiesName.sort((cidadeA, cidadeB) => {
    if (cidadeA.length === cidadeB.length) {
      return cidadeA > cidadeB ? 1 : -1;
    } else {
      return cidadeB.length - cidadeA.length;
    }
  })[0];

  return `questao7: ${JSON.stringify(biggestCityName)}`;
}

/**
 * 8. Criar um método que imprima no console a cidade de menor nome entre todos os
  estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF"
*/
export function questao8(arrayCidadesEstados) {
  let arrayCitiesName = getFilteredCitiesByNameLength(
    arrayCidadesEstados,
    (cidadeA, cidadeB) => {
      return cidadeA.Nome.length - cidadeB.Nome.length;
    }
  );

  let smallestCityName = arrayCitiesName.sort((cidadeA, cidadeB) => {
    if (cidadeA.length === cidadeB.length) {
      return cidadeA > cidadeB ? 1 : -1;
    } else {
      return cidadeA.length - cidadeB.length;
    }
  })[0];

  return `questao8: ${JSON.stringify(smallestCityName)}`;
}

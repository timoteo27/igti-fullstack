import { promises as fs } from 'fs';

let arrayEstados = [];
let arrayCidades = [];
let arrayCidadesEstados = [];

async function getProjectData() {
  await loadData();
  await loadArrayCidadesEstados();

  return { arrayEstados, arrayCidades, arrayCidadesEstados };
}

async function loadData() {
  arrayEstados = JSON.parse(await fs.readFile('data/Estados.json'));
  arrayCidades = JSON.parse(await fs.readFile('data/Cidades.json'));
}

async function loadArrayCidadesEstados() {
  arrayCidadesEstados = arrayEstados.map((estado) => {
    let teste = arrayCidades.filter((cidade) => cidade.Estado === estado.ID);

    return {
      SiglaEstado: estado.Sigla,
      CidadesDoEstado: [...teste],
    };
  });
}

export default getProjectData;

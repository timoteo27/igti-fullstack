import { promises as fs } from 'fs';

async function getArrayCidadesEstados() {
  const arrayEstados = JSON.parse(await fs.readFile('data/Estados.json'));
  const arrayCidades = JSON.parse(await fs.readFile('data/Cidades.json'));

  const arrayCidadesEstados = [];

  arrayEstados.forEach((estado) => {
    const cidades = arrayCidades.filter(
      (cidade) => cidade.Estado === estado.ID
    );

    arrayCidadesEstados.push({
      SiglaEstado: estado.Sigla,
      CidadesDoEstado: [...cidades],
    });
  });

  return arrayCidadesEstados;
}

export default getArrayCidadesEstados;

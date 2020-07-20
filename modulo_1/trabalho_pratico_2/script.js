'use strict';

let usersArray = [];
let filteredUsersArray = [];
let filteredUsersDiv;
let usersFoundTitle;
let usersInformationDiv;

window.addEventListener('load', () => {
  filteredUsersDiv = document.querySelector('#filteredUsersDiv');
  usersFoundTitle = document.querySelector('#usersFoundTitle');
  usersInformationDiv = document.querySelector('#usersInformationDiv');

  const buttonSearch = document.querySelector('#buttonSearch');
  buttonSearch.addEventListener('click', doSearch);

  const inputSearch = document.querySelector('#inputSearch');
  inputSearch.addEventListener('keyup', keyupSearch);

  loadUsersData();
});

async function loadUsersData() {
  const dataUsers = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const dataUsersJson = await dataUsers.json();

  usersArray = dataUsersJson.results.map(
    ({
      name: { first },
      name: { last },
      dob: { age },
      gender,
      picture: { thumbnail },
    }) => {
      return {
        name: `${first} ${last}`,
        age,
        gender,
        thumbnail,
      };
    }
  );

  filteredUsersArray = [...usersArray];
  render();
}

function renderFilteredUsers() {
  let userHtml = '';
  filteredUsersArray.forEach((user) => {
    userHtml += `<div>
      <img src="${user.thumbnail}" alt="Foto do usuário" />
      <span>${user.name}, ${user.age} anos</span>
    </div>`;
  });

  filteredUsersDiv.innerHTML = userHtml;
}

function renderUsersFoundTitle() {
  usersFoundTitle.innerHTML = `${filteredUsersArray.length} usuário(s) encontrado(s)`;
}

function renderUserInformation() {
  let genderMaleCount = 0;
  let genderFemaleCount = 0;

  filteredUsersArray.forEach((user) => {
    if (user.gender === 'male') {
      genderMaleCount++;
      return;
    }
    if (user.gender === 'female') {
      genderFemaleCount++;
      return;
    }
  });

  let sumAges = filteredUsersArray.reduce((acc, curr) => acc + curr.age, 0);

  let averageAges =
    filteredUsersArray.length > 0
      ? Number(sumAges / filteredUsersArray.length).toFixed(2)
      : 0;

  usersInformationDiv.innerHTML = `
  <span>Sexo masculino: <span class="information-value">${genderMaleCount}</span></span>
  <span>Sexo feminino: <span class="information-value">${genderFemaleCount}</span></span>
  <span>Soma das idades: <span class="information-value">${sumAges}</span></span>
  <span>Média das idades: <span class="information-value">${averageAges}</span></span>`;
}

function render() {
  renderUsersFoundTitle();
  renderFilteredUsers();
  renderUserInformation();
}

function doSearch() {
  let argument = document.querySelector('#inputSearch').value.toString();

  if (argument.length < 1) {
    return;
  }

  filteredUsersArray = usersArray.filter((user) => {
    let name = '';
    name = user.name;

    if (name.toUpperCase().indexOf(argument.toUpperCase()) >= 0) {
      return true;
    }
    return false;
  });

  console.log(filteredUsersArray);

  render();
}

function keyupSearch(event) {
  if (event.code === 'Enter') {
    doSearch();
  }
}

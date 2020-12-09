let allUsers = [];
let filteredUsers = [];
let lblUsers = null;
let lblStatistics = null;
let btnSearch = null;
let txtSearch = null;
let countMale = 0;
let countFemale = 0;
let sumAge = 0;
let ageAverage = 0;

window.addEventListener('load', () => {
  lblUsers = document.querySelector('#lblUsers');
  lblStatistics = document.querySelector('#lblStatistics');
  btnSearch = document.querySelector('#btnSearch');
  txtSearch = document.querySelector('#txtSearch');

  btnSearch.addEventListener('click', filterData);
  txtSearch.addEventListener('keypress', () => {
    if (event.keyCode === 13) filterData();
  });

  fetchDados();
});

async function fetchDados() {
  // prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  // prettier-ignore
  allUsers = json.results.map(user => {
    const { name, picture, dob, gender } = user;

    // prettier-ignore
    return {
      name: name.first + ' ' + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender: gender
    };
  });
}

function filterData(event) {
  if (txtSearch.value != null && txtSearch.value.trim() != '') {
    filteredUsers = allUsers.filter((user) =>
      user.name.toUpperCase().includes(txtSearch.value.toUpperCase())
    );
  } else {
    filteredUsers = [];
  }
  render();
}

function render() {
  renderUsersList();
  renderStatistics();
}

function renderUsersList() {
  let usersHTML = '<div>';

  if (filteredUsers.length > 0) {
    filteredUsers.forEach((user) => {
      const { name, picture, age, gender } = user;

      const userHTML = `
      <div class='user'>
        <div>
          <img src="${picture}" alt="${name}">
        </div>
        <div>
          <ul>
            <li><b>${name}</b>, ${age}</li>
          </ul>
        </div>
      </div>  
    `;

      usersHTML += userHTML;
    });

    usersHTML += '</div>';
    divFilteredUsers.innerHTML = usersHTML;
  } else {
    lblUsers = 'Nenhum usuário filtrado';
    usersHTML += lblUsers;
  }

  usersHTML += '</div>';
  divFilteredUsers.innerHTML = usersHTML;
}

function renderStatistics() {
  let statisticsHTML = '<div>';

  if (filteredUsers.length > 0) {
    countFemale = 0;
    countMale = 0;
    sumAge = 0;
    ageAverage = 0;

    filteredUsers.forEach((user) => {
      const { name, picture, age, gender } = user;

      sumAge += user.age;

      if (user.gender === 'female') {
        countFemale++;
      } else {
        countMale++;
      }
    });

    ageAverage = sumAge / filteredUsers.length;

    const statisticHTML =
      '<b>Sexo masculino: </b>' +
      countMale +
      '</br> <b>Sexo Feminino: </b>' +
      countFemale +
      '</br> <b>Soma das idades: </b>' +
      sumAge +
      '</br> <b>Média das idades: </b>' +
      ageAverage.toFixed(2);

    statisticsHTML += statisticHTML;
  } else {
    lblStatistics = 'Nada a ser exibido';
    statisticsHTML += lblStatistics;
  }

  statisticsHTML += '</div>';
  divStatistics.innerHTML = statisticsHTML;
}

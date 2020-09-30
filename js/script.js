let allUsers = [];
let lblUsuarios = null;
let lblEstatisticas = null;
let btnBuscar = null;
let txtBusca = null;

window.addEventListener('load', () => {
  lblUsuarios = document.querySelector('#lblUsuarios');
  lblEstatisticas = document.querySelector('#lblEstatisticas');
  btnBuscar = document.querySelector('#btnBuscar');
  txtBusca = document.querySelector('#txtBusca');

  lblUsuarios.nodeValue = 'Nenhum usuário filtrado';
  lblEstatisticas.nodeValue = 'Nada a ser exibido';
  btnBuscar.addEventListener('click', filterData);
  txtBusca.addEventListener('keyup', filterData);

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
  console.log(allUsers);
}

function filterData() {
  if (txtBusca.nodeValue != null) {
    console.log('Buscando dados...');
  }
}

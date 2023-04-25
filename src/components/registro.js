import { register } from '../lib/services.js';

function registro(navegar) {
  const section = document.createElement('form');

  const div = document.createElement('conten');
  div.classList.add('container');
  div.className = 'container';

  const mensj = document.createElement('p');
  mensj.textContent = 'Registrate ahora!';
  mensj.className = 'texto';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Correo Electrónico';
  inputEmail.className = 'inputE';
  inputEmail.type = 'email';
  inputEmail.id = 'inputEmail';

  const inputPass = document.createElement('input');
  inputPass.className = 'inputP';
  inputPass.placeholder = 'Contraseña';
  inputPass.type = 'password';
  inputPass.id = 'inputPass';

  const img = document.createElement('img');
  img.className = 'yogapp';
  img.src = '/img/Yogapp.png';

  const buttonRegistrar = document.createElement('button');
  buttonRegistrar.textContent = 'Registrar';
  buttonRegistrar.type = 'button';
  buttonRegistrar.id = 'button';
  buttonRegistrar.className = 'button';
  buttonRegistrar.addEventListener('click', () => {
    // console.log(inputEmail.value, inputPass.value);

    if (register(inputEmail.value, inputPass.value) === true) {
      navegar('/');
    }

    if (register(inputEmail.value, inputPass.value) === 'email invalido') {
      alert('Datos incorrectos');
    }
    if (register(inputEmail.value, inputPass.value) === 'usuario existente') {
      alert('Usuario ya registrado');
      navegar('/');
    }
    if (register(inputPass.value) === '6 caracter minimo') {
      alert('Debe ingresar al menos 6 caracteres');
    }
  });
  section.append(div, img, mensj, inputEmail, inputPass, buttonRegistrar);
  return section;
}
export default registro;

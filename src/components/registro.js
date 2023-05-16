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
  const label = document.createElement('label');
  label.setAttribute('for', 'inputEmail');
  inputEmail.appendChild(label);

  const inputPass = document.createElement('input');
  inputPass.className = 'inputP';
  inputPass.placeholder = 'Contraseña';
  inputPass.type = 'password';
  inputPass.id = 'inputPass';

  const img = document.createElement('img');
  img.className = 'yogapp';
  img.src = '../img/Yogapp.png';
  img.alt = 'Foto logo';

  const buttonRegistrar = document.createElement('button');
  buttonRegistrar.textContent = 'Registrar';
  buttonRegistrar.type = 'button';
  buttonRegistrar.id = 'buttonRegistrar';
  buttonRegistrar.className = 'button';
  buttonRegistrar.addEventListener('click', () => {
    register(inputEmail.value, inputPass.value).then((exito) => {
      navegar('/');
      alert(exito);
    }).catch((errores) => {
      alert(errores);
      navegar('/');
    });
  });
  section.append(div, img, mensj, inputEmail, inputPass, buttonRegistrar);
  return section;
}
export default registro;

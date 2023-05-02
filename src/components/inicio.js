import { login } from '../lib/services';

function inicio(navegar) {
  const seccion = document.createElement('div');
  seccion.className = 'section';

  const img = document.createElement('img');
  img.className = 'yogapp';
  img.src = '/img/Yogapp.png';

  const msjBv = document.createElement('h1');
  msjBv.textContent = 'Bienvenidxs a Yogapp! comunidad abierta para lxs Yogui del mundo.';
  msjBv.className = 'titulo';

  const msjPreg = document.createElement('p');
  msjPreg.textContent = 'Tienes cuenta?';
  msjPreg.className = 'texto';

  const emailImput = document.createElement('input');
  emailImput.placeholder = 'Correo Electrónico';
  emailImput.className = 'inputE';
  emailImput.type = 'email';
  emailImput.id = 'inputLogin';
  const label1 = document.createElement('label');
  label1.setAttribute('for', 'inputLogin');
  emailImput.appendChild(label1);

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.className = 'inputP';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.id = 'inputPassLogin';
  const label = document.createElement('label');
  label.setAttribute('for', 'inputPassLogin');
  inputPassword.appendChild(label);

  const buttonIng = document.createElement('button');
  buttonIng.textContent = 'Ingresa';
  buttonIng.className = 'button';
  buttonIng.type = 'button';
  buttonIng.id = 'buttonIngresar';
  buttonIng.addEventListener('click', () => {
  // console.log('logueado');
    if (login(emailImput.value, inputPassword.value) === true) {
      navegar('/perfil');
    } else {
      alert('No esta registrado');
    }
  });
  const msjUs = document.createElement('p');
  msjUs.textContent = 'No eres Usuario?';
  msjUs.className = 'texto';

  const buttonReg = document.createElement('button');
  buttonReg.textContent = 'Registrate';
  buttonReg.className = 'button';
  buttonReg.addEventListener('click', () => {
    navegar('/registro');
  });

  seccion.append(img, msjBv, msjPreg, emailImput, inputPassword, buttonIng, msjUs, buttonReg);
  return seccion;
}
export default inicio;

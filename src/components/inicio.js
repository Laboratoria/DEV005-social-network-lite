import { login } from '../lib/services';

function inicio(navegar) {
  const seccion = document.createElement('div');
  seccion.className = 'section';
  seccion.id = 'section';

  const img = document.createElement('img');
  img.className = 'yogapp';
  img.src = '../img/yogapp.png';
  img.alt = 'Foto logo';

  const msjBv = document.createElement('h1');
  msjBv.textContent = ' Yogapp!  Una comunidad abierta para  Yoguis del mundo.';
  msjBv.className = 'titulo';

  const msjPreg = document.createElement('p');
  msjPreg.textContent = ' ¿Ya tienes cuenta?';
  msjPreg.className = 'texto';

  const emailImput = document.createElement('input');
  emailImput.placeholder = 'Correo Electrónico';
  emailImput.className = 'inputE';
  emailImput.type = 'email';
  emailImput.id = 'inputLogin';
  const labels1 = document.createElement('label');
  labels1.setAttribute('for', 'inputLogin');
  emailImput.appendChild(labels1);

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.className = 'inputP';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.id = 'inputPassLogin';
  const labels = document.createElement('label');
  labels.setAttribute('for', 'inputPassLogin');
  inputPassword.appendChild(labels);

  const buttonIng = document.createElement('button');
  buttonIng.textContent = 'Ingresa';
  buttonIng.className = 'button';
  buttonIng.type = 'button';
  buttonIng.id = 'buttonIngresar';
  buttonIng.addEventListener('click', () => {
  // console.log('logueado');
    if (login(emailImput.value, inputPassword.value) === true) {
      navegar('/muro');
    } else {
      alert('No esta registrado');
    }
  });
  const msjUs = document.createElement('p');
  msjUs.textContent = '¿No eres Usuario?';
  msjUs.className = 'texto';

  const buttonReg = document.createElement('button');
  buttonReg.textContent = 'Registrate';
  buttonReg.id = 'buttonReg';
  buttonReg.className = 'button';
  buttonReg.addEventListener('click', () => {
    navegar('/registro');
  });

  seccion.append(img, msjBv, msjPreg, emailImput, inputPassword, buttonIng, msjUs, buttonReg);
  return seccion;
}
export default inicio;

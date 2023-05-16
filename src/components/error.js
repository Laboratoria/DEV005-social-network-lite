function error(navegar) {
  const pagError = document.createElement('div');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Error 404 pagina no encontrada, vuelve al inicio.';
  titulo.className = 'tituloError';
  const buttonRegresar = document.createElement('button');
  buttonRegresar.type = 'button';
  buttonRegresar.textContent = 'Regresar';
  buttonRegresar.className = 'button';
  buttonRegresar.id = 'buttonRegresar';
  buttonRegresar.addEventListener('click', () => {
    navegar('/');
  });

  const imagenError = document.createElement('img');
  imagenError.src = '../img/errorPage.jpg';
  imagenError.className = 'imagenError';

  pagError.append(imagenError, titulo, buttonRegresar);
  return pagError;
}
export default error;

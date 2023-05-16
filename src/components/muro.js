import {
  getLoggedInUser, createPost, getPosts, editPost, deletePost, logout,
} from '../lib/services';

function muro(navegar) {
  const miContainer = document.createElement('div');
  miContainer.className = 'container';

  const nombreApp = document.createElement('span');
  nombreApp.className = 'nombreApp';
  nombreApp.textContent = 'Yogapp.';

  const imgPerfil = document.createElement('img');
  imgPerfil.className = 'imgPerfil';
  imgPerfil.src = '../img/logo.yogapp.jpeg';
  imgPerfil.alt = 'foto logo';

  const textoPerfil = document.createElement('p');
  textoPerfil.textContent = '"Lokah Samastah Sukhino Bhavantu"';
  textoPerfil.className = 'parrafoPerfil';

  const nombreEmail = getLoggedInUser();

  // console.log(nombreEmail.email);

  const buttonSalir = document.createElement('button');
  buttonSalir.type = 'button';
  buttonSalir.textContent = 'Salir';
  buttonSalir.id = 'buttonSalir';
  buttonSalir.className = 'buttonSalir';
  buttonSalir.addEventListener('click', () => {
    logout();
    navegar('/');
  });

  const inputPost = document.createElement('input');
  inputPost.type = 'tex';
  inputPost.className = 'inputPost';
  inputPost.id = 'post';
  inputPost.placeholder = 'El intercambio de hoy...';

  // funciones de post, edit, borrar
  const container = document.createElement('div');
  container.id = 'container';
  container.className = 'containerPost';

  function mostrarModal(element) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal';

    const modalContenido = document.createElement('div');
    modalContenido.className = 'modalContenido';

    const titulo = document.createElement('h2');
    titulo.textContent = 'ELIMINAR POST';
    titulo.className = 'tituloModal';

    const mensaje = document.createElement('h3');
    mensaje.textContent = '¿Estás seguro de que deseas eliminar este post?';
    mensaje.className = 'mensajeModal';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.className = 'cancelarModal';
    botonCancelar.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.id = 'eliminarPost';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'eliminarModal';
    botonEliminar.addEventListener('click', () => {
      deletePost(element);
      navegar('/muro');
      modal.style.display = 'none';
    });

    modalContenido.append(titulo, mensaje, botonCancelar, botonEliminar);
    modal.appendChild(modalContenido);

    return modal;
  }

  function postear(parrafo) {
    container.textContent = '';
    // elemento = posteo(id,contenido,email)

    parrafo.forEach((element) => {
      // console.log(element.email, 'que es esto?');
      const divCont = document.createElement('div');
      divCont.className = 'divCont';
      divCont.id = 'divCont';

      const usuarioPost = document.createElement('p');
      usuarioPost.id = 'usuarioPost';
      usuarioPost.className = 'usuarioPost';
      usuarioPost.innerHTML = element.email;

      const p = document.createElement('p');
      p.id = 'postElement';
      p.className = 'casilleroPost';
      p.innerHTML = element.content;

      const imgEdit = document.createElement('img');
      imgEdit.src = '../img/editar.png';
      imgEdit.alt = 'logo editar';
      imgEdit.className = 'imgEdit';

      const divButton = document.createElement('div');
      divButton.className = 'divButton';

      const buttonEdit = document.createElement('button');
      buttonEdit.type = 'button';
      buttonEdit.id = 'buttonEdit';
      buttonEdit.className = 'buttonEdit';
      buttonEdit.style.display = 'none';
      buttonEdit.addEventListener('click', () => {
        // console.log(element.id, 'lo voy a ediatr');
        const newContent = prompt('Ingrese el nuevo contenido del post:', element.content);
        if (newContent) {
          editPost(element.id, newContent);
          postear(getPosts());
        }
      });
      buttonEdit.appendChild(imgEdit);

      const imgBorrar = document.createElement('img');
      imgBorrar.src = '../img/borrar.png';
      imgBorrar.alt = 'logo borrar';
      imgBorrar.className = 'imgBorrar';

      const buttonBorrar = document.createElement('button');
      buttonBorrar.type = 'button';
      buttonBorrar.id = 'buttonBorrar';
      buttonBorrar.className = 'buttonBorrar';
      buttonBorrar.style.display = 'none';
      if (element.email === nombreEmail.email) {
        buttonBorrar.style.display = 'flex';
        buttonEdit.style.display = 'flex';
      }
      buttonBorrar.addEventListener('click', () => {
        const modal = mostrarModal(element.id);
        document.body.appendChild(modal);
      });
      container.append(divCont);
      buttonBorrar.appendChild(imgBorrar);
      divButton.append(buttonBorrar, buttonEdit);
      divCont.append(usuarioPost, p, divButton);
      // console.log(divCont, 'parrafo');
    });
  }
  postear(getPosts());
  const buttonPostear = document.createElement('button');
  buttonPostear.type = 'button';
  buttonPostear.id = 'buttonPost';
  buttonPostear.className = 'button';
  buttonPostear.textContent = 'Publicar';
  buttonPostear.addEventListener('click', () => {
    // console.log(postPintado);
    if (inputPost.value === '') {
      alert('Complete su campo');
    } else {
      createPost(inputPost.value, nombreEmail.email);
      // getPosts();
      postear(getPosts());

      inputPost.value = '';
    }
  });

  miContainer.append(
    nombreApp,
    buttonSalir,
    imgPerfil,
    textoPerfil,
    inputPost,
    buttonPostear,
    container,
  );
  return miContainer;
}
export default muro;

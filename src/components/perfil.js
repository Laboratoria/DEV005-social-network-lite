import {
  getLoggedInUser, createPost, getPosts, editPost, deletePost,
} from '../lib/services';

function perfil(navegar) {
  const miContainer = document.createElement('div');
  miContainer.className = 'container';

  const nombreApp = document.createElement('span');
  nombreApp.className = 'nombreApp';
  nombreApp.textContent = 'Yogapp.';

  const imgPerfil = document.createElement('img');
  imgPerfil.className = 'imgPerfil';
  imgPerfil.src = '/img/perfil.jpg';

  const textoPerfil = document.createElement('p');
  textoPerfil.textContent = '"Lokah Samastah Sukhino Bhavantu"';
  textoPerfil.className = 'parrafoPerfil';

  const nombrePerfil = document.createElement('h3');
  nombrePerfil.className = 'textoPerfil';
  nombrePerfil.textContent = 'Perfil';

  const nombreEmail = getLoggedInUser();

  const inputPost = document.createElement('input');
  inputPost.type = 'tex';
  inputPost.className = 'inputPost';
  inputPost.id = 'post';
  inputPost.placeholder = 'El intercambio de hoy...';

  // funciones de post, edit, borrar
  const container = document.createElement('div');
  container.id = 'container';
  container.className = 'containerPost';

  function postear(parrafo) {
    //container.innerHTML = '';
    // elemento = posteo(id,contenido,email)
    parrafo.forEach((element) => {
      // console.log(element.content, 'que es esto?');
      const divCont = document.createElement('div');
      divCont.className = 'divCont';
      divCont.id = 'divCont';
      const p = document.createElement('p');
      p.id = 'post';
      p.className = 'casilleroPost';
      p.innerHTML = element.content;
      divCont.appendChild(p);
      container.appendChild(divCont);

      const buttonEdit = document.createElement('button');
      buttonEdit.type = 'button';
      buttonEdit.textContent = 'Editar';
      buttonEdit.id = 'buttonBorrar';
      buttonEdit.addEventListener('click', () => {
        // qu id pasar? y que content? container? element.id?
        editPost(element.id, element.content);
        console.log(editPost);
      });

      const buttonBorrar = document.createElement('button');
      buttonBorrar.type = 'button';
      buttonBorrar.textContent = 'Borrar';
      buttonBorrar.id = 'buttonBorrar';
      buttonBorrar.addEventListener('click', () => {
        deletePost(element.id);
        navegar('/perfil');
        console.log(deletePost);
      });
      container.append(divCont, buttonBorrar, buttonEdit);

      // console.log(divCont, 'parrafo');
    });
  }

  const buttonPostear = document.createElement('button');
  buttonPostear.type = 'button';
  buttonPostear.id = 'butonPost';
  buttonPostear.className = 'button';
  buttonPostear.textContent = 'Publicar';
  buttonPostear.addEventListener('click', () => {
    // console.log(postPintado);
    createPost(inputPost.value, nombreEmail.email);
    getPosts();
    postear(getPosts());
  });

  miContainer.append(nombreApp, nombrePerfil, imgPerfil, textoPerfil, container, inputPost, buttonPostear);
  return miContainer;
}
export default perfil;

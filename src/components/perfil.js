import { getLoggedInUser, createPost, getPosts } from '../lib/services';

function perfil() {
  const miContainer = document.createElement('div');
  miContainer.classList.add('container');

  const nombreApp = document.createElement('');
  nombreApp.className = 'nombreApp';
  nombreApp.textContent = 'Yogapp.';

  const imgPerfil = document.createElement('img');
  imgPerfil.className = 'imgPerfil';
  imgPerfil.src = '/img/perfil.jpg';

  const nombrePerfil = document.createElement('h3');
  nombrePerfil.className = 'texto';
  nombrePerfil.textContent = 'Perfil';

  const nombreEmail = getLoggedInUser();

  const post = document.createElement('input');
  post.className = 'post';
  post.id = 'post';
  post.placeholder = 'Publicación del dia...';

  const div = document.createElement('div');
  const posteo = div;
  const postPintado = getPosts();
  posteo.textContent = postPintado.content;

  const buttonPostear = document.createElement('button');
  buttonPostear.type = 'button';
  buttonPostear.id = 'butonPost';
  buttonPostear.className = 'button';
  buttonPostear.textContent = 'Publicar';
  buttonPostear.addEventListener('click', () => {
    console.log(postPintado);
    createPost(post.value, nombreEmail.email);
    getPosts();
  });

  miContainer.append(nombreApp, imgPerfil, nombrePerfil, post, buttonPostear, div, posteo);
  return miContainer;
}
export default perfil;

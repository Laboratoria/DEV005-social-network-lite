(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const login = (email, password) => {
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    const users = JSON.parse(usersStr);
    const user = users.find((user2) => user2.email === email && user2.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  } else {
    return false;
  }
};
const getLoggedInUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
const logout = () => {
  localStorage.removeItem("user");
};
const register = (email, password) => new Promise((resolve, reject) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    reject("Email invalido");
  }
  if (password.length < 6) {
    reject("6 caracter minimo");
  }
  let users = [];
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    users = JSON.parse(usersStr);
  }
  const user = users.find((user2) => user2.email === email);
  if (user) {
    reject("Usuario existente");
  }
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  resolve("Registro con exito");
});
const getPosts = () => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    return JSON.parse(postsStr);
  }
  return [];
};
const createPost = (content, email) => {
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  const id = Math.random().toString(36).substr(2, 9);
  let posts = [];
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    posts = JSON.parse(postsStr);
  }
  posts.push({ id, content, email });
  localStorage.setItem("posts", JSON.stringify(posts));
  return id;
};
const editPost = (idPost, content) => {
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find((post2) => post2.id === idPost);
    if (post) {
      post.content = content;
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      throw new Error("Post does not exist");
    }
  } else {
    throw new Error("Post does not exist");
  }
};
const deletePost = (idPost) => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find((post2) => post2.id === idPost);
    if (post) {
      const index = posts.indexOf(post);
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      throw new Error("Post does not exist");
    }
  } else {
    throw new Error("Post does not exist");
  }
};
function inicio(navegar2) {
  const seccion = document.createElement("div");
  seccion.className = "section";
  seccion.id = "section";
  const img = document.createElement("img");
  img.className = "yogapp";
  img.src = "../img/Yogapp.png";
  img.alt = "Foto logo";
  const msjBv = document.createElement("h1");
  msjBv.textContent = " Yogapp!  Una comunidad abierta para  Yoguis del mundo.";
  msjBv.className = "titulo";
  const msjPreg = document.createElement("p");
  msjPreg.textContent = " \xBFYa tienes cuenta?";
  msjPreg.className = "texto";
  const emailImput = document.createElement("input");
  emailImput.placeholder = "Correo Electr\xF3nico";
  emailImput.className = "inputE";
  emailImput.type = "email";
  emailImput.id = "inputLogin";
  const labels1 = document.createElement("label");
  labels1.setAttribute("for", "inputLogin");
  emailImput.appendChild(labels1);
  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.className = "inputP";
  inputPassword.placeholder = "Contrase\xF1a";
  inputPassword.id = "inputPassLogin";
  const labels = document.createElement("label");
  labels.setAttribute("for", "inputPassLogin");
  inputPassword.appendChild(labels);
  const buttonIng = document.createElement("button");
  buttonIng.textContent = "Ingresa";
  buttonIng.className = "button";
  buttonIng.type = "button";
  buttonIng.id = "buttonIngresar";
  buttonIng.addEventListener("click", () => {
    if (login(emailImput.value, inputPassword.value) === true) {
      navegar2("/muro");
    } else {
      alert("No esta registrado");
    }
  });
  const msjUs = document.createElement("p");
  msjUs.textContent = "\xBFNo eres Usuario?";
  msjUs.className = "texto";
  const buttonReg = document.createElement("button");
  buttonReg.textContent = "Registrate";
  buttonReg.id = "buttonReg";
  buttonReg.className = "button";
  buttonReg.addEventListener("click", () => {
    navegar2("/registro");
  });
  seccion.append(img, msjBv, msjPreg, emailImput, inputPassword, buttonIng, msjUs, buttonReg);
  return seccion;
}
function registro(navegar2) {
  const section = document.createElement("form");
  const div = document.createElement("conten");
  div.classList.add("container");
  div.className = "container";
  const mensj = document.createElement("p");
  mensj.textContent = "Registrate ahora!";
  mensj.className = "texto";
  const inputEmail = document.createElement("input");
  inputEmail.placeholder = "Correo Electr\xF3nico";
  inputEmail.className = "inputE";
  inputEmail.type = "email";
  inputEmail.id = "inputEmail";
  const label = document.createElement("label");
  label.setAttribute("for", "inputEmail");
  inputEmail.appendChild(label);
  const inputPass = document.createElement("input");
  inputPass.className = "inputP";
  inputPass.placeholder = "Contrase\xF1a";
  inputPass.type = "password";
  inputPass.id = "inputPass";
  const img = document.createElement("img");
  img.className = "yogapp";
  img.src = "/img/Yogapp.png";
  img.alt = "Foto logo";
  const buttonRegistrar = document.createElement("button");
  buttonRegistrar.textContent = "Registrar";
  buttonRegistrar.type = "button";
  buttonRegistrar.id = "buttonRegistrar";
  buttonRegistrar.className = "button";
  buttonRegistrar.addEventListener("click", () => {
    register(inputEmail.value, inputPass.value).then((exito) => {
      navegar2("/");
      alert(exito);
    }).catch((errores) => {
      alert(errores);
      navegar2("/");
    });
  });
  section.append(div, img, mensj, inputEmail, inputPass, buttonRegistrar);
  return section;
}
function muro(navegar2) {
  const miContainer = document.createElement("div");
  miContainer.className = "container";
  const nombreApp = document.createElement("span");
  nombreApp.className = "nombreApp";
  nombreApp.textContent = "Yogapp.";
  const imgPerfil = document.createElement("img");
  imgPerfil.className = "imgPerfil";
  imgPerfil.src = "img/logo.yogapp.jpeg";
  imgPerfil.alt = "foto logo";
  const textoPerfil = document.createElement("p");
  textoPerfil.textContent = '"Lokah Samastah Sukhino Bhavantu"';
  textoPerfil.className = "parrafoPerfil";
  const nombreEmail = getLoggedInUser();
  const buttonSalir = document.createElement("button");
  buttonSalir.type = "button";
  buttonSalir.textContent = "Salir";
  buttonSalir.id = "buttonSalir";
  buttonSalir.className = "buttonSalir";
  buttonSalir.addEventListener("click", () => {
    logout();
    navegar2("/");
  });
  const inputPost = document.createElement("input");
  inputPost.type = "tex";
  inputPost.className = "inputPost";
  inputPost.id = "post";
  inputPost.placeholder = "El intercambio de hoy...";
  const container = document.createElement("div");
  container.id = "container";
  container.className = "containerPost";
  function mostrarModal(element) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";
    const modalContenido = document.createElement("div");
    modalContenido.className = "modalContenido";
    const titulo = document.createElement("h2");
    titulo.textContent = "ELIMINAR POST";
    titulo.className = "tituloModal";
    const mensaje = document.createElement("h3");
    mensaje.textContent = "\xBFEst\xE1s seguro de que deseas eliminar este post?";
    mensaje.className = "mensajeModal";
    const botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.className = "cancelarModal";
    botonCancelar.addEventListener("click", () => {
      modal.style.display = "none";
    });
    const botonEliminar = document.createElement("button");
    botonEliminar.id = "eliminarPost";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "eliminarModal";
    botonEliminar.addEventListener("click", () => {
      deletePost(element);
      navegar2("/muro");
      modal.style.display = "none";
    });
    modalContenido.append(titulo, mensaje, botonCancelar, botonEliminar);
    modal.appendChild(modalContenido);
    return modal;
  }
  function postear(parrafo) {
    container.textContent = "";
    parrafo.forEach((element) => {
      const divCont = document.createElement("div");
      divCont.className = "divCont";
      divCont.id = "divCont";
      const usuarioPost = document.createElement("p");
      usuarioPost.id = "usuarioPost";
      usuarioPost.className = "usuarioPost";
      usuarioPost.innerHTML = element.email;
      const p = document.createElement("p");
      p.id = "postElement";
      p.className = "casilleroPost";
      p.innerHTML = element.content;
      const imgEdit = document.createElement("img");
      imgEdit.src = "img/editar.png";
      imgEdit.alt = "logo editar";
      imgEdit.className = "imgEdit";
      const divButton = document.createElement("div");
      divButton.className = "divButton";
      const buttonEdit = document.createElement("button");
      buttonEdit.type = "button";
      buttonEdit.id = "buttonEdit";
      buttonEdit.className = "buttonEdit";
      buttonEdit.style.display = "none";
      buttonEdit.addEventListener("click", () => {
        const newContent = prompt("Ingrese el nuevo contenido del post:", element.content);
        if (newContent) {
          editPost(element.id, newContent);
          postear(getPosts());
        }
      });
      buttonEdit.appendChild(imgEdit);
      const imgBorrar = document.createElement("img");
      imgBorrar.src = "img/borrar.png";
      imgBorrar.alt = "logo borrar";
      imgBorrar.className = "imgBorrar";
      const buttonBorrar = document.createElement("button");
      buttonBorrar.type = "button";
      buttonBorrar.id = "buttonBorrar";
      buttonBorrar.className = "buttonBorrar";
      buttonBorrar.style.display = "none";
      if (element.email === nombreEmail.email) {
        buttonBorrar.style.display = "flex";
        buttonEdit.style.display = "flex";
      }
      buttonBorrar.addEventListener("click", () => {
        const modal = mostrarModal(element.id);
        document.body.appendChild(modal);
      });
      container.append(divCont);
      buttonBorrar.appendChild(imgBorrar);
      divButton.append(buttonBorrar, buttonEdit);
      divCont.append(usuarioPost, p, divButton);
    });
  }
  postear(getPosts());
  const buttonPostear = document.createElement("button");
  buttonPostear.type = "button";
  buttonPostear.id = "buttonPost";
  buttonPostear.className = "button";
  buttonPostear.textContent = "Publicar";
  buttonPostear.addEventListener("click", () => {
    if (inputPost.value === "") {
      alert("Complete su campo");
    } else {
      createPost(inputPost.value, nombreEmail.email);
      postear(getPosts());
      inputPost.value = "";
    }
  });
  miContainer.append(
    nombreApp,
    buttonSalir,
    imgPerfil,
    textoPerfil,
    inputPost,
    buttonPostear,
    container
  );
  return miContainer;
}
function error(navegar2) {
  const pagError = document.createElement("div");
  const titulo = document.createElement("h2");
  titulo.textContent = "Error 404 pagina no encontrada, vuelve al inicio.";
  titulo.className = "tituloError";
  const buttonRegresar = document.createElement("button");
  buttonRegresar.type = "button";
  buttonRegresar.textContent = "Regresar";
  buttonRegresar.className = "button";
  buttonRegresar.id = "buttonRegresar";
  buttonRegresar.addEventListener("click", () => {
    navegar2("/");
  });
  const imagenError = document.createElement("img");
  imagenError.src = "/img/errorPage.jpg";
  imagenError.className = "imagenError";
  pagError.append(imagenError, titulo, buttonRegresar);
  return pagError;
}
const root = document.getElementById("root");
const ruta = [
  { path: "/", component: inicio },
  { path: "/registro", component: registro },
  { path: "/muro", component: muro },
  { path: "/error", component: error }
];
const defaultRuta = "/";
function navegar(hash) {
  const route = ruta.find((routeFind) => routeFind.path === hash);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navegar));
  } else {
    navegar("/error");
  }
}
navegar(window.location.pathname || defaultRuta);

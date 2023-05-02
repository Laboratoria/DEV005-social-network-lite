// importa los componets
import inicio from './components/inicio.js';
import registro from './components/registro.js';
import perfil from './components/perfil.js';
import error from './components/error.js';
// root=html
const root = document.getElementById('root');
// rutas para navegar
const ruta = [
  { path: '/', component: inicio },
  { path: '/registro', component: registro },
  { path: '/perfil', component: perfil },
  { path: '/error', component: error },
];

const defaultRuta = '/'; // ruta por defecto

function navegar(hash) {
  const route = ruta.find((routeFind) => routeFind.path === hash);
  // si hay ruta...
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,

      window.location.origin + route.path,
    );
    // remueve el primer elemento, rdenderiza la pag
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navegar));
  } else {
    navegar('/error');
  }
}

navegar(window.location.pathname || defaultRuta);

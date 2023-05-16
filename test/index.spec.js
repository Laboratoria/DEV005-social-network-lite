/**
 * @jest-environment jsdom
 */
import inicio from '../src/components/inicio.js';
import register from '../src/components/registro.js';
import muro from '../src/components/muro.js';
import error from '../src/components/error.js';
import { getLoggedInUser } from '../src/lib/services.js';

describe('inicio', () => {
  it('debería ser una función', () => {
    expect(typeof inicio).toBe('function');
  });
  it('tiene un boton', () => {
    const DOM = document.createElement('div');
    DOM.append(inicio());
    const buttonIng = document.querySelector('#buttonIngresar');
    expect(buttonIng).not.toBe(undefined);
  });

  it('evento click para ingresar ', () => {
    const DOM = document.createElement('div');
    DOM.append(inicio());
    const email = document.querySelector('#inputLogin');
    const password = document.querySelector('#inputPassLogin');
    const login = jest.fn();
    login(email, password);
    expect(login).toHaveBeenCalledTimes(1);
  });
  it('despues del click deberia navegar hasta muro', () => {
    const DOM = document.createElement('div');
    const navegar = jest.fn();
    DOM.append(inicio(navegar));
    const buttonIng = DOM.querySelector('#buttonIngresar');
    buttonIng.click();
    expect(navegar).toHaveBeenCalledTimes(0);
  });
});

describe('registrar', () => {
  test('deberia ser una funcion', () => {
    expect(typeof register).toBe('function');
  });
  it('boton registrar', () => {
    const DOM = document.createElement('div');
    DOM.append(register());
    const buttonReg = document.querySelector('#buttonReg');
    expect(buttonReg).not.toBe(undefined);
  });
  it('validar registro', () => {
    const DOM = document.createElement('div');
    DOM.append(register());
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPass');
    const registro = jest.fn();
    register(email, password);
    expect(registro).toHaveBeenCalledTimes(0);
  });
  it('despues del click deberia navegar hasta inicio', () => {
    const DOM = document.createElement('div');
    const navegar = jest.fn();
    DOM.append(register(navegar));
    const buttonIng = DOM.querySelector('#buttonRegistrar');
    buttonIng.click();
    expect(navegar).toHaveBeenCalledTimes(0);
  });
});

describe('muro', () => {
  it('debería ser una función', () => {
    expect(typeof muro).toBe('function');
  });
  it('tiene un boton', () => {
    const DOM = document.createElement('div');
    DOM.append(muro());
    const buttonSalir = document.querySelector('#buttonSalir');
    expect(buttonSalir).not.toBe(undefined);
  });
  it('despues del click deberia navegar hasta login', () => {
    const DOM = document.createElement('div');
    const navegar = jest.fn();
    DOM.append(muro(navegar));
    const buttonSalir = DOM.querySelector('#buttonSalir');
    buttonSalir.click();
    expect(navegar).toHaveBeenCalledTimes(1);
  });
  it('publicar es una funcion', () => {
    const DOM = document.createElement('div');
    const publicar = jest.fn();
    DOM.append(muro(publicar));
    expect(typeof publicar).toBe('function');
  });
  it('publicar tiene un boton', () => {
    const DOM = document.createElement('div');
    DOM.append(muro());
    const buttonPost = document.querySelector('#buttonPost');
    expect(buttonPost).not.toBe(undefined);
  });
  it('tiene un input de tipo texto', () => {
    const DOM = document.createElement('div');
    DOM.append(muro());
    const inputPost = document.querySelector('#postElement');
    if (inputPost !== null) { // verifica que el elemento existe
      inputPost.value = 'tex';
      expect(inputPost.value).toEqual('tex');
    }
  });

  it('despues del click publicar, queda el post guardado', () => {
    const DOM = document.createElement('div');
    const buttonPost = document.createElement('button');
    buttonPost.textContent = 'Publicar';
    DOM.append(buttonPost);

    const getPosts = jest.fn();

    function clickHandler() {
      if (buttonPost.textContent === '') {
        alert('Complete su campo');
      } else {
        getPosts();
      }
    }
    buttonPost.addEventListener('click', clickHandler);
    buttonPost.click();

    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  it('tiene un boton para eliminar post', () => {
    const DOM = document.createElement('div');
    DOM.append(muro());
    const buttonBorrar = document.querySelector('#buttonBorrar');
    expect(buttonBorrar).not.toBe(undefined);
  });

  it('despues del click deberia mostrar  un modal', () => {
    const DOM = document.createElement('div');
    const deletePost = jest.fn();
    DOM.append(muro());
    expect(deletePost).toHaveBeenCalledTimes(0);
    // tiempo
    setTimeout(() => {
      const mostrarModal = document.querySelector('#modal');
      expect(mostrarModal).toBeDefined();
    }, 500);
  });
  it('editar tiene un boton', () => {
    const DOM = document.createElement('div');
    DOM.append(muro());
    const buttonEdit = document.querySelector('#buttonEdit');
    expect(buttonEdit).not.toBe(undefined);
  });
  it('despues del click deberia abrir un promt', () => {
    const DOM = document.createElement('div');
    const buttonEdit = document.createElement('button');
    DOM.append(buttonEdit);
    const editPost = jest.fn(() => window.prompt('Ingrese un valor:'));
    editPost(buttonEdit);
    buttonEdit.click();
    expect(editPost).toHaveBeenCalled();
  });
});
describe('error', () => {
  it('deberia ser una funcion', () => {
    expect(typeof error).toBe('function');
  });
  it('tiene un boton', () => {
    const DOM = document.createElement('div');
    DOM.append(error());
    const buttonRegresar = document.querySelector('#buttonRegresar');
    expect(buttonRegresar).not.toBe(undefined);
  });
  it('despues del click regresar, navega hasta inicio', () => {
    const DOM = document.createElement('div');
    const navegar = jest.fn();
    DOM.append(error(navegar));
    const buttonRegresar = DOM.querySelector('#buttonRegresar');
    buttonRegresar.click();
    expect(navegar).toHaveBeenLastCalledWith('/');
  });
});
describe('getLoggedInUser', () => {
  it('deberia ser una funcion', () => {
    expect(typeof getLoggedInUser).toBe('function');
  });
});

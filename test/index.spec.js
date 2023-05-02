// importamos la funcion que vamos a testear
import { inicio } from '../../src/components/inicio.js';

describe('inicio', () => {
  it('debería ser una función', () => {
    expect(typeof inicio).toBe('function');
  });
});

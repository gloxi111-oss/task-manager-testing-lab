import { validateTaskTitle } from '../../src/utils/validateTask';

describe('validateTaskTitle', () => {
  it('devuelve null cuando el título es válido', () => {
    expect(validateTaskTitle('Comprar leche')).toBeNull();
  });

  it('rechaza título vacío', () => {
    expect(validateTaskTitle('')).toBe('El título es obligatorio');
  });

  it('rechaza título con solo espacios', () => {
    expect(validateTaskTitle('   ')).toBe('El título es obligatorio');
  });

  it('rechaza título con menos de 3 caracteres', () => {
    expect(validateTaskTitle('ab')).toBe('El título debe tener al menos 3 caracteres');
  });

  it('rechaza título con más de 100 caracteres', () => {
    const longTitle = 'a'.repeat(101);
    expect(validateTaskTitle(longTitle)).toBe('El título no puede exceder los 100 caracteres');
  });

  it('acepta título de exactamente 3 caracteres', () => {
    expect(validateTaskTitle('abc')).toBeNull();
  });
});